import type { StatData } from './types';

export interface Profile {
  name: string;
  role: string;
  lede: string;
  asideRows: Array<{ key: string; value: string }>;
  aboutLead: string;
  aboutParagraphs: string[];
  facts: Array<{ key: string; value: string }>;
  linkedin: string;
  github: string;
  email: string;
  phone: string;
  site: string;
  marqueeItems: string[];
}

export const profile: Profile = {
  name: 'Pedro César Camargo dos Santos',
  role: 'Desenvolvedor Back-end  ·  Java, Spring Boot, APIs REST, Docker, PostgreSQL, AWS & IA aplicada  ·  Consultor de Implantação Jr na Faktory Softwares.',
  lede: 'Dois anos construindo na área de tecnologia — do código à validação do produto. Atuo na linha de frente testando e colaborando com QA e devs para entregar software confiável, ao mesmo tempo em que evoluo como engenheiro back-end e represento a Facens, maior universidade de Sorocaba.',
  asideRows: [
    { key: 'Atuação', value: 'Back-end · Validação de produto · QA' },
    { key: 'Cargo', value: 'Consultor de Implantação Jr · Faktory' },
    { key: 'Representante', value: 'Centro Universitário Facens · ADS' },
  ],
  aboutLead:
    'Dois anos construindo na tecnologia — do código limpo à validação de produto. Hoje, contribuo na linha de frente do desenvolvimento, do QA e da implantação; amanhã, lidero arquitetura.',
  aboutParagraphs: [
    'Sou estudante de Análise e Desenvolvimento de Sistemas no Centro Universitário Facens — maior universidade de Sorocaba, da qual sou representante. Atuo como Consultor de Implantação Jr na Faktory Softwares, depois de iniciar o caminho como estagiário no mesmo time.',
    'Na prática, trabalho diretamente no produto web mais novo da empresa: encontro bugs, executo testes de validação, abro chamados e colaboro de forma integrada com o time de QA e com os desenvolvedores no ciclo de melhoria contínua. Em paralelo, construo APIs REST em Java/Spring Boot, modelo dados em PostgreSQL, padronizo ambientes com Docker e estudo arquitetura de software, cloud e uso estratégico de inteligência artificial.',
    'Procuro crescer sólido — combinando engenharia, comunicação e visão de produto — para entregar software que melhora operações reais.',
  ],
  facts: [
    { key: 'Experiência', value: '2 anos em tecnologia' },
    { key: 'Cargo', value: 'Consultor de Implantação Jr' },
    { key: 'Universidade', value: 'Facens · Representante' },
    { key: 'Localização', value: 'Sorocaba, SP — BR' },
    { key: 'Idiomas', value: 'Português · Inglês' },
    { key: 'Buscando', value: 'Backend Jr · Crescimento sólido' },
  ],
  linkedin: 'https://www.linkedin.com/in/pedro-carmargo01',
  github: 'https://github.com/Pcamargoz',
  email: 'pedro01cesarsanto@gmail.com',
  phone: '+55 15 98807-9571',
  site: 'https://pcamargoz.github.io/meu-portifolio/',
  marqueeItems: [
    'JAVA',
    'SPRING BOOT',
    'REST APIs',
    'POSTGRESQL',
    'DOCKER',
    'AWS',
    'IA APLICADA',
    'GIT',
    'GITHUB',
    'DEVOPS',
    'MICROSERVIÇOS',
    'QA & TESTES',
  ],
};

export const stats: StatData[] = [
  { value: 2, unit: 'anos', label: 'De experiência prática na área de tecnologia' },
  { value: 100, unit: '+', label: 'Certificações conquistadas em tecnologia' },
  { value: 1, unit: 'x', label: 'Representante oficial do Centro Universitário Facens' },
  { value: 100, unit: '%', label: 'Em constante evolução — buscando crescer sólido' },
];
