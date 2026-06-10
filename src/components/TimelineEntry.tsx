import type { TimelineEntryData } from '../content/types';
import './TimelineEntry.css';

interface TimelineEntryProps {
  entry: TimelineEntryData;
}

/**
 * Entrada de linha do tempo — porta `.entry` do legado (tempo com → + corpo).
 */
export function TimelineEntry({ entry }: TimelineEntryProps) {
  const { period, title, org, description } = entry;
  return (
    <article className="entry">
      <div className="entry__time">
        <span>{period.start}</span>
        {period.end && (
          <>
            <span className="entry__sep" aria-hidden="true">
              →
            </span>
            <span>{period.end}</span>
          </>
        )}
      </div>
      <div className="entry__body">
        <h4>{title}</h4>
        <p className="entry__org">{org}</p>
        {description && <p>{description}</p>}
      </div>
    </article>
  );
}
