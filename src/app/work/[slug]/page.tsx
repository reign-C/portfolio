import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

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
  const previous = ordered[index - 1];
  const next = ordered[index + 1];

  return (
    <article className="mx-auto max-w-[1200px] px-6 pb-20 pt-10 md:px-12 md:pt-14">
      <Link
        href="/#work"
        className="text-sm text-muted transition-colors duration-200 hover:text-text"
      >
        Back to work
      </Link>

      <header className="mt-6 max-w-[65ch]">
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

      {project.photo ? (
        <figure className="mt-10 overflow-hidden rounded-md border border-line bg-surface shadow-card">
          <Image
            src={project.photo.src}
            alt={project.photo.alt}
            width={project.photo.width}
            height={project.photo.height}
            sizes="(min-width: 1200px) 1104px, 100vw"
            quality={90}
            className="h-auto w-full"
          />
        </figure>
      ) : null}

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

      <nav
        aria-label="Project navigation"
        className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between"
      >
        {previous ? (
          <Link
            href={`/work/${previous.id}`}
            className="max-w-[45ch] text-sm text-muted transition-colors duration-200 hover:text-text"
          >
            Previous: <span className="font-medium">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.id}`}
            className="max-w-[45ch] text-sm text-muted transition-colors duration-200 hover:text-text sm:text-right"
          >
            Next: <span className="font-medium">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
