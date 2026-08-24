import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { DirectEmail } from "@/components/contact/DirectEmail";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ForwardPath } from "@/components/contact/ForwardPath";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Yousef Koura — Machine Learning Engineer focused on applied AI, computer vision, and data-driven systems. Open to Junior ML Engineer, AI Engineer, and Computer Vision Engineer opportunities.",
  path: "/contact",
});

/* CONTACT — the portfolio's final page: hero (shared subpage identity
   grammar) → primary email channel (the page's single accent moment) →
   confirmed channels as hairline metadata rows → quiet forward path back
   into the evidence trail. Direct links only — no form/backend per
   TECH_STACK.md; every value traces to src/content/site.ts / CONTENT.md. */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <DirectEmail />
      <ContactChannels />
      <ForwardPath />
    </>
  );
}
