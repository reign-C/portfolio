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

- [ ] **Plates: aspect and sharpness.** Hard `16/10` + `object-cover` crops 10–39%
      (sources 1.78, 1.95, 0.98, 1.77). The lab plate renders 817 px but `sizes`
      declares 790, so a 790 px file is served for an 817 px box. Give
      `ProjectPhoto` real `width`/`height`, derive the aspect, fix `sizes`,
      re-capture at `--force-device-scale-factor=2`, drop the stock-doctor screen.
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

## Next up — plate quality + interactive preview (approved, not started)

Plan is in the current conversation; summary:

- [ ] **Phase 1 — framing and sharpness.** (a) Give `ProjectPhoto` real
      `width`/`height` and derive `aspect-[w/h]` per image, killing the hard-coded
      `16/10` that crops 18% off the lab plate and 39% off robotics.
      (b) Re-capture all four at `--force-device-scale-factor=2` (3200 px wide).
      (c) Add a 1px-ruled mono title bar so a capture reads as a screen.
- [ ] **Phase 2 — multi-screen tabs, CSS-only.** Radio-input tabs, no hydration.
      Clinic: kiosk / admin / TV display. Lab: dashboard / inventory. Robotics:
      tuner / sumobot page. Bell: dashboard / schedule. Needs extra captures.
- [ ] **Phase 3 — click-to-enlarge `<dialog>`.** Hold until Phase 2 is seen; tabs
      may make small text legible enough on their own.

**Open question for Phase 2:** the lab's transactions table contains student
names and IDs. Capture with those columns cropped, or skip that tab? Decide
before capturing it.

## Deferred

- [ ] **Classroom management UI** stays in *Also built*. Decision: promoting it
      would argue against the sensor→firmware→install positioning. Revisit only if
      the site ever targets a software role. Screenshots exist at
      `C:\Users\User\Documents\TeacherClassroomManagementSystem\smoke-*.png`.
- [ ] Lighthouse performance 92 → nothing planned. Remaining 300 ms unused JS and
      150 ms legacy transform are framework-inherent. Re-measure against the
      deployed URL instead of chasing it locally.

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
