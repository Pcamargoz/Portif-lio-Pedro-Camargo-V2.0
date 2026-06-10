import { Link } from 'react-router-dom';
import type { Project } from '../content/types';
import { Kicker } from './Kicker';
import { TagList } from './TagList';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Card da vitrine de projetos na home (design novo, coerente com a estética do
 * legado). O card inteiro é um link para a página rica do projeto.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, '0');
  const techs = project.tech.slice(0, 5);

  return (
    <Link
      to={`/projetos/${project.slug}`}
      className="project-card"
      aria-label={`Ver projeto ${project.title}`}
    >
      <div className="project-card__top">
        <span className="project-card__num" aria-hidden="true">
          {number}
        </span>
        <Kicker tone="accent">{project.status}</Kicker>
      </div>

      <h3 className="project-card__title">{project.title}</h3>

      <p className="project-card__summary">{project.summary}</p>

      <div className="project-card__cats">
        {project.categories.map((cat) => (
          <Kicker key={cat} tone="muted">
            {cat}
          </Kicker>
        ))}
      </div>

      <TagList tags={techs} label={`Tecnologias de ${project.title}`} />

      <span className="project-card__cta" aria-hidden="true">
        Ver projeto →
      </span>
    </Link>
  );
}
