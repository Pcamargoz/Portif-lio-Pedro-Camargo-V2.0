import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'cultivaclub',
    title: 'CultivaClub',
    status: 'Em destaque',
    categories: ['Backend', 'Refatoração', 'Cloud'],
    summary:
      'Refatoração de três microsserviços para um monolito modular em Spring Boot — deploy simplificado, custo menor, entregas mais rápidas.',
    descriptionLead:
      'Refatorei o CultivaClub de uma arquitetura distribuída em três microsserviços (Usuários, Objetos e API Gateway) para um monolito modular em Spring Boot — preservando boundaries de domínio enquanto simplifica deploy, reduz custo operacional e acelera entregas.',
    descriptionBody:
      'Backend em Java 21 + Spring Boot rodando na Render, frontend em Vercel, persistência em PostgreSQL serverless (Neon) com dois databases lógicos e pools Hikari dedicados. UptimeRobot mantém a instância aquecida via /actuator/health a cada 5 minutos.',
    insight: {
      kicker: 'APRENDIZADO CENTRAL',
      text: 'Refatorar sem vazamento entre camadas: usuarios/ e objetos/ só conversam por interface de serviço — nunca por acesso direto ao repositório alheio.',
    },
    tech: [
      'Java 21',
      'Spring Boot',
      'JPA / Hibernate',
      'PostgreSQL',
      'Neon',
      'Render',
      'Vercel',
      'REST API',
      'Monolito Modular',
      'HikariCP',
    ],
    media: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/Y_FaWIzn7W4?rel=0&modestbranding=1',
      caption:
        'Fig. 01 · Vídeo demonstrativo no YouTube — tour completo pela aplicação narrado pelo autor.',
    },
    links: [
      {
        label: 'Código no GitHub',
        href: 'https://github.com/Pcamargoz/Projeto-Cultiva-Club-Back-End-Monolito-',
        kind: 'github',
      },
      {
        label: 'Assistir no YouTube',
        href: 'https://youtu.be/Y_FaWIzn7W4',
        kind: 'youtube',
      },
    ],
    githubRepo: 'Pcamargoz/Projeto-Cultiva-Club-Back-End-Monolito-',
    fallbackStats: { stars: 0, languages: ['Java'], pushedAt: null },
  },
  {
    slug: 'neo-energy',
    title: 'NEO Energy',
    status: 'No ar · Acadêmico (UPX)',
    categories: ['Full-stack', 'Smart Home', 'Energia'],
    summary:
      'Gestão inteligente de energia renovável e irrigação automática — API REST Java 21 + Spring Boot com JWT e três perfis de acesso.',
    descriptionLead:
      '🚀 O NEO-ENERGY é um sistema de gestão inteligente de energia renovável e irrigação automática para residências — o morador tem controle total sobre o consumo de água no jardim e a geração de energia solar, tudo em um só lugar.',
    descriptionBody:
      'Projeto desenvolvido na disciplina UPX da faculdade, fruto de meses de dedicação e tecnologia aplicada com propósito. Por trás do dashboard roda uma API REST em Java 21 + Spring Boot, com deploy em nuvem via Docker no Render, segurança BCrypt + JWT e três perfis de acesso — ADMIN, NORMAL e PRO.',
    features: [
      'Monitoramento de painéis solares em tempo real',
      'Gestão de irrigadores com registro automático de sessões (tempo + litros)',
      'Histórico completo de água e energia para decisões mais inteligentes',
      'Dashboard moderno com automações, alertas e controle total',
      'Segurança BCrypt + JWT com três perfis: ADMIN, NORMAL e PRO',
    ],
    insight: {
      kicker: 'NOTA DO AUTOR · LIDERANÇA',
      text: 'Infelizmente não pude estar presente na apresentação ao lado da minha equipe — algo que pesa muito para mim como líder do grupo. Mas o trabalho está feito, está no ar e fala por si só. 🌱☀️💧',
    },
    tech: [
      'Java 21',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'JPA',
      'PostgreSQL',
      'Docker',
      'MapStruct',
      'Lombok',
      'Maven',
    ],
    media: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/d_CgiWGqPuU?rel=0&modestbranding=1',
      alt: 'Vídeo demonstrativo do NEO ENERGY no YouTube',
      caption:
        'Fig. 02 · Vídeo demonstrativo do NEO ENERGY — geração solar, irrigação inteligente e histórico, em tempo real.',
    },
    links: [
      {
        label: 'Aplicação ao vivo',
        href: 'https://front-end-neo-energy.vercel.app/',
        kind: 'live',
      },
      {
        label: 'Back-end no GitHub',
        href: 'https://github.com/Pcamargoz/NeoEnergy---Facens',
        kind: 'github',
      },
    ],
    githubRepo: 'Pcamargoz/NeoEnergy---Facens',
    fallbackStats: { stars: 0, languages: ['Java'], pushedAt: null },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
