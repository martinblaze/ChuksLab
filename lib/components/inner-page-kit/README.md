# Inner page header + rows, FAQ, facts, form

The sky-and-clouds page header for inner pages (characters rise from a mask, clouds drift apart on scroll) plus the content blocks used under it: numbered rows with hover art, animated FAQ, fact list, form fields.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('clouds'), Lab.run('innerHero'), Lab.run('innerClouds'), Lab.run('faq')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Header height: min-height 78vh (.phero)
- Row hover: padding-left 1.2rem

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`, `lib/generators/clouds.js`, `lib/generators/art.js`.
