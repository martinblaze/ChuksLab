/* Effects for the fixed header:
   headerLogo  — scroll progress bar, frosted bar after 60px, logo ring that spins and speeds up with scroll velocity
   headerTheme — flips the header between light/dark text depending on the [data-bg] section under it
   menu        — full-screen menu that opens as a circle from the menu button */
Lab.register('headerLogo', function () {
  var hdr = Lab.hdr, t = Lab.$('.logo__ring .t'), o = { speed: 28 }, rot = 0, dir = 1, tm;
  gsap.set('#prog', { scaleX: 0 });
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) { gsap.set('#prog', { scaleX: s.progress }); hdr.classList.toggle('is-solid', window.scrollY > 60); } });
  gsap.ticker.add(function (time, dt) { rot += o.speed * (Math.min(dt, 100) / 1000); gsap.set(t, { rotation: rot }); });
  if (Lab.lenis) Lab.lenis.on('scroll', function (e) {
    if (e.velocity) dir = e.velocity > 0 ? 1 : -1;
    gsap.to(o, { speed: dir * (28 + Math.abs(e.velocity) * 9), duration: .3, overwrite: true });
    clearTimeout(tm); tm = setTimeout(function () { gsap.to(o, { speed: 28 * dir, duration: 1.2, ease: 'power2.out' }); }, 120);
  });
});

Lab.register('headerTheme', function () {
  function set(dark) { Lab.hdr.classList.toggle('is-dark', dark); }
  Lab.$$('[data-bg]').forEach(function (s) {
    var dark = s.getAttribute('data-bg') === 'dark';
    ScrollTrigger.create({ trigger: s, start: 'top 40px', end: 'bottom 40px', onToggle: function (self) { if (self.isActive) set(dark); } });
  });
});

Lab.register('menu', function () {
  var btnEl = Lab.$('#menuBtn'), menu = Lab.$('#menu'), links = Lab.$$('#menu .m span');
  function open(o) {
    Lab.menuOpen = o; document.body.classList.toggle('menu-open', o); btnEl.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o);
    if (Lab.lenis) o ? Lab.lenis.stop() : Lab.lenis.start();
    if (o) {
      Lab.hdr.classList.add('is-dark'); Lab.hdr.classList.remove('is-hidden');
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(menu, { clipPath: 'circle(0% at calc(100% - 3rem) 2.4rem)' }, { clipPath: 'circle(150% at calc(100% - 3rem) 2.4rem)', duration: 1, ease: 'power3.inOut' });
      gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .07, delay: .35 });
    } else {
      gsap.to(menu, { clipPath: 'circle(0% at calc(100% - 3rem) 2.4rem)', duration: .8, ease: 'power3.inOut', onComplete: function () { gsap.set(menu, { visibility: 'hidden' }); } });
      ScrollTrigger.refresh();
    }
  }
  btnEl.addEventListener('click', function () { open(!Lab.menuOpen); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && Lab.menuOpen) open(false); });
});
