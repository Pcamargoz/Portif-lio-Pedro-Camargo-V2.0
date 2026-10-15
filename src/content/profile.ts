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
  role: 'Implantação de ERP e consultoria de processos para indústrias de esquadrias  ·  Consultor de Implantação Jr na Faktory Softwares.',
  lede: 'Converso com o cliente, desenho e melhoro os fluxos internos da empresa e acompanho a gestão do ERP do contrato fechado até a entrega da obra. Apoio também o time de QA e o desenvolvimento, reportando bugs e sugerindo melhorias do produto. Represento a Facens, maior universidade de Sorocaba.',
  asideRows: [
    { key: 'Atuação', value: 'Implantação de ERP · Consultoria de fluxos · Apoio a QA e dev' },
    { key: 'Cargo', value: 'Consultor de Implantação Jr · Faktory' },
    { key: 'Representante', value: 'Centro Universitário Facens · ADS' },
  ],
  aboutLead:
    'Ajudo empresas a levar o processo real para dentro do ERP — do contrato fechado à entrega da obra — e levo o que vejo com o cliente de volta ao produto.',
  aboutParagraphs: [
    'Sou estudante de Análise e Desenvolvimento de Sistemas no Centro Universitário Facens — maior universidade de Sorocaba, da qual sou representante. Atuo como Consultor de Implantação Jr na Faktory Softwares, depois de iniciar o caminho como estagiário no mesmo time.',
    'Na prática, meu foco é a implantação: converso com os clientes, elaboro fluxos e presto consultoria a indústrias de esquadrias para melhorar os fluxos internos e trazer o processo para dentro do sistema, acompanhando a gestão do ERP completo, do contrato fechado até a entrega da obra. Também faço análises e apoio muito o time de QA e o desenvolvimento, reportando bugs e dando sugestões de melhoria do produto.',
    'Em paralelo, estudo desenvolvimento (Java, Spring Boot, APIs REST, PostgreSQL, Docker, cloud e IA aplicada) e construo projetos próprios e acadêmicos.',
  ],
  facts: [
    { key: 'Experiência', value: '2 anos em tecnologia' },
    { key: 'Cargo', value: 'Consultor de Implantação Jr' },
    { key: 'Universidade', value: 'Facens · Representante' },
    { key: 'Localização', value: 'Sorocaba, SP — BR' },
    { key: 'Idiomas', value: 'Português · Inglês' },
    { key: 'Foco', value: 'Implantação de ERP · Consultoria de fluxos' },
  ],
  linkedin: 'https://www.linkedin.com/in/pedro-carmargo01',
  github: 'https://github.com/Pcamargoz',
  email: 'pedro01cesarsanto@gmail.com',
  phone: '+55 15 98807-9571',
  site: 'https://pcamargoz.github.io/meu-portifolio/',
  marqueeItems: [
    'IMPLANTAÇÃO DE ERP',
    'CONSULTORIA DE PROCESSOS',
    'FLUXOS INTERNOS',
    'INDÚSTRIA DE ESQUADRIAS',
    'DO CONTRATO À ENTREGA DA OBRA',
    'QA & TESTES',
    'MELHORIA DE PRODUTO',
    'JAVA',
    'SPRING BOOT',
    'POSTGRESQL',
  ],
};

export const stats: StatData[] = [
  { value: 2, unit: 'anos', label: 'De experiência prática na área de tecnologia' },
  { value: 100, unit: '+', label: 'Certificações conquistadas em tecnologia' },
  { value: 1, unit: 'x', label: 'Representante oficial do Centro Universitário Facens' },
  { value: 100, unit: '%', label: 'Em constante evolução — buscando crescer sólido' },
];
