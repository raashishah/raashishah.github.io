# Surface: inclusion

**Stack:** next (web/CSS) · **Register:** brand (spacing/touch locked) · **Pack:** Apple [Inclusion](https://developer.apple.com/design/human-interface-guidelines/inclusion) + [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)  
**Apple:** Readable text at night, system appearance (no manual theme gate), Increase Contrast via semantic tokens, do not rely on color alone for meaning, visible focus, named icon-only controls.

## 1. Apple rule (host-relevant)

- **Dark Mode:** Same information hierarchy as light; elevated sheet can step lighter than the page; artwork and the coral mark stay as authored.
- **Increase Contrast:** When the user enables it, lighten secondary/muted ink and separators within existing hues — token layer only, no new accent hue.
- **Differentiate without color alone:** Activity heatmap levels must remain distinguishable on the warm charcoal canvas, not only at the saturated peak.
- **Focus:** Keyboard users need a focus indicator that meets non-text contrast expectations on the page background.
- **Reduce Motion:** Host keeps full motion by product choice — not an inclusion regression for this pass; document only.
- **VoiceOver / touch:** Footer icon-only links keep hidden text labels; 44px targets stay locked by register veto.

## 2. Contrast confirmation — `DESIGN.md` dark palette

Method: WCAG 2.1 relative luminance on sRGB hex. **AA normal text** threshold **4.5:1**.

| Pair | vs `#201c19` (`surface`) | vs `#2c2824` (`surface-elevated` / sheet) |
|------|---------------------------|-------------------------------------------|
| Muted `--ink-tertiary` **`#a39890`** | **6.00:1 — PASS** | **5.19:1 — PASS** |
| Accent **`#d4a3a4`** (intro name, section headings, link hover) | **7.71:1 — PASS** | **6.67:1 — PASS** |

These match `DESIGN.md` § Colors (dark) (~6:1 / ~5.2:1 muted, ~7.7:1 / ~6.7:1 accent). Tertiary on the sheet is the tightest **text** pair and still clears 4.5:1. **No hue change required** for muted or accent to meet AA on either background.

Primary (`#f6f3ee`) and body (`#b7afa6`) also pass AA on both surfaces (see `.hig/swarm/accessibility.md` §2).

**Live CSS note:** `app/styles/tokens.css` dark block still uses cool grays, not this warm palette — contrast confirmation applies to the **target** values in `DESIGN.md` / `.hig/app-design.md`, not to shipped tokens until the color/accessibility merge lands.

## 3. Inclusion gaps (audit only)

| Check | Status |
|-------|--------|
| Muted + accent text AA on surface and sheet | **Pass** — §2 |
| System dark via `prefers-color-scheme` (no forced light chrome) | **Pass** — token architecture; values wrong until warm dark ships |
| Increase Contrast (`prefers-contrast: more`) | **Gap** — specified in DESIGN / app-design, not in CSS |
| Focus ring vs page (non-text ~3:1) | **Gap** — default 40% accent mix ~2.35:1 on `#201c19` |
| Heatmap low levels on `#201c19` | **Gap** — light α map reads empty; level encoded by intensity |
| `prefers-reduced-motion` | **Documented deviation** — intentional; not wired |
| Icon-only footer names | **Pass** |
| Dynamic Type / larger text | **Partial** — fluid `clamp()` scales; root 112.5% base; no iOS Dynamic Type API on web |

Materials/scrim elevation and solid sheet fills are **materials** + **color** scope (not repeated here).

## 4. Implementation ownership — conflict

**`.hig/swarm/accessibility.md` owns contrast implementation:**

- Warm dark token block in `app/styles/tokens.css`
- Nested `@media (prefers-color-scheme: dark) and (prefers-contrast: more)` for `--ink-secondary`, `--ink-tertiary`, `--separator`, and stronger `--accent-focus-ring` (mixes only)
- Dark heatmap fill ladder (CSS on `.home__cursor-heatmap`, light map in TS unchanged)

**This inclusion surface does not duplicate those edits.** Synthesizer should merge **accessibility** + **color** on `tokens.css` in one pass; inclusion adds no second file touch list.

If a dedicated `accessibility.md` worker is scheduled after this note, treat §4 as **DROP** for inclusion-proposed product diffs — accessibility already documents the same token bumps.

## 5. Verdict for synthesizer

| Outcome | Meaning |
|---------|---------|
| **DROP** (inclusion file edits) | No additional product files beyond accessibility/color/materials leases |
| **APPLY** (design) | Keep `#a39890` and `#d4a3a4` as documented; warm dark palette is inclusion-safe for text AA on page and sheet |

---

**Recommendation:** **DROP**  
**Summary:** Muted `#a39890` and accent `#d4a3a4` both exceed 4.5:1 on `#201c19` and `#2c2824`; ship warm dark via accessibility/color on `tokens.css` only — inclusion does not add competing edits.
