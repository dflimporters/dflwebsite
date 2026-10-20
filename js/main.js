/* DFL Importers - shared behaviour. Plain JS; GSAP, ScrollTrigger and Lenis load from CDN. */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Header: solid after scrolling; mobile menu
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-btn');
  function onScroll() { if (header && !header.classList.contains('solid')) header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (btn) {
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) { btn.click(); btn.focus(); }
    });
  }

  // Count-up helper (works without GSAP)
  function countUp(el) {
    var end = parseFloat(el.dataset.count), t0 = null, dur = 1800;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    // Motion off or CDN blocked: make sure everything is visible and numbers are final
    doc.classList.remove('js');
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = parseFloat(el.dataset.count).toLocaleString(); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scroll
  if (window.Lenis) {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -70 }); }
      });
    });
  }

  // Hero intro + parallax
  var hero = document.querySelector('.hero');
  if (hero) {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-media img', { scale: 1.18, duration: 2, ease: 'power2.out' }, 0)
      .from('.hero .eyebrow', { y: 24, opacity: 0, duration: .8 }, .2)
      .from('.hero h1 .line', { yPercent: 110, opacity: 0, duration: 1, stagger: .12 }, .3)
      .from('.hero .lead', { y: 24, opacity: 0, duration: .8 }, .8)
      .from('.hero-cta > *', { y: 24, opacity: 0, duration: .7, stagger: .1 }, .95)
      .from('.hero-badge', { scale: .6, opacity: 0, rotate: -25, duration: 1, ease: 'back.out(1.6)' }, 1.1);
    gsap.to('.hero-media', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero .wrap', { yPercent: -10, opacity: .2, ease: 'none', scrollTrigger: { trigger: hero, start: '60% top', end: 'bottom top', scrub: true } });
  }

  // Parallax images inside frames
  gsap.utils.toArray('[data-parallax]').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Reveals
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, overwrite: true }); }
  });
  gsap.utils.toArray('[data-stagger]').forEach(function (group) {
    gsap.to(group.children, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .09,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
  });

  // Counters
  document.querySelectorAll('[data-count]').forEach(function (el) {
    el.textContent = '0';
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { countUp(el); } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
