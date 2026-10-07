# Header: spinning logo, nav swap, circle menu

Fixed header with a ring of text that spins and speeds up with scroll velocity, nav links that swap letters on hover, a frosted bar after 60px, colour that flips on dark sections ([data-bg="dark"]) and a full-screen menu that opens as a circle on small screens. Built by mountLayout() in js/main.js.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('headerLogo'), Lab.run('headerTheme'), Lab.run('menu')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Base spin speed: 28deg/s (header.js)
- Frosted bar: .hdr::before in style.css
- Text on the ring: the <textPath> in js/main.js ring()

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`.
