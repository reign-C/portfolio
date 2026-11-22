import { fit } from "@/lib/content";

export function Fit() {
  return (
    <section
      id="fit"
      aria-labelledby="fit-title"
      className="border-b border-rule bg-paper-deep"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2
              id="fit-title"
              className="display text-[clamp(2rem,4.2vw,2.75rem)]"
            >
              What I&apos;d bring to an IoT and automation team
            </h2>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
              The parts of the job I can already do, with the work that
              proves it.
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:col-span-8">
            {fit.map((item, index) => (
              <li
                key={item.lead}
                className={`border-t border-ink pt-3 ${
                  index === fit.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <p className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">
                  {item.lead}
                </p>
                <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
