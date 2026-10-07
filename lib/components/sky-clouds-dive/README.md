# Hero dive: clouds part, circle opens into the lab

A pinned hero. Scrolling pulls the clouds apart, pushes the camera in, and opens a dark circle from the bottom of the screen with a statement that lights up word by word. 340% of scroll distance.

## Files
- `markup.html` — the HTML (copy into a page)
- `style.css` — the component styles (imported by `lib/lib.css`)
- effect code: `Lab.run('clouds'), Lab.run('heroPrep'), Lab.run('dive'), Lab.run('heroIn')` in `lib/fx/`
- `demo.html` — standalone preview (serve the ChuksLab folder, open this file)

## Tuning knobs
- Scroll length: end: "+=340%" (sky-clouds-dive.js)
- Cloud travel per layer: 40 / 78 / 118 vw
- Circle: circle(0% at 50% 100%) to circle(150%)

## Needs
GSAP 3.15 + ScrollTrigger, Lenis, `lib/core/core.js`, `lib/generators/clouds.js`.
