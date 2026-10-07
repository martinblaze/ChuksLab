# Stacking step cards

Sticky cards slide up and stack. Cards underneath shrink to 90% and dim as the next one covers them. CSS handles stickiness (--i offset), JS handles the scale.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('stackSteps')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Stack offset: top: calc(var(--hdr) + var(--i) * 1.1rem)
- Shrink: scale .9 + brightness(.86) (never opacity, so text underneath cannot show through)

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
