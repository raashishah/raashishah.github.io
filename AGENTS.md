## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Build the full site in one pass — no v1/v2 phasing.
- Pivoted from Mac OS-shell to scroll-driven journey site; lusion.co cascade is key; igloo.inc loop scroll at footer.
- Cabinet Grotesk (self-hosted) for all typography, replacing Manrope.
- GSAP + React Three Fiber for scroll animations and per-project 3D scenes.
- Light warm mode; voice is straightforward, confident, humorous, artsy; keep user's copy tone.
- References: landonorris.com, igloo.inc, op.al, lusion.co, nomoredesign.co.uk, units.gr Parkside, ddott.net.
- Web-based graphics for every project and work role — not stock images or plain hyperlinks.
- No external site → dedicated project page with FLIP transition and bespoke scene graphics.
- Sparkle hover on interactive elements; custom cursor with magnetic hover on CTAs.
- Spotify now-playing + Join Jam widgets; keep "Who am I" easter egg.
- Exclude Bible for Bad People from public listings; preserve legacy social links and custom icons (Giphy, Duolingo SVGs).

## Learned Workspace Facts

- Site codename "rashOS" — scroll-driven journey homepage with pinned project cascade, not desktop shell.
- 7 projects in cascade: Admissions, Expression, Design POV, Pluto, Kawa, Aula, Kotak.
- Homepage scroll sequence: Hero → Project Cascade → Breathing Moments → Work Timeline → Connect Footer → loop to Hero.
- Animation stack: GSAP (ScrollTrigger, ScrollSmoother, SplitText, Flip), React Three Fiber, Lenis fallback.
- API routes: `/api/now-playing`, `/api/jam`, `/api/spotify/callback`.
- Per-project OKLCH palettes in `lib/colors.ts`; R3F scenes in `components/scenes/`.
- Cabinet Grotesk self-hosted in `public/fonts/`; warm paper-white base design system.
- Connect is footer social section with name hover interaction, not menu-bar dropdown.
- Git remote is github.com/raashishah/raashishah.github.io; workspace path is the raashishah.com repo.
- raashishah.com is on Firebase Hosting; raashishah.github.io is on GitHub Pages — the two deployments are out of sync.
- Git push updates GitHub Pages only; custom domain requires a separate firebase deploy.
- Planning docs: PRODUCT.md, DESIGN.md, WIREFRAME.md, SHAPE-BRIEF.md; content from Second Brain wiki.
