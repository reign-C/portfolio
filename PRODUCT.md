# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, in priority order:

1. **Hiring managers and technical leads** filling hands-on IoT / automation / embedded roles in SOCCSKSARGEN. They scan for proof of physical competence — microcontrollers, sensors, wiring, soldering, installation, troubleshooting — and for someone who can own a deployment end to end.
2. **Prospective freelance or contract clients** (schools, clinics, small offices) needing custom devices, automation, or installation work.

Hiring is the primary path; freelance is secondary but plausible given the commissioned prototype work.

## Product Purpose

A personal engineering portfolio for Reign Marc L. Cipriano that makes hands-on IoT competence legible in under 30 seconds and credible enough to shortlist for an IoT & Automation Engineer role.

Success means: a hiring manager understands the role fit, sees real hardware evidence, and has a one-click way to email or download the résumé.

## Positioning

**A builder who takes a physical setup from sensor to firmware to installed system** — not a software-only developer and not a technician who only installs. The combination is the claim: microcontroller prototyping (ESP32/ESP32-S3), Raspberry Pi edge deployments, custom PCB work, sensor integration, UI work, and field installation/troubleshooting of CCTV, PA, and telephony on the same résumé.

## Operating Context

- Target role: **IoT & Automation Engineer**, Koronadal City — CCTV/smart devices/office systems, sensor and actuator design, microcontroller prototypes, AI-assisted automation, end-to-end ownership, parts sourcing.
- Owner is based in Tacurong City, Sultan Kudarat (Region XII), available immediately.
- Visitors arrive from a job application, email, LinkedIn, or GitHub. Many scan on a phone.
- The posting values self-taught makers and real projects over credentials; the site should lead with artifacts, not titles.

## Capabilities and Constraints

- Static, content-led personal site on Next.js 16 (App Router) + Tailwind CSS 4.
- Only claims supported by the résumé or supplied artifacts. Specifically **do not claim**:
  - professional ML / model training on sensor data (AI use is AI-assisted development, not deployed ML);
  - supplier sourcing or procurement coordination;
  - an "Electronics Engineer" license or PRC title;
  - employers, dates, or metrics not provided;
  - a working backend, real QR cryptography, or device sync for the classroom management UI (that delivery was UI-only).
- The clinic stays unnamed; refer to it as "a clinic in Bagumbayan." The school may be named as given: Tacurong National High School's senior high school.
- Degree is a plus, not the pitch. Do not lead with the diploma.
- Résumé PDF is available at `docs/Resume-Cipriano-Reign-Marc.pdf` and may be offered as a download.
- Content must stay easy to edit as new projects ship.

## Evidence on Hand

- **Résumé:** `docs/Resume-Cipriano-Reign-Marc.pdf` — full skills inventory, education, OJT, certifications.
- **Project 1 — Laboratory Materials and Equipment Borrowing System (capstone):** ESP32-S3 + commercial 1D/2D barcode scanner, MySQL schema for borrow/return transactions, UI/UX, hardware wiring, 3D-modelled enclosure, integration and testing.
- **Project 2 — Clinic queue system (commissioned thesis build):** FastAPI + SQLite on a Raspberry Pi; touch kiosk, admin console, and TV display; USB thermal ticket printing; offline TTS announcements (Piper, espeak fallback); systemd deployment. Commissioned for a clinic in Bagumbayan, Sultan Kudarat; services are TB DOTS, medical certificates, and general check-ups. Verified in `C:\Users\User\Desktop\ton\clinic-queue`.
- **Project 3 — Classroom management UI:** React + Vite + Tailwind desktop front end and React Native (Expo) mobile front end on shared design tokens; dashboard, QR attendance scanner, analytics, reports, and schedule screens. UI front-end delivery only — backend, SQLite, QR crypto, and device sync were out of scope. Built for Tacurong National High School's senior high school. Verified in `C:\Users\User\Documents\TeacherClassroomManagementSystem`.
- **Project 4 — Robotics (course requirement + sumobot competition):** PID line follower on ESP32-S3 with QTR-8RC array, TB6612FNG driver, Wi-Fi PID tuner with NVS persistence; autonomous sumobot on ESP32-WROOM-32 with six opponent-sensor inputs, two TCRT5000 edge sensors, XY-160D driver, 3S LiPo power, and a Wi-Fi control page. Verified in `C:\Users\User\Desktop\ton\ROBOTICS\line tracing and sumo`.
- **Project 5 — Scheduled School Bell System:** ESP32 + DFPlayer + amplifier, scheduled school-wide audio automation.
- **Project 6 — Additional commissioned IoT thesis prototypes:** multiple builds with microcontrollers and sensors; wiring, soldering, programming, debugging; AI tools and datasheets used to ramp on unfamiliar components.
- **Experience — OJT, Unicenter Communications (June 2025):** installed CCTV/IP cameras, ceiling and horn speakers, telephone units; configured IP settings; diagnosed network/hardware/firmware faults; PCB soldering; KiCad, AutoCAD, SketchUp drawings.
- **Skills inventory (confirmed):** ESP32, ESP32-S3, ESP32-WROOM-32, Arduino; KiCad, soldering, circuit troubleshooting; HC-SR04, Sharp GP2Y0A21YK0F, TCRT5000, E18-D80NK, DHT22, QTR-8RC, HC-05/HC-06; TB6612FNG, XY-160D, PID line following, sumo match logic; DFPlayer, audio amplifiers, 1D/2D barcode scanners; Raspberry Pi, FastAPI, SQLite, systemd, USB thermal printing, offline TTS; LAN/IP configuration, CCTV/IP, PA/horn, telephone; Python, C++ fundamentals, MySQL, React, React Native (Expo); Arduino IDE, VS Code; OpenCode, GitHub Copilot, LLM APIs; AutoCAD, SketchUp, Tinkercad, Photoshop (7 years), Figma.
- **Credentials:** TESDA NC II Computer Systems Servicing; Civil Service Professional passer (March 2026); Dean's List A.Y. 2024–2025.
- **Not yet available:** project photographs, PCB/schematic images, GitHub/LinkedIn URLs, client testimonials. Photographs are the highest-impact gap: each project has a `photoPending` frame in `src/lib/content.ts` that reserves the plate and states what must be shot, and `photo` replaces it once a real image exists. Shot list is in `docs/photos.md`. Classroom UI screenshots exist but are not used because their visual language conflicts with the site's design system.

## Product Principles

1. **Evidence over adjectives.** Every claim gets an artifact, a component name, or a specific action.
2. **Fast scan first.** Role, location, strongest hardware proof, and contact must land in the first viewport.
3. **Match the posting honestly.** Emphasize sensors, microcontrollers, installation, diagnostics, and AI-assisted building; never imply experience that isn't there.
4. **Every project answers four questions:** the problem, what was built, the owner's specific role, and the outcome.
5. **Physical work should look physical.** The design must feel like an engineering instrument, not a generic SaaS landing page.

## Accessibility & Inclusion

No product-specific requirement established. Default to WCAG 2.2 AA, full keyboard operation, visible focus, reduced-motion support, and readable contrast on mobile outdoors.
