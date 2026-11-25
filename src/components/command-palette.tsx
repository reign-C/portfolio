"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { projects, site } from "@/lib/content";
import { toggleTheme } from "@/components/theme-toggle";

type PaletteAction = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const actions = useMemo<PaletteAction[]>(() => {
    const go = (href: string) => {
      onClose();
      router.push(href);
    };

    return [
      { id: "home", label: "Home", hint: "Section", run: () => go("/") },
      {
        id: "projects",
        label: "Projects",
        hint: "Section",
        run: () => go("/#projects"),
      },
      {
        id: "experience",
        label: "Experience",
        hint: "Section",
        run: () => go("/#experience"),
      },
      {
        id: "skills",
        label: "Skills",
        hint: "Section",
        run: () => go("/#skills"),
      },
      {
        id: "about",
        label: "About",
        hint: "Section",
        run: () => go("/#about"),
      },
      {
        id: "contact",
        label: "Contact",
        hint: "Section",
        run: () => go("/#contact"),
      },
      ...[...projects]
        .sort((a, b) => a.rank - b.rank)
        .map((project) => ({
          id: `project-${project.id}`,
          label: project.shortTitle,
          hint: "Case study",
          run: () => go(`/work/${project.id}`),
        })),
      {
        id: "github",
        label: `Open GitHub (${site.githubHandle})`,
        hint: "External",
        run: () => {
          onClose();
          const a = document.createElement("a");
          a.href = site.github;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.click();
        },
      },
      {
        id: "resume",
        label: "Download resume (PDF)",
        hint: "File",
        run: () => {
          onClose();
          const a = document.createElement("a");
          a.href = site.resume;
          a.download = "";
          a.click();
        },
      },
      {
        id: "copy-email",
        label: `Copy email (${site.email})`,
        hint: "Action",
        run: () => {
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(site.email).catch(() => {});
          }
          setCopiedNotice(true);
          setTimeout(() => {
            setCopiedNotice(false);
            onClose();
          }, 600);
        },
      },
      {
        id: "toggle-theme",
        label: "Toggle light / dark theme",
        hint: "Appearance",
        run: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: "packet-runner",
        label: "Play Packet Runner",
        hint: "404 page",
        run: () => go("/packet-runner"),
      },
    ];
  }, [onClose, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const boundedIndex = filtered.length
    ? Math.min(activeIndex, filtered.length - 1)
    : 0;

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length ? (prev + 1) % filtered.length : 0,
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length
            ? (prev - 1 + filtered.length) % filtered.length
            : 0,
        );
        return;
      }

      if (e.key === "Enter" && filtered[boundedIndex]) {
        e.preventDefault();
        filtered[boundedIndex].run();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'input, button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [boundedIndex, filtered, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="paper-card w-full max-w-[520px] overflow-hidden rounded-[16px] text-ink"
      >
        <div className="flex items-center border-b border-line px-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Jump to a page, project, or action..."
            aria-label="Filter pages and actions"
            className="h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-muted hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          role="listbox"
          aria-label="Commands"
          className="max-h-[340px] overflow-y-auto p-2"
        >
          {copiedNotice ? (
            <p className="px-3 py-3 text-sm font-medium text-ink" aria-live="polite">
              Email address copied to clipboard.
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted">
              No matching pages or actions.
            </p>
          ) : (
            filtered.map((item, idx) => {
              const selected = idx === boundedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={item.run}
                  className={`flex min-h-11 w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[14.5px] transition-colors duration-100 ${
                    selected
                      ? "bg-surface-subtle font-semibold text-ink"
                      : "text-ink hover:bg-surface-subtle/50"
                  }`}
                >
                  <span className="truncate font-medium">{item.label}</span>
                  <span className="ml-4 shrink-0 text-[12.5px] text-muted">
                    {item.hint}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[12px] text-muted">
          <span>Use Up/Down and Enter</span>
          <span className="mono">Esc</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return <CommandPaletteDialog onClose={onClose} />;
}
