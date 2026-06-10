import './SectionHeading.css';

interface SectionHeadingProps {
  number: string;
  title: string;
  id?: string;
}

/**
 * Cabeçalho padrão de seção — porta `.section__head` (número + h2 título + régua)
 * do legado. O `id` opcional é aplicado ao <h2> para servir de alvo de aria.
 */
export function SectionHeading({ number, title, id }: SectionHeadingProps) {
  return (
    <div className="section__head">
      <span className="section__num">{number}</span>
      <h2 className="section__title" id={id}>
        {title}
      </h2>
      <span className="section__rule" aria-hidden="true" />
    </div>
  );
}
