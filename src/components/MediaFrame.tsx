import type { ProjectMedia } from '../content/types';
import './MediaFrame.css';

interface MediaFrameProps {
  media: ProjectMedia;
}

/**
 * Moldura de mídia de projeto — porta `.project__media` do legado.
 * Suporta três tipos: vídeo do YouTube (iframe lazy), imagem (img lazy) e
 * placeholder reservado para vídeo futuro.
 */
export function MediaFrame({ media }: MediaFrameProps) {
  return (
    <figure className="project__media">
      <div
        className={
          media.type === 'youtube'
            ? 'project__media-frame project__media-frame--video'
            : 'project__media-frame'
        }
      >
        {media.type === 'youtube' && media.src && (
          <iframe
            src={media.src}
            title={media.alt ?? media.caption}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {media.type === 'image' && media.src && (
          <img src={media.src} alt={media.alt ?? ''} loading="lazy" />
        )}

        {media.type === 'placeholder' && (
          <div className="media-placeholder">
            <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true">
              <path
                d="M5 4l14 8-14 8V4z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            <span>Vídeo de demonstração — em breve aqui</span>
            <code>youtube · não listado</code>
          </div>
        )}
      </div>
      <figcaption className="project__caption">
        <span>{media.caption}</span>
      </figcaption>
    </figure>
  );
}
