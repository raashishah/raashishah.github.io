# App design

> Dark appearance for the Decavalent homepage. Brand stays in `DESIGN.md`. Layout, spacing, and type weights do not change.

## Navigation model

- Pattern: single scroll landing. Header is a quiet band, not an app toolbar.
- Primary destinations: homepage list, Expression detail in place (`/?detail=expression`).
- Phone vs regular width behavior: bottom sheet under 40rem, split column at 40rem and up. Already shipped. This pass only changes how those layers read in dark mode.

## Screen catalog

| id | route | job | chrome |
|----|-------|-----|--------|
| home | `/` | Hire landing: dictionary, intro, work list, portrait, mentoring | Header + footer. No tab bar |
| expression | `/?detail=expression` | Expression detail in the left column, or a phone sheet | Same header. Sheet on phone |

## Dark appearance

Light eggshell `#faf9f6` and coral `#c08081` stay. Dark mode is the night of that same palette.

| Token | Dark value | Why |
|-------|------------|-----|
| `--surface` | `#201c19` | Warm charcoal. Replaces cool `#1a1a1c` |
| `--surface-elevated` | `#2c2824` | Sheet only. Light mode equals `--surface` |
| `--ink` | `#f6f3ee` | Ivory, not system gray `#f5f5f7` |
| `--ink-secondary` | `#b7afa6` | Body |
| `--ink-tertiary` | `#a39890` | Muted labels, still AA on the sheet |
| `--accent` | `#d4a3a4` | Lifted rose. Light mode stays `#c08081` |
| `--separator` | 16% ink | Hairline still visible on the darker canvas |
| `--scrim` | 64% `#0c0b0a` | Dims. Today's scrim mixes `--ink`, which is pale in dark mode |

`@media (prefers-contrast: more)` in dark mode lightens `--ink-secondary` to `#ddd6ce`, `--ink-tertiary` to `#d4cdc4`, and `--separator` to 32% ink.

Activity heatmap dots stay coral. In dark mode their opacity steps up so the quiet cells do not disappear. Photographs and `coral.svg` are not recolored.

`viewport.themeColor` follows the surface: `#faf9f6` light, `#201c19` dark.

## Interaction states

Unchanged structurally. Hover, press, and current-page states keep using `--accent`. Focus ring stays 40% accent. Text selection stays a light ink wash.

## Materials

- Opaque: page, header, list, split detail. No glass on chrome.
- Sheet: solid `--surface-elevated`. No backdrop blur. `DESIGN.md` forbids glassmorphism.
- Scrim: solid dark dim, both appearances.

## Implementation order

1. Token overrides in `app/styles/tokens.css`.
2. Sheet and scrim in `app/styles/panel.css` consume `--surface-elevated`, `--scrim`, and a dark `--sheet-shadow`.
3. Heatmap circles pick up dark fills from CSS without changing the light hex map.
4. `themeColor` on the viewport export.
5. Document the palette in `DESIGN.md` (done in this package).

## Out of scope

- Spacing, type scale, weights, motion timings, copy.
- A manual light/dark toggle.
- Inverting the OG image, favicon, portrait, or avatar.
- New chrome, cards, or a second color system.
