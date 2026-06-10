import type { GitHubRepoStats } from '../content/types';
import { useGitHubRepo } from '../hooks/useGitHubRepo';
import { Kicker } from './Kicker';
import { TagList } from './TagList';
import './GitHubStats.css';

interface GitHubStatsProps {
  repo?: string;
  fallback: GitHubRepoStats;
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' });

function formatPushedAt(pushedAt: string | null): string | null {
  if (!pushedAt) return null;
  const date = new Date(pushedAt);
  if (Number.isNaN(date.getTime())) return null;
  return dateFormatter.format(date);
}

/**
 * Painel "Dados ao vivo · GitHub" — estrelas, linguagens e último push do
 * repositório, com skeleton de loading e fallback estático em caso de erro.
 * As páginas só conhecem repo + fallback; detalhes da API ficam no hook/client.
 */
export function GitHubStats({ repo, fallback }: GitHubStatsProps) {
  const { status, stats } = useGitHubRepo(repo, fallback);

  if (status === 'idle' || !repo) return null;

  if (status === 'loading') {
    return (
      <section className="gh-stats" aria-busy="true">
        <Kicker tone="accent">Dados ao vivo · GitHub</Kicker>
        <span className="visually-hidden">Carregando dados do GitHub</span>
        <div className="gh-stats__grid" aria-hidden="true">
          <span className="gh-stats__skeleton" />
          <span className="gh-stats__skeleton" />
          <span className="gh-stats__skeleton" />
        </div>
      </section>
    );
  }

  const pushedAt = formatPushedAt(stats.pushedAt);

  return (
    <section className="gh-stats">
      <Kicker tone="accent">Dados ao vivo · GitHub</Kicker>

      <div className="gh-stats__grid">
        <div className="gh-stats__item">
          <span className="gh-stats__value">★ {stats.stars}</span>
          <span className="gh-stats__label">estrelas</span>
        </div>

        {stats.languages.length > 0 && (
          <div className="gh-stats__item gh-stats__item--langs">
            <TagList tags={stats.languages} label="Linguagens do repositório" />
            <span className="gh-stats__label">linguagens</span>
          </div>
        )}

        {pushedAt && (
          <div className="gh-stats__item">
            <span className="gh-stats__value gh-stats__value--date">{pushedAt}</span>
            <span className="gh-stats__label">último push</span>
          </div>
        )}
      </div>

      {status === 'error' && (
        <p className="gh-stats__note" role="status">
          dados offline — não foi possível consultar o GitHub agora
        </p>
      )}

      <a
        className="inline-link gh-stats__link"
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver repositório ↗
      </a>
    </section>
  );
}
