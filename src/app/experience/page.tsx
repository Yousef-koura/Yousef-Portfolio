import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <PagePlaceholder
      eyebrow="Experience"
      title="Professional timeline"
      description="The full experience timeline is part of a later milestone. The home page previews the confirmed roles — from FlyRank AI to PioPetro, ITI, and D-HUB."
    />
  );
}