## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Build the full site in one pass — no v1/v2 phasing; Next.js App Router confirmed.
- Exclude Bible for Bad People from public listings; preserve legacy social links and custom icons (Giphy, Duolingo SVGs).
- Prefers agent execute deployment, setup, QA (`/gstack-qa`), and design review (`/gstack-design-review`) itself — not ask user to manually test or follow step-by-step instructions.
- Abandoned rashOS scroll-journey and soft-brutalism direction — wants extreme simplicity instead ("fuck all this").
- Current homepage: plain white background, two-column layout (left intro, right expandable project/job list); no preloader, scroll journey, Lenis, custom cursor, or decorative chrome.
- Typography: Inter from Google Fonts — Medium (500) sitewide, Regular (400) in dropdown body text; type large enough to fill the viewport with all dropdowns closed (no tiny 12px sizing).
- Homepage intro copy: "Raashi Shah" / "Originally a Technical Product Manager" / "Now designing and developing apps and AI agents".
- All seven homepage list items (projects and jobs) use the same `+` details/summary dropdown pattern with body copy in Inter Regular.
- Preserve user's copy tone — pull dropdown text from CV or existing project content; don't rewrite stories heavily.
- Projects without an external site may still have `/project/[slug]` story pages in repo (legacy).

## Learned Workspace Facts

- Homepage is `components/SimpleHome.tsx` via `app/page.tsx` — white background, two-column grid, seven `<details>` dropdowns; old scroll-journey stack (`ScrollJourney`, `Preloader`, GSAP scenes, Lenis, brushstroke cursor) remains in repo but is not mounted on `/`.
- Core stack: Next.js App Router + Vitest (`npm test`) + Playwright e2e (`?e2e=1` skips legacy journey behaviors when those routes are tested).
- Project/job copy inlined in `SimpleHome.tsx` (sourced from `content/projects.ts` / CV); legacy `content/projects.ts` and `/project/[slug]/` detail pages still in repo.
- Expression is the official marketing name for the Colourer codebase; old OS components removed (`components/os/`, `components/apps/`).
- Git remote github.com/raashishah/raashishah.github.io (workspace: raashishah.com repo); GitHub Pages may lag Vercel; legacy under `legacy/`.
- Production deploys on Vercel (project `raashishah`, linked to GitHub); push to `main` triggers deploy.
- Root domain DNS is on Squarespace (`@` A → `76.76.21.21` only; `www` CNAME → `cname.vercel-dns.com`); remove stale Firebase A records if apex serves the old site; subdomains like admissions can stay on Firebase.
- Continual-learning via `agents-memory-updater` subagent + incremental transcript index (`.cursor/hooks/state/continual-learning-index.json`); durable prefs/facts only.
- `DESIGN.md` may lag the current minimal homepage pivot; ideation in `docs/ideation/`.
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Site metadata in `lib/metadata.ts` (creator "Raashi Shah"; description still references product manager → apps/AI); dynamic `opengraph-image.tsx` routes.
