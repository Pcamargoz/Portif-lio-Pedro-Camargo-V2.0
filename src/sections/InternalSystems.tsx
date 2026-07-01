import { useState } from 'react';
import { sistemasMedia } from '../content/systems';
import { SectionHeading } from '../components/SectionHeading';
import { ComingSoonModal } from '../components/ComingSoonModal';
import './InternalSystems.css';

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Portal dos sistemas internos na home (/ 02). Não expõe os sistemas
 * diretamente: apresenta a identidade visual e um botão que, por enquanto,
 * abre um aviso "Em breve" — a área dedicada permanece indisponível.
 */
export function InternalSystems() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="section sistemas" id="sistemas">
      <SectionHeading number="/ 02" title="Sistemas internos" id="sistemas-titulo" />

      <p className="sistemas__intro">
        Ferramentas que projetei e desenvolvi para uso interno corporativo —
        identificando gargalos no fluxo da equipe e transformando-os em soluções
        que otimizam o trabalho do dia a dia.
      </p>

      <p className="sistemas__confidential" role="note">
        <span className="sistemas__lock" aria-hidden="true">🔒</span>
        Sistemas corporativos de uso interno. Por confidencialidade, os detalhes
        ficam em uma área dedicada, com apenas uma amostra visual e técnica
        autorizada — sem expor regras de negócio, dados ou clientes.
      </p>

      {sistemasMedia.logo && (
        <figure className="sistemas__logo">
          <img
            src={sistemasMedia.logo.src}
            alt={sistemasMedia.logo.alt}
            decoding="async"
          />
        </figure>
      )}

      <div className="sistemas__cta">
        <button
          type="button"
          className="btn btn--solid"
          onClick={() => setShowComingSoon(true)}
        >
          <span>Ver sistemas internos</span>
          <ExternalIcon />
        </button>
        <p className="sistemas__cta-note">
          Área dedicada e controlada — disponível em breve.
        </p>
      </div>

      {showComingSoon && (
        <ComingSoonModal onClose={() => setShowComingSoon(false)} />
      )}
    </section>
  );
}
