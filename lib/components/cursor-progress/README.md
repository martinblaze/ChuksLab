# Cursor dot + scroll progress bar

A lime dot follows the pointer and grows over interactive things; buttons with class .magnetic lean toward the pointer; [data-r] elements fade up on scroll; a thin bar shows page progress.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('cursor'), Lab.run('magnetic'), Lab.run('reveal')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Magnetic strength: 0.25 / 0.35 (interaction.js)
- Dot colour: --lime
- Reveal trigger: top 90%

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
