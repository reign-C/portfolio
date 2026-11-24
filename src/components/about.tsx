import Image from "next/image";
import { about, site } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Image
            src="/portrait.jpg"
            alt="Reign Marc Cipriano"
            width={600}
            height={750}
            sizes="(min-width: 768px) 420px, 90vw"
            className="w-full max-w-[420px] rounded-md object-cover"
          />
        </div>

        <div className="md:col-span-7">
          <h2
            id="about-title"
            className="text-[30px] leading-[1.1] md:text-[40px]"
          >
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
      </div>
    </section>
  );
}
