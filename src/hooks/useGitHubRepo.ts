import { useEffect, useState } from 'react';
import type { GitHubRepoStats } from '../content/types';
import { fetchRepoStats, getCachedStats, setCachedStats } from '../services/githubClient';

export type GitHubRepoState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  stats: GitHubRepoStats;
  /** true quando os dados vieram da API/cache (não do fallback estático) */
  live: boolean;
};

/**
 * Estado de dados ao vivo de um repositório do GitHub com cache de sessão e
 * fallback estático — a UI nunca quebra se a API falhar ou atingir rate limit.
 */
export function useGitHubRepo(
  repo: string | undefined,
  fallback: GitHubRepoStats,
): GitHubRepoState {
  const [state, setState] = useState<GitHubRepoState>(() => {
    if (!repo) return { status: 'idle', stats: fallback, live: false };
    const cached = getCachedStats(repo);
    if (cached) return { status: 'success', stats: cached, live: true };
    return { status: 'loading', stats: fallback, live: false };
  });

  useEffect(() => {
    if (!repo) return;
    const cached = getCachedStats(repo);
    if (cached) {
      setState({ status: 'success', stats: cached, live: true });
      return;
    }
    setState({ status: 'loading', stats: fallback, live: false });
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
    // fallback é conteúdo estático estável por slug; reexecutar apenas por repo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  return state;
}
