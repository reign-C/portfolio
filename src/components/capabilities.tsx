import { skillGroups } from "@/lib/content";

export function Capabilities() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24">
        <h2 id="skills-title" className="text-[30px] leading-[1.1] md:text-[40px]">
          Skills
        </h2>

        <dl className="mt-8 flex max-w-[75ch] flex-col gap-7 md:mt-10">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <dt className="text-[17px] font-semibold">{group.title}</dt>
              <dd className="mt-1 text-[16px] leading-[1.65] text-muted md:text-[17px]">
                {group.items}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
