"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";

type Screen = {
  label: string;
  src: string;
  width: number;
  height: number;
  title: string;
};

function ScreenFrame({ screen }: { screen: Screen }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const fit = () => {
      const ratio = element.clientWidth / screen.width;
      const minScale = element.clientWidth >= 640 ? 0.45 : 0.55;
      setScale(Math.min(1, Math.max(ratio, minScale)));
    };
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
  const project = projects.find((item) => item.id === slug);
  const [tab, setTab] = useState(0);
  const [generation, setGeneration] = useState(0);

  const reset = useCallback(() => {
    if (slug === "clinic-queue") {
      try {
        localStorage.removeItem("clinic-demo-queue");
      } catch {
        // Ignore storage errors
      }
    }
    setGeneration((value) => value + 1);
  }, [slug]);

  if (!project || !project.caseStudy.demoScreens.length) return null;

  const { demoNote, demoHint, demoScreens } = project.caseStudy;
  const activeScreen = demoScreens[tab] ?? demoScreens[0];

  return (
    <div className="paper-card overflow-hidden rounded-[16px]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <p className="text-[14px] text-muted">{demoNote}</p>
        <div className="flex items-center gap-2">
          <a
            href={activeScreen.src}
            target="_blank"
            rel="noopener noreferrer"
            className="keycap-btn inline-flex min-h-10 items-center rounded-[10px] px-3 text-[13px] font-medium text-ink no-underline transition-all duration-150"
          >
            Open full screen
          </a>
          <button
            type="button"
            onClick={reset}
            className="keycap-btn inline-flex min-h-10 cursor-pointer items-center rounded-[10px] px-3 text-[13px] font-medium text-ink transition-all duration-150"
          >
            Reset demo
          </button>
        </div>
      </div>

      {demoScreens.length > 1 ? (
        <div
          className="flex flex-wrap gap-1 border-b border-line bg-bg/60 px-4 py-2 sm:px-5"
          role="tablist"
          aria-label="Interactive screens"
        >
          {demoScreens.map((screen, index) => (
            <button
              key={screen.src}
              type="button"
              role="tab"
              aria-selected={index === tab}
              onClick={() => setTab(index)}
              className={`min-h-10 cursor-pointer rounded-[8px] px-3 text-[14px] whitespace-nowrap transition-colors duration-150 ${
                index === tab
                  ? "bg-surface font-semibold text-ink shadow-xs"
                  : "font-medium text-muted hover:text-ink"
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>
      ) : null}

      <div key={`${tab}-${generation}`} className="bg-white">
        <ScreenFrame screen={activeScreen} />
      </div>

      <p className="border-t border-line px-4 py-3 text-[13px] text-muted sm:px-5">
        {demoHint}
      </p>
    </div>
  );
}
