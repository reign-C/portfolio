"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
];

export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 96) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
      {links.map(({ id, label }) => (
        <a
          key={id}
          href={`/#${id}`}
          aria-current={active === id ? "true" : undefined}
          className={`group inline-flex min-h-11 items-center text-sm transition-colors duration-200 hover:text-text ${
            active === id ? "text-text" : "text-muted"
          }`}
        >
          <span className="relative">
            {label}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 -bottom-1 h-0.5 bg-led transition-opacity duration-200 ${
                active === id ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </a>
      ))}
    </nav>
  );
}
