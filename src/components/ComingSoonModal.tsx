import { useEffect, useId, useRef } from 'react';
import './ComingSoonModal.css';

interface ComingSoonModalProps {
  onClose: () => void;
}

/**
 * Modal "Em breve" — exibido ao clicar no botão de sistemas práticos enquanto a
 * área dedicada permanece indisponível. Acessível: role="dialog" + aria-modal,
 * fecha com Esc e clique no backdrop, trava o scroll do body e devolve o foco.
 */
export function ComingSoonModal({ onClose }: ComingSoonModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
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
    <div className="coming-soon__backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="coming-soon"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="coming-soon__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <span aria-hidden="true">×</span>
        </button>

        <span className="coming-soon__kicker" aria-hidden="true">
          Sistemas Práticos
        </span>

        <h2 className="coming-soon__title" id={titleId}>
          Em breve
        </h2>

        <p className="coming-soon__text" id={descId}>
          A área dedicada aos sistemas práticos está sendo preparada e estará
          disponível em breve.
        </p>

        <button
          type="button"
          className="btn btn--solid coming-soon__ok"
          onClick={onClose}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
