import type { GitHubRepoStats } from '../content/types';

const API = 'https://api.github.com';
const TTL_MS = 30 * 60 * 1000;
const KEY_PREFIX = 'gh-stats:';

type CacheEntry = { stats: GitHubRepoStats; ts: number };

const memoryCache = new Map<string, CacheEntry>();

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
    // storage cheio/indisponível — o cache em memória já cobre a sessão
  }
}

/**
 * Busca estrelas, linguagens e data do último push de um repositório público
 * via API do GitHub (sem token — nenhum segredo no cliente).
 */
export async function fetchRepoStats(
  repo: string,
  signal?: AbortSignal,
): Promise<GitHubRepoStats> {
  const headers = { Accept: 'application/vnd.github+json' };
  const [repoRes, langRes] = await Promise.all([
    fetch(`${API}/repos/${repo}`, { signal, headers }),
    fetch(`${API}/repos/${repo}/languages`, { signal, headers }),
  ]);
  if (!repoRes.ok || !langRes.ok) {
    throw new Error(`GitHub API: ${repoRes.status}/${langRes.status}`);
  }
  const repoJson = (await repoRes.json()) as {
    stargazers_count?: number;
    pushed_at?: string | null;
  };
  const langJson = (await langRes.json()) as Record<string, number>;
  return {
    stars: repoJson.stargazers_count ?? 0,
    languages: Object.keys(langJson),
    pushedAt: repoJson.pushed_at ?? null,
  };
}
