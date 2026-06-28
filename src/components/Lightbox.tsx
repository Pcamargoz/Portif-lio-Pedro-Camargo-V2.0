import { useEffect, useRef } from 'react';
import './Lightbox.css';

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

/**
 * Visualizador de imagem em tela cheia. Abre sobre qualquer conteúdo (inclusive
 * sobre o SystemModal) com z-index maior. Fecha com clique no fundo, no botão ×
 * ou Esc. O Esc é capturado na fase de captura com stopImmediatePropagation para
 * não disparar também o handler de Esc de um modal por baixo.
 */
export function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Fechar imagem"
      >
        <span aria-hidden="true">×</span>
      </button>

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img className="lightbox__img" src={src} alt={alt} decoding="async" />
        {caption && <figcaption className="lightbox__caption">{caption}</figcaption>}
      </figure>
    </div>
  );
}
