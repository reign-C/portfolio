import { credentials, experience } from "@/lib/content";

const entries = [
  {
    role: experience.role,
    org: experience.org,
    period: experience.period,
    bullets: experience.items,
  },
  ...credentials.map((item) => ({
    role: item.title,
    org: item.detail,
    period: item.meta,
    bullets: [] as readonly string[],
  })),
];

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24"
    >
      <h2
        id="experience-title"
        className="text-[30px] leading-[1.1] md:text-[40px]"
      >
        Experience
      </h2>

      <ol className="mt-8 flex flex-col gap-10 md:mt-12">
        {entries.map((entry) => (
          <li
            key={`${entry.role}-${entry.org}`}
            className="grid gap-2 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-8">
              <h3 className="text-[20px] leading-snug tracking-[-0.01em]">
                {entry.role}
              </h3>
              <p className="text-[16px] text-muted">{entry.org}</p>
            </div>
            <p className="text-sm text-subtle md:col-span-4 md:text-right">
              {entry.period}
            </p>

            {entry.bullets.length ? (
              <ul className="md:col-span-8 md:col-start-1 md:mt-1">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="mt-2 max-w-[65ch] text-[16px] leading-[1.65] text-muted md:text-[17px]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
