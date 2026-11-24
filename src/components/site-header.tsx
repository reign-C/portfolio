import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-[15px] font-semibold tracking-[-0.01em]"
        >
          {site.name}
        </Link>

        <NavLinks />

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            className="hidden min-h-11 items-center rounded-sm border border-line px-3 text-sm font-medium transition-colors duration-200 hover:border-text sm:inline-flex"
          >
            Email
          </a>
          <a
            href={site.resume}
            download
            className="inline-flex min-h-11 items-center rounded-sm bg-text px-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Résumé
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
