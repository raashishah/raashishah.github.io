## Learned User Preferences

- Prefers simple English; user is a PM transitioning to consulting.
- Chose Next.js (App Router) — confirmed for Raashi OS scaffold.
- Fragments are flexible: each can be a desktop widget, dock app, or both as content is added.
- Use CSS-only animations; keep the site lightweight (no Framer Motion/GSAP in initial build).
- Build the full site in one pass — no v1/v2 phasing.
- Exclude Bible for Bad People from public project listings.
- Preserve legacy social links and custom icons (Giphy, Duolingo SVGs) from the old site.
- Keep the Spotify "Who am I" easter egg; add a subtle hint near the top that something is hidden on the site.
- Replace the old "I make music" section with a SoundCloud link in the social row.
- Design direction: Liquid Glass shell (menu bar, dock, widgets); warm-dark palette; blocky readable layouts inside apps; references include nomoredesign.co.uk, units.gr Parkside, and ddott.net.
- Use Manrope (Google Font) as typography fallback on non-Apple devices (`-apple-system` on Apple).

## Learned Workspace Facts

- Site rebuild codenamed "Raashi OS" — Mac-inspired desktop shell (dock, stacks, Spotify widget, menu-bar Connect).
- Core dock apps: JBCN Admissions, Design POV, Expression, Work, About — one app per major project (not a grouped Projects app).
- Expression is the official marketing name for the Colourer codebase.
- Connect is menu bar dropdown + desktop stack, not a dock app.
- Git remote is github.com/raashishah/raashishah.github.io; workspace path is the raashishah.com repo.
- raashishah.com is on Firebase Hosting; raashishah.github.io is on GitHub Pages — the two deployments are out of sync.
- Git push updates GitHub Pages only; custom domain requires a separate firebase deploy.
- Planning docs: PRODUCT.md, DESIGN.md, WIREFRAME.md, SHAPE-BRIEF.md.
- Rebuild content sourced from Second Brain wiki (/Users/raash/Documents/Second Brain).
- Next.js scaffold lives in repo root; legacy static site preserved under `legacy/`.
