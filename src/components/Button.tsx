import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  size?: 'md' | 'sm';
  href?: string;
  to?: string;
  icon?: ReactNode;
};

/**
 * Botão/elo no estilo `.btn` do legado. Renderiza um <Link> de roteamento quando
 * recebe `to`, ou um <a> quando recebe `href`. Hrefs externos (http/protocolo)
 * abrem em nova aba com rel="noopener". Classes .btn já vivem em global.css.
 */
export function Button({
  children,
  variant = 'ghost',
  size = 'md',
  href,
  to,
  icon,
}: ButtonProps) {
  const cls = [
    'btn',
    variant === 'solid' ? 'btn--solid' : 'btn--ghost',
    size === 'sm' ? 'btn--sm' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }

  const isExternal = !!href && /^(https?:)?\/\//.test(href);

  return (
    <a
      href={href}
      className={cls}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
      {isExternal && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
