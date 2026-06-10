import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

interface NavItem {
  num: string;
  label: string;
  hash: string;
}

const NAV_ITEMS: NavItem[] = [
  { num: '01', label: 'Projetos', hash: '#projetos' },
  { num: '02', label: 'Sobre', hash: '#sobre' },
  { num: '03', label: 'Atuação', hash: '#atuacao' },
  { num: '04', label: 'Certs', hash: '#certificacoes' },
  { num: '05', label: 'Stack', hash: '#stack' },
  { num: '06', label: 'Trajetória', hash: '#trajetoria' },
  { num: '07', label: 'Contato', hash: '#contato' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Estado "scrolled" da nav — portado de legacy/assets/main.js (limiar 24px).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu mobile com Escape e devolve foco ao botão.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <Link to="/" className="nav__mark" aria-label="Início">
        <span className="nav__mark-glyph">
          <span className="nav__mark-initial" aria-hidden="true">P</span>
          {!photoFailed && (
            <img
              className="nav__mark-photo"
              src="/pedro.jpg"
              alt="Pedro César"
              decoding="async"
              onError={() => setPhotoFailed(true)}
            />
          )}
        </span>
        <span className="nav__mark-text">
          pedro&nbsp;<em>césar</em>
        </span>
      </Link>

      <nav className="nav__links" aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => (
          <Link key={item.hash} to={`/${item.hash}`}>
            <span>{item.num}</span> {item.label}
          </Link>
        ))}
      </nav>

      <Link className="nav__cta" to="/#contato">
        <span className="dot" aria-hidden="true" />
        <span>Disponível para projetos</span>
      </Link>

      <button
        ref={toggleRef}
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav__toggle-bar" aria-hidden="true" />
        <span className="nav__toggle-bar" aria-hidden="true" />
        <span className="nav__toggle-bar" aria-hidden="true" />
      </button>

      <div
        id="menu-mobile"
        className={`nav__mobile${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <nav className="nav__mobile-links" aria-label="Navegação principal (mobile)">
          {NAV_ITEMS.map((item) => (
            <Link key={item.hash} to={`/${item.hash}`} onClick={closeMenu}>
              <span>{item.num}</span> {item.label}
            </Link>
          ))}
          <Link className="nav__mobile-cta" to="/#contato" onClick={closeMenu}>
            <span className="dot" aria-hidden="true" />
            Disponível para projetos
          </Link>
        </nav>
      </div>
    </header>
  );
}
