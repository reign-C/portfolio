import Link from "next/link";
import { projects } from "@/lib/content";

export default function ProjectNav({ current }: { current: string }) {
  const ordered = [...projects].sort((a, b) => a.rank - b.rank);

  return (
    <nav
      aria-label="More case studies"
      className="mt-14 border-t border-line pt-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-[20px] font-semibold text-ink">
          All case studies
        </h2>
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center text-[14px] font-medium text-ink underline decoration-muted transition-colors duration-150 hover:decoration-ink"
        >
          Back to projects
        </Link>
      </div>

      <div className="mt-4 border-b border-line">
        {ordered.map((project) => {
          const isCurrent = project.id === current;
          return (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              aria-current={isCurrent ? "page" : undefined}
              className="group grid gap-2 border-t border-line py-4 no-underline sm:grid-cols-[1.5fr_2fr_auto] sm:items-baseline sm:gap-6"
            >
              <span
                className={`text-[16px] font-semibold ${
                  isCurrent
                    ? "text-ink underline decoration-ink"
                    : "text-ink group-hover:underline group-focus-visible:underline"
                }`}
              >
                {project.shortTitle}
              </span>
              <span className="text-[14px] text-muted">
                {project.measuredResult}
              </span>
              <span className="text-[13px] text-muted tabular sm:text-right">
                {isCurrent ? "Current" : project.year}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
