import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_TITLE = 'Pedro César Camargo — Backend Developer · Java · Spring Boot';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Página não encontrada — Pedro César Camargo';
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, []);

  return (
    <section
      style={{
        padding: 'calc(var(--rhythm) + 60px) var(--pad-x) var(--rhythm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start',
      }}
    >
      <h1 className="bigtext">404 — Página não encontrada</h1>
      <Link to="/" className="inline-link" style={{ marginLeft: 0 }}>
        ← Voltar para a home
      </Link>
    </section>
  );
}
