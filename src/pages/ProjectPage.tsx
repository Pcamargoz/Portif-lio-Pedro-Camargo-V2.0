import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects, getProject } from '../content/projects';
import type { ProjectLink } from '../content/types';
import { Kicker } from '../components/Kicker';
import { TagList } from '../components/TagList';
import { MediaFrame } from '../components/MediaFrame';
import { GitHubStats } from '../components/GitHubStats';
import { Button } from '../components/Button';
import NotFoundPage from './NotFoundPage';
import './ProjectPage.css';

const DEFAULT_TITLE = 'Pedro César Camargo — Backend Developer · Java · Spring Boot';

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.6C22 6.6 17.5 2 12 2z"
      fill="currentColor"
    />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.84.44A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.84-.44a2.5 2.5 0 0 0 1.76-1.76C22 15.2 22 12 22 12s0-3.2-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"
      fill="currentColor"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

function linkIcon(kind: ProjectLink['kind']) {
  switch (kind) {
    case 'github':
      return <GitHubIcon />;
    case 'youtube':
      return <YouTubeIcon />;
    case 'live':
      return <ExternalIcon />;
  }
}

/**
 * Página dedicada de projeto — /projetos/:slug. Centro da V3: descrição
 * completa, mídia, arquitetura, stack e links, com navegação entre projetos.
 */
export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} — Pedro César Camargo`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [project]);

  if (!project) {
    return <NotFoundPage />;
  }

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article className="section project-page">
      <nav className="project-page__breadcrumb" aria-label="Trilha de navegação">
        <Link to="/#projetos" className="inline-link project-page__back">
          ← Todos os projetos
        </Link>
      </nav>

      <header className="project-page__header">
        <div className="project-page__index" aria-hidden="true">
          <span className="project-page__index-num">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="project-page__index-label">PROJETO</span>
        </div>
        <div className="project-page__meta">
          <Kicker tone="accent">{project.status}</Kicker>
          <Kicker tone="muted">{project.categories.join(' · ')}</Kicker>
        </div>
        <h1 className="project-page__title">{project.title}</h1>
      </header>

      <div className="project-page__body">
        <div className="project-page__desc">
          <p className="project__desc-lead">{project.descriptionLead}</p>
          <p className="project__desc-body">{project.descriptionBody}</p>

          {project.features && project.features.length > 0 && (
            <ul className="project-page__features">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}

          {project.insight && (
            <aside className="project__insight">
              <Kicker tone="accent">{project.insight.kicker}</Kicker>
              <p>{project.insight.text}</p>
            </aside>
          )}

          <div className="project-page__tech">
            <h2 className="project-page__subheading">Tecnologias</h2>
            <TagList tags={project.tech} label="Tecnologias do projeto" />
          </div>

          <GitHubStats repo={project.githubRepo} fallback={project.fallbackStats} />
        </div>

        <div className="project-page__media">
          <MediaFrame media={project.media} />
        </div>
      </div>

      <div className="project__links">
        {project.links.map((link) => (
          <Button key={link.href} href={link.href} variant="ghost" size="sm" icon={linkIcon(link.kind)}>
            {link.label}
          </Button>
        ))}
      </div>

      <nav className="project-page__pager" aria-label="Outros projetos">
        {prev ? (
          <Link to={`/projetos/${prev.slug}`} className="project-page__pager-link">
            <span className="kicker kicker--muted">← Projeto anterior</span>
            <span className="project-page__pager-title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/projetos/${next.slug}`}
            className="project-page__pager-link project-page__pager-link--next"
          >
            <span className="kicker kicker--muted">Próximo projeto →</span>
            <span className="project-page__pager-title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
