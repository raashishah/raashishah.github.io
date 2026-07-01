# Motion audit — homepage dropdowns

**Date:** 2026-06-30  
**Scope:** `AnimatedDetails` open/close on all 8 homepage dropdowns  
**Design score (motion):** D → B (after fix)

## First impression

Calm, competent layout. Before the fix, dropdowns flashed open for a frame, then re-animated — felt broken, not Apple-native.

## Findings fixed

### FINDING-005 (high): Accordion switch open felt snappy vs gentle close

**Cause:** Open used JS height animation with ease-out (fast initial expansion), so content appeared quickly. Close used opacity fade + height collapse (250ms ease-in), which felt softer. Open and close were using the same height engine but opposite perceptual weight.

**Fix:** Open now matches design spec — layout height sets immediately, body reveals via 350ms opacity fade only. Close unchanged (250ms height collapse + opacity).

| Property | Open | Close |
|----------|------|-------|
| Height | Instant (measured) | 250ms ease-in (JS) |
| Body opacity | 350ms ease-out | 250ms ease-in |
| Disclosure | 350ms ease-out | 250ms ease-in |

### FINDING-001 (high): Open flash before animation

**Cause:** `details.open = true` ran before `--animating`, so CSS `grid-template-rows: 1fr` expanded content instantly for 1–2 frames.

**Fix:** Measure height while closed → add `--animating` → set `open` → JS height 0→target. Steady-state grid only applies when `:not(.home__details--animating)`.

### FINDING-002 (medium): Disclosure icon out of sync on close

**Cause:** `+` → `×` rotation used 350ms on close while body/height used 250ms.

**Fix:** Closing disclosure uses `--duration-short` (250ms) + `--ease-in`.

### FINDING-003 (medium): Wrong easing on disclosure open

**Cause:** `ease-standard` (ease-in-out) on enter; Apple HIG uses ease-out for reveal.

**Fix:** Disclosure transform uses `--ease-out` on open.

### FINDING-004 (medium): Body opacity flashed on open

**Cause:** `[open]` rule set `opacity: 1` immediately, before height animation.

**Fix:** Opacity fade only during `--animating` open (350ms ease-out); steady open state skips animation class.

## Apple HIG alignment (current)

| Property | Open | Close |
|----------|------|-------|
| Height | Instant layout (measured) | 250ms ease-in (JS pixel height) |
| Body opacity | 350ms ease-out | 250ms ease-in |
| Disclosure | 350ms ease-out | 250ms ease-in |
| Engine | Opacity reveal on open; height collapse on close | Same |

## Quick wins (done)

1. Eliminate open flash (measure → animate → open)
2. Sync disclosure close to 250ms
3. ease-out on all enter transitions
4. Opacity tied to animating state, not bare `[open]`

## Deferred

- `prefers-reduced-motion` not wired (user preference: keep animations on per AGENTS.md)
