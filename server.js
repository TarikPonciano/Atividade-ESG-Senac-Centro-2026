/* ============================================================
   Sorteio de ODS + classificação ESG
   Servidor sem dependências externas. Rode com:  node server.js
   ============================================================ */
const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');
const os   = require('node:os');

const PORTA        = Number(process.env.PORT || process.env.PORTA || 3000);
const CHAVE_PROF   = process.env.CHAVE || 'senac';   // usada para reiniciar/limpar
const COLETAR_ESG  = true;                            // false = só sorteia, não pede o pilar
const TOTAL_ODS    = 17;

const PASTA_DADOS = path.join(__dirname, 'dados');
const ARQUIVO     = path.join(PASTA_DADOS, 'sorteio.json');
const PUBLICO     = path.join(__dirname, 'public');

/* ---------- estado ---------- */
let dados = { atribuicoes: [], baralho: [] };

function carregar(){
  try {
    fs.mkdirSync(PASTA_DADOS, { recursive: true });
    if (fs.existsSync(ARQUIVO)) dados = JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  } catch (e) {
    console.error('Não consegui ler o arquivo de dados. Começando do zero.', e.message);
  }
}
let gravando = false, pendente = false;
function salvar(){
  if (gravando) { pendente = true; return; }
  gravando = true;
  fs.writeFile(ARQUIVO, JSON.stringify(dados, null, 2), err => {
    gravando = false;
    if (err) console.error('Falha ao gravar:', err.message);
    if (pendente) { pendente = false; salvar(); }
  });
}

/* ---------- distribuição uniforme ----------
   Um "baralho" com as 17 ODS embaralhadas é distribuído carta a carta.
   Quando acaba, um novo baralho é embaralhado. Com 17 alunos, cada ODS
   sai exatamente uma vez; com 25, oito ODS saem duas vezes e nenhuma
   fica de fora. A diferença entre a mais e a menos sorteada nunca passa de 1.
--------------------------------------------------------------- */
function embaralhar(a){
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function proximaOds(){
  if (!dados.baralho || dados.baralho.length === 0){
    dados.baralho = embaralhar(Array.from({length: TOTAL_ODS}, (_, i) => i + 1));
  }
  return dados.baralho.shift();
}

/* ---------- identidade do aluno ---------- */
const normalizar = s => String(s || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().trim().replace(/\s+/g, ' ');

const acharAluno = nome => dados.atribuicoes.find(a => a.chave === normalizar(nome));

/* Valida o nome e devolve a versão limpa, ou null se não servir. */
function limparNome(nome){
  const limpo = String(nome || '').trim().replace(/\s+/g, ' ').slice(0, 60);
  if (limpo.split(' ').filter(Boolean).length < 2 || limpo.length < 5) return null;
  return limpo;
}

/* Registra um aluno (ou devolve o registro que já existe). */
function registrar(nome, origem){
  const limpo = limparNome(nome);
  if (!limpo) return { erro: 'Escreva nome e sobrenome.', nome: String(nome || '').trim() };

  const jaTem = acharAluno(limpo);
  if (jaTem) return { nome: jaTem.nome, ods: jaTem.ods, esg: jaTem.esg,
                      justificativa: jaTem.justificativa, repetido: true };

  const registro = {
    chave: normalizar(limpo), nome: limpo, ods: proximaOds(),
    esg: '', justificativa: '', origem: origem || 'aluno',
    em: new Date().toISOString()
  };
  dados.atribuicoes.push(registro);
  salvar();
  console.log(`  + ${registro.nome} → ODS ${registro.ods}${origem === 'professor' ? ' (cadastro manual)' : ''}`);
  return { nome: registro.nome, ods: registro.ods, repetido: false };
}

const autorizado = corpo => corpo && corpo.chave === CHAVE_PROF;

/* ---------- helpers HTTP ---------- */
function json(res, codigo, corpo){
  const txt = JSON.stringify(corpo);
  res.writeHead(codigo, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(txt);
}
function lerCorpo(req){
  return new Promise((ok, falha) => {
    let b = '';
    req.on('data', c => { b += c; if (b.length > 20000) req.destroy(); });
    req.on('end', () => { try { ok(JSON.parse(b || '{}')); } catch(e){ falha(new Error('JSON inválido.')); } });
    req.on('error', falha);
  });
}

const TIPOS = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon',
  '.woff2':'font/woff2', '.csv':'text/csv; charset=utf-8'
};

/* Atalhos: endereços curtos, fáceis de digitar ou ditar em sala. */
const ATALHOS = {
  '/':          'index.html',
  '/qr':        'index.html',
  '/projecao':  'index.html',
  '/admin':     'admin.html',
  '/painel':    'painel.html'
};

function servirEstatico(res, urlPath){
  const rel = ATALHOS[urlPath] || decodeURIComponent(urlPath).replace(/^\/+/, '');
  const alvo = path.join(PUBLICO, rel);
  if (!alvo.startsWith(PUBLICO)) { res.writeHead(403).end('Proibido'); return; }
  fs.readFile(alvo, (err, buf) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}).end('Página não encontrada.'); return; }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(alvo)] || 'application/octet-stream' });
    res.end(buf);
  });
}

/* Endereço público do serviço. Atrás do proxy do Render o protocolo real
   vem no cabeçalho X-Forwarded-Proto — sem isso o QR sairia com http://
   e o navegador do aluno reclamaria. */
function enderecoPublico(req){
  if (process.env.URL_PUBLICA) return process.env.URL_PUBLICA.replace(/\/+$/, '') + '/';
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL.replace(/\/+$/, '') + '/';
  const proto = String(req.headers['x-forwarded-proto'] || 'http').split(',')[0].trim();
  const host  = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  return `${proto}://${host}/`;
}

/* ---------- rotas ---------- */
const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const rota = url.pathname;

  try {
    /* --- configuração --- */
    if (rota === '/api/config'){
      return json(res, 200, {
        servidor: true, coletarEsg: COLETAR_ESG, total: TOTAL_ODS,
        endereco: enderecoPublico(req)
      });
    }

    /* --- sorteio --- */
    if (rota === '/api/sortear' && req.method === 'POST'){
      const { nome } = await lerCorpo(req);
      const r = registrar(nome, 'aluno');
      return json(res, r.erro ? 400 : 200, r.erro ? { erro: r.erro } : r);
    }

    /* --- área administrativa --- */
    if (rota === '/api/admin/entrar' && req.method === 'POST'){
      const corpo = await lerCorpo(req);
      if (!autorizado(corpo)) return json(res, 403, { erro: 'Chave incorreta.' });
      return json(res, 200, { ok: true, coletarEsg: COLETAR_ESG });
    }

    /* cadastro manual: aceita um nome ou uma lista inteira */
    if (rota === '/api/admin/cadastrar' && req.method === 'POST'){
      const corpo = await lerCorpo(req);
      if (!autorizado(corpo)) return json(res, 403, { erro: 'Chave incorreta.' });
      const nomes = (Array.isArray(corpo.nomes) ? corpo.nomes : [corpo.nome]).slice(0, 200);
      const resultados = nomes
        .map(n => String(n || '').trim())
        .filter(Boolean)
        .map(n => registrar(n, 'professor'));
      return json(res, 200, { resultados });
    }

    /* professor anota a resposta ESG no lugar do aluno */
    if (rota === '/api/admin/esg' && req.method === 'POST'){
      const corpo = await lerCorpo(req);
      if (!autorizado(corpo)) return json(res, 403, { erro: 'Chave incorreta.' });
      const aluno = acharAluno(corpo.nome);
      if (!aluno) return json(res, 404, { erro: 'Nome não encontrado.' });
      if (corpo.esg && !['E','S','G'].includes(corpo.esg))
        return json(res, 400, { erro: 'Use E, S ou G.' });
      aluno.esg = corpo.esg || '';
      if (typeof corpo.justificativa === 'string')
        aluno.justificativa = corpo.justificativa.trim().slice(0, 400);
      aluno.respondidoEm = new Date().toISOString();
      salvar();
      return json(res, 200, { ok: true });
    }

    /* --- resposta ESG --- */
    if (rota === '/api/responder' && req.method === 'POST'){
      const { nome, esg, justificativa } = await lerCorpo(req);
      const aluno = acharAluno(nome);
      if (!aluno) return json(res, 404, { erro: 'Não encontrei esse nome. Sorteie sua ODS primeiro.' });
      if (!['E','S','G'].includes(esg)) return json(res, 400, { erro: 'Escolha E, S ou G.' });
      aluno.esg = esg;
      aluno.justificativa = String(justificativa || '').trim().slice(0, 400);
      aluno.respondidoEm = new Date().toISOString();
      salvar();
      console.log(`  ✓ ${aluno.nome} classificou a ODS ${aluno.ods} como ${esg}`);
      return json(res, 200, { ok: true });
    }

    /* --- ressincronização ---
       O celular do aluno guarda a ODS dele. Se o servidor perder os dados
       (no Render o disco é efêmero), cada aparelho devolve o que sabe e a
       lista se remonta sozinha. O servidor sempre tem a palavra final:
       se ele já conhece o aluno, é o registro dele que vale.            */
    if (rota === '/api/ressincronizar' && req.method === 'POST'){
      const { nome, ods, esg, justificativa } = await lerCorpo(req);
      const limpo = limparNome(nome);
      const numero = Number(ods);
      if (!limpo || !(numero >= 1 && numero <= TOTAL_ODS))
        return json(res, 400, { erro: 'Dados incompletos.' });

      const jaTem = acharAluno(limpo);
      if (jaTem)
        return json(res, 200, { nome: jaTem.nome, ods: jaTem.ods, esg: jaTem.esg,
                                justificativa: jaTem.justificativa, recuperado: false });

      /* Depois de um restart o baralho está vazio. Enche antes de
         descontar, senão essa ODS poderia ser sorteada de novo. */
      if (!dados.baralho || dados.baralho.length === 0)
        dados.baralho = embaralhar(Array.from({length: TOTAL_ODS}, (_, i) => i + 1));
      const i = dados.baralho.indexOf(numero);
      if (i !== -1) dados.baralho.splice(i, 1);   // essa carta já saiu

      dados.atribuicoes.push({
        chave: normalizar(limpo), nome: limpo, ods: numero,
        esg: ['E','S','G'].includes(esg) ? esg : '',
        justificativa: String(justificativa || '').trim().slice(0, 400),
        origem: 'recuperado', em: new Date().toISOString()
      });
      salvar();
      console.log(`  ↺ ${limpo} devolveu a ODS ${numero} ao servidor`);
      return json(res, 200, { nome: limpo, ods: numero, esg, justificativa, recuperado: true });
    }

    /* --- lista para os painéis --- */
    if (rota === '/api/lista'){
      const contagem = Array.from({length: TOTAL_ODS}, () => 0);
      dados.atribuicoes.forEach(a => { contagem[a.ods - 1]++; });
      return json(res, 200, {
        atribuicoes: dados.atribuicoes.map(({chave, ...resto}) => resto),
        contagem,
        restamNoBaralho: (dados.baralho || []).length,
        coletarEsg: COLETAR_ESG
      });
    }

    /* --- CSV --- */
    if (rota === '/api/csv'){
      const esc = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
      const linhas = [['nome','ods','esg','justificativa','sorteado_em'].join(';')];
      dados.atribuicoes.forEach(a => linhas.push(
        [a.nome, a.ods, a.esg, a.justificativa, a.em].map(esc).join(';')));
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="ods-turma.csv"'
      });
      return res.end('\uFEFF' + linhas.join('\n'));   // BOM: abre certo no Excel
    }

    /* --- remover um aluno --- */
    if (rota === '/api/remover' && req.method === 'POST'){
      const { nome, chave } = await lerCorpo(req);
      if (chave !== CHAVE_PROF) return json(res, 403, { erro: 'Chave incorreta.' });
      const i = dados.atribuicoes.findIndex(a => a.chave === normalizar(nome));
      if (i === -1) return json(res, 404, { erro: 'Nome não encontrado.' });
      const [fora] = dados.atribuicoes.splice(i, 1);
      dados.baralho.push(fora.ods);                    // devolve a carta ao baralho
      embaralhar(dados.baralho);
      salvar();
      return json(res, 200, { ok: true });
    }

    /* --- reiniciar --- */
    if (rota === '/api/reiniciar' && req.method === 'POST'){
      const { chave } = await lerCorpo(req);
      if (chave !== CHAVE_PROF) return json(res, 403, { erro: 'Chave incorreta.' });
      try {
        if (fs.existsSync(ARQUIVO))
          fs.copyFileSync(ARQUIVO, ARQUIVO.replace('.json', `-${Date.now()}.json`));
      } catch(e){ /* backup é bônus, não bloqueia */ }
      dados = { atribuicoes: [], baralho: [] };
      salvar();
      console.log('  ! turma reiniciada');
      return json(res, 200, { ok: true });
    }

    if (rota.startsWith('/api/')) return json(res, 404, { erro: 'Rota inexistente.' });

    return servirEstatico(res, rota);

  } catch (e) {
    return json(res, 500, { erro: e.message || 'Erro no servidor.' });
  }
});

/* ---------- subida ---------- */
carregar();
servidor.listen(PORTA, '0.0.0.0', () => {
  const ips = Object.values(os.networkInterfaces()).flat()
    .filter(i => i && i.family === 'IPv4' && !i.internal).map(i => i.address);
  console.log('\n  SORTEIO ODS + ESG');
  console.log('  ─────────────────────────────────────────────');
  const base = process.env.URL_PUBLICA || process.env.RENDER_EXTERNAL_URL
            || `http://${ips[0] || 'localhost'}:${PORTA}`;
  console.log(`  Alunos:                ${base.replace(/\/+$/, '')}`);
  console.log(`  Projeção com QR:       ${base.replace(/\/+$/, '')}/qr`);
  console.log(`  Administração:         ${base.replace(/\/+$/, '')}/admin`);
  console.log(`  Painel de fechamento:  ${base.replace(/\/+$/, '')}/painel`);
  console.log(`  Chave do professor:    ${CHAVE_PROF}`);
  console.log(`  Já registrados:        ${dados.atribuicoes.length} aluno(s)\n`);
});
