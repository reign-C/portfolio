# Photographs

The site has one job the text cannot do: prove the hardware was real. Right now
every figure is a diagram. Photographs are the missing evidence.

Rule for all of them: **a finished, working object in its real place** beats a
tidy row of parts on a desk. The parts list already exists in Bench inventory;
photographs should show the thing assembled, wired, mounted, or running.

## What to shoot, in priority order

1. **Clinic queue kiosk, in the clinic.** The single most valuable image on the
   site: a commissioned system installed at a client site. Get the kiosk screen
   lit, the printer beside it, one hand using it. `clinic-kiosk.jpg`
   *Status: a screen capture of the running app ships instead
   (`public/work/clinic-kiosk.jpg`, cropped to keep the clinic unnamed). A
   physical photo still beats it; replace the `photo.src` when you have one.*
2. **Capstone station, complete.** Scanner on its stand, ESP32-S3 and wiring
   visible inside the printed enclosure, screen showing the borrow UI.
   `lab-station.jpg`
3. **Sumobot in the ring**, mid-match, or the line follower on the tape. Motion
   and the course read as competence. `sumobot.jpg`
4. **School bell unit**, wired into the amplifier and horn speaker. Proves
   installation, not just assembly. `school-bell.jpg`
5. **Bench shot.** One only: hands soldering, or a wired breadboard with sensors
   labeled. This is the right place for a sensor close-up — as process, not as
   a product family. `bench.jpg`

## Optional, if a good render exists

- A KiCad schematic or PCB layout exported as an image (robotics/kicad project).
  This is a rare artifact for a fresh graduate and it supports the Fabrication
  row in Bench inventory.

## Do not add

- AI-generated or stock hardware images. One recognizable fake ends the
  credibility the rest of the page is building.
- A sensor photo gallery. HC-SR04 and DHT22 close-ups are parts, not evidence;
  they are already listed by name.
- Classroom management UI screenshots. Their visual language fights this design.
- A large photo grid. One plate per project, four total, plus the bench shot.

## Technical notes

- Save as JPEG, longest edge about 1600 px, quality ~80. Phone photos are fine;
  shoot in daylight, no flash.
- Put files in `public/work/`. Reference them as `/work/<name>.jpg`.
- Add the `photo` object to the project in `src/lib/content.ts`:

```ts
photo: {
  src: "/work/clinic-kiosk.jpg",
  alt: "The queue kiosk and thermal printer on the clinic counter",
  caption: "The kiosk in the clinic, printer beside it. One Pi serves the whole queue.",
  aspect: "wide", // or "square" / "tall"
},
```

Nothing renders until `photo` is present, so a half-filled set is safe to deploy.
