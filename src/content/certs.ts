import type { Certification } from './types';

export const certsIntro = {
  bigtext:
    'Atuação em implantação de ERP e consultoria de processos, com formação técnica em desenvolvimento — somadas a mais de 100 certificações conquistadas em tecnologia.',
  metaNumber: 100,
  metaLabel: 'Certificações',
  metaText:
    'Abaixo, o destaque da minha formação técnica e uma curadoria das certificações mais relevantes para minha atuação profissional.',
};

export const certifications: Certification[] = [
  {
    category: 'FORMAÇÃO TÉCNICA · DESENVOLVIMENTO',
    title: 'Back-end · Java, Spring Boot & APIs REST',
    description:
      'Meu estudo técnico em paralelo à atuação em implantação. Desenvolvo APIs REST em Java/Spring Boot em projetos acadêmicos e pessoais, com bancos relacionais, segurança e ambientes containerizados. Une a formação em ADS na Facens ao estudo contínuo de arquitetura e boas práticas.',
    featured: true,
    issuer: 'Facens · ADS & prática profissional',
    badge: 'code',
  },
  {
    category: 'CLOUD COMPUTING · AWS',
    title: 'AWS Cloud Practitioner',
    description:
      'Certificação oficial da Amazon Web Services — fundamentos de computação em nuvem, segurança, arquitetura distribuída e gestão de custos da plataforma líder mundial.',
    badge: 'cloud',
  },
  {
    category: 'CIBERSEGURANÇA',
    title: 'Fundamentos de Cibersegurança',
    description:
      'Princípios de proteção, identificação de vulnerabilidades e práticas de defesa aplicáveis a ambientes corporativos e ao desenvolvimento.',
    badge: 'shield',
  },
  {
    category: 'LIDERANÇA · FACENS',
    title: 'Líder de Turma',
    description:
      'Representação acadêmica oficial no Centro Universitário Facens — comunicação institucional, mediação e tomada de decisão.',
    badge: 'person',
  },
];

export const certExtras: string[] = [
  'Implantação de Serviços de IA em Nuvem · Senai SP',
  'Empreendedorismo · Senai SP',
  'Informática Avançada · Nippo',
  'Inglês como Segundo Idioma · Pearson / Nippo',
  '+ dezenas de outras certificações técnicas',
];
