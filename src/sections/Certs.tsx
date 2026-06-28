import { certsIntro, certifications, certExtras } from '../content/certs';
import type { Certification } from '../content/types';
import { SectionHeading } from '../components/SectionHeading';
import { Kicker } from '../components/Kicker';
import './Certs.css';

/** Badges SVG por categoria — portados do legado. */
function Badge({ kind, size }: { kind: Certification['badge']; size: number }) {
  switch (kind) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M5.5 14.5L12 18l6.5-3.5M5.5 9.5L12 13l6.5-3.5M12 4L5.5 7.5 12 11l6.5-3.5L12 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'person':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <article className={`cert-card${cert.featured ? ' cert-card--featured' : ''}`}>
      <div className="cert-card__head">
        <div className="cert-card__badge">
          <Badge kind={cert.badge} size={cert.featured ? 32 : 24} />
        </div>
        <span className="cert-card__cat">{cert.category}</span>
      </div>
      <div className="cert-card__body">
        <h3>{cert.title}</h3>
        <p>{cert.description}</p>
      </div>
      {cert.featured && cert.issuer && (
        <div className="cert-card__foot">
          <span className="cert-card__issuer">{cert.issuer}</span>
          <span className="cert-card__year">FOCO PRINCIPAL</span>
        </div>
      )}
    </article>
  );
}

/**
 * Especialização & certificações — intro com contagem 100+ e grid de cards
 * (featured ocupa a coluna esquerda inteira), portado de .certs-feature do legado.
 */
export function Certs() {
  return (
    <section className="section certs-feature" id="certificacoes">
      <SectionHeading
        number="/ 05"
        title="Especialização & certificações"
        id="certificacoes-titulo"
      />

      <div className="certs-feature__intro">
        <div className="certs-feature__lead">
          <p className="bigtext">{certsIntro.bigtext}</p>
        </div>
        <div className="certs-feature__meta">
          <div className="cf-meta-row">
            <span className="cf-meta-num">
              {certsIntro.metaNumber}
              <span>+</span>
            </span>
            <span className="cf-meta-label">
              {certsIntro.metaLabel}
              <br />
              conquistadas
            </span>
          </div>
          <p className="cf-meta-text">{certsIntro.metaText}</p>
        </div>
      </div>

      <div className="cert-grid">
        {certifications.map((cert) => (
          <CertCard key={cert.title} cert={cert} />
        ))}
      </div>

      <div className="cert-extra">
        <Kicker tone="muted">Outras conquistas relevantes</Kicker>
        <ul>
          {certExtras.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
