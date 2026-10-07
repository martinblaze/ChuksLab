# Preloader: test tube + counter + iris

A dark screen with a test tube that fills with lime liquid while a counter climbs 0 to 100. Then the content scales away and a circular iris closes onto the page behind it. Plays once per browser session.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('preloader')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Duration: 2.6s (fill) in lib/fx/preloader-and-wipe.js
- Iris centre: circle(0% at 50% 60%)
- Colours: --forest (bg), --lime (liquid) in core/tokens-base.css
- Label text: .pre__label in markup.html

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
