# Sorteio de ODS + classificação ESG

Atividade em que cada aluno recebe uma das 17 ODS da ONU e a classifica
em um dos três pilares do modelo ESG.

## Rodar

Precisa apenas do Node.js instalado. Não há dependências para instalar.

```bash
cd sorteio-ods
node server.js
```

O terminal mostra três endereços:

| Para quem | Endereço |
|---|---|
| Alunos | `/` |
| Projeção com QR e lista ao vivo | `/qr` |
| Administração | `/admin` |
| Painel de fechamento | `/painel` |

Em produção, na frente disso vai `https://sorteio-ods.onrender.com`. Rodando
local, `http://SEU-IP:3000` — o terminal imprime os quatro endereços prontos
ao subir o servidor.

Isso é só para rodar na sua máquina, em desenvolvimento. Nesse caso os
celulares precisam estar na mesma rede Wi-Fi do notebook.

**Com o projeto no Render, essa restrição não existe mais.** O endereço é
público: funciona no 4G do aluno, no Wi-Fi da escola, em casa, de qualquer
lugar. Ninguém precisa estar na mesma rede que ninguém.

## Como a distribuição fica uniforme

As 17 ODS são embaralhadas em um "baralho" e distribuídas carta a carta.
Quando o baralho acaba, um novo é embaralhado. Resultado: com 17 alunos
cada ODS sai exatamente uma vez; com 25, oito ODS saem duas vezes e
nenhuma fica de fora. A diferença entre a mais e a menos sorteada nunca
passa de um.

O aluno é identificado pelo nome (acentos e caixa são ignorados na
comparação). Se ele recarregar a página ou digitar o nome de novo, recebe
a mesma ODS — não há como sortear duas vezes.

## Duas telas para você

**`/admin` — no seu notebook.** Pede a chave uma vez por aba. Nela você:

- **Cadastra alunos manualmente**, um nome por linha. Serve para quem não
  conseguiu escanear e também para lançar a chamada inteira antes da aula.
  Cada linha do recibo tem um link "mostrar ao aluno", que abre a tela do
  resultado já na ODS certa.
- **Vê a lista completa** com filtro por nome ou ODS, e um botão para isolar
  quem ainda não classificou.
- **Anota a resposta no lugar do aluno**: o pilar ESG e a justificativa são
  editáveis direto na tabela e salvam sozinhos.
- Remove um aluno (a ODS volta para o baralho), reinicia a turma e baixa o CSV.

Cada aluno aparece marcado como `QR` ou `manual`, conforme a origem.

**`/qr` — para projetar durante o sorteio.** De um lado o QR code e o
endereço; do outro, a lista ao vivo de quem já sorteou e qual ODS recebeu,
com os mais recentes no topo.

A classificação ESG fica escondida. O contador mostra quantos já responderam,
mas não o quê — só quando você aperta **Revelar E · S · G** os selos aparecem
em todos os cartões de uma vez. Aperte de novo para esconder. A escolha vale
só naquela aba e some ao fechar; se você recarregar a projeção no meio da
aula, ela volta escondida.

No celular os dois blocos empilham e o botão ocupa a largura toda.

**`/painel` — para projetar no fechamento.** Só leitura, sem controles.
Duas visões: por aluno e por pilar ESG, com as respostas agrupadas em E, S e
G — é a visão para mostrar onde a turma discordou.

Todos atualizam sozinhos a cada 3 segundos.

A chave do professor é `senac` por padrão. Para trocar:

```bash
CHAVE=outracoisa PORTA=8080 node server.js
```

## Dados

Ficam em `dados/sorteio.json`, em texto puro. Ao reiniciar a turma, uma
cópia com a data no nome é guardada na mesma pasta antes de limpar.

## A ODS do aluno mora no celular dele

O aparelho grava `{nome, ods, esg, justificativa}` em `localStorage` a cada
passo. Isso tem três efeitos:

1. **A tela abre instantânea.** Quem já sorteou vê sua ODS antes de qualquer
   requisição de rede — nada de tela branca esperando o servidor acordar.
2. **Não há como sortear duas vezes**, mesmo sem servidor.
3. **O servidor pode esquecer tudo e a turma se remonta.** Ao abrir a página,
   cada celular chama `api/ressincronizar` e devolve a ODS que guardou. O
   servidor recria o registro e tira aquela carta do baralho. Isso é o que
   salva a atividade no Render, cujo disco é apagado a cada reinício.

Quando servidor e celular discordam, o servidor vence — é ele que alimenta a
lista que você projeta. Como o dado fica no aparelho, um aluno com jeito
consegue editar o `localStorage` e reivindicar outra ODS. Numa sala de aula
isso é uma travessura, não uma ameaça; se algum dia importar, o caminho é
assinar o registro no servidor.

## Deploy no Render

O `render.yaml` já está pronto. Passo a passo:

1. Suba a pasta para um repositório no GitHub.
2. No Render: **New → Blueprint**, conecte o repositório e confirme. Ele lê o
   `render.yaml` sozinho.
3. Na tela de variáveis, defina `CHAVE` com a senha que você quer para o
   `/admin`. Não deixe `senac`. A `URL_PUBLICA` já vem preenchida no
   `render.yaml` — é ela que o QR code codifica.
4. Aguarde o primeiro build. A URL fica `https://sorteio-ods.onrender.com`.

Sem blueprint, o caminho manual é **New → Web Service**, runtime `Node`,
build `npm install`, start `node server.js`, plano `Free`, e as variáveis
`CHAVE` e `URL_PUBLICA` adicionadas à mão.

### Duas limitações do plano gratuito

**O disco é apagado** a cada reinício ou deploy. É exatamente o buraco que o
`localStorage` tapa: os celulares devolvem as ODS ao abrir a página. Ainda
assim, baixe o CSV ao final da aula — é o único registro que não depende de
ninguém reabrir nada.

**O serviço hiberna** após 15 minutos sem tráfego e leva cerca de um minuto
para voltar. Deixe o `/admin` ou o `/qr` abertos numa aba desde antes
da aula: os dois consultam o servidor a cada 3 segundos e isso basta para
mantê-lo acordado. Se a turma escanear com o serviço dormindo, o primeiro
aluno espera um minuto e os demais entram normalmente.

## Um ponto a saber

A rota `api/lista` responde sem pedir chave, porque é ela que alimenta o
painel de projeção. Quem tiver o endereço vê os nomes da turma e as
respostas. Numa rede local isso não é problema; se você expuser o servidor
pela internet, considere que a lista fica visível para quem souber a URL.
Escrever, remover e reiniciar continuam exigindo a chave.

## Ajustes

- `public/ods.js` — nomes, cores, descrições e a pergunta provocativa de
  cada ODS, além dos textos dos três pilares ESG.
- `server.js`, linha `COLETAR_ESG` — mude para `false` se quiser só o
  sorteio, sem a etapa de classificação.
- `public/index.html` — os textos da tela de abertura.

## Sem servidor

`public/index.html` também funciona sozinho, hospedado em qualquer lugar
estático (GitHub Pages, Netlify). Nesse modo ele pula a etapa do nome e
sorteia localmente — sem lista e sem distribuição uniforme, já que não há
estado compartilhado entre os aparelhos.
