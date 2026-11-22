import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reign Marc Cipriano — Computer Engineer",
  description:
    "Computer engineering graduate building ESP32 sensor systems, Raspberry Pi deployments, firmware, and on-site CCTV, PA, and telephony installs. Based in Tacurong City, open to IoT and automation roles across SOCCSKSARGEN.",
  authors: [{ name: "Reign Marc L. Cipriano" }],
  creator: "Reign Marc L. Cipriano",
  openGraph: {
    title: "Reign Marc Cipriano — Computer Engineer",
    description:
      "ESP32 sensor systems, Raspberry Pi deployments, firmware, and on-site installs. Open to IoT and automation roles in SOCCSKSARGEN.",
    type: "profile",
    locale: "en_PH",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#eff1ea",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 text-sm font-semibold text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
