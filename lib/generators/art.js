/* CHUKS — procedural artwork. Draws abstract lab-themed art on <canvas data-art="kind" data-seed="n">.
   No image files: everything is generated, so it stays light and fully original. */
(function () {
  'use strict';
  function rng(seed) {
    var s = (seed * 2654435761) >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }
  var PAL = [
    ['#0D2A1F', '#3A9559', '#CDF36B', '#E0F1EE'],
    ['#164030', '#7CC593', '#F2EEE1', '#CDF36B'],
    ['#3A9559', '#CDF36B', '#0D2A1F', '#DCEEDF'],
    ['#10251C', '#3A9559', '#E0F1EE', '#7CC593'],
    ['#DCEEDF', '#7CC593', '#164030', '#CDF36B'],
    ['#0D2A1F', '#CDF36B', '#3A9559', '#F2EEE1']
  ];
  function alpha(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  var MOTIF = {
    cells: function (c, W, H, r, p) {
      for (var i = 0; i < 16; i++) {
        var x = r() * W, y = r() * H, rad = 40 + r() * 120;
        c.beginPath(); c.arc(x, y, rad, 0, 7); c.fillStyle = alpha(p[3], .1 + r() * .14); c.fill();
        c.lineWidth = 2; c.strokeStyle = alpha(p[3], .45); c.stroke();
        c.beginPath(); c.arc(x + rad * .18, y - rad * .12, rad * .34, 0, 7); c.fillStyle = alpha(p[2], .55); c.fill();
      }
    },
    tubes: function (c, W, H, r, p) {
      var n = 7, gw = W / n;
      for (var i = 0; i < n; i++) {
        var w = gw * .5, x = gw * i + gw * .25, top = H * (.12 + r() * .1), h = H * (.5 + r() * .3), fill = .25 + r() * .6;
        c.lineWidth = 3; c.strokeStyle = alpha(p[3], .6);
        c.beginPath(); c.moveTo(x, top); c.lineTo(x, top + h); c.arc(x + w / 2, top + h, w / 2, Math.PI, 0, true); c.lineTo(x + w, top); c.stroke();
        c.save(); c.beginPath(); c.moveTo(x, top); c.lineTo(x, top + h); c.arc(x + w / 2, top + h, w / 2, Math.PI, 0, true); c.lineTo(x + w, top); c.clip();
        c.fillStyle = alpha(p[2], .78); c.fillRect(x, top + h * (1 - fill), w, h);
        c.restore();
      }
    },
    rings: function (c, W, H, r, p) {
      var cx = W * (.3 + r() * .4), cy = H * (.3 + r() * .4);
      for (var i = 1; i < 18; i++) {
        c.beginPath(); c.arc(cx, cy, i * 34 + r() * 8, 0, 7);
        c.lineWidth = i % 4 === 0 ? 4 : 1.6; c.strokeStyle = alpha(i % 4 === 0 ? p[2] : p[3], .5); c.stroke();
      }
      for (var k = 0; k < 40; k++) { c.beginPath(); c.arc(cx + (r() - .5) * 460, cy + (r() - .5) * 460, 2 + r() * 7, 0, 7); c.fillStyle = alpha(p[2], .8); c.fill(); }
    },
    grid: function (c, W, H, r, p) {
      var step = 34, cx = W * (.35 + r() * .3), cy = H * (.35 + r() * .3), max = Math.hypot(W, H) * .6;
      for (var y = step / 2; y < H; y += step) for (var x = step / 2; x < W; x += step) {
        var d = 1 - Math.min(1, Math.hypot(x - cx, y - cy) / max);
        c.beginPath(); c.arc(x, y, 1 + d * 13, 0, 7); c.fillStyle = alpha(p[3], .15 + d * .7); c.fill();
      }
    },
    hex: function (c, W, H, r, p) {
      var s = 44, h = s * Math.sqrt(3) / 2;
      for (var row = -1; row * h < H + h; row++) for (var col = -1; col * s * 1.5 < W + s; col++) {
        var x = col * s * 1.5, y = row * h * 2 + (col % 2 ? h : 0);
        if (r() < .18) { c.fillStyle = alpha(p[2], .35 + r() * .4); }
        else c.fillStyle = 'rgba(0,0,0,0)';
        c.beginPath();
        for (var a = 0; a < 6; a++) { var ang = Math.PI / 3 * a; c[a ? 'lineTo' : 'moveTo'](x + s * .92 * Math.cos(ang), y + s * .92 * Math.sin(ang)); }
        c.closePath(); c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(p[3], .35); c.stroke();
      }
    },
    wave: function (c, W, H, r, p) {
      for (var i = 0; i < 22; i++) {
        var amp = 20 + r() * 90, f = .004 + r() * .006, ph = r() * 6, y0 = (i / 22) * H * 1.1;
        c.beginPath();
        for (var x = 0; x <= W; x += 8) { var y = y0 + Math.sin(x * f + ph) * amp; c[x ? 'lineTo' : 'moveTo'](x, y); }
        c.lineWidth = i % 5 === 0 ? 4 : 1.6; c.strokeStyle = alpha(i % 5 === 0 ? p[2] : p[3], .5); c.stroke();
      }
    }
  };

  function draw(canvas) {
    var kind = canvas.getAttribute('data-art') || 'cells';
    var seed = +canvas.getAttribute('data-seed') || 1;
    var W = canvas.width = 800, H = canvas.height = 1000, c = canvas.getContext('2d');
    var r = rng(seed * 7919), p = PAL[(seed - 1 + PAL.length * 4) % PAL.length];
    var g = c.createLinearGradient(0, 0, W * r(), H); g.addColorStop(0, p[0]); g.addColorStop(1, p[1]);
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    for (var i = 0; i < 5; i++) {
      var x = r() * W, y = r() * H, rad = 220 + r() * 380, rg = c.createRadialGradient(x, y, 0, x, y, rad);
      rg.addColorStop(0, alpha(p[(i % 3) + 1], .55)); rg.addColorStop(1, alpha(p[(i % 3) + 1], 0));
      c.fillStyle = rg; c.fillRect(0, 0, W, H);
    }
    (MOTIF[kind] || MOTIF.cells)(c, W, H, r, p);
    for (var n = 0; n < 2600; n++) { c.fillStyle = 'rgba(255,255,255,' + (r() * .07).toFixed(3) + ')'; c.fillRect(r() * W, r() * H, 2, 2); }
    canvas.classList.add('is-drawn');
  }
  window.Art = { draw: draw, drawAll: function (root) { [].forEach.call((root || document).querySelectorAll('canvas[data-art]:not(.is-drawn)'), draw); } };
})();
