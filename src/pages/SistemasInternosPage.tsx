import { useEffect, useState } from 'react';
import { systems, sistemasMedia } from '../content/systems';
import { SystemCard } from '../components/SystemCard';
import { SystemModal } from '../components/SystemModal';
import { Lightbox } from '../components/Lightbox';
import './SistemasInternosPage.css';

interface ZoomImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Página dedicada (rota /sistemas-internos, aberta em nova aba a partir da home).
 * Mostra somente os sistemas internos já estruturados: logo, linktree, cards com
 * modal de detalhes e lightbox. Conteúdo anonimizado por sigilo corporativo.
 */
export default function SistemasInternosPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState<ZoomImage | null>(null);
  const openSystem = systems.find((s) => s.slug === openSlug) ?? null;

  useEffect(() => {
    const prev = document.title;
    document.title = 'Sistemas internos — Pedro César Camargo';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main className="si-page">
      <header className="si-page__bar">
        <a className="si-page__back" href="/">
          ← Voltar ao portfólio
        </a>
        <span className="si-page__brand">
          pedro&nbsp;<em>césar</em>
        </span>
      </header>

      <div className="si-page__inner">
        {sistemasMedia.logo && (
          <figure className="si-page__logo">
            <img
              src={sistemasMedia.logo.src}
              alt={sistemasMedia.logo.alt}
              decoding="async"
            />
          </figure>
        )}

        <h1 className="si-page__title">Sistemas internos</h1>

        <p className="si-page__intro">
          Ferramentas que projetei e desenvolvi para uso interno corporativo —
          identificando gargalos no fluxo da equipe e transformando-os em soluções
          que otimizam o trabalho do dia a dia.
        </p>

        <p className="si-page__confidential" role="note">
          <span className="si-page__lock" aria-hidden="true">🔒</span>
          Sistemas corporativos de uso interno. Por confidencialidade, exibo apenas
          uma amostra visual e técnica autorizada — sem expor regras de negócio,
          dados, clientes ou funcionalidades completas.
        </p>

        {sistemasMedia.linktree && (
          <figure className="si-page__linktree">
            <button
              type="button"
              className="si-page__linktree-btn"
              onClick={() =>
                setZoom({
                  src: sistemasMedia.linktree!.src,
                  alt: sistemasMedia.linktree!.alt,
                  caption:
                    'Central de acesso aos sistemas internos · amostra autorizada.',
                })
              }
              aria-label="Ampliar imagem do linktree de sistemas internos"
            >
              <img
                src={sistemasMedia.linktree.src}
                alt={sistemasMedia.linktree.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="si-page__zoom-hint" aria-hidden="true">⤢ Ampliar</span>
            </button>
            <figcaption>
              Central de acesso aos sistemas internos · amostra autorizada.
            </figcaption>
          </figure>
        )}

        <div className="systems-grid">
          {systems.map((system, index) => (
            <SystemCard
              key={system.slug}
              system={system}
              index={index}
              onOpen={() => setOpenSlug(system.slug)}
            />
          ))}
        </div>
      </div>

      {openSystem && (
        <SystemModal system={openSystem} onClose={() => setOpenSlug(null)} />
      )}

      {zoom && (
        <Lightbox
          src={zoom.src}
          alt={zoom.alt}
          caption={zoom.caption}
          onClose={() => setZoom(null)}
        />
      )}
    </main>
  );
}
