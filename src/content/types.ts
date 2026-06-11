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

export interface AtuacaoCard {
  num: string;
  title: string;
  paragraphs: string[];
  tags?: string[];
  kicker?: string;
  primary?: boolean;
  wide?: boolean;
}

export interface ContactItem {
  kind: 'github' | 'email' | 'phone' | 'site';
  label: string;
  value: string;
  handle?: string;
  href: string;
  arrow: string;
}

export interface FeaturedContact {
  kicker: string;
  value: string;
  handle: string;
  description: string;
  arrow: string;
  href: string;
}
