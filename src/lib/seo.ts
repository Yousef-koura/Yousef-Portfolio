import type { Metadata } from "next";
import { site } from "@/content/site";

/* A page-level openGraph object REPLACES the composed metadata — including
   the og:image/twitter:image the src/app/opengraph-image.tsx file convention
   injects (observed: every subpage silently lost its share image). Routes
   using this helper therefore re-declare the same generated asset here;
   metadataBase resolves it against the production origin. */
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
};

/* Shared per-page metadata for every indexable route. Keeps canonical,
   og:url, and the social tags locked together so a page can never drift
   (the Week-7 audit's F4/F6 finding: og:url was pinned to "/" site-wide).
   Titles/descriptions stay owned by each page; only the URL plumbing is
   centralized here. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path starting with "/" — emitted as both canonical and og:url */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
