/* CHUKS Medical Laboratory Center — site script.
   This file only (1) renders the shared layout + data-driven content and (2) decides which library effects run.
   All animation lives in lib/fx/*.js (see lib/README.md). Facts come from js/data.js and are never invented. */
(function () {
  'use strict';
  var D = Lab.D, B = Lab.B, C = Lab.C, L = Lab.L, $ = Lab.$, $$ = Lab.$$, enc = Lab.enc, html = Lab.html, page = Lab.page;
  var ARROW = Lab.ARROW, btn = Lab.btn, chip = Lab.chip, pad2 = Lab.pad2, locationLine = Lab.locationLine;
  if (D.showDraftNotes) html.classList.add('show-drafts');
  var WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.1-1.8 1.2-.5.1-1.100.2-3.600-.8-3-1.300-4.900-4.300-5-4.500-.2-.2-1.200-1.600-1.200-3s.7-2.100 1-2.400c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .6l-.4.600-.3.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.2.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400z"/></svg>';

  /* ---------- shared layout ---------- */
  function ring() {
    return '<span class="logo__ring"><svg class="t" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="rc" d="M50 50 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0"/></defs>' +
      '<text font-size="9.4" font-weight="800" fill="currentColor" textLength="248" lengthAdjust="spacing"><textPath href="#rc">CHUKS MEDICAL LABORATORY • ONITSHA • </textPath></text></svg>' +
      '<svg class="m" viewBox="0 0 40 40" aria-hidden="true"><circle cx="15" cy="20" r="11" fill="currentColor"/><circle cx="26" cy="20" r="11" fill="#3A9559" fill-opacity=".85"/></svg></span>';
  }
  function navLinks() {
    return D.nav.map(function (n) {
      return '<a href="' + n.href + '"' + (n.key === page ? ' aria-current="page"' : '') + '><span>' + n.label + '</span><span aria-hidden="true">' + n.label + '</span></a>';
    }).join('');
  }
  function footerHTML() {
    var contact = '';
    if (L.tel) contact += '<li><a href="' + L.tel + '">' + (C.phoneDisplay || C.phone) + '</a></li>';
    if (L.wa()) contact += '<li><a class="wa" href="' + L.wa() + '" target="_blank" rel="noopener">' + WA + 'WhatsApp</a></li>';
    if (L.mail) contact += '<li><a href="' + L.mail + '">' + C.email + '</a></li>';
    if (!contact) contact = '<li>Contact details coming soon.' + chip('Awaiting client info') + '</li>';
    return '<div class="ftr-w"><footer class="ftr" data-bg="dark"><div class="ftr__grid">' +
      '<div><p class="ftr__brand">Reliable diagnostics, <em>closer</em> to you.</p></div>' +
      '<div><h4>Visit</h4><ul><li>' + (B.streetAddress ? B.streetAddress + '<br>' : '') + B.area + ', ' + B.locality + '<br>' + B.region + ', ' + B.country + '</li><li><a href="' + L.directions + '" target="_blank" rel="noopener">Get directions ↗</a></li></ul></div>' +
      '<div><h4>Explore</h4><ul>' + D.nav.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + '</a></li>'; }).join('') + '</ul><h4 style="margin-top:1.6rem">Contact</h4><ul>' + contact + '</ul></div>' +
      '</div><div class="ftr__base"><span>© ' + new Date().getFullYear() + ' ' + B.name + '. All rights reserved.</span>' +
      (D.site.credit && D.site.credit.name ? '<span>Site by <a href="' + (D.site.credit.url || '#') + '">' + D.site.credit.name + '</a></span>' : '') + '</div></footer></div>';
  }
  function mountLayout() {
    var hdr = document.createElement('header'); hdr.className = 'hdr'; hdr.id = 'hdr';
    hdr.innerHTML = '<a class="logo" href="index.html" aria-label="' + B.name + ' — home">' + ring() + '<span class="logo__txt">Chuks<br>Medical Lab</span></a>' +
      '<div class="hdr__r"><nav class="nav" aria-label="Primary">' + navLinks() + '</nav><button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menu"><span>Menu</span><i></i></button></div>';
    document.body.insertBefore(hdr, document.body.firstChild);
    var menu = document.createElement('div'); menu.className = 'menu'; menu.id = 'menu'; menu.setAttribute('aria-hidden', 'true');
    menu.innerHTML = D.nav.map(function (n) { return '<a class="m" href="' + n.href + '"><span>' + n.label + '</span></a>'; }).join('') +
      '<div class="menu__f"><span>' + locationLine + '</span>' + (C.phoneDisplay ? '<a href="' + L.tel + '">' + C.phoneDisplay + '</a>' : '') + '</div>';
    document.body.insertBefore(menu, hdr.nextSibling);
    [['prog', 'prog']].forEach(function (p) { var d = document.createElement('div'); d.className = p[0]; d.id = p[1]; document.body.appendChild(d); });
    var f = $('#ftr'); if (f) f.innerHTML = footerHTML();
    Lab.hdr = hdr;
  }

  /* ---------- data-driven content ---------- */
  var KINDS = ['cells', 'tubes', 'rings', 'grid', 'hex', 'wave'];
  var SVC_PHOTO = ['tubes', 'pipette', 'microscope', 'gloves', 'cells', 'labprep'];
  var PR_PHOTO = ['pipettebowl', 'patient', 'labteam', 'scientist'];
  var STEP_PHOTO = ['patient', 'labgroup', 'labprep', 'analyzer'];
  var STEPS = [
    ['Get in touch', 'Contact the laboratory to ask about your test and confirm anything you need to know before travelling.'],
    ['Arrive in ' + B.area, 'Come to the laboratory with any request or referral from your doctor, if you have one.'],
    ['Sample collection', 'A member of the team will guide you through providing the sample your test requires.'],
    ['Results', 'Ask the team how and when your results will be shared with you or your doctor.']
  ];
  var T = {
    cards: function () { return D.services.map(function (s, i) { return '<article class="card"><div class="card__art"><img data-img="' + SVC_PHOTO[i % 6] + '" alt=""><canvas data-art="' + KINDS[i % 6] + '" data-seed="' + (i + 1) + '" aria-hidden="true"></canvas></div><div class="card__b"><span class="n">' + pad2(i + 1) + '</span><h3>' + s.title + (s.confirmed ? '' : chip('Demo')) + '</h3><p>' + s.short + '</p><a class="link" href="contact.html?service=' + enc(s.title) + '">Ask about this ' + ARROW + '</a></div></article>'; }).join(''); },
    rows: function () { return D.services.map(function (s, i) { return '<li class="row" data-r><span class="n">' + pad2(i + 1) + '</span><h3>' + s.title + (s.confirmed ? '' : chip('Demo')) + '</h3><p>' + s.short + '</p><span class="th"><img data-img="' + SVC_PHOTO[i % 6] + '" alt=""></span></li>'; }).join(''); },
    principles: function () { return D.principles.map(function (p, i) { return '<article class="pc"><img class="ph-bg" data-img="' + PR_PHOTO[i % 4] + '" alt=""><span class="n">' + p.n + '</span><div><h3>' + p.title + '</h3><p>' + p.text + '</p></div></article>'; }).join(''); },
    steps: function () { return STEPS.map(function (s, i) { return '<article class="step" style="--i:' + i + '"><span class="step__n">' + (i + 1) + '</span><div class="step__b"><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div><div class="step__img ph" data-parallax><img data-img="' + STEP_PHOTO[i % 4] + '" alt=""></div></article>'; }).join(''); },
    faq: function () {
      return D.faqs.map(function (f) {
        var a = f.a ? '<p>' + f.a.replace('{location}', locationLine) + '</p>' : '<p class="pending">This will be confirmed by the laboratory. In the meantime, please <a class="link" href="contact.html">get in touch</a> and our team will be glad to help.' + chip('Awaiting client info') + '</p>';
        return '<details data-r><summary><span>' + f.q + '</span><i></i></summary><div class="ans">' + a + '</div></details>';
      }).join('');
    },
    facts: function () {
      var pending = '<span class="soft">To be confirmed</span>' + chip('Awaiting client info');
      function row(k, v) { return '<div class="fact" data-r><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }
      return row('Address', (B.streetAddress ? B.streetAddress + '<br>' : '') + B.area + ', ' + B.locality + '<br>' + B.region + ', ' + B.country + (B.streetAddress ? '' : chip('Street address needed'))) +
        row('Phone', L.tel ? '<a class="link" href="' + L.tel + '">' + (C.phoneDisplay || C.phone) + '</a>' : pending) +
        row('WhatsApp', L.wa() ? '<a class="link" href="' + L.wa() + '" target="_blank" rel="noopener">Chat with us</a>' : pending) +
        row('Email', L.mail ? '<a class="link" href="' + L.mail + '">' + C.email + '</a>' : pending) +
        row('Hours', D.openingHours.length ? D.openingHours.map(function (h) { return h.days + ' · ' + h.hours; }).join('<br>') : '<span class="soft">Please contact the laboratory to confirm opening hours.</span>' + chip('Awaiting client info'));
    },
    cta: function () {
      var h = '';
      if (L.tel) h += btn('btn--lime', 'Call us', L.tel);
      if (L.wa()) h += btn('btn--lime', 'WhatsApp', L.wa(), ' target="_blank" rel="noopener"');
      return h + btn(L.tel || L.wa() ? 'btn--line' : '', 'Get directions', L.directions, ' target="_blank" rel="noopener"');
    },
    map: function () { return '<iframe title="Map: ' + B.name + '" loading="lazy" src="' + L.embed + '" referrerpolicy="no-referrer-when-downgrade"></iframe>'; },
    creds: function () { return D.credentials.length ? D.credentials.map(function (c) { return '<li class="row" style="grid-template-columns:1fr"><h3>' + c.title + '</h3><p>' + (c.issuer || '') + ' ' + (c.note || '') + '</p></li>'; }).join('') : '<p class="lead">Verified credentials, registrations and affiliations will appear here once supplied by the laboratory.' + chip('Awaiting client info') + '</p>'; }
  };
  function fillContent() {
    Object.keys(T).forEach(function (k) { var m = $('[data-fill="' + k + '"]'); if (m) m.innerHTML = T[k](); });
    $$('[data-loc]').forEach(function (e) { e.textContent = locationLine; });
    $$('[data-href="directions"]').forEach(function (e) { e.href = L.directions; e.target = '_blank'; e.rel = 'noopener'; });
    Lab.run('hydrate');
    if (window.Art) window.Art.drawAll();
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
      else st.textContent = 'Our contact channels are being set up. Please use Get directions or visit us in ' + B.area + ', ' + B.locality + '.';
    });
  }

  /* ---------- boot: which library effects run ---------- */
  function boot() {
    mountLayout(); fillContent(); contactForm();
    if (!Lab.hasMotion) {
      html.classList.add('static'); document.body.classList.remove('is-loading');
      var pre = $('#pre'); if (pre) pre.style.display = 'none';
      ['back', 'mid', 'front'].forEach(function (l) { var el = $('.cl--' + l); if (el && window.Clouds) window.Clouds.fill(el, l); });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    var firstVisit = !Lab.store.get('chuksSeen');
    Lab.store.set('chuksSeen', '1');
    var first = page === 'home' && firstVisit;
    if (!first) { document.body.classList.remove('is-loading'); var pre0 = $('#pre'); if (pre0) pre0.remove(); }

    if (page === 'home') { Lab.run('clouds', '.cl--back', 'back'); Lab.run('clouds', '.cl--mid', 'mid'); Lab.run('clouds', '.cl--front', 'front'); Lab.run('clouds', '.loc .cl', 'back'); }
    else { Lab.run('clouds', '.phero .cl--back', 'back'); Lab.run('clouds', '.phero .cl--mid', 'mid'); }
    if (window.Art) window.Art.drawAll();

    Lab.run('smoothScroll');
    if (first && Lab.lenis) Lab.lenis.stop();
    ['headerLogo', 'headerTheme', 'menu', 'magnetic', 'faq'].forEach(function (n) { Lab.run(n); });

    if (page === 'home') {
      Lab.run('heroPrep'); Lab.run('dive'); Lab.run('hscroll'); Lab.run('expandGrid'); Lab.run('stackSteps'); Lab.run('giantLines'); Lab.run('ctaWords'); Lab.run('imgReveal'); Lab.run('imgParallax'); Lab.run('imgExpand'); Lab.run('photoStrip');
    } else {
      Lab.run('innerClouds'); Lab.run('stackSteps'); Lab.run('imgReveal'); Lab.run('imgParallax'); Lab.run('photoStrip');
    }
    Lab.run('reveal'); Lab.run('footerClip');

    if (first) Lab.run('preloader', function () { Lab.run('heroIn'); });
    else Lab.run(page === 'home' ? 'heroIn' : 'innerHero');
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
