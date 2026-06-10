import { projects } from '../content/projects';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import './ProjectsShowcase.css';

/**
 * Vitrine de projetos em evidência — primeira seção após o hero.
 * Grid de ProjectCard (1 col mobile, 2 cols ≥900px).
 */
export function ProjectsShowcase() {
  return (
    <section className="section projetos" id="projetos">
      <SectionHeading number="/ 01" title="Projetos selecionados" id="projetos-titulo" />

      <p className="projetos__intro">
        Peças que representam meu trabalho técnico. Cada uma com página dedicada
        para descrição, mídia, arquitetura e links.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
