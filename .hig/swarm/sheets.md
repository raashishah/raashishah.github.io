APPLY

`app/styles/tokens.css`, `app/styles/panel.css`

Wire `--scrim` and `--surface-elevated` so the phone sheet scrim dims with a fixed dark wash in dark mode (not `color-mix` on `--ink`) and the sheet reads one step lighter than the page, without changing detents, motion, spacing, touch targets, or split-view layout.

## Context

- **Pack:** `patterns-sheets.md` — dimmed scrim, solid overlay material, no glass; dismiss via scrim tap, Close, swipe (`components/BottomSheet.tsx` portal).
- **Apple:** Modal sheet sits above dimmed content; material is opaque and slightly elevated vs the canvas ([Sheets HIG](https://developer.apple.com/design/human-interface-guidelines/sheets)).
- **Brand:** `DESIGN.md` / `.hig/app-design.md` — dark scrim `64% #0c0b0a`; dark sheet `#2c2824` (`surface-elevated`); sheet shadow stays a **dark cast** in both schemes.

## Root cause

```82:112:app/styles/panel.css
.home__scrim {
  background: color-mix(in srgb, var(--ink) 32%, transparent);
}
.home__sheet {
  background: var(--bg);
  box-shadow: 0 -4px 24px color-mix(in srgb, var(--ink) 8%, transparent);
}
```

In dark mode `--ink` is light, so the scrim washes the page pale instead of dimming it; the sheet matches `--bg` with no elevation step; the shadow mixes toward light ink.

## Scope

| In | Out |
|----|-----|
| Scrim fill, sheet background, sheet box-shadow tokens | Height, detents, transform, durations, radii, padding, grabber, header, close target |
| `:root` + `@media (prefers-color-scheme: dark)` tokens | Split view (`.home__detail-shell`, `.home__detail`), cards, blur/glass |
| `panel.css` color properties on `.home__scrim`, `.home__sheet` only | `BottomSheet.tsx`, `DetailPanel`, motion libs |

## `app/styles/tokens.css`

Add semantic tokens (names align with `DESIGN.md`):

**`:root` (light — preserve current sheet/scrim feel)**

- `--surface-elevated: var(--surface);` — sheet same as page in light.
- `--scrim: color-mix(in srgb, var(--ink) 32%, transparent);` — equivalent to today’s scrim.
- `--sheet-shadow: 0 -4px 24px color-mix(in srgb, #0c0b0a 8%, transparent);` — fixed dark cast (replaces ink-mixed shadow).

**`@media (prefers-color-scheme: dark)`**

- `--surface-elevated: #2c2824;` — warm elevated sheet only (page stays `--surface` / `--bg`).
- `--scrim: color-mix(in srgb, #0c0b0a 64%, transparent);` — must **not** reference `--ink`.
- Keep `--sheet-shadow` as the same dark cast (optional: 10–12% `#0c0b0a` if contrast with `#2c2824` needs a hair more separation; do not change blur/spread/offset).

Do not add `@supports (backdrop-filter)` or glass on the sheet.

## `app/styles/panel.css`

Replace color-only properties (no other declarations):

| Selector | Property | Value |
|----------|----------|--------|
| `.home__scrim` | `background` | `var(--scrim)` |
| `.home__sheet` | `background` | `var(--surface-elevated)` |
| `.home__sheet` | `box-shadow` | `var(--sheet-shadow)` |

Leave border (`var(--separator)`), z-index, fixed positioning, height/`max-height`, transitions, and all child sheet classes unchanged.

## Verification

- Dark, phone width: open Expression (or any sheet) — scrim reads as dimmed charcoal behind content; sheet surface visibly lighter than `#201c19` page when brand dark tokens land (today `#1a1a1c` until global dark palette sync).
- Light: scrim and sheet should match pre-change appearance (elevated = surface).
- Desktop ≥40rem: split detail unchanged (no `.home__sheet` on that path).
- No new glass, no card chrome on split view.

## Components (reference only — no edits)

- `components/BottomSheet.tsx` — classes `home__scrim`, `home__sheet`, handle/header/body; behavior unchanged.
