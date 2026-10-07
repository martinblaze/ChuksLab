/* Scroll-driven section components (each is independent; run only the ones your page has).
   hscroll      — vertical scroll becomes horizontal travel through cards; art inside each card drifts; progress bar + counter
   expandGrid   — four windows open into one full-screen grid
   stackSteps   — sticky cards stack up, the ones underneath shrink and dim
   giantLines   — oversized heading lines slide against each other (+ faint clouds) as the section passes
   ctaWords     — big sentence reveals word by word
   footerClip   — footer starts as an inset rounded panel and grows to full width */

Lab.register('hscroll', function () {
  if (!Lab.$('.svc')) return;
  gsap.matchMedia().add('(min-width: 57em)', function () {
    var track = Lab.$('.svc__track'), pin = Lab.$('.svc__pin'), bar = Lab.$('.svc__bar i'), cnt = Lab.$('.svc__count'), n = Lab.D.services.length;
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
    var tw = gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: '.svc', start: 'top top', end: function () { return '+=' + dist(); }, pin: pin, scrub: .5, invalidateOnRefresh: true, onUpdate: function (s) { gsap.set(bar, { scaleX: s.progress }); if (cnt) cnt.textContent = Lab.pad2(Math.min(n, Math.floor(s.progress * n) + 1)) + ' / ' + Lab.pad2(n); } } });
    Lab.$$('.card__art').forEach(function (a) {
      gsap.fromTo(a, { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { trigger: a.parentElement, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
    });
    gsap.fromTo('.svc__intro .h2', { xPercent: 0 }, { xPercent: -14, ease: 'none', scrollTrigger: { trigger: '.svc', start: 'top top', end: function () { return '+=' + dist(); }, scrub: true } });
  });
});

Lab.register('expandGrid', function () {
  if (!Lab.$('.pr')) return;
  gsap.matchMedia().add('(min-width: 57em)', function () {
    var t = gsap.timeline({ scrollTrigger: { trigger: '.pr', start: 'top top', end: '+=130%', pin: '.pr__pin', scrub: .6, anticipatePin: 1, onUpdate: function (s) { if (s.progress > .55) Lab.hdr.classList.add('is-dark'); else if (s.isActive) Lab.hdr.classList.remove('is-dark'); } } });
    t.to('.pr__grid', { width: '100vw', height: '100vh', marginBottom: 0, gap: 0, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.pc', { borderRadius: 0, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.pr__head', { opacity: 0, y: -40, duration: .5 }, 0)
      .from('.pc h3', { scale: .85, transformOrigin: 'left bottom', duration: 1 }, 0);
  });
});

Lab.register('stackSteps', function () {
  var steps = Lab.$$('.step');
  steps.forEach(function (s, i) {
    if (i === steps.length - 1) return;
    gsap.to(s, { scale: .9, filter: 'brightness(.86)', ease: 'none', scrollTrigger: { trigger: steps[i + 1], start: 'top 90%', end: 'top 22%', scrub: true } });
  });
});

Lab.register('giantLines', function () {
  if (!Lab.$('.loc')) return;
  Lab.$$('.loc__giant span').forEach(function (s, i) {
    gsap.fromTo(s, { xPercent: i % 2 ? 14 : -14 }, { xPercent: i % 2 ? -8 : 8, ease: 'none', scrollTrigger: { trigger: '.loc', start: 'top bottom', end: 'bottom top', scrub: .6 } });
  });
  if (Lab.$('.loc .cl')) gsap.to('.loc .cloud', { xPercent: function (i) { return (i % 2 ? 1 : -1) * 40; }, ease: 'none', scrollTrigger: { trigger: '.loc', start: 'top bottom', end: 'bottom top', scrub: true } });
});

Lab.register('ctaWords', function () {
  var ct = Lab.$('.cta .big'); if (!ct) return;
  var ws = Lab.split(ct, 'words');
  gsap.set(ws, { yPercent: 40, opacity: 0 });
  ScrollTrigger.create({ trigger: ct, start: 'top 80%', once: true, onEnter: function () { gsap.to(ws, { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: .07 }); } });
});

Lab.register('footerClip', function () {
  var f = Lab.$('.ftr'); if (!f) return;
  gsap.fromTo(f, { clipPath: 'inset(14% 7% 0% 7% round 2.5rem 2.5rem 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 0rem 0rem 0 0)', ease: 'none', scrollTrigger: { trigger: '.ftr-w', start: 'top bottom', end: 'top 35%', scrub: true } });
});
