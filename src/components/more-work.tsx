import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { alsoBuilt, projects } from "@/lib/content";

const SPOTLIGHT_IDS = new Set(["clinic-queue", "lab-tracking"]);

export function MoreWork() {
  const remaining = [...projects]
    .filter((p) => !SPOTLIGHT_IDS.has(p.id))
    .sort((a, b) => a.rank - b.rank);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-line py-12"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2
          id="projects-heading"
          className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink"
        >
          Hardware &amp; embedded builds
        </h2>
        <span className="text-[13px] text-muted tabular">
          {projects.length} documented case studies
        </span>
      </div>

      {/* Horizontal split-row cards to differentiate cadence from the 2-column flagship grid */}
      <div className="mt-6 flex flex-col gap-4">
        {remaining.map((project, index) => (
          <Link
            key={project.id}
            href={`/work/${project.id}`}
            className="paper-card group grid overflow-hidden rounded-[16px] no-underline transition-colors duration-150 hover:border-line-strong sm:grid-cols-[240px_1fr] sm:items-stretch"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface-subtle sm:aspect-auto sm:min-h-[168px] sm:border-r sm:border-b-0">
              <Image
                src={project.photo.src}
                alt={project.photo.alt}
                fill
                sizes="(min-width: 640px) 240px, 95vw"
                className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex flex-col justify-between p-5">
              <div>
                <p className="text-[12.5px] text-muted">
                  <span className="mono tabular">0{index + 3}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{project.kind}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{project.year}</span>
                </p>
                <h3 className="mt-1 text-[18px] leading-snug font-semibold text-ink">
                  {project.shortTitle}
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-muted">
                  {project.measuredResult}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-[13px]">
                <span className="truncate text-muted">
                  {project.stackList.slice(0, 4).join(" · ")}
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

      <div className="mt-10">
        <h3 className="text-[19px] leading-snug font-semibold text-ink">
          Other builds
        </h3>
        <div className="mt-3 border-b border-line">
          {alsoBuilt.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-t border-line py-4 sm:grid-cols-[1.2fr_2fr_auto] sm:items-baseline sm:gap-6"
            >
              <div>
                <p className="text-[15.5px] font-semibold text-ink">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[13px] text-muted">{item.stack}</p>
              </div>
              <p className="text-[14.5px] leading-[1.55] text-muted">
                {item.detail}
              </p>
              <span className="text-[13.5px] text-muted tabular sm:text-right">
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
