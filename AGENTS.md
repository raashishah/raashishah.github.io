## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Chose Next.js (App Router) — confirmed for rashOS scaffold.
- Build the full site in one pass — no v1/v2 phasing.
- Exclude Bible for Bad People from public project listings.
- Preserve legacy social links and custom icons (Giphy, Duolingo SVGs) from the old site.
- Now open to GSAP, Three.js, and Lenis for rich scroll-driven interactions (reversed earlier CSS-only stance).
- Dropped the Mac OS shell metaphor — site is a scroll-driven journey, not dock/widgets/stage manager.
- Design direction: warm light base ("Quiet Stage, Loud Work"); personality is direct, confident, funny, not trying to impress; references include landonorris.com, igloo.inc, op.al, lusion.co, nomoredesign.co.uk, units.gr Parkside, and ddott.net.
- Lusion-style scroll cascade is a core requirement — pinned project sections, scrub-driven 3D scenes, minimal chrome.
- Wants web-based graphics (Three.js/canvas hero scenes) per project — not stock images, not hyperlink-only listings.
- Each project owns its color palette zone; base site stays warm paper-white between sections.
- Projects without an external site get dedicated `/project/[slug]` story pages with smooth transitions.
- Preserve user's copy tone — don't rewrite project/work stories heavily.
- Typography: Cabinet Grotesk (self-hosted), not Manrope as primary.
- Spotify: live now-playing widget + "listen with me" jam link when playing; OAuth via `/api/spotify/callback`.
- Wants sparkle cursor, custom cursor states, magnetic hover, footer name interaction (Op.al-style), Igloo-style loop scroll at page end.
- Future widget idea: habit tracker (e.g. protein streak from Apple Health).

## Learned Workspace Facts

- Site codename remains **rashOS** in copy, but architecture is scroll-journey (Hero → 7 pinned project/work sections → work timeline → connect footer).
- Core stack: Next.js App Router + GSAP (ScrollTrigger, Flip) + Three.js (@react-three/fiber) + Lenis smooth scroll.
- Project content in `content/projects.ts` (7 entries: admissions, expression, design-pov, pluto, kawa, aula, kotak); detail pages at `app/project/[slug]/`.
- Per-project palettes in `lib/colors.ts`; scenes in `components/scenes/`.
- Old OS components removed (`components/os/`, `components/apps/`).
- Expression is the official marketing name for the Colourer codebase.
- Git remote is github.com/raashishah/raashishah.github.io; workspace path is the raashishah.com repo.
- raashishah.com is on Firebase Hosting; raashishah.github.io is on GitHub Pages — the two deployments are out of sync.
- Git push updates GitHub Pages only; custom domain requires a separate firebase deploy.
- Planning docs: PRODUCT.md, DESIGN.md (may lag behind implemented direction).
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Next.js scaffold lives in repo root; legacy static site preserved under `legacy/`.
- Design ideation artifacts written to `docs/ideation/` (HTML files).
- Spotify env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN, SPOTIFY_REDIRECT_URI.
