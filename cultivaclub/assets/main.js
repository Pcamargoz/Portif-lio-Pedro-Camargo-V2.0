/* =============================================================
   CultivaClub — interactions
   ============================================================= */

(() => {
  'use strict';

  /* -------- Header scroll state -------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 16) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile burger menu -------- */
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* -------- Reveal on scroll -------- */
  const revealSelector = [
    '.section__head',
    '.hero__pill',
    '.hero__title',
    '.hero__sub',
    '.hero__ctas',
    '.hero__proof',
    '.cards-board',
    '.trust',
    '.feature',
    '.step',
    '.video-frame',
    '.demo__meta',
    '.plan',
    '.tech-card',
    '.tech__cta',
    '.faq details',
    '.final-cta__inner',
    '.footer__main'
  ].join(', ');

  const targets = document.querySelectorAll(revealSelector);
  targets.forEach((t, i) => {
    t.classList.add('reveal-up');
    // Subtle stagger when items belong to same group
    const parent = t.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter((c) => c.classList?.contains('reveal-up'));
      const idx = siblings.indexOf(t);
      if (idx >= 0) t.style.transitionDelay = `${Math.min(idx, 6) * 0.06}s`;
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((t) => io.observe(t));

  /* -------- Smooth scroll for anchors -------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* -------- Video overlay → play & hide -------- */
  const videoEl = document.getElementById('demo-video');
  const overlay = document.getElementById('video-overlay');
  if (videoEl && overlay) {
    const hideOverlay = () => overlay.classList.add('is-hidden');
    const showOverlay = () => overlay.classList.remove('is-hidden');

    overlay.addEventListener('click', () => {
      const playPromise = videoEl.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => { /* autoplay blocked is fine */ });
      }
      hideOverlay();
    });

    videoEl.addEventListener('play', hideOverlay);
    videoEl.addEventListener('ended', showOverlay);

    // Pressing space when overlay is focused
    overlay.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        overlay.click();
      }
    });
  }

  /* -------- Subtle parallax on hero cards (desktop) -------- */
  const cardsBoard = document.querySelector('.cards-board');
  if (cardsBoard && window.matchMedia('(pointer: fine)').matches) {
    const cards = cardsBoard.querySelectorAll('.card-mock');
    const onMove = (e) => {
      const rect = cardsBoard.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      cards.forEach((card, i) => {
        const depth = (i + 1) * 6;
        card.style.translate = `${cx * -depth}px ${cy * -depth}px`;
      });
    };
    const onLeave = () => cards.forEach((c) => { c.style.translate = ''; });
    cardsBoard.addEventListener('mousemove', onMove);
    cardsBoard.addEventListener('mouseleave', onLeave);
  }

})();
