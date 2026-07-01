# Motion audit — homepage dropdowns

**Date:** 2026-07-01  
**Scope:** `AnimatedDetails` open/close on all 7 homepage dropdowns (3 projects + 4 jobs)  
**Engine:** CSS grid `0fr` → `1fr` with `--opening` / `--closing` classes

## Apple HIG alignment (current)

| Property | Open | Close |
|----------|------|-------|
| Height | 350ms ease-out (grid `0fr` → `1fr`) | 250ms ease-in (grid `1fr` → `0fr`) |
| Body opacity | 350ms ease-out | 250ms ease-in |
| Disclosure `+`/`×` | 350ms ease-out | 250ms ease-in |
| Engine | Pure CSS transitions on `grid-template-rows` and opacity | Same |

## Implementation notes

- `AnimatedDetails.tsx` toggles `--opening` and `--closing` classes; no JS height measurement.
- Steady open state (`[open]:not(.home__details--closing)`) sets `grid-template-rows: 1fr` and `opacity: 1` without animation classes.
- Timing tokens live in `lib/motion.ts` (`ACCORDION_OPEN_MS` = 350, `ACCORDION_CLOSE_MS` = 250) and match `globals.css` (`--duration-standard`, `--duration-short`).
- `DetailsAccordion` ensures only one dropdown is open at a time.

## Deferred

- `prefers-reduced-motion` not wired (intentional — animations always on per product preference)
