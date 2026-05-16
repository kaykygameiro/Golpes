export type MediaType = 'whatsapp' | 'email' | 'sms' | 'pix';

export interface Highlight {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  detailedDescription: string;
  preventionTip: string;
}

export interface Scenario {
  id: string;
  title: string;
  introAudioText: string;
  question: string;
  media: {
    type: MediaType;
    sender: string;
    content: string;
    highlights: Highlight[];
  };
  options: {
    id: string;
    text: string;
    isScamAction: boolean;
  }[];
  feedback: {
    successText: string;
    failText: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  scenarios: Scenario[];
}

export const MODULES: Module[] = [
  {
    id: 'mod-mensagens',
    title: 'Módulo 1: Mensagens e Redes Sociais',
    description: 'Engenharia social via WhatsApp e SMS clonados.',
    scenarios: [
      {
        id: 'wa-codigo',
        title: 'Tentativa de Clonagem',
        introAudioText:
          'Um suposto suporte do site de vendas te pede um código enviado por SMS para atualizar seu anúncio. O que fazer?',
        question: 'Como você deve proceder?',
        media: {
          type: 'whatsapp',
          sender: 'Suporte Vendas Desapego',
          content:
            'Prezado cliente, identificamos uma duplicidade em seu anuncio. Para regularizar a publicacao, confirmamos o envio de um token de seguranca SMS de 6 digitos para seu aparelho. Informe o codigo abaixo para evitar a exclusao.',
          highlights: [
            {
              id: 'hl1',
              x: 5,
              y: 10,
              width: 90,
              height: 30,
              description: 'Empresas não pedem códigos SMS recebidos',
              detailedDescription:
                'O suposto suporte está tentando ativar o seu WhatsApp em outro aparelho e precisa do código de verificação que o aplicativo enviou por SMS.',
              preventionTip: 'Nunca repasse códigos de verificação recebidos por SMS para ninguém, sob nenhuma hipótese.'
            }
          ]
        },
        options: [
          { id: 'op1', text: 'Enviar o código SMS para manter o anúncio ativo', isScamAction: true },
          {
            id: 'op2',
            text: 'Recusar o envio e verificar o status direto no aplicativo oficial',
            isScamAction: false
          }
        ],
        feedback: {
          successText: 'Excelente. Você protegeu sua conta contra o roubo de perfil.',
          failText: 'Atenção. Ao enviar esse código, o criminoso assume o controle do seu WhatsApp.'
        }
      },
      {
        id: 'wa-tarefas',
        title: 'Renda Extra Fácil',
        introAudioText: 'Um número internacional te aborda oferecendo dinheiro rápido para curtir vídeos.',
        question: 'Qual a atitude correta diante dessa proposta?',
        media: {
          type: 'whatsapp',
          sender: '+1 (234) 555-0192',
          content:
            'Ola, sou recrutadora da agência Digital Media. Temos vagas de meio periodo online para avaliar marcas no Google. Voce pode ganhar de 100 a 500 reais por dia apenas enviando prints. Clique no link para falar com o gerente no Telegram: http://renda-extra-agencia.net',
          highlights: [
            {
              id: 'hl2',
              x: 5,
              y: 5,
              width: 50,
              height: 15,
              description: 'Número internacional desconhecido',
              detailedDescription:
                'Empresas de recrutamento brasileiras não utilizam números de disparo de outros países para contratações em massa no WhatsApp.',
              preventionTip: 'Desconfie imediatamente de DDDs estrangeiros e propostas de dinheiro fácil por tarefas simples.'
            }
          ]
        },
        options: [
          { id: 'op3', text: 'Clicar no link e iniciar as tarefas para garantir a vaga', isScamAction: true },
          { id: 'op4', text: 'Bloquear o contato e reportar a mensagem como spam', isScamAction: false }
        ],
        feedback: {
          successText: 'Perfeito. Esse é o golpe da tarefa, que induz depósitos financeiros posteriores.',
          failText: 'Cuidado. Esse fluxo leva a grupos onde exigirão pagamentos para liberar saques maiores.'
        }
      }
    ]
  },
  {
    id: 'mod-financeiro',
    title: 'Módulo 2: Engenharia Financeira',
    description: 'Falsas centrais telefônicas e alertas bancários.',
    scenarios: [
      {
        id: 'sms-central',
        title: 'Alerta de Transação Suspeita',
        introAudioText: 'Você recebe um SMS alarmante sobre um Pix de alto valor agendado.',
        question: 'O que fazer ao receber este SMS de alerta?',
        media: {
          type: 'sms',
          sender: 'NOTIFICA-BANCO',
          content:
            'BANCO AVISA: Compra aprovada em Magazine Luiza no valor de R$ 2.490,00. Caso nao reconheca, ligue imediatamente para a Central de Seguranca no 0800-591-0421 para efetuar o cancelamento.',
          highlights: [
            {
              id: 'hl3',
              x: 5,
              y: 50,
              width: 90,
              height: 40,
              description: 'Número 0800 falso',
              detailedDescription:
                'Golpistas contratam números 0800 para simular o atendimento de um banco real. Ao ligar, eles solicitam dados, senhas e transferências simuladas para "estorno".',
              preventionTip:
                'Nunca ligue para números fornecidos em SMS. Use sempre o telefone oficial impresso no verso do seu cartão bancário.'
            }
          ]
        },
        options: [
          { id: 'op5', text: 'Ligar imediatamente para o 0800 indicado para cancelar a transação', isScamAction: true },
          { id: 'op6', text: 'Ignorar o SMS e abrir o aplicativo oficial do banco para checar o extrato', isScamAction: false }
        ],
        feedback: {
          successText: 'Ótimo. Você evitou interagir com a falsa central telefônica.',
          failText: 'Perigo. Ao ligar, criminosos bem treinados usarão termos técnicos para roubar suas credenciais.'
        }
      }
    ]
  }
];
