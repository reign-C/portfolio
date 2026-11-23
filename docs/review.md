# Finish review — `/`

Reviewed 2026-11-23 against `.impeccable/brief.md` and `DESIGN.md`, on the built
site (`next build` + `next start`), not on a dev server.

## Verdict

**The page is finished as a document and honest as evidence.** It is not yet
publishable, and the only thing missing is content the owner holds: two links and
a decision about hosting. Nothing in the build is blocking.

## Measured

Lighthouse 12.8.2, mobile form factor, default throttling, all four categories:

| Category | Score |
|---|---|
| Performance | **92** |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

| Metric | Value |
|---|---|
| First Contentful Paint | 1.0 s |
| Largest Contentful Paint | 2.7 s |
| Total Blocking Time | 190 ms |
| Cumulative Layout Shift | **0** |
| Speed Index | 3.7 s |
| Total transfer | 236 KiB |

CLS 0 is the number that matters here: the plate frames reserve their space, so
adding the four project images moved nothing.

Two opportunities remain, both inherent to the framework and not worth chasing at
92: 300 ms of unused JavaScript and 150 ms of legacy-JavaScript transform. The LCP
element is the hero body paragraph, so it is gated by font application, not by an
image.

## What ships

- Four projects, each with a plate captured from its own source, not staged:
  the lab borrowing dashboard (live catalogue: 2,913 items, 982 accounts), the
  clinic queue kiosk, the line follower's PID tuner with live telemetry, and the
  school bell dashboard.
- Every claim traces to `PRODUCT.md`. No invented metrics, no PRC title, no
  employer or date that was not supplied, AI described as assisted development.
- The clinic stays unnamed. The queue footer that carried its name is cropped out
  of the plate.
- No personal data in any capture. The borrowing system's recent-transactions
  table, which lists real students and IDs, is cropped out of the dashboard plate.

## Known gaps

1. **No git remote.** Commits are local only; they do not survive this disk.
2. **No GitHub or LinkedIn link** anywhere on the page — the cheapest remaining
   credibility win, and the only thing a technical lead will look for first.
3. **No hardware photographs.** Every plate is a screen capture, which proves the
   software and says nothing about the wiring. `docs/photos.md` holds the shot
   list; replacing one is a two-line change in `src/lib/content.ts`.
4. **Not deployed.** No host, no domain, no public URL.
