/* CHUKS — procedural clouds. Fractal value-noise is rendered once into a few transparent sprites,
   then layered (back / mid / front) so GSAP can drift them and pull them apart on scroll. */
(function () {
  'use strict';
  function hash(x, y, s) {
    var n = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0;
    n = Math.imul(n ^ (n >>> 13), 1274126177); n ^= n >>> 16;
    return (n >>> 0) / 4294967296;
  }
  function vnoise(x, y, s) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, s) {
    var t = 0, amp = .5, f = 1;
    for (var o = 0; o < 6; o++) { t += vnoise(x * f, y * f, s + o) * amp; f *= 2.03; amp *= .5; }
    return t;
  }
  function smooth(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }

  function sprite(w, h, seed) {
    var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    var ctx = cv.getContext('2d'), img = ctx.createImageData(w, h), d = img.data, i = 0;
    for (var y = 0; y < h; y++) {
      var ny = (y / h - .5) * 2;
      for (var x = 0; x < w; x++, i += 4) {
        var nx = (x / w - .5) * 2;
        // flat-ish base, billowing top: squash the lower half harder
        var dist = Math.sqrt(nx * nx * .85 + (ny > .1 ? ny * ny * 3.2 : ny * ny * 1.15));
        var fall = 1 - Math.pow(Math.min(1, dist), 1.5);
        var n = fbm(x / w * 4.2, y / h * 3.2, seed) * 1.35 * fall;
        var a = smooth(.37, .5, n);
        if (a > 0) {
          // light from the upper-left: compare against a neighbour toward the light to get billows
          var nl = fbm((x - 5) / w * 4.2, (y - 5) / h * 3.2, seed) * 1.35 * fall;
          var shade = Math.max(0, Math.min(1, .08 + (y / h) * .5 + (n - nl) * 9 + (1 - a) * .25));
          d[i] = 255 - shade * 95; d[i + 1] = 255 - shade * 62; d[i + 2] = 255 - shade * 34;
        }
        d[i + 3] = a * 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL('image/png');
  }

  var cache = null;
  function sprites() {
    if (cache) return cache;
    cache = [];
    for (var i = 0; i < 5; i++) cache.push(sprite(640, 320, 11 + i * 37));
    return cache;
  }

  // layer recipes: [spriteIndex, left%, top%, width vw, opacity]
  var LAYERS = {
    back:  [[0, -6, 30, 38, .95], [2, 18, 42, 34, .92], [4, 42, 28, 40, .95], [1, 64, 40, 34, .92], [3, 86, 32, 36, .95], [0, 50, 48, 30, .85]],
    mid:   [[1, -12, 46, 52, 1], [3, 20, 58, 46, 1], [0, 50, 50, 52, 1], [4, 78, 56, 48, 1], [2, 98, 46, 44, 1]],
    front: [[2, -26, 66, 78, 1], [4, 14, 78, 68, 1], [1, 44, 70, 82, 1], [0, 72, 80, 72, 1], [3, 100, 68, 70, 1]]
  };

  function fill(el, layer) {
    var sp = sprites(), spec = LAYERS[layer] || LAYERS.back;
    el.innerHTML = '';
    spec.forEach(function (c, n) {
      var im = document.createElement('img');
      im.src = sp[c[0]]; im.alt = ''; im.decoding = 'async'; im.draggable = false;
      im.className = 'cloud'; im.setAttribute('data-side', c[1] + c[3] / 2 < 50 ? '-1' : '1'); im.setAttribute('data-i', n);
      im.style.cssText = 'left:' + c[1] + '%;top:' + c[2] + '%;width:' + c[3] + 'vw;opacity:' + c[4];
      el.appendChild(im);
    });
  }
  window.Clouds = { fill: fill, sprites: sprites };
})();
