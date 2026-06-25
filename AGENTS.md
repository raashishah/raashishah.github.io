## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Build the full site in one pass — no v1/v2 phasing; Next.js App Router confirmed for rashOS.
- Exclude Bible for Bad People from public listings; preserve legacy social links and custom icons (Giphy, Duolingo SVGs).
- Prefers agent execute deployment and setup tasks when possible, not just step-by-step instructions.
- Dropped the Mac OS shell — scroll-driven journey with Lusion-style cascade (pinned sections, scrub-driven 3D, minimal chrome); GSAP, Three.js, and Lenis approved.
- Design direction: warm light base ("Quiet Stage, Loud Work"); direct, confident, funny tone; refs include landonorris.com, igloo.inc, op.al, lusion.co, nomoredesign.co.uk, units.gr Parkside, ddott.net.
- Web-based graphics (Three.js/canvas) per project — not stock images or hyperlink-only listings; each project owns its palette zone on warm paper-white base.
- Projects without an external site get `/project/[slug]` story pages with smooth transitions; preserve user's copy tone — don't rewrite stories heavily.
- Typography: Cabinet Grotesk (self-hosted) for everything, not Manrope.
- Spotify: live now-playing widget + "listen with me" jam link when playing; OAuth via `/api/spotify/callback`; production redirect `https://raashishah.com/api/spotify/callback`.
- Wants sparkle cursor, custom cursor states, magnetic hover, footer name interaction (Op.al-style), Igloo-style loop scroll at page end.
- Future widget idea: habit tracker (e.g. protein streak from Apple Health).

## Learned Workspace Facts

- Site codename **rashOS**; architecture is scroll-journey (Hero → 7 pinned project sections → work timeline → connect footer).
- Core stack: Next.js App Router + GSAP (ScrollTrigger, Flip) + Three.js (@react-three/fiber) + Lenis smooth scroll.
- Project content in `content/projects.ts` (7 entries: admissions, expression, design-pov, pluto, kawa, aula, kotak); detail pages at `app/project/[slug]/`; palettes in `lib/colors.ts`; scenes in `components/scenes/`.
- Expression is the official marketing name for the Colourer codebase; old OS components removed (`components/os/`, `components/apps/`).
- Git remote is github.com/raashishah/raashishah.github.io; workspace path is the raashishah.com repo.
- Production deploys on Vercel (project `raashishah`, linked to GitHub); push to `main` triggers deploy.
- Root domain DNS is on Squarespace (`@` A → `76.76.21.21`; `www` CNAME → `cname.vercel-dns.com`); subdomains like admissions can stay on Firebase.
- GitHub Pages (raashishah.github.io) may lag Vercel; legacy static site preserved under `legacy/`.
- Planning docs PRODUCT.md and DESIGN.md may lag behind implementation; design ideation in `docs/ideation/`.
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Spotify env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN, SPOTIFY_REDIRECT_URI.
- Open Graph / share metadata in `lib/metadata.ts` with dynamic `opengraph-image.tsx` routes.
