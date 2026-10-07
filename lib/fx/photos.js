/* Photo effects (use with lib/components/photo-kit):
   hydrate     — fills <img data-img="key"> from CHUKS.images (src, alt, focus point) and fades each in when it loads
   imgReveal   — [data-img-reveal] frames open with a clip-path wipe while the photo settles from a zoom
   imgParallax — [data-parallax] frames: the photo inside drifts slower than the page
   imgExpand   — .band: a photo window opens to full screen while a sentence appears over it (pinned)
   photoStrip  — .strip: a row of photos slides sideways as the section scrolls past */
Lab.register('hydrate', function (root) {
  Lab.$$('img[data-img]', root).forEach(function (img) {
    var k = Lab.D.images && Lab.D.images[img.getAttribute('data-img')];
    if (!k) return;
    img.src = k.src;
    if (!img.hasAttribute('alt')) img.alt = k.alt;
    if (k.pos) img.style.objectPosition = k.pos;
    img.decoding = 'async';
    if (!img.hasAttribute('data-eager')) img.loading = 'lazy';
    var done = function () { img.classList.add('loaded'); };
    if (img.complete && img.naturalWidth) done(); else { img.addEventListener('load', done); img.addEventListener('error', done); }
  });
});

Lab.register('imgReveal', function () {
  Lab.$$('[data-img-reveal]').forEach(function (el) {
    var img = Lab.$('img', el);
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    if (img) gsap.set(img, { scale: 1.45 });
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () {
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' });
      if (img) gsap.to(img, { scale: 1, duration: 1.9, ease: 'power3.out' });
    } });
  });
});

Lab.register('imgParallax', function () {
  Lab.$$('[data-parallax]').forEach(function (el) {
    var img = Lab.$('img', el); if (!img) return;
    gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .5 } });
  });
});

Lab.register('imgExpand', function () {
  var b = Lab.$('.band'); if (!b) return;
  var words = Lab.split(Lab.$('.band__txt .big'), 'words');
  gsap.set(words, { opacity: 0, yPercent: 50 });
  var tl = gsap.timeline({ scrollTrigger: { trigger: b, start: 'top top', end: '+=170%', pin: '.band__pin', scrub: .6, anticipatePin: 1, onUpdate: function (s) { if (s.progress > .5) Lab.hdr.classList.add('is-dark'); else if (s.isActive) Lab.hdr.classList.remove('is-dark'); } } });
  var mobile = window.innerWidth < 900;
  tl.fromTo('.band__img', { clipPath: mobile ? 'inset(10% 8% 10% 8% round 1.4rem)' : 'inset(18% 26% 18% 26% round 2.2rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 0rem)', ease: 'power2.inOut', duration: 1 }, 0)
    .fromTo('.band__img img', { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1.3 }, 0)
    .to(words, { opacity: 1, yPercent: 0, stagger: .08, duration: .3, ease: 'power2.out' }, .7);
});

Lab.register('photoStrip', function () {
  Lab.$$('.strip').forEach(function (s) {
    var tr = Lab.$('.strip__track', s); if (!tr) return;
    gsap.fromTo(tr, { x: 0 }, { x: function () { return -Math.max(0, tr.scrollWidth - window.innerWidth); }, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: .6, invalidateOnRefresh: true } });
    Lab.$$('.ph img', tr).forEach(function (im, i) { gsap.fromTo(im, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: im.parentElement, containerAnimation: null, start: 'top bottom', end: 'bottom top', scrub: true } }); });
  });
});
