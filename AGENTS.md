## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Build the full site in one pass — no v1/v2 phasing; Next.js App Router confirmed for rashOS.
- Exclude Bible for Bad People from public listings; preserve legacy social links and custom icons (Giphy, Duolingo SVGs).
- Prefers agent execute deployment, setup, QA (`/gstack-qa`), and design review (`/gstack-design-review`) itself — not ask user to manually test or follow step-by-step instructions.
- Dropped the Mac OS shell — scroll-driven journey with Lusion-style cascade (pinned sections, scrub-driven 3D, minimal chrome); GSAP, Three.js, and Lenis approved.
- Design direction: soft brutalism ("Quiet Stage, Loud Work"); nothing small or cute; can't look too soft anywhere; fast meaningful animations; minimal black-line loaders/chrome; direct confident tone — rejects consultant-y copy and self-praise ("work speaks"); awwwards refs landonorris.com, igloo.inc, op.al, lusion.co, Fiddle Digital canvas grid, Duten texture-hover, Petra Garmon brushstroke. Preloader: black coral SVG filling full viewport with transparent old rose bleed into base white; slower soak before clip-path wipe exit.
- Unified palette only: `#f5ede8`, `#111010`, `#c08081`, `#8fa0b4`, `#1a2038` — no per-project color zones, no off-palette brand colors; web-based graphics per project, not stock images.
- Projects without an external site get `/project/[slug]` story pages with smooth transitions; preserve user's copy tone — don't rewrite stories heavily.
- Typography: Cabinet Grotesk (self-hosted) for everything, not Manrope.
- Spotify: live now-playing widget + "listen with me" jam link when playing; OAuth via `/api/spotify/callback`; production redirect `https://raashishah.com/api/spotify/callback`.
- Interaction direction: brushstroke cursor (Petra Garmon ref) with custom states and magnetic hover; footer name interaction (Op.al-style); Igloo-style loop scroll at page end; no footer social scroll marquee.
- Hero copy locked: headline "apps and ai tools designer and engineer" (lowercase, Cabinet Grotesk Bold, ~14vw, minimal decoration); eyebrow "originally a product manager" (lowercase). Hero scene: modular rectangular grid canvas (Fiddle Digital ref) + Duten texture-hover headline; no WebGL, no topographic/SaaS grid lines.

## Learned Workspace Facts

- Site codename **rashOS**; black coral SVG preloader (`components/sections/Preloader.tsx`) → scroll-journey (Hero → 7 pinned project sections → work timeline → connect footer).
- Core stack: Next.js App Router + GSAP (ScrollTrigger, Flip) + Lenis + Vitest (`npm test`) + Playwright e2e (`?e2e=1` skips preloader/Lenis/cursor); all seven project scroll scenes are 2D `Scene2D` (no R3F).
- Project content in `content/projects.ts` (7 entries: admissions, expression, design-pov, pluto, kawa, aula, kotak); detail pages at `app/project/[slug]/` (out of scope for current palette overhaul); unified palette in `lib/palette.ts` (`ColorZoneProvider` removed); `ProjectSceneRouter` — all seven 2D `Scene2D` scenes in `components/scenes/`; Pluto: scroll-driven SVG tiles snap chaos into product grid. Expression: animated line-art character doing a cartwheel (not abstract shapes), ink/white/rose fills. Admissions: ApplicantTable-style UI from admissions-landing with scroll-driven rubric weights. Kawa: rainfall chatbot asking about place names (e.g. Shoreditch), not coordinates.
- Expression is the official marketing name for the Colourer codebase; old OS components removed (`components/os/`, `components/apps/`).
- Git remote github.com/raashishah/raashishah.github.io (workspace: raashishah.com repo); GitHub Pages may lag Vercel; legacy under `legacy/`.
- Production deploys on Vercel (project `raashishah`, linked to GitHub); push to `main` triggers deploy.
- Root domain DNS is on Squarespace (`@` A → `76.76.21.21` only; `www` CNAME → `cname.vercel-dns.com`); remove stale Firebase A records if apex serves the old site; subdomains like admissions can stay on Firebase.
- Continual-learning via `agents-memory-updater` subagent + incremental transcript index (`.cursor/hooks/state/continual-learning-index.json`); durable prefs/facts only.
- `DESIGN.md` is design source of truth for rashOS; PRODUCT.md may lag; ideation in `docs/ideation/`.
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Spotify env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN, SPOTIFY_REDIRECT_URI.
- Site title/description in `lib/metadata.ts` match hero positioning ("apps and ai tools designer and engineer"); dynamic `opengraph-image.tsx` routes.
