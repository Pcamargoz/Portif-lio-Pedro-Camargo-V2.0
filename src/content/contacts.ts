import type { ContactItem, FeaturedContact } from './types';

export const contactBigtext =
  'Vamos construir algo que importa? Estou aberto a oportunidades back-end, networking e parcerias técnicas de longo prazo.';

export const featuredContact: FeaturedContact = {
  kicker: 'CANAL PRINCIPAL · NETWORKING & INFLUÊNCIA',
  value: 'LinkedIn',
  handle: 'in/pedro-carmargo01',
  description:
    'Onde compartilho minha jornada, conexões e crescimento profissional. Conecte-se para acompanhar minha evolução na tecnologia.',
  arrow: '↗ Conectar agora',
  href: 'https://www.linkedin.com/in/pedro-carmargo01',
};

export const contacts: ContactItem[] = [
  {
    kind: 'github',
    label: 'GitHub',
    value: '@Pcamargoz',
    href: 'https://github.com/Pcamargoz',
    arrow: '↗',
  },
  {
    kind: 'email',
    label: 'E-mail',
    value: 'pedro01cesarsanto@gmail.com',
    href: 'mailto:pedro01cesarsanto@gmail.com',
    arrow: '→',
  },
  {
    kind: 'phone',
    label: 'Telefone',
    value: '+55 15 98807-9571',
    href: 'tel:+5515988079571',
    arrow: '→',
  },
  {
    kind: 'site',
    label: 'Site pessoal',
    value: 'pcamargoz.github.io',
    href: 'https://pcamargoz.github.io/meu-portifolio/',
    arrow: '↗',
  },
];
