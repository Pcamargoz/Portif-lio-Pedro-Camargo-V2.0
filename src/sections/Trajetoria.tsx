import { Link } from 'react-router-dom';
import { experience, education } from '../content/timeline';
import { SectionHeading } from '../components/SectionHeading';
import { TimelineEntry } from '../components/TimelineEntry';
import { Kicker } from '../components/Kicker';
import './Trajetoria.css';

/**
 * Trajetória — duas colunas (Experiência / Formação & certificações),
 * portado de .trajetoria do legado.
 */
export function Trajetoria() {
  return (
    <section className="section trajetoria" id="trajetoria">
      <SectionHeading number="/ 06" title="Trajetória" id="trajetoria-titulo" />

      <div className="traj__cols">
        <div className="traj__col">
          <h3 className="traj__col-title">Experiência</h3>
          {experience.map((entry) => (
            <TimelineEntry key={entry.title} entry={entry} />
          ))}
        </div>

        <div className="traj__col">
          <h3 className="traj__col-title">Formação &amp; certificações</h3>
          {education.map((entry) => (
            <TimelineEntry key={entry.title} entry={entry} />
          ))}

          <div className="traj__see-certs">
            <Kicker tone="muted">Certificações</Kicker>
            <p>
              Mais de 100 certificações conquistadas em tecnologia.
              <Link to="/#certificacoes" className="inline-link">
                Ver as principais ↗
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
