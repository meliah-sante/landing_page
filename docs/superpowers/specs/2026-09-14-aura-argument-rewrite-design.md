# AURA Argument Rewrite Design

## Goal

Make the landing page feel like a progressing argument, not a repeated pitch. Replace the magenta/rose palette with the supplied red-to-orange gradient, cut duplicated proof, and tighten vertical space so each scroll step adds a new claim.

## Design Inputs

- User-supplied brand gradient: `#ee4a4e` → `#f75b46` → `#f6753a`.
- User feedback: current colors are wrong; copy repeats; scrolling feels empty.
- UI UX Pro Max funnel pattern (Hero → problem → solution → action), used only for section order. The plugin cyan palette and neumorphism are rejected.

## Color Tokens

Keep ivory surfaces. Replace rose/magenta brand tokens.

| Role | Value | Usage |
| --- | --- | --- |
| Brand start | `#ee4a4e` | Gradient start, primary mark, large numbers |
| Brand mid | `#f75b46` | Gradient midpoint |
| Brand end | `#f6753a` | Gradient end, waveform tops |
| Accessible brand | `#ca3e42` | Small text, eyebrows, focus rings (4.5:1 on ivory) |
| Accessible brand dark | `#a63336` | Hover for solid brand fills |
| Accent wash | `#FDECEC` | Pale brand tint for quotes and selected states |
| CTA fill | brand gradient | Primary buttons |
| CTA text | `#171C26` | Ink on the gradient, 4.5:1 on every stop |
| Background / card / muted / border / foreground | unchanged ivory system | Surfaces and body copy |

White text is not used on the raw brand stops. Those colors fail 4.5:1 against white.

## Argument Structure

One new claim per section. A proof number may appear once.

1. **Hero — Le coût.** `76 766€` and the `13h20` problem live here only. Hero does not teach voice speed.
2. **Origine — Pourquoi on le sait.** Founder proof only. Do not restate the euro figure.
3. **Solution — Le geste.** Keyboard vs voice once, then three sequential steps. Do not repeat `76 766€` or `13h20`. `1.1 ETP` may appear here as the unique capacity claim.
4. **Calculatrice — Votre chiffre.** Personalize the loss. Do not ask “combien perdez-vous” again.
5. **Pilote — L'offre.** Scarcity and the three-month offer only.

Numbered eyebrows (`01`–`05`) make the progression visible.

## Copy Uniqueness

- `76 766€` in marketing: hero headline only. The calculator may still compute `76 766 €`.
- `13h20` in marketing: hero only.
- `150 mots/min` and `40 mots/min`: solution comparison only.
- Ten years of field experience: origin only.
- Pilot offer details: pilot section only.

Origin keeps the founder quote and one supporting sentence. Solution uses three steps, not four overlapping benefit cards.

## Density

- Hero height is content-driven. No `88svh` minimum.
- Section padding: `py-12 sm:py-14 lg:py-16`.
- Display and section titles step down slightly so type does not manufacture empty space.
- The solution brand word `AURA` is a heading accent, not an `8xl` empty billboard.
- Pilot heading uses the shared section title scale.

## Out of Scope

- Calculator math, GitHub Pages, new routes, photography, dark mode.
