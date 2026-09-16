# Motion audit — 2026-09-16

Scope: motion only; preserve brand, copy, spacing and touch targets. Sequential audit per workspace instructions.
Reference: https://developer.apple.com/design/human-interface-guidelines/motion

Findings:
- Detail opening adds its transition after changing the target geometry; first paint can jump.
- Detail keyframes compete with opacity transitions and restart from fixed endpoints on interruption.
- Mounting/unmounting the detail shell adds/removes an unanimated flex gap.
- Portrait fades out during collapse then fades back in, creating an unnecessary second beat.
- Accordion opening has no rendered collapsed baseline; switching waits for the previous close.
- Cancelling accordion transitions leaves their promises unresolved; rapid clicks can race.
- Sheet forwards-filled keyframes override pointer transforms; release snaps to zero, and drag also triggers the resize click.

Plan: use state-driven CSS transitions, establish collapsed geometry before entry, coordinate spacing with expansion, retain the visible portrait, settle cancelled promises, switch rows concurrently, and allow sheet gestures to own their transform.
Product chrome grammar: not applicable to this brand motion scope.

## Verification

- TypeScript and scoped ESLint pass; 18 unit tests pass.
- Chromium: all six motion regression tests pass at 375, 768 and 1280 pixels, including rapid reversals, concurrent switching, portrait visibility and fixed list x-position during collapse, and 1:1 sheet drag plus snap-back without accidental resize.
- Broader homepage run: 50/53 pass. The same three failures reproduce on untouched HEAD a37ab70: two heading colour assertions and a portrait selector expecting a direct child after the earlier wrapper change. They are outside this motion repair.
- Screenshots inspected at 375 and 768; evidence saved under .hig/evidence/motion-*.png.
- Browser verification uses an isolated source copy and clean dependency installation because the workspace dependency tree stalls Next startup. Project configuration and dependency files are unchanged.
- Production deployment not performed.
