const FALLBACK_SITE_URL = "https://reignmarccipriano.dev";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.origin;
      }
    } catch {
      // Fall back when env var is not a valid HTTP/HTTPS URL
    }
  }
  return FALLBACK_SITE_URL;
}
