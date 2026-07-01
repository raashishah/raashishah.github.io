# Product

## Register

brand

## Users

Hiring managers, founders, and potential consulting clients who want a fast read on who Raashi is and what she builds. They arrive from a link, tweet, or referral, often on mobile, with limited time. They need credibility, proof of end-to-end work, and a low-friction way to reach out.

## Product Purpose

raashishah.com is a personal brand surface that helps Raashi get hired or booked for consulting. It should communicate technical product leadership and hands-on building (apps, AI agents) without overselling or decorative noise.

The current homepage is deliberately basic: a quick, shippable version. The register stays **brand** because design is still the product, even when restrained. Future pages or redesigns can be more ambitious; this file sets the strategic floor, not a ceiling on craft.

Success looks like: visitors understand the role and tagline in seconds, explore relevant work if curious, and contact via `email me` or `let's meet sometime` (Calendly) in the header without friction. Twitter and other socials live in the footer.

## Brand Personality

Calm, direct, confident.

Voice is plain and specific. No hype, no jargon stacks, no performance of being a designer. Show work through real project and job stories pulled from CV copy. Let competence read quietly, like a well-edited Apple system screen.

## Anti-references

- rashOS scroll-journey, Lenis, preloader, custom cursor, decorative chrome
- Soft brutalism and pink maximalist directions from earlier iterations
- AI slop patterns: gradient text, glass cards, hero metrics, identical icon-card grids, side-stripe borders
- Oversized viewport-filling type and "portfolio template" layouts
- Rewriting Raashi's stories into generic marketing copy
- Listing Bible for Bad People on the public site

## Design Principles

1. **Extreme simplicity first.** Every element must earn its place. When in doubt, remove.
2. **Practice what you preach.** The site should feel as well-built as the products it describes: responsive, accessible, fast.
3. **Show, don't tell.** Projects and roles carry the proof; intro copy stays short.
4. **Preserve the voice.** Dropdown and project text comes from Raashi's CV and existing writing; edit lightly.
5. **System-native motion.** Animations follow Apple HIG timing and easing; they clarify state, never decorate.

## Accessibility & Inclusion

- Target WCAG 2.1 AA practices: visible `:focus-visible` rings, semantic landmarks, meaningful link labels (including external-tab cues), 44px minimum touch targets, safe-area insets for notched devices.
- Readable contrast on tinted neutrals; body copy in secondary ink, not pure gray-on-gray.
- System dark mode via `prefers-color-scheme` and semantic CSS tokens (no manual toggle).
- OG image and metadata must stay aligned with on-page intro copy (`siteConfig` single source).
