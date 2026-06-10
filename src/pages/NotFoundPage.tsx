import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section style={{ padding: 'var(--rhythm) var(--pad-x)' }}>
      <h1>404 — Página não encontrada</h1>
      <Link to="/">← Voltar para a home</Link>
    </section>
  );
}
