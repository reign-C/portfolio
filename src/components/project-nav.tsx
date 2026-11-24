import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";

export default function ProjectNav({ current }: { current: string }) {
  const ordered = [...projects].sort((a, b) => a.rank - b.rank);

  return (
    <section aria-labelledby="more-work" className="mt-16 border-t border-line pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="more-work" className="text-[20px] leading-snug tracking-[-0.01em]">
          More work
        </h2>
        <Link
          href="/#work"
          className="text-sm text-muted transition-colors duration-200 hover:text-text"
        >
          All projects
        </Link>
      </div>

      <ul className="snap-row -mx-6 mt-5 px-6 md:mx-0 md:px-0">
        {ordered.map((project) => {
          const isCurrent = project.id === current;
          return (
            <li key={project.id} className="snap-card w-[240px] md:w-[280px]">
              <Link
                href={`/work/${project.id}`}
                aria-current={isCurrent ? "page" : undefined}
                className="group block"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-md border bg-sunken transition-colors duration-200 ${
                    isCurrent
                      ? "border-led"
                      : "border-line group-hover:border-text"
                  }`}
                >
                  {project.photo ? (
                    <Image
                      src={project.photo.src}
                      alt=""
                      fill
                      sizes="280px"
                      quality={80}
                      className={`object-contain transition-opacity duration-200 ${
                        isCurrent ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                      }`}
                    />
                  ) : null}
                </div>
                <p className="mt-3 text-[15px] font-semibold leading-snug">
                  {project.title}
                </p>
                <p className="mt-0.5 text-[13px] text-subtle">
                  {isCurrent ? "You are here" : project.kind}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
