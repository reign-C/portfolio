import { capabilities } from "@/lib/content";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="section-anchor border-b border-rule"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-10 md:py-20">
        <div className="flex flex-col gap-3 border-b border-ink pb-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id="capabilities-title"
            className="display text-[clamp(2rem,4.5vw,3rem)]"
          >
            Bench inventory
          </h2>
          <p className="max-w-[46ch] text-sm leading-relaxed text-ink-soft">
            The parts, tools, and software behind the work above, from
            bench builds to client-site installs.
          </p>
        </div>

        <dl>
          {capabilities.map((row) => (
            <div
              key={row.area}
              className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[180px_1fr] sm:gap-8"
            >
              <dt className="label text-signal">{row.area}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-ink-soft">
                {row.items}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
