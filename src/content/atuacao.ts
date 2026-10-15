import type { AtuacaoCard } from './types';

export const atuacaoIntro = {
  kicker: 'FAKTORY SOFTWARES · SOROCABA · SP',
  paragraph:
    'No dia a dia, atuo na implantação do ERP em indústrias de esquadrias: converso com o cliente, elaboro fluxos e acompanho o processo do contrato fechado até a entrega da obra. Apoio o QA e o desenvolvimento com bugs e sugestões de melhoria do produto.',
};

export const atuacaoCards: AtuacaoCard[] = [
  {
    num: '01',
    title: 'Testes & validação de produto',
    paragraphs: [
      'Analiso o produto a partir do uso real na implantação, identificando erros, comportamentos inconsistentes e oportunidades de melhoria.',
    ],
  },
  {
    num: '02',
    title: 'Colaboração com QA & devs',
    paragraphs: [
      'Reporto bugs, dou sugestões de melhoria do produto e converso diretamente com o time de QA e os desenvolvedores para acelerar correções.',
    ],
  },
  {
    num: '03',
    title: 'Consultoria & implantação de ERP',
    paragraphs: [
      'Meu foco principal: converso com os clientes, elaboro fluxos e presto consultoria a empresas da indústria de esquadrias, ajudando a melhorar os fluxos internos e a trazer o processo para dentro do sistema. Acompanho a gestão do ERP completo, do contrato fechado até a entrega da obra.',
      'Transformo regras de negócio em processo claro dentro do sistema, com foco em otimizar a forma como a empresa trabalha.',
    ],
    tags: [
      'Consultoria',
      'Treinamento',
      'Fluxo de ERP',
      'Conhecimento fiscal',
      'Regras de negócio',
      'Parametrização',
      'Stakeholders',
    ],
    kicker: 'FOCO PRINCIPAL · MEU CARGO',
    primary: true,
    wide: true,
  },
  {
    num: '04',
    title: 'Conteúdo & soluções criativas',
    paragraphs: [
      'Combino sensibilidade visual e técnica para apoiar a comunicação do produto e da empresa. Crio ideias, desenvolvo páginas HTML sob medida, desenho designs alinhados à marca e produzo gravações de conteúdo que conectam sistema, time e usuários.',
      'Esse repertório criativo me permite entregar soluções fora da caixa — materiais de apoio, peças de comunicação técnica e protótipos rápidos — ampliando o impacto do trabalho técnico além do código.',
    ],
    tags: [
      'Páginas HTML',
      'Design',
      'Gravação de conteúdo',
      'Comunicação técnica',
      'Ideação',
      'Prototipação',
    ],
    kicker: 'CRIATIVIDADE APLICADA',
    wide: true,
  },
];
