# Enhanced AURA Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a faithful but UX-enhanced AURA marketing landing page from the supplied Lovable reference.

**Architecture:** A Vite React single-page application renders focused section components from centralized French content data. Pure calculator functions own all numerical behavior, while accessible React components own navigation, carousel, disclosure, and local lead-form state. Tailwind supplies layout tokens and custom CSS supplies the branded atmosphere and motion.

**Tech Stack:** Bun, React, TypeScript, Vite, Tailwind CSS, Radix UI primitives, Lucide React, Motion, Vitest, Testing Library.

## Global Constraints

- Preserve the supplied French copy, Méliah Santé branding, section order, coral-and-charcoal palette, logo, and phone artwork.
- Use accessible component-library primitives with fully customized public-facing styling.
- Store downloaded reference assets locally.
- Keep all behavior client-side; do not transmit or persist lead data.
- Respect `prefers-reduced-motion`.
- Support mobile, tablet, and desktop layouts.
- Exclude analytics, authentication, CMS, backend lead delivery, deployment configuration, and working translation.

---

### Task 1: Application Foundation and Brand Shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/lib/cn.ts`
- Create: `public/assets/meliah-logo.png`
- Create: `public/assets/phone-aura.png`

**Interfaces:**
- Produces: `Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" })`
- Produces: `SiteHeader(): JSX.Element`
- Produces: an application shell with `main`, header navigation, and target section landmarks.

- [ ] **Step 1: Scaffold package metadata and test tooling**

Create scripts:

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Add the latest stable React, Vite, TypeScript, Tailwind, Radix Dialog/Accordion, Lucide, Motion, Vitest, jsdom, ESLint, and Testing Library packages with Bun.

- [ ] **Step 2: Write the failing application-shell test**

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the primary navigation and page landmarks", () => {
  render(<App />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /réserver ma place pilote/i })).toHaveAttribute("href", "#pilote");
});
```

- [ ] **Step 3: Run the shell test and verify RED**

Run: `bun test src/App.test.tsx`

Expected: FAIL because `App`, the banner, or the pilot link does not exist.

- [ ] **Step 4: Implement the minimal shell**

Implement `App` with `SiteHeader`, `<main>`, placeholder section landmarks carrying the final anchor IDs, and `SiteHeader` with desktop navigation and a pilot link. Add base font, color variables, focus ring, container, and button styles.

- [ ] **Step 5: Download and verify reference artwork**

Download:

```bash
curl -L "https://id-preview--4a5877a8-c25c-4641-b0a9-59ff21a52682.lovable.app/assets/meliah-logo-DyeHYIYE.png" -o public/assets/meliah-logo.png
curl -L "https://id-preview--4a5877a8-c25c-4641-b0a9-59ff21a52682.lovable.app/assets/phone-aura-HLxkwOoh.png" -o public/assets/phone-aura.png
file public/assets/meliah-logo.png public/assets/phone-aura.png
```

Expected: both files report valid PNG image data.

- [ ] **Step 6: Run tests and verify GREEN**

Run: `bun test src/App.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit foundation**

```bash
git add package.json bun.lock tsconfig*.json vite.config.ts index.html src public/assets
git commit -m "feat: scaffold AURA landing foundation"
```

---

### Task 2: Calculator Domain Behavior

**Files:**
- Create: `src/features/calculator/calculations.ts`
- Create: `src/features/calculator/calculations.test.ts`
- Create: `src/features/calculator/LossCalculator.tsx`
- Create: `src/features/calculator/LossCalculator.test.tsx`

**Interfaces:**
- Produces: `calculateLoss(staffCount: number): LossResults`
- Produces: `validateLead(name: string, email: string): LeadErrors`
- Produces: `LossCalculator(): JSX.Element`
- `LossResults` contains `dailyEuros`, `monthlyEuros`, `yearlyEuros`, `dailyHours`, `monthlyHours`, and `yearlyHours`.

- [ ] **Step 1: Write failing calculation tests**

```ts
import { calculateLoss, validateLead } from "./calculations";

test("uses the published 40-caregiver baseline", () => {
  expect(calculateLoss(40).yearlyEuros).toBe(76766);
  expect(calculateLoss(40).dailyHours).toBeCloseTo(13.333, 2);
});

test("scales results linearly", () => {
  expect(calculateLoss(20).yearlyEuros).toBe(38383);
});

test("rejects invalid lead fields", () => {
  expect(validateLead("", "hello@example")).toEqual({
    name: "Indiquez votre nom.",
    email: "Indiquez un email professionnel valide."
  });
});
```

- [ ] **Step 2: Run calculations and verify RED**

Run: `bun test src/features/calculator/calculations.test.ts`

Expected: FAIL because the calculator module does not exist.

- [ ] **Step 3: Implement pure calculator functions**

Use:

```ts
const YEARLY_EUROS_FOR_40 = 76766;
const DAILY_HOURS_FOR_40 = 13 + 20 / 60;
const WORK_DAYS_PER_YEAR = 230;
const MONTHS_PER_YEAR = 12;
```

Clamp staff count to `1..1000`; round euro values to integers and hour values to two decimals. Validate non-empty trimmed name and a complete email-shaped value.

- [ ] **Step 4: Run calculations and verify GREEN**

Run: `bun test src/features/calculator/calculations.test.ts`

Expected: PASS.

- [ ] **Step 5: Write failing calculator component tests**

```tsx
test("switches between euro and hour results", async () => {
  render(<LossCalculator />);
  expect(screen.getByText("76 766 €")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("tab", { name: /heures/i }));
  expect(screen.getByText(/13 h 20/i)).toBeInTheDocument();
});

test("reveals the detailed result only after valid local submission", async () => {
  render(<LossCalculator />);
  await userEvent.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  expect(screen.getByText("Indiquez votre nom.")).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText("Votre nom"), "Camille");
  await userEvent.type(screen.getByLabelText("Email professionnel"), "camille@clinique.fr");
  await userEvent.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  expect(screen.getByRole("status")).toHaveTextContent(/résultat détaillé/i);
});
```

- [ ] **Step 6: Run component tests and verify RED**

Run: `bun test src/features/calculator/LossCalculator.test.tsx`

Expected: FAIL because `LossCalculator` does not exist.

- [ ] **Step 7: Implement the calculator component**

Build an accessible tab pair, constrained numeric input, three live result cards, Radix disclosure for methodology, labeled name/email fields, field errors, and a local success panel. Keep input values when switching modes.

- [ ] **Step 8: Run calculator tests and verify GREEN**

Run: `bun test src/features/calculator`

Expected: PASS.

- [ ] **Step 9: Commit calculator behavior**

```bash
git add src/features/calculator
git commit -m "feat: add interactive loss calculator"
```

---

### Task 3: Navigation and Realities Carousel

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteHeader.test.tsx`
- Create: `src/features/realities/realities.ts`
- Create: `src/features/realities/RealitiesCarousel.tsx`
- Create: `src/features/realities/RealitiesCarousel.test.tsx`

**Interfaces:**
- Produces: `REALITIES: Reality[]` where `Reality` has `number`, `title`, and `description`.
- Produces: `RealitiesCarousel(): JSX.Element`
- Site header owns desktop links and an accessible mobile Dialog.

- [ ] **Step 1: Write failing mobile-navigation test**

```tsx
test("opens and closes mobile navigation", async () => {
  render(<SiteHeader />);
  await userEvent.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
  expect(screen.getByRole("dialog", { name: /navigation/i })).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: /navigation/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run header test and verify RED**

Run: `bun test src/components/SiteHeader.test.tsx`

Expected: FAIL because no mobile menu button or dialog exists.

- [ ] **Step 3: Implement responsive mobile navigation**

Use Radix Dialog for focus trapping, Escape/outside close behavior, and an explicit close button. Close after selecting any navigation link.

- [ ] **Step 4: Run header test and verify GREEN**

Run: `bun test src/components/SiteHeader.test.tsx`

Expected: PASS.

- [ ] **Step 5: Write failing carousel test**

```tsx
test("moves through realities and announces progress", async () => {
  render(<RealitiesCarousel />);
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /réalité suivante/i }));
  expect(screen.getByText("02 / 07")).toBeInTheDocument();
  await userEvent.keyboard("{ArrowLeft}");
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
});
```

- [ ] **Step 6: Run carousel test and verify RED**

Run: `bun test src/features/realities/RealitiesCarousel.test.tsx`

Expected: FAIL because the carousel does not exist.

- [ ] **Step 7: Implement realities data and carousel**

Render all seven source realities, with current slide state, previous/next buttons, dot buttons, `aria-live` progress, ArrowLeft/ArrowRight handling, and touch swipe threshold of 40px. Show one card on mobile and responsive adjacent previews on wider screens.

- [ ] **Step 8: Run interaction tests and verify GREEN**

Run: `bun test src/components/SiteHeader.test.tsx src/features/realities/RealitiesCarousel.test.tsx`

Expected: PASS.

- [ ] **Step 9: Commit page interactions**

```bash
git add src/components src/features/realities
git commit -m "feat: add responsive navigation and realities carousel"
```

---

### Task 4: Complete Marketing Sections

**Files:**
- Create: `src/content/siteContent.ts`
- Create: `src/components/Hero.tsx`
- Create: `src/components/OriginSection.tsx`
- Create: `src/components/SolutionSection.tsx`
- Create: `src/components/DailyFeatures.tsx`
- Create: `src/components/ModulesSection.tsx`
- Create: `src/components/PilotCta.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/MarketingSections.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: centralized `dailyFeatures`, `modules`, `stats`, and navigation content arrays.
- Each section component accepts no props and renders from centralized content.
- `App` composes every section in the approved order.

- [ ] **Step 1: Write failing content and landmark test**

```tsx
test("renders the complete AURA conversion journey", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /réinjectez 76.?766/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /vos soignants, eux, sont au niveau/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /une suite complète/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /combien perdez-vous exactement/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /1 seul établissement pilote/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run marketing test and verify RED**

Run: `bun test src/components/MarketingSections.test.tsx`

Expected: FAIL because the marketing section components do not exist.

- [ ] **Step 3: Implement centralized content**

Transcribe the inspected French copy for hero, origin, seven realities, solution comparison, four statistics, six daily features, four modules, testimonial, pilot CTA, and footer into typed exported arrays and constants.

- [ ] **Step 4: Implement section components**

Compose semantic `<section>` landmarks, fluid headings, source artwork, Lucide icons, comparison cards, statistic cards, feature/module grids, testimonial, final CTA, and footer. Add Motion reveal wrappers with a reduced-motion fallback.

- [ ] **Step 5: Integrate calculator and carousel**

Place `RealitiesCarousel` in `#realites` and `LossCalculator` in `#calculatrice`. Ensure all header links target existing IDs and all CTAs use either `#calculatrice` or `#pilote`.

- [ ] **Step 6: Run marketing and full tests and verify GREEN**

Run: `bun test`

Expected: all tests PASS with no React warnings.

- [ ] **Step 7: Commit complete page**

```bash
git add src
git commit -m "feat: build complete AURA marketing journey"
```

---

### Task 5: Visual Polish, Accessibility, and Production Verification

**Files:**
- Modify: `src/index.css`
- Modify: affected component files when visual verification identifies a concrete issue
- Create: `eslint.config.js`

**Interfaces:**
- Produces: production-ready responsive styling and verified user flows.

- [ ] **Step 1: Add final responsive styling**

Implement custom shadows, coral gradients, dark-section atmosphere, ambient hero/CTA particles, animated voice waveform, sticky-header backdrop, card hover/focus states, `scroll-margin-top`, and `prefers-reduced-motion` overrides.

- [ ] **Step 2: Run automated verification**

Run:

```bash
bun run lint
bun test
bun run build
```

Expected: all commands exit 0 without warnings or errors.

- [ ] **Step 3: Start the production preview**

Run:

```bash
bun run dev
```

Expected: Vite reports a reachable local URL.

- [ ] **Step 4: Verify desktop behavior**

At 1440×900, confirm:

- sticky navigation and every anchor work;
- hero copy and phone artwork have balanced visual weight;
- carousel buttons, dots, keyboard arrows, and transitions work;
- calculator modes, validation, methodology disclosure, and local result reveal work;
- dark/light section transitions and focus indicators match the design.

- [ ] **Step 5: Verify mobile behavior**

At 390×844, confirm:

- no horizontal overflow;
- mobile menu opens, traps focus, closes with Escape and link selection;
- hero and all cards stack cleanly;
- realities swipe interaction works;
- calculator controls remain readable and touch targets are at least 44px.

- [ ] **Step 6: Capture walkthrough evidence**

Capture desktop and mobile screenshots and a short interaction recording showing navigation, carousel, and calculator behavior.

- [ ] **Step 7: Commit any verification fixes**

```bash
git add src eslint.config.js
git commit -m "fix: polish responsive AURA experience"
```

- [ ] **Step 8: Final push**

```bash
git push -u origin cursor/enhanced-aura-landing-885d
```
