"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Screen = {
  label: string;
  src: string;
  /** The viewport the screens were built for; they are scaled to fit. */
  width: number;
  height: number;
  title: string;
};

type Demo = {
  note: string;
  hint: string;
  screens: Screen[];
};

const demos: Record<string, Demo> = {
  "clinic-queue": {
    note: "The real kiosk, admin and TV screens from the project, running here with sample data.",
    hint: "Tap a service on the kiosk, call it from Admin, then watch the TV display.",
    screens: [
      { label: "Kiosk", src: "/demos/clinic/kiosk.html", width: 1600, height: 900, title: "Clinic queue kiosk" },
      { label: "Admin", src: "/demos/clinic/admin.html", width: 1600, height: 900, title: "Clinic queue admin console" },
      { label: "TV display", src: "/demos/clinic/display.html", width: 1600, height: 900, title: "Clinic queue TV display" },
    ],
  },
  "lab-tracking": {
    note: "The real terminal and admin dashboard from the project, running here with sample data.",
    hint: "Tap the terminal to scan through a session, or switch to the dashboard.",
    screens: [
      { label: "Terminal", src: "/demos/lab/terminal.html", width: 1000, height: 560, title: "Lab borrowing terminal" },
      { label: "Dashboard", src: "/demos/lab/dashboard.html", width: 1440, height: 900, title: "Lab borrowing dashboard" },
    ],
  },
  robotics: {
    note: "The real pages the robots serve over Wi-Fi, running here in preview mode.",
    hint: "Change a PID value, apply a preset, or switch the sumobot state.",
    screens: [
      { label: "Line follower", src: "/demos/robotics/tuner.html", width: 1600, height: 900, title: "Line follower PID tuner" },
      { label: "Sumobot", src: "/demos/robotics/sumobot.html", width: 1600, height: 900, title: "Sumobot control page" },
    ],
  },
  "school-bell": {
    note: "The real dashboard the ESP32 serves, running here with a sample schedule.",
    hint: "Press a bell to ring it, or add a time to the school schedule.",
    screens: [
      { label: "Dashboard", src: "/demos/bell/dashboard.html", width: 1600, height: 900, title: "School bell dashboard" },
    ],
  },
};

function ScreenFrame({ screen }: { screen: Screen }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const fit = () =>
      setScale(Math.max(element.clientWidth / screen.width, 0.55));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => observer.disconnect();
  }, [screen.width]);

  return (
    <div ref={box} className="w-full overflow-x-auto">
      <div
        className="relative"
        style={{ width: screen.width * scale, height: screen.height * scale }}
      >
        <iframe
          src={screen.src}
          title={screen.title}
          loading="lazy"
          className="absolute left-0 top-0 border-0 bg-white"
          style={{
            width: screen.width,
            height: screen.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}

export default function ProjectDemo({ slug }: { slug: string }) {
  const demo = demos[slug];
  const [tab, setTab] = useState(0);
  const [generation, setGeneration] = useState(0);

  const reset = useCallback(() => {
    if (slug === "clinic-queue") localStorage.removeItem("clinic-demo-queue");
    setGeneration((value) => value + 1);
  }, [slug]);

  if (!demo) return null;

  return (
    <section
      aria-labelledby="demo-title"
      className="on-dark overflow-hidden rounded-lg bg-stage text-stage-ink shadow-stage"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 md:px-6">
        <p id="demo-title" className="flex items-center gap-2 text-sm text-stage-ink/80">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-led" aria-hidden="true" />
          {demo.note}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={demo.screens[tab].src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm border border-stage-ink/25 px-3 text-sm font-medium transition-colors duration-200 hover:border-stage-ink"
          >
            Full screen
          </a>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center rounded-sm border border-stage-ink/25 px-3 text-sm font-medium transition-colors duration-200 hover:border-stage-ink"
          >
            Reset
          </button>
        </div>
      </div>

      {demo.screens.length > 1 ? (
        <div className="flex gap-1 border-y border-stage-ink/10 px-5 md:px-6" role="tablist" aria-label="Screens">
          {demo.screens.map((screen, index) => (
            <button
              key={screen.src}
              type="button"
              role="tab"
              aria-selected={index === tab}
              onClick={() => setTab(index)}
              className={`-mb-px min-h-11 border-b-2 px-3 text-sm transition-colors duration-200 ${
                index === tab
                  ? "border-led text-stage-ink"
                  : "border-transparent text-stage-ink/60 hover:text-stage-ink"
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>
      ) : null}

      <div key={`${tab}-${generation}`} className="bg-white">
        <ScreenFrame screen={demo.screens[tab]} />
      </div>

      <p className="border-t border-stage-ink/10 px-5 py-3 text-[13px] text-stage-ink/70 md:px-6">
        {demo.hint}
      </p>
    </section>
  );
}
