# Design spec: Reign Marc Cipriano portfolio

Audience: local employers hiring computer engineers for IoT and networking roles.
Job of the site: in under a minute, show a recruiter that this person is credentialed, available, and has built working systems. Then let them try the work.
Feel: calm, precise, premium. Quiet everywhere except one place: the interactive project demos.

---

## 1. Principles

1. **Spend boldness in one place.** The project carousel and live demos are the memorable part. Everything else stays quiet.
2. **Structure carries information.** No decorative eyebrows, numbering, or dividers. Use a divider only when it separates different kinds of content.
3. **Real beats rendered.** Photos and short videos of actual hardware are the largest visual elements on the page. Screenshots go in clean frames.
4. **Plain words.** Section names match the nav. Copy is specific and short.
5. **Hierarchy through scale and space,** not through lines, boxes, and labels.

## 2. Color

Cool neutral base. One accent, taken from the subject: an amber status LED. It marks things that are live or active, and nothing else.

### Light (default)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F7F8FA` | Page background |
| `--surface` | `#FFFFFF` | Cards, frames |
| `--sunken` | `#EEF0F4` | Chips, input fields, demo wells |
| `--line` | `#DDE1E8` | Borders, separators |
| `--text` | `#12161C` | Headings, body, primary buttons |
| `--muted` | `#4A5361` | Secondary text |
| `--subtle` | `#6B7482` | Captions, placeholders (large or non-essential only) |
| `--led` | `#F2A900` | Status dots, focus accent, active indicators |

### Dark (follows system; also used for the demo stage in both modes)

| Token | Hex |
|---|---|
| `--bg` | `#0E1116` |
| `--surface` | `#151A21` |
| `--sunken` | `#1B222B` |
| `--line` | `#262E39` |
| `--text` | `#ECEFF3` |
| `--muted` | `#9AA5B4` |
| `--led` | `#F2B01E` |

Rules:
- `--led` is never used for text on light backgrounds (fails contrast). Use it for dots, rings, and small fills only.
- Links are `--text` with a 1px underline at 3px offset. Hover turns the underline `--led`.
- Primary button: `--text` background, `--bg` text. Secondary: transparent with 1px `--line` border.
- No gradients as decoration. One exception: a very soft radial wash behind hero media is allowed.

## 3. Typography

One family for everything, plus a mono used only inside demos and spec readouts.

- **Schibsted Grotesk** (variable, weights 400, 500, 600). Display, headings, body, UI.
- **IBM Plex Mono** (400, 500). Only for demo readouts (ticket numbers, PID values, barcodes, timestamps) and code.

| Role | Size (desktop / mobile) | Line height | Weight | Tracking |
|---|---|---|---|---|
| Display (hero name) | 72 / 44 | 1.0 | 600 | -0.03em |
| Section heading | 40 / 30 | 1.1 | 600 | -0.02em |
| Subheading | 24 / 20 | 1.25 | 600 | -0.01em |
| Body large (hero intro) | 20 / 18 | 1.55 | 400 | 0 |
| Body | 17 / 16 | 1.65 | 400 | 0 |
| Small | 14 | 1.5 | 400 | 0 |
| Caption | 13 | 1.45 | 400 | 0 |

Rules:
- Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows.
- Do not accent a single word in a headline with color or italics.
- Max line length 65 characters for body text.
- Use `font-variant-numeric: tabular-nums` for any number that changes in a demo.

## 4. Layout

- 12-column grid, 1200px max width, 24px gutters, 24px page padding on mobile, 48px on desktop.
- Left-aligned text throughout. Nothing is centered except the carousel's active card.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections are separated by 128px (desktop) or 80px (mobile). No hairline rules between sections.
- Radii: 6px controls, 12px cards, 20px large media and the demo stage. Pills only for chips.
- Shadows (light mode; dark mode uses borders instead):
  - `--shadow-1`: `0 1px 2px rgba(18,22,28,.06), 0 1px 1px rgba(18,22,28,.04)`
  - `--shadow-2`: `0 8px 24px -8px rgba(18,22,28,.18), 0 2px 6px rgba(18,22,28,.06)`
  - `--shadow-3`: `0 32px 64px -24px rgba(18,22,28,.35), 0 8px 16px rgba(18,22,28,.08)`

### Page order

1. Nav
2. Hero
3. Credentials row
4. Work (carousel)
5. What I can do on a team
6. Experience
7. Skills
8. About
9. Contact

### Nav

Sticky, 64px tall, `--bg` at 80% opacity with backdrop blur. Name at left (weight 600). Links: Work, Experience, Skills, About. Right: Email (secondary button style) and Résumé (primary). Active link has a 2px `--led` underline.

### Hero wireframe

```
+--------------------------------------------------------------+
| Reign Marc Cipriano                  Work Experience ... [CV] |
+--------------------------------------------------------------+
|                                                              |
|  Reign Marc                         +----------------------+ |
|  Cipriano                           |                      | |
|                                     |   Real photo of      | |
|  IoT and automation engineer        |   a built board or   | |
|  I build sensor-driven systems      |   the sumobot on its | |
|  from the board to the install.     |   arena (4:5)        | |
|                                     |                      | |
|  [Email me]  [Résumé]               +----------------------+ |
|  (amber dot) Available now          caption, 13px muted      |
|                                                              |
+--------------------------------------------------------------+
| BS Computer Engineering | Civil Service Professional |        |
| TESDA NC II | Dean's list 2024-2025                          |
+--------------------------------------------------------------+
```

- Hero media is a real photo. Placeholder until available: a clean, flat photo of the ESP32 board on the bench.
- Availability line sits under the buttons: a 8px `--led` dot, then "Available now for full-time roles and commissioned builds". This is the only place availability appears besides Contact.
- Credentials row: four items in a single row on desktop, 2x2 on mobile. Each is a bold fact (17px, 600) with a one-line muted detail (14px). No icons, no dividers; use spacing.

## 5. Work: carousel

The single signature element.

### Browse layer

- Coverflow carousel, active card centered, 560 x 380 desktop. Neighbors at scale 0.86, rotateY of 16 degrees toward the center, opacity 0.55. Perspective 1400px.
- Order: Clinic queue, Lab borrowing, Line follower and sumobot, School bell. These are ordered by relevance, not as a sequence, so they are not numbered.
- Card contents: preview image (full-bleed, 12px radius), title (24px), one-line summary (15px muted), up to three stack chips, and a "Live demo" tag with a `--led` dot.
- Below the carousel: a plain text list of the four project titles with a short descriptor. The active one is bold. Clicking focuses that card.
- Controls: previous and next buttons (44px hit area), arrow keys, drag and swipe, pagination dots hidden (the text list replaces them).
- Mobile: horizontal scroll-snap row, one card at 85% width, neighbors peeking.

### Detail layer

- Clicking a card expands its image into the project header (shared-element transition, 320ms). Route: `/work/[slug]`, opened as an overlay from the carousel, full page when visited directly.
- Order on the page:
  1. Title, one-sentence summary, meta row (context, my role, stack chips).
  2. **Demo stage**: full width, dark surface, 20px radius, `--shadow-3`. Always dark, regardless of site theme.
  3. What it solved and what I built. Free-form prose; lengths differ per project.
  4. My part and the result, with a number where one exists.
  5. Diagram (flat, no grid paper).
  6. Photos of the real hardware.
  7. Previous and next project.
- Demo label sits on the stage's top-left: a `--led` dot and "Interactive demo. Simulated data, no backend."
- Each demo has a reset button and a short "Try this" hint line.

### Demos (pure front end)

| Project | Demo |
|---|---|
| Clinic queue | Tabs for Kiosk, Admin, and TV display, sharing one local state. Getting a number on the kiosk shows a ticket animation. Calling next in admin updates the TV and plays a chime. An Internet on/off toggle shows the queue keeps working offline. |
| Lab borrowing | Scan button and a typed sample barcode run a borrow or return. Counters and a transactions table update. |
| Line follower and sumobot | Canvas PID sim with Kp, Ki, Kd sliders. Sumobot state visualizer (search, attack, edge avoid). |
| School bell | Schedule editor and a fast-forward clock. Bell rings and logs when the time matches. |

## 6. Other sections

- **What I can do on a team:** a 2x2 grid of short statements (heading 20px, one sentence each). Order: Install and diagnose on site, Build the prototype, Connect it to software, Deploy it where it has to run. No boxes; space only.
- **Experience:** a vertical list. Each entry: role and organization on the left (600), dates on the right (muted), bullets below. Education and certifications are entries in the same list. Unicenter networking and installation work leads.
- **Skills:** grouped as Embedded and IoT, Networking and site systems, Software, Design and fabrication. Each group is a heading with a comma-separated sentence, not chips.
- **About:** portrait (4:5, 12px radius) beside two short paragraphs. A small facts list: based in, education, certification, area available to work in.
- **Contact:** dark surface section. Large email address, mobile number, LinkedIn or Messenger, area available to work in, and Résumé button. State the locations open for work.

## 7. Motion

- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)`. Durations: 160ms hover, 240ms UI, 320 to 400ms transitions.
- One orchestrated moment: the hero loads in a short sequence (name lines, intro, buttons, media), 60ms stagger, once.
- No fade-up on every section. Images fade in on load only.
- Motion that answers a click (carousel, expand, demo feedback) is encouraged.
- `prefers-reduced-motion`: replace transforms with simple crossfades, disable the 3D tilt.

## 8. Imagery

- Hardware photography: neutral surface, soft daylight, 4:5 or 4:3, shot at 2000px wide minimum. One hero subject per photo.
- Screenshots go inside a browser-style frame: 12px radius, 1px `--line` border, `--shadow-2`.
- Short looping videos (muted, under 5 seconds, WebM and MP4) for robots and the printer.
- Every image has alt text describing what it shows.

## 9. Voice and copy

- First person, plain verbs, short sentences.
- No em-dash chains, no taglines made of parallel triplets, no "WORD — fragment" labels, no arrows in link text, no middle-dot strings.
- Results include a number when one exists. If it does not, say what was verified instead.
- Say each fact once: availability (hero and contact), location (hero and contact), education (credentials row and experience).

## 10. Quality floor

- Contrast at least 4.5:1 for text.
- Visible keyboard focus: 2px `--text` outline, 2px offset, plus a 2px `--led` outer ring.
- Hit targets at least 44px.
- Fully usable at 360px width.
- Carousel and overlay: focus trap, Escape to close, arrow-key navigation, ARIA roles.
- Production build only (no dev badge), favicon, Open Graph image, page titles and descriptions.
- Lazy-load demos with `next/dynamic`. Largest contentful paint under 2.5s on mid-range mobile.

## 11. Remove from the current site

- Cream and red palette
- Mono all-caps eyebrows above every heading
- Numbered project index (01 to 04)
- "Fig. 1" and "PLATE" captions and grid-paper diagram boxes
- Themed section names (Site log, Bench inventory, What I'd bring)
- Repeated availability and location blocks

## 12. Tokens (CSS)

```css
:root {
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --sunken: #EEF0F4;
  --line: #DDE1E8;
  --text: #12161C;
  --muted: #4A5361;
  --subtle: #6B7482;
  --led: #F2A900;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-1: 0 1px 2px rgba(18,22,28,.06), 0 1px 1px rgba(18,22,28,.04);
  --shadow-2: 0 8px 24px -8px rgba(18,22,28,.18), 0 2px 6px rgba(18,22,28,.06);
  --shadow-3: 0 32px 64px -24px rgba(18,22,28,.35), 0 8px 16px rgba(18,22,28,.08);

  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0E1116;
    --surface: #151A21;
    --sunken: #1B222B;
    --line: #262E39;
    --text: #ECEFF3;
    --muted: #9AA5B4;
    --subtle: #7F8A99;
    --led: #F2B01E;
    --shadow-1: none;
    --shadow-2: none;
    --shadow-3: 0 0 0 1px var(--line);
  }
}
```
