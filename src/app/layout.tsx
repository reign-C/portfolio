import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Reign Marc Cipriano — IoT and automation engineer";
const description =
  "Computer engineering graduate in Tacurong City building sensor-driven systems: ESP32 firmware, Raspberry Pi deployments, and on-site CCTV, PA, and telephony installs across SOCCSKSARGEN.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Reign Marc L. Cipriano" }],
  creator: "Reign Marc L. Cipriano",
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "en_PH",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-sm bg-text px-4 py-3 text-sm font-medium text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
