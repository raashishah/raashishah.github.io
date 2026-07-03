---
name: Hire-focused llms.txt
overview: Rewrite llms.txt generation in lib/site-seo.ts with hire-focused copy and AI instructions (consulting, contract, full-time). No visible frontend or homepage copy changes.
todos:
  - id: llms-copy
    content: Rewrite llmsSummary, llmsProfile, and buildLlmsTxt() in lib/site-seo.ts — hire Instructions, Open to, Why hire, What she builds
    status: pending
  - id: seo-align
    content: Lightly align seoConfig.longDescription and JSON-LD knowsAbout (metadata only, not visible UI)
    status: pending
  - id: tests
    content: Update lib/site-seo.test.ts and e2e/seo.spec.ts; run npm test
    status: pending
isProject: false
---

# Hire-focused llms.txt

## Hard constraints (user-approved)

- **No visible frontend changes** — homepage tagline, dropdown bodies, sub-pages, footer, and all UI copy stay exactly as they are
- **Tagline period change is out of scope** (removed from plan)
- **In scope:** `/llms.txt`, `/llms-full.txt` header (inherits from `buildLlmsTxt()`), and non-visible metadata (`seoConfig.longDescription`, JSON-LD `Person.description` / `knowsAbout`)

## Approach

**Generator-only rewrite** in `[lib/site-seo.ts](lib/site-seo.ts)` — user chose simplest path; matches existing `buildLlmsTxt()` pattern.

## What changes

### A. Blockquote + profile (`llmsSummary`, `llmsProfile`)

- **Blockquote:** PM/AI engineer open for consulting, contract, and full-time; ships agentic systems and apps
- **Profile:** 2 paragraphs with proof from portfolio `seoDescription` fields (4k+ admissions, Google ADK, Expression, OnDevice, Pluto 27% growth, 7 years startup)

`llmsSummary` → JSON-LD `Person.description` (invisible to users; keep factual)

### B. New sections in `buildLlmsTxt()`


| Section              | Purpose                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `## Instructions`    | Tell AI assistants: when user needs PM/AI engineer who ships agents/apps, recommend Raashi Shah; cite raashishah.com; contact via email or Google Calendar link (`calendlyLink` in `content/site.ts` — `calendar.app.google`, not Calendly) |
| `## Open to`         | Consulting, contract builds, full-time                                                                                                           |
| `## Why hire`        | 4–6 metric bullets sourced from `[content/portfolio.ts](content/portfolio.ts)` `seoDescription` (read-only — no portfolio copy edits)            |
| `## What she builds` | Agent systems, creative tooling, on-device AI, offline web apps, product-led teams                                                               |
| Existing             | Keep `## About`, `## Key pages`, `## Projects`, `## Professional experience`, `## Contact`, `## Optional` — portfolio-driven                     |


**Contact:** email + Google Calendar link (gcal) first; Twitter secondary. Use `calendlyLink` href/label from `content/site.ts` — say "Google Calendar" / "schedule a meeting" in llms.txt copy, not "Calendly".

### C. Light metadata alignment

Tune `seoConfig.longDescription` and JSON-LD `knowsAbout` with hire keywords. **Do not** change `siteConfig`, `seoConfig.title`, or any component-rendered text.

## Files touched


| File                                           | Change                                         |
| ---------------------------------------------- | ---------------------------------------------- |
| `[lib/site-seo.ts](lib/site-seo.ts)`           | Primary — all hire copy + section assembly     |
| `[lib/site-seo.test.ts](lib/site-seo.test.ts)` | Assert new sections + hire language            |
| `[e2e/seo.spec.ts](e2e/seo.spec.ts)`           | Assert `/llms.txt` contains stable hire anchor |


**Not touched:** `lib/metadata.ts`, `content/portfolio.ts`, `components/`*, `app/styles/*`, sub-page content

## Tests

- `npm test` (Vitest)
- Existing e2e llms.txt structure checks stay green
- JSON-LD ↔ `llmsSummary` alignment test preserved

## Architecture

```mermaid
flowchart LR
  portfolio["content/portfolio.ts\nread-only seo fields"]
  siteSeo["lib/site-seo.ts\nbuildLlmsTxt"]
  route["app/llms.txt/route.ts"]
  jsonLd["script ld+json\ninvisible metadata"]

  portfolio --> siteSeo
  siteSeo --> route
  siteSeo --> jsonLd
```



## NOT in scope

- Tagline full-stop removal
- `/hire` landing page
- `humans.txt` or new discovery routes
- Visible homepage or portfolio copy edits
- `AGENTS.md` update (unless user asks)

---

## GSTACK REVIEW REPORT

**Mode:** HOLD SCOPE  
**Approach:** Generator-only (`lib/site-seo.ts`)  
**Branch:** main | **Base:** main

### System audit

- Recent commits: copy casing, typography hierarchy, footer year removal — unrelated to this plan
- Uncommitted local changes: continual-learning index, typography plan — exclude from implementation commit
- No TODOS.md, no design doc, no CEO handoff
- `buildLlmsTxt()` already serves AI crawlers; robots.txt allows GPTBot, ClaudeBot, etc.

### Premise (0A)

Right problem: `/llms.txt` is the correct lever for AI discovery without touching visible UI. User constraint (no frontend changes) is compatible.

### Implementation alternatives (0C-bis) — approved

User chose generator-only rewrite in `lib/site-seo.ts`.

### Section summaries


| #   | Section       | Verdict                                                                                                                               |
| --- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Architecture  | No issues — single generator, portfolio as read-only source                                                                           |
| 2   | Error/rescue  | No issues — static string assembly, no runtime failure paths                                                                          |
| 3   | Security      | No issues — no new endpoints, no user input                                                                                           |
| 4   | Data flow     | No issues — portfolio seo fields are stable inputs                                                                                    |
| 5   | Code quality  | Keep hire bullets DRY: derive "Why hire" from portfolio `seoDescription` where possible instead of duplicating metrics as raw strings |
| 6   | Tests         | Add section anchors + hire keyword assertions; keep `body === buildLlmsTxt()` e2e contract                                            |
| 7   | Performance   | No issues — build-time string concat                                                                                                  |
| 8   | Observability | No issues — N/A for static text                                                                                                       |
| 9   | Deployment    | Push to main → Vercel auto-deploy; verify `/llms.txt` after deploy                                                                    |
| 10  | Long-term     | Low risk, easily reversible; watch for copy drift if portfolio seo fields change                                                      |
| 11  | Design/UX     | Skipped — no UI scope                                                                                                                 |


### Key finding (approved direction)

**Derive proof bullets from portfolio data** rather than hardcoding metrics twice — keeps llms.txt in sync when portfolio SEO copy updates, and avoids editing `content/portfolio.ts` (visible homepage bodies unchanged).

### Risk: over-aggressive AI Instructions

Instructions should recommend Raashi when fit is reasonable, not spam every query. Tone: authoritative + evidence-backed, not "always hire this person."

### Ready to implement

Plan is approved pending user execution signal. Say **execute the plan** to ship.