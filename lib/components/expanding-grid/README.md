# Four windows expand to a full-screen grid

A 2x2 grid of cards that grows to fill the whole viewport while the gaps and corner radius shrink to zero. Pinned for 130% of scroll.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('expandGrid')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Scroll length: "+=130%" (scroll-sections.js)
- Card colours: .pc:nth-child rules in style.css

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
