import { certificationsAndEducation, experienceEntries } from "@/lib/content";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-line py-12"
    >
      <h2
        id="experience-heading"
        className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink"
      >
        Experience
      </h2>

      <div className="mt-6 border-b border-line">
        {experienceEntries.map((entry) => (
          <div
            key={`${entry.role}-${entry.org}`}
            className="grid gap-3 border-t border-line py-6 sm:grid-cols-[180px_1fr] sm:gap-6"
          >
            <div className="text-[14px] text-muted tabular">
              <p className="font-medium text-ink">{entry.period}</p>
              <p className="mt-0.5">{entry.location}</p>
            </div>
            <div>
              <h3 className="text-[18px] leading-snug font-semibold text-ink">
                {entry.role}, {entry.org}
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-[16px] leading-[1.55] text-muted">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div id="certifications" className="pt-12">
        <h3 className="text-[20px] leading-snug font-semibold text-ink">
          Certifications and education
        </h3>

        <div className="mt-4 border-b border-line">
          {certificationsAndEducation.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-t border-line py-4 sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="text-[14px] font-medium text-muted tabular">
                {item.date}
              </span>
              <div>
                <p className="text-[16px] font-semibold text-ink">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[14px] text-muted">{item.issuer}</p>
              </div>
              <span className="text-[14px] text-muted sm:text-right">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
