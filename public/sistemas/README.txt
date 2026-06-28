Prints curados dos sistemas internos.

Deposite aqui as imagens já selecionadas/anonimizadas (sem dados sensíveis).
Depois referencie cada arquivo em src/content/systems.ts:

  cover: { src: '/sistemas/onboarding-capa.png', alt: '...' }
  shots: [{ src: '/sistemas/onboarding-01.png', alt: '...', caption: '...' }]

Enquanto o campo `src` ficar ausente, o card/modal mostra um placeholder.

Sugestão de nomes: <slug>-capa.png e <slug>-01.png, <slug>-02.png ...
Slugs atuais: onboarding-clientes, ouvidoria-atendimento, report-bugs-feedback,
dashboard-status-clientes, formulario-implantacao, agenda-operacional.
