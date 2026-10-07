/* Effect: smooth-scroll — Lenis inertia scrolling wired into GSAP's ticker and ScrollTrigger.
   Also hides the header while scrolling down and brings it back when scrolling up. */
Lab.register('smoothScroll', function () {
  if (!window.Lenis) return;
  var lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
  Lab.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  gsap.ticker.lagSmoothing(0);
  var last = 0;
  lenis.on('scroll', function (e) {
    var y = e.scroll;
    if (!Lab.menuOpen && Lab.hdr) Lab.hdr.classList.toggle('is-hidden', y > last && y > 160);
    last = y;
  });
});
