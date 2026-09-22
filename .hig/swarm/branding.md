APPLY

## Apple rule (branding + dark mode)

Brand marks and meaning-bearing artwork stay as authored across appearances; do not invert, recolor, or filter logos to “fit” dark mode. Accent brand color should remain recognizable (same hue family) while **luminance** adjusts so rose reads on both eggshell and charcoal. System chrome (`theme-color`) should match the page **surface** for each color scheme so Safari and installed-web UI feel native, not default grey.

- https://developer.apple.com/design/human-interface-guidelines/branding
- https://developer.apple.com/design/human-interface-guidelines/dark-mode

## Host brand (locked)

| Asset / token | Value | Rule |
|---------------|-------|------|
| Type | Satoshi (`app/fonts/Satoshi-Variable.woff2`) | Do not replace |
| Mark | `public/img/coral.svg` (`#C08081`) | Do not recolor; heatmap may reference same hex |
| Favicon / apple touch | `app/icon.png` on eggshell `--bg` + coral | Do not recolor artwork |
| Light `--accent` | `#c08081` | Unchanged in `:root` |
| Dark `--accent` (proposed) | `#d4a3a4` | Same old-rose hue, higher lightness |

Register is **brand**; spacing and touch targets stay vetoed. This surface does not touch layout grid or control metrics.

## Critique: is `#d4a3a4` enough?

**Yes — lift is warranted and sufficient; it is not too close to ivory `#f6f3ee`.**

Measured contrast (WCAG relative luminance):

| Foreground | Background | Ratio | Verdict |
|------------|------------|-------|---------|
| `#c08081` (accent today in dark) | `#201c19` | ~5.35:1 | Fails AA for normal text; marginal for large text only |
| `#d4a3a4` (proposed) | `#201c19` | ~7.71:1 | AA for normal text; matches DESIGN contrast table |
| `#d4a3a4` (proposed) | `#2c2824` (elevated sheet) | ~6.67:1 | AA on sheet |
| `#f6f3ee` (primary ink) | `#201c19` | ~15.3:1 | Primary copy tier |
| `#d4a3a4` on `#f6f3ee` | (not a UI pairing) | ~2.0:1 | Irrelevant — accent and ivory are siblings on `--surface`, not stacked |

**Why lift, not keep light hex:** Intro name (`.home__intro-name`), section labels (`.home__list-section-heading`), links, and pullquote borders all use `--accent` on `--bg`. Leaving `#c08081` on warm charcoal under-brands the name and group labels relative to light mode, where accent-on-surface is ~3:1 but sits beside much darker `--ink` body hierarchy. Dark mode needs the accent to carry **readable** emphasis, not only decoration.

**Ivory proximity:** `#d4a3a4` is clearly rose (G/B ≈ 163–164) vs neutral warm ivory `#f6f3ee` (G/B ≈ 243–238). Side-by-side on `#201c19`, hue reads pink vs paper — not “accent mistaken for body text.” A lighter step (e.g. `#e0b8b9`) would improve separation from ivory but risks washed, cosmetic pink and weaker brand tie to `#c08081`; `#d4a3a4` is the documented sweet spot. Do **not** nudge accent toward ivory to “harmonize”; that collapses the brand tier.

**Coral mark vs CSS accent:** Footer/header mark stays `#C08081` in SVG while UI accent lifts in CSS — correct HIG split (fixed brand asset vs dynamic UI accent). Mark remains slightly deeper than UI accent in dark mode; acceptable and keeps mark recognizable.

## Gap: `theme-color`

`app/layout.tsx` `viewport` export sets width/scale/fit only — no `themeColor`. DESIGN and `.hig/app-design.md` require surface-matched chrome: `#faf9f6` light, `#201c19` dark (same as `--surface` after warm dark lands in tokens). Missing today → mobile browser UI can default to neutral grey and fight eggshell/charcoal brand surfaces.

Use Next.js `Viewport` with scheme-specific values (array + `media: '(prefers-color-scheme: dark)'` when supported); fallback is dual `<meta name="theme-color">` tags in layout if the export API is single-value on this Next version.

## Implementation scope (brand-only)

1. **`app/styles/tokens.css`** — In `@media (prefers-color-scheme: dark)`, set `--accent: #d4a3a4` (and warm ink/surface stack from DESIGN if not already done by color surface). Leave `:root --accent: #c08081`. `--accent-focus-ring` continues `color-mix(in srgb, var(--accent) 40%, transparent)` so focus inherits lifted rose.
2. **`app/layout.tsx`** — Add `themeColor` per scheme aligned to `--surface` (`#faf9f6` / `#201c19`).
3. **Do not edit** `public/img/coral.svg`, `app/icon.png`, font files, or Satoshi wiring.

`e2e/dark-mode.spec.ts` already asserts intro name color equals computed `--accent`; no test hex hardcoding once tokens update.

## Out of scope

Heatmap opacity, scrim, separator %, sheet elevation, full neutral swap — owned by color/material surfaces. Satoshi weights, spacing, copy, OG image, manual theme toggle.

---

**Files:** `app/styles/tokens.css`, `app/layout.tsx`

**One sentence:** Apply warm-dark `--accent` `#d4a3a4` and per-scheme `themeColor` matching `--surface`, keep light `#c08081`, Satoshi, and coral/favicon artwork unchanged.
