"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Command,
  FileText,
  FolderGit2,
  GitBranch,
  Home,
  Layers,
  Mail,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  X,
} from "lucide-react";
import { projects, site } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";

const SIDEBAR_STORAGE_KEY = "sidebar-collapsed";

const MAIN_NAV = [
  { id: "home", label: "Overview", href: "/", icon: Home },
  { id: "projects", label: "Projects", href: "/#projects", icon: FolderGit2 },
  { id: "skills", label: "Stack", href: "/#skills", icon: Layers },
  { id: "experience", label: "Experience", href: "/#experience", icon: Briefcase },
  { id: "about", label: "About", href: "/#about", icon: User },
  { id: "contact", label: "Contact", href: "/#contact", icon: Mail },
] as const;

const sidebarSubscribe = (onChange: () => void) => {
  window.addEventListener("sidebarcollapsechange", onChange);
  return () => window.removeEventListener("sidebarcollapsechange", onChange);
};

function getSidebarCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function toggleSidebarCollapsed(): void {
  const next = !getSidebarCollapsed();
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? "1" : "0");
  } catch {
    // Ignore storage failures
  }
  window.dispatchEvent(new Event("sidebarcollapsechange"));
}

function useActiveSection(pathname: string) {
  const [scrollActive, setScrollActive] = useState<string>("home");

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = ["projects", "skills", "experience", "about", "contact"];
    const update = () => {
      const scrollY = window.scrollY;
      if (scrollY < 160) {
        setScrollActive("home");
        return;
      }

      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 180) current = id;
      }
      setScrollActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  if (pathname.startsWith("/work")) return "projects";
  if (pathname !== "/") return "";
  return scrollActive;
}

function useLocalTime() {
  const [timeText, setTimeText] = useState<string>("");

  useEffect(() => {
    const format = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-PH", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setTimeText(formatted);
      } catch {
        setTimeText("");
      }
    };
    format();
    const timer = setInterval(format, 30000);
    return () => clearInterval(timer);
  }, []);

  return timeText;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeId = useActiveSection(pathname);
  const localTime = useLocalTime();
  const collapsed = useSyncExternalStore(
    sidebarSubscribe,
    getSidebarCollapsed,
    () => false,
  );
  const [drawerOpenPath, setDrawerOpenPath] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const drawerOpen = drawerOpenPath === pathname;
  const setDrawerOpen = (open: boolean) =>
    setDrawerOpenPath(open ? pathname : null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const orderedProjects = [...projects].sort((a, b) => a.rank - b.rank);

  const sidebarContent = (isMobileDrawer: boolean) => {
    const iconSize = isMobileDrawer ? "h-11 w-11" : "h-10 w-10";

    return (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="min-h-0 overflow-y-auto pr-0.5">
          {/* Header: clean wordmark + quiet engineering locale + collapse trigger */}
          <div className="flex items-start justify-between gap-2 px-1">
            <div>
              <Link
                href="/"
                onClick={() => isMobileDrawer && setDrawerOpen(false)}
                className="inline-flex items-center whitespace-nowrap text-[16px] font-semibold tracking-[-0.02em] text-ink no-underline"
              >
                {site.shortName}
              </Link>
              <p className="mt-0.5 whitespace-nowrap text-[12px] text-muted">
                <span>Tacurong</span>
                {localTime ? (
                  <span className="mono tabular"> · {site.timezone} {localTime}</span>
                ) : (
                  <span> · {site.timezone}</span>
                )}
              </p>
            </div>

            {isMobileDrawer ? (
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-muted hover:bg-surface-subtle hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={toggleSidebarCollapsed}
                aria-label="Collapse navigation"
                aria-expanded={!collapsed}
                title="Collapse sidebar"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-muted transition-colors duration-150 hover:bg-surface-subtle hover:text-ink"
              >
                <PanelLeftClose className="h-[17px] w-[17px]" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Primary sections */}
          <nav aria-label="Primary" className="mt-5 border-t border-line pt-4">
            <div className="flex flex-col gap-0.5">
              {MAIN_NAV.map((item) => {
                const Icon = item.icon;
                const isCurrent = activeId === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => isMobileDrawer && setDrawerOpen(false)}
                    className={`flex min-h-10 items-center gap-2.5 rounded-[10px] px-2.5 text-[14px] whitespace-nowrap no-underline transition-colors duration-150 ${
                      isCurrent
                        ? "bg-surface-subtle font-semibold text-ink"
                        : "font-medium text-muted hover:bg-surface-subtle/60 hover:text-ink"
                    }`}
                  >
                    <Icon
                      className={`h-[15px] w-[15px] shrink-0 ${
                        isCurrent ? "text-ink" : "text-muted"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Direct numbered case study index */}
            <p className="mt-5 px-2.5 pb-1.5 text-[12px] font-medium text-muted">
              Case studies
            </p>
            <div className="flex flex-col gap-0.5">
              {orderedProjects.map((project, index) => {
                const activeCase = pathname === `/work/${project.id}`;
                return (
                  <Link
                    key={project.id}
                    href={`/work/${project.id}`}
                    aria-current={activeCase ? "page" : undefined}
                    onClick={() => isMobileDrawer && setDrawerOpen(false)}
                    className={`flex min-h-9 items-center gap-2.5 rounded-[8px] px-2.5 text-[13.5px] no-underline transition-colors duration-150 ${
                      activeCase
                        ? "bg-surface-subtle font-semibold text-ink"
                        : "text-muted hover:bg-surface-subtle/60 hover:text-ink"
                    }`}
                  >
                    <span className="mono text-[11.5px] text-muted tabular">
                      0{index + 1}
                    </span>
                    <span className="truncate">{project.shortTitle}</span>
                  </Link>
                );
              })}
            </div>

            {/* Direct developer deliverables */}
            <p className="mt-5 px-2.5 pb-1.5 text-[12px] font-medium text-muted">
              Resources
            </p>
            <div className="flex flex-col gap-0.5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-9 items-center justify-between rounded-[8px] px-2.5 text-[13.5px] font-medium text-muted no-underline transition-colors duration-150 hover:bg-surface-subtle/60 hover:text-ink"
              >
                <span className="inline-flex items-center gap-2.5">
                  <GitBranch className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                  <span>{site.githubHandle}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              </a>
              <a
                href={site.resume}
                download
                className="flex min-h-9 items-center justify-between rounded-[8px] px-2.5 text-[13.5px] font-medium text-muted no-underline transition-colors duration-150 hover:bg-surface-subtle/60 hover:text-ink"
              >
                <span className="inline-flex items-center gap-2.5">
                  <FileText className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                  <span>Resume</span>
                </span>
                <span className="mono text-[11px] text-muted">PDF</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Bottom grounded tools row */}
        <div className="mt-3 border-t border-line pt-3">
          <div
            className={`flex items-center ${
              isMobileDrawer ? "gap-2" : "justify-between"
            }`}
          >
            <ThemeToggle compact={!isMobileDrawer} />
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              title={`Email ${site.email}`}
              className={`keycap-btn inline-flex ${iconSize} items-center justify-center rounded-[10px] text-muted transition-all duration-150 hover:text-ink active:translate-y-[0.5px]`}
            >
              <Mail className="h-[17px] w-[17px]" aria-hidden="true" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub profile (${site.githubHandle})`}
              title={`GitHub · ${site.githubHandle}`}
              className={`keycap-btn inline-flex ${iconSize} items-center justify-center rounded-[10px] text-muted transition-all duration-150 hover:text-ink active:translate-y-[0.5px]`}
            >
              <GitBranch className="h-[17px] w-[17px]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => {
                if (isMobileDrawer) setDrawerOpen(false);
                setPaletteOpen(true);
              }}
              aria-label="Open command palette (Ctrl+K)"
              title="Command palette (Ctrl+K)"
              className={`keycap-btn inline-flex ${iconSize} items-center justify-center rounded-[10px] text-muted transition-all duration-150 hover:text-ink active:translate-y-[0.5px]`}
            >
              <Command className="h-[17px] w-[17px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen min-[900px]:flex">
      {/* Desktop floating inset paper sidebar */}
      <AnimatePresence initial={false}>
        {!collapsed ? (
          <motion.aside
            key="desktop-sidebar"
            aria-label="Site navigation"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="hidden shrink-0 p-4 pr-0 min-[900px]:sticky min-[900px]:top-0 min-[900px]:block min-[900px]:h-screen"
          >
            <div className="paper-card h-full w-[240px] rounded-[16px]">
              {sidebarContent(false)}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* Desktop collapsed expand trigger */}
      {collapsed ? (
        <button
          type="button"
          onClick={toggleSidebarCollapsed}
          aria-label="Expand navigation"
          aria-expanded="false"
          title="Expand sidebar"
          className="paper-card fixed left-4 top-4 z-30 hidden h-11 w-11 items-center justify-center rounded-[12px] text-muted transition-colors duration-150 hover:text-ink min-[900px]:inline-flex"
        >
          <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      ) : null}

      {/* Mobile top bar (< 900px) */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur-sm min-[900px]:hidden">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center whitespace-nowrap text-[17px] font-semibold tracking-[-0.02em] text-ink no-underline"
        >
          {site.shortName}
        </Link>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="keycap-btn inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-muted hover:text-ink"
          >
            <Command className="h-[17px] w-[17px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-label="Open navigation menu"
            className="keycap-btn inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-ink"
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile floating slide-over drawer */}
      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-40 flex bg-ink/30 p-3 backdrop-blur-[2px] min-[900px]:hidden"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setDrawerOpen(false);
            }}
          >
            <motion.aside
              aria-label="Mobile navigation"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="paper-card h-full w-[268px] max-w-[85vw] rounded-[16px]"
            >
              {sidebarContent(true)}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Centered editorial reading canvas */}
      <div className="min-w-0 flex-1">
        <main
          id="main"
          className="mx-auto w-full max-w-[840px] px-5 py-8 sm:px-8 min-[900px]:px-10 min-[900px]:py-12"
        >
          {children}
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
