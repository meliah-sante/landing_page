# Simplified AURA Landing Page Design

## Goal

Reduce the AURA landing page from a long, repetitive product tour to a focused five-section conversion journey. Remove both phone mockups, preserve the existing Méliah Santé identity, and make the pilot request the primary action while retaining the loss calculator as a useful secondary path.

## Design Inputs

The direction combines:

- User approval of a shorter four-to-five-section page.
- A desktop review of the live site at approximately 1440px wide.
- UI UX Pro Max guidance favoring spacious density, subtle motion, trust and authority, concise proof, and a clear CTA hierarchy.

The plugin's suggested cyan palette and neumorphism are not adopted. They conflict with the established warm brand identity, and neumorphism introduces unnecessary contrast and affordance risk. The existing warm white, charcoal, and accessible coral palette remains the source of truth.

## Conversion Strategy

The primary action is **“Réserver ma place pilote.”** It appears in the header, hero, and final CTA with the same label and destination.

The secondary action is **“Calculer mes pertes.”** It scrolls to the compact calculator and remains visually subordinate to the pilot CTA.

Other competing action labels such as “Prendre rendez-vous” and “Découvrir tous les modules” are removed. Supporting content should inform either the pilot decision or the calculator interaction rather than create additional paths.

## Page Structure

### 1. Header and Hero

- Keep the sticky Méliah Santé header.
- Reduce desktop navigation to the remaining major sections: Origine, Solution, Calculatrice, and Pilote.
- Keep the language indicator and pilot CTA.
- Use a single-column or asymmetrically centered hero without product photography.
- Retain the current financial value proposition and short explanatory copy.
- Show the pilot CTA as the primary filled button and the calculator as a secondary text or outline action.
- Replace the phone mockup with restrained, non-literal voice and time signals: a compact waveform, a small “150 mots/min” comparison, or abstract ambient shapes.
- Decorative signals must not compete with the headline and must be hidden from assistive technology.

### 2. Founder Trust

- Keep the strongest origin statement and founder quote in one compact section.
- Remove repeated testimonial treatment later in the page.
- Emphasize the product's origin in ten years of healthcare field experience.
- Use restrained typography and a short readable text measure instead of multiple long paragraphs.

### 3. AURA Solution and Proof

Merge the current realities carousel, dark solution section, daily feature grid, and module overview into one scannable section.

- Introduce the administrative-time problem in one short paragraph.
- Replace the seven-item carousel with visible desktop content; no information is hidden behind pagination.
- Use three or four benefit cards covering:
  1. Voice speed versus keyboard input.
  2. Time and staffing capacity recovered.
  3. Structured, timestamped, reliable traceability.
  4. Clear priorities and safer handovers.
- Integrate the strongest statistics—13h20, 76 766€, 1.1 ETP, and 4x—into those cards rather than repeating them in a separate block.
- Mention FOCUS, DÔME, and PRIORIS in a concise supporting row or sentence only if they clarify the broader product suite. Do not retain the full module-card section.
- Remove the second phone mockup and all duplicated feature cards.

### 4. Compact Loss Calculator

- Keep the existing calculator logic and immediate result behavior.
- Tighten its surrounding copy and vertical spacing.
- Keep visible field labels, inline validation, methodology disclosure, and local-processing disclosure.
- Preserve euro and time views only if both remain easy to understand; do not add new calculator complexity.
- After a valid detailed result, present the pilot CTA as the clear next step.

### 5. Pilot CTA

- Keep the high-contrast pilot card and scarcity-led heading.
- Integrate the founder testimonial only if it adds proof without repeating the trust section; otherwise omit it here.
- Retain the three-month offer, founder support, response expectation, and mailto destination.
- End with one primary CTA and no competing action.

The existing minimal footer remains outside the five marketing sections.

## Visual Direction

- Preserve warm white, charcoal, cream, and accessible coral.
- Preserve the current type family unless testing shows a readability issue; do not introduce a new external font solely because the plugin suggested one.
- Use one dominant hero heading size and smaller, consistent section headings.
- Follow a spacious 4/8px rhythm with fewer oversized gaps than the current page.
- Prefer flat surfaces, thin borders, and restrained shadows over neumorphism.
- Remove both `phone-aura.png` renderings from the page. The asset may remain in `public/assets` if still useful elsewhere.
- Use Lucide icons consistently and mark decorative icons `aria-hidden`.

## Motion and Interaction

- Keep motion subtle: short fades and small vertical offsets only.
- Remove carousel motion with the carousel itself.
- Preserve visible hover, pressed, and keyboard-focus states.
- Respect `prefers-reduced-motion` by rendering all content in its final state.
- Avoid autoplay, parallax, and large decorative movement.

## Responsive Behavior

- Desktop: focused text measure, visible benefit grid, and no empty column left by removed phone imagery.
- Tablet: two-column benefit grid and compact navigation transition.
- Mobile: single-column flow, 44px minimum interactive targets, no horizontal overflow, and calculator fields stacked in reading order.
- Validate at 375px, 768px, 1024px, and 1440px.

## Accessibility and Content Rules

- Maintain semantic landmarks and a single `h1`.
- Keep visible form labels and field-specific validation.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for meaningful non-text controls.
- Do not communicate state or meaning through coral alone.
- Use meaningful image alternatives only for informative images; decorative graphics receive empty alternatives or are hidden.
- Keep anchor destinations clear below the sticky header.
- Balance short headings naturally without hard-coded line breaks.

## Component Impact

- `App`: render the five-section sequence.
- `SiteHeader`: use the reduced anchor set.
- `Hero`: remove phone artwork and simplify CTA hierarchy.
- `OriginSection`: condense into the trust section.
- `SolutionSection`: become the merged solution-and-proof section.
- `LossCalculator`: retain calculations while tightening presentation and emphasizing the next step.
- `PilotCta`: remove duplicated testimonial treatment if needed and keep the final conversion card.
- `RealitiesCarousel`, `DailyFeatures`, and `ModulesSection`: remove from page composition; reuse only small portions of their content in the merged solution section.
- `siteContent` and `navLinks`: consolidate copy and anchors around the new structure.

## Verification

- Run unit tests, linting, type checking, and the production build.
- Review the implementation in a desktop browser at approximately 1440px wide.
- Verify responsive layouts at 375px, 768px, and 1024px.
- Exercise header anchors, both CTA paths, calculator modes, validation, result reveal, and reduced-motion behavior.
- Confirm neither phone mockup renders and no broken or empty image containers remain.
- Check keyboard traversal, focus visibility, heading order, contrast, labels, and accessible names.

## Out of Scope

- New backend submission handling.
- CMS, analytics, authentication, or language translation.
- A separate calculator route.
- New product photography or founder photography.
- Changes to GitHub Pages deployment.
