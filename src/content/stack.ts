import type { StackArea } from './types';

export const stackIntro =
  'Tecnologias que estudo e uso em projetos próprios e acadêmicos, e que me ajudam a dialogar com o time de desenvolvimento.';

export const stackAreas: StackArea[] = [
  {
    index: 'A.',
    title: 'Back-end & APIs',
    description:
      'Arquitetura e desenvolvimento de APIs REST escaláveis em Java/Spring Boot, com foco em manutenibilidade, segurança e documentação clara.',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate', 'REST', 'JWT'],
  },
  {
    index: 'B.',
    title: 'Banco de Dados',
    description:
      'Modelagem relacional, otimização de queries e versionamento de schema. PostgreSQL como base preferida — integridade e performance acima de tudo.',
    tags: ['PostgreSQL', 'MySQL', 'SQL avançado', 'Modelagem ER', 'Flyway'],
  },
  {
    index: 'C.',
    title: 'DevOps',
    description:
      'Containerização, ambientes padronizados e fundamentos de pipelines para preparar aplicações para escala real e deploy contínuo.',
    tags: ['Docker', 'Docker Compose', 'Linux', 'CI/CD básico', 'Shell'],
  },
  {
    index: 'D.',
    title: 'Cloud & Serviços',
    description:
      'Fundamentos sólidos em computação em nuvem com AWS — Cloud Practitioner certificado — e estudos contínuos em arquitetura distribuída.',
    tags: ['AWS', 'EC2 / S3', 'IAM', 'Cloud Practitioner', 'Implantação de IA em nuvem'],
  },
  {
    index: 'E.',
    title: 'Inteligência Artificial',
    description:
      'Uso estratégico de IA aplicada ao desenvolvimento — prompt engineering, automação e ferramentas que aceleram entregas sem abrir mão de qualidade.',
    tags: [
      'Prompt Engineering',
      'IA aplicada',
      'LLMs',
      'Automação',
      'Ferramentas de produtividade',
    ],
  },
  {
    index: 'F.',
    title: 'Git & GitHub',
    description:
      'Versionamento disciplinado, branches organizadas, pull requests revisáveis e cultura de colaboração — base para qualquer time de engenharia.',
    tags: ['Git', 'GitHub', 'Pull Requests', 'Code Review', 'Conventional Commits'],
  },
  {
    index: 'G.',
    title: 'Implantação, QA & comunicação',
    description:
      'Meu dia a dia: implantação e consultoria de fluxos, conversa com o cliente, reporte de bugs, sugestões de melhoria, colaboração com QA e devs, documentação e tradução de regras de negócio em processo no sistema.',
    tags: [
      'Testes exploratórios',
      'QA colaborativo',
      'Bug tracking',
      'Documentação técnica',
      'Clean Code',
      'SOLID',
      'Levantamento de requisitos',
      'Comunicação técnica',
    ],
    wide: true,
  },
];
