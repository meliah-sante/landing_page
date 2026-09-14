# AURA Argument Rewrite Implementation Plan

> **For agentic workers:** Tasks are tightly coupled across copy, theme, and layout. Execute inline in this session. Use TDD. Do not dispatch independent implementer subagents.

**Goal:** Replace the magenta palette with the red-orange gradient and rewrite the page so each section advances one claim.

**Architecture:** Keep the five-section React page. Change tokens in `src/index.css`, unique claims in `src/content/siteContent.ts`, and the presentational components that currently repeat proof or force tall empty regions.

**Tech Stack:** React 19, Vite, Tailwind 4, Vitest, Testing Library.

## Global Constraints

- Brand gradient stops are exactly `#ee4a4e`, `#f75b46`, `#f6753a`.
- Accessible small-text brand color is `#ca3e42`.
- Primary CTA text is `#171C26` on the brand gradient.
- Ivory surfaces stay. No dark sections.
- Outfit / DM Sans remain self-hosted.
- Pilot mailto and calculator logic stay unchanged.

---

### Task 1: Lock unique copy and brand tokens in tests

**Files:**
- Modify: `src/theme.test.ts`
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/App.test.tsx`

- [ ] Write failing assertions for the three brand stops, numbered journey copy, hero-only euro proof, solution-only voice speed, and three solution steps.
- [ ] Run `npm test -- src/theme.test.ts src/components/MarketingSections.test.tsx src/App.test.tsx` and confirm RED.
- [ ] Implement content, CSS, and section markup.
- [ ] Re-run those tests GREEN, then `npm test`, `npm run lint`, `npm run build`.
- [ ] Commit.

### Task 2: Apply tokens, tighten layout, rewrite sections

**Files:**
- Modify: `src/content/siteContent.ts`
- Modify: `src/index.css`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/OriginSection.tsx`
- Modify: `src/components/SolutionSection.tsx`
- Modify: `src/components/PilotCta.tsx`
- Modify: `src/App.tsx`

Hero proof shows `13h20`, not `150 mots/min`. Solution renders comparison plus three steps. Padding and min-heights become content-driven.

### Task 3: Review the live page

Verify at 375px and 1440px: gradient visible on CTAs and waveforms, no duplicated euro/time/speed claims, footer flush, no empty hero viewport.
