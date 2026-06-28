# Seção "Sistemas Internos" — Design

Data: 2026-06-28 · Branch base: `main`

## Objetivo

Adicionar ao portfólio uma seção dedicada aos **sistemas internos corporativos**
desenvolvidos pelo Pedro, evidenciando capacidade de identificar problemas,
analisar processos e entregar soluções — **sem expor informações confidenciais**
(regras de negócio, dados, clientes, funcionalidades completas).

Cada sistema mostra apenas uma visão geral: problema → solução → impacto →
tecnologias → papel do autor, com prints curados.

## Decisões (aprovadas pelo usuário)

- **Detalhes em modal** na própria home (não página dedicada). Reforça a ideia
  de "demonstração limitada / vitrine controlada".
- Seção entra como **/ 02, logo após Projetos**, com **novo item na nav**
  ("02 · Sistemas", hash `#sistemas`); demais seções renumeradas.
- **Vários cards independentes** (um por sistema/módulo).
- **Tudo anonimizado**: nomes funcionais genéricos, sem citar empresa ou cliente.

## Modelo de dados

`src/content/systems.ts` + tipos em `src/content/types.ts`:

```ts
type SystemStatus = 'Em produção' | 'Em desenvolvimento' | 'Finalizado';

interface SystemShot { src: string; alt: string; caption?: string; }

interface InternalSystem {
  slug: string;
  name: string;        // nome funcional anonimizado
  tagline: string;     // descrição curta (card)
  objective: string;   // objetivo principal (card)
  status: SystemStatus;
  tech: string[];
  cover?: SystemShot;          // imagem do card (ou undefined → placeholder)
  // só no modal:
  problem: string;            // como era antes
  solution: string;           // o que foi criado
  challenges: string[];       // desafios enfrentados
  improvements: string[];     // melhorias / impacto no fluxo
  role: string;               // papel do autor
  shots: SystemShot[];        // prints curados
}
```

## Componentes

- `sections/InternalSystems.tsx` (+`.css`) — seção `#sistemas`, heading "/ 02",
  intro + **selo de confidencialidade** (cadeado + aviso), grid de cards
  (1 col / 2 cols ≥900px), espelhando `.projects-grid`. Mantém estado de
  qual sistema está aberto e renderiza o `SystemModal`.
- `components/SystemCard.tsx` (+`.css`) — `<button>` (abre modal, não navega).
  Estética do `ProjectCard`: número, **badge de status colorido**
  (Em produção → `--accent-3`; Em desenvolvimento → `--accent-2`; Finalizado →
  `--mute`), nome, tagline, objetivo, capa (com selo "amostra autorizada"),
  tags de tecnologia, CTA "Ver detalhes →".
- `components/SystemModal.tsx` (+`.css`) — dialog acessível:
  `role="dialog"` + `aria-modal`, **focus trap**, fecha com **Esc** e clique no
  backdrop, **trava scroll do body**, devolve foco ao card de origem. Conteúdo:
  cabeçalho (nome + status) → **banner de sigilo** → Problema → Solução →
  Desafios (lista) → Melhorias/impacto (lista) → Meu papel → Tecnologias →
  galeria de prints curados (legenda "informações sensíveis omitidas").

## Edições

- `content/types.ts` — adicionar `SystemStatus`, `SystemShot`, `InternalSystem`.
- `pages/HomePage.tsx` — inserir `<InternalSystems />` entre `ProjectsShowcase`
  e `About`.
- `layouts/Nav.tsx` — inserir item "02 · Sistemas" (`#sistemas`) e renumerar.
- Renumerar `SectionHeading` das seções abaixo:
  About /02→/03, Atuacao /03→/04, Certs /04→/05, Stack /05→/06,
  Trajetoria /06→/07, Contact /07→/08.

## Imagens

Pasta `public/sistemas/` para os prints curados (fornecidos pelo usuário).
Enquanto não chegam, cards/modais usam **placeholder** elegante (sem `src`).

## Conteúdo inicial (DRAFT — usuário revisa depois)

Cards anonimizados inferidos da referência visual:

| slug | Nome funcional | Status |
|---|---|---|
| onboarding-clientes | Onboarding de Clientes | Em produção |
| ouvidoria-atendimento | Ouvidoria & Atendimento | Em produção |
| report-bugs-feedback | Report de Bugs & Feedback | Em produção |
| dashboard-status-clientes | Dashboard de Status de Clientes | Em produção |
| formulario-implantacao | Formulário Operacional de Implantação | Finalizado |
| agenda-operacional | Agenda Operacional | Em desenvolvimento |

## Acessibilidade

- Card é `<button>` com `aria-haspopup="dialog"`.
- Modal: `aria-modal`, `aria-labelledby` no título, focus trap, Esc, foco de
  retorno, `prefers-reduced-motion` respeitado.

## Fora de escopo

- Conteúdo textual final e prints reais (usuário fornece/revisa).
- Página dedicada por sistema / rota.
