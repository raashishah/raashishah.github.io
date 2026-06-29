## Learned User Preferences

- **Do not talk to the user in more than 1 sentence at a time unless fully required; when it is required, you can use up to 5 sentences.**
- Prefers simple English; user is a PM transitioning to consulting.
- Build the full site in one pass — no v1/v2 phasing; Next.js App Router confirmed.
- Exclude Bible for Bad People from public listings; preserve legacy social links and custom icons (Giphy, Duolingo SVGs).
- Prefers agent execute deployment, setup, QA (`/gstack-qa`), and design review (`/gstack-design-review`) itself — not ask user to manually test or follow step-by-step instructions.
- Abandoned rashOS scroll-journey and soft-brutalism direction — wants extreme simplicity instead ("fuck all this").
- Current homepage: plain white background, top-aligned, mobile-responsive; horizontal header at all breakpoints (Raashi Shah left, Email + Twitter right, divider), single-column body on small screens / two-column on wider screens (left intro, right expandable project and work-ex lists), 68rem max-width shell, footer with remaining socials and top separator; no preloader, scroll journey, Lenis, custom cursor, or decorative chrome.
- Favicon is legacy rose coral SVG at `public/img/favicon.svg` (#C08081); OG share image is minimal white layout with small uniform type (no decorative frames or oversized headlines).
- Typography: self-hosted Satoshi variable font sitewide; body defaults to regular (400) weight; UI labels medium (500); intro role muted tertiary, tagline at headline scale; smaller readable clamp() sizes (not viewport-filling oversized type).
- Homepage intro copy from `siteConfig` in `lib/metadata.ts`: `introRole` "Technical Product Manager, AI Engineer" + `introTagline` "Designing and developing apps and AI agents end-to-end" — explicitly NOT "Originally a…" / "Now designing…"; e2e and unit tests import `siteConfig` to prevent copy drift/reverts.
- Eight homepage dropdowns via `AnimatedDetails`: 3 projects (Admission Evaluation Agent, Expression, Offline Exhibition Navigation Web App) + 5 jobs (OnDevice, Pluto, Kotak Securities, Kawa Space, Aula Education) as two lists with `home__project-groups` gap (no Projects/Experience section headings); work-ex titles are company name only (e.g. "OnDevice", not "Co-Founder"); all use `+` CSS disclosure pattern; "View project" link after body copy when href exists.
- Apple HIG-level dropdown motion: `AnimatedDetails` client wrapper + CSS tokens (350ms open / 250ms close, opacity-only body reveal, height collapse on close); user explicitly does NOT want `prefers-reduced-motion` to disable site animations.
- Work-ex and project dropdown body copy must be full text from Google Doc CV (`docs/Raashi Shah CV '26.md`) or existing project content — never short placeholders; no em dashes in homepage copy (use commas, colons, plain hyphens); preserve user's copy tone, don't rewrite stories heavily; user edits copy in `SimpleHome.tsx` directly.
- **Never revert user's manual content edits** — only fix syntax/build errors and spelling mistakes; when committing, push their full working file changes, not just lines from the chat.

## Learned Workspace Facts

- Homepage is `components/SimpleHome.tsx` via `app/page.tsx` — header (name + Email/Twitter from `content/site.ts`: `raashishah.work@gmail.com`, `https://x.com/rash_driving`), responsive grid (1 col <40rem, 2 col ≥40rem) with `projects` and `workExperience` arrays as eight `AnimatedDetails` dropdowns in two gap-separated lists (`home__project-groups`, no section headings), footer for remaining `socialLinks`; styles in `app/globals.css` (Apple tinted neutrals, 8pt spacing scale, 44px touch targets, safe-area insets, motion tokens); `viewport` export in `app/layout.tsx`.
- Core stack: Next.js App Router + Vitest (`npm test`) + Playwright e2e (`e2e/home.spec.ts`); npm package `raashishah.com`; runtime deps Next/React only (GSAP, Lenis, Three.js removed).
- Project/job copy inlined in `SimpleHome.tsx` (sourced from `docs/Raashi Shah CV '26.md`); old pink static site, rashOS scroll-journey, `/project/[slug]` pages, and Spotify API routes removed from repo.
- Expression is the official marketing name for the Colourer codebase.
- Git remote github.com/raashishah/raashishah.github.io (workspace: raashishah.com repo).
- Production deploys on Vercel (project `raashishah`, linked to GitHub); push to `main` triggers deploy.
- Root domain DNS is on Squarespace (`@` A → `76.76.21.21` only; `www` CNAME → `cname.vercel-dns.com`); remove stale Firebase A records if apex serves the old site; subdomains like admissions can stay on Firebase.
- Continual-learning via `agents-memory-updater` subagent + incremental transcript index (`.cursor/hooks/state/continual-learning-index.json`); durable prefs/facts only.
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Site metadata in `lib/metadata.ts` (creator "Raashi Shah", `twitterHandle` `@rash_driving`, canonical intro fields); favicon wired in `app/layout.tsx`; dynamic `app/opengraph-image.tsx` via `components/metadata/OgImage.tsx`.
- `PRODUCT.md` and `DESIGN.md` at project root document product purpose and design system (Apple HIG motion/spacing) for agent context.
- Intro copy lives in `siteConfig` (`lib/metadata.ts`); later polish commits have accidentally reverted it — tests should import `siteConfig` not hardcode strings.
