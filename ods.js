/* ============================================================
   As 17 Objetivos de Desenvolvimento Sustentável (Agenda 2030).
   Nomes e cores oficiais da ONU. As 17 ODS se desdobram em 169
   metas — aqui aparece uma representativa de cada.

   Campos:
     resumo    — o objetivo, na linguagem oficial
     meta      — uma das metas oficiais, em português direto
     naPratica — o que isso quer dizer no mundo real
     noBrasil  — como a agenda aparece por aqui
     pergunta  — provocação para a turma (edite à vontade)

   Usado por index.html, painel.html e admin.html.
   ============================================================ */
const ODS = [
  {n:1, cor:'#E5243B', tinta:'claro', nome:'Erradicação da Pobreza',
   resumo:'Acabar com a pobreza em todas as suas formas, em todos os lugares.',
   meta:'Erradicar a pobreza extrema, medida pela linha de renda diária do Banco Mundial.',
   naPratica:'Não é só o valor no bolso. É ter documento, endereço fixo, conta em banco — e não perder tudo de uma vez quando chove forte.',
   noBrasil:'Bolsa Família, BPC e o Cadastro Único são as engrenagens dessa ODS por aqui, e aparecem no orçamento federal todo ano.',
   pergunta:'Que serviços do seu bairro existem justamente por causa desse objetivo?'},

  {n:2, cor:'#DDA63A', tinta:'escuro', nome:'Fome Zero e Agricultura Sustentável',
   resumo:'Acabar com a fome, garantir alimento de qualidade e promover a agricultura sustentável.',
   meta:'Acabar com a fome e com todas as formas de desnutrição, e dobrar a produtividade da agricultura familiar.',
   naPratica:'Fome não é só prato vazio. É comer só o que é barato — farinha, açúcar, ultraprocessado. Barriga cheia e corpo faltando nutriente.',
   noBrasil:'A agricultura familiar coloca uma fatia enorme da comida na mesa do brasileiro. É ela que essa ODS tenta fortalecer.',
   pergunta:'Quanto do que você almoçou hoje foi produzido aqui no Ceará?'},

  {n:3, cor:'#4C9F38', tinta:'claro', nome:'Saúde e Bem-Estar',
   resumo:'Assegurar uma vida saudável e promover o bem-estar em todas as idades.',
   meta:'Reduzir a mortalidade materna e infantil, enfrentar epidemias e incluir saúde mental na conta.',
   naPratica:'Entra coisa que ninguém associa a hospital: acidente de trânsito, ar poluído, dependência química, ansiedade.',
   noBrasil:'O SUS é um dos maiores sistemas públicos de saúde do mundo e é o principal instrumento brasileiro nessa agenda.',
   pergunta:'O que mais atrapalha o acesso à saúde na sua comunidade?'},

  {n:4, cor:'#C5192D', tinta:'claro', nome:'Educação de Qualidade',
   resumo:'Garantir educação inclusiva, equitativa e de qualidade ao longo da vida.',
   meta:'Ensino básico gratuito e de qualidade para todos, e acesso ampliado à formação técnica e superior.',
   naPratica:'Não basta ter escola. É o aluno sair de lá sabendo ler um contrato, calcular um juro e sustentar um argumento.',
   noBrasil:'Curso técnico como o que você está fazendo agora entra direto na meta de ampliar a formação profissional.',
   pergunta:'O que faria sua turma aprender melhor do que aprende hoje?'},

  {n:5, cor:'#FF3A21', tinta:'claro', nome:'Igualdade de Gênero',
   resumo:'Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.',
   meta:'Acabar com a discriminação e a violência contra mulheres e garantir participação igual nos cargos de decisão.',
   naPratica:'Aparece no salário, na divisão do trabalho de casa e em quantas mulheres estão na sala quando a decisão é tomada.',
   noBrasil:'A Lei Maria da Penha e a Lei do Feminicídio são respostas brasileiras diretas a essa agenda.',
   pergunta:'Onde a divisão de tarefas ainda é desigual no seu dia a dia?'},

  {n:6, cor:'#26BDE2', tinta:'escuro', nome:'Água Potável e Saneamento',
   resumo:'Garantir a disponibilidade e a gestão sustentável da água e do saneamento para todos.',
   meta:'Água potável e esgoto tratado para todos, com uso mais eficiente dos recursos hídricos.',
   naPratica:'Sem esgoto tratado, a conta aparece do outro lado: internação por doença transmitida pela água.',
   noBrasil:'Milhões de brasileiros ainda não têm coleta de esgoto. O marco legal do saneamento, de 2020, é a tentativa de acelerar isso.',
   pergunta:'Para onde vai a água que desce pelo ralo da sua casa?'},

  {n:7, cor:'#FCC30B', tinta:'escuro', nome:'Energia Limpa e Acessível',
   resumo:'Assegurar acesso a energia confiável, sustentável, moderna e a preço acessível.',
   meta:'Aumentar a fatia de renováveis na matriz energética e dobrar o ritmo de ganho em eficiência.',
   naPratica:'Energia limpa não é só painel solar. É gastar menos: geladeira eficiente, prédio que não precisa de ar-condicionado o dia inteiro.',
   noBrasil:'O Ceará é um dos polos de energia eólica do país e aposta no hidrogênio verde pelo complexo do Pecém.',
   pergunta:'Quanto custa a energia que você usa e de onde ela vem?'},

  {n:8, cor:'#A21942', tinta:'claro', nome:'Trabalho Decente e Crescimento Econômico',
   resumo:'Promover o crescimento econômico sustentado, o emprego pleno e o trabalho decente.',
   meta:'Emprego pleno e produtivo para todos, e fim do trabalho infantil e do trabalho análogo à escravidão.',
   naPratica:'Decente quer dizer: carteira assinada, salário que paga as contas, jornada que deixa você viver e voltar para casa inteiro.',
   noBrasil:'Jovem Aprendiz e as regras de estágio existem para colocar quem está começando dentro dessa meta, não fora dela.',
   pergunta:'O que separa um emprego bom de um emprego apenas suportável?'},

  {n:9, cor:'#FD6925', tinta:'escuro', nome:'Indústria, Inovação e Infraestrutura',
   resumo:'Construir infraestrutura resiliente, promover a industrialização inclusiva e fomentar a inovação.',
   meta:'Ampliar o acesso à tecnologia da informação e à internet, especialmente nos países em desenvolvimento.',
   naPratica:'Inclui internet. Sem banda larga decente não tem aula online, não tem trabalho remoto, não tem venda pela rede.',
   noBrasil:'Todo sistema, aplicativo ou rede que alguém constrói aqui entra nessa conta — inclusive os que essa turma vai escrever.',
   pergunta:'Que infraestrutura falta para o seu bairro funcionar melhor?'},

  {n:10, cor:'#DD1367', tinta:'claro', nome:'Redução das Desigualdades',
   resumo:'Reduzir a desigualdade dentro dos países e entre eles.',
   meta:'Fazer a renda dos 40% mais pobres crescer mais rápido que a média nacional.',
   naPratica:'Desigualdade não é a mesma coisa que pobreza. Um país pode ficar mais rico e mais desigual ao mesmo tempo.',
   noBrasil:'As cotas em universidades e concursos públicos são políticas desenhadas exatamente para esse objetivo.',
   pergunta:'Duas pessoas da mesma idade em Fortaleza: o que muda no ponto de partida delas?'},

  {n:11, cor:'#FD9D24', tinta:'escuro', nome:'Cidades e Comunidades Sustentáveis',
   resumo:'Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.',
   meta:'Moradia adequada e transporte público acessível e seguro para todos.',
   naPratica:'Dá para medir pelo relógio: quem gasta três horas por dia no ônibus está pagando um imposto que não aparece em nenhum boleto.',
   noBrasil:'A esmagadora maioria da população brasileira vive em cidades, o que torna essa uma das ODS mais decisivas por aqui.',
   pergunta:'Quanto tempo você perde no trajeto até aqui — e por quê?'},

  {n:12, cor:'#BF8B2E', tinta:'escuro', nome:'Consumo e Produção Responsáveis',
   resumo:'Assegurar padrões de produção e de consumo sustentáveis.',
   meta:'Reduzir pela metade o desperdício de alimentos e diminuir drasticamente a geração de resíduos.',
   naPratica:'Um celular trocado a cada dois anos é essa ODS batendo na porta: quanto dura, se dá para consertar, para onde vai depois.',
   noBrasil:'A Política Nacional de Resíduos Sólidos criou a logística reversa: quem fabrica também responde pelo descarte.',
   pergunta:'Para onde foi o lixo que você produziu ontem?'},

  {n:13, cor:'#3F7E44', tinta:'claro', nome:'Ação Contra a Mudança Global do Clima',
   resumo:'Tomar medidas urgentes para combater a mudança do clima e seus impactos.',
   meta:'Integrar o combate à mudança climática às políticas nacionais e fortalecer a capacidade de adaptação.',
   naPratica:'Adaptação é a parte esquecida. Não dá mais só para reduzir emissão: é preciso preparar a cidade para calor e chuva extremos.',
   noBrasil:'O Brasil é peça central nessa mesa pelo tamanho da Amazônia e por ter uma matriz elétrica majoritariamente renovável.',
   pergunta:'O que mudou no clima da sua cidade desde que você era criança?'},

  {n:14, cor:'#0A97D9', tinta:'claro', nome:'Vida na Água',
   resumo:'Conservar e usar de forma sustentável os oceanos, os mares e os recursos marinhos.',
   meta:'Reduzir a poluição marinha, proteger ecossistemas costeiros e acabar com a pesca predatória.',
   naPratica:'O plástico que some da praia não sumiu. Virou fragmento, entrou no peixe e voltou para o prato.',
   noBrasil:'O litoral brasileiro tem milhares de quilômetros. Pesca artesanal e turismo dependem diretamente dessa ODS.',
   pergunta:'O que a maré traz para a praia que não deveria estar ali?'},

  {n:15, cor:'#56C02B', tinta:'escuro', nome:'Vida Terrestre',
   resumo:'Proteger e recuperar os ecossistemas terrestres e deter a perda de biodiversidade.',
   meta:'Deter o desmatamento, recuperar terras degradadas e frear a extinção de espécies.',
   naPratica:'Recuperar terra degradada é mais caro e mais lento do que não degradar. Quase sempre.',
   noBrasil:'Fora a Amazônia, o cerrado e a caatinga carregam boa parte dessa conta — e a caatinga é bioma exclusivamente brasileiro.',
   pergunta:'Que área verde perto de você existia há dez anos e não existe mais?'},

  {n:16, cor:'#00689D', tinta:'claro', nome:'Paz, Justiça e Instituições Eficazes',
   resumo:'Promover sociedades pacíficas e inclusivas, com acesso à justiça e instituições eficazes.',
   meta:'Reduzir a violência, combater corrupção e suborno e garantir o acesso público à informação.',
   naPratica:'Acesso à informação faz parte: você tem o direito de saber quanto sua prefeitura gastou, com quem e por quê.',
   noBrasil:'A Lei de Acesso à Informação e o Portal da Transparência nasceram desse tipo de compromisso.',
   pergunta:'Onde você recorreria se um direito seu fosse desrespeitado amanhã?'},

  {n:17, cor:'#19486A', tinta:'claro', nome:'Parcerias e Meios de Implementação',
   resumo:'Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável.',
   meta:'Mobilizar recursos, transferir tecnologia e melhorar os dados que medem todas as outras dezesseis.',
   naPratica:'É a ODS que faz as outras funcionarem. Sem dinheiro, dado e acordo entre países, o resto vira cartaz de parede.',
   noBrasil:'O IBGE mantém a plataforma que acompanha os indicadores das ODS no país. Sem medir, ninguém sabe se avançou.',
   pergunta:'Quem precisaria sentar na mesma mesa para resolver os outros dezesseis?'}
];

/* Os três pilares do modelo ESG. */
const PILARES = [
  {id:'E', letra:'E', nome:'Ambiental', ingles:'Environmental',
   texto:'Impacto no meio ambiente: consumo de energia e água, emissão de poluentes, geração de resíduos, preservação de ecossistemas.'},
  {id:'S', letra:'S', nome:'Social', ingles:'Social',
   texto:'Relação com as pessoas: condições de trabalho, saúde e segurança, diversidade, direitos humanos, efeito sobre a comunidade.'},
  {id:'G', letra:'G', nome:'Governança', ingles:'Governance',
   texto:'Como a organização é dirigida: transparência nas decisões, ética, prestação de contas, combate à corrupção, cumprimento das leis.'}
];

const INK = '#0F0D0B', PAPER = '#F7F5F1';
const corDaTinta = o => (o.tinta === 'claro' ? PAPER : INK);
const rotuloOds  = o => 'ODS ' + String(o.n).padStart(2, '0') + ' / 17';
