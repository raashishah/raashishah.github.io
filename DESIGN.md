---
name: Raashi Shah
description: Calm, Apple-minimal personal portfolio for hire and consulting
brand_mutation_veto: spacing_and_touch_targets_locked
colors:
  ink: "#1d1d1f"
  ink-secondary: "#515154"
  ink-tertiary: "#86868b"
  surface: "#faf9f6"
  accent: "#c08081"
  separator: "12% ink mix"
  focus-ring: "42% ink mix"
  accent-focus-ring: "40% accent mix"
dark:
  ink: "#f6f3ee"
  ink-secondary: "#b7afa6"
  ink-tertiary: "#a39890"
  surface: "#201c19"
  surface-elevated: "#2c2824"
  accent: "#d4a3a4"
  separator: "16% ink mix"
  scrim: "64% #0c0b0a"
typography:
  title:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.375rem, 2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1.6vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  subhead:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(0.9375rem, 1.3vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "normal"
  caption:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(0.875rem, 1.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "normal"
rounded:
  control: "4px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
  touch-min: "44px"
components:
  link-primary:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "8px 4px"
    size: "{spacing.touch-min}"
  details-summary:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    fontWeight: 500
    padding: "8px 4px"
    size: "{spacing.touch-min}"
  details-body:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body}"
    padding: "0 0 0 4px"
---

## Overview

Light, top-aligned personal homepage. Near-white eggshell surface (`#faf9f6`), Apple-tinted neutrals, Satoshi type, no cards or hero chrome. Layout: horizontal header (name left, contact nav right), two-column body on wide screens (intro left, expandable lists right), footer socials. Motion is restrained and HIG-aligned: 220ms accordion/detail enter, 160ms exit, 280ms/220ms phone sheet, ease-out on enter, ease-in on exit.

Root `html` font-size is **112.5%** (18px base instead of 16px), so all `rem`-based type tokens render ~12.5% larger than their nominal values. Canonical intro strings live in `lib/metadata.ts` (`siteConfig`) and must match homepage, metadata, and OG image. System dark mode follows `prefers-color-scheme` via semantic token overrides in `app/styles/tokens.css`. Light mode stays eggshell. There is no manual theme toggle.

## Colors (light)

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Primary text | `ink` | `#1d1d1f` | Name, tagline, accordion titles |
| Body text | `ink-secondary` | `#515154` | Dropdown paragraphs, page body copy |
| Muted | `ink-tertiary` | `#86868b` | Role line, footer social links, inline link default |
| Background | `surface` | `#faf9f6` | Page background (eggshell) |
| Accent | `accent` | `#c08081` | Hover/focus, open accordion titles, inline ↗ icons, pullquote borders |
| Separator | `separator` | 12% ink mix | Header and footer rules |
| Focus | `accent-focus-ring` | 40% accent mix | Keyboard focus outlines on interactive elements |

Do not use pure `#000` or `#fff` for UI text/background. `--focus-ring` (42% ink mix) exists but interactive focus uses `--accent-focus-ring`.

## Colors (dark)

Activated by `@media (prefers-color-scheme: dark)`. `:root` sets `color-scheme: light dark` so form controls and scrollbars follow the OS. OG image, photographs, and the coral mark stay as authored. Do not invert them.

Light mode is warm eggshell. Dark mode uses the same warmth at night: ivory text on a brown-black canvas, with the rose lifted so it stays luminous. It is not an invert of the light hex values, and it is not untinted system gray (`#f5f5f7` on `#1a1a1c`).

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Primary text | `ink` | `#f6f3ee` | Ivory. Tagline, accordion titles |
| Body text | `ink-secondary` | `#b7afa6` | Dropdown paragraphs, page body copy |
| Muted | `ink-tertiary` | `#a39890` | Role line, footer, inline link default |
| Background | `surface` | `#201c19` | Warm charcoal page |
| Elevated | `surface-elevated` | `#2c2824` | Phone sheet only. Light mode aliases this to `surface` |
| Accent | `accent` | `#d4a3a4` | Intro name, section headings, hover, icons. Same rose hue as `#c08081`, lifted |
| Separator | `separator` | 16% ink mix | Hairlines. Light mode stays 12% |
| Scrim | `scrim` | 64% `#0c0b0a` | Dims the page behind the sheet. Must not follow `--ink` |
| Focus | `accent-focus-ring` | 40% accent mix | Same formula, new accent |

Contrast on `surface` (and on the elevated sheet): primary about 15:1, body about 7.8:1 (6.8:1 on the sheet), muted about 6:1 (5.2:1 on the sheet), accent about 7.7:1 (6.7:1 on the sheet). `prefers-contrast: more` lightens secondary, tertiary, and the separator further. Browser `theme-color` matches `surface` per scheme.

## Typography

- **Family:** Self-hosted Satoshi variable (`app/fonts/Satoshi-Variable.woff2`) for UI and metadata, fallback to system UI stack. Newsreader (Google, self-hosted via `next/font`) for dictionary lexical copy.
- **Weights:** 500 (medium) for UI, headings, links; 400 (regular) for dropdown body paragraphs.
- **Scale:** Fluid `clamp()` size tokens in `app/styles/tokens.css` (`--text-title` through `--text-caption`).
- **Bundled roles:** Each semantic role bundles size + leading + tracking (`--type-*-size`, `--type-*-leading`, `--type-*-tracking`). Components reference bundles, not raw size + ad hoc leading.
- **Measure:** Intro column max `34ch` (`--home-measure-narrow`); dropdown body max `50ch` (`--home-measure-body`); Rambo portrait `70%` of the intro column (`--home-portrait-width`).
- **OG image:** Static Figma PNG at `app/opengraph-image.png` (light layout; not scheme-aware).

### Apple HIG role map

| Role | Size token | Weight | Color | Used by |
|------|-----------|--------|-------|---------|
| `type-title` | `--text-title` | 500 | `--text` | Header name (`h1`) |
| `type-identity` | `--text-identity` | 600 | `--text` | Dictionary lemma (`decavalent`) |
| `type-headline` | `--text-headline` | 500 | `--text` | Homepage list-section headings |
| `type-headline-inline` | `--text-body` | 500 | `--text` | Accordion summaries, inline links |
| `type-body` | `--text-body` | 400 | `--text` / `--color-body` | Intro name and tagline; intro subline; dropdown paragraphs |
| `type-subhead` | `--text-subhead` | 400 | `--text-muted` | Role, education, updating note, footer links |
| `type-caption` | `--text-caption` | 400 | `--text-muted` | Footer meta |

Sub-pages use `h1` for site name (linked home) and `h2` for page tagline. Homepage keeps tagline as `p` (one `h1` per page).

## Elevation

No shadows on the homepage canvas. Depth comes from typography hierarchy and spacing, not cards or layers. Separators are 1px rules (12% ink in light, 16% in dark). The phone sheet is the only elevated surface: in dark mode it steps lighter than the page (`surface-elevated`) over a dark scrim. The sheet shadow stays a dark cast in both appearances, not a mix of the label color.

## Components

### Header
Flex row, baseline-aligned, bottom border separator. Name uses `title` scale with old rose on hover/focus (Spotify easter egg link). Contact nav: `email me` / `or` / `let's meet sometime` (Calendly) — no underlines; old rose on hover/focus/active. Twitter is footer-only.

### Dictionary masthead
Homepage left column opens with the Decavalent dictionary entry, then a person cluster (byline name + tagline + subline). No extra hairline between them. Desktop masthead uses `--space-7` down to the person/work row. Identity cluster uses `--space-3` (avatar to name, name block to subline, subline to heatmap). Rambo and mentoring sit at the bottom of the left column, just above the footer, with leftover column height between the heatmap and the portrait wrap. Portrait wrap is a column with `--space-5` between Rambo and mentoring. On phones the same pair follows the work list, still last before the footer. On desktop, **Book a session** and the education line share one baseline at the bottom of the columns (`--home-touch-min`, text at the end of the hit box). Education follows the last work group with the same `--space-5` category gap, not a fifth section. **Newsreader** for lemma (600), IPA (400), gloss (500), examples (500 lead / 400 follow, italic), origin label (600) and origin (500). **Satoshi** for `adjective` (700), `[chemistry]` (500 italic), pipes, and `[figurative]` (400 italic). Lemma uses `type-identity`; name is a body-scale byline so it does not compete with `decavalent`.

### Project / job lists
Four HIG grouped-list sections separated by `--space-5` (24px): Agents, Machine Learning, Web apps, Product Management (`home__project-groups` / `.home__list-section`). Rows stay on `--space-1`; category gaps are `--space-5` so groups read apart from projects, without returning to the `--space-7` dictionary break. Section headings use `type-headline` (500, `--text`) via `.home__list-section-heading` — larger than accordion row titles (`type-headline-inline`); no Projects/Experience headings. Rows mix projects and jobs. Each row is a native `<details>` with:
- Summary row: role-focused title at body scale + medium weight + CSS plus icon (44px min height)
- Expand: grid `0fr → 1fr` height (220ms ease-out), body opacity fade
- Collapse: 160ms ease-in; no transition delay on close
- Switching: requested item opens immediately; previous item closes in parallel
- Press feedback: summary colour on next frame via `.home__details--armed`
- Inline body links with `ExternalLinkArrow` ↗ (old rose icon, grey default text); grouped multi-link rows use `·` separators
- Company/product names in body links via `seoName` (e.g. Pluto, OnDevice, Kawa Space, Aula Education)

### Footer
Social links from `content/site.ts` (LinkedIn first). Desktop: text labels only (`home__link--footer`, muted tertiary). Mobile: 8-column icon grid with visually hidden labels; FA brands + legacy Giphy/Medium SVGs via `SocialIcon.tsx`. Meta row: `2026` + coral favicon mark.

### Subpages (`/expression`, `/ondevice`)

Soft navigation from the homepage opens project detail in-context: **bottom sheet** on phone (`< 40rem`), **split view** on desktop/iPad (`≥ 40rem`) with the site tagline staying in the primary column and detail stacking below. Full-page routes remain for SEO, direct links, and crawlers.

**Phone sheet:** dimmed scrim, medium detent (~50dvh) on open, grabber to resize, swipe-down dismiss, Close on leading edge, 44px touch targets, safe-area padding.

**Desktop split:** balanced two-pane grid (`1fr / 1fr`); lists stay interactive on the right; detail enters with `translateX(-12px)` + opacity (220ms ease-out). Active inline link uses `aria-current="page"` (old rose).

**Motion:** transform + opacity only; 220ms open / 160ms close on desktop; phone sheet 280ms enter / 220ms exit; no glass or card chrome. Intercepting routes (`@detail` parallel slot) keep the homepage mounted on soft nav; `router.back()` and Close all dismiss.

**Accessibility gap:** `prefers-reduced-motion` is intentionally not wired; full motion remains on. Documented deviation from the HIG target in `.gstack-design-audit/motion-audit.md`.

Full-page fallback uses `ProjectPage` → `ProjectDetail` inside `SiteShell` — same tokens and typography.

### Motion tokens (in `globals.css`)
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)
- `--ease-in`: cubic-bezier(0.4, 0, 1, 1)
- `--duration-accordion-open`: 220ms
- `--duration-accordion-close`: 160ms
- `--duration-panel-open`: 220ms
- `--duration-panel-close`: 160ms
- `--duration-sheet-open`: 280ms
- `--duration-sheet-close`: 220ms

## Do's and Don'ts

**Do**
- Use the 8pt spacing scale (`--space-1` … `--space-8`)
- Keep 44px minimum touch targets and safe-area padding
- Import intro copy from `siteConfig`; add tests if copy changes
- Match Apple HIG motion: purposeful, asymmetric enter/exit, no bounce
- Use semantic tokens so dark mode inherits automatically

**Don't**
- Add scroll journeys, preloaders, Lenis, custom cursors, or decorative frames
- Use card grids, gradient text, or glassmorphism
- Animate layout with bounce/elastic curves or gratuitous `translateY` slides
- Rewrite CV/project stories heavily or expose excluded projects
- Drift OG/metadata copy away from on-page intro text
- Add a manual light/dark toggle (system preference only)
