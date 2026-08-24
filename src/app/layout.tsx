import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site, siteUrl } from "@/content/site";

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
   without it, mobile browsers paint a light default bar above the page.
   themeColor is the SSR default (dark); the theme runtime keeps it in step
   when light mode applies. color-scheme itself is declared per-theme in
   globals.css, so it is intentionally not pinned here. */
export const viewport: Viewport = {
  themeColor: "#0B0C0E",
};

/* metadataBase resolves every relative URL below (canonical, OG) against
   siteUrl — the env-driven origin in src/content/site.ts. og:image and
   twitter:image are injected by the opengraph-image file convention
   (src/app/opengraph-image.tsx) and take precedence over config here. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yousef Koura — Machine Learning Engineer",
    template: "%s — Yousef Koura",
  },
  description:
    "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue, a live SaaS court management and booking platform.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yousef Koura — Machine Learning Engineer",
    description:
      "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue.",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yousef Koura — Machine Learning Engineer",
    description:
      "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue.",
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
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Theme init (DECISIONS #40) — runs synchronously during HTML
            parsing, before first paint: dark is the brand default, and only
            an exact stored choice overrides it. suppressHydrationWarning on
            <html> lets React accept the script-corrected attribute. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()',
          }}
        />
      </head>
      <body className="min-h-full bg-obsidian font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-champagne focus:px-5 focus:py-2 focus:font-mono focus:text-xs focus:text-on-accent"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        {/* Vercel Web Analytics — no cookies, page views only; the script
            loads in production deployments and reports to the project's
            Analytics tab (must also be enabled in the Vercel dashboard). */}
        <Analytics />
      </body>
    </html>
  );
}