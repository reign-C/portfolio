import { site } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6 md:px-12">
        <a
          href="/"
          className="text-[15px] font-semibold tracking-[-0.01em]"
        >
          {site.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-sm border border-line px-3 py-2 text-sm font-medium transition-colors duration-200 hover:border-text sm:inline-block"
          >
            Email
          </a>
          <a
            href={site.resume}
            download
            className="rounded-sm bg-text px-3 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
