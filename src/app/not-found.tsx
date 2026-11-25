import Link from "next/link";
import { PacketRunner } from "@/components/packet-runner";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="py-6 sm:py-10"
    >
      <h1
        id="not-found-title"
        className="text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[40px]"
      >
        404: page not found
      </h1>

      <p className="mt-3 text-[16px] leading-[1.55] text-muted">
        This page doesn&apos;t exist or has moved.
      </p>

      {/* Navigation links sit above the game so focus order and hiring path stay unobstructed */}
      <nav aria-label="Recovery links" className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-[6px] bg-accent px-4 text-[15px] font-medium text-accent-ink no-underline transition-opacity duration-150 hover:opacity-90"
        >
          Home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center rounded-[6px] border border-line bg-surface px-4 text-[15px] font-medium text-ink no-underline transition-colors duration-150 hover:border-ink"
        >
          Projects
        </Link>
        <Link
          href="/#contact"
          className="inline-flex min-h-11 items-center rounded-[6px] border border-line bg-surface px-4 text-[15px] font-medium text-ink no-underline transition-colors duration-150 hover:border-ink"
        >
          Contact
        </Link>
      </nav>

      <div className="mt-8">
        <PacketRunner />
      </div>
    </section>
  );
}
