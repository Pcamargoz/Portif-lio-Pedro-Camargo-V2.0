import type { InternalSystem } from './types';

/**
 * Mídia do topo da seção: logo (parte principal) + linktree dos sistemas.
 * O `logo` só é renderizado quando `src` existir — adicione o arquivo em
 * `public/sistemas/` e descomente abaixo.
 */
export const sistemasMedia: {
  logo?: { src: string; alt: string };
  linktree?: { src: string; alt: string };
} = {
  // logo: {
  //   src: '/sistemas/sistemas-logo.png',
  //   alt: 'Pedro César Camargo dos Santos — Desenvolvedor Back-end.',
  // },
  linktree: {
    src: '/sistemas/sistemas-linktree.jpeg',
    alt: 'Central de acesso aos sistemas internos (amostra autorizada).',
  },
};

/**
 * Sistemas internos corporativos — visão geral autorizada.
 *
 * IMPORTANTE: conteúdo anonimizado por sigilo. Os textos abaixo são um RASCUNHO
 * inicial (inferido da referência visual) para o Pedro revisar/substituir.
 * Prints reais ficam em `public/sistemas/`; enquanto `src` estiver ausente,
 * exibimos um placeholder.
 */
export const systems: InternalSystem[] = [
  {
    slug: 'onboarding-clientes',
    name: 'Onboarding de Clientes',
    tagline:
      'Formulário operacional digital para mapeamento, implantação e checklist técnico de novos clientes.',
    objective:
      'Padronizar e acelerar a entrada de novos clientes, eliminando documentos manuais dispersos e retrabalho na implantação.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL', 'PDF Export'],
    cover: {
      src: '/sistemas/onboarding-clientes.jpeg',
      alt: 'Formulário operacional de onboarding (amostra autorizada).',
    },
    problem:
      'A integração de novos clientes dependia de documentos manuais e dispersos, sem um roteiro único — gerando inconsistência, etapas esquecidas e dependência de pessoas específicas.',
    solution:
      'Criei um formulário operacional digital que centraliza o mapeamento do cliente, o planejamento, o checklist técnico e a validação final — com salvamento de progresso e exportação.',
    challenges: [
      'Traduzir um processo que existia apenas no conhecimento tácito da equipe em um formulário usável.',
      'Garantir consistência dos dados com validações, sem perder flexibilidade.',
    ],
    improvements: [
      'Implantação documentada de forma padronizada.',
      'Tempo de integração reduzido e mais previsível.',
      'Onboarding deixou de depender de uma única pessoa.',
    ],
    role: 'Responsável pelo levantamento do processo, modelagem e desenvolvimento da solução ponta a ponta.',
    shots: [
      {
        src: '/sistemas/onboarding-clientes.jpeg',
        alt: 'Etapa de identificação do formulário de onboarding (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'report-bugs-feedback',
    name: 'Report de Bugs & Feedback',
    tagline:
      'Estúdio interno para montar relatórios de bugs e coletar feedback por módulo, com indicadores.',
    objective:
      'Estruturar o registro de bugs e feedback, transformando relatos soltos em relatórios organizados e acionáveis.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL', 'Charts'],
    cover: {
      src: '/sistemas/report-bugs-feedback.jpeg',
      alt: 'Estúdio de relatório de bugs e feedback (amostra autorizada).',
    },
    problem:
      'Bugs e feedback eram reportados de forma informal e incompleta, sem padronização — dificultando a análise e o encaminhamento para a equipe técnica.',
    solution:
      'Construí um estúdio de relatórios que padroniza o registro de bugs e o feedback por módulo, com campos guiados, indicadores e geração de relatório consolidado.',
    challenges: [
      'Definir um formato de relatório útil tanto para quem reporta quanto para quem corrige.',
      'Coletar feedback por módulo sem tornar o preenchimento cansativo.',
    ],
    improvements: [
      'Relatos padronizados e mais completos.',
      'Encaminhamento técnico mais rápido.',
      'Visão por módulo do que precisa de atenção.',
    ],
    role: 'Desenvolvimento da ferramenta e definição da estrutura de relatório e indicadores.',
    shots: [
      {
        src: '/sistemas/report-bugs-feedback.jpeg',
        alt: 'Formulário de novo bug e relatório de feedback (amostra autorizada).',
        caption: 'Amostra autorizada · informações sensíveis omitidas.',
      },
    ],
  },
  {
    slug: 'jornada-ouvidoria',
    name: 'Controle da Jornada de Clientes & Ouvidoria',
    tagline:
      'Painel para acompanhar a jornada dos clientes e centralizar a ouvidoria — status, atividades e próximas ações.',
    objective:
      'Dar à equipe uma visão única da jornada de cada cliente e um canal rastreável de ouvidoria, do cadastro ao acompanhamento.',
    status: 'Em produção',
    tech: ['React', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL', 'Charts'],
    cover: {
      src: '/sistemas/jornada-ouvidoria.jpeg',
      alt: 'Painel de controle de status de clientes e ouvidoria (amostra autorizada).',
    },
    problem:
      'Não havia uma visão consolidada da jornada dos clientes, e as solicitações de ouvidoria chegavam por canais diversos e se perdiam — sem rastreabilidade nem histórico.',
    solution:
      'Desenvolvi um sistema que acompanha a jornada do cliente (do cadastro ao encerramento) e centraliza a ouvidoria, com status, timeline de atividades, pendências e dashboard de indicadores.',
    challenges: [
      'Modelar os estados da jornada do cliente de forma clara e flexível.',
      'Unificar solicitações dispersas em um fluxo único e rastreável.',
      'Agregar dados em indicadores úteis sem perder performance.',
    ],
    improvements: [
      'Visão consolidada e em tempo real da jornada de cada cliente.',
      'Rastreabilidade completa das solicitações de ouvidoria.',
      'Decisões mais rápidas e acompanhamento proativo de pendências.',
    ],
    role: 'Concepção, modelagem de dados, definição dos indicadores e desenvolvimento da aplicação.',
    shots: [
      {
        src: '/sistemas/jornada-ouvidoria.jpeg',
        alt: 'Fluxo de cadastro de cliente e dashboard geral (amostra autorizada).',
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
    cover: { alt: 'Agenda operacional (em desenvolvimento).' },
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
        alt: 'Prévia da agenda operacional (em desenvolvimento).',
        caption: 'Amostra autorizada · em desenvolvimento.',
      },
    ],
  },
];
