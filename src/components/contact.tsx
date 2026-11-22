import { site } from "@/lib/content";
import { DownloadIcon, MailIcon } from "@/components/marks";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-ink section-anchor bg-ink text-paper"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2
              id="contact-title"
              className="display text-[clamp(2.6rem,6vw,4.5rem)]"
            >
              Get in touch.
            </h2>

            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-paper/80">
              Open to full-time IoT, automation, and embedded roles in
              Koronadal and across SOCCSKSARGEN.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block break-all text-[clamp(1.05rem,2.6vw,1.5rem)] font-semibold underline decoration-paper/40 underline-offset-[0.22em] transition-[text-decoration-color] hover:decoration-paper"
            >
              {site.email}
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 border border-paper bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-signal hover:bg-signal hover:text-paper"
              >
                <MailIcon />
                Email me
              </a>
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 border border-paper/40 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <DownloadIcon />
                Résumé (PDF)
              </a>
            </div>
          </div>

          <div className="md:col-span-5 md:justify-self-end md:pt-2">
            <dl className="w-full space-y-5 border border-paper/25 p-5 md:max-w-[320px]">
              <div>
                <dt className="label text-paper/60">Based in</dt>
                <dd className="mt-1 text-sm">{site.location}</dd>
                <dd className="text-sm text-paper/70">{site.region}</dd>
              </div>
              <div>
                <dt className="label text-paper/60">Status</dt>
                <dd className="mt-1 flex items-center gap-2 text-sm">
                  <span
                    className="inline-block h-2 w-2 bg-paper"
                    aria-hidden="true"
                  />
                  Open to full-time roles
                </dd>
              </div>
              <div>
                <dt className="label text-paper/60">Résumé</dt>
                <dd className="mt-1 text-sm">
                  <a href={site.resume} download className="link-underline">
                    PDF download
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
