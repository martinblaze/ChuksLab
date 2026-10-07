/* Component: inner-hero — the sky-and-clouds header used on inner pages.
   innerHero — title characters rise from a mask, supporting text fades in
   innerClouds — clouds drift apart as you scroll past the header */
Lab.register('innerHero', function () {
  var d = Lab.$('.phero .display'); if (!d) return;
  var cs = Lab.split(d, 'chars');
  Lab.$$('.char', d).forEach(function (c) { c.style.opacity = 1; });
  d.style.overflow = 'hidden'; d.style.paddingBottom = '.18em'; d.style.marginBottom = '-.18em';
  gsap.set(cs, { yPercent: 115 });
  gsap.set('.phero__in [data-in]', { y: 20 });
  gsap.timeline().to(cs, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: .035 }, .1)
    .to('.phero__in [data-in]', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .12 }, .5);
});

Lab.register('innerClouds', function () {
  if (!Lab.$('.phero .cl')) return;
  gsap.to('.phero .cl .cloud', { x: function (i, el) { return (+el.getAttribute('data-side')) * 18 + 'vw'; }, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true } });
});
