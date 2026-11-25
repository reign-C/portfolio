"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("themechange", onChange);
  return () => window.removeEventListener("themechange", onChange);
};

function getIsDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.theme === "dark";
}

export function toggleTheme(): void {
  const nextDark = !getIsDark();
  document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  try {
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  } catch {
    // Storage may be blocked; dataset attribute still applies for this session.
  }
  window.dispatchEvent(new Event("themechange"));
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const dark = useSyncExternalStore(subscribe, getIsDark, () => false);
  const sizeClass = compact ? "h-10 w-10" : "h-11 w-11";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`keycap-btn inline-flex ${sizeClass} items-center justify-center rounded-[10px] text-muted transition-all duration-150 hover:text-ink active:translate-y-[0.5px]`}
    >
      {dark ? (
        <Sun className="h-[17px] w-[17px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[17px] w-[17px]" aria-hidden="true" />
      )}
    </button>
  );
}
