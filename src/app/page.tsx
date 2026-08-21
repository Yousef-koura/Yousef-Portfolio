import type { Metadata } from "next";
import { PortalArchive } from "@/components/home/PortalArchive";

export const metadata: Metadata = {
  title: "Yousef Koura — Machine Learning Engineer",
  description:
    "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue, a live SaaS court management and booking platform.",
};

export default function Home() {
  return (
    <PortalArchive />
  );
}
