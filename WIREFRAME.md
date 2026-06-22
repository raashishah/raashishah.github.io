# Raashi OS — wireframe (Desktop + Stage Manager)

**Shape brief:** see `SHAPE-BRIEF.md`  
**Stack:** Next.js · CSS-only shell animations · Spotify API + iFrame for playback  
**Paradigm:** Mac-inspired desktop · Stage Manager · iOS-style mobile  
**Scope:** One build — no phased releases. Desktop shell, all four dock apps, live Spotify widget, Connect menu, Photos stack, easter egg, and mobile variant ship together.

---

## What's in the build

| Area | Included |
|------|----------|
| **Shell** | Menu bar, widget desktop, Stage Manager strip, dock (4 apps) |
| **Desktop icons** | Photos stack, Connect stack |
| **Widgets** | Spotify Now Playing (live API), Fragment, Metrics |
| **Apps** | Projects, Work, Fragments, About |
| **Connect** | Menu bar dropdown + desktop stack (all social links) |
| **Spotify** | Live now-playing API + easter egg playback via iFrame |
| **Mobile** | iOS-style home, widgets, dock, full-screen sheets |
| **Motion** | CSS-only shell animations + `prefers-reduced-motion` |

---

## Desktop — full layout

```
┌─ MENU BAR ───────────────────────────────────────────────────────────────────┐
│  raashi os          Tue 10:42        ♫ Who I Am — Toro y Moi    ?  [connect]│
│                                                                      ▾ menu  │
└──────────────────────────────────────────────────────────────────────────────┘
  connect ▾ dropdown (replaces dock Links fan):
      [giphy] [medium] [linkedin] [github] [spotify] [twitter] [duolingo] [soundcloud]
      ↑ legacy custom SVGs for giphy + duolingo

┌─ STAGE ─┬─ DESKTOP (wallpaper: warm charcoal) ───────────────────────────────┐
│  STRIP  │                                                                      │
│         │   DESKTOP ICONS (macOS-style stacks, not widgets grid):              │
│  ┌───┐  │                                                                      │
│  │ P │  │      ┌─────────┐         ┌─────────────────────┐                   │
│  └───┘  │      │ Photos  │         │  SPOTIFY NOW PLAYING │                   │
│  ┌───┐  │      │ ┌───┐   │         │  ┌───────────────┐  │                   │
│  │ W │  │      │ │img│   │         │  │  album art    │  │                   │
│  └───┘  │      │ └───┘   │         │  │  (purple tint)│  │                   │
│  ┌───┐  │      │ stacked │         │  ├───────────────┤  │                   │
│  │ F │  │      │ thumbs  │         │  │ Who I Am      │  │                   │
│  └───┘  │      └─────────┘         │  │ Toro y Moi    ♫ │                   │
│         │      pro + casual.jpeg    │  └─────────────────────┘                   │
│         │      click → About app    │  live from /api/now-playing             │
│         │                                                                      │
│         │      ┌─────────┐    ┌──────────────┐                                │
│         │      │ Connect │    │  Fragment    │    ┌──────────┐                 │
│         │      │ stack   │    │  widget      │    │ Metrics  │                 │
│         │      │ [icons] │    │  duolingo…   │    │ 4k·12hr  │                 │
│         │      └─────────┘    └──────────────┘    └──────────┘                 │
│         │      click → connect menu   (small widgets, right side)              │
│         │                                                                      │
│         │         ┌─ STAGE WINDOW (active app) ─────────────────────┐         │
│         │         │  Projects                              ─  □  ×   │         │
│         │         ├─────────────────────────────────────────────────┤         │
│         │         │  JBCN Admissions                                │         │
│         │         │  The hard part wasn't the AI.                   │         │
│         │         │  It was making committees trust it.             │         │
│         │         │  admissions.raashishah.com →                    │         │
│         │         │  ─────────────────────────────────────────────  │         │
│         │         │  Design POV                                     │         │
│         │         │  Exhibition navigation that is ultra smooth     │         │
│         │         │  and works offline — made in 12 hrs.            │         │
│         │         │  povindex.designpovindia.com →                  │         │
│         │         │  ─────────────────────────────────────────────  │         │
│         │         │  Colourer · building                            │         │
│         │         │  Giving control back to artists by making       │         │
│         │         │  better tools so they can practice their craft  │         │
│         │         │  and let agents do the manual repetitive work.  │         │
│         │         └─────────────────────────────────────────────────┘         │
└─────────┴──────────────────────────────────────────────────────────────────────┘

┌─ DOCK (4 apps — Links removed) ──────────────────────────────────────────────┐
│         (  Projects  ) (  Work  ) (  Fragments  ) (  About  )                  │
└──────────────────────────────────────────────────────────────────────────────┘
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

State B — Projects open
  STRIP: [P●] [ ] [ ]     STAGE: Projects window

State C — user opens Work
  STRIP: [P] [W●] [ ]     STAGE: Work window

State D — close window (×)
  App removed from strip · desktop fully visible
```

---

## App: Projects (dock)

```
┌─ Projects ─────────────────────────────── ─ □ × ┐
│                                                │
│  JBCN Admissions                               │
│  The hard part wasn't the AI.                  │
│  It was making committees trust it.              │
│  → admissions.raashishah.com                   │
│                                                │
│  Design POV                                    │
│  Exhibition navigation that is ultra smooth    │
│  and works offline — made in 12 hrs.           │
│  → povindex.designpovindia.com                 │
│                                                │
│  Colourer · building                           │
│  Giving control back to artists by making      │
│  better tools so they can practice their craft │
│  and let agents do the manual repetitive work. │
│                                                │
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

## App: Fragments (dock)

```
┌─ Fragments ────────────────────────────── ─ □ × ┐
│  bits from my head                             │
│  [music] [app] [note] tiles — same as before    │
└────────────────────────────────────────────────┘
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
│ 10:42   raashi os  [≡]  │  ≡ = Connect menu
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
│  ◉    ◉    ◉    ◉       │  4 dock icons (no Links)
│ Proj Work Frag About    │
└─────────────────────────┘
```

---

## Apple HIG — what's possible on the web

| HIG element | Web approach |
|-------------|--------------|
| **System font** | `font-family: -apple-system, BlinkMacSystemFont, …` → San Francisco on Apple devices |
| **Corner radius, spacing** | Match HIG values in CSS (widgets ~20px radius, dock magnification) |
| **Desktop stacks** | Custom CSS layered thumbnails (your screenshot reference) |
| **Menu bar** | Custom component, HIG-inspired heights (~22px) |
| **Actual Apple UI assets** | Cannot ship Apple's icons, wallpaper, or pixel-perfect Sonoma clone |
| **Liquid glass / real blur** | Avoid as default (Impeccable); dock can use one subtle `backdrop-filter` if needed |

**Verdict:** **HIG-inspired**, not literal Apple software. Legally safe, still feels native on Mac/iPhone because of system font + spacing + interaction patterns.

---

## Next.js vs Svelte vs Vue

| | Next.js ✓ | SvelteKit | Nuxt (Vue) |
|---|-----------|-----------|------------|
| Spotify API routes | Built-in | Built-in | Built-in |
| CSS animations | Yes | Yes | Yes |
| Desktop OS UI | Yes | Yes | Yes |
| You already chose it | Yes | Rewrite | Rewrite |
| Spotify iFrame in React | Official examples exist | Works | Works |

**Svelte and Vue can do everything here.** There is no technical blocker. But switching now means **rebuilding from scratch** with no gain for Raashi OS specifically. **Stay on Next.js.**

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
- [x] Colourer insight
- [x] Photos → desktop stack
- [x] Links → menu bar + Connect stack
- [x] Spotify widget spec
- [ ] Role insights (your words)
- [ ] About bio paragraphs
- [ ] SoundCloud URL
- [ ] Boot state: idle desktop vs auto-open About?

---

## File map (when we build)

```
app/
  page.tsx
  globals.css
  api/now-playing/route.ts
components/
  os/
    MenuBar.tsx
    ConnectMenu.tsx            ← social links (replaces LinksFan)
    Desktop.tsx
    DesktopStack.tsx           ← Photos + Connect stacks
    SpotifyWidget.tsx          ← custom widget + iFrame API
    Widget.tsx
    StageStrip.tsx
    StageWindow.tsx
    Dock.tsx                   ← 4 icons only
    MobileHome.tsx
    MobileSheet.tsx
  apps/
    ProjectsApp.tsx
    WorkApp.tsx
    FragmentsApp.tsx
    AboutApp.tsx
content/
legacy/
public/img/
```

---

*Single-release spec — Photos stack, live Spotify widget, Connect relocated, four dock apps, mobile variant.*
