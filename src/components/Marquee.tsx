import { Fragment } from 'react';
import './Marquee.css';

interface MarqueeProps {
  items: string[];
}

/**
 * Faixa horizontal animada — porta `.marquee` do legado. Os itens são duplicados
 * para criar o loop contínuo (translateX -50%). Puramente decorativo:
 * aria-hidden e animação pausada sob prefers-reduced-motion (CSS).
 */
export function Marquee({ items }: MarqueeProps) {
  const sequence = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {sequence.map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <span className="dotmark">●</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
