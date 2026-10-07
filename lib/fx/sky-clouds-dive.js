/* Component: sky-clouds-dive
   A pinned hero: procedural clouds drift on their own; as you scroll they part left and right, the camera pushes in,
   and a dark circle opens from the bottom of the screen carrying a statement that lights up word by word.
   Markup: lib/components/sky-clouds-dive/markup.html   Needs: lib/generators/clouds.js
   Effects: clouds(selector, layer) · heroPrep() · heroIn() · dive() */

/* mount a cloud layer into a container and let each cloud drift sideways forever */
Lab.register('clouds', function (sel, layer) {
  var el = Lab.$(sel); if (!el || !window.Clouds) return;
  window.Clouds.fill(el, layer);
  Lab.$$('.cloud', el).forEach(function (c, i) {
    gsap.to(c, { xPercent: (i % 2 ? 1 : -1) * (6 + (i * 7) % 11), duration: 11 + (i * 3) % 9, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  });
});

var heroChars = [];
/* split the hero title into characters (hidden below their line) and park the other hero items */
Lab.register('heroPrep', function () {
  var t = Lab.$('.hero__title'); if (!t) return;
  Lab.$$('.line', t).forEach(function (l) { heroChars = heroChars.concat(Lab.split(l, 'chars')); });
  gsap.set(heroChars, { yPercent: 118, opacity: 1 });
  gsap.set('.hero [data-in]', { y: 24 });
  Lab.$$('.lab .big').forEach(function (e) { Lab.split(e, 'words'); });
});

/* play the hero entrance (call after the preloader / page wipe) */
Lab.register('heroIn', function () {
  if (!heroChars.length) return;
  gsap.timeline()
    .to(heroChars, { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: .03 }, 0)
    .to('.hero [data-in]', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: .12 }, .6)
    .fromTo('.hero__meta', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
});

/* the scroll timeline */
Lab.register('dive', function () {
  if (!Lab.$('#dive')) return;
  var hdr = Lab.hdr;
  var tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#dive', start: 'top top', end: '+=340%', pin: '.dive__pin', scrub: .6, anticipatePin: 1, onUpdate: function (s) { hdr.classList.toggle('is-dark', s.progress > .55); } } });
  [['back', 40], ['mid', 78], ['front', 118]].forEach(function (cfg, idx) {
    Lab.$$('.cl--' + cfg[0] + ' .cloud', Lab.$('#dive')).forEach(function (c) {
      tl.to(c, { x: (+c.getAttribute('data-side') * cfg[1]) + 'vw', y: idx === 2 ? '22vh' : '-5vh', scale: 1.25 + idx * .35, ease: 'power1.in', duration: 1.3 }, 0);
    });
  });
  tl.to('.hero', { scale: 1.22, opacity: 0, y: '-7vh', duration: .7, ease: 'power2.in' }, 0)
    .to('.sky', { scale: 1.25, duration: 1.5 }, 0)
    .to('.hero__meta', { opacity: 0, duration: .25 }, 0)
    .to('.lab', { clipPath: 'circle(150% at 50% 100%)', duration: 1, ease: 'power2.inOut' }, .55)
    .to('.lab .word', { opacity: 1, stagger: .09, duration: .25, ease: 'power1.out' }, 1.1)
    .fromTo('.lab__bg img', { scale: 1.35 }, { scale: 1, duration: 1.5 }, .55)
    .to('.badge', { rotation: 90, duration: 1.4 }, .8);
});
