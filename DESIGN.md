---
name: Reign Marc Cipriano — Portfolio (v2)
description: Cool neutral portfolio with one amber signal accent and a project carousel.
colors:
  bg: "#F7F8FA"
  surface: "#FFFFFF"
  sunken: "#EEF0F4"
  line: "#DDE1E8"
  text: "#12161C"
  muted: "#4A5361"
  subtle: "#6B7482"
  led: "#F2A900"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: "1"
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "1.25"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "1.65"
    letterSpacing: "0em"
  caption:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "1.45"
    letterSpacing: "0em"
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "1.5"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
---

# Design System v2: cool neutral, one amber signal

This replaces the earlier "Engineering Bench Notebook" system (cream paper,
oxide red, 1 px ink rules, mono eyebrows, grid-paper plates). That world is
retired. Source spec: `docs/design-spec-v2.md`.

## Overview

Calm, precise, premium. Quiet everywhere except the work carousel. Cool neutral
ground, white surfaces, one accent taken from a hardware status LED. The accent
marks things that are live or active and nothing else.

## Colour

Light is the default; dark follows `prefers-color-scheme`.

- **Text `#12161C`**: headings, body, primary buttons.
- **Muted `#4A5361`**: secondary copy.
- **Subtle `#6B7482`**: captions, non-essential text only.
- **Line `#DDE1E8`**: borders and separators.
- **LED `#F2A900`**: status dots, focus ring, active indicators. Never text on a
  light ground.

Rules:
- `--led` is a signal, not a surface: dots, rings, small fills.
- Links are text-coloured with a 1 px underline at 3 px offset; hover turns the
  underline amber.
- No decorative gradients. Dark mode swaps shadows for 1 px borders.

## Typography

Schibsted Grotesk for everything; IBM Plex Mono only inside demos and readouts
(ticket numbers, PID values, timestamps).

- Sentence case. No all-caps labels, no letter-spaced eyebrows.
- Do not colour or italicise a single word in a heading.
- Body measure caps at 65 characters.
- Tabular numerals for any number that changes.

## Layout

12 columns, 1200 px max width, 24 px page padding on mobile and 48 px on
desktop. Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections are
separated by 128 px of space on desktop, 80 px on mobile, not by rules.

Page order: nav, hero, credentials, work, what I can do, experience, skills,
about, contact.

Radii: 6 px controls, 12 px cards, 20 px large media. Pills only for chips.

## Components

- **Nav**: sticky, 64 px, background at 80% with backdrop blur, name left, links
  centre, Email (outline) and Résumé (solid) right.
- **Hero**: name at 72/44, one-line role, deck, buttons, availability with an
  8 px amber dot, 4:5 media right.
- **Credentials**: four facts in one row of 17 px semibold plus 14 px muted.
  No icons, no dividers.
- **Carousel**: horizontal snap row, 560 px cards, arrows and a text list.
  Plate images are `object-contain` on `--sunken` so nothing is cropped.
- **Cards**: 12 px radius, 1 px line border, soft shadow; image, title, two-line
  summary, up to three chips.
- **Detail pages** (`/work/[slug]`): title, summary, meta, full capture at its
  native ratio, problem, build, my part, result, previous/next.
- **Sections**: plain names matching the nav. No themed section titles.

## Motion

`cubic-bezier(0.2, 0.7, 0.2, 1)`. 160 ms hover, 240 ms UI, 320–400 ms
transitions. One orchestrated moment in the hero. No fade-up on every section.
Reduced motion replaces transforms with crossfades.

## Open work

The four interactive demos (clinic queue, lab scanner, PID canvas, bell
schedule) and the coverflow tilt are specified but not built yet.
