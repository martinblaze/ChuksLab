/* Small interaction effects:
   cursor   — lime dot that follows the pointer and grows over cards / rows / buttons
   magnetic — any .magnetic element leans toward the pointer and springs back
   reveal   — [data-r] elements fade up when they scroll into view
   faq      — <details> accordions that animate their height */
Lab.register('cursor', function () {
  if (!Lab.fine) return;
  var c = Lab.$('#cur'), qx = gsap.quickTo(c, 'x', { duration: .4, ease: 'power3' }), qy = gsap.quickTo(c, 'y', { duration: .4, ease: 'power3' });
  window.addEventListener('mousemove', function (e) { c.classList.add('on'); qx(e.clientX); qy(e.clientY); });
  document.addEventListener('mouseover', function (e) { c.classList.toggle('big', !!e.target.closest('.card, .row, .btn, summary')); });
});

Lab.register('magnetic', function () {
  if (!Lab.fine) return;
  Lab.$$('.magnetic').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .8, ease: 'power4.out' });
    });
    el.addEventListener('mouseleave', function () { gsap.to(el, { x: 0, y: 0, duration: 1.4, ease: 'elastic.out(1,.3)' }); });
  });
});

Lab.register('reveal', function () {
  ScrollTrigger.batch('[data-r]', { start: 'top 90%', once: true, onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: .1 }); } });
});

Lab.register('faq', function () {
  Lab.$$('.faq details').forEach(function (d) {
    var s = Lab.$('summary', d), a = Lab.$('.ans', d);
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.open) gsap.to(a, { height: 0, duration: .6, ease: 'power3.inOut', onComplete: function () { d.open = false; ScrollTrigger.refresh(); } });
      else { d.open = true; gsap.fromTo(a, { height: 0 }, { height: 'auto', duration: .7, ease: 'power3.out', onComplete: function () { ScrollTrigger.refresh(); } }); }
    });
  });
});
