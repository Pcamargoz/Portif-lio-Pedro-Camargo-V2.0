import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__row">
        <span className="kicker kicker--muted">© 2026 — Pedro César Camargo dos Santos</span>
        <span className="kicker kicker--muted">Sorocaba · SP · BR</span>
        <span className="kicker kicker--muted">
          Construído com obsessão por detalhes
          <span className="blink">▍</span>
        </span>
      </div>
      <div className="foot__big" aria-hidden="true">PEDRO&nbsp;CÉSAR</div>
    </footer>
  );
}
