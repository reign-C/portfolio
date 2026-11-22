---
name: Reign Marc Cipriano — Engineering Portfolio
description: A bench-notebook portfolio for an IoT and automation engineer.
colors:
  paper: "#eff1ea"
  paper-deep: "#e3e6db"
  ink: "#191b19"
  ink-soft: "#4a4d46"
  ink-faint: "#66695f"
  rule: "#c3c7b8"
  rule-strong: "#979b8b"
  signal: "#a3311d"
  blueprint: "#2b4a6b"
  stamp: "#2f5b3b"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 3.2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body-large:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0em"
  body-small:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0em"
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  "2xs": "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "40px"
  "4xl": "56px"
  "5xl": "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "10px 16px"
    rounded: "{rounded.none}"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "10px 16px"
    rounded: "{rounded.none}"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-on-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "10px 16px"
    rounded: "{rounded.none}"
  button-on-ink-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    padding: "8px 0"
  chain-node:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "12px 14px"
    rounded: "{rounded.none}"
  spec-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    padding: "12px 0"
  contact-card:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    padding: "20px"
    rounded: "{rounded.none}"
---

# Design System: Reign Marc Cipriano — Engineering Portfolio

## Overview

**Creative North Star: "The Engineering Bench Notebook"**

The portfolio is a working notebook, not a landing page. It reads like a ruled engineering log: paper ground, ink rules, mono annotations, measured signal paths. The interface recedes so the work can be inspected. The page refuses both the dark terminal/neon developer portfolio and the cream-serif designer portfolio; its authority comes from the drawing and the spec table, not from atmosphere.

Density is deliberate. Metadata sits in a narrow column, project evidence in a wide one. Sections are separated by 1px rules, not cards. The palette is paper and ink with a single oxide-red signal used for labels, state, and focus. Nothing is rounded, nothing floats, nothing glows. The only authored motion is a pulse travelling the first signal path; every other transition is a color or rule change.

**Key Characteristics:**
- Warm paper ground (#eff1ea) with a 22px grid inside plates.
- Sharp corners, 1px ink rules, no shadows.
- Archivo for voice; Martian Mono for measurement and metadata.
- Oxide signal used sparingly for labels, terms, focus, and state.
- Signal-path diagrams as the signature artifact.
- A 12-column ledger with a 3/9 split for work entries.

## Colors

The palette is a two-ink print system: warm paper, near-black ink, and one oxide signal. Blueprint and stamp are reserved secondary marks.

### Primary

- **Oxide Signal** (#a3311d): The only chromatic accent. It marks section labels, project kinds, spec terms, chain kickers, the status tick, focus rings, selection, and hover states. It is a signal, not a surface: it never fills a large area except the hover state of a primary button.

### Secondary

- **Blueprint Blue** (#2b4a6b): Reserved for secondary technical marks. It is defined in the theme but does not appear in the shipped page.

### Tertiary

- **Stamp Green** (#2f5b3b): Reserved for verified states. It is defined in the theme but does not appear in the shipped page.

### Neutral

- **Paper** (#eff1ea): The page ground and plate fill.
- **Deep Paper** (#e3e6db): The Fit band, a tonal shift that separates without a shadow.
- **Ink** (#191b19): Body text, plate borders, and the contact/footer ground.
- **Soft Ink** (#4a4d46): Secondary body copy and spec values.
- **Faint Ink** (#66695f): Captions, metadata, and mono annotations.
- **Rule** (#c3c7b8): Section dividers, spec row lines, and card borders.
- **Strong Rule** (#979b8b): Connector lines and link underlines.

### Named Rules

**The Oxide Rarity Rule.** Oxide signal covers less than 5% of any viewport. If a screen needs more emphasis, add weight, space, or a rule, not more red.

**The Paper Ground Rule.** Paper is the ground and the plate fill. Do not substitute pure white or a cool gray; the warmth is the material.

## Typography

**Display Font:** Archivo (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Archivo
**Label/Mono Font:** Martian Mono (with ui-monospace, monospace)

**Character:** Archivo is set tight and heavy at display sizes, then plain and readable at body sizes. Martian Mono is reserved for measurement: labels, protocol names, spec terms, captions, and metadata. The pairing reads as a technical document, not a developer theme.

### Hierarchy

- **Display** (700, clamp(3rem, 7vw, 5rem), 0.9): The name in the hero only.
- **Headline** (700, clamp(2rem, 4.5vw, 3rem), 0.9): Section titles such as “Selected work”, “Site log”, and “Get in touch.”
- **Title** (700, clamp(1.55rem, 3.2vw, 2.25rem), 0.9): Project titles.
- **Body Large** (400, 1.0625rem, 1.6): Project summaries and the contact lede.
- **Body** (400, 0.9375rem, 1.625): Hero body, spec values, experience bullets, and capability rows.
- **Body Small** (400, 0.875rem, 1.625): Fit items, also-built details, and small print.
- **Label** (400, 0.6875rem, 1.3, 0.06em, uppercase): Mono labels, navigation, spec terms, chain kickers, and captions. Chain and spec terms use 0.08em.

### Named Rules

**The Mono Is Measurement Rule.** Martian Mono never sets a paragraph. It marks a label, a protocol, a value, or a caption; prose is always Archivo.

**The 80-Character Rule.** Primary body copy is capped at 58ch in Archivo (about 76–78 rendered characters) so no line exceeds 80 characters. Do not widen a paragraph to fill its column; leave the measure short.

## Layout

The page is a vertical stack of ruled sections inside a 1180px container, with 20px gutters on mobile and 40px on desktop. Section padding is 56px mobile / 80px desktop. A 12-column grid with 32px gaps governs the interior. Work entries split 3 columns of sticky metadata against 9 columns of evidence. The spec table inside each entry becomes two columns at 640px. Fit is a 4/8 split with a two-column list whose last item spans both columns. Contact is 7/5.

Every section is separated by a 1px rule, not a card or a shadow. The header is a single rule-bound row; the footer is the same row inverted on ink. The hero is the only two-column composition above the fold: name, deck, body, actions, and status on the left; the signal-path plate on the right.

The chain diagram is container-aware. It stacks vertically with 52px gaps by default and becomes a horizontal four-node row with 64px gaps only when its plate is at least 560px wide. This keeps the protocol labels inside the gaps at every width.

### Named Rules

**The Rule Carries the Structure Rule.** Sections and plates are separated by 1px rules. Do not introduce cards, shadows, or background blocks to create hierarchy.

**The 3/9 Ledger Rule.** Work metadata occupies 3 columns; the evidence occupies 9. Keep the metadata column sticky on desktop so the project kind and stack stay visible while the reader scans the entry.

**The Container, Not Viewport Rule.** The signal chain responds to its plate's width, not the viewport's. A wide viewport with a narrow column still gets the vertical chain.

## Elevation & Depth

There are no shadows. Depth is conveyed by tonal layering (paper against deep paper), 1px ink rules, and the 22px grid inside plates. The contact and footer invert to ink, which reads as a change of material rather than elevation. Hover states change color or fill; they never lift, scale, or blur.

**The Flat Plate Rule.** A plate is a 1px ink border on paper. No box-shadow, no blur, no gradient. If an element needs separation, add a rule or a tonal step.

## Shapes

Everything is square. The radius is 0 on buttons, plates, chain nodes, the contact card, and every container. Borders are 1px. The only circles are the 6px signal pulse and the 2px status squares; the pulse is the one authored motion. The grid paper is a 22px square lattice. Arrowheads are drawn with a 1px line and a 6px rotated square, not an icon font.

**The Square Corner Rule.** No border-radius above 0. A rounded corner reads as a different world.

## Components

### Buttons

- **Shape:** Square, 1px border, 16px horizontal / 10px vertical padding.
- **Primary:** Ink fill, paper text. Hover swaps the fill and border to oxide signal.
- **Secondary:** Transparent fill, ink text, ink border. Hover fills ink and turns the text paper.
- **On ink:** The primary becomes paper fill with ink text; the secondary becomes a transparent paper-bordered button that fills paper on hover. Focus rings switch to paper inside `.on-ink`.
- **Type:** 14px Archivo semibold; icons are 16px with a 1.25px stroke.

### Navigation

- **Style:** Mono 11px uppercase, 0.06em, soft ink; hover ink. The current section is not marked; the page is a single document.
- **Mobile:** Work and Experience remain; Capabilities and Email are hidden below 640px. The name links to the top.
- **Target:** 30px tall inside a 58px header row.

### Plates

- **Shape:** 1px ink border, square, paper fill.
- **Header / footer:** 1px rules with mono 11px labels at 60% ink.
- **Interior:** 22px grid paper with 16–24px padding (32–40px in the hero), containing the signal chain.
- **Caption:** Mono 12px, faint ink, capped at the body measure.

### Signal Chain (signature)

- **Structure:** An ordered list of four nodes. Each node is a 1px ink rectangle with a mono kicker in signal, a 17px semibold title, and 12px soft-ink meta.
- **Connector:** A 1px rule through the gap with a 6px rotated-square arrowhead. The protocol label sits on a paper chip centered in the gap.
- **Horizontal:** 64px gaps, label centered at +32px; only when the plate is at least 560px wide.
- **Vertical:** 52px gaps, line and arrowhead down the center; labels sit 17px below the node.
- **Motion:** A single 6px signal dot travels the first connector on load: 2.6s, cubic-bezier(0.16, 1, 0.3, 1), once. Reduced motion removes it.

### Spec Table

- **Structure:** A definition list with four rows: Problem, Built, My part, Result.
- **Rule:** 1px rule at the top and between rows; 12px vertical padding.
- **Terms:** Mono 11px uppercase signal.
- **Values:** 15px soft ink, 1.55 line-height.
- **Layout:** Two columns at 640px and above; single column below.

### Contact Card

- **Shape:** 1px paper/25 border, square, 20px padding, max 320px.
- **Labels:** Mono 11px at 60% paper; values 14px paper.
- **Status:** A 2px paper square, not a colored dot.
- **Placement:** Right column on desktop, full width on mobile.

## Do's and Don'ts

### Do

- **Do** use oxide signal for labels, terms, focus, and state; keep it under about 5% of the viewport.
- **Do** set body copy in Archivo and cap the primary measure at 58ch (about 76–78 rendered characters).
- **Do** use 1px rules to separate sections, rows, and plates.
- **Do** keep corners at 0 and use the 22px grid paper only inside plates.
- **Do** let the signal chain respond to its container; stack it when the plate is under 560px.
- **Do** keep the contact and footer as the only full ink fields, with paper text and paper focus rings.

### Don't

- **Don't** add shadows, gradients, glass, or rounded cards.
- **Don't** use Martian Mono for paragraphs or as a “technical” costume; it is for labels and measurements.
- **Don't** fill large areas with oxide signal; it is an accent, not a surface.
- **Don't** use pure white or cool gray as the page ground; the paper warmth is the material.
- **Don't** widen the body measure to fill a 9-column content area; leave the short measure.
- **Don't** add project photographs, client names, metrics, or logos that are not verified in PRODUCT.md.
