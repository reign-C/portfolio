import Image from "next/image";
import { about, site } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-anchor border-b border-rule"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <figure className="plate w-full max-w-[280px]">
              <Image
                src="/portrait.jpg"
                alt="Reign Marc Cipriano, photographed for his college ID"
                width={600}
                height={750}
                sizes="(min-width: 768px) 280px, 60vw"
                className="h-auto w-full"
                priority={false}
              />
              <figcaption className="border-t border-ink px-3 py-2 font-mono text-[12px] leading-relaxed text-ink-faint">
                <span className="measure block">
                  {site.name} — {site.location}
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-8">
            <h2
              id="about-title"
              className="display text-[clamp(2rem,4.5vw,3rem)]"
            >
              About
            </h2>

            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="measure mt-4 text-[0.9375rem] leading-[1.7] text-ink-soft"
              >
                {paragraph}
              </p>
            ))}

            <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-rule pt-5 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="label text-signal">{fact.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
