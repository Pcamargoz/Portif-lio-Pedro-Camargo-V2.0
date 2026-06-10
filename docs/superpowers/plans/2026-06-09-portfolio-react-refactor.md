# Portfólio React V3 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar o portfólio estático (HTML/CSS/JS) para uma SPA React (Vite + TypeScript) com vitrine de projetos aprimorada, página dedicada por projeto e dados ao vivo do GitHub.

**Architecture:** SPA com React Router (rotas `/`, `/projetos/:slug`, 404). Conteúdo em arquivos TS tipados (`src/content/`), desacoplado da API. Integração GitHub via `services/githubClient.ts` + hook `useGitHubRepo` com cache (memória + sessionStorage) e fallback estático. CSS custom com tokens portados do design system legado (dark editorial, Fraunces/Geist).

**Tech Stack:** Vite 6, React 18, TypeScript strict, react-router-dom 7, CSS vanilla com custom properties, Vitest + Testing Library (somente para a lógica de integração). Deploy: Vercel.

**Spec:** `docs/superpowers/specs/2026-06-09-portfolio-react-refactor-design.md`

**Fonte de conteúdo (source of truth):** `legacy/index.html` (o site atual, movido na Task 1). Todo texto/copy deve ser portado VERBATIM de lá, salvo instrução contrária. O CSS legado (`legacy/assets/styles.css`, 2809 linhas) é a referência visual — porte as regras relevantes para os arquivos CSS co-locados, adaptando seletores.

---

## Mapa de arquivos (estado final)

```
/ (raiz)
  index.html                  → entry do Vite (novo)
  package.json, vite.config.ts, tsconfig.json, vercel.json
  public/                     → pedro.jpg, neo-energy.png, neo-energy-logo.png (copiados de legacy/assets)
  legacy/                     → site antigo preservado (index.html + assets/)
  cultivaclub/                → INTOCADO (microsite separado)
  src/
    main.tsx                  → bootstrap React + router
    app/router.tsx            → createBrowserRouter, rotas
    layouts/RootLayout.tsx    → Nav + Outlet + Footer + grain + skip-link
    layouts/Nav.tsx           → navegação responsiva (desktop + menu mobile)
    layouts/Footer.tsx
    pages/HomePage.tsx        → composição das seções da home
    pages/ProjectPage.tsx     → página /projetos/:slug
    pages/NotFoundPage.tsx
    sections/Hero.tsx         → seções da home (uma por arquivo, com .css co-locado)
    sections/ProjectsShowcase.tsx
    sections/About.tsx
    sections/Atuacao.tsx
    sections/Certs.tsx
    sections/Stack.tsx
    sections/Trajetoria.tsx
    sections/Contact.tsx
    components/               → UI library (cada um com .css co-locado)
      Button.tsx  Kicker.tsx  SectionHeading.tsx  TagList.tsx
      Stat.tsx  ContactCard.tsx  MediaFrame.tsx  TimelineEntry.tsx
      ProjectCard.tsx  GitHubStats.tsx  Marquee.tsx
      CultivaArchDiagram.tsx  → SVG do diagrama (portado do legado)
    content/
      types.ts  profile.ts  projects.ts  certs.ts  stack.ts  timeline.ts
    services/githubClient.ts
    services/githubClient.test.ts
    hooks/useGitHubRepo.ts
    hooks/useGitHubRepo.test.tsx
    hooks/useScrollReveal.ts
    hooks/useCountUp.ts
    styles/tokens.css         → custom properties (palette, type, spacing)
    styles/global.css         → reset, body, atmosfera, grain, utilitários (.kicker, .bigtext)
```

Regras gerais para TODOS os tasks:
- Commits frequentes com mensagens `feat:`/`chore:`/`fix:`/`a11y:` em português, terminando com `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Após cada task: `npm run build` deve passar sem erros de TypeScript.
- NUNCA inventar conteúdo/copy — portar de `legacy/index.html`.
- Não tocar em `cultivaclub/`.

---

## FASE 1 — Layout & Navegação (Engenheiro de Layout · Opus)

### Task 1: Mover site legado e scaffold do Vite

**Files:**
- Move: `index.html` → `legacy/index.html`, `assets/` → `legacy/assets/`
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `vercel.json`, `.gitignore` (atualizar), `src/main.tsx`, `src/app/App.tsx` (provisório), `public/` (copiar imagens)

- [ ] **Step 1: Mover o site legado preservando histórico**

```powershell
git mv index.html legacy/index.html
git mv assets legacy/assets
```

(Os paths relativos `assets/...` dentro de `legacy/index.html` continuam válidos porque `assets/` foi movido junto para dentro de `legacy/`.)

- [ ] **Step 2: Copiar imagens para public/**

```powershell
New-Item -ItemType Directory -Force public
Copy-Item legacy/assets/pedro.jpg, legacy/assets/neo-energy.png, legacy/assets/neo-energy-logo.png public/
```

- [ ] **Step 3: Criar package.json**

```json
{
  "name": "portfolio-pedro",
  "private": true,
  "version": "3.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 4: Instalar dependências**

```powershell
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
```

- [ ] **Step 5: Criar vite.config.ts, tsconfigs, index.html, main.tsx e App provisório**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": false
  },
  "include": ["vite.config.ts"]
}
```

`index.html` (raiz) — portar as meta tags do `legacy/index.html` (title, description, og:*, theme-color, fontes Google):
```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Pedro César Camargo — Backend Developer · Java · Spring Boot</title>
  <meta name="description" content="Portfólio de Pedro César Camargo dos Santos — Desenvolvedor Backend especialista em Java, Spring Boot, APIs REST, Docker, PostgreSQL e AWS. Estudante de Análise e Desenvolvimento de Sistemas." />
  <meta name="author" content="Pedro César Camargo dos Santos" />
  <meta name="theme-color" content="#0E0D0B" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Pedro César Camargo — Backend Developer" />
  <meta property="og:description" content="Java · Spring Boot · REST APIs · Docker · PostgreSQL · AWS" />
  <meta property="og:locale" content="pt_BR" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,200..900,0..100,0..1;1,9..144,200..900,0..100,0..1&family=Geist:wght@300..700&family=Geist+Mono:wght@300..600&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

`src/main.tsx`:
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`src/app/App.tsx` (provisório, substituído na Task 3):
```tsx
export default function App() {
  return <h1>Portfólio V3 — em construção</h1>;
}
```

`vercel.json` (raiz):
```json
{
  "rewrites": [{ "source": "/((?!cultivaclub/).*)", "destination": "/index.html" }]
}
```

`.gitignore` — acrescentar:
```
node_modules
dist
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: build sem erros, `dist/` gerado.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "chore: move site legado para legacy/ e scaffold Vite + React + TS"
```

---

### Task 2: Design tokens e estilos globais

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Modify: `src/main.tsx` (importar os CSS)
- Referência: `legacy/assets/styles.css` linhas 1–230 (tokens, reset, atmosfera, grain, kicker, bigtext, botões, reveal)

- [ ] **Step 1: Criar tokens.css** — portar VERBATIM o bloco `:root` do legado:

```css
:root {
  /* palette */
  --bg:        #0E0D0B;
  --bg-2:      #15130F;
  --bg-3:      #1B1814;
  --line:      #2A2620;
  --line-soft: #1F1C17;
  --ink:       #F4EFE6;
  --ink-soft:  #C7C0B2;
  --mute:      #8C857A;
  --mute-2:    #5E574D;
  --accent:    #E37B3E;
  --accent-2:  #C9A56A;
  --accent-3:  #B7E0A0;

  /* type */
  --serif:  "Fraunces", "Times New Roman", ui-serif, Georgia, serif;
  --sans:   "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono:   "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* spatial */
  --pad-x:   clamp(22px, 5vw, 96px);
  --maxw:    1440px;
  --rhythm:  clamp(120px, 14vw, 220px);
  --radius:  2px;
}
```

- [ ] **Step 2: Criar global.css** portando do legado: reset (`box-sizing`, selection, html/body), atmosfera (`body::before` com os radial-gradients), `.grain` (com `@keyframes grain`), utilitários `.kicker`, `.kicker--muted`, `.kicker--accent`, `.bigtext`, `.btn`/`.btn--solid`/`.btn--ghost`/`.btn--sm`, `.inline-link`, classes de animação `.reveal` e `@keyframes`. IMPORTANTE: envolver TODAS as animações decorativas em `@media (prefers-reduced-motion: no-preference)` e adicionar:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Importar em main.tsx** (antes do App):

```tsx
import './styles/tokens.css';
import './styles/global.css';
```

- [ ] **Step 4: Verificar build e commit**

Run: `npm run build` → PASS
```powershell
git add -A; git commit -m "feat: design tokens e estilos globais portados do design system legado"
```

---

### Task 3: Router, RootLayout, Nav, Footer e esqueleto das páginas

**Files:**
- Create: `src/app/router.tsx`, `src/layouts/RootLayout.tsx` (+ `RootLayout.css`), `src/layouts/Nav.tsx` (+ `Nav.css`), `src/layouts/Footer.tsx` (+ `Footer.css`), `src/pages/HomePage.tsx`, `src/pages/ProjectPage.tsx`, `src/pages/NotFoundPage.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Criar router.tsx**

```tsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import ProjectPage from '../pages/ProjectPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projetos/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
```

`App.tsx`:
```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function App() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 2: RootLayout** com skip-link, grain, scroll/foco gerenciados na troca de rota:

```tsx
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import './RootLayout.css';

export default function RootLayout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="conteudo" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

`.skip-link` em `RootLayout.css`: visualmente oculto, visível em `:focus` (top-left, fundo `--accent`, texto `--bg`).

- [ ] **Step 3: Nav** — portar a estrutura do `<header class="nav">` do legado (linhas 32–56 de `legacy/index.html`): marca com foto (`/pedro.jpg`), links numerados das seções como `<a href="/#sobre">` etc. (Link absoluto com hash para funcionarem fora da home) e CTA "Disponível para projetos". Adicionar menu mobile: botão hambúrguer (`<button aria-expanded aria-controls="menu-mobile">`) que abre painel overlay com os mesmos links; fechar com Escape e ao navegar. Portar o CSS do bloco `.nav` do legado adaptando.

- [ ] **Step 4: Footer** — portar `<footer class="foot">` do legado (linhas 1108–1118) com o ano e "PEDRO CÉSAR" gigante.

- [ ] **Step 5: Esqueleto das páginas** (conteúdo real vem nas fases 2):

```tsx
// HomePage.tsx
export default function HomePage() {
  return <h1 style={{ padding: 'var(--pad-x)' }}>Home — seções nas próximas fases</h1>;
}
// ProjectPage.tsx
import { useParams } from 'react-router-dom';
export default function ProjectPage() {
  const { slug } = useParams();
  return <h1 style={{ padding: 'var(--pad-x)' }}>Projeto: {slug}</h1>;
}
// NotFoundPage.tsx
import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return (
    <section style={{ padding: 'var(--rhythm) var(--pad-x)' }}>
      <h1>404 — Página não encontrada</h1>
      <Link to="/">← Voltar para a home</Link>
    </section>
  );
}
```

- [ ] **Step 6: Verificar no preview** — iniciar dev server e verificar: nav renderiza, rotas `/`, `/projetos/teste`, `/qualquer-coisa` (404) funcionam, menu mobile abre/fecha em viewport estreito.

- [ ] **Step 7: Build + commit**

```powershell
npm run build
git add -A; git commit -m "feat: router, RootLayout, Nav responsiva e Footer"
```

---

## FASE 2 — Componentes & Estado (Eng. de Componentes · Opus + Eng. de Estado · Sonnet)

### Task 4: Tipos de domínio e conteúdo tipado

**Files:**
- Create: `src/content/types.ts`, `src/content/profile.ts`, `src/content/projects.ts`, `src/content/certs.ts`, `src/content/stack.ts`, `src/content/timeline.ts`
- Fonte: `legacy/index.html` — portar copy VERBATIM.

- [ ] **Step 1: types.ts**

```ts
export interface GitHubRepoStats {
  stars: number;
  languages: string[];
  pushedAt: string | null;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'github' | 'youtube' | 'live';
}

export interface ProjectMedia {
  type: 'youtube' | 'image' | 'placeholder';
  src?: string;
  alt?: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  status: string;
  categories: string[];
  summary: string;
  descriptionLead: string;
  descriptionBody: string;
  features?: string[];
  insight?: { kicker: string; text: string };
  tech: string[];
  media: ProjectMedia;
  hasArchitectureDiagram: boolean;
  links: ProjectLink[];
  githubRepo?: string;
  fallbackStats: GitHubRepoStats;
}

export interface TimelineEntryData {
  period: { start: string; end?: string };
  title: string;
  org: string;
  description?: string;
}

export interface Certification {
  category: string;
  title: string;
  description: string;
  featured?: boolean;
  issuer?: string;
  badge: 'code' | 'cloud' | 'shield' | 'person';
}

export interface StackArea {
  index: string;
  title: string;
  description: string;
  tags: string[];
  wide?: boolean;
}

export interface StatData {
  value: number;
  unit: string;
  label: string;
}
```

- [ ] **Step 2: projects.ts** — dois projetos com copy portada das seções "PROJETO 01 — CULTIVACLUB" e "PROJETO 02 — NEO ENERGY" do legado (linhas 719–1047). Estrutura:

```ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'cultivaclub',
    title: 'CultivaClub',
    status: 'Em destaque',
    categories: ['Backend', 'Refatoração', 'Cloud'],
    summary: 'Refatoração de três microsserviços para um monolito modular em Spring Boot — deploy simplificado, custo menor, entregas mais rápidas.',
    descriptionLead: '...(portar verbatim)...',
    descriptionBody: '...(portar verbatim)...',
    insight: { kicker: 'APRENDIZADO CENTRAL', text: '...(portar verbatim)...' },
    tech: ['Java 21', 'Spring Boot', 'JPA / Hibernate', 'PostgreSQL', 'Neon', 'Render', 'Vercel', 'REST API', 'Monolito Modular', 'HikariCP'],
    media: { type: 'youtube', src: 'https://www.youtube.com/embed/Y_FaWIzn7W4?rel=0&modestbranding=1', caption: 'Fig. 01 · Vídeo demonstrativo no YouTube — tour completo pela aplicação narrado pelo autor.' },
    hasArchitectureDiagram: true,
    links: [
      { label: 'Código no GitHub', href: 'https://github.com/Pcamargoz/Projeto-Cultiva-Club-Back-End-Monolito-', kind: 'github' },
      { label: 'Assistir no YouTube', href: 'https://youtu.be/Y_FaWIzn7W4', kind: 'youtube' },
    ],
    githubRepo: 'Pcamargoz/Projeto-Cultiva-Club-Back-End-Monolito-',
    fallbackStats: { stars: 0, languages: ['Java'], pushedAt: null },
  },
  {
    slug: 'neo-energy',
    title: 'NEO Energy',
    status: 'No ar · Acadêmico (UPX)',
    categories: ['Full-stack', 'Smart Home', 'Energia'],
    summary: 'Gestão inteligente de energia renovável e irrigação automática — API REST Java 21 + Spring Boot com JWT e três perfis de acesso.',
    // descriptionLead/Body, features (5 itens da ul.neo-features), insight "NOTA DO AUTOR · LIDERANÇA" — portar verbatim
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'JPA', 'PostgreSQL', 'Docker', 'MapStruct', 'Lombok', 'Maven'],
    media: { type: 'image', src: '/neo-energy.png', alt: 'Resumo visual do NEO ENERGY — dashboard de energia solar, irrigação inteligente e histórico de atividades', caption: 'Fig. 02 · Resumo do NEO ENERGY — geração solar, irrigação inteligente e histórico, em tempo real.' },
    hasArchitectureDiagram: false,
    links: [
      { label: 'Aplicação ao vivo', href: 'https://front-end-neo-energy.vercel.app/', kind: 'live' },
      { label: 'Back-end no GitHub', href: 'https://github.com/Pcamargoz/NeoEnergy---Facens', kind: 'github' },
    ],
    githubRepo: 'Pcamargoz/NeoEnergy---Facens',
    fallbackStats: { stars: 0, languages: ['Java'], pushedAt: null },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

Os campos marcados "(portar verbatim)" DEVEM ser preenchidos com o texto completo de `legacy/index.html` — sem resumir.

- [ ] **Step 3: profile.ts, certs.ts, stack.ts, timeline.ts** — portar das seções Sobre (incl. facts e stats), Certificações (4 cards + lista extra), Stack (7 áreas A–G), Trajetória (3 experiências + 4 formações), Contato (LinkedIn destaque + 4 cards) e Hero (título, role, lede, aside). Tipar tudo com os tipos do Step 1; exportar constantes nomeadas (`profile`, `stats`, `certifications`, `certExtras`, `stackAreas`, `experience`, `education`, `contacts`).

- [ ] **Step 4: Build + commit**

```powershell
npm run build
git add -A; git commit -m "feat: tipos de domínio e conteúdo tipado portado do site legado"
```

---

### Task 5: Biblioteca de componentes UI

**Files:**
- Create (cada um com seu `.css` co-locado quando houver estilo próprio): `src/components/Kicker.tsx`, `Button.tsx`, `SectionHeading.tsx`, `TagList.tsx`, `Stat.tsx`, `ContactCard.tsx`, `MediaFrame.tsx`, `TimelineEntry.tsx`, `ProjectCard.tsx`, `Marquee.tsx`, `CultivaArchDiagram.tsx`
- Referência visual: blocos correspondentes em `legacy/assets/styles.css`.

Assinaturas de props (obrigatórias, TypeScript estrito):

```tsx
// Kicker.tsx
export function Kicker({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'muted' | 'accent' });

// Button.tsx — renderiza <a> (href) ou <Link> (to)
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
  size?: 'md' | 'sm';
  href?: string;       // externo → target=_blank rel=noopener
  to?: string;         // interno → react-router Link
  icon?: React.ReactNode;
};

// SectionHeading.tsx — head padrão de seção (número + título + régua)
export function SectionHeading({ number, title, id }: { number: string; title: string; id?: string });

// TagList.tsx
export function TagList({ tags, label }: { tags: string[]; label?: string });
// Renderiza <ul aria-label={label}> com <li> por tag. Estado vazio: tags.length === 0 → retorna null.

// Stat.tsx — número animado com useCountUp
export function Stat({ value, unit, label }: StatData);

// ContactCard.tsx
export function ContactCard({ kicker, value, href, external, featured, description }: {
  kicker: string; value: string; href: string; external?: boolean; featured?: boolean; description?: string;
});

// MediaFrame.tsx — estados: youtube (iframe lazy), image, placeholder ("em breve")
export function MediaFrame({ media }: { media: ProjectMedia });

// TimelineEntry.tsx
export function TimelineEntry({ entry }: { entry: TimelineEntryData });

// ProjectCard.tsx — card da vitrine; navega para /projetos/:slug
export function ProjectCard({ project, index }: { project: Project; index: number });

// Marquee.tsx — faixa de skills; aria-hidden, pausada com prefers-reduced-motion
export function Marquee({ items }: { items: string[] });

// CultivaArchDiagram.tsx — porta o <svg> do diagrama (legacy/index.html linhas 799-900) + figcaption
export function CultivaArchDiagram();
```

- [ ] **Step 1: Implementar Kicker, Button, SectionHeading, TagList** (componentes base) com CSS portado.
- [ ] **Step 2: Implementar Stat, ContactCard, TimelineEntry, Marquee** com CSS portado.
- [ ] **Step 3: Implementar MediaFrame** — `type: 'youtube'` → `<iframe loading="lazy" title=...>`; `image` → `<img loading="lazy">`; `placeholder` → bloco "Vídeo de demonstração — em breve aqui" (portar `.media-placeholder` e `.neo-demo` do legado).
- [ ] **Step 4: Implementar ProjectCard** — NOVO design (não existe equivalente no legado): card clicável com número grande (01/02), título serif, summary, categorias como kickers, até 5 tags de tech, seta "Ver projeto →". Card inteiro é um `<Link>` para `/projetos/${project.slug}` com `aria-label={`Ver projeto ${project.title}`}`. Hover: borda `--accent`, leve translate. Grid responsivo (1 col mobile, 2 cols ≥ 900px).
- [ ] **Step 5: Implementar CultivaArchDiagram** — converter o SVG do legado para JSX (atributos camelCase: `strokeWidth`, `fontFamily`, etc.), manter `<title id="arch-title">` e `aria-labelledby`.
- [ ] **Step 6: Build + commit**

```powershell
npm run build
git add -A; git commit -m "feat: biblioteca de componentes UI tipados"
```

---

### Task 6: Hooks de apresentação (Estado · Sonnet)

**Files:**
- Create: `src/hooks/useScrollReveal.ts`, `src/hooks/useCountUp.ts`

- [ ] **Step 1: useScrollReveal** — IntersectionObserver que adiciona classe `is-visible`; respeita reduced motion:

```ts
import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 2: useCountUp** — anima de 0 até `target` quando visível (requestAnimationFrame, ~1.2s, easing easeOutCubic); com reduced motion mostra o valor final direto. Retorna `{ ref, value }`.

- [ ] **Step 3: Build + commit**

```powershell
npm run build
git add -A; git commit -m "feat: hooks useScrollReveal e useCountUp com suporte a reduced motion"
```

---

### Task 7: Seções da Home e composição das páginas

**Files:**
- Create: `src/sections/Hero.tsx`, `ProjectsShowcase.tsx`, `About.tsx`, `Atuacao.tsx`, `Certs.tsx`, `Stack.tsx`, `Trajetoria.tsx`, `Contact.tsx` (cada uma com `.css` co-locado portado do bloco correspondente do legado)
- Modify: `src/pages/HomePage.tsx`, `src/pages/ProjectPage.tsx`

- [ ] **Step 1: Seções** — cada seção consome `src/content/*` e os componentes da Task 5. Estrutura HTML/classes portadas do legado. IDs de âncora preservados: `sobre`, `atuacao`, `certificacoes`, `stack`, `trajetoria`, `projetos`, `contato`. Headings: `<h1>` apenas no Hero; seções usam `<h2>` via SectionHeading.

- [ ] **Step 2: ProjectsShowcase** — NOVA seção, id `projetos`, posicionada LOGO APÓS o Hero + Marquee (projetos sobem na hierarquia da página — objetivo central do refactor). Renderiza grid de `ProjectCard` + texto intro curto.

- [ ] **Step 3: HomePage composition** — ordem: `Hero` → `Marquee` → `ProjectsShowcase` → `About` (com stats) → `Atuacao` → `Certs` → `Stack` → `Trajetoria` → `Contact`. Renumerar `SectionHeading` na ordem nova (projetos = / 01).

- [ ] **Step 4: ProjectPage** — usa `getProject(slug)`; se `undefined` → renderiza `NotFoundPage`. Layout: breadcrumb "← Todos os projetos" (Link para `/#projetos`), header com status/categorias/título `<h1>`, descrição completa (lead, body, features, insight), `TagList` da stack, `MediaFrame`, `CultivaArchDiagram` quando `hasArchitectureDiagram`, links (Buttons), e navegação anterior/próximo projeto no rodapé da página. Placeholder para GitHubStats (integrado na Fase 3): renderizar apenas se `githubRepo` definido.

- [ ] **Step 5: Verificação visual no preview** — home completa, navegação por âncoras, `/projetos/cultivaclub` e `/projetos/neo-energy` completos, `/projetos/nao-existe` → 404. Mobile 380px sem overflow horizontal.

- [ ] **Step 6: Build + commit**

```powershell
npm run build
git add -A; git commit -m "feat: seções da home e páginas de projeto completas"
```

---

## FASE 3 — Integração (Engenheiro de Integração · Opus)

### Task 8: githubClient com cache (TDD)

**Files:**
- Create: `src/services/githubClient.ts`, `src/services/githubClient.test.ts`
- Modify: `package.json` (devDeps), `vite.config.ts` (config de teste)

- [ ] **Step 1: Instalar ferramentas de teste**

```powershell
npm install -D vitest jsdom @testing-library/react
```

Em `vite.config.ts`, trocar o import para `import { defineConfig } from 'vitest/config';` e adicionar:
```ts
  test: { environment: 'jsdom' },
```

- [ ] **Step 2: Escrever testes que falham** (`githubClient.test.ts`):

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchRepoStats, getCachedStats, setCachedStats, __clearMemoryCache } from './githubClient';

const repoJson = { stargazers_count: 7, pushed_at: '2026-05-01T12:00:00Z' };
const langJson = { Java: 12345, Dockerfile: 200 };

function mockFetchOk() {
  return vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = String(input);
    const body = url.endsWith('/languages') ? langJson : repoJson;
    return new Response(JSON.stringify(body), { status: 200 });
  });
}

beforeEach(() => {
  sessionStorage.clear();
  __clearMemoryCache();
});
afterEach(() => vi.restoreAllMocks());

describe('fetchRepoStats', () => {
  it('mapeia resposta da API para GitHubRepoStats', async () => {
    mockFetchOk();
    const stats = await fetchRepoStats('Pcamargoz/repo');
    expect(stats).toEqual({ stars: 7, languages: ['Java', 'Dockerfile'], pushedAt: '2026-05-01T12:00:00Z' });
  });

  it('lança erro quando a API responde não-ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 403 }));
    await expect(fetchRepoStats('Pcamargoz/repo')).rejects.toThrow();
  });
});

describe('cache', () => {
  it('retorna null sem cache e devolve o valor após setCachedStats', () => {
    expect(getCachedStats('Pcamargoz/repo')).toBeNull();
    const stats = { stars: 1, languages: ['Java'], pushedAt: null };
    setCachedStats('Pcamargoz/repo', stats);
    expect(getCachedStats('Pcamargoz/repo')).toEqual(stats);
  });

  it('expira após o TTL', () => {
    vi.useFakeTimers();
    const stats = { stars: 1, languages: ['Java'], pushedAt: null };
    setCachedStats('Pcamargoz/repo', stats);
    vi.advanceTimersByTime(31 * 60 * 1000);
    __clearMemoryCache(); // memória respeita TTL via timestamp também
    expect(getCachedStats('Pcamargoz/repo')).toBeNull();
    vi.useRealTimers();
  });
});
```

- [ ] **Step 3: Rodar e ver falhar** — `npm test` → FAIL (módulo não existe).

- [ ] **Step 4: Implementar githubClient.ts**

```ts
import type { GitHubRepoStats } from '../content/types';

const API = 'https://api.github.com';
const TTL_MS = 30 * 60 * 1000;
const KEY_PREFIX = 'gh-stats:';

type CacheEntry = { stats: GitHubRepoStats; ts: number };

const memoryCache = new Map<string, CacheEntry>();

export function __clearMemoryCache() {
  memoryCache.clear();
}

function isFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.ts < TTL_MS;
}

export function getCachedStats(repo: string): GitHubRepoStats | null {
  const mem = memoryCache.get(repo);
  if (mem && isFresh(mem)) return mem.stats;
  try {
    const raw = sessionStorage.getItem(KEY_PREFIX + repo);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!isFresh(entry)) return null;
    memoryCache.set(repo, entry);
    return entry.stats;
  } catch {
    return null;
  }
}

export function setCachedStats(repo: string, stats: GitHubRepoStats): void {
  const entry: CacheEntry = { stats, ts: Date.now() };
  memoryCache.set(repo, entry);
  try {
    sessionStorage.setItem(KEY_PREFIX + repo, JSON.stringify(entry));
  } catch {
    // storage cheio/indisponível — cache em memória já cobre a sessão
  }
}

export async function fetchRepoStats(repo: string, signal?: AbortSignal): Promise<GitHubRepoStats> {
  const headers = { Accept: 'application/vnd.github+json' };
  const [repoRes, langRes] = await Promise.all([
    fetch(`${API}/repos/${repo}`, { signal, headers }),
    fetch(`${API}/repos/${repo}/languages`, { signal, headers }),
  ]);
  if (!repoRes.ok || !langRes.ok) {
    throw new Error(`GitHub API: ${repoRes.status}/${langRes.status}`);
  }
  const repoJson = (await repoRes.json()) as { stargazers_count?: number; pushed_at?: string | null };
  const langJson = (await langRes.json()) as Record<string, number>;
  return {
    stars: repoJson.stargazers_count ?? 0,
    languages: Object.keys(langJson),
    pushedAt: repoJson.pushed_at ?? null,
  };
}
```

- [ ] **Step 5: Rodar testes** — `npm test` → PASS (ajustar teste de TTL se necessário para limpar memória, mantendo a semântica: cache expirado nunca é retornado).

- [ ] **Step 6: Commit**

```powershell
git add -A; git commit -m "feat: githubClient com cache em memória + sessionStorage (TDD)"
```

---

### Task 9: useGitHubRepo + GitHubStats na ProjectPage

**Files:**
- Create: `src/hooks/useGitHubRepo.ts`, `src/hooks/useGitHubRepo.test.tsx`, `src/components/GitHubStats.tsx` (+ `.css`)
- Modify: `src/pages/ProjectPage.tsx`

- [ ] **Step 1: Testes do hook** (`useGitHubRepo.test.tsx`):

```tsx
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGitHubRepo } from './useGitHubRepo';
import { __clearMemoryCache } from '../services/githubClient';

const fallback = { stars: 0, languages: ['Java'], pushedAt: null };

beforeEach(() => {
  sessionStorage.clear();
  __clearMemoryCache();
});
afterEach(() => vi.restoreAllMocks());

describe('useGitHubRepo', () => {
  it('success: começa loading e termina com dados da API', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) =>
      new Response(
        JSON.stringify(String(input).endsWith('/languages') ? { Java: 1 } : { stargazers_count: 3, pushed_at: '2026-01-01T00:00:00Z' }),
        { status: 200 },
      ),
    );
    const { result } = renderHook(() => useGitHubRepo('Pcamargoz/x', fallback));
    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.stats.stars).toBe(3);
  });

  it('error: usa o fallback estático', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('rate limit'));
    const { result } = renderHook(() => useGitHubRepo('Pcamargoz/x', fallback));
    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.stats).toEqual(fallback);
  });

  it('repo undefined: idle com fallback, sem fetch', () => {
    const spy = vi.spyOn(globalThis, 'fetch');
    const { result } = renderHook(() => useGitHubRepo(undefined, fallback));
    expect(result.current.status).toBe('idle');
    expect(spy).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test` → FAIL.

- [ ] **Step 3: Implementar useGitHubRepo.ts**

```ts
import { useEffect, useState } from 'react';
import type { GitHubRepoStats } from '../content/types';
import { fetchRepoStats, getCachedStats, setCachedStats } from '../services/githubClient';

export type GitHubRepoState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  stats: GitHubRepoStats;
  live: boolean; // true quando os dados vieram da API/cache (não do fallback)
};

export function useGitHubRepo(repo: string | undefined, fallback: GitHubRepoStats): GitHubRepoState {
  const [state, setState] = useState<GitHubRepoState>(() => {
    if (!repo) return { status: 'idle', stats: fallback, live: false };
    const cached = getCachedStats(repo);
    if (cached) return { status: 'success', stats: cached, live: true };
    return { status: 'loading', stats: fallback, live: false };
  });

  useEffect(() => {
    if (!repo || state.status !== 'loading') return;
    const controller = new AbortController();
    fetchRepoStats(repo, controller.signal)
      .then((stats) => {
        setCachedStats(repo, stats);
        setState({ status: 'success', stats, live: true });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setState({ status: 'error', stats: fallback, live: false });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  return state;
}
```

- [ ] **Step 4: Rodar testes** — `npm test` → PASS.

- [ ] **Step 5: GitHubStats.tsx** — painel "DADOS AO VIVO · GITHUB" na ProjectPage:
  - `status === 'loading'` → três blocos skeleton com `aria-busy="true"` e texto visually-hidden "Carregando dados do GitHub".
  - `success` → estrelas, linguagens (TagList), "último push" formatado com `Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })`; link para o repo.
  - `error` → mostra os dados de fallback com nota discreta "dados offline — não foi possível consultar o GitHub agora" (`role="status"`).
  - `idle` (sem repo) → retorna `null`.
  Componente recebe `{ repo, fallback }` e usa o hook — páginas não conhecem detalhes da API.

- [ ] **Step 6: Integrar na ProjectPage** (substituir o placeholder da Task 7) e verificar no preview com a rede real; testar o estado de erro bloqueando `api.github.com` via devtools ou forçando repo inexistente temporariamente.

- [ ] **Step 7: Build + testes + commit**

```powershell
npm test; npm run build
git add -A; git commit -m "feat: useGitHubRepo e painel de dados ao vivo do GitHub com fallback"
```

---

## FASE 4 — Acessibilidade & Polimento (Especialista em Acessibilidade · Haiku)

### Task 10: Auditoria de acessibilidade

**Files:** revisão de todos os componentes/seções; ajustes onde a checklist reprovar.

- [ ] **Step 1: Aplicar checklist** (verificar no preview com snapshot/inspeção e leitura do código):
  1. Um único `<h1>` por página; hierarquia h1→h2→h3 sem saltos.
  2. Landmarks: `header`, `nav` (com `aria-label`), `main`, `footer`; skip-link funcional.
  3. Toda imagem com `alt` significativo; SVGs decorativos `aria-hidden="true"`; diagrama com `<title>` + `aria-labelledby`.
  4. iframes com `title`.
  5. Links externos com `rel="noopener"`; links que abrem em nova aba sinalizados (texto ou `aria-label`).
  6. Menu mobile: `aria-expanded`, `aria-controls`, fecha com Escape, foco retorna ao botão.
  7. Foco visível em TODOS os interativos (`:focus-visible` com outline `--accent`); navegação por Tab na ordem lógica.
  8. Troca de rota: foco movido para `main`, título do documento atualizado (`document.title = ...` por página via useEffect).
  9. `prefers-reduced-motion`: marquee parada, reveals/count-up instantâneos, grain estático.
  10. Contraste AA: verificar pares (--ink/--bg ✓, --ink-soft/--bg ✓, --mute #8C857A sobre --bg — verificar ratio ≥ 4.5:1 para texto pequeno; se reprovar, usar --ink-soft em textos pequenos e reservar --mute para texto ≥ 18.66px bold/24px).
  11. Marquee `aria-hidden="true"` (conteúdo duplicado decorativo).
  12. Estados de loading com `aria-busy`/`role="status"`; erro anunciado.

- [ ] **Step 2: Corrigir cada item reprovado** (edits diretos nos componentes).

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "a11y: auditoria completa — semântica, foco, ARIA, contraste e reduced motion"
```

---

### Task 11: Polimento final, verificação e entrega

- [ ] **Step 1: Títulos por página** — HomePage: título padrão; ProjectPage: `"CultivaClub — Pedro César Camargo"`; NotFound: `"Página não encontrada"`.
- [ ] **Step 2: Verificação completa no preview** — fluxo: home → card de projeto → página do projeto → dados GitHub carregam → voltar → âncoras da nav → mobile 380px (menu, sem overflow) → 404. Console sem erros.
- [ ] **Step 3: `npm test` e `npm run build`** — ambos PASS.
- [ ] **Step 4: Screenshot de prova** (preview) das páginas principais.
- [ ] **Step 5: Commit final**

```powershell
git add -A
git commit -m "feat: portfólio V3 em React — refatoração completa concluída"
```

---

## Self-review do plano (executado na escrita)

- Cobertura do spec: identidade evoluída (Tasks 2/5/7), Vite+TS (1), projetos CultivaClub+NEO (4/7), Vercel (1 — vercel.json), `/projetos/:slug` (3/7), GitHub API + fallback (8/9), hooks leves (6/8/9), a11y (10), critérios de qualidade (11). ✓
- Sem placeholders de implementação; campos "(portar verbatim)" apontam para fonte exata (`legacy/index.html`). ✓
- Tipos consistentes entre Tasks 4, 8 e 9 (`GitHubRepoStats`, `Project`, `getProject`). ✓
