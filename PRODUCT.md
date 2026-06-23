# Raashi OS

> A live window into how Raashi thinks, builds, and listens — not a portfolio, an operating system.

## Register

brand

## Users

- Potential consulting clients and collaborators who land from LinkedIn, DMs, or word of mouth
- Recruiters and founders evaluating whether Raashi can both strategize and ship
- Friends and peers who want a peek into how she thinks (music taste, app opinions, random insights)
- Context: mostly mobile, quick scroll, low patience for resume walls

## Product Purpose

**Raashi OS** is a personal site that feels alive: proof that Raashi is a PM who builds real things, plus a running feed of what she's into right now. Not a CV dump — a scrollable set of chapters with one insight per project and role, fragments of personality, and (over time) live modules like now-playing and auto-jams.

Success = someone understands who she is, what she ships, and wants to reach out within 60 seconds. Power users keep scrolling and find easter eggs.

## Brand Personality

- **Direct** — short lines, no fluff
- **Curious** — fragments and easter eggs reward exploration
- **Crafted** — blocky layout, intentional motion, warm but confident
- **Alive** — live Spotify now-playing, easter egg playback, fragments that grow over time

Emotional goal: "She's sharp, she ships, she's interesting — and her site actually reflects that."

## Anti-references

- Generic PM portfolio templates (identical card grids, hero metric blocks, gradient text)
- Resume PDF pasted into a webpage
- Blockchain/crypto positioning from the old site (outdated)
- Bible for Bad People on the projects list (private/planned, not public portfolio yet)
- Modal-heavy UX, glassmorphism cards, side-stripe accent borders
- Stating "I make music" as a service line (SoundCloud link only)
- Calling it a "portfolio" in the UI — it's **Raashi OS**

## Design Principles

1. **Desktop, not document** — widgets for glanceable identity; apps open on stage via dock
2. **Stage Manager focus** — one app in focus, others in left strip; low clutter
3. **Insight before detail** — every project and role leads with one standout line; link for people who want more
4. **Show receipts** — live demo links where they exist; metrics in widgets, not hero-stat blocks
5. **Reward the curious** — menu bar easter egg hint; Spotify link on About window title
6. **Grow over time** — new fragments and live widgets plug into desktop without redesign
7. **Mobile = iOS home** — widget grid + dock; apps open full-screen sheets

## Raashi OS — shell + modules

| Shell element | Behaviour |
|---------------|-----------|
| **Menu bar** | Clock, easter egg hint, live now playing from Spotify API |
| **Widgets** | Photos stack, Spotify Now Playing (live), Fragment, Metrics |
| **Stage + strip** | JBCN, Design POV, Expression, Work, About + fragment apps as added |
| **Dock** | Core five apps above; dock grows when a fragment earns an app icon |
| **Fragments** | Per-item: desktop widget, dock app, or both — decided when content is added |
| **Connect** | Menu bar dropdown + desktop stack icon (legacy social SVGs) |
| **Photos stack** | Desktop icon (pro + casual.jpeg), opens About |
| **Spotify widget** | Custom iOS-style widget; live now-playing + easter egg playback |
| **Mobile** | iOS-style home + sheets + live widgets |

## Raashi OS — app contents (dock)

| App | Content |
|-----|---------|
| **JBCN Admissions** | AI admissions product — insight + link |
| **Design POV** | Exhibition offline nav — insight + link |
| **Expression** | Artist tools (Colourer codebase) — building |
| **Work** | Roles with one-liner insights |
| **About** | Bio + easter egg on title |
| **Fragments** | Each fragment: widget and/or dock app as it fits (music, app loves, notes) |
| **Connect** | Social links via menu bar dropdown + desktop stack (not a dock app) |

## Accessibility & Inclusion

- Target WCAG 2.1 AA for contrast on warm-dark theme
- Respect `prefers-reduced-motion`: disable scroll animations and pulse when set
- Keyboard-navigable links and focus states on all interactive blocks
- No autoplay audio; SoundCloud/Spotify open in new tab or embed with user control

## Tech (agreed)

- **Framework:** Next.js (App Router) — confirmed
- **Motion:** CSS only (`@keyframes`, `transition`, scroll-reveal via Intersection Observer + classes). No Framer Motion, no GSAP unless explicitly added later
- **Weight:** Static pages where possible; minimal client JS; no heavy animation libraries
- **Content:** Markdown/JSON in `content/`; insights written custom by Raashi
- **Deploy:** Build locally, push to GitHub for now. Vercel + custom domain later — no deploy config in repo yet
- **Legacy:** Old HTML site preserved in `/legacy` when implementation starts

## References (what to steal)

| Site | Take |
|------|------|
| nomoredesign.co.uk | Confident typography, clear blocks, professional tone |
| units.gr/units-parkside | Full-width stacked chapters, one topic per viewport, blocky |
| ddott.net | Editorial hierarchy, content as hero |

## Content inventory

### Projects (Now)

| Project | Live URL | Status |
|---------|----------|--------|
| JBCN Admissions | admissions.raashishah.com | Live |
| Design POV | povindex.designpovindia.com | Live |
| Colourer / **Expression** | — | Building (market as Expression) |

### Roles (Then) — featured

Pluto, OnDevice, JBCN/current agentic work, Aula, Kawa Space, Kotak Neo (collapsed or one-liner tier 3)

### Social links (preserve from legacy site)

Giphy, Medium, LinkedIn, GitHub, Spotify playlist, Twitter/X, Duolingo, email — plus SoundCloud (new)

### Easter egg

- Hint near top of page (playful, not explicit)
- "Who I am" heading links to Spotify album (Who Am I — song easter egg from legacy site)
