import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import ProjectDemo from "@/components/project-demo";
import ProjectNav from "@/components/project-nav";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ordered = [...projects].sort((a, b) => a.rank - b.rank);
  const index = ordered.findIndex((project) => project.id === slug);
  if (index === -1) notFound();

  const project = ordered[index];

  return (
    <article className="mx-auto max-w-[1200px] px-6 pb-20 pt-8 md:px-12 md:pt-10">
      <Link
        href="/#work"
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line px-3 text-sm font-medium transition-colors duration-200 hover:border-text"
      >
        <span aria-hidden="true">←</span>
        Back to portfolio
      </Link>

      <header className="mt-8 max-w-[65ch]">
        <h1 className="text-[32px] leading-[1.1] tracking-[-0.02em] md:text-[48px]">
          {project.title}
        </h1>
        <p className="mt-4 text-[18px] leading-[1.55] text-muted md:text-[20px]">
          {project.summary}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-subtle">Context</dt>
            <dd className="mt-0.5 font-medium">{project.kind}</dd>
          </div>
          <div>
            <dt className="text-subtle">Stack</dt>
            <dd className="mt-0.5 font-medium">{project.stack}</dd>
          </div>
        </dl>
      </header>

      <div className="mt-10 md:mt-14">
        <ProjectDemo slug={project.id} />
      </div>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <h2 className="text-[24px] leading-snug">What it solved</h2>
          <p className="mt-3 max-w-[65ch] text-[17px] leading-[1.65] text-muted">
            {project.facts.problem}
          </p>

          <h2 className="mt-8 text-[24px] leading-snug">What I built</h2>
          <p className="mt-3 max-w-[65ch] text-[17px] leading-[1.65] text-muted">
            {project.facts.built}
          </p>
        </div>

        <dl className="flex flex-col gap-6 md:col-span-4">
          <div>
            <dt className="text-sm text-subtle">My part</dt>
            <dd className="mt-1 text-[16px] leading-[1.6]">
              {project.facts.role}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-subtle">Result</dt>
            <dd className="mt-1 text-[16px] leading-[1.6]">
              {project.facts.result}
            </dd>
          </div>
        </dl>
      </div>

      <ProjectNav current={project.id} />
    </article>
  );
}
