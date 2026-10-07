# Page wipe transition

Clicking an internal link slides a dark curtain up over the screen (showing the destination name), then navigates. On the next page the curtain wipes away. Needs the curtain element, which the layout adds automatically.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('pageLinks'), Lab.run('wipeIn')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Cover duration: 0.8s, reveal: 1s (preloader-and-wipe.js)
- Curtain colour: --forest
- Uses sessionStorage key chuksWipe so the next page knows to wipe in

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
