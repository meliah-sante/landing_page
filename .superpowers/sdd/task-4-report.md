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
