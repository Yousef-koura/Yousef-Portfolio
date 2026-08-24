import type { Metadata } from "next";
import { ExperienceHero } from "@/components/experience/ExperienceHero";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "The complete professional timeline — four machine learning and AI roles across enterprise AI, energy, and research, with what each role involved and the measured outcomes.",
};

/**
 * EXPERIENCE — PHASE 11 milestone. Hero (shared WorkHero language) →
 * animated vertical timeline of the four confirmed roles → closing forward
 * path reusing WORK's established close. Content renders only CONFIRMED
 * entries from src/content/experience.ts.
 */
export default function ExperiencePage() {
  return (
    <>
      <ExperienceHero />
      <ExperienceTimeline />

      {/* Forward path — the page must not dead-end (WORK's closing pattern) */}
      <section aria-label="Contact" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-32 mt-28 border-t border-line pt-20 sm:mb-40 sm:mt-36 sm:pt-24">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Happy to go deeper on any role above<span className="text-champagne">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Scope, metrics, or context — reach out directly for the details.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
            <QuietLink href={`mailto:${site.email}`} external>
              Email directly
            </QuietLink>
            <QuietLink href="/work">See the work</QuietLink>
          </div>
        </div>
      </section>
    </>
  );
}
