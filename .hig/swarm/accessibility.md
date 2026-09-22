# Surface: accessibility

**Stack:** next (web/CSS) · **Register:** brand (spacing/touch locked) · **Pack:** `foundations-accessibility.md`  
**Apple:** [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) · [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

## 1. Apple rule (host-relevant)

- Text and essential controls keep readable contrast; do not convey information by color alone.
- Support **Increase Contrast** where the host already uses semantic tokens (no new hues).
- Icon-only controls keep accessible names; focus stays visible (`:focus-visible`).
- **Reduce Motion:** host explicitly keeps animations enabled — do not gate motion on `prefers-reduced-motion`.

## 2. WCAG 2.1 contrast audit — `DESIGN.md` dark palette

Method: relative luminance on sRGB hex pairs. **AA normal text** ≥ 4.5:1 · **AA large text** (≥ 18pt / 14pt bold) ≥ 3:1.

| Role | Hex | vs `#201c19` (surface) | vs `#2c2824` (elevated) |
|------|-----|------------------------|-------------------------|
| `ink` | `#f6f3ee` | **PASS** 15.28:1 | **PASS** 13.21:1 |
| `ink-secondary` | `#b7afa6` | **PASS** 7.81:1 | **PASS** 6.75:1 |
| `ink-tertiary` | `#a39890` | **PASS** 6.00:1 | **PASS** 5.19:1 |
| `accent` (text: intro name, section headings) | `#d4a3a4` | **PASS** 7.71:1 | **PASS** 6.67:1 |

**Verdict:** All four semantic text roles meet **WCAG AA normal** on both canvas and sheet backgrounds. Tertiary on elevated is the tightest text pair (5.19:1) but remains above 4.5:1.

Live `app/styles/tokens.css` dark block still uses cool `#f5f5f7` / `#1a1a1c` — this audit applies to the **proposed warm palette** in `DESIGN.md` / `.hig/app-design.md`, which improves brand consistency without regressing text contrast.

### Non-text / UI component notes (same palette)

| Element | Approx. ratio on `#201c19` | AA UI (3:1) |
|---------|----------------------------|-------------|
| `--accent-focus-ring` (40% `#d4a3a4` mix) | 2.35:1 | **FAIL** |
| `--separator` (16% `#f6f3ee` mix → `#423e3b`) | 1.60:1 | **FAIL** (hairline; not sole information carrier) |
| Full `#c08081` heatmap level 4 dot | 5.35:1 | **PASS** |

Accent as text and as filled icon color on surface passes 3:1 for UI.

## 3. Cursor heatmap — `#C08081` low-alpha on dark canvas

Source: `content/cursor-heatmap.ts` — levels 0–3 use `#C08081` at α `1A` / `29` / `47` / `73` on `#faf9f6` in light mode (quiet cells ≈ 1.1:1 vs paper — intentional).

Composited on **`#201c19`** (same hue, no recolor):

| Level | Light α | Effective fill | vs surface |
|-------|---------|----------------|------------|
| 0 | `1A` (~10%) | `#302624` | 1.15:1 — **effectively invisible** |
| 1 | `29` (~16%) | `#3a2c2a` | 1.27:1 |
| 2 | `47` (~28%) | `#4d3836` | 1.56:1 |
| 3 | `73` (~45%) | `#684948` | 2.12:1 |
| 4 | solid | `#c08081` | 5.35:1 **PASS** |

**Gap:** Activity level is encoded by **fill intensity**. Reusing light hex map on warm charcoal breaks the low bins — violates “do not convey meaning by color alone” in practice (grid reads empty). `.hig/app-design.md` already calls for dark-only opacity steps; keep **`HEATMAP_FILL` unchanged** for light.

**Proposed fix (CSS-only, same `#C08081` hue):** In `@media (prefers-color-scheme: dark)`, override circle fills via custom properties or attribute/class on `.home__cursor-heatmap` (e.g. map level → dark α on `#C08081`):

| Level | Suggested dark α (hex) | vs `#201c19` |
|-------|------------------------|--------------|
| 0 | `40` | ~1.48:1 (visible quiet band; still subtler than light eggshell) |
| 1 | `59` | ~1.77:1 |
| 2 | `73` | ~2.12:1 |
| 3 | `A6` | ~3.04:1 |
| 4 | `FF` (`#c08081`) | 5.35:1 |

Alternative: drive fills from `fillForHeatmapCell` + `color-mix(in srgb, #c08081 X%, transparent)` in a dark-scoped wrapper — do not edit spacing or dot geometry.

Heatmap link remains decorative (`role="presentation"`); parent link needs its accessible name unchanged.

## 4. `prefers-contrast: more` (dark only)

Stay inside existing token hues — no new accent hue.

| Token | Default dark | `more` override (from `.hig/app-design.md`) | vs `#201c19` | vs `#2c2824` |
|-------|--------------|-----------------------------------------------|--------------|--------------|
| `--ink-secondary` | `#b7afa6` | `#ddd6ce` | 11.85:1 **PASS** | 10.23:1 **PASS** |
| `--ink-tertiary` | `#a39890` | `#d4cdc4` | 10.83:1 **PASS** | 9.35:1 **PASS** |
| `--separator` | 16% ink | 32% ink (`#64615d`) | 2.76:1 | 2.39:1 |

**Add (recommended, token-only):** Under `@media (prefers-contrast: more)` nested in dark, strengthen `--accent-focus-ring` without new colors — e.g. `color-mix(in srgb, var(--accent) 55%, transparent)` (~3.26:1 on `#201c19`) or `color-mix(in srgb, var(--ink) 42%, transparent)` (~3.75:1). Do **not** lighten `--accent` for text; it already passes AA.

Do **not** add `prefers-reduced-motion` overrides.

## 5. Gaps vs pack checklist

| Check | Status |
|-------|--------|
| Contrast on primary text / body / muted / accent (dark) | **Pass** — palette in §2 |
| Contrast on filled primary / accent actions | **Pass** for accent text and level-4 dots |
| Focus ring ≥ 3:1 vs page | **Fail** at default 40% accent mix — fix in `prefers-contrast: more` and/or bump default dark ring to ~55% accent mix |
| Heatmap activity discernible in dark | **Fail** until CSS dark fill ladder ships |
| Touch targets 44px | **Out of scope** — register lock |
| Icon-only footer names | **Pass** (existing `.home__footer-label`) |

## 6. File touch list

| File | Edits |
|------|--------|
| `app/styles/tokens.css` | Dark warm palette from `DESIGN.md`; nested `@media (prefers-contrast: more)` for secondary, tertiary, separator, and stronger `--accent-focus-ring` (token mixes only) |
| `app/styles/layout.css` (or heatmap-scoped CSS) | Dark heatmap fill overrides on `.home__cursor-heatmap` circles — keep `content/cursor-heatmap.ts` light map intact |

**No** spacing, touch target, or motion changes. **No** `prefers-reduced-motion` gates.

## 7. Conflicts for synthesizer

| Conflict | Resolution |
|----------|------------|
| **accessibility vs color** on `tokens.css` | Single dark block: color values + contrast media query + focus-ring tweak |
| **accessibility vs layout** on heatmap | CSS override only; optional coordination with color worker for `--accent` consistency (`#d4a3a4` text vs `#c08081` level-4 dot is intentional lift vs solid coral) |

---

**Recommendation:** **APPLY**  
**Files:** `app/styles/tokens.css`, `app/styles/layout.css` (or dedicated heatmap dark fills)  
**Summary:** Adopt the `DESIGN.md` dark text palette — all ink roles and accent pass WCAG AA on `#201c19` and `#2c2824` — and ship dark-only heatmap opacity steps plus a stronger focus ring under `prefers-contrast: more` (and optionally default dark focus ring) using existing token hues only.

**Contrast verdict (WCAG AA normal text):** `ink` **PASS** / **PASS** · `ink-secondary` **PASS** / **PASS** · `ink-tertiary` **PASS** / **PASS** · `accent` **PASS** / **PASS** (surface / elevated).
