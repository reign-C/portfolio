import type { Metadata } from "next";
import Link from "next/link";
import { classroomPreview, site } from "@/lib/content";
import ProjectDemo from "@/components/project-demo";

export const metadata: Metadata = {
  title: `${classroomPreview.shortTitle} — ${site.name}`,
  description: classroomPreview.summary,
};

export default function ClassroomUiPage() {
  return (
    <article className="pb-16">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-[14px] font-medium text-ink underline decoration-muted transition-colors duration-150 hover:decoration-ink"
      >
        Back to home
      </Link>

      <header className="mt-6 border-b border-line pb-8">
        <p className="text-[13px] font-medium text-muted">
          {classroomPreview.kind} · {classroomPreview.year}
        </p>
        <h1 className="mt-2 text-[34px] leading-[1.08] font-semibold tracking-[-0.02em] text-ink sm:text-[42px]">
          {classroomPreview.title}
        </h1>
        <p className="mt-4 text-[17px] leading-[1.6] text-ink">
          {classroomPreview.summary}
        </p>
        <p className="mt-3 text-[14px] text-muted">
          Stack: {classroomPreview.stackList.join(", ")}
        </p>
      </header>

      <section aria-labelledby="meta-heading" className="border-b border-line py-8">
        <h2 id="meta-heading" className="text-[20px] font-semibold text-ink">
          Role and scope
        </h2>
        <dl className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-[13px] font-medium text-muted">My role</dt>
            <dd className="mt-1 text-[15px] leading-[1.5] text-ink">
              {classroomPreview.role}
            </dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-muted">Timeframe</dt>
            <dd className="mt-1 text-[15px] leading-[1.5] text-ink">
              {classroomPreview.timeframe}
            </dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-muted">Scope</dt>
            <dd className="mt-1 text-[15px] leading-[1.5] text-ink">
              {classroomPreview.scope}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="screens-heading" className="border-b border-line py-10">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="screens-heading" className="text-[24px] font-semibold text-ink">
            Interactive screens
          </h2>
          <span className="text-[13px] text-muted">
            Initials-only sample records · Built-in software QR scanner
          </span>
        </div>
        <ProjectDemo slug="classroom-ui" demo={classroomPreview} />
      </section>

      <section aria-labelledby="links-heading" className="py-10">
        <h2 id="links-heading" className="text-[24px] font-semibold text-ink">
          Artifacts
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {classroomPreview.demoScreens.map((screen) => (
            <a
              key={screen.src}
              href={screen.src}
              target="_blank"
              rel="noopener noreferrer"
              className="keycap-btn inline-flex min-h-11 items-center rounded-[12px] px-4 text-[14px] font-medium text-ink no-underline transition-all duration-150"
            >
              Open {screen.label}
            </a>
          ))}
          <a
            href={site.resume}
            download
            className="inline-flex min-h-11 items-center rounded-[12px] bg-accent px-4 text-[14px] font-medium text-accent-ink no-underline transition-opacity duration-150 hover:opacity-85"
          >
            Download resume
          </a>
        </div>
      </section>
    </article>
  );
}
