import { credentials, experience } from "@/lib/content";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-anchor border-b border-rule"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2
              id="experience-title"
              className="display text-[clamp(2rem,4.5vw,3rem)]"
            >
              Site log
            </h2>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
              Where the hands-on work happened: client sites, installed
              systems, and the faults that followed.
            </p>
          </div>

          <div className="md:col-span-8">
            <article className="border-t border-ink pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">
                  {experience.org}
                </h3>
                <p className="label text-ink-faint">
                  {experience.role} · {experience.period}
                </p>
              </div>

              <ul className="measure mt-4 space-y-2.5">
                {experience.items.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[14px_1fr] gap-2 text-[0.9375rem] leading-relaxed text-ink-soft"
                  >
                    <span
                      className="mt-[0.65em] h-px w-2.5 bg-signal"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="mt-10 border-t border-ink pt-4">
              <h3 className="label text-ink-faint">
                Education and certification
              </h3>
              <dl className="mt-2">
                {credentials.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <dt className="text-[0.9375rem] font-semibold">
                      {item.title}
                    </dt>
                    <dd className="label text-ink-faint sm:text-right">
                      {item.meta}
                    </dd>
                    <dd className="text-sm text-ink-soft sm:col-span-2">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
