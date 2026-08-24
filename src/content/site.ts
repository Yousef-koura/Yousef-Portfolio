/* Canonical origin for metadata URLs (metadataBase, canonical, robots,
   sitemap). Defaults to the current production deployment; when a custom
   domain goes live, set NEXT_PUBLIC_SITE_URL (e.g. https://example.com)
   in Vercel's project environment variables and redeploy — no code change.
   NEXT_PUBLIC_ vars inline at build time, so the value is baked into every
   prerendered page. Trailing slashes stripped so string joins stay clean. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yousefkoura.vercel.app"
).replace(/\/+$/, "");

export const site = {
  name: "Yousef Koura",
  role: "Machine Learning Engineer",
  location: "Menoufia, Egypt",
  email: "yousefahmed.ae20@gmail.com",
  phone: "+20 107 047 5596",
  movenue: "https://movenue.vercel.app/",
  linkedin: "https://linkedin.com/in/yousefkoura",
  github: "https://github.com/Yousef-koura",
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Publications", href: "/publications" },
    { label: "Contact", href: "/contact" },
  ],
} as const;