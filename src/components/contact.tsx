import { site } from "@/lib/content";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-text text-bg"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2
              id="contact-title"
              className="text-[30px] leading-[1.1] md:text-[40px]"
            >
              Contact
            </h2>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block break-all text-[22px] font-medium underline decoration-current/30 underline-offset-4 transition-colors duration-200 hover:decoration-led md:text-[32px]"
            >
              {site.email}
            </a>

            <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.65] opacity-80">
              {site.availability}. Open to work in Koronadal and across
              SOCCSKSARGEN.
            </p>

            <a
              href={site.resume}
              download
              className="mt-8 inline-block rounded-sm bg-bg px-4 py-2.5 text-sm font-medium text-text transition-opacity duration-200 hover:opacity-90"
            >
              Résumé
            </a>
          </div>

          <dl className="flex flex-col gap-5 text-sm md:col-span-5 md:justify-self-end">
            <div>
              <dt className="opacity-60">Based in</dt>
              <dd className="mt-1">{site.location}</dd>
            </div>
            <div>
              <dt className="opacity-60">Area open for work</dt>
              <dd className="mt-1">{site.region}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
