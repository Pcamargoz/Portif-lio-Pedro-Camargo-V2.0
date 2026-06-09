import type { ReactNode } from 'react';

interface KickerProps {
  children: ReactNode;
  tone?: 'default' | 'muted' | 'accent';
}

/**
 * Primitivo tipográfico mono uppercase. Porta `.kicker` / `.kicker--muted` /
 * `.kicker--accent` do design system legado (já definidos em global.css).
 */
export function Kicker({ children, tone = 'default' }: KickerProps) {
  const cls =
    tone === 'muted'
      ? 'kicker kicker--muted'
      : tone === 'accent'
        ? 'kicker kicker--accent'
        : 'kicker';
  return <span className={cls}>{children}</span>;
}
