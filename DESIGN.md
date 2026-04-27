# Nexi Dental Clinics Sales Landing Page
# Design System Strategy: High-End Editorial B2B SaaS

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Monolith"**

This design system moves beyond the generic "SaaS dashboard" aesthetic. Inspired by the precision of Linear and the editorial elegance of Attio, it is designed to feel authoritative, frictionless, and outcome-driven. We reject the "template" look by utilizing intentional asymmetry, high-contrast tonal layering, and "Bento Box" layouts that treat data as a curated exhibition rather than a spreadsheet. The system balances the weight of a deep charcoal foundation with the sharp, aggressive energy of Metallic Crimson Red.

## 2. Colors & Surface Philosophy

The color palette is built on high-contrast shifts rather than structural lines. We use a Material-based token set to drive a deep, layered dark mode.

### The Palette
- **Primary Background:** `surface` (#131313) / Deep Black (#0D0D0D).
- **Accent:** `primary_container` (#D32F2F) - Metallic Crimson Red for high-intent actions.
- **Surface Tonalities:** `surface_container_lowest` (#0E0E0E) through `surface_container_highest` (#353534).

### The "No-Line" Rule
Prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background creates a natural, sophisticated edge. 

### Surface Hierarchy & Nesting
Treat the UI as physical layers.
- **Base Layer:** `surface`
- **Sectioning:** `surface_container_low`
- **Interactive Cards:** `surface_container_high`
Nesting an inner container with a slightly higher tier (e.g., a "highest" card inside a "low" section) creates professional depth without visual clutter.

### The "Glass & Gradient" Rule
To elevate beyond standard UI, use **Glassmorphism** for floating elements (modals, dropdowns). 
- **Token:** `surface_variant` at 60% opacity with a `24px` backdrop blur.
- **Signature Textures:** Main CTAs should use a subtle linear gradient from `primary` (#ffb3ac) to `primary_container` (#d32f2f) at 135 degrees to provide a "metallic" soul.

## 3. Typography: Editorial Authority

We use **Inter** (or Geist) with precise tracking and aggressive weight shifts to convey authority.

| Level | Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | 3.5rem | 700 (Bold) | -0.04em | Hero Headlines / Impactful Outcomes |
| **Headline-MD** | 1.75rem | 600 (Semi) | -0.02em | Section titles / Bento header |
| **Title-SM** | 1.0rem | 500 (Med) | 0 | Sub-headers / Card titles |
| **Body-MD** | 0.875rem | 400 (Reg) | 0.01em | General UI / Descriptive text |
| **Label-MD** | 0.75rem | 600 (Semi) | 0.05em | Uppercase / Secondary metadata |

**Visual Identity:** Headlines should feel "heavy" and tightly spaced, contrasting with body text that utilizes generous line heights (1.6) for frictionless reading.

## 4. Elevation & Depth

### The Layering Principle
Hierarchy is achieved by "stacking" the surface-container tiers. Place a `surface_container_lowest` card on a `surface_container_low` section to create a soft, natural lift.

### Ambient Shadows
For floating elements (modals/popovers), use extra-diffused ambient shadows.
- **Shadow:** `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`
- This "Ghost Border" (a 1px inner stroke at 5% white) is the only exception to the no-line rule, used to define edges against pure black backgrounds.

### Subtle Glows
For Dark Mode, primary CTAs should emit a subtle crimson glow: 
- `box-shadow: 0 0 15px rgba(211, 47, 47, 0.2);`

## 5. Components

### Buttons
- **Primary:** `primary_container` background, `on_primary_container` text. `xl` roundedness (0.75rem). Subtle metallic gradient.
- **Secondary:** Transparent background, `outline` token for a "Ghost Border" (20% opacity).
- **Interactive States:** On hover, primary buttons should increase glow intensity; secondary buttons should shift background to `surface_container_high`.

### Bento Cards
- Forgo divider lines. Use `surface_container_low` backgrounds and `1.5rem` (24px) padding.
- Use `lg` (0.5rem) corner radius.
- Content within cards should use vertical whitespace (Spacing Scale `6` or `8`) to separate headers from body.

### Input Fields
- **Background:** `surface_container_lowest`.
- **Border:** None. Use a `1px` bottom-only highlight in `primary_container` when focused.
- **Label:** `label-md` positioned above the input, never inside.

### Signature Component: The Outcome Badge
A specialized chip for B2B SaaS metrics.
- **Style:** `surface_container_highest` background, `primary` (#ffb3ac) text, `full` roundedness. Used to highlight "Outcomes" like (+24% ROI).

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetric layouts. Place a large display-text element on the left and a dense data-grid on the right to create visual tension.
- **Do** use the Spacing Scale rigorously. High-end design is 90% white space management.
- **Do** use the white version of the logo on `surface` backgrounds and the dark version on `surface_bright` or light-mode sections.

### Don't
- **Don't** use 100% opaque, high-contrast borders. They "trap" the eye and break the frictionless feel.
- **Don't** use standard blue for links. Everything interactive must be Crimson Red or Grayscale.
- **Don't** use drop shadows in Light Mode that are grey. Use a tinted shadow (e.g., a very pale red or blue-grey) to keep the "Light" feeling premium and curated.
