# Image band: a photo window opens to full screen

Pinned for 170% of scroll. A rounded window of a photo grows to the full viewport while the picture zooms out from 1.35x and a sentence appears word by word over it.

## Files
- `markup.html` — the HTML (copy into a page)
- `(styles live in core/tokens-base.css)` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('imgExpand')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Window size: inset(18% 26% ...) in photos.js imgExpand
- Overlay darkness: .band__img::after

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
