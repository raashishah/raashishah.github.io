# Raashi OS — Shape Brief

**Status:** Draft — awaiting your confirmation before build.

---

## 1. Feature Summary

Raashi OS is a personal website disguised as a warm-dark desktop environment. Visitors land on a **widget desktop**, use the **dock** to open apps, and **Stage Manager** keeps one app in focus while others wait in a left sidebar strip. On mobile, it becomes an **iOS-style home screen**: widgets stack, dock at bottom, apps open full-screen.

## 2. Primary User Action

Glance at widgets to get who Raashi is in 5 seconds, then tap **Projects** in the dock to see what she ships. Power users explore dock apps, sidebar strip, and the easter egg.

## 3. Design Direction

| Axis | Choice |
|------|--------|
| **Color strategy** | Committed — warm charcoal desktop, dusty rose accent (~20%), widgets use elevated surfaces |
| **Scene sentence** | Someone opens the link on their phone between meetings, dim café light, curious but not patient; the UI should feel like unlocking a friend's laptop, not reading a resume |
| **Anchors** | macOS Sonoma widgets + Stage Manager (interaction), Units Parkside (blocky clarity inside windows), legacy Raashi palette (`#b87879` evolved to OKLCH) |
| **Anti-literal** | Not a pixel-perfect Mac clone. No Apple logos, no SF Pro requirement, no lawsuit bait |

**Impeccable bans respected:** no glassmorphism wallpaper, no gradient text, no identical card grids inside windows, no side-stripe borders. Dock may use one subtle blur strip (purposeful, single element).

## 4. Scope

| | |
|---|---|
| **Fidelity** | Mid-fi wireframe now → production-ready UI on build |
| **Breadth** | Whole surface (desktop + 5 apps + mobile variant) |
| **Interactivity** | Shipped-quality: dock click, stage focus, window open/close, iOS full-screen sheets |
| **Time intent** | One release — polish the full surface (desktop shell, live widgets, four apps, mobile) |

## 5. Layout Strategy

### Desktop (≥768px)

```
┌─ Menu bar ─────────────────────────────────────────────────────┐
│ raashi os          Tue 10:42          ♫ idle    ? easter egg    │
├────────┬─────────────────────────────────────────────────────────┤
│ STAGE  │                    WIDGET DESKTOP                       │
│ STRIP  │   ┌─────────┐  ┌──────────┐  ┌─────────┐               │
│        │   │ Profile │  │ Fragment │  │ Metric  │               │
│ [Proj] │   │ widget  │  │  widget  │  │ widget  │               │
│ [Work] │   └─────────┘  └──────────┘  └─────────┘               │
│ [Frag] │                                                         │
│        │   ┌─────────────────────────────────────┐               │
│        │   │  STAGE (active app window)          │               │
│        │   │  title bar · ─ □ ×                  │               │
│        │   │  app content here                   │               │
│        │   └─────────────────────────────────────┘               │
├────────┴─────────────────────────────────────────────────────────┤
│  [Projects] [Work] [Fragments] [About] [Links ▾]     DOCK       │
└──────────────────────────────────────────────────────────────────┘
```

- **Widget desktop** = wallpaper layer, always visible behind/alongside stage
- **Stage** = one focused app window, large, center-right
- **Stage strip** (left) = thumbnails of open apps; click to swap focus (Stage Manager)
- **Dock** = launch apps; icon bounces on open (CSS only)

### Mobile (<768px) — iOS-style

```
┌─────────────────────────┐
│ 10:42        raashi os  │  status bar
├─────────────────────────┤
│ ┌─────┐ ┌─────┐        │
│ │prof │ │frag │        │  widget grid (2 col)
│ └─────┘ └─────┘        │
│ ┌───────────┐          │
│ │  metrics  │          │
│ └───────────┘          │
│                         │
│   (tap dock → full      │
│    screen app sheet)    │
│                         │
├─────────────────────────┤
│ ◉  ◉  ◉  ◉  ◉          │  dock (5 icons)
└─────────────────────────┘
```

- No Stage Manager strip on mobile (too cramped)
- Dock tap → full-screen sheet slides up (CSS transform)
- Swipe down or × to dismiss

## 6. Key States

| State | Desktop | Mobile |
|-------|---------|--------|
| **Boot** | Desktop fades in, widgets stagger, dock rises | Same, shorter stagger |
| **Idle** | Widgets visible, no stage window (or welcome on stage) | Widget home |
| **App open** | Window on stage, thumbnail in strip | Full-screen sheet |
| **App switch** | Click strip thumbnail, cross-fade stage content | Tap different dock icon |
| **Links folder** | Dock hover/click expands social icons upward | Sheet with icon grid |
| **Empty fragment** | Widget shows "nothing here yet" | Same |
| **Now playing** | Menu bar + widget show live track from Spotify API | Widget updates |
| **Reduced motion** | No bounce, instant transitions | Same |

## 7. Interaction Model

| Action | Result |
|--------|--------|
| Click dock **Projects** | Projects window opens on stage; thumbnail appears in strip |
| Click dock **Work** | Work window opens; Projects moves to strip |
| Click strip thumbnail | That app returns to stage |
| Click window **×** | App closes, removed from strip |
| Click desktop (empty) | Optional: minimize stage, widgets take focus |
| Click **About** title "Who I am" | Opens Spotify album (easter egg) |
| Menu bar **?** | Hint pulses; no spoiler |
| Dock **Links ▾** | Fan of social icons (legacy SVGs preserved) |

**CSS only:** dock bounce, window open scale+fade, strip slide, sheet slide-up on mobile.

## 8. Content Requirements (apps = old chapters)

| Dock app | Content | Source |
|----------|---------|--------|
| **Projects** | JBCN, Design POV, Colourer — insight + link each | `content/projects/` |
| **Work** | Pluto, OnDevice, Aula, + collapsed others | `content/roles/` |
| **Fragments** | Music / app / note tiles | `content/fragments/` |
| **About** | Bio, photo, easter egg on title | `content/about.md` |
| **Links** | All legacy social icons + SoundCloud | `content/site.json` |

**Widgets:**

| Widget | Content |
|--------|---------|
| Photos stack | pro + casual.jpeg; click opens About |
| Spotify Now Playing | Live from `/api/now-playing`; idle when not playing |
| Fragment | One random fragment tile |
| Metrics | 4k+ profiles · 12hr PWA · 7 yrs |

**Excluded:** Bible for Bad People

## 9. Recommended References (for craft)

- `brand.md` — register, anti-slop
- `animate.md` — CSS motion on dock/windows
- `layout.md` — Stage Manager spacing rhythm
- `delight.md` — easter egg, dock bounce

## 10. Open Questions

- [ ] Boot state: empty desktop or Welcome/About auto-open on stage?
- [ ] Wallpaper: solid warm charcoal or very subtle noise texture?
- [ ] SoundCloud URL still needed
- [ ] Custom app icons for dock (emoji vs simple glyphs vs illustrated)

---

**Confirm this brief** (reply "confirmed" or edit what feels off) and we update `WIREFRAME.md` as the build spec + scaffold Next.js.
