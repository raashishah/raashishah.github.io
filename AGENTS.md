## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Build the full site in one pass — no v1/v2 phasing; Next.js App Router confirmed.
- Exclude Bible for Bad People from public listings; preserve legacy social links and custom icons (Giphy, Duolingo SVGs).
- Prefers agent execute deployment, setup, QA (`/gstack-qa`), and design review (`/gstack-design-review`) itself — not ask user to manually test or follow step-by-step instructions.
- Abandoned rashOS scroll-journey and soft-brutalism direction — wants extreme simplicity instead ("fuck all this").
- Current homepage: plain white background, top-aligned, mobile-responsive; horizontal header at all breakpoints (Raashi Shah left, Email + Twitter right, divider), single-column body on small screens / two-column on wider screens (left intro, right expandable project/job list), footer with remaining socials; no preloader, scroll journey, Lenis, custom cursor, or decorative chrome.
- Favicon is a black square (`public/img/favicon.png`); OG share image is minimal white layout with small uniform type (no decorative frames or oversized headlines).
- Typography: self-hosted Satoshi variable font sitewide (medium weight on UI, regular in dropdown body text); smaller readable clamp() sizes (not viewport-filling oversized type).
- Homepage intro copy: "Raashi Shah" / "Originally a Technical Product Manager" / "Now designing and developing apps and AI agents".
- All seven homepage list items (projects and jobs) use the same `+` details/summary dropdown pattern with body copy in Satoshi regular weight.
- Preserve user's copy tone — pull dropdown text from user's Google Doc CV or existing project content; don't rewrite stories heavily.

## Learned Workspace Facts

- Homepage is `components/SimpleHome.tsx` via `app/page.tsx` — header (name + Email/Twitter from `content/site.ts`: `raashishah.work@gmail.com`, `https://x.com/rash_driving`), responsive grid (1 col <40rem, 2 col ≥40rem) with seven `<details>` dropdowns, footer for remaining `socialLinks`; styles in `app/globals.css` (44px touch targets, safe-area insets); `viewport` export in `app/layout.tsx`.
- Core stack: Next.js App Router + Vitest (`npm test`) + Playwright e2e (`e2e/home.spec.ts`); npm package `raashishah.com`; runtime deps Next/React only (GSAP, Lenis, Three.js removed).
- Project/job copy inlined in `SimpleHome.tsx` (sourced from CV); old pink static site, rashOS scroll-journey, `/project/[slug]` pages, and Spotify API routes removed from repo.
- Expression is the official marketing name for the Colourer codebase.
- Git remote github.com/raashishah/raashishah.github.io (workspace: raashishah.com repo).
- Production deploys on Vercel (project `raashishah`, linked to GitHub); push to `main` triggers deploy.
- Root domain DNS is on Squarespace (`@` A → `76.76.21.21` only; `www` CNAME → `cname.vercel-dns.com`); remove stale Firebase A records if apex serves the old site; subdomains like admissions can stay on Firebase.
- Continual-learning via `agents-memory-updater` subagent + incremental transcript index (`.cursor/hooks/state/continual-learning-index.json`); durable prefs/facts only.
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Site metadata in `lib/metadata.ts` (creator "Raashi Shah", `twitterHandle` `@rash_driving`; description still references product manager → apps/AI); favicon wired in `app/layout.tsx`; dynamic `app/opengraph-image.tsx` via `components/metadata/OgImage.tsx`.
