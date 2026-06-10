import { Kicker } from './Kicker';
import './ContactCard.css';

interface ContactCardProps {
  kicker: string;
  value: string;
  href: string;
  external?: boolean;
  featured?: boolean;
  description?: string;
  handle?: string;
  arrow?: string;
}

/**
 * Cartão de contato — porta `.contact-card` e `.contact-card--featured` do legado.
 * O canal em destaque (LinkedIn) usa o layout de duas colunas com descrição e seta.
 */
export function ContactCard({
  kicker,
  value,
  href,
  external,
  featured,
  description,
  handle,
  arrow,
}: ContactCardProps) {
  const externalAttrs = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  if (featured) {
    return (
      <a className="contact-card contact-card--featured" href={href} {...externalAttrs}>
        <div className="contact-card__featured-l">
          <Kicker>{kicker}</Kicker>
          <span className="contact-card__featured-value">{value}</span>
          {handle && <span className="contact-card__featured-handle">{handle}</span>}
        </div>
        <div className="contact-card__featured-r">
          {description && <p>{description}</p>}
          {arrow && <span className="contact-card__featured-arrow">{arrow}</span>}
        </div>
        {external && <span className="visually-hidden"> (abre em nova aba)</span>}
      </a>
    );
  }

  return (
    <a className="contact-card" href={href} {...externalAttrs}>
      <Kicker tone="muted">{kicker}</Kicker>
      <span className="contact-card__value">{value}</span>
      {arrow && <span className="contact-card__arrow">{arrow}</span>}
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
