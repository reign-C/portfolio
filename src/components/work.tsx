import Image from "next/image";
import { alsoBuilt, projects } from "@/lib/content";
import { PlateZoom } from "@/components/plate-zoom";
import { SignalChain } from "@/components/signal-chain";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-anchor border-b border-rule"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-10 md:py-20">
        <div className="flex flex-col gap-3 border-b border-ink pb-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id="work-title"
            className="display text-[clamp(2rem,4.5vw,3rem)]"
          >
            Selected work
          </h2>
          <p className="max-w-[48ch] text-sm leading-relaxed text-ink-soft">
            Four projects that show the range an IoT and automation team needs:
            a connected device, an edge deployment, a pair of autonomous robots,
            and a scheduled control system.
          </p>
        </div>

        <ol id="work-index" className="mt-6 scroll-mt-6 border-t border-rule">
          {projects.map((project, index) => (
            <li key={project.id} className="border-b border-rule">
              <a
                href={`#project-${project.id}`}
                className="group flex items-baseline gap-4 py-3"
              >
                <span className="label w-6 shrink-0 text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-signal">
                  {project.title}
                </span>
                <span className="label hidden text-ink-faint md:inline">
                  {project.kind}
                </span>
                <span className="label shrink-0 text-ink-faint transition-colors group-hover:text-signal">
                  View
                </span>
              </a>
            </li>
          ))}
        </ol>

        {projects.map((project) => (
          <article
            key={project.id}
            id={`project-${project.id}`}
            className="grid scroll-mt-6 gap-5 border-b border-rule py-10 last:border-b-0 md:grid-cols-12 md:gap-8 md:py-14"
          >
            <div className="md:sticky md:top-6 md:col-span-3 md:self-start">
              <p className="label text-signal">{project.kind}</p>
              <p className="mt-3 max-w-[26ch] font-mono text-[12px] leading-[1.7] text-ink-faint">
                {project.stack}
              </p>
              {project.note ? (
                <p className="mt-5 max-w-[26ch] border-t border-rule pt-3 text-[12px] leading-[1.6] text-ink-faint">
                  {project.note}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-9">
              <h3 className="display text-[clamp(1.55rem,3.2vw,2.25rem)]">
                {project.title}
              </h3>
              <p className="measure mt-3 text-[1.0625rem] leading-[1.6] text-ink-soft">
                {project.summary}
              </p>

              {project.photo ? (
                <figure className="plate mt-7">
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: `${project.photo.width} / ${project.photo.height}`,
                    }}
                  >
                    <Image
                      src={project.photo.src}
                      alt={project.photo.alt}
                      fill
                      sizes="(min-width: 1180px) 817px, (min-width: 768px) 72vw, 100vw"
                      quality={90}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex items-start justify-between gap-3 border-t border-ink px-3 py-2 font-mono text-[12px] leading-relaxed text-ink-faint">
                    <span className="flex-1">
                      <span className="label mr-2 text-signal">Plate</span>
                      <span className="measure inline-block align-top">
                        {project.photo.caption}
                      </span>
                    </span>
                    <PlateZoom
                      src={project.photo.src}
                      alt={project.photo.alt}
                    />
                  </figcaption>
                </figure>
              ) : project.photoPending ? (
                <figure className="plate mt-7">
                  <div
                    className="grid-paper flex w-full flex-col items-center justify-center gap-2 px-6 py-8"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <span className="label text-signal">Plate pending</span>
                    <p className="max-w-[42ch] text-center font-mono text-[12px] leading-relaxed text-ink-faint">
                      {project.photoPending}
                    </p>
                  </div>
                </figure>
              ) : null}

              <dl className="spec mt-6">
                <div>
                  <dt>Problem</dt>
                  <dd>{project.facts.problem}</dd>
                </div>
                <div>
                  <dt>Built</dt>
                  <dd>{project.facts.built}</dd>
                </div>
                <div>
                  <dt>My part</dt>
                  <dd>{project.facts.role}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{project.facts.result}</dd>
                </div>
              </dl>

              <figure className="plate mt-8">
                <div className="grid-paper chain-frame px-4 py-6 md:px-6 md:py-8">
                  <SignalChain
                    steps={project.chain}
                    label={`${project.title}: signal path`}
                  />
                </div>
                <figcaption className="border-t border-ink px-3 py-2 font-mono text-[12px] leading-relaxed text-ink-faint">
                  <span className="measure block">{project.figure}</span>
                </figcaption>
              </figure>

              <a
                href="#work-index"
                className="label mt-8 inline-block text-ink-faint transition-colors hover:text-signal"
              >
                Back to index
              </a>
            </div>
          </article>
        ))}

        <div className="mt-10 grid gap-4 border-t border-ink pt-5 md:mt-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h3 className="label text-signal">Also built</h3>
          </div>
          <dl className="md:col-span-9">
            {alsoBuilt.map((item) => (
              <div
                key={item.title}
                className="border-b border-rule py-4 first:pt-0 last:border-b-0 last:pb-0"
              >
                <dt className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">
                  {item.title}
                </dt>
                <dd className="measure mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
