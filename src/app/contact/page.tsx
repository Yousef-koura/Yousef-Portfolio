import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title="Let's connect"
      description="The contact page is part of a later milestone. Until then, email and the LinkedIn and GitHub profiles in the footer are live and ready."
    />
  );
}