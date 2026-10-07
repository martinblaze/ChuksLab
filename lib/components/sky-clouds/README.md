# Procedural cloud layers

No images: lib/generators/clouds.js paints fractal noise into cloud sprites (lit from the upper left) and places them in back / mid / front layers. Each cloud drifts sideways on its own.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('clouds')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Sprite size and noise: lib/generators/clouds.js sprite()
- Layout of each layer: LAYERS in clouds.js
- Sky gradient: --sky-1/2/3

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`, `lib/generators/clouds.js`.
