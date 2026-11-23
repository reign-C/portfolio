import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2 border-t border-paper/20 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="label text-paper/60">{site.name}</p>
        <a
          href={`mailto:${site.email}`}
          className="label link-underline text-paper/60 hover:text-paper"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
