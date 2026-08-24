import type { Metadata } from "next";
import { NotFoundHero } from "@/components/not-found/NotFoundHero";

/* Branded 404 (Week-7 audit: F-polish + light-mode fix). Replacing the
   default Next not-found removes its injected unlayered body stylesheet —
   the rule that pinned this page to prefers-color-scheme colors while the
   header followed data-theme. Everything here renders through the root
   layout, so the token-driven body background and both themes apply like
   any other page. 404s are noindexed automatically; no canonical is
   declared for a route that does not exist. */
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return <NotFoundHero />;
}
