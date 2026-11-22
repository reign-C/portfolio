import { site } from "@/lib/content";
import { ChipMark } from "@/components/marks";

const links = [
  { href: "#work", label: "Work", always: true },
  { href: "#experience", label: "Experience", always: true },
  { href: "#capabilities", label: "Capabilities", always: false },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        <a
          href="#top"
          className="-my-2 flex items-center gap-2 py-2 text-ink transition-colors hover:text-signal"
        >
          <ChipMark className="h-4 w-4" />
          <span className="label">{site.shortName}</span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-4 md:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`label -my-2 py-2 text-ink-soft transition-colors hover:text-ink ${
                link.always ? "" : "hidden sm:inline"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="label -my-2 hidden py-2 text-signal transition-colors hover:text-ink sm:inline"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
