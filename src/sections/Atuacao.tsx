import { atuacaoIntro, atuacaoCards } from '../content/atuacao';
import type { AtuacaoCard } from '../content/types';
import { SectionHeading } from '../components/SectionHeading';
import { Kicker } from '../components/Kicker';
import './Atuacao.css';

function Card({ card }: { card: AtuacaoCard }) {
  const cls = [
    'atuacao__card',
    card.primary ? 'atuacao__card--primary' : '',
    card.wide ? 'atuacao__card--wide' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (card.wide) {
    return (
      <article className={cls}>
        <div className="atuacao__card-l">
          <div className="atuacao__num" aria-hidden="true">
            {card.num}
          </div>
          {card.kicker && (
            <Kicker tone={card.primary ? 'accent' : 'muted'}>{card.kicker}</Kicker>
          )}
          <h3>{card.title}</h3>
        </div>
        <div className="atuacao__card-r">
          {card.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {card.tags && card.tags.length > 0 && (
            <ul className="atuacao__tags">
              {card.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className={cls}>
      <div className="atuacao__num" aria-hidden="true">
        {card.num}
      </div>
      <h3>{card.title}</h3>
      {card.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </article>
  );
}

/**
 * Atuação atual — intro centralizada + grid dos 4 cards (com variantes
 * primary/wide), portado de .atuacao do legado.
 */
export function Atuacao() {
  return (
    <section className="section atuacao" id="atuacao">
      <SectionHeading number="/ 03" title="Atuação atual" id="atuacao-titulo" />

      <div className="atuacao__intro">
        <p>
          <Kicker>{atuacaoIntro.kicker}</Kicker>
          {atuacaoIntro.paragraph}
        </p>
      </div>

      <div className="atuacao__grid">
        {atuacaoCards.map((card) => (
          <Card key={card.num} card={card} />
        ))}
      </div>
    </section>
  );
}
