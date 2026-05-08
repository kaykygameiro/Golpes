export type MediaType = 'whatsapp' | 'email' | 'sms' | 'pix';

export interface Highlight {
  id: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  description: string;
}

export type ScenarioOption = {
  id: string;
  text: string;
  isScamAction: boolean;
};

export type Scenario = {
  id: string;
  title: string;
  introAudioText: string;
  question: string;
  media: {
    type: MediaType;
    sender: string;
    content: string;
    highlights?: Highlight[];
  };
  options: ScenarioOption[];
  feedback: {
    successText: string;
    successAudio: string;
    failText: string;
    failAudio: string;
  };
  postScamSteps?: {
    instruction: string;
    actionText: string;
  }[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "whatsapp-filho",
    title: "Nova Mensagem no WhatsApp",
    introAudioText: "Você recebeu uma mensagem no WhatsApp de um número desconhecido que diz ser seu filho. O que você deve fazer?",
    question: "O que você deve fazer ao receber esta mensagem?",
    media: {
      type: "whatsapp",
      sender: "(11) 99999-8888",
      content: "Oi mãe, meu celular quebrou e estou usando este número novo. Salva aí. Tem como me fazer um PIX urgente pra pagar o conserto? 300 reais.",
      highlights: [
        { 
          id: "h1", 
          x: 60, y: 30, width: 35, height: 20, 
          description: "Pedido de PIX urgente",
          detailedDescription: "Os golpistas geralmente invocam um senso de urgência, pedindo que a transferência seja feita rapidamente. Eles inventam contas a pagar, celular quebrado ou acidentes.",
          preventionTip: "Sempre que alguém pedir dinheiro, ignore o número e ligue imediatamente por voz ou vídeo para o contato antigo e original da pessoa." 
        }
      ]
    },
    options: [
      { id: "opt1", text: "Fazer o PIX rapidamente para ajudar", isScamAction: true },
      { id: "opt2", text: "Ligar para o número antigo por voz para confirmar", isScamAction: false },
    ],
    feedback: {
      successText: "Muito bem! Você não caiu no golpe.",
      successAudio: "Muito bem. Você está protegido e não caiu na armadilha. Sempre ligue para o número antigo para confirmar a história.",
      failText: "Cuidado! Este é um golpe comum.",
      failAudio: "Atenção. Você acabou de cair num golpe. Golpistas usam números novos e fotos roubadas para pedir dinheiro.",
    },
    postScamSteps: [
      { instruction: "Se você fez o PIX, ligue imediatamente para o seu banco usando o número no verso do seu cartão.", actionText: "Ligar para o Banco" },
      { instruction: "Bloqueie e denuncie o número suspeito no WhatsApp.", actionText: "Bloquear Contato" }
    ]
  },
  {
    id: "sms-banco",
    title: "SMS do Banco",
    introAudioText: "Você recebeu um SMS dizendo que seu aplicativo do banco será bloqueado. E agora?",
    question: "Como você deve reagir a este SMS?",
    media: {
      type: "sms",
      sender: "BANCO INFORMA",
      content: "Sua conta foi BLOQUEADA preventivamente. Para desbloquear e evitar multas, clique no link: http://banco-seguro.xy/login",
      highlights: [
        { 
          id: "h2", 
          x: 10, y: 70, width: 80, height: 25, 
          description: "Link estranho que não é do seu banco",
          detailedDescription: "A URL apresentada na mensagem termina em '.xy/login', que não é usada por instituições bancárias legítimas. Bancos usam domínios oficiais '.com.br' ou '.b.br'.",
          preventionTip: "Nunca clique em links recebidos por SMS. Para verificar bloqueios, feche a mensagem e abra diretamente o aplicativo oficial do banco no seu celular."
        }
      ]
    },
    options: [
      { id: "opt1", text: "Clicar no link e digitar a senha pra resolver", isScamAction: true },
      { id: "opt2", text: "Ignorar o SMS e abrir o aplicativo oficial", isScamAction: false },
    ],
    feedback: {
      successText: "Perfeito! Bancos não mandam links por SMS.",
      successAudio: "Perfeito. Você fez a coisa certa. Bancos nunca enviam links pedindo senhas por mensagem. Na dúvida, use apenas o aplicativo oficial.",
      failText: "Cuidado! Esse link é falso e rouba senhas.",
      failAudio: "Cuidado. Você clicou em um link perigoso. Se digitar sua senha lá, os criminosos terão acesso à sua conta.",
    },
    postScamSteps: [
      { instruction: "Altere a senha do seu aplicativo bancário imediatamente.", actionText: "Trocar Senha" },
      { instruction: "Entre em contato com o seu gerente.", actionText: "Falar com Gerente" }
    ]
  },
  {
    id: "sms-correios",
    title: "Aviso de Encomenda Retida",
    introAudioText: "Você recebeu um SMS dizendo que uma encomenda está presa nos Correios esperando pagamento. O que você faz?",
    question: "Qual a melhor atitude ao receber esta mensagem?",
    media: {
      type: "sms",
      sender: "CORREIOS INFORMA",
      content: "Sua encomenda internacional esta retida na alfandega. Pague a taxa de R$ 27,90 para liberar a entrega: http://correios-liberacao-taxa.xyz/pagamento",
      highlights: [
        { 
          id: "h3", 
          x: 10, y: 65, width: 80, height: 25, 
          description: "Link com final '.xyz', que não pertence aos Correios oficiais.",
          detailedDescription: "Golpistas aproveitam o grande volume de compras online para enviar mensagens falsas fingindo ser a transportadora, com links que levam a páginas falsas de pagamento.",
          preventionTip: "Copie o código de rastreio e digite diretamente em 'correios.com.br'. Não pague boletos ou Pix em sites que vieram por SMS."
        }
      ]
    },
    options: [
      { id: "opt1", text: "Clicar no link e pagar a taxa para não perder o pacote", isScamAction: true },
      { id: "opt2", text: "Entrar no site oficial dos Correios e colocar o código de rastreio", isScamAction: false },
    ],
    feedback: {
      successText: "Ótima escolha! Você evitou um golpe.",
      successAudio: "Ótima escolha. Os golpes de encomendas retidas são muito comuns. Sempre acesse o site oficial dos Correios e use o seu código de rastreio próprio.",
      failText: "Cuidado! Este é o golpe da falsa encomenda.",
      failAudio: "Atenção. Você caiu no golpe da encomenda retida. Os criminosos usam mensagens falsas dos Correios para roubar dinheiro. Nunca clique em links de pagamentos que chegam de surpresa.",
    },
    postScamSteps: [
      { instruction: "Cancele o seu cartão de crédito se você tiver colocado os dados no site.", actionText: "Bloquear Cartão" },
      { instruction: "Sempre exija ou confira o código de rastreio real da sua compra.", actionText: "Anotar Dica" }
    ]
  },
  {
    id: "email-conta",
    title: "Conta de Energia Vencida",
    introAudioText: "Chegou um e-mail urgente dizendo que sua luz será cortada se você não pagar. Como você reage?",
    question: "O que observar neste e-mail de cobrança?",
    media: {
      type: "email",
      sender: "cobranca@energia-fatura-web.com",
      content: "Aviso de Corte: Prezado cliente, consta um débito aberto na sua instalação. A energia será CORTADA nas próximas 24 horas. Baixe o boleto atualizado: [Boleto_Novembro.zip]",
      highlights: [
        { 
          id: "h4", 
          x: 5, y: 15, width: 90, height: 20, 
          description: "O endereço de e-mail do remetente é estranho e não é o oficial da empresa.",
          detailedDescription: "Embora o nome apareça como 'Cobrança', o endereço real é '@energia-fatura-web.com', um domínio que não pertence a nenhuma companhia de energia legítima do Brasil.",
          preventionTip: "Trate como suspeita qualquer cobrança que venha de um e-mail que você não reconhece explicitamente."
        },
        { 
          id: "h5", 
          x: 5, y: 75, width: 90, height: 20, 
          description: "Anexo em formato '.zip'. Boletos reais são em '.pdf' ou código de barras no próprio e-mail.",
          detailedDescription: "Arquivos .zip ou .exe costumam conter programas ocultos que se instalam no computador, funcionando como vírus espião para capturar suas senhas de banco.",
          preventionTip: "Jamais baixe ou clique em anexos .zip que vieram anexados em contas surpresa."
        }
      ]
    },
    options: [
      { id: "opt1", text: "Baixar o arquivo logo para evitar o corte de energia", isScamAction: true },
      { id: "opt2", text: "Pegar uma conta de luz antiga e ligar para o telefone do atendimento", isScamAction: false },
    ],
    feedback: {
      successText: "Excelente! Você evitou baixar um vírus no seu celular.",
      successAudio: "Excelente. Você percebeu que a conta não era real. Ameaças de corte de energia por e-mail com botões para baixar arquivos são golpes para instalar vírus.",
      failText: "Perigo! Você baixou um arquivo malicioso.",
      failAudio: "Perigo. Ao tentar baixar esse boleto, você instalaria um vírus capaz de roubar suas senhas e dados do celular.",
    },
    postScamSteps: [
      { instruction: "Se baixou e abriu o arquivo, instale e rode um antivírus no seu aparelho.", actionText: "Verificar Vírus" },
      { instruction: "Troque as senhas dos seus e-mails e aplicativos de banco.", actionText: "Mudar Senhas" }
    ]
  },
  {
    id: "whatsapp-governo",
    title: "Dinheiro Esquecido do Governo",
    introAudioText: "Uma mensagem no WhatsApp diz que você tem dinheiro para receber do Governo. É verdade?",
    question: "Qual deve ser sua atitude perante essa promessa de dinheiro fácil?",
    media: {
      type: "whatsapp",
      sender: "Sistema Gov PIX (Verificado)",
      content: "GOV.BR AVISA: Consta em nosso sistema um resgate de R$ 3.250,10 referente a valores esquecidos do Banco Central. Acesse agora e informe seu CPF para receber o PIX: http://resgate-valores-brasil.org",
      highlights: [
        { 
          id: "h6", 
          x: 10, y: 70, width: 80, height: 25, 
          description: "Link falso que não é o site verdadeiro '.gov.br'.",
          detailedDescription: "Sistemas federais reais utilizam exclusivamente a terminação '.gov.br'. O link apontado usa '.org', uma isca usada para roubar seu CPF.",
          preventionTip: "Para consultar valores a receber do Banco Central, acesse apenas o site 'valoresareceber.bcb.gov.br' e em nenhum outro lugar."
        },
        { 
          id: "h7", 
          x: 20, y: 40, width: 60, height: 20, 
          description: "Promessa de muito dinheiro gerando ganância.",
          detailedDescription: "Golpes oferecem quantias grandes exatas para induzir a pessoa a agir por impulso e emoção, esquecendo-se da razão.",
          preventionTip: "Mantenha a calma diante de promessas de dinheiro fácil. Desconfie e procure os canais oficiais."
        }
      ]
    },
    options: [
      { id: "opt1", text: "Digitar meu CPF para ver se realmente tenho o dinheiro", isScamAction: true },
      { id: "opt2", text: "Ignorar e bloquear o contato, pois o governo não manda WhatsApp", isScamAction: false },
    ],
    feedback: {
      successText: "Muito bem! O governo não entra em contato oferecendo dinheiro dessa forma.",
      successAudio: "Muito bem. Você está atento. O Governo não envia mensagens oferecendo Pix para resgate de valores. A mensagem busca roubar seus dados de CPF e contas bancárias.",
      failText: "Cuidado com dinheiro fácil!",
      failAudio: "Atenção. Você forneceu seus dados para criminosos. A promessa de dinheiro fácil é uma isca muito usada. O Governo não entra em contato pedindo dados pelo WhatsApp.",
    },
    postScamSteps: [
      { instruction: "Fique alerta para ligações ou vendas de falso empréstimo em seu nome, já que os criminosos têm seu CPF.", actionText: "Ficar Atento" },
      { instruction: "Nunca passe informações pessoais em sites desconhecidos.", actionText: "Anotar Dica" }
    ]
  }
];
