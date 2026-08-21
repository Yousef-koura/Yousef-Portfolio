import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TechnicalMarquee } from "@/components/home/TechnicalMarquee";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Interlude } from "@/components/home/Interlude";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { PublicationPreview } from "@/components/home/PublicationPreview";
import { Capabilities } from "@/components/home/Capabilities";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Yousef Koura — Machine Learning Engineer",
  description:
    "Junior Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and end-to-end data engineering. Currently building Movenue, a live SaaS court management and booking platform.",
};

export default function Home() {
  return (
    <>
      {/* Rhythm: immersive → texture → editorial proof → minimal index → pause →
          person → visual evidence → minimal metadata → large CTA */}
      <Hero />
      <TechnicalMarquee />
      <SelectedWork />
      <Interlude />
      <AboutPreview />
      <PublicationPreview />
      <ExperiencePreview />
      <Capabilities />
      <FinalCta />
    </>
  );
}