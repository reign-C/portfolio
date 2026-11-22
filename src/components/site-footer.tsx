import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2 border-t border-paper/20 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="label text-paper/60">
          {site.name} · {site.updated}
        </p>
        <p className="label text-paper/60">
          Built with Next.js · Archivo and Martian Mono
        </p>
      </div>
    </footer>
  );
}
