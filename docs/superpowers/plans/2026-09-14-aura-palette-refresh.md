# AURA Palette Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved all-light AURA ivory, rose, and orange design system with Outfit headings and DM Sans body typography.

**Architecture:** Define the supplied palette as semantic Tailwind theme tokens, self-host the two variable fonts, and migrate each rendered section away from legacy dark-surface assumptions. Preserve the existing five-section React composition and all calculator/navigation behavior.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Bun lockfile, Fontsource variable fonts, Vitest, Testing Library.

## Global Constraints

- Use `#FBFAF9`, `#FFFFFF`, `#F2F0ED`, `#E9E6E2`, `#171C26`, and `#6A7181` for dominant surfaces and text.
- Use `#EA2E5D`, `#FA942E`, `#FCE8ED`, and `#B8143D` for brand treatment.
- Use deep rose `#B8143D` behind normal white CTA text.
- Use orange `#FA942E` with ink text when orange carries text.
- Remove all rendered dark section and footer surfaces.
- Use Outfit Variable for headings and DM Sans Variable for body text, self-hosted without Google Fonts.
- Keep success and destructive colors semantic-only.
- Preserve the five-section structure, calculator behavior, focus management, and unbroken `76 766€`.

---

### Task 1: Install Fonts and Define Semantic Tokens

**Files:**
- Create: `src/theme.test.ts`
- Modify: `src/main.tsx`
- Modify: `src/index.css`
- Modify: `package.json`
- Modify: `bun.lock`
- Modify: `index.html`

**Interfaces:**
- Produces Tailwind tokens `background`, `card`, `muted`, `border`, `foreground`, `muted-foreground`, `primary`, `secondary`, `primary-foreground`, `accent`, `accent-foreground`, `success`, and `destructive`.
- Produces `font-heading` and `font-sans`.

- [ ] Write a failing raw-source test asserting every supplied hex token, Outfit/DM Sans font variables, font imports in `main.tsx`, and theme color `#FBFAF9`.
- [ ] Run `npm test -- src/theme.test.ts` and confirm failure because semantic tokens and font imports are absent.
- [ ] Run `npx -y bun@latest add @fontsource-variable/outfit@latest @fontsource-variable/dm-sans@latest`.
- [ ] Import the two variable font CSS files in `main.tsx`.
- [ ] Define semantic tokens and temporary legacy aliases in `index.css`; assign DM Sans to `--font-sans` and Outfit to `--font-heading`.
- [ ] Update the HTML theme color to `#FBFAF9`.
- [ ] Run the focused test and confirm it passes.
- [ ] Commit with `feat: add AURA color and type tokens`.

### Task 2: Convert Global Controls, Header, and Hero

**Files:**
- Modify: `src/components/SiteHeader.test.tsx`
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes the semantic theme tokens from Task 1.
- Produces light navigation, deep-rose CTAs, and the ivory/rose/orange hero.

- [ ] Add failing tests for semantic primary CTA classes, Outfit heading class, ivory skip-link offset, and warm hero proof treatment.
- [ ] Run the focused header/marketing tests and confirm legacy charcoal/coral classes cause failure.
- [ ] Migrate global CTA styles, shared buttons, header, skip link, and hero to semantic classes.
- [ ] Apply `font-heading` to display and section title styles.
- [ ] Replace waveform and ambient effects with rose-to-orange treatments while preserving reduced motion.
- [ ] Run focused tests and confirm they pass.
- [ ] Commit with `feat: restyle AURA header and hero`.

### Task 3: Replace Dark Trust, Pilot, and Footer Surfaces

**Files:**
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/components/OriginSection.tsx`
- Modify: `src/components/PilotCta.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces only light ivory, white, muted, and accent-wash surfaces outside the solution section.

- [ ] Add failing tests asserting `origine`, `pilote`, and the footer do not contain `bg-charcoal` or primary `text-white` surface treatments.
- [ ] Run the marketing test and confirm the founder quote, pilot card, and footer are still dark.
- [ ] Convert the founder quote to an accent-wash card with ink copy and deep-rose attribution.
- [ ] Convert the pilot card to a white/rose-wash surface with ink heading and muted body.
- [ ] Convert the footer to ivory/white with warm border, original-color logo, ink copy, and rose hover/focus.
- [ ] Run the focused test and confirm it passes.
- [ ] Commit with `feat: create light trust and pilot surfaces`.

### Task 4: Convert Solution and Calculator to Light Semantic Surfaces

**Files:**
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/features/calculator/LossCalculator.test.tsx`
- Modify: `src/components/SolutionSection.tsx`
- Modify: `src/features/calculator/LossCalculator.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces a light four-card solution grid and semantic calculator states.

- [ ] Add failing tests asserting the solution region has no dark background/text classes, benefit cards use white surfaces, and calculator errors use destructive rather than brand rose.
- [ ] Run focused tests and confirm current dark solution and coral validation classes fail.
- [ ] Convert the solution base to an ivory-to-accent wash, comparison cards to muted/white surfaces, and metrics to deep rose.
- [ ] Convert calculator section, tabs, inputs, disclosures, errors, and detailed results to semantic tokens.
- [ ] Keep result focus management, visible labels, modes, and disclosures unchanged.
- [ ] Run focused tests and confirm they pass.
- [ ] Commit with `feat: apply light solution and calculator theme`.

### Task 5: Full Verification and Desktop Review

**Files:**
- Modify only if a verified defect requires a regression test and fix.

**Interfaces:**
- Verifies the complete palette refresh.

- [ ] Run `npm test`, `npm run lint`, and `npm run build`.
- [ ] Run `git diff --check main...HEAD -- ':!.cursor/**'`.
- [ ] Review localhost at 1440×900, 1024×768, 768×1024, 375×812, and 320px wide.
- [ ] Confirm no dark sections, clear light-surface boundaries, correct Outfit/DM Sans loading, readable rose/orange gradients, no overflow, and unchanged interactions.
- [ ] Verify keyboard focus, reduced motion, mobile navigation, calculator tabs, validation, result focus, and pilot links.
- [ ] Request code review and resolve all Critical or Important findings.
- [ ] Push the feature branch, merge it into the latest `main`, rerun tests/lint/build on `main`, and push `main`.
