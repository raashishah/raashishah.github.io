# Surface: color (register: brand)

## Apple rule

Semantic color roles communicate hierarchy and state; light and dark are both first-class via the system appearance (`prefers-color-scheme`), with brand-tinted neutrals—not pure black/white or a grey veil over light chrome. Photographs and meaning-bearing artwork stay as authored (no inversion). Contrast must hold for text and essential controls (WCAG AA). One accent used sparingly; separators and fills stay quieter than text.

- https://developer.apple.com/design/human-interface-guidelines/color
- https://developer.apple.com/design/human-interface-guidelines/dark-mode

## What the host does today

| Area | Files | Behavior |
|------|-------|----------|
| Semantic tokens (light) | `app/styles/tokens.css` `:root` | Warm eggshell `--surface` `#faf9f6`, Apple-tinted `--ink` stack, `--accent` `#c08081`, `--separator` 12% `--ink`, `--accent-focus-ring` 40% accent. Aliases: `--text`, `--bg`, `--color-body`, `--text-muted`. |
| Dark overrides | `app/styles/tokens.css` `@media (prefers-color-scheme: dark)` | Only four overrides: cool system gray labels (`--ink` `#f5f5f7`, secondary `#aeaeb2`, tertiary `#8e8e93`) and `--surface` `#1a1a1c`. `--accent` unchanged. No `--surface-elevated`, `--scrim`, dark `--separator`, `prefers-contrast: more`, or dark selection tweak. |
| Chrome consumption | `app/styles/layout.css`, `accordion.css`, `footer.css`, `mentoring.css`, `panel.css`, `dictionary.css` | Components use `var(--text)`, `var(--accent)`, `var(--separator)`, etc.—no dark-specific hex in these files. |
| Phone sheet + scrim | `app/styles/panel.css` | Sheet `background: var(--bg)` (same as page). Scrim `color-mix(in srgb, var(--ink) 32%, transparent)`—in dark mode `--ink` is pale, so the dim reads as a light wash, not a dim. Sheet shadow `color-mix(in srgb, var(--ink) 8%, transparent)`—same inversion risk. |
| Heatmap | `content/cursor-heatmap.ts`, `components/CursorHeatmapSvg.tsx` | Inline hex fills from coral `#C08081` with alpha steps; not tied to `--accent` or dark appearance. Quiet cells may disappear on `#201c19`. |
| Spec / design truth | `DESIGN.md`, `.hig/app-design.md` | Document warm dark palette, elevated sheet, scrim, lifted accent, 16% separator, contrast table, heatmap opacity bump, `theme-color` per scheme. |
| Tests | `e2e/dark-mode.spec.ts` | Assert computed colors match CSS variables (token-driven)—will follow token edits without hardcoded hex. |
| Viewport chrome | `app/layout.tsx` | `viewport` export has no `themeColor` (DESIGN expects `#faf9f6` / `#201c19`). |
| Media | `public/img/coral.svg`, portraits, OG | Authored assets; not CSS-filtered (correct per HIG). |

Light mode matches DESIGN.md. Dark mode in CSS is a partial, cool-gray placeholder that contradicts the documented warm brand night.

## Gaps

1. **Wrong dark neutrals** — Implemented `#f5f5f7` / `#aeaeb2` / `#8e8e93` on `#1a1a1c` vs specified `#f6f3ee` / `#b7afa6` / `#a39890` on `#201c19`.
2. **Accent not lifted in dark** — `--accent` stays `#c08081`; DESIGN / `.hig/app-design.md` require `#d4a3a4` (same hue, higher luminance for AA on charcoal).
3. **Missing tokens** — No `--surface-elevated`, `--scrim`, or light-mode alias `surface-elevated` → `surface`.
4. **Separator** — Global 12% `--ink`; dark should be 16% (and 32% under `prefers-contrast: more`).
5. **Scrim / sheet / shadow** — Scrim and sheet shadow derive from `--ink`; breaks dark dimming and elevation story. Sheet should use `--surface-elevated` on phone only.
6. **`prefers-contrast: more`** — Documented in DESIGN / app-design; not in CSS.
7. **`theme-color`** — Not set on viewport export.
8. **Heatmap** — Static low-alpha fills; no dark opacity step (app-design § Dark appearance).
9. **Selection** — `::selection` uses 12% `--ink` globally; acceptable but verify on warm dark surface after token swap (no change required unless contrast fails visually).

Out of scope (by brief): spacing, touch targets, glass, manual theme toggle, photo/OG inversion.

## Proposed in-place edits

### 1. `app/styles/tokens.css`

**`:root` (add, do not change spacing/touch tokens):**

```css
--surface-elevated: var(--surface);
--scrim: color-mix(in srgb, #0c0b0a 64%, transparent);
--sheet-shadow: 0 -4px 24px color-mix(in srgb, #0c0b0a 24%, transparent);
```

Keep existing light values. Optional: document that `--separator` stays 12% until dark block overrides.

**Replace / extend `@media (prefers-color-scheme: dark)` block:**

```css
:root {
  color-scheme: dark;
  --ink: #f6f3ee;
  --ink-secondary: #b7afa6;
  --ink-tertiary: #a39890;
  --surface: #201c19;
  --surface-elevated: #2c2824;
  --accent: #d4a3a4;
  --separator: color-mix(in srgb, var(--ink) 16%, transparent);
  --scrim: color-mix(in srgb, #0c0b0a 64%, transparent);
  /* --accent-focus-ring recomputes from new --accent via existing formula */
}
```

**Add nested block:**

```css
@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  :root {
    --ink-secondary: #ddd6ce;
    --ink-tertiary: #d4cdc4;
    --separator: color-mix(in srgb, var(--ink) 32%, transparent);
  }
}
```

Do not add a theme class toggle. Do not change `--ink-on-accent` / `--text-on-accent` unless a filled accent control fails AA in dark (audit mentoring/checkout UI after accent lift).

### 2. `app/styles/panel.css`

- `.home__scrim`: `background: var(--scrim);` (remove `color-mix` on `--ink`).
- `.home__sheet`: `background: var(--surface-elevated);` (not `var(--bg)`), so light mode still matches page via alias.
- `.home__sheet` `box-shadow`: use `var(--sheet-shadow)` from tokens (single dark cast in both schemes per DESIGN).

Split-view `.home__detail` can remain on `--surface` / default page background—only the phone sheet elevates.

### 3. Heatmap (dark visibility)

Prefer **CSS-only** if possible: e.g. `@media (prefers-color-scheme: dark) .home__cursor-heatmap circle { opacity: … }` with per-level or uniform bump, **or** extend `fillForHeatmapCell` / `HEATMAP_FILL` with a dark map keyed off `matchMedia` in the SVG component—app-design allows either; CSS opacity is smaller diff if levels stay readable.

Do not recolor photographs or change light hex map semantics.

### 4. `app/layout.tsx`

Add viewport `themeColor` with `media` queries per Next.js `Viewport` API, e.g. light `#faf9f6`, dark `#201c19` (match `--surface`). If the framework only accepts one static value, use the light surface and add a client `<meta name="theme-color">` with `media="(prefers-color-scheme: dark)"` in layout head—verify against current Next 15 `Viewport` shape.

### 5. Tests (when implementing)

- Extend `e2e/dark-mode.spec.ts` (optional): assert `--surface-elevated` on open sheet at mobile width, scrim computed color not equal to pale ink mix.
- No unit test hex hardcoding unless adding heatmap-specific assertions.

**Do not edit:** `DESIGN.md` / `.hig/app-design.md` for this swarm pass (already correct). Do not touch spacing, motion, or glass.

## File touch list

| File | Change |
|------|--------|
| `app/styles/tokens.css` | Warm dark overrides, `--surface-elevated`, `--scrim`, `--sheet-shadow`, dark separator, `prefers-contrast: more` |
| `app/styles/panel.css` | Scrim, sheet background, sheet shadow tokens |
| `app/layout.tsx` | `themeColor` per color scheme |
| `content/cursor-heatmap.ts` and/or `app/styles/layout.css` | Dark heatmap visibility (one approach) |
| `e2e/dark-mode.spec.ts` | Optional sheet/scrim assertions |

## Conflicts

| Conflict | Resolution |
|----------|------------|
| `.cursor/plans/dark_mode_system_126e9620.plan.md` still describes cool `#1a1a1c` / `#f5f5f7` | Superseded by `DESIGN.md` + `.hig/app-design.md`; implement warm palette, ignore plan hex. |
| Scrim today = 32% `--ink` in `panel.css` vs DESIGN 64% `#0c0b0a` | Replace with `--scrim` token; do not tune 32% ink mix in dark. |
| Sheet `var(--bg)` equals page in dark—no elevation | Use `--surface-elevated` on sheet only; light alias keeps flat UI. |
| Heatmap hex in TS vs CSS variables | Brand coral stays `#c08081` in light fills; dark may need higher alpha or CSS opacity—avoid duplicating accent `#d4a3a4` in heatmap unless DESIGN explicitly ties heatmap to lifted accent (app-design says coral dots, opacity steps). |
| `register: brand` + `brand_mutation_veto: spacing_and_touch_targets_locked` | Color-only diff; no `--space-*` or `--home-touch-min` changes. |
| Swarm cap / materials surface | `foundations-materials` verified separately; this pass is opaque sheet + scrim (no blur)—aligned with DESIGN “no glass”. |
| E2e reads tokens dynamically | Passing today with wrong hex; will pass after token update without assertion changes unless adding sheet/scrim cases. |
