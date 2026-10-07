# CTA words + footer that grows from a panel

The call-to-action sentence reveals word by word. The footer begins as an inset rounded panel and grows to full width as it scrolls into view. Footer HTML comes from js/main.js footerHTML().

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('ctaWords'), Lab.run('footerClip')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Footer start: inset(14% 7% 0 7% round 2.5rem 2.5rem 0 0)
- Word stagger: 0.07s

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
