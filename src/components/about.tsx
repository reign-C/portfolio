import { about } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24"
    >
      <div className="max-w-[75ch]">
        <h2 id="about-title" className="text-[30px] leading-[1.1] md:text-[40px]">
          About
        </h2>

        {about.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 max-w-[65ch] text-[16px] leading-[1.65] text-muted md:text-[17px]"
          >
            {paragraph}
          </p>
        ))}

        <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {about.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm font-medium">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
