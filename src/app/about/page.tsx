import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title="The person behind the engineer"
      description="The full personal and professional story is part of a later milestone. The home page already carries a profile preview with education, location, and current work."
    />
  );
}