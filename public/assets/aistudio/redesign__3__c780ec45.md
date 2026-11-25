# Portfolio Redesign Spec (v7: work-first, de-templated)

## 0. Brief

**Goal:** Present myself as a computer engineer specializing in IoT and networking, with proof I can design, build and run real systems.

**Audience:** Companies hiring in IoT, embedded, networking and infrastructure. Readers are recruiters (skim in 30 seconds), hiring managers, and engineers (who read the details).

**Primary actions, in order:** 1) Contact me, 2) Download resume, 3) Read a project case study.

**Surface mode:** Experience (a portfolio). The work leads from the first viewport and the interface recedes. Precision and restraint, not decoration.

**Design direction:** A clean dashboard layout (persistent flush sidebar, work-first hero) in a strict two-tone palette: ink and paper, one accent. Real hardware photos and diagrams carry the only real color. Signature touches, kept to two: a small Bayer-dithered portrait and an offline-themed game on the 404/offline pages.

**What changed in v7 (from v6), driven by an Impeccable critique of the mockup (16/24, "Acceptable"):**
- Hero is now **work-first**: one large featured hardware project leads; the portrait shrinks to a small avatar.
- Removed the **stat row**, duplicate CTAs, left accent bars, equal-size card grids, skill tiles, tag chips, pill buttons, appended arrows, middle-dot strings and soft-shadow floating panels.
- Sidebar is **docked flush**, limited to 5 items plus a collapsed "More"; "404 Game" leaves the nav.
- Copy is rewritten for employers: specific, with one measured number per project.
- Accent is derived from the work (patch-cable blue) instead of the framework-default blue.
- The mockup's portrait looked like the reference site's photo. **Use your own photo.**

**Assumptions (edit these):**
- Seeking `<full-time roles / contracts / internships>`.
- Time zone GMT+8, open to remote `<yes/no>`.
- Three real projects so far (a PID-controlled sumo robot, a smart bell system on ESP32, a campus network with VLANs), each needing a real photo, a block diagram and a measured result.
- Stack: Next.js + Tailwind, statically exported.

**Open questions to settle before building:**
1. Role type sought? This decides whether Projects or Experience follows the hero.
2. Which project leads the hero? Pick the one with the best photo and the strongest number. Default: the campus network if you can state its scale (VLANs, users, uptime); otherwise the smart bell system.
3. Any certifications or publications worth listing? (Hidden until you have some.)
4. Work authorization, relocation and remote preferences to state?

---

## 1. The 30-second hiring test

Without scrolling past one screen, a recruiter must learn:
1. **Who:** name and role.
2. **What I do for a company:** one specific sentence.
3. **Proof:** a real hardware photo and a measured result.
4. **Availability:** open to roles, dated, time zone, remote ok.
5. **Next step:** Contact and Resume, visible once.

If any item needs a click or a scroll to find, the design failed.

---

## 2. Keep vs change

| Element | Decision | Detail |
|---|---|---|
| Persistent left sidebar | **Keep, restyle** | Docked flush to the edge, square corners, 1px right border, no shadow, no floating |
| Contact + Resume | **Keep, once** | In the sidebar on desktop; moved into the hero only when the sidebar is hidden (under 900px) |
| Hero | **Replace** | Work-first: identity column (small avatar, name, one sentence, availability) beside one large featured project |
| Portrait | **Shrink** | Small dithered avatar in the hero; full-color photo on About. Must be your own photo |
| Stat row | **Remove** | Replaced by the featured project's own measured result |
| Project cards | **Replace** | One featured project in the hero; the rest as ruled rows with small thumbnails |
| Skill tiles | **Replace** | Ruled table grouped by system layer |
| Active nav indicator | **Change** | Tinted background + accent text; no bar down the side |
| Section titles | **Change** | Plain headings; no left bars, no eyebrows |
| Tags/chips | **Replace** | Stack written as plain inline text |
| Pill buttons, soft shadows, circles around icons | **Remove** | 6px-radius buttons, 1px borders, plain icon buttons |
| Nav size | **Cut** | 5 items + collapsed "More"; hide anything without real content |
| "404 Game" nav item | **Remove** | The game lives on the 404/offline pages and in the command palette |
| Collapsible icon rail | **Remove** | Fixed sidebar on desktop, drawer on mobile |
| Command palette (Cmd/Ctrl+K) | **Keep** | |

Do not reuse anyone else's photo, copy, banner art or icons.

---

## 3. Visual system

### Color (two-tone: ink and paper, one accent)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F2F4F9` | `#0E1117` | App background (tinted toward the accent hue) |
| `--surface` | `#FFFFFF` | `#161A22` | Sidebar, featured photo frame |
| `--ink` | `#14192A` | `#E8ECF5` | Primary text, diagram lines |
| `--muted` | `#566078` | `#9AA5BC` | Secondary text (AA on `--bg` and `--surface`) |
| `--line` | `#DADFEA` | `#262C3A` | Borders, row dividers |
| `--accent` | `#2750E0` | `#7F95FF` | Primary button, links, focus ring, active nav text, dither dots, diagram highlights, game packets |

Rules:
- **Accent derived from the work:** sample the patch-cable blue in your network photo and tune `--accent` to it. Do not ship the framework-default blue.
- Neutrals are tinted toward the accent hue; secondary text is `--muted`, never plain gray.
- Accent appears only on: the primary button, links, focus ring, active nav text, dither dots, diagram highlights, game packets.
- No green, red or amber UI colors. No gradients. No gradient text. No glass or blur.
- Depth comes from 1px borders only. No soft-shadow floating panels.
- AA contrast in both themes (4.5:1 body, 3:1 large text).
- **Diagrams:** ink and accent only. Line weight and dash style carry meaning (solid = wired, dashed = wireless, thick accent = primary data path), always labeled.
- Project photos stay in full color; they are the page's real color.

### Type (two families)
| Role | Family | Notes |
|---|---|---|
| Everything: name, headings, UI, body | **Schibsted Grotesk** | Not the Inter-style default. Headings weight 600-700, tracking no tighter than -0.02em; body 400 at 16-17px, line-height 1.55 |
| Code, protocol and register names, game HUD | **JetBrains Mono** | Only for real code or data (e.g. `MQTT`, `0x3C`), never as a "technical" costume |

Scale: 56 / 28 / 20 / 16 / 14. Display maximum 6rem. Body measure 65-75 characters. Balanced headings (`text-wrap: balance`). Sentence case. Use tabular numerals for any numbers in tables.

### Shape and spacing
- 8px base unit; generous space between groups, tight inside them, more space above a heading than below it.
- Radius: 6px on buttons and nav items; 0 on the sidebar, rows and photos; 12px on the avatar only.
- Main content max width 1080px, left-aligned. Sidebar 248px, fixed.
- No pill buttons.

### Browser surfaces (theme them)
Set `accent-color`, `::selection` (accent tint), `caret-color`, a visible 2px accent focus ring, link underline offset 3px, and slim scrollbars from the palette.

### Bitmap dithering (one use: the small hero avatar)
- **Algorithm:** ordered dithering with an 8x8 Bayer matrix.
- **Look:** 1-bit, `--accent` dots on `--surface`, rendered as a CSS mask so light and dark mode recolor it automatically.
- **Size:** 120x150 CSS px (60x75 cells at 2 CSS px each), 12px radius.
- **Only here:** the hero avatar. No dithered photos of hardware, no bands, no backgrounds.
- **Readability test (required):** at 100% zoom, a stranger can tell your face, glasses/hair and expression apart. If not, drop the avatar from the hero and show your full-color photo on About only. Never ship a muddy dither.
- **About page:** full-color photo of you.
- **Use your own photo.** Do not use the reference site's portrait or a placeholder.

**Build-time generator (Node + sharp):**

```js
// scripts/dither.mjs  ->  node scripts/dither.mjs photo.jpg public/avatar-dither.png
import sharp from "sharp";

const BAYER8 = [
   0,32, 8,40, 2,34,10,42,
  48,16,56,24,50,18,58,26,
  12,44, 4,36,14,46, 6,38,
  60,28,52,20,62,30,54,22,
   3,35,11,43, 1,33, 9,41,
  51,19,59,27,49,17,57,25,
  15,47, 7,39,13,45, 5,37,
  63,31,55,23,61,29,53,21,
];

const [src, dest] = process.argv.slice(2);
const W = 60, H = 75, SCALE = 4; // 60x75 cells -> 240x300 px (shown at 120x150 CSS px)

const { data } = await sharp(src)
  .resize(W, H, { fit: "cover", position: "attention" })
  .greyscale().normalise().linear(1.15, -10)
  .raw().toBuffer({ resolveWithObject: true });

const rgba = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const threshold = ((BAYER8[(y % 8) * 8 + (x % 8)] + 0.5) / 64) * 255;
    if (data[y * W + x] < threshold) rgba[(y * W + x) * 4 + 3] = 255;
  }
}

await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .resize(W * SCALE, H * SCALE, { kernel: "nearest" })
  .png({ palette: true, colors: 2 })
  .toFile(dest);
```

**Rendering:**

```html
<div class="avatar-wrap">
  <div class="avatar" role="img" aria-label="Portrait of <Your Name>"></div>
</div>
```

```css
.avatar-wrap { width:120px; height:150px; background:var(--surface); border:1px solid var(--line); border-radius:12px; overflow:hidden; }
.avatar { width:100%; height:100%; background-color:var(--accent);
  -webkit-mask:url("/avatar-dither.png") center/100% 100% no-repeat;
          mask:url("/avatar-dither.png") center/100% 100% no-repeat; }
```

Use a photo with a simple background and strong light on the face; keep the PNG under about 20 KB.

---

## 3b. Theme: "Connection lost" (two places only)

**Idea:** Networks fail, and a good engineer designs for it. The offline/404 moment becomes a small game. The rest of the site stays quiet.

**Do not copy the browser dinosaur.** That sprite is Google's artwork. Keep the idea (a 1-bit runner on the offline page) and use your own mascot and obstacles.

| # | Where | What |
|---|---|---|
| 1 | 404 page and offline page | Playable "Packet Runner" |
| 2 | Command palette | Entry "Play Packet Runner" that opens the 404 game page |

Not in the navigation. Not a nav item, not a button on Home.

### Characters (original, 1-bit)
- **Ping** (player): a boxy robot with an antenna, 12x13 px. Placeholder sprite below; redraw it to your taste.
- **Dropped packet** (obstacle): 8x8 square with an X.

```text
PING (12x13)            PACKET (8x8)
.....##.....            ########
.....##.....            #......#
......#.....            #.#..#.#
..########..            #..##..#
.##########.            #..##..#
.##.####.##.            #.#..#.#
.##.####.##.            #......#
.##########.            ########
.##########.
..########..
..##....##..
..##....##..
.###....###.
```

### Pixel rules
- 1-bit sprites on a 1px grid, scaled 2x nearest-neighbor (`image-rendering: pixelated`).
- Ping and the ground line use `--ink`; dropped packets use `--accent`; background is `--surface`. Light and dark work automatically.
- The HUD uses JetBrains Mono (it is real data: a score).

### 404 page
```
┌─────────────┬────────────────────────────────────────────────┐
│ sidebar     │  404: page not found                           │
│ (normal)    │  This page doesn't exist or has moved.         │
│             │  [ Home ]  [ Projects ]  [ Contact ]           │
│             │ ┌────────────────────────────────────────────┐ │
│             │ │                       Uptime 00042  Best 120│ │
│             │ │   ▟█▙                          ▣           │ │
│             │ │ ─────────────────────────────────────────── │ │
│             │ └────────────────────────────────────────────┘ │
│             │  Press Space or tap to start.                  │
└─────────────┴────────────────────────────────────────────────┘
```

Home, Projects and Contact always sit above the game, so the hiring path is never blocked.

### Offline page
Served by a service worker when a visitor loses connection. Same game, single column, no sidebar. Fully self-contained (inline CSS and JS, system font fallback). Heading: "You're offline". Body: "Reconnect to keep browsing. Press Space to play in the meantime."

### Game rules
- Controls: Space, Up arrow or tap. Ping runs automatically; collision ends the run.
- Score is "Uptime" (distance); "Best" is saved in `localStorage` (try/catch).
- Speed ramps slowly. The game never autoplays; it starts only after input.
- Game over text goes in an `aria-live="polite"` element: "Connection lost. Press Space to reconnect."
- Focus order: page links first, game second.

### Core game loop (starter)
```js
// public/packet-runner.js
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const W = 300, H = 75, G = 62;            // logical size; ground y
canvas.width = W; canvas.height = H;      // CSS scales it 2x with image-rendering: pixelated

const PING = [
  ".....##.....",".....##.....","......#.....","..########..",".##########.",
  ".##.####.##.",".##.####.##.",".##########.",".##########.","..########..",
  "..##....##..","..##....##..",".###....###.",
];
const PACKET = ["########","#......#","#.#..#.#","#..##..#","#..##..#","#.#..#.#","#......#","########"];

const sprite = (s, x, y, color) => {
  ctx.fillStyle = color;
  s.forEach((row, j) => [...row].forEach((c, i) => c === "#" && ctx.fillRect(Math.round(x + i), Math.round(y + j), 1, 1)));
};

let state = "idle", py = G - 13, vy = 0, speed = 1.6, obs = [], score = 0, best = 0, last = 0;
try { best = +localStorage.getItem("pr-best") || 0; } catch {}

function start() { py = G - 13; vy = 0; speed = 1.6; obs = [{ x: W + 30 }]; score = 0; state = "run"; }
function jump()  { if (state !== "run") return start(); if (py >= G - 13) vy = -4.6; }

function frame(t) {
  const dt = Math.min((t - last) / 16.7, 2); last = t;
  const ink = css("--ink"), accent = css("--accent");
  ctx.clearRect(0, 0, W, H);

  if (state === "run") {
    vy += 0.28 * dt; py = Math.min(py + vy * dt, G - 13);     // gravity, floor
    obs.forEach(o => (o.x -= speed * dt));
    if (obs[0].x < -8) obs.shift();
    if (obs[obs.length - 1].x < W - (70 + Math.random() * 90)) obs.push({ x: W + 8 });
    speed += 0.0008 * dt; score += speed * dt * 0.1;
    const hit = obs.some(o => o.x < 36 && o.x + 8 > 24 && py + 13 > G - 8);   // Ping box vs packet box
    if (hit) {
      state = "over"; best = Math.max(best, Math.floor(score));
      try { localStorage.setItem("pr-best", best); } catch {}
      document.getElementById("status").textContent = "Connection lost. Press Space to reconnect.";
    }
  }

  ctx.fillStyle = ink; ctx.fillRect(0, G, W, 1);               // ground line
  sprite(PING, 24, py, ink);
  obs.forEach(o => sprite(PACKET, o.x, G - 8, accent));
  ctx.font = "8px 'JetBrains Mono', monospace"; ctx.textAlign = "right";
  ctx.fillText(`Uptime ${String(Math.floor(score)).padStart(5, "0")}  Best ${String(best).padStart(5, "0")}`, W - 4, 10);
  requestAnimationFrame(frame);
}

addEventListener("keydown", e => { if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); jump(); } });
canvas.addEventListener("pointerdown", jump);
requestAnimationFrame(frame);
```

```css
#game { width:600px; max-width:100%; aspect-ratio:4/1; image-rendering:pixelated;
        background:var(--surface); border:1px solid var(--line); border-radius:6px; }
```

### Offline service worker
```js
// public/sw.js
const CACHE = "offline-v1";
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(["/offline.html"]))));
self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match("/offline.html")));
  }
});
```

---

## 4. Information architecture (sidebar)

**Rule: show only what has real content.** A page appears in the nav only when it has at least one real entry. Show a count only when there are two or more. No empty pages, no placeholders.

| Area | Items |
|---|---|
| Top | **Contact** (solid accent button, 6px radius) and a **Resume** link (PDF download) beneath it |
| Main (5 items) | Home, Projects, Experience, Skills, About |
| More (collapsed by default) | Case studies, Certifications, Notes, Home lab, Links. Each appears only when it has content |

Rules:
- Labels in sentence case, one line each. Text-only labels; icons only where a label alone is ambiguous.
- Active item: `--accent` text with a faint accent tint background and `aria-current="page"`. No side bar.
- Sidebar header: your name at 20px on one line (shorten the display name if it wraps).
- Footer: one status line, "Open to `<roles>`, available from `<date>`", then the time zone with local time as text, then plain icon links for GitHub, LinkedIn and email (44px targets, `aria-label` on each, no circles around them).

**Mobile (under 900px):** top bar (name + menu button) opening a slide-over drawer with the same list. Contact and Resume appear in the hero, once.

---

## 5. Layout

```
┌─────────────┬────────────────────────────────────────────────────┐
│ <Name>      │ ┌──────────────────┐  ┌──────────────────────────┐ │
│             │ │ [avatar]         │  │                          │ │
│ [ Contact ] │ │                  │  │   FEATURED HARDWARE      │ │
│ Resume      │ │ <Name>           │  │   PHOTO (4:3, real       │ │
│             │ │ Computer engineer│  │   color, uncropped)      │ │
│ Home        │ │ building IoT and │  │                          │ │
│ Projects    │ │ the networks it  │  └──────────────────────────┘ │
│ Experience  │ │ runs on.         │  Campus network setup          │
│ Skills      │ │ <one specific    │  <result with a real number>   │
│ About       │ │ sentence>        │  ESP32, VLANs, MQTT            │
│ More ▾      │ │                  │  Read the case study           │
│             │ │ ● Open to roles  │                                │
│             │ └──────────────────┘                                │
│             │ ────────────────────────────────────────────────    │
│             │ More work                                           │
│             │ [thumb] Smart bell system   ESP32, RTC   <result>   │
│             │ [thumb] PID sumobot         ESP32, PID   <result>   │
│             │ ────────────────────────────────────────────────    │
│ ● Open to…  │ Skills                                              │
│ GMT+8 gh in │ Hardware        <...>                               │
│ ✉           │ Networking      <...>                               │
│             │ Experience                                          │
└─────────────┴────────────────────────────────────────────────────┘
```

Alignment: sidebar fixed; main content left-aligned. The hero is a 5/7 column split: identity on the left, featured project on the right. Below 1100px the hero stacks: identity first, then the featured project.

---

## 6. Components and templates

**Hero identity column.** Small dithered avatar (120x150, only if it passes the readability test), name at 48-56px, one sentence about what you build, one specific sentence of proof, then the availability line. On mobile only, add Contact and Resume buttons here.

**Featured project (hero, right).** The hardware photo, full width of the column, 4:3, uncropped so the device is visible. Under it: title, a one-line result with a real number, stack as plain inline text separated by commas, and a text link "Read the case study". No chips, no icons, no external-link glyphs, no card border around the whole block.

**More work (ruled rows, not cards).** Each row: 96x64 thumbnail (real photo), title, stack in `--muted`, a short result, the year. The whole row is one link. 1px `--line` between rows. Hover or focus: underline the title; no lift, no shadow.

**Skills.** A ruled table grouped by system layer (no tiles, no icons). Replace with your real skills; each skill links to the project where you used it. Protocol and tool names use the mono font.

| Layer | Examples |
|---|---|
| Hardware | `<ESP32, Arduino, sensors, PCB, power>` |
| Firmware | `<C/C++, RTOS, drivers, OTA updates>` |
| Protocols | `<MQTT, CoAP, BLE, LoRaWAN, Modbus>` |
| Networking | `<TCP/IP, VLANs, routing and switching, Wi-Fi, access control>` |
| Edge and cloud | `<Firebase, time-series DB, dashboards, containers>` |
| Tools | `<Wireshark, logic analyzer, oscilloscope, Git, Linux>` |

**Case study template.** Same order every time so hiring managers can skim:
1. Summary (2-3 sentences: problem, what I built, result)
2. My role, timeframe, team size
3. Constraints (power budget, latency, cost, range, security)
4. System architecture: block diagram as inline SVG in ink and accent
5. Hardware and firmware choices, and why
6. Network design: topology, addressing and VLANs, protocols, security
7. Results with measured numbers (latency, battery life, packet loss, cost, uptime)
8. What I'd change next
9. Links: repo, demo video, schematics, datasheets

**Experience.** Dated ruled rows (a real timeline): role, company, dates, 2-3 bullets with measured outcomes.

**About.** Full-color photo of you, a short story, what you're looking for, how to reach you.

**Certifications, Notes, Home lab, Links.** Pages exist only when they have real content.

**Command palette.** Cmd/Ctrl+K lists every page, project and external link, plus "Play Packet Runner". Esc closes, focus is trapped while open.

**Contact.** Plain email with a copy button, LinkedIn, GitHub, resume PDF, an optional booking link. No contact form unless you'll monitor it.

---

## 7. Content guidance

- Write for the hiring manager: what problem, what you built, what changed.
- **One measured number per project.** Never invent a number; if you don't have one, measure it or write the project without one.
- Delete "passionate", "real projects", "world-class" and similar filler. Say what you built.
- Name tools and protocols specifically; employers search for them.
- Plain verbs, active voice, sentence case. Buttons say what happens: "Contact", "Download resume", "Read the case study".
- No appended arrows, no middle-dot strings. Use sentences or commas.
- Availability text is real and dated; remove it if stale.
- Page title: "`<Name>`: Computer engineer, IoT and networking".

Fill-in patterns:
- Role sentence: "Computer engineer. I build IoT devices and the networks they run on."
- Proof sentence: "`<Latest result in one line, e.g. 'Deployed a campus LAN with N VLANs for N users.'>`"
- Project result: "`<What it does>`, `<measured number>`, `<what it replaced or beat>`."
- Availability: "Open to `<roles>`, available from `<date>`. GMT+8, remote ok."

---

## 8. Motion

- One entrance: the hero identity and featured photo fade in together once on load (200 ms, ease-out).
- Everything else answers user action: drawer open/close, palette open/close.
- No scroll-triggered reveals, no hover lift, no hover reveals.
- The game runs only after a key press or tap. Respect `prefers-reduced-motion`.

---

## 9. Implementation notes

```css
:root {
  --bg:#F2F4F9; --surface:#fff; --ink:#14192A; --muted:#566078;
  --line:#DADFEA; --accent:#2750E0;
  accent-color: var(--accent);
}
@media (prefers-color-scheme: dark) {
  :root { --bg:#0E1117; --surface:#161A22; --ink:#E8ECF5; --muted:#9AA5BC;
          --line:#262C3A; --accent:#7F95FF; }
}
body { background:var(--bg); color:var(--ink); font-family:"Schibsted Grotesk",system-ui,sans-serif; font-size:17px; line-height:1.55; }
h1,h2,h3 { text-wrap:balance; letter-spacing:-0.02em; }
p { max-width:70ch; }
code, .mono { font-family:"JetBrains Mono",ui-monospace,monospace; }
::selection { background:color-mix(in srgb, var(--accent) 25%, transparent); }
a { text-underline-offset:3px; }
.sidebar { width:248px; background:var(--surface); border-right:1px solid var(--line); height:100vh; position:sticky; top:0; }
.nav-item[aria-current="page"] { color:var(--accent); background:color-mix(in srgb, var(--accent) 8%, transparent); border-radius:6px; }
.btn { border-radius:6px; }
:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
```

- **SEO for recruiters:** `Person` JSON-LD (name, jobTitle, sameAs for LinkedIn and GitHub), unique titles and descriptions per page, Open Graph image (use the featured hardware photo), sitemap.
- **Performance:** static export, fonts with `font-display: swap` and Latin subset, AVIF/WebP images with explicit width and height, diagrams as inline SVG.
- **Images:** real photos you took, with descriptive alt text. Hero photo loads eagerly; everything else lazy.
- **Resume:** a PDF at a stable URL, kept in sync with the site.
- **Accessibility:** semantic `<nav>` with `aria-current`, alt text on photos and diagrams, keyboard-operable drawer and palette, visible focus, 44px touch targets, text never carried by color alone.
- Register the service worker in production only; keep `offline.html` self-contained and under ~30 KB. Load the game bundle (under ~6 KB) only on the 404 and offline pages.

### Verify with Impeccable
1. In the project root, run `npx impeccable install`, then `/impeccable init` to write `PRODUCT.md` (audience: hiring managers in IoT and networking; mode: Experience).
2. After the first build, run `impeccable detect --json` on the page; fix every finding.
3. Run `/impeccable critique` on the home page and aim for 20+/24 (the same six heuristics). Fix P1s, then run `/impeccable polish`.
4. Re-screenshot at 1440, 1024 and 390 px wide and check the 30-second hiring test at each.

---

## 10. Acceptance checklist

**Hiring test**
- [ ] Name, role sentence, proof, availability, Contact and Resume are visible without scrolling at 1280x720
- [ ] Contact and Resume appear once per viewport (sidebar on desktop, hero on mobile)
- [ ] The featured hardware photo is large, in color, and uncropped
- [ ] Every project has a measured number, a diagram and a case study
- [ ] Resume PDF is current

**Template tells gone (Impeccable critique findings)**
- [ ] No stat row or hero-metric strip
- [ ] No bar down the side of any box (nav item, section title, card)
- [ ] No equal-size card grids; no skill tiles; no tag chips
- [ ] No eyebrows above headings; no section numbers
- [ ] No pill buttons, soft shadows, gradients or circles around icons
- [ ] No appended arrows; no middle-dot strings
- [ ] No filler copy ("passionate", "real projects")
- [ ] Nav has 5 items + collapsed More; no empty pages; no "404 Game" item

**Still its own design**
- [ ] Sidebar is docked flush with square corners, not a floating panel
- [ ] Hero is work-first, not photo-left-and-stats
- [ ] Portrait is your own photo, small, dithered, and readable (or omitted from the hero)
- [ ] Accent is tuned to your own hardware photo, not the framework default
- [ ] Two font families; Schibsted Grotesk, not Inter

**Theme**
- [ ] Ping and packet sprites are your own artwork, not the browser dinosaur
- [ ] Game appears only on the 404 and offline pages (and via the command palette)
- [ ] Home, Projects and Contact links sit above the game
- [ ] Game starts only after input, works by keyboard and tap, announces game over
- [ ] Offline page works with the network off (test in DevTools)

**Quality**
- [ ] AA contrast in light and dark, including muted text
- [ ] Full keyboard support, visible focus, Cmd/Ctrl+K works
- [ ] Works at 390px width with 44px touch targets
- [ ] Reduced motion respected
- [ ] `impeccable detect` clean; critique score 20+/24
- [ ] Lighthouse performance 90+

---

## 11. Build order (Impeccable's priority call)
1. **Work first:** tokens, fonts, shell, then the work-first hero with your best hardware photo
2. **Strip the tells:** rows instead of cards, skills table, no stat row, no bars, 5-item nav, one CTA pair
3. **Break the silhouette:** flush sidebar, small avatar, your own photo, tuned accent
4. Case-study template and your first 3 projects with diagrams and measured results
5. Experience, About, and any Certifications / Notes / Home lab with real content
6. Command palette, SEO and JSON-LD
7. 404 and offline pages, service worker, Packet Runner
8. Mobile drawer, dark mode, accessibility pass, then the Impeccable verify loop (section 9)
