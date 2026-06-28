import { profile, stats } from '../content/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Stat } from '../components/Stat';
import './About.css';

/**
 * Seção Sobre — porta sobre__grid (lead bigtext, corpo + assinatura, facts)
 * e o strip de estatísticas (componente Stat).
 */
export function About() {
  return (
    <section className="section sobre" id="sobre">
      <SectionHeading number="/ 03" title="Sobre" id="sobre-titulo" />

      <div className="sobre__grid">
        <div className="sobre__lead">
          <p className="bigtext">{profile.aboutLead}</p>
        </div>

        <div className="sobre__body">
          {profile.aboutParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p className="sobre__signature">
            <span className="kicker kicker--muted">— assinatura</span>
            <span className="sig">Pedro&nbsp;C.</span>
          </p>
        </div>

        <aside className="sobre__facts">
          {profile.facts.map((fact) => (
            <div className="fact" key={fact.key}>
              <span className="fact__k">{fact.key}</span>
              <span className="fact__v">{fact.value}</span>
            </div>
          ))}
        </aside>
      </div>

      <div className="stats">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
