# Motion audit — homepage dropdowns and detail panels

**Date:** 2026-09-21  
**Scope:** Accordion open/close, desktop split detail, phone bottom sheet  
**Reference:** [Type & motion](https://app.notion.com/p/3d6296985c79811e8ae0e5f99425a59c) · [Components & interaction](https://app.notion.com/p/3db296985c7981d78b37f3fe89a1128f)

## Decavalent timing (implemented)

| Interaction | Open / enter | Close / exit | Behaviour |
|-------------|--------------|--------------|-----------|
| Accordion | 220ms ease-out | 160ms ease-in | Grid `0fr` ↔ `1fr` with body opacity |
| Desktop detail | 220ms ease-out | 160ms ease-in | Grid, opacity and `translateX(-12px)` coordinated |
| Phone sheet | 280ms ease-out | 220ms ease-in | Transform travel; drag tracks finger directly |
| Press feedback | Immediate | — | `.home__details--armed` on next frame |

Tokens live in `app/styles/tokens.css` (`--duration-*`) and `lib/motion.ts`.

## Coordination

- **Simultaneous switching:** `DetailsAccordion.prepareOpen` fires the previous close without awaiting it; the requested accordion opens immediately.
- **Interruptible transitions:** `AnimatedDetails` cancels superseded `watchTransition` callbacks and ignores stale completion IDs.
- **Parallel detail close:** Closing contextual detail and opening another accordion run concurrently.
- **Sheet drag:** Pointer transform overrides timed transition during drag; release settles from the current position.

## Accessibility gap (documented deviation)

The HIG target calls for minimising spatial travel under `prefers-reduced-motion`. This site intentionally retains full motion when Reduce Motion is enabled. That deviation is recorded here and in `lib/motion-spec.ts`; it is not certified as accessible motion behaviour.

## Acceptance checks

- [x] First activation produces immediate visible feedback
- [x] Switching begins opening the requested item without waiting for the previous close
- [x] Rapid A → B → C activation leaves only C open, with no delayed reopening
- [x] Repeated activation reverses smoothly from the current position
- [x] Close, Escape and sheet dragging work during entry
- [x] Geometry, opacity and related content visibility settle without a second beat
- [x] Focus, reading position and the desktop work column remain stable
- [ ] Long-content browser recordings at 375px, 768px and desktop width
- [ ] Reduced-motion behaviour validated beyond the documented deviation

## Validation

- Unit tests: `lib/motion.test.ts`
- Jev API check: `node scripts/validate-motion.mjs` (requires `TYPESAFE_API_KEY`)
- Playwright regression: `e2e/motion.spec.ts`
