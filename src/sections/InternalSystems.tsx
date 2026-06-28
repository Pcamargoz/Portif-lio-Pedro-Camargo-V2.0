import { useState } from 'react';
import { systems } from '../content/systems';
import { SectionHeading } from '../components/SectionHeading';
import { SystemCard } from '../components/SystemCard';
import { SystemModal } from '../components/SystemModal';
import './InternalSystems.css';

/**
 * Vitrine de sistemas internos — segunda seção da home (/ 02).
 * Cards independentes que abrem um modal de detalhes (demonstração controlada).
 * Conteúdo anonimizado por sigilo corporativo.
 */
export function InternalSystems() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openSystem = systems.find((s) => s.slug === openSlug) ?? null;

  return (
    <section className="section sistemas" id="sistemas">
      <SectionHeading number="/ 02" title="Sistemas internos" id="sistemas-titulo" />

      <p className="sistemas__intro">
        Ferramentas que projetei e desenvolvi para uso interno corporativo —
        identificando gargalos no fluxo da equipe e transformando-os em soluções
        que otimizam o trabalho do dia a dia.
      </p>

      <p className="sistemas__confidential" role="note">
        <span className="sistemas__lock" aria-hidden="true">🔒</span>
        Sistemas corporativos de uso interno. Por confidencialidade, exibo apenas
        uma amostra visual e técnica autorizada — sem expor regras de negócio,
        dados, clientes ou funcionalidades completas.
      </p>

      <div className="systems-grid">
        {systems.map((system, index) => (
          <SystemCard
            key={system.slug}
            system={system}
            index={index}
            onOpen={() => setOpenSlug(system.slug)}
          />
        ))}
      </div>

      {openSystem && (
        <SystemModal system={openSystem} onClose={() => setOpenSlug(null)} />
      )}
    </section>
  );
}
