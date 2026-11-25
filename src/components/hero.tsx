"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, GitBranch } from "lucide-react";
import { projects, site } from "@/lib/content";
import { DitherHorizon } from "@/components/dither-horizon";

const SPOTLIGHT_IDS = ["clinic-queue", "lab-tracking"] as const;

const FOCUS_DISCIPLINES = [
  {
    title: "Embedded & Firmware",
    detail: "ESP32-S3, C++, PID control, UART & I2C drivers",
    href: "/work/lab-tracking",
  },
  {
    title: "Local Edge Systems",
    detail: "Raspberry Pi, FastAPI, SQLite, thermal print & TTS",
    href: "/work/clinic-queue",
  },
  {
    title: "Field & Networking",
    detail: "Static IP LANs, IP CCTV, PA audio & PCB repair",
    href: "/#experience",
  },
] as const;

export function Hero() {
  const crtRef = useRef<HTMLDivElement>(null);
  const [crtPaused, setCrtPaused] = useState(false);

  useEffect(() => {
    const el = crtRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCrtPaused(!entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const spotlights = SPOTLIGHT_IDS.map((id) =>
    projects.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="hero-enter pb-10 min-[900px]:pb-12"
    >
      {/* Hidden inline SVG filters for CRT RGB chromatic aberration + glitch burst split */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      >
        <defs>
          <filter
            id="crt-rgb"
            x="-4%"
            y="-4%"
            width="108%"
            height="108%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="r"
            />
            <feOffset in="r" dx="-1.8" dy="-0.25" result="rShift" />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="g"
            />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="b"
            />
            <feOffset in="b" dx="1.8" dy="0.25" result="bShift" />
            <feBlend in="rShift" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bShift" mode="screen" />
          </filter>

          <filter
            id="crt-rgb-glitch"
            x="-8%"
            y="-4%"
            width="116%"
            height="108%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="r"
            />
            <feOffset in="r" dx="-4.5" dy="0" result="rShift" />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="g"
            />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="b"
            />
            <feOffset in="b" dx="4.5" dy="0" result="bShift" />
            <feBlend in="rShift" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bShift" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Asymmetric monograph split: editorial positioning left, full-color CRT specimen on 1-bit dither field right */}
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-muted">
            {site.location} · Available {site.availableDate}
          </p>

          <h1
            id="hero-name"
            className="mt-2 text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-ink sm:text-[42px]"
          >
            {site.name}
          </h1>

          <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-muted">
            {site.roleSentence.replace(/^Computer engineer\.\s*/i, "")}{" "}
            {site.proofSentence}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#featured"
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[12px] bg-accent px-5 text-[14.5px] font-medium text-accent-ink no-underline transition-opacity duration-150 hover:opacity-85"
            >
              <span>Explore systems</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <a
              href={site.resume}
              download
              className="keycap-btn inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[12px] px-4 text-[14.5px] font-medium text-ink no-underline transition-all duration-150 active:translate-y-[0.5px]"
            >
              <FileText className="h-4 w-4 text-muted" aria-hidden="true" />
              <span>Resume PDF</span>
            </a>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-2 text-[14px] font-medium text-muted no-underline transition-colors duration-150 hover:text-ink"
            >
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              <span>github.com/{site.githubHandle}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative self-start sm:self-center">
          <DitherHorizon />
          <div
            ref={crtRef}
            data-paused={crtPaused ? "true" : "false"}
            className="crt-screen"
          >
            <Image
              src="/assets/aistudio/Gemini_Generated_Image_592kxt592kxt592k_c47a8f5b.jpg"
              alt={site.name}
              fill
              priority
              sizes="(min-width: 640px) 188px, 156px"
              referrerPolicy="no-referrer"
              className="crt-photo object-cover object-top"
            />
            <Image
              src="/assets/aistudio/Gemini_Generated_Image_592kxt592kxt592k_c47a8f5b.jpg"
              alt=""
              fill
              aria-hidden="true"
              sizes="(min-width: 640px) 188px, 156px"
              referrerPolicy="no-referrer"
              className="crt-glitch-slice crt-glitch-slice-a object-cover object-top"
            />
            <Image
              src="/assets/aistudio/Gemini_Generated_Image_592kxt592kxt592k_c47a8f5b.jpg"
              alt=""
              fill
              aria-hidden="true"
              sizes="(min-width: 640px) 188px, 156px"
              referrerPolicy="no-referrer"
              className="crt-glitch-slice crt-glitch-slice-b object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Tactile 3-column engineering discipline bar (crisp straight dividers, zero duplicate stat clutter) */}
      <div className="paper-card mt-8 grid grid-cols-1 divide-y divide-line overflow-hidden rounded-[14px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FOCUS_DISCIPLINES.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col justify-between gap-1 px-5 py-4 no-underline transition-colors duration-150 hover:bg-surface-subtle/55"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold text-ink">
                {item.title}
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                aria-hidden="true"
              />
            </div>
            <span className="text-[13px] leading-[1.45] text-muted">
              {item.detail}
            </span>
          </Link>
        ))}
      </div>

      {/* Side-by-side 2-column flagship systems showcase (full-color media over tactile paper) */}
      <div id="featured" className="mt-10 scroll-mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[18px] font-semibold tracking-[-0.015em] text-ink">
            Flagship deployments
          </h2>
          <span className="text-[13px] text-muted">
            Production clinic &amp; campus hardware
          </span>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {spotlights.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="paper-card group flex flex-col overflow-hidden rounded-[16px] no-underline transition-colors duration-150 hover:border-line-strong"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface-subtle">
                <Image
                  src={project.photo.src}
                  alt={project.photo.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 640px) 380px, 95vw"
                  className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <p className="text-[12.5px] text-muted">
                    <span className="mono tabular">0{index + 1}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{project.kind}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{project.year}</span>
                  </p>
                  <h3 className="mt-1.5 text-[18.5px] leading-[1.25] font-semibold tracking-[-0.015em] text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-muted">
                    {project.measuredResult}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-3.5 text-[13.5px]">
                  <span className="truncate text-muted">
                    {project.stackList.slice(0, 3).join(" · ")}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-medium text-ink">
                    <span>Case study</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
