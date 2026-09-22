APPLY

## HIG register (brand · images)

Per [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode): photographs and full-color brand marks stay as authored — no inversion, no automatic recolor, no `filter` / `mix-blend-mode` that shifts pixel values. Per [Images](https://developer.apple.com/design/human-interface-guidelines/images): photos use natural rendering (`object-fit: cover`, rounded corners only); vector brand mark (`public/img/coral.svg`, `#C08081` paths) is referenced verbatim in header/footer via `content/site.ts` → `SiteShell`.

| Asset | Source | Dark-mode rule |
|-------|--------|----------------|
| Cursor avatar | `next/image` → `/img/raashi.jpg`, `.home__intro-profile-avatar` | No CSS colour/filter overrides |
| Rambo portrait | `HomePortrait` → `/img/rambo.jpg`, `.home__portrait-image` | Same |
| Coral mark | `/img/coral.svg` inline paths | Same; do not swap to `--accent` in dark |
| OG / favicon | Static PNG/SVG exports | Out of scope (already documented in `DESIGN.md`) |

## Problem

`content/cursor-heatmap.ts` bakes light-background fills as `#C08081` + alpha (`1A` ≈ 10%, `29` ≈ 16%, `47` ≈ 28%, `73` ≈ 45%, full `4`). `CursorHeatmapSvg` sets those as SVG `fill` presentation attributes. On dark `--surface` (`#1a1a1c` today; `#201c19` in `.hig/app-design.md`), levels 0–2 read as empty grid noise; level 3 is weak. This is a **data-visualisation on tinted canvas** issue, not a photo-inversion issue — HIG allows boosting contrast for UI graphics while leaving photos untouched.

Light hex map in `HEATMAP_FILL` and `lib/cursor-heatmap.test.ts` expectations must remain unchanged.

## Proposed fix (dark-only CSS)

**1. Tag levels in SVG (minimal TS)**

In `components/CursorHeatmapSvg.tsx`, add `data-level={cell}` on each `<circle>` (cell is `"0"`–`"4"`). Keep `fill={fill}` from `fillForHeatmapCell` so light mode is unchanged and tests stay green.

**2. Override fills under `prefers-color-scheme: dark`**

Add rules in `app/styles/layout.css` next to existing `.home__cursor-heatmap` sizing (or a small `app/styles/heatmap.css` imported from `globals.css`). CSS `fill` overrides SVG presentation attributes without `!important`.

Use semantic accent so dark lifted rose (`--accent` in future token pass) tracks automatically:

```css
@media (prefers-color-scheme: dark) {
  .home__cursor-heatmap circle[data-level="0"] {
    fill: color-mix(in srgb, var(--accent) 24%, transparent);
  }
  .home__cursor-heatmap circle[data-level="1"] {
    fill: color-mix(in srgb, var(--accent) 34%, transparent);
  }
  .home__cursor-heatmap circle[data-level="2"] {
    fill: color-mix(in srgb, var(--accent) 48%, transparent);
  }
  .home__cursor-heatmap circle[data-level="3"] {
    fill: color-mix(in srgb, var(--accent) 66%, transparent);
  }
  .home__cursor-heatmap circle[data-level="4"] {
    fill: var(--accent);
  }
}
```

Relative step ratios mirror the light 10 / 16 / 28 / 45 / 100 progression (~2.4× floor alpha) so quiet weeks stay quieter than peak weeks on charcoal. Tune percentages once against final `--surface` and `--accent` from the dark token table in `.hig/app-design.md`.

**Alternative (CSS variables on the SVG root):** define `--heatmap-fill-0` … `--heatmap-fill-4` in `:root` mirroring current hex alphas, and dark overrides only inside `@media (prefers-color-scheme: dark)`. Requires changing circles to `fill="var(--heatmap-fill-0)"` etc. in TS — more moving parts than `data-level` + attribute selectors; prefer `data-level` unless other surfaces need the same tokens.

**Explicit non-changes**

- Do not edit `HEATMAP_FILL`, `fillForHeatmapCell`, or photograph/mark assets.
- Do not add `prefers-color-scheme: dark` rules on `.home__intro-profile-avatar`, `.home__portrait-image`, or `.home__footer-mark`.

**Optional verification**

- Extend `e2e/dark-mode.spec.ts`: one assertion that a level-0 circle’s computed `fill` differs from light (or alpha channel is higher) while avatar `filter` stays `none`.

## Files

`components/CursorHeatmapSvg.tsx`, `app/styles/layout.css` (or `app/styles/heatmap.css` + `app/globals.css` import); optionally `e2e/dark-mode.spec.ts`.

## Verdict sentence

Apply `data-level` on heatmap circles plus dark-only `fill` overrides via `color-mix` on `--accent`, leaving `cursor-heatmap.ts` light hexes and all photographs/coral.svg untouched per HIG.
