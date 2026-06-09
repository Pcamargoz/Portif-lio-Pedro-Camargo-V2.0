import './TagList.css';

interface TagListProps {
  tags: string[];
  label?: string;
}

/**
 * Lista de tags em pílulas mono — base reutilizada por stack (.taglist),
 * tech de projeto e techs do card de vitrine. Retorna null quando vazia.
 */
export function TagList({ tags, label }: TagListProps) {
  if (tags.length === 0) return null;
  return (
    <ul className="taglist" {...(label ? { 'aria-label': label } : {})}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
