import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Launch hygiene — don't advertise the framework version.
  poweredByHeader: false,
  images: {
    // AVIF first (WebP fallback) — the Week-7 mobile audit's LCP element is
    // the homepage hero portrait; AVIF cuts its transfer weight ~25% vs
    // WebP at equivalent quality. Encoding happens once server-side and is
    // CDN-cached; browsers without AVIF keep getting WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
