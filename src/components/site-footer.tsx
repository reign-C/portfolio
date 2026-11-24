import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p>{site.name}</p>
        <a
          href={`mailto:${site.email}`}
          className="transition-colors duration-200 hover:text-text"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
