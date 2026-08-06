/* ============================================================
   Os 17 Objetivos de Desenvolvimento Sustentável (Agenda 2030).
   Nomes e cores oficiais. O campo "pergunta" é o único pensado
   para a sua turma — edite à vontade.
   Usado tanto por index.html quanto por painel.html.
   ============================================================ */
const ODS = [
  {n:1,  cor:'#E5243B', tinta:'claro', nome:'Erradicação da Pobreza',
   resumo:'Acabar com a pobreza em todas as suas formas, em todos os lugares.',
   pergunta:'Que serviços do seu bairro existem justamente por causa desse objetivo?'},
  {n:2,  cor:'#DDA63A', tinta:'escuro', nome:'Fome Zero e Agricultura Sustentável',
   resumo:'Acabar com a fome, garantir alimento de qualidade e promover a agricultura sustentável.',
   pergunta:'Quanto do que você almoçou hoje foi produzido aqui no Ceará?'},
  {n:3,  cor:'#4C9F38', tinta:'claro', nome:'Saúde e Bem-Estar',
   resumo:'Assegurar uma vida saudável e promover o bem-estar em todas as idades.',
   pergunta:'O que mais atrapalha o acesso à saúde na sua comunidade?'},
  {n:4,  cor:'#C5192D', tinta:'claro', nome:'Educação de Qualidade',
   resumo:'Garantir educação inclusiva, equitativa e de qualidade ao longo da vida.',
   pergunta:'O que faria sua turma aprender melhor do que aprende hoje?'},
  {n:5,  cor:'#FF3A21', tinta:'claro', nome:'Igualdade de Gênero',
   resumo:'Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.',
   pergunta:'Onde a divisão de tarefas ainda é desigual no seu dia a dia?'},
  {n:6,  cor:'#26BDE2', tinta:'escuro', nome:'Água Potável e Saneamento',
   resumo:'Garantir a disponibilidade e a gestão sustentável da água e do saneamento para todos.',
   pergunta:'Para onde vai a água que desce pelo ralo da sua casa?'},
  {n:7,  cor:'#FCC30B', tinta:'escuro', nome:'Energia Limpa e Acessível',
   resumo:'Assegurar acesso a energia confiável, sustentável, moderna e a preço acessível.',
   pergunta:'Quanto custa a energia que você usa e de onde ela vem?'},
  {n:8,  cor:'#A21942', tinta:'claro', nome:'Trabalho Decente e Crescimento Econômico',
   resumo:'Promover o crescimento econômico sustentado, o emprego pleno e o trabalho decente.',
   pergunta:'O que separa um emprego bom de um emprego apenas suportável?'},
  {n:9,  cor:'#FD6925', tinta:'escuro', nome:'Indústria, Inovação e Infraestrutura',
   resumo:'Construir infraestrutura resiliente, promover a industrialização inclusiva e fomentar a inovação.',
   pergunta:'Que infraestrutura falta para o seu bairro funcionar melhor?'},
  {n:10, cor:'#DD1367', tinta:'claro', nome:'Redução das Desigualdades',
   resumo:'Reduzir a desigualdade dentro dos países e entre eles.',
   pergunta:'Duas pessoas da mesma idade em Fortaleza: o que muda no ponto de partida delas?'},
  {n:11, cor:'#FD9D24', tinta:'escuro', nome:'Cidades e Comunidades Sustentáveis',
   resumo:'Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.',
   pergunta:'Quanto tempo você perde no trajeto até aqui — e por quê?'},
  {n:12, cor:'#BF8B2E', tinta:'escuro', nome:'Consumo e Produção Responsáveis',
   resumo:'Assegurar padrões de produção e de consumo sustentáveis.',
   pergunta:'Para onde foi o lixo que você produziu ontem?'},
  {n:13, cor:'#3F7E44', tinta:'claro', nome:'Ação Contra a Mudança Global do Clima',
   resumo:'Tomar medidas urgentes para combater a mudança do clima e seus impactos.',
   pergunta:'O que mudou no clima da sua cidade desde que você era criança?'},
  {n:14, cor:'#0A97D9', tinta:'claro', nome:'Vida na Água',
   resumo:'Conservar e usar de forma sustentável os oceanos, os mares e os recursos marinhos.',
   pergunta:'O que a maré traz para a praia que não deveria estar ali?'},
  {n:15, cor:'#56C02B', tinta:'escuro', nome:'Vida Terrestre',
   resumo:'Proteger e recuperar os ecossistemas terrestres e deter a perda de biodiversidade.',
   pergunta:'Que área verde perto de você existia há dez anos e não existe mais?'},
  {n:16, cor:'#00689D', tinta:'claro', nome:'Paz, Justiça e Instituições Eficazes',
   resumo:'Promover sociedades pacíficas e inclusivas, com acesso à justiça e instituições eficazes.',
   pergunta:'Onde você recorreria se um direito seu fosse desrespeitado amanhã?'},
  {n:17, cor:'#19486A', tinta:'claro', nome:'Parcerias e Meios de Implementação',
   resumo:'Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável.',
   pergunta:'Quem precisaria sentar na mesma mesa para resolver os outros dezesseis?'}
];

/* Os três pilares do modelo ESG. */
const PILARES = [
  {id:'E', letra:'E', nome:'Ambiental',
   ingles:'Environmental',
   texto:'O impacto sobre o planeta: recursos naturais, energia, água, resíduos, emissões, clima e biodiversidade.'},
  {id:'S', letra:'S', nome:'Social',
   ingles:'Social',
   texto:'O impacto sobre as pessoas: condições de trabalho, saúde, educação, diversidade, direitos e comunidade.'},
  {id:'G', letra:'G', nome:'Governança',
   ingles:'Governance',
   texto:'Como as decisões são tomadas: transparência, ética, prestação de contas, combate à corrupção e instituições.'}
];

const INK = '#0F0D0B', PAPER = '#F7F5F1';
const corDaTinta = o => (o.tinta === 'claro' ? PAPER : INK);
const rotuloOds  = o => 'ODS ' + String(o.n).padStart(2, '0') + ' / 17';
