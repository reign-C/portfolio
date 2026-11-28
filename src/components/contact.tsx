"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, GitBranch } from "lucide-react";
import { site } from "@/lib/content";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line py-12 pb-10"
    >
      <h2
        id="contact-heading"
        className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink"
      >
        Contact
      </h2>

      <div className="paper-card mt-6 rounded-[16px] p-6 sm:p-7">
        <p className="text-[15.5px] leading-[1.6] text-muted">
          {site.availability}. Based in {site.location} ({site.timezone}), open
          to roles in {site.region} or remote.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center text-[19px] font-semibold text-ink underline decoration-line transition-colors duration-150 hover:decoration-ink sm:text-[22px]"
          >
            {site.email}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="keycap-btn inline-flex min-h-10 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] font-medium text-ink transition-all duration-150 active:translate-y-[0.5px]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-ink" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4 text-muted" aria-hidden="true" />
            )}
            <span>{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {copied ? `${site.email} copied to clipboard.` : ""}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <a
            href={site.resume}
            download={site.resumeFilename}
            className="inline-flex min-h-11 items-center justify-center rounded-[12px] bg-accent px-5 text-[14.5px] font-medium text-accent-ink no-underline transition-opacity duration-150 hover:opacity-85"
          >
            Download resume
          </a>
          <a
            href={`mailto:${site.email}`}
            className="keycap-btn inline-flex min-h-11 items-center justify-center rounded-[12px] px-5 text-[14.5px] font-medium text-ink no-underline transition-all duration-150 active:translate-y-[0.5px]"
          >
            Send email
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="keycap-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-[14.5px] font-medium text-ink no-underline transition-all duration-150 active:translate-y-[0.5px]"
          >
            <GitBranch className="h-4 w-4 text-muted" aria-hidden="true" />
            <span>github.com/{site.githubHandle}</span>
            <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="keycap-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-[14.5px] font-medium text-ink no-underline transition-all duration-150 active:translate-y-[0.5px]"
          >
            <span>Facebook</span>
            <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
          </a>
        </div>
      </div>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-muted">
        <span>{site.name} · Computer Engineering</span>
        <span>
          {site.location} · {site.timezone}
        </span>
      </footer>
    </section>
  );
}
