/* Effects for entering and leaving a page:
   preloader — test tube fills with liquid while a counter runs to 100, then a circular iris closes onto the page. done() runs when it ends.
   wipeIn    — on arrival after a link click, the curtain that covered the screen wipes upward
   pageLinks — clicking an internal link covers the screen with the curtain (showing the page name), then navigates */
Lab.register('preloader', function (done) {
  var pre = Lab.$('#pre');
  if (!pre) { document.body.classList.remove('is-loading'); if (Lab.lenis) Lab.lenis.start(); done(); return; }
  var num = Lab.$('#preNum'), liquid = Lab.$('.pre__liquid', pre), o = { v: 0 };
  gsap.timeline({ onComplete: done })
    .to(o, { v: 100, duration: 2.6, ease: 'power2.inOut', onUpdate: function () { num.textContent = Math.round(o.v); } }, 0)
    .fromTo(liquid, { attr: { y: 156 } }, { attr: { y: 6 }, duration: 2.6, ease: 'power2.inOut' }, 0)
    .to('.pre__in', { scale: .92, opacity: 0, duration: .6, ease: 'power3.in' }, '+=.2')
    .to(pre, { clipPath: 'circle(0% at 50% 60%)', duration: 1.4, ease: 'power4.inOut' }, '-=.25')
    .set(pre, { display: 'none' })
    .add(function () { document.body.classList.remove('is-loading'); if (Lab.lenis) Lab.lenis.start(); }, '-=1.1');
});

Lab.register('wipeIn', function () {
  var cu = Lab.$('#curtain');
  gsap.set(cu, { clipPath: 'inset(0% 0 0 0)' });
  gsap.to(cu, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.inOut', delay: .1, onComplete: function () { Lab.html.classList.remove('wipe'); gsap.set(cu, { clipPath: 'inset(100% 0 0 0)' }); } });
});

Lab.register('pageLinks', function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    var h = a.getAttribute('href');
    if (!h || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || /^(mailto|tel|https?:|#)/.test(h)) return;
    if (a.pathname === location.pathname && !a.search) return;
    e.preventDefault();
    var cu = Lab.$('#curtain'), lab = (Lab.D.nav.filter(function (n) { return h.indexOf(n.href) === 0; })[0] || {}).label || '';
    Lab.$('span', cu).textContent = lab;
    gsap.timeline({ onComplete: function () { Lab.store.set('chuksWipe', '1'); location.href = h; } })
      .to(cu, { clipPath: 'inset(0% 0 0 0)', duration: .8, ease: 'power3.inOut' }, 0)
      .to(Lab.$('span', cu), { opacity: 1, duration: .4 }, .45);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) { Lab.html.classList.remove('wipe'); gsap.set('#curtain', { clipPath: 'inset(100% 0 0 0)' }); } });
});
