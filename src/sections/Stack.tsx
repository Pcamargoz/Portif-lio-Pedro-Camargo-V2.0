import { stackIntro, stackAreas } from '../content/stack';
import { SectionHeading } from '../components/SectionHeading';
import { TagList } from '../components/TagList';
import './Stack.css';

/**
 * Stack técnica — grid das 7 áreas (article.capa), portado de .stack do legado.
 */
export function Stack() {
  return (
    <section className="section stack" id="stack">
      <SectionHeading number="/ 06" title="Stack técnica" id="stack-titulo" />

      <p className="stack__intro">{stackIntro}</p>

      <div className="stack__grid">
        {stackAreas.map((area) => (
          <article className={`capa${area.wide ? ' capa--wide' : ''}`} key={area.index}>
            <header>
              <span className="capa__idx" aria-hidden="true">
                {area.index}
              </span>
              <h3>{area.title}</h3>
            </header>
            <p>{area.description}</p>
            <TagList tags={area.tags} label={`Tecnologias de ${area.title}`} />
          </article>
        ))}
      </div>
    </section>
  );
}
