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
  subtle: "#6A7280"
  led: "#F2A900"
  bg-dark: "#0E1116"
  surface-dark: "#151A21"
  sunken-dark: "#1B222B"
  line-dark: "#262E39"
  text-dark: "#ECEFF3"
  muted-dark: "#9AA5B4"
  subtle-dark: "#7F8A99"
  led-dark: "#F2B01E"
  stage: "#12161C"
  stage-ink: "#F7F8FA"
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
  display-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 600
    lineHeight: "1"
    letterSpacing: "-0.03em"
  heading-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  project-title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  project-title-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  readout:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: "1"
    letterSpacing: "0em"
  title-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "1.25"
    letterSpacing: "-0.01em"
  body-large:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "1.55"
    letterSpacing: "0em"
  body-large-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "1.55"
    letterSpacing: "0em"
  body-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.65"
    letterSpacing: "0em"
  meta:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "1.5"
    letterSpacing: "0em"
  small:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "0em"
  contact-email:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: "1.2"
    letterSpacing: "0em"
  contact-email-mobile:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: "1.2"
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

Light is the default; dark is opt-in through the header toggle and remembered in
`localStorage`. The OS preference is ignored so the site looks the same for
every visitor until they choose otherwise.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F7F8FA` | `#0E1116` |
| `--surface` | `#FFFFFF` | `#151A21` |
| `--sunken` | `#EEF0F4` | `#1B222B` |
| `--line` | `#DDE1E8` | `#262E39` |
| `--text` | `#12161C` | `#ECEFF3` |
| `--muted` | `#4A5361` | `#9AA5B4` |
| `--subtle` | `#6A7280` | `#7F8A99` |
| `--led` | `#F2A900` | `#F2B01E` |
| `--stage` / `--stage-ink` | `#12161C` / `#F7F8FA` | same |

`--stage` is the contact band: it stays dark in both themes, so it carries its
own ink pair and its own focus ring instead of following `--text`.

- **Text `#12161C`**: headings, body, primary buttons.
- **Muted `#4A5361`**: secondary copy.
- **Subtle `#6A7280`**: captions, non-essential text only.
- **Line `#DDE1E8`**: borders and separators.
- **LED `#F2A900`**: status dots, focus ring, active indicators. Never text on a
  light ground.

Rules:
- `--led` is a signal, not a surface: dots, rings, small fills.
- Links are text-coloured with a 1 px underline at 3 px offset; hover turns the
  underline amber.
- Focus is a 2 px outline in the current ink at 2 px offset, plus a soft `--led`
  halo. The stage band flips the outline to `--stage-ink`.
- No decorative gradients. Dark mode swaps shadows for 1 px borders.

## Typography

Schibsted Grotesk for everything; IBM Plex Mono only inside demos and readouts
(ticket numbers, PID values, timestamps).

Scale: 72/44 display, 40/30 heading, 48/32 project title, 24/20 title, 20/18
body large, 17/16 body, 15 meta, 14 small, 13 caption; the contact email is
32/22 and demo readouts are 40 in mono.

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

Depth: `--shadow-soft` (1 px lift), `--shadow-card` (cards), `--shadow-stage`
(large media). Dark mode drops all three for a 1 px `--line` edge.

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
- **Detail pages** (`/work/[slug]`): back-to-portfolio button, title, summary,
  meta, demo stage, problem, build, my part, result, more-work carousel.
  No screenshot plate: the live screens are the evidence.
- **More work**: horizontal snap row of all four projects, 280 px cards with a
  16:10 capture, project name and kind directly below; the current project gets
  a `--led` border and "You are here". "All projects" returns to `/#work`.
- **Demo stage**: 20 px radius, `--stage` in both themes with `--stage-ink`
  text, unchanged from the contact band. Header row carries a `--led` dot, the
  provenance line, "Full screen" and "Reset"; a tab row appears when a project
  has more than one screen; one "Try this" hint closes the stage. The screens
  are the project's own HTML and CSS, ported from its source and isolated in an
  iframe, rendered at their build viewport (1600×900) and scaled to the stage.
  Below 640 px the frame stops at 0.55 scale and pans horizontally; "Full
  screen" opens the screen at native size. Data is local to the browser.
  - Clinic queue: the real kiosk, admin console and TV display, sharing one
    queue through `localStorage`; issuing a ticket, calling the next patient and
    the TV callout all work.
  - Lab borrowing: the real TFT terminal screen; tapping the terminal advances
    lock → staff scan → user scan → item scanning.
  - Robots: the real PID tuner and sumobot pages served over Wi-Fi, in their
    local preview mode with a running simulation.
  - School bell: the real dashboard; bell buttons ring and log, the schedule and
    clock are live.
- **Sections**: plain names matching the nav. No themed section titles.

## Motion

`cubic-bezier(0.2, 0.7, 0.2, 1)`. 160 ms hover, 240 ms UI, 320–400 ms
transitions. One orchestrated moment in the hero: 520 ms per element, 60 ms
stagger from the first name line through to the media, once per load. No fade-up
on every section. Reduced motion replaces the 12 px rise with a 240 ms crossfade
and keeps the order.

## Open work

The coverflow tilt on the carousel is specified but not built. The clinic demo
has no ticket printer and no chime; the lab terminal is the screen only.
