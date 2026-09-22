DROP

The mentoring surface (`components/AgentMentoring.tsx`, `app/styles/mentoring.css`) has no text fields: only copy, a checkout button, and inline links. Styles use semantic tokens (`--color-body`, `--ink`, `--accent`, spacing/type tokens) with no literal light backgrounds or fixed light field chrome. A repo scan finds no `<input>`, `<textarea>`, or `<select>` in product components; native form controls are not styled here, and `:root` already sets `color-scheme: dark` in dark mode for any future browser-default fields.
