---
name: Raashi Shah
description: Calm, Apple-minimal personal portfolio for hire and consulting
colors:
  ink: "#1d1d1f"
  ink-secondary: "#515154"
  ink-tertiary: "#86868b"
  surface: "#faf9f6"
  accent: "#c08081"
  separator: "12% ink mix"
  focus-ring: "42% ink mix"
  accent-focus-ring: "40% accent mix"
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
    typography: "{typography.headline}"
    padding: "8px 4px"
    size: "{spacing.touch-min}"
  details-body:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body}"
    padding: "0 0 0 4px"
---

## Overview

Light, top-aligned personal homepage. Near-white eggshell surface (`#faf9f6`), Apple-tinted neutrals, Satoshi type, no cards or hero chrome. Layout: horizontal header (name left, contact nav right), two-column body on wide screens (intro left, expandable lists right), footer socials. Motion is restrained and HIG-aligned: 350ms standard UI, ease-out on enter, ease-in on exit.

Root `html` font-size is 112.5% for slightly larger readable type. Canonical intro strings live in `lib/metadata.ts` (`siteConfig`) and must match homepage, metadata, and OG image. System dark mode follows `prefers-color-scheme` via semantic token overrides in `globals.css`.

## Colors (light)

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Primary text | `ink` | `#1d1d1f` | Name, tagline, project titles |
| Body text | `ink-secondary` | `#515154` | Dropdown paragraphs, page body copy |
| Muted | `ink-tertiary` | `#86868b` | Role line, footer social links, inline link default |
| Background | `surface` | `#faf9f6` | Page background (eggshell) |
| Accent | `accent` | `#c08081` | Hover/focus, open accordion titles, inline ↗ icons, pullquote borders |
| Separator | `separator` | 12% ink mix | Header and footer rules |
| Focus | `accent-focus-ring` | 40% accent mix | Keyboard focus outlines on interactive elements |

Do not use pure `#000` or `#fff` for UI text/background. `--focus-ring` (42% ink mix) exists but interactive focus uses `--accent-focus-ring`.

## Colors (dark)

Activated by `@media (prefers-color-scheme: dark)`. `:root` sets `color-scheme: light dark` so form controls and scrollbars follow the OS. OG image stays light.

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Primary text | `ink` | `#f5f5f7` | Name, tagline, project titles |
| Body text | `ink-secondary` | `#aeaeb2` | Dropdown paragraphs, page body copy |
| Muted | `ink-tertiary` | `#8e8e93` | Role line, footer social links, inline link default |
| Background | `surface` | `#1a1a1c` | Page background (tinted dark) |
| Accent | `accent` | `#c08081` | Unchanged — old rose coral |
| Separator | `separator` | 12% ink mix | Auto-adjusts via `color-mix` |
| Focus | `accent-focus-ring` | 40% accent mix | Unchanged |

## Typography

- **Family:** Self-hosted Satoshi variable (`app/fonts/Satoshi-Variable.woff2`), fallback to system UI stack.
- **Weights:** 500 (medium) for UI, headings, links; 400 (regular) for dropdown body paragraphs.
- **Scale:** Fluid `clamp()` tokens in `globals.css` (`--text-title` through `--text-caption`).
- **Measure:** Intro column max `34ch` (`--home-measure-narrow`); dropdown body max `50ch` (`--home-measure-body`).
- **OG image:** Static Figma PNG at `app/opengraph-image.png` (light layout; not scheme-aware).

## Elevation

No shadows on the homepage. Depth comes from typography hierarchy and spacing, not cards or layers. Separators are 1px rules at 12% ink opacity.

## Components

### Header
Flex row, baseline-aligned, bottom border separator. Name uses `title` scale with old rose on hover/focus (Spotify easter egg link). Contact nav: `email me` / `or` / `let's meet sometime` (Calendly) — no underlines; old rose on hover/focus/active. Twitter is footer-only.

### Project / job lists
Two groups separated by `--space-7` (48px): 3 projects (`home__project-groups`), then 4 jobs (`home__experience-groups`). No section headings. Static education line below jobs (`BSc in Product, from Aston, UK`). Each row is a native `<details>` with:
- Summary row: role-focused title + CSS plus icon (44px min height)
- Expand: grid `0fr → 1fr` height (350ms ease-out), body opacity fade
- Collapse: 250ms ease-in; no transition delay on close
- Inline body links with `ExternalLinkArrow` ↗ (old rose icon, grey default text); grouped multi-link rows use `·` separators
- Company/product names in body links via `seoName` (e.g. Pluto, OnDevice, Kawa Space, Aula Education)

### Footer
Social links from `content/site.ts` (LinkedIn first). Desktop: text labels only (`home__link--footer`, muted tertiary). Mobile: 8-column icon grid with visually hidden labels; FA brands + legacy Giphy/Medium SVGs via `SocialIcon.tsx`. Meta row: `2026` + coral favicon mark.

### Subpages (`/expression`, `/ondevice`)
Minimal `ProjectPage` layout inside `SiteShell` — same tokens and typography, not homepage clones.

### Motion tokens (in `globals.css`)
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)
- `--ease-in`: cubic-bezier(0.4, 0, 1, 1)
- `--duration-short`: 250ms
- `--duration-standard`: 350ms

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
