/* =============================================================
   Pedro César Camargo — Portfolio script
   ============================================================= */

(() => {
  'use strict';

  /* -------- Nav scrolled state -------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Custom cursor (desktop only) -------- */
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (!isCoarse) {
    const cursor = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor-dot');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    const tick = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    const hoverSel = 'a, button, [data-hover], .project__media-frame, .project__thumb, .contact-card';
    document.querySelectorAll(hoverSel).forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* -------- Intersection reveal -------- */
  const targets = document.querySelectorAll(
    '.section__title, .bigtext, .sobre__body, .sobre__facts, .stats, ' +
    '.capa, .entry, .certs, .project, .contato__bigtext, .contact-card, ' +
    '.projetos__intro, .stack__intro, .atuacao__intro, .atuacao__card, ' +
    '.contact-card--featured, .certs-feature__intro, .cert-card, ' +
    '.cert-extra, .traj__see-certs, .arch, .wip-banner, ' +
    '.project__desc-lead, .project__desc-body, .project__insight, ' +
    // Projeto 02 (NEO): cada bloco revela quando entra na viewport
    '.project--neo .project__index, .project--neo .project__meta, ' +
    '.project--neo .project__title, .project--neo .project__media, ' +
    '.project--neo .project__tech, .project--neo .neo-demo, ' +
    '.project--neo .project__links'
  );
  targets.forEach((t, i) => {
    t.classList.add('in-view-target');
    t.style.transitionDelay = `${(i % 5) * 0.06}s`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  targets.forEach((t) => io.observe(t));

  /* -------- Animated counters -------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);

      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(end * ease(p));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = end;
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterIO.observe(c));

  /* -------- Smooth scroll for nav anchors -------- */
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

  /* -------- Subtle parallax on hero meta -------- */
  const hero = document.querySelector('.hero');
  if (hero && !isCoarse) {
    const heroTitle = hero.querySelector('.hero__title');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroTitle.style.transform = `translateY(${y * 0.12}px)`;
      }
    }, { passive: true });
  }

  /* -------- Keyboard navigation accent -------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.body.classList.add('kb-nav');
  });
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('kb-nav');
  });
})();
