import type { InternalSystem } from './types';

/**
 * Sistemas internos corporativos — visão geral autorizada.
 *
 * IMPORTANTE: conteúdo anonimizado por sigilo. Nenhum nome de empresa, cliente,
 * regra de negócio ou dado sensível é exposto. Os textos abaixo são um RASCUNHO
 * inicial (inferido da referência visual) para o Pedro revisar/substituir.
 * Prints reais devem ser depositados em `public/sistemas/` e referenciados em
 * `cover` / `shots`; enquanto `src` estiver ausente, exibimos um placeholder.
 */
export const systems: InternalSystem[] = [
  {
    slug: 'onboarding-clientes',
    name: 'Onboarding de Clientes',
    tagline:
      'Fluxo guiado para os primeiros passos e integração de novos clientes ao ecossistema interno.',
    objective:
      'Padronizar e acelerar a entrada de novos clientes, eliminando etapas manuais e retrabalho na implantação.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL'],
    cover: { alt: 'Tela de onboarding de clientes (amostra autorizada).' },
    problem:
      'A integração de novos clientes era feita de forma manual e dispersa, sem um roteiro único — gerando inconsistência, etapas esquecidas e dependência de pessoas específicas.',
    solution:
      'Criei um fluxo guiado de onboarding que centraliza as etapas de integração em uma jornada única, com validações e acompanhamento de progresso.',
    challenges: [
      'Mapear um processo que existia apenas no conhecimento tácito da equipe.',
      'Tornar o fluxo flexível sem perder a padronização.',
    ],
    improvements: [
      'Tempo de integração reduzido e mais previsível.',
      'Menos retrabalho e etapas esquecidas.',
      'Onboarding deixou de depender de uma única pessoa.',
    ],
    role: 'Responsável pelo levantamento do processo, modelagem e desenvolvimento da solução ponta a ponta.',
    shots: [
      {
        alt: 'Etapa do fluxo de onboarding (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'ouvidoria-atendimento',
    name: 'Ouvidoria & Atendimento',
    tagline:
      'Canal interno para registro, triagem e acompanhamento de solicitações e suporte.',
    objective:
      'Centralizar a comunicação de suporte em um único canal rastreável, com histórico e status de cada solicitação.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL'],
    cover: { alt: 'Painel de ouvidoria e atendimento (amostra autorizada).' },
    problem:
      'Solicitações chegavam por canais diversos e se perdiam, sem rastreabilidade nem histórico — dificultando priorização e acompanhamento.',
    solution:
      'Desenvolvi um canal centralizado de ouvidoria e atendimento, com registro estruturado, triagem e acompanhamento de status de cada demanda.',
    challenges: [
      'Unificar fontes de solicitação dispersas em um fluxo único.',
      'Equilibrar simplicidade de uso com rastreabilidade.',
    ],
    improvements: [
      'Rastreabilidade completa das solicitações.',
      'Priorização mais clara e respostas mais rápidas.',
      'Histórico consolidado para decisões.',
    ],
    role: 'Concepção, modelagem de dados e desenvolvimento da aplicação.',
    shots: [
      {
        alt: 'Tela de registro de atendimento (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'report-bugs-feedback',
    name: 'Report de Bugs & Feedback',
    tagline:
      'Estúdio interno para montar relatórios de bugs e coletar feedback por módulo.',
    objective:
      'Estruturar o registro de bugs e feedback, transformando relatos soltos em relatórios organizados e acionáveis.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL'],
    cover: { alt: 'Estúdio de relatório de bugs (amostra autorizada).' },
    problem:
      'Bugs e feedback eram reportados de forma informal e incompleta, sem padronização — dificultando a análise e o encaminhamento para a equipe técnica.',
    solution:
      'Construí um estúdio de relatórios que padroniza o registro de bugs e feedback por módulo, com campos guiados e geração de relatório consolidado.',
    challenges: [
      'Definir um formato de relatório útil tanto para quem reporta quanto para quem corrige.',
      'Coletar feedback por módulo sem tornar o preenchimento cansativo.',
    ],
    improvements: [
      'Relatos padronizados e mais completos.',
      'Encaminhamento técnico mais rápido.',
      'Visão por módulo do que precisa de atenção.',
    ],
    role: 'Desenvolvimento da ferramenta e definição da estrutura de relatório.',
    shots: [
      {
        alt: 'Formulário de novo bug (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'dashboard-status-clientes',
    name: 'Dashboard de Status de Clientes',
    tagline:
      'Painel de controle com visão consolidada do status e das atividades dos clientes.',
    objective:
      'Dar à equipe uma visão única e em tempo real do status dos clientes, atividades recentes e próximas ações.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL', 'Charts'],
    cover: { alt: 'Dashboard de status de clientes (amostra autorizada).' },
    problem:
      'Não havia uma visão consolidada do status dos clientes — as informações ficavam espalhadas, dificultando o acompanhamento e a tomada de decisão.',
    solution:
      'Desenvolvi um dashboard que reúne status, atividades recentes e próximas ações em uma única tela, com indicadores e gráficos.',
    challenges: [
      'Agregar dados de diferentes fontes em indicadores claros.',
      'Manter o painel performático com atualização frequente.',
    ],
    improvements: [
      'Visão consolidada e em tempo real.',
      'Decisões mais rápidas e embasadas.',
      'Acompanhamento proativo de pendências.',
    ],
    role: 'Modelagem dos indicadores e desenvolvimento do painel.',
    shots: [
      {
        alt: 'Visão geral do dashboard (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'formulario-implantacao',
    name: 'Formulário Operacional de Implantação',
    tagline:
      'Documento digital de implantação: mapeamento do cliente, checklist técnico e validação final.',
    objective:
      'Substituir o preenchimento manual de implantação por um formulário operacional digital, exportável e validado.',
    status: 'Finalizado',
    tech: ['React', 'TypeScript', 'Node.js', 'PDF Export'],
    cover: { alt: 'Formulário operacional de implantação (amostra autorizada).' },
    problem:
      'A implantação dependia de documentos manuais e dispersos, sujeitos a erro e sem checklist técnico consistente.',
    solution:
      'Criei um formulário operacional digital para mapeamento do cliente, planejamento, checklist técnico e validação, com salvamento de progresso e exportação.',
    challenges: [
      'Traduzir um documento operacional extenso em um formulário usável.',
      'Garantir consistência dos dados com validações.',
    ],
    improvements: [
      'Implantação documentada de forma padronizada.',
      'Menos erros de preenchimento.',
      'Exportação rápida para uso interno.',
    ],
    role: 'Levantamento do documento operacional e desenvolvimento do formulário.',
    shots: [
      {
        alt: 'Seção de identificação do formulário (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'agenda-operacional',
    name: 'Agenda Operacional',
    tagline:
      'Agenda interna com ações e validações após etapas do fluxo operacional.',
    objective:
      'Organizar ações operacionais e validações em uma agenda única, conectada ao fluxo de trabalho da equipe.',
    status: 'Em desenvolvimento',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API'],
    cover: { alt: 'Agenda operacional (amostra autorizada).' },
    problem:
      'Ações e validações operacionais ficavam dispersas, sem um lugar único que conectasse tarefas ao andamento do fluxo.',
    solution:
      'Estou desenvolvendo uma agenda operacional que centraliza ações e validações, integrada às demais etapas do ecossistema interno.',
    challenges: [
      'Integrar a agenda aos fluxos já existentes.',
      'Modelar ações que dependem de etapas anteriores.',
    ],
    improvements: [
      'Centralização das ações operacionais (em evolução).',
      'Menos tarefas esquecidas (em evolução).',
    ],
    role: 'Concepção e desenvolvimento em andamento.',
    shots: [
      {
        alt: 'Prévia da agenda operacional (amostra autorizada).',
        caption: 'Amostra autorizada · em desenvolvimento.',
      },
    ],
  },
];
