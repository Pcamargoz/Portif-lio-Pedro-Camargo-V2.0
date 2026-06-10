import type { Ref } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import type { StatData } from '../content/types';
import './Stat.css';

/**
 * Métrica animada — porta `.stat` do legado. O número conta até `value` ao
 * entrar na viewport (useCountUp respeita prefers-reduced-motion).
 */
export function Stat({ value, unit, label }: StatData) {
  const { ref, value: current } = useCountUp<HTMLSpanElement>(value);
  return (
    <div className="stat">
      <div className="stat__row">
        <span className="stat__num" ref={ref as Ref<HTMLSpanElement>}>
          {current}
        </span>
        {unit && <span className="stat__unit">{unit}</span>}
      </div>
      <span className="stat__label">{label}</span>
    </div>
  );
}
