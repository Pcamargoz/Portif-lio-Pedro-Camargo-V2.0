import { useEffect, useId, useRef, useState } from 'react';
import type { InternalSystem, SystemShot } from '../content/types';
import { Kicker } from './Kicker';
import { TagList } from './TagList';
import { Lightbox } from './Lightbox';
import { statusClass } from './systemStatus';
import './SystemModal.css';

interface SystemModalProps {
  system: InternalSystem;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Modal de detalhes de um sistema prático. Acessível: role="dialog" + aria-modal,
 * trap de foco, fecha com Esc e clique no backdrop, trava o scroll do body e
 * devolve o foco ao elemento que o abriu.
 */
export function SystemModal({ system, onClose }: SystemModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const [zoom, setZoom] = useState<SystemShot | null>(null);

  // Trava scroll do body + Esc + trap de foco; restaura foco ao fechar.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // foco inicial no dialog
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables || focusables.length === 0) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="system-modal__backdrop"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="system-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="system-modal__close"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          <span aria-hidden="true">×</span>
        </button>

        <header className="system-modal__head">
          <span className={`system-status ${statusClass(system.status)}`}>
            <span className="system-status__dot" aria-hidden="true" />
            {system.status}
          </span>
          <h2 className="system-modal__title" id={titleId}>
            {system.name}
          </h2>
          <p className="system-modal__tagline" id={descId}>
            {system.tagline}
          </p>
        </header>

        <p className="system-modal__confidential" role="note">
          <span className="system-modal__lock" aria-hidden="true">🛠️</span>
          Solução aplicada em ambiente profissional real. Apresento aqui uma
          amostra visual e técnica — o suficiente para mostrar o problema
          resolvido e como foi construído.
        </p>

        <div className="system-modal__body">
          <section className="system-modal__block">
            <Kicker tone="muted">O problema</Kicker>
            <p>{system.problem}</p>
          </section>

          <section className="system-modal__block">
            <Kicker tone="accent">A solução</Kicker>
            <p>{system.solution}</p>
          </section>

          <div className="system-modal__cols">
            <section className="system-modal__block">
              <Kicker tone="muted">Desafios enfrentados</Kicker>
              <ul className="system-modal__list">
                {system.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            <section className="system-modal__block">
              <Kicker tone="muted">Melhorias obtidas</Kicker>
              <ul className="system-modal__list system-modal__list--gain">
                {system.improvements.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="system-modal__block">
            <Kicker tone="muted">Meu papel</Kicker>
            <p>{system.role}</p>
          </section>

          <section className="system-modal__block">
            <Kicker tone="muted">Tecnologias</Kicker>
            <TagList tags={system.tech} label={`Tecnologias de ${system.name}`} />
          </section>

          {system.shots.length > 0 && (
            <section className="system-modal__block">
              <Kicker tone="muted">Capturas de tela</Kicker>
              <div className="system-modal__gallery">
                {system.shots.map((shot, i) => (
                  <figure className="system-modal__shot" key={shot.src ?? i}>
                    {shot.src ? (
                      <button
                        type="button"
                        className="system-modal__shot-btn"
                        onClick={() => setZoom(shot)}
                        aria-label={`Ampliar imagem: ${shot.alt}`}
                      >
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="system-modal__zoom-hint" aria-hidden="true">
                          ⤢ Ampliar
                        </span>
                      </button>
                    ) : (
                      <span
                        className="system-modal__shot-placeholder"
                        aria-label={shot.alt}
                        role="img"
                      >
                        <span aria-hidden="true">{'</>'}</span>
                      </span>
                    )}
                    {shot.caption && <figcaption>{shot.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        {zoom?.src && (
          <Lightbox
            src={zoom.src}
            alt={zoom.alt}
            caption={zoom.caption}
            onClose={() => setZoom(null)}
          />
        )}
      </div>
    </div>
  );
}
