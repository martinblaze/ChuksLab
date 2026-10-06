/* CHUKS Medical Laboratory Center — behaviour. Reads window.CHUKS (js/data.js). */
(function () {
  'use strict';
  var D = window.CHUKS, B = D.business, C = D.contact;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var enc = encodeURIComponent;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var page = document.body.getAttribute('data-page') || 'home';

  if (D.showDraftNotes) document.documentElement.classList.add('show-drafts');

  /* ---------- derived values ---------- */
  var locationLine = B.area + ', ' + B.locality + ', ' + B.region + ', ' + B.country;
  var L = {
    directions: 'https://www.google.com/maps/dir/?api=1&destination=' + enc(B.mapQuery),
    embed: B.mapEmbed || 'https://www.google.com/maps?q=' + enc(B.mapQuery) + '&output=embed',
    tel: C.phone ? 'tel:' + C.phone : null,
    wa: function (t) { return C.whatsapp ? 'https://wa.me/' + C.whatsapp + (t ? '?text=' + enc(t) : '') : null; },
    mail: C.email ? 'mailto:' + C.email : null
  };
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  var ICON = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.100-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .5l-.4.600-.4.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.700-.1l1.900.9c.3.100.5.200.6.300.1.200.1.800-.1 1.400z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s7-6.200 7-12a7 7 0 0 0-14 0c0 5.800 7 12 7 12z"/><circle cx="12" cy="10" r="2.500"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12.500l5 5L20 6.500"/></svg>'
  };
  var MARK = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="15" cy="20" r="11" fill="#0D2A1F"/><circle cx="26" cy="20" r="11" fill="#3A9559" fill-opacity=".9" style="mix-blend-mode:multiply"/><circle cx="26" cy="20" r="3.200" fill="#CDF36B"/></svg>';

  /* ---------- images ---------- */
  function unsplash(id, w) { return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=72&w=' + w; }
  function hydrate(root) {
    $$('img[data-img]', root).forEach(function (img) {
      var k = D.images[img.getAttribute('data-img')];
      if (!k) return;
      if (k.id) {
        img.src = unsplash(k.id, 1000);
        img.srcset = [480, 800, 1200, 1800, 2400].map(function (w) { return unsplash(k.id, w) + ' ' + w + 'w'; }).join(', ');
        img.sizes = img.getAttribute('data-sizes') || '100vw';
      } else { img.src = k.src; }
      if (!img.hasAttribute('alt')) img.alt = k.alt;
      if (k.pos) img.style.objectPosition = k.pos;
      img.decoding = 'async';
      if (img.hasAttribute('data-eager')) { img.loading = 'eager'; img.setAttribute('fetchpriority', 'high'); } else img.loading = 'lazy';
      var done = function () { img.classList.add('loaded'); };
      if (img.complete && img.naturalWidth) done(); else { img.addEventListener('load', done); img.addEventListener('error', done); }
    });
  }
  function imgTag(key, sizes, alt) {
    return '<img data-img="' + key + '" data-sizes="' + (sizes || '100vw') + '"' + (alt !== undefined ? ' alt="' + alt + '"' : '') + '>';
  }

  /* ---------- shared layout ---------- */
  function navLinks() {
    return D.nav.map(function (n) {
      return '<a href="' + n.href + '"' + (n.key === page ? ' aria-current="page"' : '') + '>' + n.label + '</a>';
    }).join('');
  }
  function btn(cls, label, href, extra) {
    return '<a class="btn ' + cls + ' magnetic" href="' + href + '"' + (extra || '') + '><span class="btn__t">' + label + '</span><span class="btn__i">' + ARROW + '</span></a>';
  }

  function buildHeader() {
    var host = $('#site-header'); if (!host) return;
    host.outerHTML =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="hdr" id="hdr"><div class="wrap hdr__in">' +
        '<a class="brand" href="index.html" aria-label="' + B.name + ' — home">' + MARK + '<span><b>CHUKS</b><small>Medical Laboratory Center</small></span></a>' +
        '<nav class="hdr__nav" aria-label="Primary">' + navLinks() + '</nav>' +
        '<div class="hdr__cta">' + btn('btn--solid btn--sm', 'Contact Us', 'contact.html') + '</div>' +
        '<button class="burger" id="burger" aria-expanded="false" aria-controls="menu"><span class="burger__l">Menu</span><i></i></button>' +
      '</div></header>' +
      '<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Site menu" inert>' +
        '<div class="menu__bg imgbox">' + imgTag('microscope', '100vw', '') + '</div><span class="blob"></span>' +
        '<div class="menu__in"><nav class="menu__list" aria-label="Full menu">' +
          D.nav.map(function (n, i) {
            return '<a href="' + n.href + '"' + (n.key === page ? ' aria-current="page"' : '') + '><span class="n">0' + (i + 1) + '</span><span class="m"><span style="--i:' + i + '">' + n.label + '</span></span></a>';
          }).join('') +
        '</nav><div class="menu__foot"><p>' + B.locality + ', ' + B.region + '<b>' + B.area + '</b></p>' +
          '<div class="btns">' +
            (L.tel ? '<a class="btn btn--ghost btn--sm" href="' + L.tel + '"><span class="btn__t">Call</span><span class="btn__i">' + ARROW + '</span></a>' : '') +
            (L.wa() ? '<a class="btn btn--lime btn--sm" href="' + L.wa() + '" target="_blank" rel="noopener"><span class="btn__t">WhatsApp</span><span class="btn__i">' + ARROW + '</span></a>' : '') +
            '<a class="btn btn--ghost btn--sm" href="' + L.directions + '" target="_blank" rel="noopener"><span class="btn__t">Directions</span><span class="btn__i">' + ARROW + '</span></a>' +
          '</div></div></div></div>';
  }

  function hoursHTML() {
    if (!D.openingHours.length) return '<p>Please contact the laboratory to confirm opening hours.</p>';
    return '<ul>' + D.openingHours.map(function (h) { return '<li>' + h.days + ' — ' + h.hours + '</li>'; }).join('') + '</ul>';
  }
  function socialHTML() {
    var s = D.social, keys = Object.keys(s).filter(function (k) { return s[k]; });
    if (!keys.length) return '';
    return '<h3>Follow</h3><ul>' + keys.map(function (k) { return '<li><a href="' + s[k] + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + '</a></li>'; }).join('') + '</ul>';
  }

  var CTA_COPY = {
    home: [['Looking for a','<em>laboratory</em>','in Onitsha?'], 'Find ' + B.name + ' in ' + B.area + ' and get in touch with our team.'],
    other: [['Ready to <em>visit</em>','or ask a question?'], 'Reach ' + B.name + ' in ' + B.area + ', ' + B.locality + ' — we’re glad to help you find the right test.']
  };
  function buildCTA() {
    var host = $('#site-cta'); if (!host) return;
    var c = CTA_COPY[page === 'home' ? 'home' : 'other'];
    host.outerHTML =
      '<section class="cta curve" aria-labelledby="ctaH"><span class="blob"></span><span class="blob b2"></span>' +
      '<div class="wrap cta__in"><p class="eyebrow" style="margin:0"><span class="dot" style="background:var(--forest)"></span>' + B.locality + ' • ' + B.area + '</p>' +
      '<h2 class="display" id="ctaH" data-lines>' + c[0].map(function (l) { return '<span class="ln"><span>' + l + '</span></span>'; }).join('') + '</h2>' +
      '<p data-fade>' + c[1] + '</p>' +
      '<div class="btns">' + btn('btn--solid', 'Contact Us', 'contact.html') +
      '<a class="btn btn--line magnetic" href="' + L.directions + '" target="_blank" rel="noopener"><span class="btn__t">Get Directions</span><span class="btn__i">' + ARROW + '</span></a></div></div></section>';
  }

  function buildFooter() {
    var host = $('#site-footer'); if (!host) return;
    var contactRows = '';
    if (L.tel) contactRows += '<li><a href="' + L.tel + '">' + (C.phoneDisplay || C.phone) + '</a></li>';
    if (L.wa()) contactRows += '<li><a href="' + L.wa() + '" target="_blank" rel="noopener">WhatsApp</a></li>';
    if (L.mail) contactRows += '<li><a href="' + L.mail + '">' + C.email + '</a></li>';
    if (!contactRows) contactRows = '<li>Phone &amp; WhatsApp details coming soon.</li>';
    host.outerHTML =
      '<footer class="footer curve on-dark" id="footer"><span class="blob"></span><div class="wrap">' +
        '<p class="footer__big" aria-label="' + B.name + '">CHUKS<br>Medical <em>Laboratory</em><br>Center</p>' +
        '<div class="footer__cols">' +
          '<div><h3>Find us</h3><p>' + (B.streetAddress ? B.streetAddress + '<br>' : '') + B.area + ', ' + B.locality + '<br>' + B.region + ', ' + B.country + '</p>' +
            '<p style="margin-top:14px"><a class="link" href="' + L.directions + '" target="_blank" rel="noopener">Get directions <span class="arr">→</span></a></p></div>' +
          '<div><h3>Explore</h3><ul>' + D.nav.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + '</a></li>'; }).join('') + '</ul></div>' +
          '<div><h3>Contact</h3><ul>' + contactRows + '</ul>' + socialHTML() + '</div>' +
          '<div><h3>Opening hours</h3>' + hoursHTML() + '</div>' +
        '</div>' +
        '<div class="fine"><span>© ' + new Date().getFullYear() + ' ' + B.name + '. All rights reserved.</span>' +
        '<span>Website by ' + (D.site.credit.url ? '<a href="' + D.site.credit.url + '" target="_blank" rel="noopener">' + D.site.credit.name + '</a>' : D.site.credit.name) + '</span></div>' +
      '</div></footer>';
  }

  function buildActionBar() {
    var h = '';
    if (L.tel) h += '<a href="' + L.tel + '">' + ICON.phone + 'Call</a>';
    if (L.wa()) h += '<a class="wa" href="' + L.wa() + '" target="_blank" rel="noopener">' + ICON.wa + 'WhatsApp</a>';
    h += '<a class="dir" href="' + L.directions + '" target="_blank" rel="noopener">' + ICON.pin + 'Directions</a>';
    var bar = document.createElement('div');
    bar.className = 'abar'; bar.setAttribute('role', 'navigation'); bar.setAttribute('aria-label', 'Quick contact');
    bar.innerHTML = h; document.body.appendChild(bar);
    setTimeout(function () { bar.classList.add('show'); }, 1800);
  }

  /* ---------- structured data ---------- */
  function jsonLd() {
    var o = {
      '@context': 'https://schema.org', '@type': ['MedicalBusiness', 'LocalBusiness'],
      '@id': D.site.url + '/#business', name: B.name, url: D.site.url + '/',
      description: B.tagline + ' Medical laboratory in ' + B.area + ', ' + B.locality + ', ' + B.region + ', ' + B.country + '.',
      address: { '@type': 'PostalAddress', addressLocality: B.locality, addressRegion: B.region, addressCountry: B.countryCode },
      hasMap: 'https://www.google.com/maps/search/?api=1&query=' + enc(B.mapQuery)
    };
    if (B.streetAddress) o.address.streetAddress = B.streetAddress + ', ' + B.area;
    else o.address.streetAddress = B.area;
    if (C.phone) o.telephone = C.phone;
    if (C.email) o.email = C.email;
    if (B.geo) o.geo = { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng };
    var same = Object.keys(D.social).map(function (k) { return D.social[k]; }).filter(Boolean);
    if (same.length) o.sameAs = same;
    var spec = D.openingHours.filter(function (h) { return h.schema; }).map(function (h) { return h.schema; });
    if (spec.length) o.openingHoursSpecification = spec;
    var blocks = [o];
    if (page === 'patient') {
      var qa = D.faqs.filter(function (f) { return f.a; }).map(function (f) {
        return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace('{location}', locationLine) } };
      });
      if (qa.length) blocks.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa });
    }
    blocks.forEach(function (b) {
      var s = document.createElement('script'); s.type = 'application/ld+json'; s.text = JSON.stringify(b); document.head.appendChild(s);
    });
  }

  /* ---------- content renderers ---------- */
  function renderHomeServices() {
    var vis = $('#svcVisual'), list = $('#svcList'); if (!vis || !list) return;
    vis.innerHTML = D.services.map(function (s) {
      return '<figure class="imgbox">' + imgTag(s.img, '(min-width:820px) 40vw, 100vw') + '<figcaption>' + s.title + '</figcaption></figure>';
    }).join('');
    list.innerHTML = D.services.map(function (s, i) {
      return '<li><a href="services.html#' + s.id + '" data-i="' + i + '"><span class="n">0' + (i + 1) + '</span><span class="t">' + s.title + '</span><span class="arr" aria-hidden="true">→</span><span class="d">' + s.short + '</span></a></li>';
    }).join('');
    var figs = $$('figure', vis), links = $$('a', list), cur = -1;
    function set(i) {
      if (i === cur) return;
      figs.forEach(function (f, j) { f.classList.toggle('on', j === i); f.classList.toggle('past', j < i); });
      links.forEach(function (a, j) { a.classList.toggle('on', j === i); });
      cur = i;
    }
    links.forEach(function (a, i) {
      a.addEventListener('mouseenter', function () { set(i); });
      a.addEventListener('focus', function () { set(i); });
    });
    set(0);
  }

  function renderPrinciples() {
    var host = $('#principles'); if (!host) return;
    host.innerHTML = D.principles.map(function (p) {
      return '<li><span class="n">' + p.n + '</span><h3>' + p.title + '</h3><p>' + p.text + '</p></li>';
    }).join('');
  }

  function renderServicePage() {
    var host = $('#rows'); if (!host) return;
    host.innerHTML = D.services.map(function (s, i) {
      var n = i < 9 ? '0' + (i + 1) : '' + (i + 1);
      return '<a class="row-svc" id="' + s.id + '" href="contact.html?service=' + enc(s.title) + '" data-i="' + i + '" data-reveal-row>' +
        '<span class="n">' + n + '</span><h2>' + s.title + (s.confirmed ? '' : '<span class="draft">Demo</span>') + '</h2>' +
        '<p>' + s.short + '</p><span class="arr">' + ARROW + '</span>' +
        '<span class="thumb imgbox">' + imgTag(s.img, '84px', '') + '</span></a>';
    }).join('');
    if (!fine) return;
    var fl = document.createElement('div'); fl.className = 'float-img imgbox'; fl.setAttribute('aria-hidden', 'true');
    fl.innerHTML = D.services.map(function (s) { return '<figure>' + imgTag(s.img, '380px', '') + '</figure>'; }).join('');
    document.body.appendChild(fl); hydrate(fl);
    var figs = $$('figure', fl), x = -999, y = -999, tx = -999, ty = -999, running = false;
    function loop() {
      x += (tx - x) * .14; y += (ty - y) * .14;
      fl.style.transform = 'translate3d(' + (x + 28) + 'px,' + (y - fl.offsetHeight / 2) + 'px,0) rotate(' + ((tx - x) * .02) + 'deg)';
      if (running) requestAnimationFrame(loop);
    }
    $$('.row-svc', host).forEach(function (r) {
      r.addEventListener('mouseenter', function (e) {
        var i = +r.getAttribute('data-i'); figs.forEach(function (f, j) { f.classList.toggle('on', j === i); });
        if (x === -999) { x = tx = e.clientX; y = ty = e.clientY; }
        fl.classList.add('show'); if (!running) { running = true; loop(); }
      });
      r.addEventListener('mousemove', function (e) { tx = Math.min(e.clientX, innerWidth - fl.offsetWidth - 60); ty = e.clientY; });
      r.addEventListener('mouseleave', function () { fl.classList.remove('show'); running = false; });
    });
  }

  function renderFAQ() {
    var host = $('#faqList'); if (!host) return;
    host.innerHTML = D.faqs.map(function (f, i) {
      var ans = f.a ? f.a.replace('{location}', locationLine) : null;
      var tail = '';
      if (f.q.indexOf('contact the laboratory') > -1 && !f.a) {
        var parts = [];
        if (C.phoneDisplay || C.phone) parts.push('call ' + (C.phoneDisplay || C.phone));
        if (C.whatsapp) parts.push('message us on WhatsApp');
        if (C.email) parts.push('email ' + C.email);
        ans = parts.length ? 'You can ' + parts.join(', ') + '.' : null;
      }
      var body = ans ? '<p>' + ans + '</p>' : '<p class="pending">This will be confirmed by the laboratory. In the meantime, please <a class="link" href="contact.html">get in touch</a> and our team will be glad to help.<span class="draft">Awaiting client info</span></p>';
      return '<div class="faq-item"><h3><button aria-expanded="false" aria-controls="fa' + i + '" id="fq' + i + '"><span>' + f.q + '</span><i aria-hidden="true"></i></button></h3>' +
        '<div class="faq-a" id="fa' + i + '" role="region" aria-labelledby="fq' + i + '"><div>' + body + '</div></div></div>';
    }).join('');
    $$('.faq-item button', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var it = b.closest('.faq-item'), open = !it.classList.contains('open');
        $$('.faq-item.open', host).forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
        if (open) { it.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  function renderCredentials() {
    var host = $('#credList'); if (!host) return;
    if (D.credentials.length) {
      host.innerHTML = '<ul class="cred__list">' + D.credentials.map(function (c) {
        return '<li><b>' + c.title + '</b>' + (c.issuer ? '<span>' + c.issuer + '</span>' : '') + (c.note ? '<p>' + c.note + '</p>' : '') + '</li>';
      }).join('') + '</ul>';
    } else if (D.showDraftNotes) {
      host.innerHTML = '<p class="cred__empty">Verified credentials, registrations and affiliations will appear here once supplied by the laboratory.<span class="draft">Awaiting client info</span></p>';
    } else { var s = host.closest('section'); if (s) s.remove(); }
  }

  function renderContactPage() {
    var dl = $('#contactDL'); if (!dl) return;
    function row(k, v) { return '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }
    var pending = '<span class="soft">To be confirmed</span><span class="draft">Awaiting client info</span>';
    dl.innerHTML =
      row('Address', (B.streetAddress ? B.streetAddress + '<br>' : '') + B.area + ', ' + B.locality + '<br>' + B.region + ', ' + B.country + (B.streetAddress ? '' : '<span class="draft">Street address needed</span>')) +
      row('Phone', L.tel ? '<a href="' + L.tel + '">' + (C.phoneDisplay || C.phone) + '</a>' : pending) +
      row('WhatsApp', L.wa() ? '<a href="' + L.wa() + '" target="_blank" rel="noopener">Chat with us</a>' : pending) +
      row('Email', L.mail ? '<a href="' + L.mail + '">' + C.email + '</a>' : pending) +
      row('Hours', D.openingHours.length ? D.openingHours.map(function (h) { return h.days + ' · ' + h.hours; }).join('<br>') : '<span class="soft">Please contact the laboratory to confirm opening hours.</span><span class="draft">Awaiting client info</span>');
    var act = $('#contactActions');
    act.innerHTML =
      (L.tel ? btn('btn--solid', 'Call the Laboratory', L.tel) : '') +
      (L.wa() ? btn('btn--lime', 'WhatsApp', L.wa(), ' target="_blank" rel="noopener" style="background:#25D366;color:#06301a"') : '') +
      btn(L.tel || L.wa() ? 'btn--line' : 'btn--solid', 'Get Directions', L.directions, ' target="_blank" rel="noopener"');
  }

  function maps() {
    $$('[data-map]').forEach(function (m) {
      m.innerHTML = '<iframe title="Map showing ' + B.name + ' in ' + B.area + ', ' + B.locality + '" src="' + L.embed + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    });
    $$('[data-text="location"]').forEach(function (e) { e.textContent = locationLine; });
    $$('[data-href="directions"]').forEach(function (e) { e.href = L.directions; e.target = '_blank'; e.rel = 'noopener'; });
  }

  function contactForm() {
    var f = $('#contactForm'); if (!f) return;
    var sv = new URLSearchParams(location.search).get('service');
    if (sv) f.message.value = 'Hello, I would like to ask about ' + sv + '.';
    var st = $('#formStatus');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = 'Hello ' + B.name + ', my name is ' + f.name.value + (f.phone.value ? ' (' + f.phone.value + ')' : '') + '. ' + f.message.value;
      if (L.wa()) { window.open(L.wa(msg), '_blank', 'noopener'); st.textContent = 'Opening WhatsApp with your message…'; }
      else if (L.mail) { location.href = L.mail + '?subject=' + enc('Enquiry from website') + '&body=' + enc(msg); st.textContent = 'Opening your email app…'; }
      else st.textContent = 'Our contact channels are being set up. Please use Get Directions or visit us in ' + B.area + ', ' + B.locality + '.';
    });
  }

  /* ---------- text splitting ---------- */
  function splitWords() {
    $$('[data-words]').forEach(function (el) {
      var html = el.innerHTML.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      var tmp = document.createElement('div'); tmp.innerHTML = html; var out = '';
      tmp.childNodes.forEach(function (n) {
        var em = n.nodeType === 1;
        (n.textContent.match(/\S+\s*/g) || []).forEach(function (w) { out += em ? '<em><span class="word">' + w + '</span></em>' : '<span class="word">' + w + '</span>'; });
      });
      el.setAttribute('aria-label', el.textContent.replace(/\*/g, '')); el.innerHTML = out;
      $$('.word', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
    });
  }

  /* ---------- menu ---------- */
  function menu() {
    var b = $('#burger'), m = $('#menu'); if (!b) return;
    var root = document.documentElement;
    function set(open) {
      document.body.classList.toggle('menu-open', open);
      b.setAttribute('aria-expanded', open); $('.burger__l', b).textContent = open ? 'Close' : 'Menu';
      if (open) { m.removeAttribute('inert'); setTimeout(function () { var a = $('.menu__list a', m); if (a) a.focus({ preventScroll: true }); }, 500); }
      else { m.setAttribute('inert', ''); }
    }
    b.addEventListener('click', function () { set(!document.body.classList.contains('menu-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { set(false); b.focus(); } });
    $$('a', m).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    matchMedia('(min-width:981px)').addEventListener('change', function (e) { if (e.matches) set(false); });
  }

  /* ---------- reveal + scroll loop ---------- */
  function reveals() {
    $$('[data-lines]').forEach(function (el) { $$('.ln', el).forEach(function (l, i) { l.style.setProperty('--i', i); }); });
    if (!('IntersectionObserver' in window)) { $$('[data-lines],[data-fade],[data-rule],[data-reveal-img],.hero').forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-lines],[data-fade],[data-rule]').forEach(function (e) { io.observe(e); });
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io2.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    $$('[data-reveal-img]').forEach(function (e) { io2.observe(e); });
    var hero = $('.hero'); if (hero) requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('is-in'); }); });
  }

  function scrollFX() {
    var hdr = $('#hdr'), bar = $('.abar');
    var px = $$('[data-parallax]'), words = $$('[data-words]'), shifts = $$('[data-shift]');
    var ticking = false, vh = innerHeight;
    function frame() {
      ticking = false; var y = scrollY;
      if (hdr) hdr.classList.toggle('is-solid', y > 30);
      if (!reduce) {
        px.forEach(function (el) {
          var r = el.parentElement.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
          var sp = parseFloat(el.getAttribute('data-parallax')) * (innerWidth < 700 ? .6 : 1);
          el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * -sp).toFixed(1) + 'px,0)';
        });
        shifts.forEach(function (el) {
          var r = el.parentElement.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
          var p = (vh - r.top) / (vh + r.height);
          el.style.transform = 'translate3d(' + ((p - .5) * parseFloat(el.getAttribute('data-shift'))).toFixed(1) + 'vw,0,0)';
        });
      }
      words.forEach(function (el) {
        var r = el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh) return;
        var ws = el._w || (el._w = $$('.word', el));
        var p = reduce ? 1 : Math.min(1, Math.max(0, (vh * .82 - r.top) / (r.height + vh * .12)));
        var n = Math.round(p * ws.length);
        ws.forEach(function (w, i) { var on = i < n; if (w._on !== on) { w._on = on; w.classList.toggle('lit', on); } });
      });
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', function () { vh = innerHeight; req(); });
    frame();
  }

  /* ---------- magnetic buttons ---------- */
  function magnetic() {
    if (!fine || reduce) return;
    var items = [], running = false;
    $$('.magnetic').forEach(function (el) { items.push({ el: el, x: 0, y: 0, tx: 0, ty: 0, lx: 0, ly: 0, sx: 1, tsx: 1, active: false }); });
    function loop() {
      var busy = false;
      items.forEach(function (s) {
        s.x += (s.tx - s.x) * .16; s.y += (s.ty - s.y) * .16; s.sx += (s.tsx - s.sx) * .16;
        var still = Math.abs(s.tx - s.x) < .05 && Math.abs(s.ty - s.y) < .05 && Math.abs(s.tsx - s.sx) < .001;
        if (!still || s.active) busy = true;
        var st = s.el.style;
        st.setProperty('--tx', s.x.toFixed(2) + 'px'); st.setProperty('--ty', s.y.toFixed(2) + 'px');
        st.setProperty('--lx', (s.x * .35).toFixed(2) + 'px'); st.setProperty('--ly', (s.y * .35).toFixed(2) + 'px');
        st.setProperty('--sx', s.sx.toFixed(4));
      });
      if (busy) requestAnimationFrame(loop); else running = false;
    }
    addEventListener('pointermove', function (e) {
      items.forEach(function (s) {
        var r = s.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy;
        var near = Math.abs(dx) < r.width / 2 + 34 && Math.abs(dy) < r.height / 2 + 34;
        if (near) { s.tx = dx * .28; s.ty = dy * .38; s.tsx = 1 + Math.min(Math.abs(dx) / r.width, .5) * .1; s.active = true; }
        else if (s.active) { s.tx = s.ty = 0; s.tsx = 1; s.active = false; }
        else return;
        if (!running) { running = true; requestAnimationFrame(loop); }
      });
    }, { passive: true });
  }

  /* ---------- boot ---------- */
  buildHeader(); buildCTA(); buildFooter(); buildActionBar();
  renderHomeServices(); renderPrinciples(); renderServicePage(); renderFAQ(); renderCredentials(); renderContactPage();
  maps(); contactForm(); splitWords(); jsonLd();
  hydrate(document);
  menu(); reveals(); scrollFX(); magnetic();

  // anchor from another page (e.g. services.html#haematology): offset for fixed header handled via scroll-margin-top
})();
