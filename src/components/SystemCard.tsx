import type { InternalSystem } from '../content/types';
import { Kicker } from './Kicker';
import { TagList } from './TagList';
import { statusClass } from './systemStatus';
import './SystemCard.css';

interface SystemCardProps {
  system: InternalSystem;
  index: number;
  onOpen: () => void;
}

/**
 * Card de um sistema prático na vitrine. Diferente do ProjectCard, é um
 * <button> que abre um modal (não navega) — reforça a ideia de demonstração
 * controlada. Estética coerente com o ProjectCard.
 */
export function SystemCard({ system, index, onOpen }: SystemCardProps) {
  const number = String(index + 1).padStart(2, '0');
  const techs = system.tech.slice(0, 5);

  return (
    <button
      type="button"
      className="system-card"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Ver detalhes do sistema ${system.name}`}
    >
      <div className="system-card__media">
        {system.cover?.src ? (
          <img
            className="system-card__img"
            src={system.cover.src}
            alt={system.cover.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="system-card__placeholder" aria-hidden="true">
            <span className="system-card__placeholder-glyph">{'</>'}</span>
          </span>
        )}
        <span className="system-card__seal" aria-hidden="true">
          Amostra autorizada
        </span>

        {system.status === 'Em desenvolvimento' && (
          <img
            className="system-card__tape"
            src="/sistemas/faixas-em-desenvolvimento.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="system-card__body">
        <div className="system-card__top">
          <span className="system-card__num" aria-hidden="true">
            {number}
          </span>
          <span className={`system-status ${statusClass(system.status)}`}>
            <span className="system-status__dot" aria-hidden="true" />
            {system.status}
          </span>
        </div>

        <h3 className="system-card__title">{system.name}</h3>

        <p className="system-card__tagline">{system.tagline}</p>

        <p className="system-card__objective">
          <Kicker tone="muted">Objetivo</Kicker>
          <span>{system.objective}</span>
        </p>

        <TagList tags={techs} label={`Tecnologias de ${system.name}`} />

        <span className="system-card__cta" aria-hidden="true">
          Ver detalhes →
        </span>
      </div>
    </button>
  );
}
