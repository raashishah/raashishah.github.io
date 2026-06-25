---
name: rashOS
description: Warm editorial scroll journey for strategy, shipped work, and live personality fragments.
colors:
  paper-base: "oklch(97% 0.008 80)"
  paper-section: "oklch(95% 0.006 78)"
  ink-primary: "oklch(18% 0.01 50)"
  ink-muted: "oklch(42% 0.01 50)"
  iris-accent: "oklch(55% 0.12 280)"
  sparkle-warm: "oklch(78% 0.12 85)"
  admissions-night: "oklch(22% 0.04 250)"
  admissions-signal: "oklch(62% 0.18 250)"
  expression-clay: "oklch(28% 0.06 30)"
  expression-flare: "oklch(68% 0.22 35)"
  pov-carbon: "oklch(12% 0.005 0)"
  pov-alert: "oklch(55% 0.22 25)"
  pluto-malt: "oklch(35% 0.04 65)"
  pluto-amber: "oklch(82% 0.08 75)"
  kawa-forest: "oklch(30% 0.05 165)"
  kawa-mint: "oklch(78% 0.14 160)"
  aula-violet: "oklch(28% 0.06 290)"
  aula-signal: "oklch(52% 0.18 290)"
  kotak-burgundy: "oklch(18% 0.02 25)"
  kotak-red: "oklch(55% 0.22 25)"
typography:
  display:
    fontFamily: "Cabinet Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(3rem, 10vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Cabinet Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Cabinet Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Cabinet Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Cabinet Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  project-cta:
    backgroundColor: "transparent"
    textColor: "{colors.iris-accent}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 0"
  now-playing-card:
    backgroundColor: "oklch(100% 0 0 / 0.6)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "14px 18px"
  join-jam-pill:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.paper-base}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 20px"
  timeline-card:
    backgroundColor: "oklch(100% 0 0 / 0.5)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: rashOS

## Overview

**Creative North Star: "Quiet Stage, Loud Work"**

rashOS is no longer a faux operating system. The implemented site is a warm, scroll-driven sequence where neutral paper gives the work room to speak, then each chapter takes over the viewport with its own color climate. It should feel fast, self-assured, and a little playful, like someone who does not need to over-explain because the craft is doing the talking.

The tone is direct, confident, and human. Copy stays short. Motion carries the drama instead of decorative UI chrome. The home page alternates between calm editorial breathing room and fully saturated project takeovers, then resolves into a lighter work timeline and a looping footer.

This system explicitly rejects generic PM portfolio templates, hero metric blocks, gradient text, resume-wall layouts, dark crypto posturing, modal-heavy UX, glassmorphism cards, and calling the thing a "portfolio" in the interface.

Key characteristics:
- Warm paper base between sections.
- Heavy Cabinet Grotesk headlines with tight tracking.
- Pinned project chapters that own the whole screen.
- Minimal chrome, high contrast, and one strong idea per viewport.
- Playful but controlled motion: cursor states, scroll pinning, grain, and looped ending.

## Colors

The palette works in two layers: a restrained warm editorial base for the site shell, then fully committed project palettes that flood each pinned chapter.

### Primary
- **Quiet Iris** (`oklch(55% 0.12 280)`): The default interaction color for focus rings, hover states, scroll progress, and neutral-state links outside the project chapters.

### Neutral
- **Paper Base** (`oklch(97% 0.008 80)`): The default page background. It is warm, not white, and keeps the site from drifting into sterile SaaS minimalism.
- **Section Paper** (`oklch(95% 0.006 78)`): Used for breathing moments and the footer so the page rhythm changes without looking like a card stack.
- **Ink** (`oklch(18% 0.01 50)`): Primary text, solid buttons, cursor core, and any moment that needs grounded weight.
- **Muted Ink** (`oklch(42% 0.01 50)`): Metadata, supporting copy, labels, and scroll hints.

### Chapter Palettes
- **Admissions Night / Signal Blue** (`oklch(22% 0.04 250)` / `oklch(62% 0.18 250)`): Dense and high-trust, used for the admissions systems story.
- **Expression Clay / Flare** (`oklch(28% 0.06 30)` / `oklch(68% 0.22 35)`): Warm pigment tones for the animation tooling chapter.
- **POV Carbon / Alert Red** (`oklch(12% 0.005 0)` / `oklch(55% 0.22 25)`): The sharpest and most urgent chapter, used for Design POV.
- **Pluto Malt / Amber** (`oklch(35% 0.04 65)` / `oklch(82% 0.08 75)`): Warm product-strategy tones with lower aggression.
- **Kawa Forest / Mint** (`oklch(30% 0.05 165)` / `oklch(78% 0.14 160)`): Clean, technical green for geospatial and ML work.
- **Aula Violet / Signal Violet** (`oklch(28% 0.06 290)` / `oklch(52% 0.18 290)`): A more social and systems-minded palette.
- **Kotak Burgundy / Red** (`oklch(18% 0.02 25)` / `oklch(55% 0.22 25)`): Finance chapter tones with more heat than blue-chip polish.

### Named Rules
**The Chapter Takes the Room Rule.** When a project section is pinned, its palette owns the full viewport. Do not dilute those moments with extra neutral cards or secondary accents.

**The Warm Reset Rule.** After an intense chapter, the interface returns to paper neutrals before asking the viewer to absorb the next thing.

## Typography

**Display Font:** Cabinet Grotesk (fallback `-apple-system, BlinkMacSystemFont, sans-serif`)
**Body Font:** Cabinet Grotesk (same fallback stack)
**Label/Mono Font:** No separate mono voice in the current implementation

**Character:** Cabinet Grotesk is doing all the work here. The large weights make the site feel blunt and decisive, while the warm background and short line lengths keep it from feeling corporate or cold.

### Hierarchy
- **Display** (800, `clamp(3rem, 10vw, 7.5rem)`, `0.92`): Hero statements and footer name. This is the loudest layer of the site.
- **Headline** (800, `clamp(2rem, 5vw, 4rem)`, `1`): Project titles, work timeline heading, and project detail titles.
- **Title** (700, `clamp(1.25rem, 3vw, 1.75rem)`, `1.3`): Breathing moments and medium-emphasis statements.
- **Body** (400, `1rem`, `1.6`): Story copy and long-form supporting text. Keep line lengths under roughly `62ch`.
- **Label** (700, `0.68rem`, `0.12em` tracking, uppercase): Section type, eyebrow text, metadata, and supporting UI cues.

### Named Rules
**The One Clean Punch Rule.** Each viewport gets one typographic punchline. Do not stack multiple display-size claims in the same frame.

**The Tracking Tightens With Importance Rule.** Bigger type gets tighter letter-spacing so headings feel carved, not airy.

## Elevation

Depth is mostly created through contrast shifts, large-scale section changes, motion, and canvas scenes rather than through heavy shadow systems. The interface is flat at rest, then gets a little lift on cards and widgets when the section needs separation.

### Shadow Vocabulary
- **Timeline Lift** (`box-shadow: 0 12px 40px -20px oklch(20% 0.01 50 / 0.15)`): Used only on work timeline cards while hovering, never as a default state.
- **Jam Pulse Halo** (`box-shadow: 0 0 0 6px oklch(18% 0.01 50 / 0.12)` at peak): A rhythmic state effect for the live jam pill, not a structural shadow.

### Named Rules
**The Flat-Until-Invited Rule.** Surfaces stay visually flat until hover, motion, or state change gives them permission to lift.

**The Scene Carries the Depth Rule.** Use the 3D/canvas layer for spectacle. Do not compensate with fake glass, deep drop shadows, or floating card stacks.

## Components

### Project Chapters
- **Character:** Immersive split-screen chapters where the scene and copy feel equally important.
- **Shape:** Scene containers use a soft `16px` radius, while the section itself stays edge-to-edge.
- **Color Assignment:** Every chapter remaps `--zone-bg`, `--zone-text`, `--zone-muted`, and `--zone-accent` to its own palette.
- **State:** Chapters pin for roughly `120%` scroll distance and fade the copy in as the scene wakes up.
- **CTA:** The link is text-first, accented, and underlined by a `1px` border-bottom rather than boxed into a button.

### Preloader
- **Character:** A quick name reveal, not a fake progress theater sequence.
- **Shape:** Full-screen flat panel on paper base.
- **Color Assignment:** Neutral background with accent progress bar.
- **State:** Letterforms rise in, the bar fills, then everything exits upward and fades.

### Now Playing
- **Character:** Soft widget, closer to an object on a desk than a product card.
- **Shape:** `14px` outer radius with `10px` album-art crop.
- **Color Assignment:** Milky translucent white over the paper base, dark text, muted metadata.
- **State:** Album art slowly scales on hover. If there is no track, the component should disappear rather than render a dead placeholder.

### Join Jam
- **Character:** The most tactile control in the breathing sections.
- **Shape:** Fully pill-shaped (`999px`) with dense horizontal padding.
- **Color Assignment:** Solid ink background with paper text.
- **State:** Continuous pulse halo when active. If no jam URL exists, the control should not render.

### Work Timeline
- **Character:** The only place the site allows card repetition, and even here the cards need to feel light.
- **Shape:** `12px` radius cards with a separate `3px` accent rail element, not a colored border.
- **Color Assignment:** Frosted white fills over the paper background, muted supporting copy, accent rail tied to the active zone color.
- **State:** Cards slide in from the left on scroll, then lift slightly on hover.

### Footer and Cursor
- **Navigation:** There is no traditional nav bar. The site resolves into a footer link cloud and a looping scroll ending.
- **Footer Name:** Oversized display type with per-letter float and playful hover distortion.
- **Cursor:** A dot plus ring system that expands by state: default, link, project, and scene. Labels appear inside the ring when the interaction wants a verb.

## Do's and Don'ts

### Do:
- **Do** keep the base shell warm and quiet: `oklch(97% 0.008 80)` for the main page and `oklch(95% 0.006 78)` for resets.
- **Do** let project sections take the whole viewport and switch the full color zone, not just the headline.
- **Do** use Cabinet Grotesk boldly, with tight tracking and short, high-confidence lines.
- **Do** keep supporting copy narrow: around `38ch` in the hero, `42ch` in project insights, and under `62ch` in story text.
- **Do** make motion purposeful: pinned sections, cursor morphs, staggered reveals, pulse states, and looped scroll are all fair game.
- **Do** preserve live-feeling fragments like Now Playing and "listen with me" when data exists.
- **Do** preserve the legacy social link breadth, including Giphy and Duolingo, without turning the footer into an icon circus.

### Don't:
- **Don't** build generic PM portfolio templates, identical card grids, hero metric blocks, or gradient text.
- **Don't** paste a resume PDF into a webpage or let the site read like a resume wall.
- **Don't** bring back blockchain or crypto positioning from the old site.
- **Don't** list Bible for Bad People in the public projects surface.
- **Don't** use modal-heavy UX, glassmorphism cards, or side-stripe accent borders.
- **Don't** state "I make music" as a service line. Music can appear as texture, links, or live listening moments.
- **Don't** call this a "portfolio" in the interface. It is rashOS.
- **Don't** default to dark mode just because the work is technical. The implemented site has already chosen the lighter, warmer lane.
