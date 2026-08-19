import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  return (
    <PagePlaceholder
      eyebrow="Publications"
      title="Research & publication"
      description="The full publication section is part of a later milestone. The home page already surfaces the IUGRC 8 AgRobot publication with its certificate as evidence."
    />
  );
}