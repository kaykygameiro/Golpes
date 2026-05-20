export type MediaType = 'whatsapp' | 'email' | 'sms' | 'pix' | 'instagram' | 'browser';

export interface Highlight {
  id: string;
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
    baseImage: string;
    highlightedImage: string;
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
    description: 'Engenharia social via WhatsApp e redes sociais.',
    scenarios: [
      {
        id: 'wa-codigo',
        title: 'Tentativa de Clonagem',
        introAudioText: 'Um suposto suporte solicita um código enviado por SMS para atualizar seu anúncio.',
        question: 'Como você deve proceder?',
        media: {
          type: 'whatsapp',
          sender: 'Suporte Vendas Desapego',
          baseImage: '/images/scenarios/mod1-cen1-base.png',
          highlightedImage: '/images/scenarios/mod1-cen1-alert.png',
          highlights: [
            {
              id: 'hl1',
              description: 'Solicitação de código de segurança',
              detailedDescription: 'O atendente pede o código de verificação do WhatsApp que acabou de chegar por SMS para ativar sua conta em outro celular.',
              preventionTip: 'Nunca repasse códigos de verificação recebidos por SMS.'
            }
          ]
        },
        options: [
          { id: 'op1', text: 'Enviar o código SMS para manter o anúncio ativo', isScamAction: true },
          { id: 'op2', text: 'Recusar o envio e verificar o status direto no aplicativo', isScamAction: false }
        ],
        feedback: {
          successText: 'Excelente. Você protegeu sua conta contra o roubo de perfil.',
          failText: 'Atenção. Ao enviar esse código, o criminoso assume o controle do seu WhatsApp.'
        }
      },
      {
        id: 'wa-tarefas',
        title: 'Renda Extra Fácil',
        introAudioText: 'Um número internacional aborda você oferecendo dinheiro rápido para cumprir tarefas.',
        question: 'Qual a atitude correta diante dessa proposta?',
        media: {
          type: 'whatsapp',
          sender: '+1 (234) 555-0192',
          baseImage: '/images/scenarios/mod1-cen2-base.png',
          highlightedImage: '/images/scenarios/mod1-cen2-alert.png',
          highlights: [
            {
              id: 'hl2',
              description: 'Número estrangeiro e link suspeito',
              detailedDescription: 'Criminosos usam números internacionais para disparar promessas de dinheiro fácil e enviar links maliciosos.',
              preventionTip: 'Desconfie imediatamente de DDDs estrangeiros e propostas de dinheiro fácil.'
            }
          ]
        },
        options: [
          { id: 'op3', text: 'Clicar no link e iniciar as tarefas para garantir a vaga', isScamAction: true },
          { id: 'op4', text: 'Bloquear o contato e reportar a mensagem como spam', isScamAction: false }
        ],
        feedback: {
          successText: 'Perfeito. Esse é o golpe da tarefa, que induz depósitos financeiros posteriores.',
          failText: 'Cuidado. Esse fluxo leva a grupos onde exigirão adiantamentos em dinheiro.'
        }
      },
      {
        id: 'wa-familiar',
        title: 'O Novo Número do Familiar',
        introAudioText: 'Alguém com um número desconhecido diz ser seu familiar e pede um Pix urgente.',
        question: 'O que fazer ao receber este pedido?',
        media: {
          type: 'whatsapp',
          sender: '(11) 99999-8888',
          baseImage: '/images/scenarios/mod1-cen3-base.png',
          highlightedImage: '/images/scenarios/mod1-cen3-alert.png',
          highlights: [
            {
              id: 'hl3',
              description: 'Número desconhecido pedindo dinheiro',
              detailedDescription: 'Golpistas usam fotos de redes sociais para se passar por parentes e pedir Pix de emergência.',
              preventionTip: 'Sempre ligue por voz ou vídeo para o número antigo do seu familiar para confirmar a história.'
            }
          ]
        },
        options: [
          { id: 'op5', text: 'Fazer o Pix rapidamente para ajudar', isScamAction: true },
          { id: 'op6', text: 'Ligar para o número antigo do familiar para confirmar', isScamAction: false }
        ],
        feedback: {
          successText: 'Muito bem. Ligar para o número original é a melhor defesa.',
          failText: 'Perigo. Você acabou de transferir dinheiro para um estelionatário.'
        }
      },
      {
        id: 'msg-verificacao',
        title: 'Falsa Verificação de Conta',
        introAudioText: 'Você recebe uma mensagem direta alertando sobre o bloqueio da sua conta.',
        question: 'Como reagir a este aviso de segurança?',
        media: {
          type: 'instagram',
          sender: 'Security Center',
          baseImage: '/images/scenarios/mod1-cen4-base.png',
          highlightedImage: '/images/scenarios/mod1-cen4-alert.png',
          highlights: [
            {
              id: 'hl4',
              description: 'Senso de urgência extremo e link falso',
              detailedDescription: 'Ameaças de bloqueio em 24 horas são usadas para forçar a vítima a clicar no link sem pensar.',
              preventionTip: 'Plataformas oficiais não enviam links de login por mensagem direta. Acesse as configurações de segurança pelo menu do aplicativo.'
            }
          ]
        },
        options: [
          { id: 'op7', text: 'Clicar no link e fazer login para evitar o bloqueio', isScamAction: true },
          { id: 'op8', text: 'Ignorar a mensagem e checar a segurança nas configurações do app', isScamAction: false }
        ],
        feedback: {
          successText: 'Exato. Ignorar mensagens diretas com links evita o roubo de senhas.',
          failText: 'Atenção. O link leva a uma página falsa que captura suas credenciais de login.'
        }
      },
      {
        id: 'wa-brinde',
        title: 'O Golpe do Brinde Falso',
        introAudioText: 'Um contato encaminha uma promoção imperdível de ovos de páscoa grátis.',
        question: 'O que analisar antes de clicar?',
        media: {
          type: 'whatsapp',
          sender: 'Contato Conhecido',
          baseImage: '/images/scenarios/mod1-cen5-base.png',
          highlightedImage: '/images/scenarios/mod1-cen5-alert.png',
          highlights: [
            {
              id: 'hl5',
              description: 'Mensagem encaminhada com domínio estranho',
              detailedDescription: 'Promoções de marcas famosas com links terminados em .xyz ou .net geralmente são falsas e disseminadas por correntes.',
              preventionTip: 'Não clique em links de promoções repassadas no WhatsApp. Acesse o site oficial da marca ou as redes sociais verificadas para confirmar.'
            }
          ]
        },
        options: [
          { id: 'op9', text: 'Acessar o link e responder ao quiz para ganhar o brinde', isScamAction: true },
          { id: 'op10', text: 'Avisar o contato que é golpe e apagar a mensagem', isScamAction: false }
        ],
        feedback: {
          successText: 'Correto. Promoções fáceis repassadas por correntes são sempre fraudulentas.',
          failText: 'Cuidado. Ao final do quiz, eles pedirão seus dados pessoais ou pagamento de um frete falso.'
        }
      }
    ]
  },
  {
    id: 'mod-financeiro',
    title: 'Módulo 2: Engenharia Financeira',
    description: 'Falsas centrais telefônicas e alertas bancários simulados.',
    scenarios: [
      {
        id: 'sms-central',
        title: 'Falsa Central de Segurança',
        introAudioText: 'Um SMS alarmante avisa sobre um Pix de alto valor agendado em sua conta.',
        question: 'O que fazer ao receber este SMS?',
        media: {
          type: 'sms',
          sender: 'NOTIFICA-BANCO',
          baseImage: '/images/scenarios/mod2-cen1-base.png',
          highlightedImage: '/images/scenarios/mod2-cen1-alert.png',
          highlights: [
            {
              id: 'hl6',
              description: 'Número 0800 falso no corpo do texto',
              detailedDescription: 'Golpistas alugam linhas 0800 reais para simular uma central bancária. Ao ligar, induzem a realização de transferências.',
              preventionTip: 'Nunca ligue para números fornecidos em SMS. Utilize apenas o telefone impresso no verso do seu cartão.'
            }
          ]
        },
        options: [
          { id: 'op11', text: 'Ligar para o 0800 indicado para cancelar a transação', isScamAction: true },
          { id: 'op12', text: 'Abrir o aplicativo do banco para checar o extrato', isScamAction: false }
        ],
        feedback: {
          successText: 'Ótimo. Você evitou interagir com uma falsa central.',
          failText: 'Perigo. Na ligação, criminosos treinados pedirão que você faça um Pix para "estornar" o valor.'
        }
      },
      {
        id: 'pix-engano',
        title: 'O Falso Estorno de Pix',
        introAudioText: 'Um desconhecido envia o comprovante de um Pix feito por engano e pede devolução.',
        question: 'Como proceder de forma segura?',
        media: {
          type: 'whatsapp',
          sender: '(21) 98888-7777',
          baseImage: '/images/scenarios/mod2-cen2-base.png',
          highlightedImage: '/images/scenarios/mod2-cen2-alert.png',
          highlights: [
            {
              id: 'hl7',
              description: 'Comprovante falso enviado por mensagem',
              detailedDescription: 'Criminosos enviam comprovantes adulterados ou agendados, fazendo a vítima devolver dinheiro que nunca entrou na conta.',
              preventionTip: 'Nunca devolva valores baseando-se em prints. Abra o app do banco e confira se o saldo realmente aumentou.'
            }
          ]
        },
        options: [
          { id: 'op13', text: 'Fazer o Pix de devolução imediatamente para ajudar a pessoa', isScamAction: true },
          { id: 'op14', text: 'Checar o extrato bancário oficial antes de qualquer ação', isScamAction: false }
        ],
        feedback: {
          successText: 'Excelente. A checagem direta no extrato é a única garantia.',
          failText: 'Atenção. Você provavelmente enviou o seu próprio dinheiro para o golpista.'
        }
      },
      {
        id: 'wa-emprestimo',
        title: 'Empréstimo com Taxa Antecipada',
        introAudioText: 'Você recebe a aprovação de um grande empréstimo, mas precisa pagar uma taxa.',
        question: 'Qual a atitude correta?',
        media: {
          type: 'whatsapp',
          sender: 'CredFácil Oficial',
          baseImage: '/images/scenarios/mod2-cen3-base.png',
          highlightedImage: '/images/scenarios/mod2-cen3-alert.png',
          highlights: [
            {
              id: 'hl8',
              description: 'Cobrança de taxa antecipada para liberar crédito',
              detailedDescription: 'A exigência de pagamento de taxa de avalista ou seguro para liberar empréstimo é crime.',
              preventionTip: 'Bancos e financeiras reais não cobram taxas via Pix para liberar um empréstimo aprovado.'
            }
          ]
        },
        options: [
          { id: 'op15', text: 'Pagar a taxa para receber os R$ 15.000,00', isScamAction: true },
          { id: 'op16', text: 'Recusar, pois cobrança antecipada de empréstimo é fraude', isScamAction: false }
        ],
        feedback: {
          successText: 'Correto. Empréstimos legítimos descontam taxas do valor total, nunca pedem Pix antes.',
          failText: 'Cuidado. Após o pagamento da taxa, o falso banco bloqueará o seu número.'
        }
      },
      {
        id: 'sms-cartao',
        title: 'Falsa Atualização de Cartão',
        introAudioText: 'Um alerta diz que seu cartão será bloqueado se não atualizar os dados.',
        question: 'O que observar na mensagem?',
        media: {
          type: 'sms',
          sender: 'BR-SEGURANCA',
          baseImage: '/images/scenarios/mod2-cen4-base.png',
          highlightedImage: '/images/scenarios/mod2-cen4-alert.png',
          highlights: [
            {
              id: 'hl9',
              description: 'Ameaça de multas e link malicioso',
              detailedDescription: 'O link externo leva a uma página idêntica à do banco para roubar o número do cartão e a senha.',
              preventionTip: 'Não atualize dados bancários por links de SMS. Vá até a agência ou use o app oficial.'
            }
          ]
        },
        options: [
          { id: 'op17', text: 'Acessar o link e inserir os dados do cartão para evitar bloqueio', isScamAction: true },
          { id: 'op18', text: 'Ignorar o link e ligar para o número oficial atrás do cartão físico', isScamAction: false }
        ],
        feedback: {
          successText: 'Muito bem. Bancos não ameaçam clientes com multas via SMS.',
          failText: 'Atenção. Você acabou de entregar os dados do seu cartão para criminosos.'
        }
      },
      {
        id: 'email-divida',
        title: 'Falso Desconto de Dívida',
        introAudioText: 'Um e-mail oferece um acordo imperdível para limpar seu nome.',
        question: 'Como avaliar a legitimidade do boleto?',
        media: {
          type: 'email',
          sender: 'cobranca@recupera-credito-br.com',
          baseImage: '/images/scenarios/mod2-cen5-base.png',
          highlightedImage: '/images/scenarios/mod2-cen5-alert.png',
          highlights: [
            {
              id: 'hl10',
              description: 'Remetente suspeito e grande desconto imediato',
              detailedDescription: 'Quadrilhas emitem boletos falsos ou códigos Pix simulando empresas de recuperação de crédito.',
              preventionTip: 'Confira sempre o nome do beneficiário na tela do aplicativo do banco antes de digitar a senha do Pix ou boleto.'
            }
          ]
        },
        options: [
          { id: 'op19', text: 'Pagar o boleto com desconto antes do vencimento às 16h', isScamAction: true },
          { id: 'op20', text: 'Entrar no site Serasa Limpa Nome para conferir se a dívida existe', isScamAction: false }
        ],
        feedback: {
          successText: 'Perfeito. Consultar os canais oficiais de crédito é a atitude correta.',
          failText: 'Cuidado. Você pagou um boleto falso e a sua dívida real continua ativa.'
        }
      }
    ]
  },
  {
    id: 'mod-compras',
    title: 'Módulo 3: Compras e Links Falsos',
    description: 'Anúncios fraudulentos e falsas taxas de entrega.',
    scenarios: [
      {
        id: 'sms-correios',
        title: 'Taxa de Alfândega Falsa',
        introAudioText: 'Notificação informa que uma encomenda internacional foi retida na alfândega.',
        question: 'Qual a melhor ação para evitar prejuízos?',
        media: {
          type: 'sms',
          sender: 'CORREIOS',
          baseImage: '/images/scenarios/mod3-cen1-base.png',
          highlightedImage: '/images/scenarios/mod3-cen1-alert.png',
          highlights: [
            {
              id: 'hl11',
              description: 'Link com domínio falso fora do padrão governamental',
              detailedDescription: 'O link aponta para um site falso criado para roubar dados de cartão e Pix.',
              preventionTip: 'Ignore links em SMS. Pegue o código de rastreamento da sua compra e jogue direto no site correios.com.br.'
            }
          ]
        },
        options: [
          { id: 'op21', text: 'Clicar no link e efetuar o pagamento da taxa', isScamAction: true },
          { id: 'op22', text: 'Ignorar o link e rastrear o objeto no site oficial dos Correios', isScamAction: false }
        ],
        feedback: {
          successText: 'Muito bem. Você evitou o golpe do falso rastreio.',
          failText: 'Atenção. O pagamento foi para uma empresa de fachada, não para os Correios.'
        }
      },
      {
        id: 'email-oferta',
        title: 'Oferta Irresistível por E-mail',
        introAudioText: 'Um anúncio mostra um Ar Condicionado por menos da metade do preço.',
        question: 'Como avaliar essa promoção?',
        media: {
          type: 'email',
          sender: 'promocoes@outlet-eletronicos-brasil.com',
          baseImage: '/images/scenarios/mod3-cen2-base.png',
          highlightedImage: '/images/scenarios/mod3-cen2-alert.png',
          highlights: [
            {
              id: 'hl12',
              description: 'Preço abaixo do mercado e remetente não oficial',
              detailedDescription: 'Golpistas imitam grandes varejistas oferecendo preços impossíveis para coletar Pix.',
              preventionTip: 'Se o preço for bom demais para ser verdade, desconfie e acesse o site da loja digitando a URL no navegador.'
            }
          ]
        },
        options: [
          { id: 'op23', text: 'Aproveitar a oportunidade e realizar o pagamento via Pix', isScamAction: true },
          { id: 'op24', text: 'Verificar a reputação da loja e o preço médio do produto na internet', isScamAction: false }
        ],
        feedback: {
          successText: 'Parabéns. O ceticismo com ofertas milagrosas protege seu dinheiro.',
          failText: 'Cuidado. Lojas fantasmas desaparecem poucas horas após receberem o pagamento.'
        }
      },
      {
        id: 'ig-anuncio',
        title: 'Falso Anúncio Patrocinado',
        introAudioText: 'Um post patrocinado no Instagram vende um smartphone top de linha em liquidação.',
        question: 'O que denunciar nesse anúncio?',
        media: {
          type: 'instagram',
          sender: 'Magazine Promos',
          baseImage: '/images/scenarios/mod3-cen3-base.png',
          highlightedImage: '/images/scenarios/mod3-cen3-alert.png',
          highlights: [
            {
              id: 'hl13',
              description: 'Perfil sem verificação vendendo muito barato',
              detailedDescription: 'Criminosos pagam por anúncios para dar credibilidade às suas lojas falsas no feed.',
              preventionTip: 'Anúncio pago não é garantia de loja segura. Verifique sempre se o perfil tem selo azul e comentários reais.'
            }
          ]
        },
        options: [
          { id: 'op25', text: 'Clicar no anúncio e comprar o smartphone na promoção', isScamAction: true },
          { id: 'op26', text: 'Verificar o perfil da loja e buscar reclamações em sites de defesa do consumidor', isScamAction: false }
        ],
        feedback: {
          successText: 'Correto. Os anúncios patrocinados também podem conter fraudes.',
          failText: 'Atenção. Você clicou em um anúncio que leva para um gateway de pagamento falso.'
        }
      },
      {
        id: 'email-energia',
        title: 'Ameaça de Corte de Energia',
        introAudioText: 'Um aviso por e-mail diz que sua energia será cortada se não pagar o Pix anexo.',
        question: 'Como confirmar este débito?',
        media: {
          type: 'email',
          sender: 'atendimento@energia-fatura-web.com',
          baseImage: '/images/scenarios/mod3-cen4-base.png',
          highlightedImage: '/images/scenarios/mod3-cen4-alert.png',
          highlights: [
            {
              id: 'hl14',
              description: 'Ameaça imediata de corte e e-mail suspeito',
              detailedDescription: 'Empresas de energia não enviam códigos Pix aleatórios ameaçando corte em 24h por e-mail.',
              preventionTip: 'Baixe a segunda via da conta diretamente no aplicativo oficial da sua distribuidora de energia.'
            }
          ]
        },
        options: [
          { id: 'op27', text: 'Copiar o código Pix e pagar para evitar ficar sem luz', isScamAction: true },
          { id: 'op28', text: 'Acessar o site ou app oficial da companhia de luz para verificar débitos', isScamAction: false }
        ],
        feedback: {
          successText: 'Excelente. Consultar a empresa através dos canais oficiais evita sustos.',
          failText: 'Perigo. O dinheiro pago pelo código Pix foi direto para a conta de um laranja.'
        }
      },
      {
        id: 'site-leilao',
        title: 'Falso Leilão Governamental',
        introAudioText: 'Um site com aparência oficial anuncia leilões de eletrônicos apreendidos.',
        question: 'Como identificar que a página é falsa?',
        media: {
          type: 'browser',
          sender: 'Navegador Web',
          baseImage: '/images/scenarios/mod3-cen5-base.png',
          highlightedImage: '/images/scenarios/mod3-cen5-alert.png',
          highlights: [
            {
              id: 'hl15',
              description: 'URL enganosa usando traços',
              detailedDescription: 'A URL usa "gov-br" para enganar a vítima. Sites oficiais do governo brasileiro devem terminar em ".gov.br".',
              preventionTip: 'Leilões oficiais da Receita Federal ocorrem apenas em sistemas acessados via portal e-CAC ou gov.br autêntico.'
            }
          ]
        },
        options: [
          { id: 'op29', text: 'Fazer o cadastro rápido e dar o lance no eletrônico', isScamAction: true },
          { id: 'op30', text: 'Conferir a URL na barra do navegador em busca de fraudes', isScamAction: false }
        ],
        feedback: {
          successText: 'Perfeito. Observar a barra de endereços é a primeira regra de segurança na web.',
          failText: 'Cuidado. Sites de leilão falsos roubam o seu lance e os seus dados pessoais.'
        }
      }
    ]
  }
];
