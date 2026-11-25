import { about } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-line py-12"
    >
      <h2
        id="about-heading"
        className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink"
      >
        About
      </h2>

      <div className="paper-card mt-6 rounded-[16px] p-6 sm:p-7">
        <div className="flex flex-col gap-4 text-[15.5px] leading-[1.65] text-ink">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
          {about.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[12.5px] font-medium text-muted">
                {fact.label}
              </dt>
              <dd className="mt-1 text-[14.5px] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
