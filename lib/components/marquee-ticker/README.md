# Marquee ticker

An infinite ticker band of place names. Pure CSS: duplicate the spans so the loop is seamless.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `` (none, CSS only)
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Speed: animation 32s in style.css
- Colours: --lime band, --forest text

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
