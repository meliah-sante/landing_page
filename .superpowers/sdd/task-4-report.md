# Task 4 Report — Complete Marketing Sections

## Outcome

Implemented the complete AURA marketing journey and integrated it into `App` in the approved order:

1. Hero
2. À l'origine
3. Vos réalités
4. Solution
5. AURA au quotidien
6. Modules
7. Calculatrice
8. Testimonial and pilot CTA
9. Footer

All inspected French source copy comes from `.superpowers/sdd/aura-reference-copy.md` and is centralized in typed exports. The seven realities remain sourced from their established exact-copy data file through the centralized content module.

## Implementation

- Added typed, centralized content for navigation, hero, origin, realities framing, solution, statistics, daily features, modules, calculator framing, testimonial, pilot CTA, and footer.
- Added no-prop section components for the hero, origin, solution, daily features, modules, pilot conversion area, and footer.
- Integrated the existing `RealitiesCarousel` and `LossCalculator` at `#realites` and `#calculatrice`.
- Updated the header navigation to the inspected labels and ensured every header link resolves to an existing page ID.
- Kept conversion links targeted to either `#calculatrice` or `#pilote`.
- Used the local official Méliah logo and AURA terminal artwork.
- Added custom voice-wave, signal-ring, comparison, phone-stage, module, statistics, and pilot artwork treatments.
- Added Motion viewport reveals with `useReducedMotion` fallbacks, alongside global reduced-motion CSS.
- Preserved semantic section landmarks, heading hierarchy, accessible labels, keyboard interaction, touch targets, and polite carousel announcements.
- Added responsive one/two/four-column compositions and fluid type/layout scaling.

## TDD Evidence

### RED

Created `src/components/MarketingSections.test.tsx` before production implementation.

Command:

```text
bun test src/components/MarketingSections.test.tsx
```

Observed result:

```text
0 pass
1 fail
Unable to find an accessible element with the role "heading" and name `/réinjectez 76.?766/i`
```

Expanded the test to lock the inspected conversion copy, section IDs, official AURA artwork, and conversion destinations, then confirmed both tests failed against the placeholder page.

### GREEN

After implementation:

```text
bun test src/components/MarketingSections.test.tsx
2 pass
0 fail
30 expect() calls
```

The first full-suite run identified three compatibility causes: an outdated singular CTA query after adding page CTAs, the previous calculator navigation label, and carousel accessible-name precedence. Each was isolated, corrected, and re-run through its affected tests before the final full verification.

## Verification

Final commands and results:

```text
bun test
32 pass
0 fail
154 expect() calls
Ran 32 tests across 6 files.
```

```text
bun run lint
eslint .
Exit code 0
```

```text
bun run build
tsc -b && vite build
2332 modules transformed
Build completed successfully
Exit code 0
```

The final test output contains no React warnings.

## Commits

- `10e64d5` — `feat: build complete AURA marketing journey`
- `21fb734` — `fix: align journey landmarks with navigation tests`

## Concerns

None.

---

## Task 4 Review Follow-up

### Findings Resolved

- Added `coral-accessible` (`#a83b32`) and its darker hover color for small coral text, active controls, and CTA backgrounds.
- Retained the brighter brand coral for decorative artwork and dark-surface pairings where its contrast passes.
- Raised low-opacity light-surface copy to at least 65% charcoal and fixed the hero note, calculator framing, card descriptions, testimonial attribution, footer legal links, and copyright.
- Raised dark-surface copy where needed, including the comparison label and footer/legal row.
- Changed the highlighted voice comparison card to the accessible coral so its white small text passes.
- Replaced self-referential legal fragments with `/mentions-legales` and `/politique-de-confidentialite`; retained `mailto:contact@meliahsante.fr`.
- Expanded marketing coverage with literal assertions for every comparison, statistic, daily feature, module, conversion destination, legal destination, named landmark, and reduced-motion hook.

### Contrast Validation

Calculated WCAG contrast for the revised core combinations:

- Accessible coral on white: `6.29:1`
- Accessible coral on warm white: `5.74:1`
- Accessible coral on coral-soft: `5.24:1`
- White on accessible coral: `6.29:1`
- 65% charcoal on coral-soft: `4.73:1`
- Bright coral on charcoal: `4.80:1`

These pairings meet WCAG AA for normal text. Decorative bright-coral treatments remain visually consistent with the brand.

### Review TDD Evidence

Added the expanded tests first and ran:

```text
bun test src/components/MarketingSections.test.tsx
```

Observed RED:

```text
6 pass
1 fail
Expected: "/mentions-legales"
Received: "#mentions-legales"
```

After implementing meaningful legal destinations:

```text
7 pass
0 fail
88 expect() calls
```

### Final Review Verification

```text
bun test
37 pass
0 fail
212 expect() calls
Ran 37 tests across 6 files.
```

```text
bun run lint
eslint .
Exit code 0
```

```text
bun run build
tsc -b && vite build
2332 modules transformed
Build completed successfully
Exit code 0
```

The test, lint, and build output is warning-free.

---

## Final Task 4 Review Follow-up

### Findings Resolved

- Removed the three unapproved visible strings: `AURA ÉCOUTE`, `Transmission structurée et sécurisée`, and `PROGRAMME PILOTE`.
- Preserved the hero visual with icon medallions, voice bars, and abstract interface lines; preserved the pilot treatment with a coral graphic rule.
- Moved `aria-roledescription="carrousel"` onto the named carousel region and added its explicit `role="region"`.
- Raised inactive carousel indicators to 50% charcoal and active indicators to accessible coral, producing at least `3.1:1` and `5.7:1` contrast respectively on the light carousel surface.
- Replaced every translucent coral/charcoal focus ring in the source:
  - Light interfaces use accessible coral, with at least `5.24:1` contrast against the light brand surfaces.
  - Dark footer and dark conversion areas use full bright coral, with `4.80:1` contrast against charcoal.
  - Neutral shared buttons use full charcoal against white/warm-white surfaces.
- Audited links, buttons, form fields, tabs, accordion trigger, mobile dialog controls, carousel controls, and the focusable carousel region.

### Final Review TDD Evidence

Added tests before implementation for the unapproved-copy removal and carousel role-description placement.

Observed RED:

```text
18 pass
2 fail
Expected unapproved copy query to be null; received an element.
Expected explicit role "region"; received null.
```

After implementation:

```text
20 pass
0 fail
157 expect() calls
```

### Final Verification

```text
bun test
39 pass
0 fail
218 expect() calls
Ran 39 tests across 6 files.
```

```text
bun run lint
eslint .
Exit code 0
```

```text
bun run build
tsc -b && vite build
2332 modules transformed
Build completed successfully
Exit code 0
```

All final verification output is warning-free.

---

## Calculator Boundary Contrast Follow-up

### Finding Resolved

- Replaced the unfocused `border-charcoal/15` boundary on the staff count, name, and email inputs with a shared `border-charcoal/50` boundary.
- The revised boundary measures approximately `3.2:1` against white and `3.1:1` against warm white, meeting WCAG 1.4.11 non-text contrast.
- Preserved the existing accessible coral focus ring and the calculator's warm-white input treatment.
- Centralized the input classes so every equivalent calculator field receives the same boundary and focus treatment.

### TDD Evidence

Added a regression test first that checks all three calculator inputs for the accessible shared boundary.

Observed RED:

```text
Expected to contain: "border-charcoal/50"
Received: "border-charcoal/15"
5 pass
1 fail
```

After implementation:

```text
6 pass
0 fail
27 expect() calls
```

### Verification

```text
bun test
40 pass
0 fail
221 expect() calls
Ran 40 tests across 6 files.
```

```text
bun run lint
eslint .
Exit code 0
```

```text
bun run build
tsc -b && vite build
2332 modules transformed
Build completed successfully
Exit code 0
```

All verification output is warning-free.
