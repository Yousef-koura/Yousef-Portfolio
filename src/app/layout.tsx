import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/* Browser chrome (status/address bar) must match the Obsidian environment —
   without it, mobile browsers paint a light default bar above the page. */
export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Yousef Koura — Machine Learning Engineer",
    template: "%s — Yousef Koura",
  },
  description:
    "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue, a live SaaS court management and booking platform.",
  openGraph: {
    title: "Yousef Koura — Machine Learning Engineer",
    description:
      "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-champagne focus:px-5 focus:py-2 focus:font-mono focus:text-xs focus:text-obsidian"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}