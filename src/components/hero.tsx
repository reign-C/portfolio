import Image from "next/image";
import { credentialFacts, hero, site } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1200px] px-6 pb-14 pt-12 md:px-12 md:pb-24 md:pt-20"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-span-7">
          <h1 className="text-[44px] leading-[1] tracking-[-0.03em] md:text-[72px]">
            Reign Marc
            <br />
            Cipriano
          </h1>

          <p className="mt-5 text-[15px] font-medium text-muted">
            IoT and automation engineer
          </p>

          <p className="mt-4 max-w-[65ch] text-[18px] leading-[1.55] md:text-[20px]">
            {hero.deck}
          </p>

          <p className="mt-4 max-w-[65ch] text-[16px] leading-[1.65] text-muted md:text-[17px]">
            {hero.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm bg-text px-4 py-2.5 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
            >
              Email me
            </a>
            <a
              href={site.resume}
              download
              className="rounded-sm border border-line px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-text"
            >
              Résumé
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span
              className="inline-block h-2 w-2 rounded-full bg-led"
              aria-hidden="true"
            />
            {site.availability}
          </p>
        </div>

        <div className="md:col-span-5">
          <figure>
            <Image
              src="/portrait.jpg"
              alt="Reign Marc Cipriano"
              width={600}
              height={750}
              sizes="(min-width: 768px) 420px, 90vw"
              className="w-full rounded-lg object-cover shadow-card"
            />
            <figcaption className="mt-3 text-[13px] text-subtle">
              {site.name}, {site.location}
            </figcaption>
          </figure>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 md:mt-16 md:grid-cols-4">
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
