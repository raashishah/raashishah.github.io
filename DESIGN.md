# rashOS Design System

Source of truth for the scroll journey UI. Project detail pages (`/project/[slug]`) may retain legacy per-project palettes until a future pass.

## North star

**Quiet stage, loud work.** Warm paper base, black ink, old rose accent used sparingly. Soft brutalism: big type, fast meaningful motion, unified palette everywhere.

## Palette (hard rule)

Only these five tokens on the scroll journey — scenes, UI mocks, cursor, loaders:

| Token     | Hex       | Use                                      |
| --------- | --------- | ---------------------------------------- |
| base      | `#f5ede8` | All section backgrounds                  |
| ink       | `#111010` | Text, strokes, coral branches            |
| old rose  | `#c08081` | Accent, gradient bleed, hover underlines |
| grey-blue | `#8fa0b4` | Labels, metadata                         |
| navy      | `#1a2038` | Rare deep moments only                   |

Implementation: `lib/palette.ts` → CSS vars in `app/globals.css`.

## Typography

- **Font:** Cabinet Grotesk (self-hosted), all weights
- **Hero headline:** `apps and ai tools designer and engineer` — lowercase, ~14vw, Bold
- **Hero eyebrow:** `originally a product manager` — lowercase, grey-blue
- **Project titles:** `clamp(80px, 10vw, 140px)`
- **Taglines / insights:** `clamp(18px, 2vw, 26px)`
- **Section labels:** 11px caps, grey-blue

## Motion principles

- GSAP ScrollTrigger for pin/scrub sections
- Lenis smooth scroll (default speed — no bump)
- Shared RAF via `lib/animation-ticker.ts` for cursor + 2D scenes
- R3F loop isolated to Pluto scene only
- `prefers-reduced-motion`: skip preloader, static scenes, no cursor canvas
- E2E mode `?e2e=1`: skip preloader, disable Lenis/cursor

## Preloader

Black coral SVG branches draw bottom-up (`strokeDashoffset`). Old rose bleeds root-to-tip at ~25–35% opacity into base. Hold ~1.75s after draw, then full-height upward wipe (~0.85s).

## Hero

- **No WebGL.** 2D modular grid canvas (Fiddle Digital ref): black-bordered cells shift/skew near cursor.
- **Texture headline** (Duten ref): grain masked by pointer through letterforms.
- Thick vertical scroll bar pulse at bottom.

## Cursor (Petra Garmon ref)

- Brushstroke ink trail (~400ms fade) on shared ticker
- **Link:** horizontal caret line
- **Project section:** rose blob + project name label
- **Magnetic links:** pull origin within 80px, stroke thickens
- Disabled on `pointer: coarse`

## Project scenes

| Slug        | Renderer | Story                                              |
| ----------- | -------- | -------------------------------------------------- |
| admissions  | 2D SVG   | Applicant table + animated rubric weights          |
| expression  | 2D SVG   | Cartwheel line-art frames, rose region fills        |
| design-pov  | 2D SVG   | Exhibition map, visitor path, offline badge          |
| pluto       | R3F      | Chaotic art tiles snap into product grid           |
| kawa        | 2D SVG   | Rainfall chatbot — "Is it raining in Shoreditch?"  |
| aula        | 2D SVG   | Wild online classroom — tiles, chat, hand-raise      |
| kotak       | 2D SVG   | Consumer trading UI — ticker, swipe card, P&L ring |

## Footer & timeline

- Footer: name stretch on hover; social links with rose underline (no marquee)
- Igloo-style loop scroll at page end
- Work timeline: vertical line draws on scroll; entries slam from left; year counters animate

## Performance budget

| Metric                 | Target                                      |
| ---------------------- | ------------------------------------------- |
| Desktop scroll         | 60fps pinned sections                       |
| Max active RAF sources | 3 (Lenis + shared ticker + 1 R3F canvas)    |
| Scene mount            | Lazy IntersectionObserver in ProjectSection |
| Reduced motion         | Static fallbacks throughout                 |

## References

- [Fiddle Digital canvas grid](https://www.awwwards.com/inspiration/canvas-grid-fiddle-digital-design-agency)
- [Duten texture hover](https://www.awwwards.com/inspiration/texture-hover-reveal-duten)
- [Petra Garmon cursor](https://www.awwwards.com/inspiration/cursor-desktop-petra-garmon)
- landonorris.com, igloo.inc, op.al, lusion.co
