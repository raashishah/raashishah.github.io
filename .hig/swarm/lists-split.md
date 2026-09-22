DROP

Register **brand** · surface **lists-split**. Work list and Expression split detail already inherit dark appearance through semantic tokens; no structural pass on this surface.

**Work list** (`app/styles/layout.css` list/group/inline rules + `app/styles/accordion.css`): typography and state colours use `--text`, `--color-body`, `--text-muted`, `--accent`, `--accent-focus-ring`, and `color-mix` on `--accent`/`--separator` for pullquotes. No row/card backgrounds, borders, or shadows; accordions stay flat `details`/`summary` rows with spacing tokens only (`--space-1`–`--space-5`, `--home-touch-min`). No literal hex, `rgb()`, or `hsl()` in these list files.

**Expression split** (`app/styles/panel.css` `.home__detail*`): motion and overflow only; no fill or ink overrides — content reads `--text` / `--color-body` from the page. Split grid and `.home__content--detail` placement live in `layout.css`; **do not** change grid ratios, list density, or gaps here.

Warm dark brand values (`--ink`, `--surface`, `--accent`, etc.) belong in `app/styles/tokens.css` (and sheet/scrim/shadow in `panel.css` per materials worker). Once tokens land, list and split detail update automatically without list-specific edits or card chrome.
