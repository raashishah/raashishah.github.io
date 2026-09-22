DROP

Motion for this pass is timing-only: `app/styles/tokens.css` exposes `--ease-in`, `--ease-out`, and semantic `--duration-*` tokens; `lib/motion.ts` mirrors those milliseconds for `watchTransition` and sheet/panel/accordion JS. Neither file sets colour or appearance, and `.hig/app-design.md` already locks motion timings out of warm dark-mode scope. Dark-mode brand work belongs on surface/scrim tokens and panel chrome, not on retuning easings or durations—changing this surface would violate the rule that dark mode must not alter motion curves or lengths while fixing zero visual defects.
