# Surface: materials

**Stack:** next (web/CSS) · **Register:** brand (spacing/touch locked) · **Pack:** `foundations-materials.md`

## 1. Apple rule

[Materials](https://developer.apple.com/design/human-interface-guidelines/materials): transient surfaces (sheets, modals) sit on a **functional layer** above content; the layer behind should **recede** so foreground chrome and sheet body stay legible. Materials separate chrome, content, and overlays — not decorative blur stacks.

[Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode): elevated surfaces can step **lighter** than the base background; dimming behind modals stays **dark**, independent of primary label color.

Host canon (`DESIGN.md` § Elevation, § Materials in `.hig/app-design.md`): no glassmorphism, no `backdrop-filter`; phone sheet is the **only** elevated surface; scrim must not follow `--ink`; sheet shadow is a **dark cast** in both appearances.

## 2. What the host does today

| Location | Evidence |
|----------|----------|
| `app/styles/panel.css` `.home__scrim` | `background: color-mix(in srgb, var(--ink) 32%, transparent)` — scrim opacity tracks **label** ink |
| `app/styles/panel.css` `.home__sheet` | `background: var(--bg)` — same token as page (`--bg` → `--surface`) |
| `app/styles/panel.css` `.home__sheet` | `box-shadow: 0 -4px 24px color-mix(in srgb, var(--ink) 8%, transparent)` — shadow tracks ink |
| `app/styles/tokens.css` dark `@media` | Overrides `--ink`, `--ink-secondary`, `--ink-tertiary`, `--surface` only — **no** `--surface-elevated`, `--scrim`, or `--sheet-shadow` |
| `DESIGN.md` | Documents `--surface-elevated` `#2c2824`, `--scrim` 64% `#0c0b0a`, elevation rules — **not wired** in CSS |
| `components/BottomSheet.tsx` | Renders `.home__scrim` / `.home__sheet`; no inline material styles |

**Dark-mode bug (confirmed):** With `--ink: #f5f5f7` (tokens) / `#f6f3ee` (DESIGN target), 32% ink scrim reads as a **light veil**. Sheet on `#1a1a1c` / `#201c19` canvas matches page fill. Shadow mixed from pale ink **glows** upward instead of casting depth.

## 3. Gaps vs pack checklist and chrome

| Check | Status |
|-------|--------|
| No custom opaque bar fill fighting system materials (`chrome.bars.system-materials`) | **Pass** — header/footer are intentional solid content chrome, not faux Liquid Glass bars |
| Glass limited to functional layer + `@supports` fallback (pack web table) | **N/A by host veto** — `DESIGN.md` forbids glass; solid overlay only |
| Reduce Transparency / Increase Contrast considered | **Partial** — scrim/sheet fix improves dark dimming; no `prefers-contrast` tweaks on scrim (optional follow-up, not blocking) |
| No liquid-glass token leakage into content | **Pass** |
| Sheets pack: dimmed scrim, solid fallback for glass | **Fail** — scrim tied to `--ink`; sheet not elevated in dark |
| Elevation canon: dark scrim both modes; elevated sheet in dark; dark shadow | **Fail** — implementation contradicts `DESIGN.md` |

## 4. Proposed in-place edits (critique)

**Verdict on proposed fix: sound — APPLY.**

| Change | Rationale | Caveat |
|--------|-----------|--------|
| `--scrim`: solid `color-mix(in srgb, #0c0b0a 64%, transparent)` (both schemes) | Decouples dim from `--ink`; matches `DESIGN.md`; fixes light veil in dark | Stronger than today’s 32% ink in **light** — intentional per brand doc |
| `--surface-elevated`: light `var(--surface)`; dark `#2c2824` | Sheet reads as a step above warm charcoal canvas | Light mode sheet still matches page fill; separation relies on **border + dark shadow** (canon allows) |
| `.home__sheet { background: var(--surface-elevated) }` | Implements documented elevated role | None |
| `.home__scrim { background: var(--scrim) }` | Single semantic token | Keep existing opacity transition on the element |
| `--sheet-shadow`: fixed dark cast, e.g. `0 -4px 24px color-mix(in srgb, #0c0b0a 8%, transparent)` on `:root` (same both modes) | Shadow no longer inverts in dark | Do **not** use `var(--ink)` in shadow mix |
| No `backdrop-filter` | Required by `DESIGN.md` | Overrides pack’s optional glass overlay recipe — host wins |

**Do not:** change spacing, radii, motion, or sheet structure. **Do not** add glass or secondary translucent layers.

Token definitions belong in `tokens.css` (`:root` + dark block); consumption in `panel.css` only for scrim/sheet/shadow.

## 5. File touch list

| File | Edits |
|------|--------|
| `app/styles/tokens.css` | Add `:root` `--surface-elevated: var(--surface)`, `--scrim`, `--sheet-shadow`; dark block `--surface-elevated: #2c2824` (and align rest of dark palette with `DESIGN.md` if color worker has not landed yet) |
| `app/styles/panel.css` | `.home__scrim` → `var(--scrim)`; `.home__sheet` → `var(--surface-elevated)`; `box-shadow` → `var(--sheet-shadow)` |

**No** changes to `BottomSheet.tsx`, `components/*`, or e2e unless visual assertions need updating (unlikely — structure unchanged).

## 6. Conflicts for synthesizer

| Conflict | Resolution |
|----------|------------|
| **materials vs color** on `tokens.css` dark block | Color owns full warm dark palette (`--ink`, `--surface`, accent); materials owns **elevation trio** (`--surface-elevated`, `--scrim`, `--sheet-shadow`). Merge in one pass or lease `tokens.css` to color with materials edits as a sub-bullet. |
| **materials vs sheets** on `panel.css` | Both surfaces reference sheet/scrim. **Single lease** to materials (this fix) or sheets — not both. |
| **Pack vs host** (glass `@supports` on overlays) | Drop glass proposal; document solid materials as brand lock. |
| **tokens.css vs DESIGN.md** | Live dark values still cool gray (`#f5f5f7` / `#1a1a1c`); warm tokens in `DESIGN.md` are the target — materials fix is valid even before full color migration; elevated/scrim/shadow tokens should use DESIGN values regardless. |

---

**Recommendation:** **APPLY** · **Files:** `app/styles/tokens.css`, `app/styles/panel.css` · **Summary:** Replace ink-derived scrim and sheet fill with semantic dark scrim, `--surface-elevated` sheet, and a fixed dark `--sheet-shadow` so the phone sheet elevates correctly in dark mode without glass.
