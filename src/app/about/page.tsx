import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { BeforeTheCode } from "@/components/about/BeforeTheCode";
import { Currently } from "@/components/about/Currently";
import { FinalNote } from "@/components/about/FinalNote";
import { Principles } from "@/components/about/Principles";
import { QuestionPath } from "@/components/about/QuestionPath";
import { StoryProgress } from "@/components/about/StoryProgress";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Yousef Koura — machine learning engineer who started with machines. The path from mechatronics and robotics to ML systems and products: what shaped him, what he cares about, and what he's building now.",
  path: "/about",
});

/* ABOUT — one directed story in five chapters:
   WHO I AM (hero) → BEFORE THE CODE → THE QUESTION CHANGED / THE PATH
   (the page's single scroll-driven scene) → WHAT I CARE ABOUT (compact) →
   NOW → the close. All dates, roles, and metrics stay on /experience;
   capabilities on Home. Normal document flow throughout — the only pinned
   element on the page is the sticky child inside QuestionPath's own canvas. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BeforeTheCode />
      <QuestionPath />
      <Principles />
      <Currently />
      <FinalNote />
      <StoryProgress />
    </>
  );
}
