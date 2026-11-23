export type ChainStep = {
  kicker: string;
  title: string;
  meta: string;
  /** How this step connects to the next one. Omitted on the last step. */
  via?: string;
};

/**
 * A photograph of the finished build. Printed as a plate above the spec list,
 * so the reader sees the object before reading the claim about it.
 * Drop the file in `public/work/` and reference it from there.
 */
export type ProjectPhoto = {
  /** Path under `public/`, e.g. "/work/clinic-kiosk.jpg". */
  src: string;
  /** What the photo actually shows, for screen readers and search. */
  alt: string;
  /** One line under the frame. Facts, not adjectives. */
  caption: string;
  /** Crop of the frame. Defaults to "wide". */
  aspect?: "wide" | "square" | "tall";
};

export type Project = {
  id: string;
  kind: string;
  title: string;
  summary: string;
  stack: string;
  /** A real photograph. Wins over `photoPending` when both are set. */
  photo?: ProjectPhoto;
  /**
   * What belongs in this project's plate until a photograph exists. Renders a
   * frame of the same size, so adding the photo later moves nothing.
   */
  photoPending?: string;
  facts: {
    problem: string;
    built: string;
    role: string;
    result: string;
  };
  chain: ChainStep[];
  figure: string;
  note?: string;
};

export const site = {
  name: "Reign Marc Cipriano",
  shortName: "R. M. Cipriano",
  role: "Computer engineer",
  location: "Tacurong City, Sultan Kudarat",
  region: "SOCCSKSARGEN, Region XII",
  email: "ciprianoreignmarc@gmail.com",
  resume: "/Resume-Cipriano-Reign-Marc.pdf",
  availability: "Open to full-time IoT and automation roles",
  updated: "Rev. 2026.11",
} as const;

export const hero = {
  deck: "I build sensor-driven systems end to end: the board, the firmware, and the install.",
  body: "Computer engineering graduate (June 2026) with hands-on work in ESP32 and ESP32-S3 prototypes, Raspberry Pi deployments, PCB soldering, and on-site CCTV, PA, and telephony. Based in Tacurong City, open to work in Koronadal and across SOCCSKSARGEN.",
  bom: "ESP32-S3 · 1D/2D scanner · 5 V supply · printed enclosure",
} as const;

export const heroChain: ChainStep[] = [
  {
    kicker: "Input",
    title: "1D/2D scanner",
    meta: "Reads the item barcode",
    via: "UART",
  },
  {
    kicker: "Control",
    title: "ESP32-S3",
    meta: "Firmware and Wi-Fi",
    via: "SQL",
  },
  {
    kicker: "Record",
    title: "MySQL ledger",
    meta: "Borrow and return rows",
    via: "Query",
  },
  {
    kicker: "Interface",
    title: "Borrow / return UI",
    meta: "The staff-facing screen",
  },
];

export const projects: Project[] = [
  {
    id: "lab-tracking",
    kind: "Capstone project",
    title: "Lab equipment borrowing, tracked by barcode",
    summary:
      "A scanning station that turns every borrow and return into a database transaction, so the lab ledger stops being a handwritten log.",
    stack: "ESP32-S3 · 1D/2D scanner · MySQL · Figma · SketchUp",
    photoPending:
      "The scanning station at the lab counter: scanner on its stand, ESP32-S3 and wiring inside the printed enclosure, the borrow screen\u00a0lit.",
    facts: {
      problem:
        "Lab equipment was logged by hand, which made borrow and return records slow to write and hard to audit.",
      built:
        "An ESP32-S3 station with a commercial 1D/2D barcode scanner, a MySQL schema for borrow and return transactions, the interface that reads it, and a 3D-modelled\u00a0enclosure.",
      role:
        "Firmware and wiring, the database schema, the UI/UX, and the enclosure. Shared integration, testing, and documentation with the team.",
      result:
        "Each item is scanned in and out; the ledger is a transaction record instead of a paper trail.",
    },
    chain: [
      {
        kicker: "Input",
        title: "1D/2D scanner",
        meta: "Reads the item barcode",
        via: "UART",
      },
      {
        kicker: "Control",
        title: "ESP32-S3",
        meta: "Firmware and Wi-Fi",
        via: "SQL",
      },
      {
        kicker: "Record",
        title: "MySQL ledger",
        meta: "Borrow and return rows",
        via: "Query",
      },
      {
        kicker: "Interface",
        title: "Borrow / return UI",
        meta: "The staff-facing screen",
      },
    ],
    figure:
      "Fig. 1 — Capstone signal path. One scan becomes one transaction; the interface reads the same\u00a0ledger.",
    note: "The tracking unit's enclosure was designed in 3D.",
  },
  {
    id: "clinic-queue",
    kind: "Commissioned thesis build",
    title: "A clinic queue that runs on one Raspberry Pi",
    summary:
      "A walk-in clinic in Bagumbayan needed more than a paper list: a kiosk that issues tickets, a screen that calls the next patient, and a queue that keeps working when the internet does not.",
    stack: "FastAPI · SQLite · Raspberry Pi · USB thermal printer · offline TTS",
    photo: {
      src: "/work/clinic-kiosk.jpg",
      alt: "Queue kiosk screen: five clinic services, each with a waiting count and the ticket now called, General Check-up 001 and Laboratory 001.",
      caption:
        "Screen capture from the running app. Five services, live waiting counts, and the ticket now called on the display.",
    },
    facts: {
      problem:
        "Walk-in patients were queued by hand across three services: TB DOTS, medical certificates, and general check-ups.",
      built:
        "A single-server FastAPI app with a touch kiosk, an admin console, and a TV display, plus USB thermal ticket printing and offline audio announcements. Runs on a Raspberry Pi over the clinic's local network.",
      role:
        "Commissioned build: the API, SQLite schema, all three interfaces, printer integration, offline text-to-speech, and the Pi deployment scripts.",
      result:
        "The kiosk prints a numbered ticket, the admin calls the next patient, and the TV and audio announce it — with no cloud service in the path.",
    },
    chain: [
      {
        kicker: "Input",
        title: "Touch kiosk",
        meta: "Patient picks a service",
        via: "HTTP",
      },
      {
        kicker: "Control",
        title: "FastAPI on Pi",
        meta: "Queue state and auth",
        via: "SQL",
      },
      {
        kicker: "Record",
        title: "SQLite queue",
        meta: "Tickets and daily reset",
        via: "Next",
      },
      {
        kicker: "Output",
        title: "Ticket, TV, audio",
        meta: "Printed and announced",
      },
    ],
    figure:
      "Fig. 2 — Clinic queue path. The Pi is the only server; kiosk, admin, display, and printer share the clinic's local network.",
    note: "The printer falls back to a log if USB IDs are unset; announcements use Piper with an espeak fallback.",
  },
  {
    id: "robotics",
    kind: "Course build + competition",
    title: "A PID line follower and an autonomous sumobot",
    summary:
      "Two robots that sense their own course: one holds a line with eight reflectance sensors, the other hunts an opponent and avoids the ring edge. Both expose a Wi-Fi control page.",
    stack:
      "ESP32-S3 · ESP32-WROOM-32 · QTR-8RC · TCRT5000 · TB6612FNG · XY-160D",
    photoPending:
      "Both robots on the course: the line follower mid-lap and the sumobot in the ring, side by\u00a0side.",
    facts: {
      problem:
        "A course requirement and a sumobot competition needed robots that could sense, decide, and drive without a controller.",
      built:
        "A PID line follower on an ESP32-S3 with a QTR-8RC array and TB6612FNG driver; an autonomous sumobot on an ESP32-WROOM-32 with six opponent-sensor inputs, two TCRT5000 edge sensors, an XY-160D driver, and 3S LiPo power. Both expose a Wi-Fi access point with a tuning or control page.",
      role:
        "Firmware, sensor calibration, PID tuning, motor-driver wiring, power distribution, and the web control pages.",
      result:
        "The line follower holds the line with live Kp/Ki/Kd tuning saved to flash; the sumobot runs opening, search, engage, and edge-avoid states.",
    },
    chain: [
      {
        kicker: "Sense",
        title: "QTR-8RC / TCRT5000",
        meta: "Line, edge, opponent",
        via: "GPIO",
      },
      {
        kicker: "Control",
        title: "ESP32",
        meta: "PID and match states",
        via: "PWM",
      },
      {
        kicker: "Drive",
        title: "H-bridge",
        meta: "TB6612FNG / XY-160D",
        via: "12 V",
      },
      {
        kicker: "Act",
        title: "Geared motors",
        meta: "Two driven wheels",
      },
    ],
    figure:
      "Fig. 3 — Robot control path. Sensor arrays feed the ESP32; the H-bridge turns PWM into motor drive.",
    note: "The line follower's tuner persists PID values in NVS; the sumobot's page selects opening moves and match behavior.",
  },
  {
    id: "school-bell",
    kind: "School build",
    title: "A school bell that keeps its own schedule",
    summary:
      "An ESP32, a DFPlayer module, and an amplifier replace a manual bell with scheduled audio across the campus.",
    stack: "ESP32 · DFPlayer · audio amplifier · horn speakers",
    photoPending:
      "The bell unit wired into its amplifier and horn speaker, mounted where it actually\u00a0runs.",
    facts: {
      problem:
        "The school bell depended on someone operating it on time, every period.",
      built:
        "An ESP32-driven bell with a DFPlayer audio module and amplifier, playing scheduled audio through the school's horn speakers.",
      role:
        "Built the unit: wiring, firmware, audio module integration, and testing.",
      result:
        "The bell runs from a stored schedule rather than a person at the switch.",
    },
    chain: [
      {
        kicker: "Schedule",
        title: "Bell times",
        meta: "Stored on the device",
        via: "Reads",
      },
      {
        kicker: "Control",
        title: "ESP32",
        meta: "Triggers playback",
        via: "UART",
      },
      {
        kicker: "Audio",
        title: "DFPlayer + amplifier",
        meta: "Track to line level",
        via: "Cable",
      },
      {
        kicker: "Output",
        title: "Horn speakers",
        meta: "Campus-wide audio",
      },
    ],
    figure:
      "Fig. 4 — Bell signal path. The schedule lives on the device; the ESP32 triggers playback and the amplifier drives the horns.",
  },
];

export const alsoBuilt = [
  {
    title: "Classroom management UI",
    detail:
      "A React + Vite desktop and React Native (Expo) mobile front end for Tacurong National High School's senior high school: dashboard, QR attendance scanner, analytics, reports, and schedule on shared design tokens. Front-end delivery; backend and device sync were out of scope.",
  },
  {
    title: "Commissioned sensor prototypes",
    detail:
      "Microcontroller builds for student theses using HC-SR04, Sharp GP2Y0A21YK0F, TCRT5000, E18-D80NK, and DHT22, with the wiring, soldering, firmware, and debugging each unit required.",
  },
] as const;

export const experience = {
  org: "Unicenter Communications",
  role: "On-the-job trainee",
  period: "June 2025",
  items: [
    "Installed CCTV/IP cameras, ceiling and horn speakers, and telephone units on client sites.",
    "Configured IP settings on new units and traced network, hardware, and firmware faults across installed devices.",
    "Soldered PCBs when a board needed repair; drew circuits in KiCad and site drawings in AutoCAD and SketchUp.",
  ],
} as const;

export const credentials = [
  {
    title: "BS Computer Engineering",
    detail: "Sultan Kudarat State University, Isulan Campus",
    meta: "June 2026 · Dean's List, A.Y. 2024–2025",
  },
  {
    title: "TESDA NC II",
    detail: "Computer Systems Servicing",
    meta: "Certified",
  },
  {
    title: "Civil Service Examination",
    detail: "Professional level",
    meta: "Passer, March 2026",
  },
] as const;

export const capabilities = [
  {
    area: "Microcontrollers",
    items:
      "ESP32, ESP32-S3, ESP32-WROOM-32, Arduino; firmware in the Arduino IDE",
  },
  {
    area: "Sensing",
    items:
      "QTR-8RC, TCRT5000, HC-SR04, Sharp GP2Y0A21YK0F, E18-D80NK, DHT22",
  },
  {
    area: "Motion",
    items:
      "TB6612FNG and XY-160D drivers, PID line following, sumo match logic, 3S LiPo power",
  },
  {
    area: "Links",
    items:
      "HC-05 and HC-06 Bluetooth, Wi-Fi access points, LAN and IP configuration",
  },
  {
    area: "Fabrication",
    items:
      "KiCad PCB design, soldering, circuit troubleshooting, 3D enclosure modelling",
  },
  {
    area: "Site systems",
    items: "CCTV/IP cameras, PA and horn speakers, telephone units",
  },
  {
    area: "Edge deployment",
    items:
      "Raspberry Pi, FastAPI, SQLite, systemd, USB thermal printing, offline TTS",
  },
  {
    area: "Software",
    items:
      "Python, C++ fundamentals, MySQL, React, React Native (Expo), UI/UX in Figma",
  },
  {
    area: "AI-assisted work",
    items: "OpenCode, GitHub Copilot, LLM APIs, datasheet-driven ramp-up",
  },
  {
    area: "Drawing",
    items: "AutoCAD, SketchUp, Tinkercad, Photoshop",
  },
] as const;

export const fit = [
  {
    lead: "Install and diagnose on site.",
    body: "CCTV and IP cameras, PA and horn speakers, telephones: mounting, IP configuration, and fault-finding on live client sites.",
  },
  {
    lead: "Build the prototype.",
    body: "ESP32 and ESP32-S3, sensors and actuators, soldering, KiCad boards, and printed enclosures.",
  },
  {
    lead: "Connect it to the software.",
    body: "A MySQL schema, barcode input, and the interface staff actually use.",
  },
  {
    lead: "Deploy it where it has to run.",
    body: "A Raspberry Pi serving FastAPI, a USB thermal printer, and a TV display over a clinic's local network — no cloud dependency.",
  },
  {
    lead: "Learn the part, then test it until it works.",
    body: "Datasheets and AI tools to get up to speed on unfamiliar hardware; debugging until the behaviour is right.",
  },
] as const;
