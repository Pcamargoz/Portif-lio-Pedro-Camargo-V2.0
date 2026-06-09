# Design — Refatoração do Portfólio para React ("V3")

**Data:** 2026-06-09
**Status:** Aprovado pelo usuário
**Objetivo:** Refatorar o portfólio estático (HTML/CSS/JS) para uma SPA React performática, acessível e com foco em melhor visualização dos projetos.

## Decisões validadas com o usuário

| Decisão | Escolha |
|---|---|
| Identidade visual | Evoluir o visual atual (dark editorial, Fraunces/Geist) — não é redesign nem réplica |
| Stack | Vite + React 18 + TypeScript (strict), CSS custom com tokens (sem Tailwind) |
| Projetos na vitrine | CultivaClub e NEO Energy (Planilha Inteligente fica de fora) |
| Deploy | Vercel (SPA rewrite via `vercel.json`) |
| Navegação de projetos | Página dedicada por projeto: `/projetos/:slug` + vitrine na home |
| Dados dinâmicos | API pública do GitHub (estrelas, linguagens, último push) com fallback estático |
| Estado/cache | Hooks customizados leves (fetch nativo + memória + sessionStorage), sem TanStack Query |

## Arquitetura

SPA com React Router. Estrutura de pastas:

```
src/
  app/        → App, rotas, providers
  layouts/    → RootLayout (Nav, Footer, grain, cursor custom)
  pages/      → HomePage · ProjectPage (/projetos/:slug) · NotFoundPage
  components/ → biblioteca de UI tipada (Button, Tag, SectionHeading,
                ProjectCard, MediaFrame, Stat, ContactCard, Timeline…)
  content/    → dados tipados (profile.ts, projects.ts, certs.ts, stack.ts, timeline.ts)
  services/   → githubClient.ts
  hooks/      → useGitHubRepo, useScrollReveal, useCountUp
  styles/     → tokens.css, global.css
```

### Rotas
- `/` — Home: hero → vitrine de projetos em destaque (cedo na página) → sobre/atuação → certificações → stack → trajetória → contato.
- `/projetos/:slug` — página rica por projeto: vídeo, diagrama de arquitetura, stack, aprendizados, links e dados ao vivo do GitHub.
- `*` — NotFound com link de volta.
- Âncoras existentes (`#sobre`, `#contato`…) continuam funcionando; foco gerenciado na troca de rota (focus no `<h1>`/`main`).

### Conteúdo e dados
- Todo conteúdo hoje hardcoded no HTML vira arquivos TS tipados em `content/` (tipos: `Project`, `Experience`, `Certification`, `StackArea`).
- Componentes consomem apenas os tipos do domínio — desacoplados de detalhes da API do GitHub.

### Integração GitHub
- `services/githubClient.ts`: fetch da API pública `api.github.com/repos/Pcamargoz/<repo>` (+ `/languages`), sem token, sem segredos no cliente.
- `hooks/useGitHubRepo.ts`: estados `idle | loading | success | error`, cache em memória + `sessionStorage` (TTL), fallback estático declarado em `content/projects.ts` quando a API falha ou atinge rate limit. O site nunca quebra por causa da API.

### Acessibilidade
- Landmarks semânticos (`header/nav/main/footer`), skip-link, foco visível, navegação completa por teclado.
- `prefers-reduced-motion`: desativa marquee, cursor custom e animações de reveal.
- Cursor custom também desativado em dispositivos touch.
- Contraste AA, ARIA apenas onde a semântica nativa não basta.

## Execução em fases (equipe de subagents)

1. **Fase 1 — Layout & Navegação** (Opus): scaffold Vite + TS, tokens.css, RootLayout, rotas, esqueleto responsivo das páginas.
2. **Fase 2 — Componentes & Estado** (Opus + Sonnet): biblioteca de componentes tipados com estados de UI (loading/vazio/erro) + conteúdo tipado e hooks.
3. **Fase 3 — Integração** (Opus): githubClient, useGitHubRepo, estados de requisição nas telas.
4. **Fase 4 — Acessibilidade & Polimento** (Haiku): auditoria (semântica, ARIA, contraste, foco, teclado) e ajustes finais.

## Critérios de qualidade
- Responsivo (mobile-first), consistente com a identidade atual.
- Componentes reutilizáveis e desacoplados da API.
- Estados de requisição tratados em todas as telas que consomem dados.
- Acessibilidade verificada antes do fechamento.
- Build de produção (`vite build`) sem erros de TS; verificação visual via preview.

## Fora de escopo
- Projeto Planilha Inteligente.
- Backend próprio, autenticação, CMS.
- Alteração do conteúdo da pasta `cultivaclub/` (microsite separado existente).

## Estratégia de migração
- O site novo é construído em estrutura própria (raiz do repo passa a ser o app Vite ao final; os arquivos estáticos atuais são preservados durante o desenvolvimento e a troca acontece apenas com a versão React validada).
