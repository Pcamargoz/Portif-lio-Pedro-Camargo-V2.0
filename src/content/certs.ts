import type { Certification } from './types';

export const certsIntro = {
  bigtext:
    'Foco técnico em engenharia de software com ênfase em back-end — somado a mais de 100 certificações conquistadas em tecnologia.',
  metaNumber: 100,
  metaLabel: 'Certificações',
  metaText:
    'Abaixo, o destaque da minha especialização técnica e uma curadoria das certificações mais relevantes para minha atuação profissional.',
};

export const certifications: Certification[] = [
  {
    category: 'ENGENHARIA DE SOFTWARE · FOCO PRINCIPAL',
    title: 'Back-end · Java, Spring Boot & APIs REST',
    description:
      'Minha especialização técnica e direção de carreira. Atuo no desenvolvimento de APIs REST escaláveis em Java/Spring Boot, com integração a bancos relacionais, segurança, testes e ambientes containerizados. Trajetória que combina formação acadêmica em ADS na Facens, atuação prática diária no produto da empresa e estudo contínuo de arquitetura, padrões de projeto e boas práticas de engenharia de software.',
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
