import { projects } from "@/lib/content";
import { WorkCarousel } from "@/components/work-carousel";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24"
    >
      <div className="max-w-[65ch]">
        <h2 id="work-title" className="text-[30px] leading-[1.1] md:text-[40px]">
          Work
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-muted md:text-[17px]">
          Four builds that show the range an IoT and automation team needs: a
          connected device, an edge deployment, a pair of autonomous robots, and
          a scheduled control system.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <WorkCarousel projects={projects} />
      </div>
    </section>
  );
}
