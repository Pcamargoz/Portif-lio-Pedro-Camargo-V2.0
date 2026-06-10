import { profile } from '../content/profile';
import { Button } from '../components/Button';
import './Hero.css';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M1 7h12M8 2l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="square"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Hero da home — porta a seção hero do legado. Contém o único <h1> da página.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__meta hero__meta--tl">
        <span className="kicker">PORTFOLIO / MMXXVI</span>
        <span className="kicker kicker--muted">SOROCABA · SP · BR</span>
      </div>

      <div className="hero__meta hero__meta--tr">
        <span className="kicker">N° 01</span>
      </div>

      <div className="hero__title">
        <h1 className="display">
          <span className="word reveal" style={{ '--d': '.05s' } as React.CSSProperties}>
            Pedro
          </span>{' '}
          <span className="word reveal" style={{ '--d': '.15s' } as React.CSSProperties}>
            <em>César</em>
          </span>{' '}
          <span className="word reveal" style={{ '--d': '.25s' } as React.CSSProperties}>
            Camargo
          </span>{' '}
          <span
            className="word word--tail reveal"
            style={{ '--d': '.35s' } as React.CSSProperties}
          >
            dos&nbsp;Santos
          </span>
        </h1>
      </div>

      <div className="hero__role reveal" style={{ '--d': '.55s' } as React.CSSProperties}>
        <span className="role-line" aria-hidden="true" />
        <p>{profile.role}</p>
      </div>

      <div className="hero__lede reveal" style={{ '--d': '.7s' } as React.CSSProperties}>
        <p>{profile.lede}</p>
        <div className="hero__cta">
          <Button to="/#projetos" variant="solid" icon={<ArrowIcon />}>
            Ver projetos
          </Button>
          <Button href={profile.linkedin} variant="ghost" icon={<LinkedInIcon />}>
            Conectar no LinkedIn
          </Button>
        </div>
      </div>

      <aside className="hero__aside reveal" style={{ '--d': '.85s' } as React.CSSProperties}>
        {profile.asideRows.map((row) => (
          <div className="hero__aside-row" key={row.key}>
            <span className="kicker kicker--muted">{row.key}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </aside>
    </section>
  );
}
