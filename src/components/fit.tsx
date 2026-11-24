import { team } from "@/lib/content";

export function Fit() {
  return (
    <section
      aria-labelledby="team-title"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24">
        <h2
          id="team-title"
          className="max-w-[24ch] text-[30px] leading-[1.1] md:text-[40px]"
        >
          What I can do on a team
        </h2>

        <div className="mt-8 grid gap-x-10 gap-y-8 md:mt-10 md:grid-cols-2">
          {team.map((item) => (
            <div key={item.lead}>
              <h3 className="text-[20px] leading-snug tracking-[-0.01em]">
                {item.lead}
              </h3>
              <p className="mt-2 max-w-[58ch] text-[16px] leading-[1.65] text-muted md:text-[17px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
