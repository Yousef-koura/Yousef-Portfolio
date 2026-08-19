import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <PagePlaceholder
      eyebrow="Work"
      title="Selected projects"
      description="The full project catalog is part of a later milestone. In the meantime, the selected work on the home page links directly to live evidence — the Movenue platform and the project repositories."
    />
  );
}