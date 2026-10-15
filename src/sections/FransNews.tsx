import { useEffect, useRef } from 'react';
import './FransNews.css';

// Mídia do destaque ControlFree: troque só estas constantes quando a nova capa chegar.
const MEDIA_SRC = '/media/capa_novidades_frans_v6.mp4';
const MEDIA_POSTER = '/media/capa_novidades_frans_v6_poster.jpg';
const MEDIA_ALT = 'Capa Novidades Frans: ControlFree em destaque e os apps Frans';

const URL_DOWNLOADS = 'https://pcamargoz.github.io/frans-releases/';

export function FransNews() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      v.removeAttribute('autoplay');
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section className="frans-news" id="novidades-frans" aria-labelledby="frans-news-titulo">
      <div className="frans-news__inner">
        <div className="frans-news__text">
          <h2 className="frans-news__title" id="frans-news-titulo">Novidades Frans</h2>
          <p className="frans-news__body">
            Dois apps grátis pra baixar: o Frans Orquestrador, que roda vários agentes de IA em
            paralelo, cada um no seu terminal, e o Frans Editor, um editor de vídeo leve pra
            desktop. Os dois rodam direto na sua máquina, sem servidor.
          </p>
          <a className="frans-news__btn" href={URL_DOWNLOADS} target="_blank" rel="noopener">
            Baixar
          </a>
        </div>
        <article className="frans-news__hero" aria-labelledby="cf-titulo">
          <div className="frans-news__hero-text">
            <h3 id="cf-titulo" className="frans-news__hero-title">ControlFree</h3>
            <p className="frans-news__hero-line">Controle de horas e cobrança em um clique</p>
          </div>
          <div className="frans-news__media">
            <video
              ref={ref}
              src={MEDIA_SRC}
              poster={MEDIA_POSTER}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label={MEDIA_ALT}
            />
          </div>
        </article>
        <ul className="frans-news__cards">
          <li className="frans-news__card">
            <strong>Frans Orquestrador</strong>
            <span className="frans-news__label">Grátis no GitHub</span>
          </li>
          <li className="frans-news__card">
            <strong>Frans Editor</strong>
            <span className="frans-news__label">Grátis no GitHub</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
