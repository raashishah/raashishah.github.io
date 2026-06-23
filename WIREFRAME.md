# rashOS — wireframe (Desktop + Stage Manager)

**Shape brief:** see `SHAPE-BRIEF.md`  
**Stack:** Next.js (App Router) · CSS shell animations · Spotify API + iFrame · [Manrope](https://fonts.google.com/specimen/Manrope) on non-Apple  
**Paradigm:** Mac-inspired desktop · Stage Manager · iOS-style mobile · Liquid Glass shell  
**Scope:** One build — no phased releases. Full desktop shell, project apps, Work, About, live Spotify, Connect, Photos stack, easter egg, mobile.

---

## What's in the build

| Area | Included |
|------|----------|
| **Shell** | Menu bar, widget desktop, Stage Manager strip, dock |
| **Desktop icons** | Photos stack, Connect stack |
| **Widgets** | Spotify Now Playing (live API), Fragment, Metrics |
| **Apps (dock)** | JBCN Admissions, Design POV, Expression, Work, About — plus any fragment that earns a dock icon |
| **Fragments** | Per-item: desktop widget, dock app, or both — decided as content is added |
| **Connect** | Menu bar dropdown + desktop stack (all social links) |
| **Spotify** | Live now-playing API + easter egg playback via iFrame |
| **Mobile** | iOS-style home, widgets, dock, full-screen sheets |
| **Motion** | CSS shell animations; respect `prefers-reduced-motion` (see below) |

---

## Desktop — full layout

```
┌─ MENU BAR ───────────────────────────────────────────────────────────────────┐
│  rashOS           Tue 10:42        ♫ Who I Am — Toro y Moi    ?  [connect]│
│                                                                      ▾ menu  │
└──────────────────────────────────────────────────────────────────────────────┘
  connect ▾ dropdown (replaces dock Links fan):
      [giphy] [medium] [linkedin] [github] [spotify] [twitter] [duolingo] [soundcloud]
      ↑ legacy custom SVGs for giphy + duolingo

┌─ STAGE ─┬─ DESKTOP (wallpaper: warm charcoal) ───────────────────────────────┐
│  STRIP  │                                                                      │
│         │   DESKTOP ICONS (macOS-style stacks, not widgets grid):              │
│  ┌───┐  │                                                                      │
│  │ J │  │      ┌─────────┐         ┌─────────────────────┐                   │
│  ├───┤  │      │ Photos  │         │  SPOTIFY NOW PLAYING │                   │
│  │ D │  │      │ ┌───┐   │         │  ┌───────────────┐  │                   │
│  ├───┤  │      │ │img│   │         │  │  album art    │  │                   │
│  │ E │  │      │ └───┘   │         │  │  (purple tint)│  │                   │
│  ├───┤  │      │ stacked │         │  ├───────────────┤  │                   │
│  │ W │  │      │ thumbs  │         │  │ Who I Am      │  │                   │
│  ├───┤  │      └─────────┘         │  │ Toro y Moi    ♫ │                   │
│  │ A │  │      pro + casual.jpeg    │  └─────────────────────┘                   │
│  └───┘  │      click → About app    │  live from /api/now-playing             │
│         │                                                                      │
│         │      ┌─────────┐    ┌──────────────┐                                │
│         │      │ Connect │    │  Fragment    │    ┌──────────┐                 │
│         │      │ stack   │    │  widget      │    │ Metrics  │                 │
│         │      │ [icons] │    │  duolingo…   │    │ 4k·12hr  │                 │
│         │      └─────────┘    └──────────────┘    └──────────┘                 │
│         │      click → connect menu   (small widgets, right side)              │
│         │                                                                      │
│         │         ┌─ STAGE WINDOW (active app) ─────────────────────┐         │
│         │         │  JBCN Admissions                         ─  □  ×   │         │
│         │         ├─────────────────────────────────────────────────┤         │
│         │         │  The hard part wasn't the AI.                   │         │
│         │         │  It was making committees trust it.             │         │
│         │         │  admissions.raashishah.com →                    │         │
│         │         └─────────────────────────────────────────────────┘         │
└─────────┴──────────────────────────────────────────────────────────────────────┘

┌─ DOCK ───────────────────────────────────────────────────────────────────────┐
│   JBCN   Design POV   Expression   Work   About   + fragment apps as added    │
└──────────────────────────────────────────────────────────────────────────────┘
  ↑ Core five always in dock. Individual fragments can join dock or stay widgets only.
```

---

## Desktop icon: Photos stack

Like macOS desktop **Images** stack (layered rounded thumbnails):

```
      ┌────┐
     ┌┼────┼┐
    ┌┼┼────┼┼┐   ← 2–3 photos offset (pro.jpeg, casual.jpeg)
    └┴────┴┘
      Photos
```

- **Click:** opens About app on stage
- **Hover:** stack fans slightly (CSS transform)
- **Not** a Sonoma widget; a desktop file icon

---

## Spotify Now Playing widget

**No official Spotify web widget** exists (iOS/macOS widgets are system-only). We **build a custom widget** that matches your reference:

```
┌─────────────────────────┐
│                         │
│      [ album art ]      │  ← large square, rounded corners
│      purple tint bg     │     (from API or easter egg track)
│                         │
├─────────────────────────┤
│ Who I Am (Channel Tres  │  ← bold white title
│ Remix)                  │
│ Toro y Moi, Channel Tres│  ← muted artist
│                      ♫  │  ← playing indicator
└─────────────────────────┘
```

| Mode | Behaviour |
|------|-----------|
| **Default** | `/api/now-playing` fills widget with live Spotify (album art, title, artist). Menu bar shows same track. Idle state: "Not playing" when nothing is active |
| **Easter egg** | Click "Who I am" in About → widget loads track URI + plays via **Spotify iFrame API** (user may need one tap on mobile; Safari blocks autoplay) |

**Easter egg track:** [Who I Am (Channel Tres Remix)](https://open.spotify.com/album/5YMsYTDaUkHU97gVRhhOV1) — ties legacy album link to widget playback.

**Playback limits (honest):**
- Cannot autoplay audio silently in all browsers (Safari/Chrome policy)
- **Best UX:** easter egg triggers widget to load track + pulse "tap to play" or auto-play where allowed
- Full custom player needs Spotify Premium + Web Playback SDK (visitor's account) — **not** what we want
- **Spotify Embed + iFrame API** = right tool for visitors hearing a few seconds after easter egg

---

## Connect (social links) — new home

**Removed from dock.** Two surfaces:

| Surface | Behaviour |
|---------|-----------|
| **Menu bar → Connect ▾** | Dropdown with all social icons (primary) |
| **Desktop Connect stack** | macOS-style icon stack on wallpaper; click opens same dropdown or small floating panel |

Legacy Giphy + Duolingo custom SVGs preserved in both.

---

## Stage Manager behaviour

```
State A — idle
  Desktop icons + widgets visible · no stage window

State B — JBCN open
  STRIP: [J●] [ ] [ ]     STAGE: JBCN Admissions window

State C — user opens Work
  STRIP: [J] [W●] [ ]     STAGE: Work window

State D — close window (×)
  App removed from strip · desktop fully visible
```

---

## App: JBCN Admissions (dock)

```
┌─ JBCN Admissions ────────────────────────── ─ □ × ┐
│  The hard part wasn't the AI.                  │
│  It was making committees trust it.              │
│  → admissions.raashishah.com                   │
└────────────────────────────────────────────────┘
```

---

## App: Design POV (dock)

```
┌─ Design POV ───────────────────────────── ─ □ × ┐
│  Exhibition navigation that is ultra smooth    │
│  and works offline — made in 12 hrs.           │
│  → povindex.designpovindia.com                 │
└────────────────────────────────────────────────┘
```

---

## App: Expression (dock)

Official product name for the Colourer codebase.

```
┌─ Expression ───────────────────────────── ─ □ × ┐
│  · building                                    │
│  Giving control back to artists by making      │
│  better tools so they can practice their craft │
│  and let agents do the manual repetitive work. │
└────────────────────────────────────────────────┘
```

No Bible for Bad People.

---

## App: Work (dock)

```
┌─ Work ─────────────────────────────────── ─ □ × ┐
│  Pluto · Head of Product          2021–2024   │
│  Insight: [your custom line]                   │
│  OnDevice · Co-Founder            2024–2025   │
│  Insight: [your custom line]                   │
│  Aula · Engagement Associate      2018–2019   │
│  Insight: [your custom line]                   │
│  ▸ Kawa Space · Kotak Neo · Solid  (expand)   │
└────────────────────────────────────────────────┘
```

---

## Fragments — widget and/or app (per item)

Fragments are **bits from your head** (music takes, app loves, notes). **No single rule** — each fragment gets the surface that fits when you add it:

| Surface | Good for |
|---------|----------|
| **Desktop widget** | Glanceable one-liner, rotating tile, live status (e.g. Duolingo streak) |
| **Dock app** | Enough content for a small window — essay, list, embed |
| **Both** | Widget teases on desktop; tap or dock icon opens the full view |

Start with widgets where it’s enough. Promote to a dock app when a fragment outgrows a card. The dock grows organically — no upfront Fragments mega-app required.

```
Example — fragment as dock app:
┌─ [fragment title] ─────────────────────── ─ □ × ┐
│  [music / app / note content]                    │
└──────────────────────────────────────────────────┘
```

---

## App: About (dock) + easter egg

```
┌─ Who I am ─────────────────────────────── ─ □ × ┐
│  ↑ TITLE CLICK = EASTER EGG                     │
│                                                │
│  PM turned builder · Mumbai                    │
│  [bio paragraphs — your words]                 │
│                                                │
│  Photos live on desktop stack, not repeated    │
│  here unless you want one inline               │
└────────────────────────────────────────────────┘
```

**Easter egg flow:**
1. Menu bar `?` — hint only, no spoiler
2. User opens About → clicks **"Who I am"** title
3. Spotify widget on desktop loads **Who I Am (Channel Tres Remix)**
4. iFrame API calls `loadUri` + `play` (works where browser allows)
5. Optional: subtle CSS celebration on widget (pulse ring)

---

## Mobile — iOS-style

```
┌─────────────────────────┐
│ 10:42   rashOS  [≡]  │  ≡ = Connect menu
├─────────────────────────┤
│ ┌─────────┐ ┌─────────┐ │
│ │ Spotify │ │Fragment │ │
│ │ widget  │ │ widget  │ │
│ └─────────┘ └─────────┘ │
│ ┌─────────────────────┐ │
│ │ Photos stack tap    │ │
│ │ → About sheet       │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│  ◉  ◉  ◉  ◉  ◉  …      │  core 5 + fragment apps as added
│ JBCN POV Expr Work About│
└─────────────────────────┘
```

---

## Apple HIG + Liquid Glass (web)

Reference: Apple **Liquid Glass** (WWDC 2025 — iOS 26 / macOS Tahoe). HIG-inspired shell, not a pixel-perfect Apple clone.

| HIG element | Web approach |
|-------------|--------------|
| **Typography** | Apple: `-apple-system, BlinkMacSystemFont` → San Francisco. **Everyone else:** [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts (`font-family: -apple-system, BlinkMacSystemFont, 'Manrope', sans-serif`) |
| **Liquid glass** | `backdrop-filter: blur()` + semi-transparent fills on **menu bar, dock, widgets, stage window chrome**. Solid backgrounds inside app content for readability. |
| **Corner radius, spacing** | HIG-like values (~20px widget radius, dock magnification) |
| **Desktop stacks** | Custom CSS layered thumbnails |
| **Menu bar** | Custom component, ~22px height, glass treatment |
| **Apple UI assets** | Cannot ship Apple icons, wallpaper, or trademarked chrome |

**Verdict:** Feels native on Mac/iPhone (system font + glass + spacing). On Windows/Android/Linux, Manrope gives a consistent rashOS voice without pretending to be San Francisco.

### `prefers-reduced-motion`

OS accessibility setting (“Reduce motion”). When enabled, skip dock bounce, window scale-in, widget pulse, and stagger animations. Glass and layout stay; only motion drops. Required for vestibular accessibility.

---

## Framework — Next.js (chosen)

**Decision:** Next.js App Router. Greenfield build; legacy site stays as static HTML until cutover.

Spotify Embed/iFrame API is plain JS — identical in React. SvelteKit and Nuxt were viable; Next wins on Cursor ecosystem, tutorials, and API routes in one repo.

<details>
<summary>Comparison reference (why Next over Svelte/Nuxt)</summary>

Performance difference on this site is negligible (tens–low hundreds of ms). Bottlenecks are liquid glass blur, images, fonts, Spotify embed — not framework.

| | Next.js ✓ | SvelteKit | Nuxt |
|---|-----------|-----------|------|
| API routes | ✅ | ✅ | ✅ |
| Cursor / AI help | Strongest | Good | Good |
| JS bundle | Largest | Smallest | Middle |
| Hire / tutorials | Easiest | Harder | Medium |

</details>

---

## Animation (CSS only for shell)

| Moment | Effect |
|--------|--------|
| Boot | Desktop fade in, stacks stagger, dock rises |
| Photo stack hover | Thumbs fan 2–3° |
| Dock click | Icon bounce, stage window scale+fade |
| Easter egg | Widget border pulse + track load |
| Connect menu | Dropdown slide |
| Reduced motion | Instant transitions |

Spotify playback uses **Spotify's embed**, not our CSS.

---

## Open edits

- [x] Design POV insight
- [x] Expression insight (formerly Colourer)
- [x] Photos → desktop stack
- [x] Links → menu bar + Connect stack
- [x] Spotify widget spec
- [ ] Role insights (your words)
- [ ] About bio paragraphs
- [ ] SoundCloud URL
- [x] Framework: Next.js (App Router)
- [x] Fragments: per-item widget and/or app as content grows
- [ ] Boot state: idle desktop vs auto-open About?

---

## File map (when we build)

```
app/
  page.tsx
  layout.tsx
  globals.css
  api/now-playing/route.ts
components/
  os/
    MenuBar.tsx
    ConnectMenu.tsx
    Desktop.tsx
    DesktopStack.tsx           ← Photos + Connect stacks
    SpotifyWidget.tsx
    Widget.tsx
    StageStrip.tsx
    StageWindow.tsx
    Dock.tsx
    MobileHome.tsx
    MobileSheet.tsx
  apps/
    JbcnApp.tsx
    DesignPovApp.tsx
    ExpressionApp.tsx
    WorkApp.tsx
    AboutApp.tsx
  fragments/                   ← add per fragment (widget and/or app)
    FragmentWidget.tsx
    [Name]FragmentApp.tsx
content/
  fragments/                   ← one file per fragment; metadata: widget | app | both
legacy/
public/img/
```

Load Manrope in root layout:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
font-family: -apple-system, BlinkMacSystemFont, 'Manrope', sans-serif;
```

---

*Single-release spec — Liquid Glass shell, per-project dock apps, Expression branding, Manrope fallback.*
