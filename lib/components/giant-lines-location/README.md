# Giant location lines that slide

Oversized heading lines slide in opposite directions as the section scrolls past, over faint clouds on a dark panel.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('clouds'), Lab.run('giantLines')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Slide distance: 14% / 8% xPercent
- Cloud tint: .loc .cl opacity .16 (style.css)

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`, `lib/generators/clouds.js`.
