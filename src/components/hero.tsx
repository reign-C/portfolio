import Image from "next/image";
import { credentialFacts, hero, site } from "@/lib/content";

const at = (step: number) => ({ animationDelay: `${step * 60}ms` });

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1200px] px-6 pb-14 pt-12 md:px-12 md:pb-24 md:pt-20"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-span-7">
          <h1 className="text-[44px] leading-[1] tracking-[-0.03em] md:text-[72px]">
            <span className="rise block" style={at(0)}>
              Reign Marc
            </span>
            <span className="rise block" style={at(1)}>
              Cipriano
            </span>
          </h1>

          <p
            className="rise mt-5 text-[15px] font-medium text-muted"
            style={at(2)}
          >
            IoT and automation engineer
          </p>

          <p
            className="rise mt-4 max-w-[65ch] text-[18px] leading-[1.55] md:text-[20px]"
            style={at(3)}
          >
            {hero.deck}
          </p>

          <p
            className="rise mt-4 max-w-[65ch] text-[16px] leading-[1.65] text-muted md:text-[17px]"
            style={at(4)}
          >
            {hero.body}
          </p>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={at(5)}
          >
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center rounded-sm bg-text px-4 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
            >
              Email me
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex min-h-11 items-center rounded-sm border border-line px-4 text-sm font-medium transition-colors duration-200 hover:border-text"
            >
              Résumé
            </a>
          </div>

          <p
            className="rise mt-6 flex items-center gap-2 text-sm text-muted"
            style={at(6)}
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-led"
              aria-hidden="true"
            />
            {site.availability}
          </p>
        </div>

        <div className="md:col-span-5">
          <figure className="rise" style={at(7)}>
            <Image
              src="/portrait.jpg"
              alt="Reign Marc Cipriano"
              width={600}
              height={750}
              sizes="(min-width: 768px) 440px, 90vw"
              className="w-full rounded-lg object-cover shadow-card"
            />
            <figcaption className="mt-3 text-[13px] text-subtle">
              {site.name}, {site.location}
            </figcaption>
          </figure>
        </div>
      </div>

      <dl
        className="rise mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 md:mt-16 md:grid-cols-4"
        style={at(7)}
      >
        {credentialFacts.map((fact) => (
          <div key={fact.value}>
            <dt className="text-[17px] font-semibold leading-snug">
              {fact.value}
            </dt>
            <dd className="mt-1 text-sm leading-snug text-muted">
              {fact.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
