# Photo gallery with clip-path reveals + parallax

A staggered grid of photos. Each frame opens with a clip-path wipe (from the bottom) while the photo settles from a 1.45x zoom, then drifts slower than the page. Photos are set with <img data-img="key"> and filled from CHUKS.images in js/data.js.

## Files
- `markup.html` — the HTML (copy into a page)
- `(styles live in core/tokens-base.css)` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('hydrate'), Lab.run('imgReveal'), Lab.run('imgParallax')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Wipe: inset(100% 0 0 0) to inset(0), 1.4s power4.inOut (photos.js imgReveal)
- Parallax: +/-7% yPercent
- Grid areas: .gal__a-d in photo-kit/style.css

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
