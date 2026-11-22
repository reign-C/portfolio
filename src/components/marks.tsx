type IconProps = {
  className?: string;
};

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1.75" y="3.25" width="12.5" height="9.5" />
      <path d="M2 4l6 4.5L14 4" />
    </svg>
  );
}

export function DownloadIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 2v8" />
      <path d="M4.75 6.75L8 10l3.25-3.25" />
      <path d="M2.5 12.5h11" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 11.5L11.5 4.5" />
      <path d="M5.5 4.5h6v6" />
    </svg>
  );
}

export function ChipMark({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="4" width="8" height="8" />
      <path d="M6 1v3M10 1v3M6 12v3M10 12v3M1 6h3M1 10h3M12 6h3M12 10h3" />
      <rect x="6.5" y="6.5" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
