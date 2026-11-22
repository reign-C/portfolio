import { hero, heroChain, site } from "@/lib/content";
import { DownloadIcon, MailIcon } from "@/components/marks";
import { SignalChain } from "@/components/signal-chain";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-rule py-2.5">
          <p className="label text-ink-faint">Portfolio — {site.updated}</p>
          <p className="label text-ink-faint">{site.location}</p>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-20">
          <div className="md:col-span-5">
            <h1
              id="hero-title"
              className="display text-[clamp(3rem,7vw,5rem)]"
            >
              Reign Marc
              <br />
              Cipriano
            </h1>

            <p className="mt-6 max-w-[34ch] text-[1.375rem] font-medium leading-[1.25] tracking-[-0.015em]">
              {hero.deck}
            </p>

            <p className="measure mt-5 text-[0.9375rem] leading-[1.7] text-ink-soft">
              {hero.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-signal hover:bg-signal"
              >
                <MailIcon />
                Email me
              </a>
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <DownloadIcon />
                Résumé (PDF)
              </a>
            </div>

            <p className="mt-6 flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
              <span className="label text-ink-faint">{site.availability}</span>
            </p>
          </div>

          <div className="md:col-span-7">
            <figure className="plate">
              <div className="flex items-center justify-between gap-3 border-b border-ink px-3 py-2">
                <p className="label text-ink-faint">Signal path — lab tracking unit</p>
                <p className="label text-ink-faint">Rev. A</p>
              </div>

              <div className="grid-paper chain-frame px-4 py-8 md:px-6 md:py-10">
                <SignalChain
                  steps={heroChain}
                  label="Capstone signal path: scanner to ESP32-S3 to MySQL to interface"
                  pulse
                />
              </div>

              <figcaption className="border-t border-ink px-3 py-2 font-mono text-[12px] leading-relaxed text-ink-faint">
                <span className="measure block">BOM — {hero.bom}.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
