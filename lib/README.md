# Chuks Lab component library

Reusable scroll/motion components, written for the Chuks Medical Laboratory Center site and built to be reused on any future site.
The site (`index.html`, `about.html`, ...) loads everything from here; `js/main.js` only renders content and decides which effects run.

## Layout
```
lib/
  lib.css                 imports every stylesheet below, in cascade order
  core/                   tokens-base.css (colours, type, buttons)  ·  fallbacks.css  ·  core.js (helpers + effect registry)
  generators/             art.js (canvas artwork)  ·  clouds.js (procedural clouds)
  ../img/                 stand-in photography + CREDITS.md (swap for real CHUKS photos)
  fx/                     effect code, one file per family; each effect = Lab.register('name', fn)  →  Lab.run('name')
  components/<name>/      markup.html · style.css · README.md · demo.html
```

## Components
| Component | What it is |
|---|---|
| preloader-tube-iris | test tube fills + counter, circular iris closes onto the page |
| page-wipe-transition | dark curtain wipes between pages |
| header-nav-menu | spinning ring logo, letter-swap nav, frosted bar, circle menu |
| cursor-progress | lime cursor dot, magnetic buttons, fade-up reveals, progress bar |
| sky-clouds | procedural clouds in back / mid / front layers |
| sky-clouds-dive | pinned hero: clouds part, a circle opens into the lab |
| marquee-ticker | infinite ticker band |
| hscroll-cards | vertical scroll becomes horizontal; generated art cards |
| expanding-grid | four windows grow into a full-screen grid |
| stacking-steps | sticky cards stack and shrink |
| giant-lines-location | huge heading lines slide against each other |
| footer-clip-shrink | word-by-word CTA + footer growing from an inset panel |
| photo-reveal-gallery | photos open with clip-path wipes + parallax |
| image-expand-band | a photo window opens to full screen with a sentence over it |
| photo-strip | row of photos that slides sideways on scroll |
| inner-page-kit | sky header for inner pages + rows, FAQ, facts, form |

## Re-theme it for a different business
1. Colours / fonts: change the variables at the top of `core/tokens-base.css` (`--forest`, `--leaf`, `--lime`, `--sky-*`, `--serif`, `--sans`).
2. Words and facts: edit `js/data.js` (name, location, services, principles, FAQs). Anything left empty shows a "to be confirmed" fallback.
3. Artwork palette: `PAL` in `generators/art.js`. Cloud look: `LAYERS` and the noise settings in `generators/clouds.js`.
4. Motion feel: durations and distances are listed under "Tuning knobs" in each component README.

## Preview a component
Serve the `ChuksLab` folder (`python -m http.server`) and open `lib/components/<name>/demo.html`.

## Notes
- Needs GSAP 3.15 + ScrollTrigger and Lenis from a CDN. Without them (or with reduced-motion) the site falls back to a static, fully readable page.
- `lib/_styles.backup.css` is the single stylesheet from before the split, kept only for reference.
- The separate `Residence/library/` folder is a study of another website's techniques. It is reference material only and is not used or shipped by this site.
