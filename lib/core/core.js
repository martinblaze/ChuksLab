/* Chuks Lab library — core. Shared helpers + the effect registry.
   Every effect lives in lib/fx/*.js and registers itself:  Lab.register('name', function () { ... });
   Run one with:  Lab.run('name', arg).  Effects read shared state from Lab (Lab.hdr, Lab.lenis, ...). */
(function () {
  'use strict';
  var D = window.CHUKS || {}, B = D.business || {}, C = D.contact || {};
  var Lab = window.Lab = { D: D, B: B, C: C, FX: {}, hdr: null, lenis: null };

  Lab.$ = function (s, r) { return (r || document).querySelector(s); };
  Lab.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  Lab.enc = encodeURIComponent;
  Lab.html = document.documentElement;
  Lab.page = document.body.getAttribute('data-page') || 'home';
  Lab.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  Lab.fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  Lab.hasMotion = !!(window.gsap && window.ScrollTrigger) && !Lab.reduce;
  Lab.pad2 = function (n) { return (n < 10 ? '0' : '') + n; };

  /* sessionStorage that never throws (private mode, blocked storage) */
  Lab.store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  };

  Lab.register = function (name, fn) { Lab.FX[name] = fn; };
  Lab.run = function (name) {
    var fn = Lab.FX[name];
    if (!fn) { if (window.console) console.warn('[Lab] missing effect: ' + name); return; }
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  };

  /* Split text into .word / .char spans (keeps <em> and other inline tags). mode: 'words' | 'chars'. Returns the spans. */
  Lab.split = function (el, mode) {
    var out = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 1) { walk(n); return; }
        if (n.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (tok) {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span'); w.className = 'word';
          if (mode === 'chars') {
            w.style.whiteSpace = 'nowrap';
            tok.split('').forEach(function (ch) { var c = document.createElement('span'); c.className = 'char'; c.textContent = ch; w.appendChild(c); out.push(c); });
          } else { w.textContent = tok; out.push(w); }
          frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      });
    })(el);
    return out;
  };

  /* Derived business facts + link builders (never invents missing details) */
  Lab.locationLine = [B.area, B.locality, B.region, B.country].filter(Boolean).join(', ');
  Lab.L = {
    directions: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(B.mapQuery || ''),
    embed: B.mapEmbed || 'https://www.google.com/maps?q=' + encodeURIComponent(B.mapQuery || '') + '&output=embed',
    tel: C.phone ? 'tel:' + C.phone : null,
    mail: C.email ? 'mailto:' + C.email : null,
    wa: function (t) { return C.whatsapp ? 'https://wa.me/' + C.whatsapp + (t ? '?text=' + encodeURIComponent(t) : '') : null; }
  };
  Lab.ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  Lab.btn = function (cls, label, href, attrs) {
    return '<a class="btn ' + cls + ' magnetic" href="' + href + '"' + (attrs || '') + '><span>' + label + '</span><span class="btn__i">' + Lab.ARROW + '</span></a>';
  };
  Lab.chip = function (t) { return '<span class="draft">' + t + '</span>'; };
})();
