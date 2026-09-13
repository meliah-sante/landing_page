# Simplified AURA Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long AURA product tour with the approved five-section pilot-first landing page and remove both phone mockups.

**Architecture:** Keep the existing React/Vite application and accessible interaction primitives. Compose the page from `Hero`, `OriginSection`, a rewritten `SolutionSection`, the existing `LossCalculator`, and a simplified `PilotCta`; consolidate static copy in `siteContent.ts` and remove obsolete sections from `App` without deleting reusable source files.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Radix UI, Motion, Lucide React, Vitest, Testing Library.

## Global Constraints

- Keep exactly five marketing regions in this order: `hero`, `origine`, `solution`, `calculatrice`, `pilote`.
- Remove both rendered instances of `phone-aura.png` and leave no empty image containers.
- Make “Réserver ma place pilote” the primary action and “Calculer mes pertes” secondary.
- Preserve the warm white, charcoal, cream, and accessible coral palette.
- Use spacious layout, restrained flat surfaces, and subtle reduced-motion-safe animation.
- Keep visible calculator labels, validation, methodology, and local-processing disclosure.
- Validate at 375px, 768px, 1024px, and 1440px; perform the requested desktop browser review.
- Do not add dependencies, backend behavior, analytics, authentication, translation, or deployment changes.

---

### Task 1: Lock the Five-Section Journey and Navigation

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/components/SiteHeader.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/content/siteContent.ts`

**Interfaces:**
- Produces: `navigation` with anchors `#origine`, `#solution`, `#calculatrice`, and `#pilote`.
- Produces: main-region order consumed by all later tasks.

- [ ] **Step 1: Write failing composition and navigation tests**

Update the expected region IDs:

```ts
const expectedSectionIds = ["hero", "origine", "solution", "calculatrice", "pilote"];
```

Assert that obsolete sections and navigation links are absent:

```ts
expect(document.getElementById("realites")).not.toBeInTheDocument();
expect(document.getElementById("fonctionnalites")).not.toBeInTheDocument();
expect(document.getElementById("modules")).not.toBeInTheDocument();
expect(within(header).queryByRole("link", { name: "Les réalités" })).not.toBeInTheDocument();
expect(within(header).queryByRole("link", { name: "Modules" })).not.toBeInTheDocument();
```

- [ ] **Step 2: Run tests and verify the expected red state**

Run:

```bash
npm test -- src/App.test.tsx src/components/MarketingSections.test.tsx src/components/SiteHeader.test.tsx
```

Expected: failures report eight existing regions and obsolete navigation links.

- [ ] **Step 3: Implement minimal five-section composition**

Change `App.tsx` to render:

```tsx
<Hero />
<OriginSection />
<SolutionSection />
<section id="calculatrice" role="region" aria-labelledby="calculator-title">
  {/* existing calculator heading and LossCalculator */}
</section>
<PilotCta />
```

Remove imports and render calls for `RealitiesCarousel`, `DailyFeatures`, and `ModulesSection`. Replace `navigation` with the four approved anchors.

- [ ] **Step 4: Run focused tests and verify green**

Run the Task 1 command again. Expected: all focused tests pass after removing assertions tied to the old eight-section page.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/content/siteContent.ts src/components/MarketingSections.test.tsx src/components/SiteHeader.test.tsx
git commit -m "refactor: simplify AURA page journey"
```

### Task 2: Remove Phone Artwork and Build the Pilot-First Hero

**Files:**
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `hero` and `PILOT_REQUEST_URL` from `siteContent.ts`.
- Produces: phone-free hero with primary pilot link and secondary calculator link.

- [ ] **Step 1: Write failing hero behavior tests**

Add assertions:

```ts
const hero = document.getElementById("hero")!;
expect(within(hero).queryByRole("img", { name: /interface aura/i })).not.toBeInTheDocument();
expect(document.querySelector('img[src*="phone-aura.png"]')).not.toBeInTheDocument();
expect(within(hero).getByRole("link", { name: /réserver ma place pilote/i })).toHaveAttribute(
  "href",
  PILOT_REQUEST_URL,
);
expect(within(hero).getByRole("link", { name: /calculer mes pertes/i })).toHaveAttribute(
  "href",
  "#calculatrice",
);
```

- [ ] **Step 2: Run the test and verify red**

Run:

```bash
npm test -- src/components/MarketingSections.test.tsx
```

Expected: the hero still contains `phone-aura.png` and uses the calculator as the first CTA.

- [ ] **Step 3: Implement the phone-free hero**

Remove `assetUrl` and the `<img>`. Put the pilot link first and render a compact decorative proof panel containing “150 mots/min”, “4x plus rapide”, and an `AudioWaveform` visualization. Use semantic text for the proof and `aria-hidden` only for decorative bars/icons.

- [ ] **Step 4: Replace obsolete phone CSS**

Delete `.hero-phone`, `.phone-stage`, `.phone-glow`, and `.phone-caption`. Rework `.hero-visual` as a shorter proof panel that does not reserve a 32rem phone column, and retain static final states under `prefers-reduced-motion`.

- [ ] **Step 5: Run focused tests and verify green**

Run the Task 2 command. Expected: all marketing tests pass with zero rendered phone images.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx src/components/MarketingSections.test.tsx src/index.css
git commit -m "feat: create phone-free pilot hero"
```

### Task 3: Merge Problem, Benefits, Statistics, and Modules

**Files:**
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/components/SolutionSection.tsx`
- Modify: `src/content/siteContent.ts`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `solutionBenefits`, an array of four benefit objects with `title`, `description`, `stat`, and `statDescription`.
- Consumes: the approved strongest copy from the former realities, daily features, modules, and stats.

- [ ] **Step 1: Write failing solution tests**

Assert one visible solution region with four scannable benefits:

```ts
const solution = document.getElementById("solution")!;
[
  "150 mots/min",
  "13h20",
  "76 766€",
  "1.1 ETP",
  "4x",
  "Traçabilité structurée",
  "Priorités et transmissions",
].forEach((text) => expect(within(solution).getByText(text, { exact: true })).toBeInTheDocument());
expect(within(solution).queryByRole("link", { name: "Prendre rendez-vous" })).not.toBeInTheDocument();
expect(screen.queryByRole("heading", { name: /une suite complète/i })).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the test and verify red**

Run:

```bash
npm test -- src/components/MarketingSections.test.tsx
```

Expected: merged benefit headings are absent and old solution CTA remains.

- [ ] **Step 3: Consolidate content**

Add a typed `solutionBenefits` export with four entries:

```ts
export type SolutionBenefit = {
  title: string;
  description: string;
  stat: string;
  statDescription: string;
  icon: "mic" | "clock" | "shield" | "handover";
};
```

Use existing literal claims only. Add a concise suite note naming FOCUS, DÔME, and PRIORIS without rendering separate module cards.

- [ ] **Step 4: Rewrite `SolutionSection`**

Render a concise intro, the keyboard/voice comparison, and a responsive four-card benefit grid. Remove the old CTA and repeated standalone stats grid. Keep HDS/RGPD copy as supporting trust text.

- [ ] **Step 5: Run focused tests and verify green**

Run the Task 3 command. Expected: the merged content is visible without carousel, daily-feature, or module regions.

- [ ] **Step 6: Commit**

```bash
git add src/components/SolutionSection.tsx src/components/MarketingSections.test.tsx src/content/siteContent.ts src/index.css
git commit -m "feat: merge AURA solution proof"
```

### Task 4: Tighten the Calculator and Add the Pilot Next Step

**Files:**
- Modify: `src/features/calculator/LossCalculator.test.tsx`
- Modify: `src/features/calculator/LossCalculator.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `PILOT_REQUEST_URL`.
- Produces: a pilot CTA displayed only after a valid detailed result.

- [ ] **Step 1: Write a failing calculator conversion test**

After entering a valid name and professional email and submitting:

```ts
expect(
  screen.getByRole("link", { name: /réserver ma place pilote/i }),
).toHaveAttribute("href", PILOT_REQUEST_URL);
```

Also assert the link is absent before submission.

- [ ] **Step 2: Run the test and verify red**

Run:

```bash
npm test -- src/features/calculator/LossCalculator.test.tsx
```

Expected: no pilot link exists in the detailed result.

- [ ] **Step 3: Implement the result CTA**

Import `PILOT_REQUEST_URL` and append a clearly labeled link to `DetailedBreakdown`. Keep local-only disclosure, validation, both result modes, and methodology unchanged.

- [ ] **Step 4: Tighten calculator section presentation**

Reduce the surrounding section heading measure and spacing in `App.tsx`; do not remove visible labels or disclosures.

- [ ] **Step 5: Run focused tests and verify green**

Run the Task 4 command. Expected: all calculator tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/features/calculator/LossCalculator.tsx src/features/calculator/LossCalculator.test.tsx src/App.tsx
git commit -m "feat: connect calculator results to pilot"
```

### Task 5: Simplify Trust and Final CTA Presentation

**Files:**
- Modify: `src/components/MarketingSections.test.tsx`
- Modify: `src/components/OriginSection.tsx`
- Modify: `src/components/PilotCta.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `origin`, `pilot`, and `PILOT_REQUEST_URL`.
- Produces: one founder quote in `origine` and one conversion card in `pilote`.

- [ ] **Step 1: Write failing duplication tests**

Add:

```ts
expect(screen.getAllByText(origin.quote, { exact: true })).toHaveLength(1);
expect(screen.queryByText(testimonial.quote, { exact: true })).not.toBeInTheDocument();
const pilot = document.getElementById("pilote")!;
expect(within(pilot).getByRole("link", { name: /réserver ma place pilote/i })).toHaveAttribute(
  "href",
  PILOT_REQUEST_URL,
);
```

- [ ] **Step 2: Run the test and verify red**

Run:

```bash
npm test -- src/components/MarketingSections.test.tsx
```

Expected: the separate testimonial still renders in `PilotCta`.

- [ ] **Step 3: Simplify the sections**

Condense origin paragraphs to the strongest field-experience statements while retaining the founder quote. Remove the testimonial `<figure>` from `PilotCta` and keep only the high-contrast conversion card.

- [ ] **Step 4: Normalize responsive spacing**

Reduce `.section-pad` and hero vertical height for the shorter page, preserve 44px minimum controls, and ensure benefit cards form four columns only where readable.

- [ ] **Step 5: Run focused tests and verify green**

Run the Task 5 command. Expected: one founder quote and one final pilot conversion card.

- [ ] **Step 6: Commit**

```bash
git add src/components/OriginSection.tsx src/components/PilotCta.tsx src/components/MarketingSections.test.tsx src/index.css
git commit -m "refactor: focus trust and pilot sections"
```

### Task 6: Full Verification and Desktop Review

**Files:**
- Modify only if verification exposes a tested defect.

**Interfaces:**
- Verifies the complete approved experience.

- [ ] **Step 1: Check environment setup status**

Confirm `/tmp/cursor/async-install/install-user.status` is `0`, or establish that no background setup is running.

- [ ] **Step 2: Run automated verification**

```bash
npm test
npm run lint
npm run build
```

Expected: all commands exit `0` with no test failures, lint errors, or TypeScript/build errors.

- [ ] **Step 3: Start the production preview**

Build and serve the application from a tmux-backed session so the browser can review the actual output.

- [ ] **Step 4: Review at desktop width**

At approximately 1440x900, verify:

- five-section order and reduced page length;
- no phone image or empty phone container;
- hero CTA hierarchy;
- readable solution grid and statistics;
- calculator result-to-pilot flow;
- focus states and no horizontal overflow.

- [ ] **Step 5: Review responsive breakpoints**

Verify 375px, 768px, and 1024px layouts, including mobile navigation, stacked calculator fields, 44px targets, and no clipped content.

- [ ] **Step 6: Verify reduced motion**

Enable `prefers-reduced-motion`, reload, and confirm all content is visible without ongoing decorative movement.

- [ ] **Step 7: Inspect final diff and push**

```bash
git diff main...HEAD --check
git status --short
git push -u origin cursor/simplify-aura-landing-885d
```

Expected: clean diff check, no uncommitted implementation files, and remote branch updated.
