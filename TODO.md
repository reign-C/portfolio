# TODO

Working backlog for this portfolio. Tick a box when it ships and add the commit
hash. Anything here can be resumed cold — each item says what to do and what it
needs.

**To resume:** open this file and say *"pick up the next item in TODO.md"*.

## Blocked on you (nothing else can finish these)

- [ ] **Add GitHub + LinkedIn links.** The page has no code links anywhere; it's
      the first thing a technical lead clicks. Needs 2 URLs. Where: `site` object
      in `src/lib/content.ts`, then header + contact block.
- [ ] **Add a git remote.** 7 commits live on one disk only. Needs a repo URL.
      `git remote add origin <url> && git push -u origin main`
- [ ] **Deploy.** Site is fully static and prerendered; Vercel/Netlify/Pages all
      work with no config. Needs a host choice.
- [ ] **Real hardware photos.** Every plate is a screen capture: proves the
      software, says nothing about the wiring. Shot list in `docs/photos.md`;
      replacing one is `photo.src` + `caption` in `src/lib/content.ts`.

## Deferred from the 2026-11-23 critique (19/32, "Acceptable")

- [x] **Plates: aspect and sharpness.** Fixed: each `ProjectPhoto` carries its
      native `width`/`height` and the frame is built from that ratio, so nothing
      is cropped. `sizes` now matches the 817 px rendered box, `qualities`
      allowlists 90, and `deviceSizes` is capped at 1600 so Next never upscales.
      Still open only as an upgrade: re-capture at
      `--force-device-scale-factor=2` for true retina detail.
- [ ] **Ranking: no skim layer.** 9,388 px desktop / 13,438 px mobile; the
      commissioned clinic gets the same ~1,300 px as a course sumobot. Rank the
      work, compress two entries to *also built* rows, add per-project anchors.
- [ ] **`og:image` and tab title.** No share image; the title says "Computer
      Engineer", not the role — LinkedIn shares render as bare text.
- [ ] **Kicker-above-heading ban.** `CAPSTONE PROJECT`, `COMMISSIONED THESIS
      BUILD` etc. sit above every project `h3`. The impeccable craft floor bans
      eyebrow kickers; the project kind can move into the metadata column.
- [ ] **Missing contact facts.** No phone number (a real gap for installation
      work); still no LinkedIn/GitHub.

## From the 2026-11-24 foundation + hero audit (17/20)

Nav scroll-spy, anchor offset, the focus ring on the dark band, the hero
sequence, and the `--subtle` contrast nudge all shipped. What is left:

- [ ] **No section nav below 768 px.** The header is name + Résumé only; the
      page runs ~6,500 px on a phone. Add compact section links or a disclosure,
      keep 44 px targets. Where: `site-header.tsx`, `nav-links.tsx`.
- [ ] **Outline buttons are 1.23:1.** `--line` on `--bg` marks the control
      boundary below the 3:1 WCAG 1.4.11 threshold. Needs a control-border token
      and a spec change; DESIGN.md currently pins `--line`.
- [ ] **Contact repeats availability.** "Open to work in Koronadal and across
      SOCCSKSARGEN" duplicates the "Area open for work" fact in the same block.
      Delete the sentence in `contact.tsx`.
- [ ] **Carousel clips the next card.** 560 px + 16 px + 560 px in a 1,104 px
      container cuts 32 px through the second title at 1440. Use 544 px cards or
      a trailing inset.
- [ ] **768 px credential row wraps unevenly.** Four facts in 672 px give two-
      and three-line cells. Hold the 2×2 grid until `lg`.

## Demos shipped 2026-11-24 — real screens from source

Each demo is now the project's own HTML and CSS, ported from its source into
`public/demos/<project>/` and embedded at its build viewport under
`/work/[slug]`. No hand-rebuilt lookalikes remain. Known limits, on purpose:

- [ ] **Clinic: no printer, no chime.** The kiosk screen shows a ticket number
      but there is no thermal-printer animation and no audio. Both need assets
      and, for audio, a user gesture.
- [ ] **Clinic admin is trimmed.** Login, statistics tab, pause/skip/recall and
      the summary sidebar are hidden so only working controls remain.
- [ ] **Lab dashboard is partial.** The real admin dashboard is ported with mock
      numbers and mock borrower rows; sidebar links are inert, and the recent
      activity table is not paged. Needs a static data pass if it should feel
      fully alive.
- [ ] **Demo screens pan below 640 px.** Frames stop at 0.55 scale and scroll
      horizontally; "Full screen" opens the native-size screen. A phone-native
      crop per screen would be better.
- [ ] **Robotics tuner is dense at stage width.** It renders at 1600×900 and
      scales to ~0.69 on a 1440 screen; a wider stage or a 1280 design width
      would read better.

## Deferred

- [ ] **Classroom management UI** stays in *Also built*. Decision: promoting it
      would argue against the sensor→firmware→install positioning. Revisit only if
      the site ever targets a software role. Screenshots exist at
      `C:\Users\User\Documents\TeacherClassroomManagementSystem\smoke-*.png`.
- [ ] Lighthouse performance 92 → nothing planned. Remaining 300 ms unused JS and
      150 ms legacy transform are framework-inherent. Re-measure against the
      deployed URL instead of chasing it locally.

## Demos shipped 2026-11-24

All four mini demos are live on `/work/[slug]` (see DESIGN.md, Components).
Deferred on purpose, each a stated gap rather than a bug:

- [ ] **Clinic chime is silent.** "Calling next" animates the TV display but
      plays no audio, which the earlier spec asked for. Needs a sound asset and
      an explicit user gesture; browsers block autoplay otherwise.
- [ ] **No printer-ticket animation.** Issuing a ticket updates the counts and
      the log but does not animate a slip.
- [ ] **Demo placements per Impeccable's own evidence rule** (Project 1,
      "What's Working"): project pages carry their own demo's working controls,
      and the Home carousel keeps hover and focus only. Loading four demos on
      the home page would put boot work on the page a recruiter scans first.
      Revisit only if a recruiter needs to touch a demo without opening work.

## Environment notes

- View locally: `npm run dev` → http://localhost:3000 (`npm run build && npm start`
  for the production view). `?audit` is not a site feature — it belongs to the
  impeccable tooling in `.opencode/`.
- **Use `localhost:3000`, not `127.0.0.1:3000`.** Next 16 blocks dev resources
  from a different origin, so on `127.0.0.1` the client runtime never loads and
  nothing hydrates (the plates' Enlarge button silently does nothing). Production
  builds are unaffected.
- **Don't run `next build` while `next dev` is running** — they share `.next`, and
  the dev server keeps serving stale assets after a build.
- Re-capturing a UI: headless Chrome via
  `--headless=new --screenshot --window-size=W,H --force-device-scale-factor=2`.
- Clinic queue needs its pinned stack (FastAPI 0.115.5 / Starlette 0.41.3); the
  system-wide FastAPI 0.133 breaks `TemplateResponse`.
- Borrowing system must be served from `C:\laragon\www`, not its own folder, or
  every `/borrowing_system_COE/assets/...` path 404s. MySQL must be running.
- Captures must keep the clinic unnamed and must not include student names.

## Done

- [x] `687d24a` Content, design system, and pending photo plates.
- [x] `d55673c` Clinic kiosk plate, cropped to keep the clinic unnamed.
- [x] `3d22984` Line follower PID tuner plate.
- [x] `9733f6a` Lab borrowing dashboard plate, cropped above the PII table.
- [x] `7b3f20b` School bell dashboard plate — all four projects carry an artifact.
- [x] `43af0f0` Documented that UI captures ship in place of photographs.
- [x] `367edef` Finish review with measured Lighthouse results (92/100/100/100,
      CLS 0).
- [x] `92ed559` Fold rework from the critique: role under the name, revision strip
      deleted, robotics chain in the hero, one availability line with a start
      date, one email and one résumé action, footer ends on the address, email
      reachable in the mobile nav, and the 768 px two-column collision moved to
      `lg`.
- [x] **About band + portrait** (`public/portrait.jpg`, cropped from the ID
      photo), a numbered work index with jump links and "Back to index", and
      click-to-enlarge plates in a `<dialog>`. Photo is a cropped ID shot — a
      working photograph at the bench would be better.
