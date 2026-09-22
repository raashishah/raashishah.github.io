DROP

Links (`.home__inline-link`, `.home__link`, footer/header CTAs), accordion summaries (`.home__details-summary` open/armed and focus/hover in `layout.css`), and the mentoring book control (`.home__mentoring-book` with accent underline/arrow) already colour via `var(--accent)`, `var(--ink)`, and `var(--text-muted)`; focus rings on those controls use `var(--accent-focus-ring)` except mentoring/error links, which use allowed `var(--ink)` on `outline`, with no literal light-only hex in `app/styles/layout.css`, `accordion.css`, `mentoring.css`, `footer.css`, or `panel.css` control rules.
