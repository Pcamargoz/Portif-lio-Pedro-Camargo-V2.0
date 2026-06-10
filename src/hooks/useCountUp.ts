import { useEffect, useRef, useState } from 'react';

export function useCountUp<T extends HTMLElement>(
  target: number,
): { ref: React.RefObject<T | null>; value: number } {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setValue(target);
      return;
    }

    let rafId: number | null = null;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            obs.disconnect();
            const duration = 1200;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * target));
              if (t < 1) {
                rafId = requestAnimationFrame(tick);
              }
            };

            rafId = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.15 },
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [target]);

  return { ref, value };
}
