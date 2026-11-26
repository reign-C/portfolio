import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import ProjectDemo from "@/components/project-demo";
import ProjectNav from "@/components/project-nav";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: site.title };

  return {
    title: `${project.shortTitle} — ${site.name}`,
    description: project.measuredResult,
    openGraph: {
      title: `${project.shortTitle} — ${site.name}`,
      description: project.measuredResult,
      images: [
        {
          url: project.photo.src,
          width: project.photo.width,
          height: project.photo.height,
          alt: project.photo.alt,
        },
      ],
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="py-12 text-sm text-muted">Loading case study...</div>}>
      <ProjectCaseStudy params={params} />
    </Suspense>
  );
}

async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <article className="pb-16">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-[14px] font-medium text-ink underline decoration-muted transition-colors duration-150 hover:decoration-ink"
      >
        Back to home
      </Link>

      {/* 1. Summary */}
      <header className="mt-6 border-b border-line pb-8">
        <h1 className="text-[34px] leading-[1.08] font-semibold tracking-[-0.02em] text-ink sm:text-[42px]">
          {project.title}
        </h1>
        <p className="mt-4 text-[17px] leading-[1.6] text-ink">{cs.summary}</p>
        <p className="mt-3 text-[14px] text-muted">
          Stack: {project.stackList.join(", ")}
        </p>
      </header>

      {/* 2. Role, timeframe, team size */}
      <section aria-labelledby="meta-heading" className="border-b border-line py-8">
        <h2 id="meta-heading" className="text-[20px] font-semibold text-ink">
          Role and context
        </h2>
        <dl className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-[13px] font-medium text-muted">My role</dt>
            <dd className="mt-1 text-[15px] leading-[1.5] text-ink">{cs.role}</dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-muted">Timeframe</dt>
            <dd className="mt-1 text-[15px] leading-[1.5] text-ink">
              {cs.timeframe}
            </dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-muted">Team size</dt>
            <dd className="mt-1 text-[15px] leading-[1.5] text-ink">
              {cs.teamSize}
            </dd>
          </div>
        </dl>
      </section>

      {/* Artifact plate */}
      <figure className="paper-card mt-8 overflow-hidden rounded-[16px]">
        <Image
          src={project.photo.src}
          alt={project.photo.alt}
          width={project.photo.width}
          height={project.photo.height}
          priority
          sizes="(min-width: 1100px) 760px, 95vw"
          className="block h-auto w-full"
        />
        <figcaption className="border-t border-line px-4 py-3 text-[13px] text-muted">
          {project.photo.caption}
        </figcaption>
      </figure>

      {/* Hardware photos gallery */}
      {project.hardwarePhotos && project.hardwarePhotos.length > 0 && (
        <section aria-labelledby="hardware-photos-heading" className="mt-8">
          <h2
            id="hardware-photos-heading"
            className="text-[20px] font-semibold text-ink"
          >
            Hardware
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.hardwarePhotos.map((photo) => (
              <figure
                key={photo.src}
                className="paper-card overflow-hidden rounded-[14px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 640px) 380px, 95vw"
                  className="block h-auto w-full"
                />
                <figcaption className="border-t border-line px-4 py-3 text-[13px] text-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 3. Constraints */}
      <section aria-labelledby="constraints-heading" className="border-b border-line py-10">
        <h2
          id="constraints-heading"
          className="text-[24px] font-semibold text-ink"
        >
          Constraints
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-[16px] leading-[1.6] text-ink">
          {cs.constraints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 4. System architecture (inline SVG in ink + accent) */}
      <section aria-labelledby="arch-heading" className="border-b border-line py-10">
        <h2 id="arch-heading" className="text-[24px] font-semibold text-ink">
          System architecture
        </h2>
        <div className="mt-5">
          <ArchitectureDiagram
            nodes={cs.diagram.nodes}
            edges={cs.diagram.edges}
            caption={cs.diagram.caption}
            title={project.shortTitle}
          />
        </div>
      </section>

      {/* 5. Hardware and firmware choices */}
      <section aria-labelledby="hw-heading" className="border-b border-line py-10">
        <h2 id="hw-heading" className="text-[24px] font-semibold text-ink">
          Hardware and firmware choices
        </h2>
        <div className="mt-5 flex flex-col gap-6">
          {cs.hardwareFirmware.map((item) => (
            <div key={item.heading}>
              <h3 className="text-[17px] font-semibold text-ink">
                {item.heading}
              </h3>
              <p className="mt-1.5 text-[16px] leading-[1.6] text-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Network design */}
      <section aria-labelledby="net-heading" className="border-b border-line py-10">
        <h2 id="net-heading" className="text-[24px] font-semibold text-ink">
          Network design
        </h2>
        <dl className="mt-5 flex flex-col gap-5">
          {cs.networkDesign.map((item) => (
            <div
              key={item.label}
              className="grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-6"
            >
              <dt className="text-[15px] font-semibold text-ink">
                {item.label}
              </dt>
              <dd className="text-[16px] leading-[1.6] text-muted">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 7. Measured results + interactive screens */}
      <section aria-labelledby="results-heading" className="border-b border-line py-10">
        <h2
          id="results-heading"
          className="text-[24px] font-semibold text-ink"
        >
          Measured results
        </h2>

        <div className="mt-5 border-b border-line">
          {cs.results.map((r) => (
            <div
              key={r.metric}
              className="grid gap-1 border-t border-line py-4 sm:grid-cols-[240px_1fr] sm:items-baseline sm:gap-6"
            >
              <span className="text-[16px] font-semibold text-ink tabular">
                {r.metric}
              </span>
              <span className="text-[15px] leading-[1.55] text-muted">
                {r.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-[18px] font-semibold text-ink">
            Interactive screens
          </h3>
          <ProjectDemo slug={project.id} />
        </div>
      </section>

      {/* 8. What I'd change next */}
      <section aria-labelledby="next-heading" className="border-b border-line py-10">
        <h2 id="next-heading" className="text-[24px] font-semibold text-ink">
          What I&apos;d change next
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-[16px] leading-[1.6] text-muted">
          {cs.nextChanges.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 9. Links & artifacts */}
      <section aria-labelledby="links-heading" className="py-10">
        <h2 id="links-heading" className="text-[24px] font-semibold text-ink">
          Artifacts
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {cs.demoScreens.map((screen) => (
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

      <ProjectNav current={project.id} />
    </article>
  );
}
