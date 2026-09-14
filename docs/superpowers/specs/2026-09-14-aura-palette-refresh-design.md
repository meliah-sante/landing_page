# AURA Palette Refresh Design

## Goal

Restyle the simplified Méliah AURA landing page with the supplied brand palette and typography while preserving its five-section structure, interaction behavior, and accessibility. Remove all visually dark sections in favor of a soft clinical editorial system built from ivory, white, rose, and orange.

## Design Inputs

The user-supplied palette and typography are authoritative. UI UX Pro Max is used to validate hierarchy, contrast, focus treatment, and responsive typography rather than replace those choices.

The visual balance follows the requested approximate ratio:

- 60% ivory, white, muted surfaces, and warm borders.
- 30% rose, coral, and warm-gradient brand treatment.
- 10% semantic status color, used only when a status genuinely requires it.

Blue and green FOCUS colors are not used as general decoration. Success green and destructive red remain semantic-only tokens.

## Color Tokens

### Dominant surfaces

| Role | Value | Usage |
| --- | --- | --- |
| Background | `#FBFAF9` | Page and primary section background |
| Card | `#FFFFFF` | Cards, forms, header, and elevated surfaces |
| Muted | `#F2F0ED` | Quiet panels and alternating surface bands |
| Border | `#E9E6E2` | Dividers and card outlines |
| Foreground | `#171C26` | Primary headings and body text |
| Muted foreground | `#6A7181` | Secondary copy and metadata |

### Brand colors

| Role | Value | Usage |
| --- | --- | --- |
| Primary rose | `#EA2E5D` | Brand marks, large labels, icons, and decorative emphasis |
| Secondary coral | `#FA942E` | Warm accents, waveform bars, and gradient endpoints |
| Primary foreground | `#FFFFFF` | Text only on surfaces that meet contrast |
| Accent wash | `#FCE8ED` | Pale rose panels, selected states, and section washes |
| Deep rose | `#B8143D` | Accessible filled CTA background and focus ring |
| Warm gradient | `#EA2E5D` → `#FA942E` | Decorative washes, rules, and non-text highlights |

### Semantic colors

- Success: `#2EB877`.
- Destructive: `#EF4343`.

These colors communicate state only. They are not part of the decorative page palette.

## Contrast Rules

- Normal text uses foreground or muted foreground on light surfaces.
- White normal-sized CTA text uses deep rose `#B8143D`, which exceeds 4.5:1 against white.
- Primary rose `#EA2E5D` is not used behind normal white text because that pairing does not reach 4.5:1.
- Orange `#FA942E` uses ink `#171C26` when it carries text.
- Focus indicators use a two-pixel deep-rose ring with visible offset.
- Warm gradients are decorative or sit behind large ink text; they do not carry small white copy.

## Typography

- Headings: Outfit Variable, weights 500–700.
- Body, navigation, forms, and labels: DM Sans Variable, weights 400–700.
- Both fonts are self-hosted through the latest `@fontsource-variable/outfit` and `@fontsource-variable/dm-sans` packages.
- Font loading must not depend on Google Fonts or another runtime font service.
- System sans-serif fallbacks remain defined.
- Existing fluid type sizes and the unbroken `76 766€` treatment remain intact.

## Section Treatment

### Header

- White card-like surface over the ivory page.
- Warm border and soft neutral shadow after scrolling.
- Deep-rose filled pilot CTA with white text.
- Navigation uses ink and muted foreground; hover and focus use deep rose.

### Hero

- Ivory base with a pale rose and orange ambient wash.
- Headline remains ink; the monetary amount may use deep rose for emphasis.
- Primary pilot CTA uses deep rose.
- Secondary calculator CTA is white with warm border and ink text.
- Voice waveform uses the rose-to-orange range without introducing blue or green.
- Proof panel remains white with warm border and neutral shadow.

### Founder Trust

- White section with ivory and accent-wash details.
- Founder quote changes from dark ink fill to a pale rose card with deep-rose rule or icon.
- Quote and attribution remain high-contrast ink/deep rose.

### Solution and Proof

- Replace the dark ink section with a light warm surface using a restrained ivory-to-accent gradient.
- Headings use ink; “AURA” and numeric evidence use deep rose or primary rose according to text size.
- Keyboard comparison uses muted gray.
- Voice comparison uses a pale warm gradient with ink text.
- Four benefit cards remain white with warm borders and shallow shadows.
- HDS/RGPD supporting copy remains visible in muted foreground.

### Calculator

- Use an ivory or muted section band instead of the former coral wash.
- Calculator remains a white card with warm border.
- Active tabs and submission use deep rose with white text.
- Validation uses destructive red, not decorative rose.
- Detailed results use accent wash and preserve visible focus management.

### Pilot CTA

- Replace the dark card with an ivory-to-rose-wash surface.
- Use a warm gradient border/rule and subtle coral glow.
- Heading remains ink.
- Primary CTA remains deep rose with white text.
- Supporting response text uses muted foreground.

### Footer

- Ivory or white surface with a warm border.
- Ink and muted foreground copy; no dark block.

## Effects and Motion

- Shadows become lighter and more neutral than the current charcoal-heavy shadows.
- Borders provide primary card definition; shadows remain secondary.
- Rose-to-orange gradients appear as ambient light, thin rules, or decorative shapes rather than large saturated blocks.
- Existing subtle reveal and waveform motion remain.
- `prefers-reduced-motion` continues to render all content immediately without persistent decoration.

## Component and File Impact

- `src/index.css`: define semantic palette and font tokens; replace dark-section styles and legacy color assumptions.
- `src/main.tsx`: import the self-hosted variable font files.
- `package.json` and lockfile: add the two latest Fontsource variable packages.
- `src/components/Hero.tsx`: apply the warm brand treatment and monetary emphasis.
- `src/components/OriginSection.tsx`: replace the dark quote card.
- `src/components/SolutionSection.tsx`: migrate all dark text and surfaces to the light solution system.
- `src/features/calculator/LossCalculator.tsx`: migrate controls, errors, and result surfaces to semantic tokens.
- `src/components/PilotCta.tsx`: replace the dark pilot card and supporting text colors.
- `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, and shared button styles: migrate to semantic tokens.
- Tests: assert the font imports, semantic token values, absence of dark section classes, CTA hierarchy, and retained behavior.

## Responsive and Accessibility Verification

- Review at 1440×900, 1024×768, 768×1024, 375×812, and a narrow 320px viewport.
- Confirm light section boundaries remain obvious without dark contrast blocks.
- Confirm the four solution cards stay readable at the tablet breakpoint.
- Confirm rose/orange gradients do not reduce text contrast.
- Verify keyboard focus, navigation anchors, mobile menu, calculator tabs, validation, detailed-result focus, and both pilot CTAs.
- Confirm normal text contrast is at least 4.5:1 and meaningful non-text boundaries reach 3:1 where required.
- Confirm no horizontal overflow, clipping, or font-loading layout break.

## Out of Scope

- Structural changes to the approved five-section page.
- New content, imagery, phone mockups, routes, backend behavior, or analytics.
- Dark mode.
- Decorative use of FOCUS blue or green.
- Deployment workflow changes.
