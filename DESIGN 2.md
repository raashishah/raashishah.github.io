# Design System

## Scene

Someone opens rashOS on their phone between meetings, dim café light, curious but impatient. It should feel like glimpsing a friend's laptop desktop: warm charcoal wallpaper, dusty rose accents, widgets on the home screen, dock at the bottom. On desktop, Stage Manager keeps one app in focus. Not a SaaS dashboard. Not a Mac clone.

## Color strategy

**Committed** — warm dark desktop carries the surface; dusty rose accent ~15–25% (dock active state, widget borders, links).

### Palette (OKLCH-oriented; implement as tinted neutrals)

| Token | Role | Notes |
|-------|------|-------|
| `--bg-base` | Page background | Charcoal with slight warm tint (~oklch 18% 0.01 30) — not pure black |
| `--bg-elevated` | Alternate chapter blocks | Slightly lighter (~oklch 22% 0.012 30) |
| `--bg-accent-block` | One hero block per section | Dusty rose muted (~oklch 62% 0.06 20) — legacy `#b87879` evolved |
| `--text-primary` | Headlines, body | Warm off-white (~oklch 92% 0.01 80) |
| `--text-muted` | Insights, metadata | ~oklch 70% 0.01 80 |
| `--accent` | Links, focus, hover | Dusty rose ~oklch 65% 0.08 20 |
| `--accent-hover` | Interactive feedback | Slightly lighter rose |

Legacy reference: `#b87879` accent, `#333` dark, cream light — reinterpreted for dark-first.

## Typography

| Role | Direction |
|------|-----------|
| Display | Strong grotesk or neo-grotesk (e.g. Instrument Sans, Geist, or similar) — NOT Inter |
| Body | Same family or paired humanist sans |
| Scale | Clear steps: display 3–4rem, section 1.5–2rem, insight 1.125rem, meta 0.875rem |
| Line length | Insights max ~55ch; body max ~65ch |

Hierarchy through size + weight, not color alone.

## Layout

- **Desktop:** Menu bar + widget desktop + Stage Manager (left strip + center stage) + dock
- **Mobile:** iOS-style widget grid + bottom dock + full-screen app sheets
- **No nested cards** — widgets and app windows are top-level surfaces
- **Asymmetric widget grid** — varied widget sizes (Sonoma-inspired), not uniform grid
- Max stage window width ~720px; widgets fill remaining desktop space

## Components

### Menu bar
Top strip: wordmark, decorative clock, live music status from Spotify API, easter egg hint.

### Widget
Rounded rectangle on desktop wallpaper. Types: photos stack, spotify-now-playing, fragment, metrics.

### Stage strip
Left column of app thumbnails. Active app highlighted. Click to swap focus.

### Stage window
Single focused app panel. Title bar with decorative traffic lights. Content = app body.

### Dock
Bottom centered icon row. Active icon scales up. Bounce on open (CSS). Links icon fans social icons upward.

### App sheet (mobile)
Full-screen panel sliding up from dock tap. × to dismiss.

### Links fan
Legacy social icons (Giphy + Duolingo custom SVGs preserved).

## Motion

Primary: **CSS animations only**.

| Moment | Animation |
|--------|-------------|
| Boot | Desktop fade in, widgets stagger, dock rises |
| Dock open | Icon bounce, stage window scale 0.96→1 + fade |
| Stage swap | Cross-fade, strip thumb highlight |
| Close app | Scale down + fade, strip thumb out |
| Mobile sheet | translateY slide up |
| Links fan | Icons stagger upward |
| Easter egg hint | Opacity pulse on menu bar `?` |

**Bans:** bounce on content (dock only), elastic, layout property animation, animation libraries.

## Imagery

- Reuse legacy photos (`pro.jpeg`, `casual.jpeg`) in Hero and Who I am until replaced
- Projects: screenshot or solid color block placeholder until assets ready
- No stock photography

## Breakpoints

| Name | Width |
|------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
