export type DiagramNode = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  accent?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label: string;
  kind: "primary" | "wired" | "wireless";
};

export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type HardwarePhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  rank: number;
  year: string;
  kind: string;
  title: string;
  shortTitle: string;
  summary: string;
  measuredResult: string;
  stackList: string[];
  photo: ProjectPhoto;
  hardwarePhotos?: HardwarePhoto[];
  caseStudy: {
    summary: string;
    role: string;
    timeframe: string;
    teamSize: string;
    constraints: string[];
    diagram: {
      caption: string;
      nodes: DiagramNode[];
      edges: DiagramEdge[];
    };
    hardwareFirmware: {
      heading: string;
      detail: string;
    }[];
    networkDesign: {
      label: string;
      value: string;
    }[];
    results: {
      metric: string;
      detail: string;
    }[];
    nextChanges: string[];
    demoNote: string;
    demoHint: string;
    demoScreens: {
      label: string;
      src: string;
      width: number;
      height: number;
      title: string;
    }[];
  };
};

export const site = {
  name: "Reign Marc Cipriano",
  shortName: "R. M. Cipriano",
  title: "Reign Marc Cipriano: Computer engineer, IoT and networking",
  description:
    "Computer engineering graduate in Tacurong City building sensor-driven IoT devices, Raspberry Pi edge deployments, and site CCTV, PA, and telephony systems.",
  roleSentence:
    "Computer engineer. I build IoT devices and the local systems they run on.",
  proofSentence:
    "Deployed an offline Raspberry Pi queue serving 5 clinic services and built an ESP32-S3 barcode ledger tracking 2,913 lab items.",
  availability: "Open to full-time roles and commissioned builds, available now",
  availableDate: "June 2026",
  timezone: "GMT+8",
  location: "Tacurong City, Sultan Kudarat",
  region: "Koronadal City and across SOCCSKSARGEN",
  email: "ciprianoreignmarc@gmail.com",
  github: "https://github.com/reign-C",
  githubHandle: "reign-C",
  facebook: "https://www.facebook.com/reign.reign.94801116",
  resume: "/Resume-Cipriano-Reign-Marc.pdf",
  featuredProjectId: "clinic-queue",
} as const;

export const heroMetrics = [
  {
    value: "5 services",
    label: "Offline clinic queue",
    href: "/work/clinic-queue",
  },
  {
    value: "2,913 items",
    label: "Lab barcode ledger",
    href: "/work/lab-tracking",
  },
  {
    value: "0 cloud deps",
    label: "Raspberry Pi edge",
    href: "/work/clinic-queue",
  },
] as const;

export const projects: Project[] = [
  {
    id: "clinic-queue",
    rank: 1,
    year: "2026",
    kind: "Commissioned build",
    title: "A clinic queue that runs on one Raspberry Pi",
    shortTitle: "Clinic queue system",
    summary:
      "A local-network queue for a walk-in clinic in Bagumbayan: touch kiosk ticketing, USB thermal receipts, admin call console, TV display, and offline voice announcements.",
    measuredResult:
      "5 clinic services, 3 live screens, 0 cloud dependencies on 1 Raspberry Pi.",
    stackList: [
      "Raspberry Pi",
      "FastAPI",
      "SQLite",
      "USB thermal printer",
      "Piper TTS",
      "systemd",
    ],
    hardwarePhotos: [
      {
        src: "/work/clinic-queue-tv.jpg",
        alt: "Clinic queue TV display mounted on a wall at Super Health Center showing General Check-up, Medical Certificate, and TB DOTS queues.",
        caption: "Deployed lobby TV display at the clinic — live queue status for three services, running on the Raspberry Pi.",
        width: 2048,
        height: 1536,
      },
    ],
    photo: {
      src: "/work/clinic-kiosk.jpg",
      width: 1600,
      height: 900,
      alt: "Clinic queue touch kiosk screen showing five services with waiting counts and active ticket numbers.",
      caption:
        "Running touch kiosk screen: five clinic services, live waiting counts, and current callout banner.",
    },
    caseStudy: {
      summary:
        "A walk-in clinic in Bagumbayan was tracking patients on paper across general check-ups, TB DOTS, medical certificates, and lab queues. I built and deployed a self-hosted queue server on a single Raspberry Pi that prints numbered slips, updates a lobby TV display, and announces tickets with offline text-to-speech when the internet drops.",
      role: "Sole developer and systems integrator (API, SQLite schema, three web UIs, ESC/POS printer bridge, offline TTS, systemd deployment)",
      timeframe: "Commissioned thesis build, 2026",
      teamSize: "1 engineer (hardware & software delivery)",
      constraints: [
        "Zero cloud dependency: clinic internet drops could not stall patient intake or TV updates.",
        "Single low-power host: kiosk, admin desk, TV browser, USB printer, and audio output all share one Raspberry Pi.",
        "Patient privacy: ticket numbers and service counters only; no patient names shown on the public lobby display.",
        "Automatic recovery: systemd service restart and daily ticket counter reset without staff SSH access.",
      ],
      diagram: {
        caption:
          "System architecture. Solid lines mark wired USB/HDMI/audio paths; dashed lines mark LAN HTTP polling; thick accent lines carry the primary ticket state path.",
        nodes: [
          {
            id: "kiosk",
            label: "Touch kiosk",
            sub: "Browser client",
            x: 24,
            y: 44,
            w: 150,
            h: 64,
          },
          {
            id: "admin",
            label: "Staff console",
            sub: "Browser client",
            x: 24,
            y: 156,
            w: 150,
            h: 64,
          },
          {
            id: "pi",
            label: "FastAPI + SQLite",
            sub: "Raspberry Pi (systemd)",
            x: 265,
            y: 100,
            w: 185,
            h: 68,
            accent: true,
          },
          {
            id: "printer",
            label: "Thermal printer",
            sub: "ESC/POS slip",
            x: 565,
            y: 26,
            w: 155,
            h: 60,
          },
          {
            id: "tv",
            label: "Lobby TV display",
            sub: "Live callout UI",
            x: 565,
            y: 104,
            w: 155,
            h: 60,
          },
          {
            id: "audio",
            label: "Piper / espeak",
            sub: "PA audio out",
            x: 565,
            y: 182,
            w: 155,
            h: 60,
          },
        ],
        edges: [
          { from: "kiosk", to: "pi", label: "HTTP POST", kind: "primary" },
          { from: "admin", to: "pi", label: "LAN HTTP", kind: "wireless" },
          { from: "pi", to: "printer", label: "USB", kind: "wired" },
          { from: "pi", to: "tv", label: "HDMI / HTTP", kind: "primary" },
          { from: "pi", to: "audio", label: "3.5mm / ALSA", kind: "wired" },
        ],
      },
      hardwareFirmware: [
        {
          heading: "Single-node Raspberry Pi host + systemd",
          detail:
            "Pinned FastAPI and SQLite on a single Raspberry Pi managed by systemd so power cycling the clinic breaker brings the queue API back online automatically.",
        },
        {
          heading: "USB ESC/POS printer with log fallback",
          detail:
            "Raw USB thermal receipt output formats a numbered ticket per service tap; if USB vendor/product IDs are absent during bench testing, the driver degrades cleanly to a structured log without crashing intake.",
        },
        {
          heading: "Offline Piper TTS + espeak fallback",
          detail:
            "Voice callouts render locally on the Pi using Piper neural voices with an automatic espeak fallback, eliminating any external TTS API calls.",
        },
      ],
      networkDesign: [
        {
          label: "Topology",
          value:
            "Local star LAN: Raspberry Pi acts as the sole HTTP/SQLite server; kiosk tablet, nurse admin station, and TV client connect on the clinic subnet.",
        },
        {
          label: "Protocols & storage",
          value:
            "REST JSON over HTTP on the local LAN, SQLite transactional rows with daily counter rollover, USB bulk transfer for thermal tickets.",
        },
        {
          label: "Failure handling",
          value:
            "Zero external DNS or cloud dependencies; if a client browser disconnects, SQLite retains queue state and clients resync on next poll.",
        },
      ],
      results: [
        {
          metric: "5 clinic services",
          detail:
            "General Check-up, Laboratory, Family Planning, Blood Service, and Ultrasound queued concurrently.",
        },
        {
          metric: "3 synchronized screens",
          detail:
            "Self-service kiosk, staff call console, and waiting-room TV stay consistent against one SQLite source.",
        },
        {
          metric: "0 cloud dependencies",
          detail:
            "Ticketing, printing, and voice announcements execute 100% inside the clinic's local network.",
        },
      ],
      nextChanges: [
        "Add a hardware bell chime relay wired to GPIO ahead of TTS announcements so the callout catches attention in a noisy waiting room.",
        "Serve kiosk and TV updates over Server-Sent Events (SSE) instead of periodic polling to cut idle LAN traffic.",
      ],
      demoNote:
        "Live kiosk, admin, and TV screens ported from source (sample browser queue).",
      demoHint:
        "Tap a service on Kiosk, call it from Admin, then inspect TV display.",
      demoScreens: [
        {
          label: "Kiosk",
          src: "/demos/clinic/kiosk.html",
          width: 1600,
          height: 900,
          title: "Clinic queue kiosk",
        },
        {
          label: "Admin console",
          src: "/demos/clinic/admin.html",
          width: 1600,
          height: 900,
          title: "Clinic queue admin console",
        },
        {
          label: "TV display",
          src: "/demos/clinic/display.html",
          width: 1600,
          height: 900,
          title: "Clinic queue TV display",
        },
      ],
    },
  },
  {
    id: "lab-tracking",
    rank: 2,
    year: "2026",
    kind: "Capstone project",
    title: "Lab equipment borrowing, tracked by barcode",
    shortTitle: "Lab barcode ledger",
    summary:
      "An ESP32-S3 scanning station wired to a 1D/2D barcode reader and MySQL transaction ledger, replacing handwritten equipment logs.",
    measuredResult:
      "2,913 catalogued items and 982 user accounts tracked as atomic SQL transactions.",
    stackList: [
      "ESP32-S3",
      "1D/2D barcode scanner",
      "UART",
      "MySQL",
      "Figma",
      "SketchUp",
    ],
    photo: {
      src: "/work/lab-borrowing-dashboard.jpg",
      width: 1600,
      height: 820,
      alt: "Lab equipment borrowing dashboard showing 2,913 total items, 2,902 available, 11 borrowed, 11 overdue, and 982 accounts.",
      caption:
        "Admin dashboard running against the live MySQL catalogue: 2,913 items, 982 accounts, nine equipment categories.",
    },
    caseStudy: {
      summary:
        "Laboratory equipment checkouts were previously written in paper logbooks, making overdue gear and missing apparatus slow to audit. I built the ESP32-S3 scanner station, MySQL transaction schema, operator UI, and 3D-printed enclosure so one barcode scan records a complete borrow or return.",
      role: "Firmware, sensor/scanner wiring, MySQL schema, UI/UX design, 3D enclosure modelling; shared integration and testing with capstone team",
      timeframe: "BS Computer Engineering capstone, 2025–2026",
      teamSize: "Capstone team (hardware, schema, and UI lead)",
      constraints: [
        "Auditability: every borrow and return must be a timestamped SQL transaction tied to a verified staff and borrower ID.",
        "Fast counter workflow: students queue between lab periods, so scanning staff, borrower, and equipment barcodes must complete in one session.",
        "Bench durability: exposed microcontroller jumper wires fail in shared labs, requiring a compact 3D-modelled enclosure.",
      ],
      diagram: {
        caption:
          "Capstone signal path. Solid lines mark wired serial/display connections; dashed lines mark Wi-Fi queries; thick accent lines show the transaction path.",
        nodes: [
          {
            id: "scanner",
            label: "1D/2D scanner",
            sub: "Item & ID barcodes",
            x: 24,
            y: 100,
            w: 150,
            h: 66,
          },
          {
            id: "esp",
            label: "ESP32-S3",
            sub: "Session & TFT UI",
            x: 245,
            y: 100,
            w: 165,
            h: 66,
            accent: true,
          },
          {
            id: "mysql",
            label: "MySQL ledger",
            sub: "Transactions & stock",
            x: 490,
            y: 44,
            w: 175,
            h: 64,
          },
          {
            id: "web",
            label: "Admin dashboard",
            sub: "2,913 items / 982 users",
            x: 490,
            y: 156,
            w: 175,
            h: 64,
          },
        ],
        edges: [
          { from: "scanner", to: "esp", label: "UART", kind: "primary" },
          { from: "esp", to: "mysql", label: "Wi-Fi / SQL", kind: "primary" },
          { from: "mysql", to: "web", label: "TCP Query", kind: "wired" },
          { from: "esp", to: "web", label: "Session sync", kind: "wireless" },
        ],
      },
      hardwareFirmware: [
        {
          heading: "ESP32-S3 + UART 1D/2D scanner",
          detail:
            "Reads commercial 1D and 2D barcode payloads over UART into a four-step terminal state machine: locked -> staff scan -> borrower scan -> item scan.",
        },
        {
          heading: "3D-modelled enclosure (SketchUp)",
          detail:
            "Designed a physical bench housing to protect the ESP32-S3, wiring harness, and TFT terminal screen from daily lab traffic.",
        },
        {
          heading: "Normalized MySQL transaction ledger",
          detail:
            "Separated inventory items, 9 categories, borrower accounts, and atomic borrow/return events so availability counts update immediately.",
        },
      ],
      networkDesign: [
        {
          label: "Topology",
          value:
            "ESP32-S3 scanner station connects over campus/lab Wi-Fi to the MySQL host and PHP/web administration dashboard.",
        },
        {
          label: "Session flow",
          value:
            "Hardware terminal requires sequential staff authorization before unlocking borrower and apparatus barcode commits.",
        },
        {
          label: "Data integrity",
          value:
            "Transactional SQL updates prevent double-borrowing an item already checked out.",
        },
      ],
      results: [
        {
          metric: "2,913 items indexed",
          detail:
            "Full lab inventory across 9 apparatus categories loaded into the live MySQL ledger.",
        },
        {
          metric: "982 user accounts",
          detail:
            "Student and faculty borrower records tied directly to barcode IDs.",
        },
        {
          metric: "4-step hardware scan",
          detail:
            "Staff auth, borrower scan, item scan, and commit without manual keyboard entry.",
        },
      ],
      nextChanges: [
        "Queue failed barcode transactions to onboard LittleFS flash when Wi-Fi drops and flush on reconnect.",
        "Move from direct SQL over LAN to an authenticated HTTPS/TLS REST endpoint between the ESP32-S3 and database host.",
      ],
      demoNote: "Live terminal and admin dashboard ported from source (sample data).",
      demoHint:
        "Tap the terminal screen to advance a borrow session, or switch to Dashboard. The sidebar opens Inventory, Kits, Users, Transactions, and Reports — all sample data.",
      demoScreens: [
        {
          label: "TFT terminal",
          src: "/demos/lab/terminal.html",
          width: 1000,
          height: 560,
          title: "Lab borrowing terminal",
        },
        {
          label: "Admin dashboard",
          src: "/demos/lab/dashboard.html",
          width: 1440,
          height: 900,
          title: "Lab borrowing dashboard",
        },
        {
          label: "Inventory",
          src: "/demos/lab/inventory.html",
          width: 1440,
          height: 900,
          title: "Lab inventory",
        },
        {
          label: "Transactions",
          src: "/demos/lab/transactions.html",
          width: 1440,
          height: 900,
          title: "Lab borrowing transactions",
        },
        {
          label: "Reports",
          src: "/demos/lab/reports.html",
          width: 1440,
          height: 900,
          title: "Lab borrowing reports",
        },
      ],
    },
  },
  {
    id: "robotics",
    rank: 3,
    year: "2025",
    kind: "Course & competition build",
    title: "A PID line follower and an autonomous sumobot",
    shortTitle: "PID line follower & sumobot",
    summary:
      "Two autonomous ESP32 robots: an 8-sensor PID line follower with flash-saved tuning and a 3S LiPo sumobot with 6 opponent sensors and edge avoidance, each hosting a Wi-Fi control page.",
    measuredResult:
      "8 reflectance channels, 6 opponent inputs, live PID tuning at 192.168.4.1 saved to NVS/LittleFS.",
    stackList: [
      "ESP32-S3",
      "ESP32-WROOM-32",
      "QTR-8RC",
      "TCRT5000",
      "TB6612FNG",
      "XY-160D",
      "3S LiPo",
    ],
    hardwarePhotos: [
      {
        src: "/work/sumobot-hardware.jpg",
        alt: "Autonomous sumobot on a competition ring, top-down view showing the robot with sensors and wiring on the black dohyō.",
        caption: "Sumobot on the competition ring — ESP32-WROOM-32, XY-160D H-bridge, 6 opponent sensors, and 2 TCRT5000 edge detectors.",
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/sumobot-3d-model.png",
        alt: "3D CAD model of the sumobot chassis designed in SketchUp showing the frame, motor mounts, and sensor slots.",
        caption: "SketchUp 3D model of the sumobot chassis — designed before fabrication to plan motor and sensor placement.",
        width: 797,
        height: 432,
      },
    ],
    photo: {
      src: "/work/line-follower-tuner.jpg",
      width: 1000,
      height: 1020,
      alt: "Wi-Fi PID tuner served by the line follower at 192.168.4.1 showing error graph, Kp/Ki/Kd fields, motor limits, and 8-sensor calibration values.",
      caption:
        "Live Wi-Fi tuning page served from the ESP32-S3 access point: PID gains, curve speed limits, and 8-channel calibration.",
    },
    caseStudy: {
      summary:
        "Re-flashing firmware over USB every time track lighting or wheel grip changes wastes practice runs. I built an ESP32-S3 PID line follower and an ESP32-WROOM-32 autonomous sumobot that both expose a local Wi-Fi access point for live calibration, gain tuning, and match-state selection stored in flash.",
      role: "Sole builder (firmware, sensor calibration, PID loop, motor-driver wiring, 3S LiPo power distribution, embedded web UI)",
      timeframe: "Course requirement & sumobot competition, 2025",
      teamSize: "1 engineer (line follower & sumobot)",
      constraints: [
        "Field tuning without a laptop USB tether: PID gains and calibration thresholds had to persist across power cycles in NVS/LittleFS.",
        "Varying surface contrast: adaptive thresholding needed to handle both black-on-white and white-on-black tracks.",
        "High-current motor spikes on 3S LiPo (12V): separate logic regulation and H-bridge protection for TB6612FNG and XY-160D drivers.",
      ],
      diagram: {
        caption:
          "Robot control path. Solid lines show GPIO, PWM, and 12V motor power; dashed line shows the Wi-Fi AP tuning interface.",
        nodes: [
          {
            id: "sensors",
            label: "QTR-8RC / TCRT5000",
            sub: "8 line / 2 edge / 6 opp",
            x: 24,
            y: 100,
            w: 165,
            h: 66,
          },
          {
            id: "mcu",
            label: "ESP32 MCU",
            sub: "PID + match FSM + NVS",
            x: 255,
            y: 100,
            w: 170,
            h: 66,
            accent: true,
          },
          {
            id: "hbridge",
            label: "TB6612FNG / XY-160D",
            sub: "Dual H-bridge (3S LiPo)",
            x: 495,
            y: 100,
            w: 180,
            h: 66,
          },
          {
            id: "ui",
            label: "Wi-Fi AP page",
            sub: "192.168.4.1 tuner",
            x: 255,
            y: 12,
            w: 170,
            h: 56,
          },
        ],
        edges: [
          { from: "sensors", to: "mcu", label: "GPIO / ADC", kind: "primary" },
          { from: "mcu", to: "hbridge", label: "PWM + Dir", kind: "primary" },
          { from: "mcu", to: "ui", label: "Wi-Fi AP", kind: "wireless" },
        ],
      },
      hardwareFirmware: [
        {
          heading: "ESP32-S3 + QTR-8RC + TB6612FNG (Line Follower)",
          detail:
            "Reads 8 reflectance channels with adaptive min/max calibration, computes clamped PID error with curve slowdown, and drives dual motors via TB6612FNG.",
        },
        {
          heading: "ESP32-WROOM-32 + XY-160D + 3S LiPo (Sumobot)",
          detail:
            "Pairs 6 opponent-detection inputs and 2 TCRT5000 ring-edge sensors in a deterministic state machine (opening move, search, engage, edge-avoid).",
        },
        {
          heading: "Persistent embedded web server",
          detail:
            "Serves HTML/JS straight from flash so Kp, Ki, Kd, speed clamps, and calibration tables save to LittleFS/NVS without recompiling C++.",
        },
      ],
      networkDesign: [
        {
          label: "Access point",
          value:
            "Robot hosts its own SoftAP (SSID LineFollower at 192.168.4.1) so any phone or laptop tunes it trackside with zero router.",
        },
        {
          label: "Control safety",
          value:
            "Web interface includes an emergency motor stop and stops Wi-Fi AP overhead cleanly during competition heat modes.",
        },
      ],
      results: [
        {
          metric: "8 reflectance channels",
          detail:
            "Calibrated per-sensor min/max thresholds persisted in flash.",
        },
        {
          metric: "6 opponent + 2 edge inputs",
          detail:
            "Full perimeter awareness on the sumobot ring under 3S LiPo drive.",
        },
        {
          metric: "0 USB reflashes trackside",
          detail:
            "Live Kp/Ki/Kd, curve slowdown, and match opening strategies update over Wi-Fi.",
        },
      ],
      nextChanges: [
        "Design a single custom KiCad carrier PCB replacing jumper headers with locked JST-XH sensor connectors.",
        "Log high-frequency PID error telemetry to a ring buffer downloadable as CSV after a run.",
      ],
      demoNote:
        "Live Wi-Fi AP pages served by the ESP32 robots, running in preview mode.",
      demoHint:
        "Adjust PID gains, apply a preset, or switch the sumobot match state.",
      demoScreens: [
        {
          label: "Line follower tuner",
          src: "/demos/robotics/tuner.html",
          width: 1600,
          height: 900,
          title: "Line follower PID tuner",
        },
        {
          label: "Sumobot control",
          src: "/demos/robotics/sumobot.html",
          width: 1600,
          height: 900,
          title: "Sumobot control page",
        },
      ],
    },
  },
  {
    id: "school-bell",
    rank: 4,
    year: "2025",
    kind: "School build",
    title: "A school bell that keeps its own schedule",
    shortTitle: "Scheduled school bell",
    summary:
      "An ESP32 controller, DFPlayer audio module, and amplifier driving campus horn speakers on MWF, TTh, and special event schedules.",
    measuredResult:
      "7 bell channels, MWF/TTh + date-range schedules, RTC + NTP time sync over local Wi-Fi.",
    stackList: [
      "ESP32",
      "DFPlayer",
      "RTC",
      "UART",
      "Audio amplifier",
      "Horn speakers",
    ],
    hardwarePhotos: [
      {
        src: "/work/school-bell-hardware.jpg",
        alt: "ESP32 school bell controller board on perfboard with RTC module, A7670E GSM module, buck converter, and SD card slot.",
        caption: "Hand-soldered perfboard: ESP32 + RTC + A7670E GSM + buck converter + SD card for schedule storage.",
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/school-bell-wiring.jpg",
        alt: "School bell controller inside its finished enclosure with DFPlayer module, circuit boards, and front-panel knobs visible.",
        caption: "Finished enclosure housing the ESP32 controller, DFPlayer audio module, and manual bell trigger knobs.",
        width: 2048,
        height: 1536,
      },
    ],
    photo: {
      src: "/work/school-bell-dashboard.jpg",
      width: 1600,
      height: 905,
      alt: "SKSU Public Address System dashboard showing 7 manual bell test buttons, output volume 25/30, MWF and TTh schedules, and event date-range scheduling.",
      caption:
        "Embedded browser dashboard served by the ESP32: 7 bell tracks, weekly MWF/TTh timetables, and event overrides.",
    },
    caseStudy: {
      summary:
        "Campus bells previously required manual switching at every period change, leading to late or missed rings. I wired and programmed an ESP32 controller paired with a DFPlayer audio module and power amplifier connected to the school's horn speakers, backed by a browser schedule dashboard.",
      role: "Hardware wiring, ESP32 firmware, DFPlayer UART integration, audio level testing, embedded web dashboard",
      timeframe: "School PA automation build, 2025",
      teamSize: "1 engineer",
      constraints: [
        "Schedule drift: bell accuracy must survive campus Wi-Fi outages via onboard RTC with manual time-set fallback.",
        "Distinct schedules: separate MWF, TTh, and date-bounded special event bell timetables.",
        "Campus PA compatibility: line-level audio from DFPlayer had to drive existing horn speaker amplification cleanly without clipping.",
      ],
      diagram: {
        caption:
          "Bell signal path. Solid lines indicate UART/audio wiring; dashed line indicates local Wi-Fi dashboard management.",
        nodes: [
          {
            id: "dash",
            label: "Web dashboard",
            sub: "MWF / TTh / Events",
            x: 24,
            y: 100,
            w: 155,
            h: 64,
          },
          {
            id: "esp",
            label: "ESP32 + RTC",
            sub: "Schedule & NTP sync",
            x: 245,
            y: 100,
            w: 165,
            h: 64,
            accent: true,
          },
          {
            id: "dfp",
            label: "DFPlayer + Amp",
            sub: "7 audio tracks (25/30)",
            x: 475,
            y: 100,
            w: 165,
            h: 64,
          },
          {
            id: "horns",
            label: "Horn speakers",
            sub: "Campus PA lines",
            x: 700,
            y: 100,
            w: 150,
            h: 64,
          },
        ],
        edges: [
          { from: "dash", to: "esp", label: "Wi-Fi HTTP", kind: "wireless" },
          { from: "esp", to: "dfp", label: "UART", kind: "primary" },
          { from: "dfp", to: "horns", label: "Speaker line", kind: "primary" },
        ],
      },
      hardwareFirmware: [
        {
          heading: "ESP32 + RTC + NTP synchronization",
          detail:
            "Tracks period schedules onboard using an I2C RTC with NTP resync when Wi-Fi is available and a manual timestamp override in the UI.",
        },
        {
          heading: "DFPlayer Mini over UART",
          detail:
            "Triggers 7 stored chime/bell tracks and exposes software volume control (0–30) directly from the dashboard.",
        },
      ],
      networkDesign: [
        {
          label: "Local control",
          value:
            "Admin staff update MWF, TTh, or special event date ranges on the device IP over the campus LAN.",
        },
        {
          label: "Offline resilience",
          value:
            "All timetables reside in flash; once saved, bells fire strictly from hardware RTC ticks without network dependency.",
        },
      ],
      results: [
        {
          metric: "7 manual & scheduled channels",
          detail:
            "Supports instant manual bell tests alongside automated period triggers.",
        },
        {
          metric: "3 timetable modes",
          detail:
            "MWF, TTh, and date-range Event Schedule overrides managed in one interface.",
        },
      ],
      nextChanges: [
        "Add a relay-switched amplifier mute output so the PA power amp sits idle between scheduled bells.",
        "Expose read-only JSON health telemetry (RTC drift, I2C error counter, last ring) for remote monitoring.",
      ],
      demoNote:
        "Live ESP32 school bell browser dashboard running with sample schedules.",
      demoHint:
        "Ring a manual bell channel or add a period time to the timetable.",
      demoScreens: [
        {
          label: "Bell dashboard",
          src: "/demos/bell/dashboard.html",
          width: 1600,
          height: 900,
          title: "School bell dashboard",
        },
      ],
    },
  },
];

export const alsoBuilt = [
  {
    title: "Classroom management UI",
    stack: "Figma (design), AI-assisted web & mobile build",
    detail:
      "Desktop and mobile front end for Tacurong National High School's senior high school: dashboard, QR attendance scanner, analytics, reports, and schedule on shared design tokens. UI/UX designed in Figma; code delivery was AI-assisted.",
    year: "2025",
  },
  {
    title: "Commissioned sensor prototypes",
    stack: "ESP32, Arduino, HC-SR04, Sharp GP2Y0A21YK0F, TCRT5000, DHT22",
    detail:
      "Multiple student thesis hardware builds covering sensor wiring, PCB soldering, firmware, and bench debugging.",
    year: "2024–2026",
  },
] as const;

export type SkillEntry = {
  name: string;
  mono?: boolean;
  href?: string;
};

export type SkillLayer = {
  layer: string;
  items: SkillEntry[];
  appliedIn: {
    label: string;
    href: string;
  };
};

export const kicadShowcase = {
  src: "/work/kicad-schematic.png",
  alt: "KiCad PCB layout showing an LM555 timer circuit with copper traces, component footprints, and mounting holes.",
  caption: "KiCad PCB layout — LM555-based circuit designed during coursework and OJT training.",
} as const;

export const skillLayers: SkillLayer[] = [
  {
    layer: "Hardware",
    items: [
      { name: "ESP32", mono: true, href: "/work/school-bell" },
      { name: "ESP32-S3", mono: true, href: "/work/lab-tracking" },
      { name: "ESP32-WROOM-32", mono: true, href: "/work/robotics" },
      { name: "Arduino" },
      { name: "QTR-8RC", mono: true, href: "/work/robotics" },
      { name: "TCRT5000", mono: true, href: "/work/robotics" },
      { name: "HC-SR04", mono: true },
      { name: "DHT22", mono: true },
      { name: "TB6612FNG", mono: true, href: "/work/robotics" },
      { name: "XY-160D", mono: true, href: "/work/robotics" },
      { name: "3S LiPo power" },
    ],
    appliedIn: { label: "Robotics & Lab station", href: "/work/robotics" },
  },
  {
    layer: "Firmware",
    items: [
      { name: "C++" },
      { name: "Arduino IDE" },
      { name: "PID control", href: "/work/robotics" },
      { name: "NVS / LittleFS", mono: true, href: "/work/robotics" },
      { name: "DFPlayer drivers", href: "/work/school-bell" },
      { name: "ESC/POS thermal printing", href: "/work/clinic-queue" },
    ],
    appliedIn: { label: "PID line follower", href: "/work/robotics" },
  },
  {
    layer: "Protocols",
    items: [
      { name: "UART", mono: true, href: "/work/lab-tracking" },
      { name: "I2C", mono: true, href: "/work/school-bell" },
      { name: "PWM", mono: true, href: "/work/robotics" },
      { name: "GPIO", mono: true, href: "/work/robotics" },
      { name: "HTTP", mono: true, href: "/work/clinic-queue" },
      { name: "Bluetooth HC-05 / HC-06", mono: true },
    ],
    appliedIn: { label: "Lab barcode ledger", href: "/work/lab-tracking" },
  },
  {
    layer: "Networking",
    items: [
      { name: "TCP/IP", mono: true, href: "/#experience" },
      { name: "LAN & static IP setup", href: "/#experience" },
      { name: "Wi-Fi SoftAP", href: "/work/robotics" },
      { name: "CCTV & IP cameras", href: "/#experience" },
      { name: "PA & horn speakers", href: "/#experience" },
      { name: "Telephony fault diagnosis", href: "/#experience" },
    ],
    appliedIn: { label: "Unicenter OJT", href: "/#experience" },
  },
  {
    layer: "Edge & software",
    items: [
      { name: "Raspberry Pi", href: "/work/clinic-queue" },
      { name: "FastAPI", mono: true, href: "/work/clinic-queue" },
      { name: "SQLite", mono: true, href: "/work/clinic-queue" },
      { name: "MySQL", mono: true, href: "/work/lab-tracking" },
      { name: "systemd", mono: true, href: "/work/clinic-queue" },
      { name: "Python (fundamentals)", mono: true },
      { name: "PHP (fundamentals)", mono: true },
      { name: "Offline TTS (Piper)" },
    ],
    appliedIn: { label: "Clinic queue system", href: "/work/clinic-queue" },
  },
  {
    layer: "Tools",
    items: [
      { name: "KiCad", href: "/#experience" },
      { name: "PCB soldering", href: "/#experience" },
      { name: "Circuit troubleshooting", href: "/#experience" },
      { name: "AutoCAD" },
      { name: "SketchUp", href: "/work/lab-tracking" },
      { name: "Figma" },
      { name: "Linux", mono: true },
      { name: "Git", mono: true },
    ],
    appliedIn: { label: "Lab enclosure & OJT", href: "/#experience" },
  },
];

export const experienceEntries = [
  {
    role: "On-the-job trainee",
    org: "Unicenter Communications",
    period: "June 2025",
    location: "Client sites across SOCCSKSARGEN",
    bullets: [
      "Installed and commissioned CCTV/IP cameras, ceiling and horn PA speakers, and telephone units on active client premises.",
      "Configured static IP settings on networked devices and isolated hardware, cabling, and firmware faults on live sites.",
      "Repaired boards via PCB soldering and produced circuit schematics in KiCad alongside site layout drawings in AutoCAD and SketchUp.",
    ],
  },
] as const;

export const certificationsAndEducation = [
  {
    title: "BS Computer Engineering",
    issuer: "Sultan Kudarat State University, Isulan Campus",
    date: "June 2026",
    note: "Dean's List, A.Y. 2024–2025",
  },
  {
    title: "TESDA NC II — Computer Systems Servicing",
    issuer: "Technical Education and Skills Development Authority",
    date: "Certified",
    note: "Hardware assembly, OS deployment, and LAN diagnostics",
  },
  {
    title: "Civil Service Examination — Professional",
    issuer: "Civil Service Commission",
    date: "March 2026",
    note: "Passer",
  },
] as const;

export const about = {
  paragraphs: [
    "I'm a computer engineering graduate from Sultan Kudarat State University who learned hardware by taking builds apart, wiring sensors on the bench, and debugging until the behaviour held up outside the lab.",
    "During my on-the-job training with Unicenter Communications, I installed CCTV, PA, and telephone systems on client premises—where I learned that a prototype only counts once it keeps running cleanly in the room it was built for.",
    "I'm looking for full-time IoT, embedded systems, or network infrastructure roles in Koronadal City, across SOCCSKSARGEN, or remote (GMT+8), where I can own hardware, firmware, and deployment end to end.",
  ],
  aiNote:
    "My core skills are hardware: circuits, soldering, 3D modelling, networking, and troubleshooting. The software and web interfaces in this portfolio were built with AI assistance — I designed, wired, and deployed the physical systems.",
  facts: [
    { label: "Location", value: "Tacurong City, Sultan Kudarat (GMT+8)" },
    { label: "Work preference", value: "On-site across SOCCSKSARGEN or remote" },
    { label: "Education", value: "BS Computer Engineering, SKSU (June 2026)" },
    { label: "Certification", value: "TESDA NC II, Computer Systems Servicing" },
  ],
} as const;
