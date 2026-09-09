# Enhanced AURA Landing Page Design

## Goal

Rebuild the supplied Méliah Santé AURA landing page as a polished, responsive React application. Preserve its French copy, branding, section order, coral-and-charcoal visual identity, and supplied logo and phone artwork while improving usability, accessibility, and visual refinement.

## Technical Approach

- Bun for package management and scripts.
- Vite and React with TypeScript.
- Tailwind CSS for layout and visual tokens.
- shadcn/ui-style accessible primitives built on Radix UI for interactive controls.
- Lucide React for consistent icons.
- Motion for restrained entrance and interaction animation.
- Locally stored copies of the logo and phone artwork from the user-provided source.
- No backend or external persistence.

The component library supplies behavior and accessibility, not a generic visual theme. All public-facing styling will be customized to match the reference.

## Page Structure

1. Sticky header with logo, anchor navigation, language indicator, pilot CTA, and mobile menu.
2. Hero with value proposition, animated ambient particles, CTA, supporting calculation note, and phone artwork.
3. Founder/origin narrative with quote.
4. Seven-realities carousel with keyboard, button, touch, and dot navigation.
5. AURA solution section with voice-versus-keyboard comparison and four outcome statistics.
6. Daily-use feature grid with six feature cards.
7. Four-module product suite.
8. Interactive loss calculator with euro/hour modes, immediate preview values, expandable methodology, and lead form.
9. Founder testimonial.
10. High-contrast pilot-program CTA.
11. Footer with legal, privacy, and contact links.

## Visual Direction

- Use warm off-white for light sections, near-black for dark sections, and coral red as the primary accent.
- Use the Play font family where it matches the reference, with robust system fallbacks.
- Strengthen visual hierarchy with responsive fluid type, wider spacing, clearer section transitions, and consistent card geometry.
- Add subtle gradients, grain, glows, and lightweight particle motion without competing with the copy.
- Preserve the original phone mockup as the main hero image.
- Use animation only for orientation and feedback: scroll reveals, carousel transitions, calculator number changes, button affordances, and the voice waveform.
- Respect `prefers-reduced-motion`.

## UX Enhancements

- Provide a compact sticky header that changes contrast after scrolling.
- Ensure every anchor lands below the sticky header.
- Keep primary actions visible and consistently labeled.
- Make the mobile navigation dismissible by link selection, close button, Escape, or outside interaction.
- Add carousel progress, descriptive control labels, disabled states, and swipe support.
- Validate calculator inputs immediately and prevent invalid staff counts.
- Show useful calculated values before form completion; the form unlocks a more detailed result panel rather than hiding all value.
- Preserve form data during calculator mode changes.
- Give all controls visible keyboard focus and suitable touch targets.
- Use semantic landmarks, heading order, labels, alt text, and sufficient color contrast.

## Calculator Behavior

The calculator uses the reference baseline for 40 caregivers:

- 13 hours 20 minutes recovered per day.
- €76,766 recovered per year.

Values scale linearly by staff count. Euro mode displays daily, monthly, and yearly estimated loss. Hours mode displays daily, monthly, and yearly time loss. Assumptions remain visible in an expandable explanation. Submitting a valid name and professional email reveals the full detailed result locally; it does not transmit data.

## Component Boundaries

- `SiteHeader`: navigation and responsive menu.
- `Hero`: headline, primary action, ambient visuals, and phone artwork.
- `OriginSection`: founder narrative.
- `RealitiesCarousel`: slide state and accessible navigation.
- `SolutionSection`: explanation, comparison, and statistics.
- `DailyFeatures`: feature-card grid.
- `ModulesSection`: module cards.
- `LossCalculator`: calculations, modes, explanation, validation, and reveal state.
- `PilotCta`: final conversion section.
- `SiteFooter`: secondary navigation and contact details.
- Shared presentation primitives for section labels, buttons, cards, and reveal animation.

Static copy and card data will live outside presentation components so content is easy to inspect and update.

## Responsive Behavior

- Mobile: single-column content, collapsible navigation, horizontally swipeable realities, stacked calculator results, and scaled phone artwork.
- Tablet: two-column feature layouts and balanced hero spacing.
- Desktop: full navigation, split hero, multi-card grids, and controlled maximum content width.
- Layout and typography use fluid sizing to avoid abrupt jumps between breakpoints.

## Error Handling

- Asset failures retain meaningful alt text and do not block page content.
- Calculator input is clamped to a practical positive range and displays an inline error when empty or invalid.
- Form submission reports field-specific validation errors without page reload.
- Unsupported form submission has no false success claim; success means only that the local detailed result was revealed.

## Verification

- Run TypeScript checking, linting, and production build through Bun.
- Exercise navigation, mobile menu, carousel, calculator modes, validation, result reveal, and reduced-motion behavior.
- Compare desktop and mobile screenshots against the supplied reference.
- Check keyboard traversal and major accessibility semantics.

## Scope

Included: one production-quality responsive landing page and all client-side interactions described above.

Excluded: backend lead delivery, analytics, working language translation, CMS integration, authentication, and deployment configuration.
