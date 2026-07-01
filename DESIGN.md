---
name: Raashi Shah
description: Calm, Apple-minimal personal portfolio for hire and consulting
colors:
  ink: "#1d1d1f"
  ink-secondary: "#515154"
  ink-tertiary: "#86868b"
  surface: "#ffffff"
  brand-rose: "#c08081"
  separator: "#1d1d1f1f"
  focus-ring: "#1d1d1f6b"
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

Light, top-aligned personal homepage. White surface, Apple-tinted neutrals, Satoshi type, no cards or hero chrome. Layout: horizontal header (name left, Email + Twitter right), two-column body on wide screens (intro left, expandable lists right), footer socials. Motion is restrained and HIG-aligned: 350ms standard UI, ease-out on enter, ease-in on exit.

Root `html` font-size is 112.5% for slightly larger readable type. Canonical intro strings live in `lib/metadata.ts` (`siteConfig`) and must match homepage, metadata, and OG image.

## Colors

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Primary text | `ink` | `#1d1d1f` | Name, tagline, header links, project titles |
| Muted | `ink-tertiary` | `#86868b` | Footer social links |
| Body text | `ink-secondary` | `#515154` | Role line, dropdown paragraphs |
| Background | `surface` | `#ffffff` | Page and OG background |
| Brand accent | `brand-rose` | `#c08081` | Favicon only (legacy rose coral) |
| Separator | `separator` | 12% ink mix | Header rule |
| Focus | `focus-ring` | 42% ink mix | Keyboard focus outlines |

Do not use pure `#000` or `#fff` for UI text/background. Brand rose is not a UI accent on the current homepage; keep it to favicon/legacy identity.

## Typography

- **Family:** Self-hosted Satoshi variable (`app/fonts/Satoshi-Variable.woff2`), fallback to system UI stack.
- **Weights:** 500 (medium) for UI, headings, links; 400 (regular) for dropdown body paragraphs.
- **Scale:** Fluid `clamp()` tokens in `globals.css` (`--text-title` through `--text-caption`).
- **Measure:** Intro column max ~32ch; dropdown body max ~50ch.
- **OG image:** Self-hosted Satoshi (`Satoshi-Regular.ttf` / `Satoshi-Medium.ttf`, derived from the site variable woff2 for the OG renderer). Type hierarchy mirrors the homepage: name at title scale, muted role, medium tagline, separator rule, domain in footer corner.

## Elevation

No shadows on the homepage. Depth comes from typography hierarchy and spacing, not cards or layers. Separators are 1px rules at 12% ink opacity.

## Components

### Header
Flex row, baseline-aligned, bottom border separator. Name uses `title` scale. Nav links use underline-on-hover (transparent to currentColor, 250ms ease-out).

### Project / job lists
Two groups: 3 projects, then 5 work-experience items, separated by `--space-6`. Each row is a native `<details>` with:
- Summary row: title + CSS plus icon (44px min height)
- Expand: grid `0fr → 1fr` height (350ms ease-out), body opacity fade (no vertical slide)
- Collapse: faster 250ms ease-in; no transition delay on close
- Optional "View project" link with external-tab icon for linked projects

Work-experience titles are company name only (e.g. "OnDevice", not "Cofounder at OnDevice").

### Footer
Remaining social links from `content/site.ts` use `home__link--footer` (muted tertiary, regular weight). Header Email/Twitter stay primary ink. Legacy Giphy/Duolingo SVG icons are planned but not yet wired in the footer UI.

### Motion sidecar (not in YAML)
- `--ease-standard`: cubic-bezier(0.25, 0.1, 0.25, 1)
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)
- `--ease-in`: cubic-bezier(0.4, 0, 1, 1)
- `--duration-press`: 150ms
- `--duration-short`: 250ms
- `--duration-standard`: 350ms
- `prefers-reduced-motion`: all transitions → 0.01ms

## Do's and Don'ts

**Do**
- Use the 8pt spacing scale (`--space-1` … `--space-8`)
- Keep 44px minimum touch targets and safe-area padding
- Import intro copy from `siteConfig`; add tests if copy changes
- Match Apple HIG motion: purposeful, asymmetric enter/exit, no bounce

**Don't**
- Add scroll journeys, preloaders, Lenis, custom cursors, or decorative frames
- Use card grids, gradient text, or glassmorphism
- Animate layout with bounce/elastic curves or gratuitous `translateY` slides
- Rewrite CV/project stories heavily or expose excluded projects
- Drift OG/metadata copy away from on-page intro text
