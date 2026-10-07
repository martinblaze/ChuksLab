# Photo strip that slides sideways

A row of photos in alternating sizes that travels sideways as the section scrolls past, each photo easing from a 1.25x zoom.

## Files
- `markup.html` — the HTML (copy into a page)
- `(styles live in core/tokens-base.css)` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('hydrate'), Lab.run('photoStrip')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Speed: scrub .6 (photos.js photoStrip)
- Sizes: .strip .ph rules in photo-kit/style.css

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
