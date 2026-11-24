"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

type Props = { projects: Project[] };

export function WorkCarousel({ projects }: Props) {
  const ordered = [...projects].sort((a, b) => a.rank - b.rank);
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const focusCard = (index: number) => {
    const row = rowRef.current;
    const card = row?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
    setActive(index);
  };

  const step = (delta: number) =>
    focusCard(Math.min(ordered.length - 1, Math.max(0, active + delta)));

  return (
    <div>
      <div className="relative">
        <div
          ref={rowRef}
          className="snap-row -mx-6 px-6 md:mx-0 md:px-0"
          onScroll={(event) => {
            const row = event.currentTarget;
            const midpoint = row.scrollLeft + row.clientWidth / 2;
            let closest = 0;
            let best = Infinity;
            Array.from(row.children).forEach((child, index) => {
              const element = child as HTMLElement;
              const centre = element.offsetLeft + element.offsetWidth / 2;
              const distance = Math.abs(centre - midpoint);
              if (distance < best) {
                best = distance;
                closest = index;
              }
            });
            if (closest !== active) setActive(closest);
          }}
        >
          {ordered.map((project, index) => (
            <article
              key={project.id}
              className="snap-card w-[85vw] sm:w-[420px] md:w-[560px]"
              aria-current={index === active ? "true" : undefined}
            >
              <Link
                href={`/work/${project.id}`}
                className="group block rounded-md outline-offset-4"
              >
                <div className="overflow-hidden rounded-md border border-line bg-surface shadow-soft transition-shadow duration-300 group-hover:shadow-card">
                  <div className="relative aspect-[16/10] bg-sunken">
                    {project.photo ? (
                      <Image
                        src={project.photo.src}
                        alt={project.photo.alt}
                        fill
                        sizes="(min-width: 768px) 560px, 85vw"
                        quality={90}
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-sunken text-sm text-subtle">
                        Photograph pending
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-[24px] leading-tight tracking-[-0.01em]">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">
                      {project.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.stack
                        .split("·")
                        .slice(0, 3)
                        .map((chip) => (
                          <li
                            key={chip}
                            className="rounded-sm bg-sunken px-2 py-1 text-xs text-muted"
                          >
                            {chip.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ol className="flex flex-1 flex-col gap-1 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
          {ordered.map((project, index) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => focusCard(index)}
                className={`text-left transition-colors duration-200 hover:text-text ${
                  index === active ? "font-semibold text-text" : "text-muted"
                }`}
              >
                {project.title}
              </button>
            </li>
          ))}
        </ol>

        <div className="flex shrink-0 gap-2">
          {[-1, 1].map((delta) => (
            <button
              key={delta}
              type="button"
              onClick={() => step(delta)}
              aria-label={delta === -1 ? "Previous project" : "Next project"}
              className="grid h-11 w-11 place-items-center rounded-sm border border-line text-lg transition-colors duration-200 hover:border-text disabled:opacity-40"
              disabled={
                (delta === -1 && active === 0) ||
                (delta === 1 && active === ordered.length - 1)
              }
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {delta === -1 ? (
                  <path d="M15 5l-7 7 7 7" />
                ) : (
                  <path d="M9 5l7 7-7 7" />
                )}
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
