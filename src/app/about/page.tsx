import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { AboutHero } from "@/components/about/AboutHero";
import { CapabilitiesWall } from "@/components/about/CapabilitiesWall";
import { Trajectory } from "@/components/about/Trajectory";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Yousef Koura — machine learning engineer in Menoufia, Egypt, with a Mechatronics Systems Engineering foundation. The trajectory from mechatronics education through ML internships to building a live SaaS product.",
};

/* Art-directed inline portrait (DECISIONS #48): the same approved cutout pair
   and <picture> pattern as the Home opening (DECISIONS #34), composed as a
   small supporting figure beside the statement — no stage, no choreography.
   Not an LCP candidate on this page: default lazy loading, no fetchPriority. */
const common = {
  alt: "Yousef Koura",
  sizes: "(max-width: 760px) 128px, 200px",
};

const {
  props: { srcSet: portraitDesktopSrcSet },
} = getImageProps({ ...common, src: "/portrait/personal-image-desktop.png", width: 365, height: 684 });

const {
  props: { srcSet: portraitMobileSrcSet, ...portraitMobileRest },
} = getImageProps({ ...common, src: "/portrait/personal-image-mobile.png", width: 394, height: 634 });

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* ─── Opening personal statement + small inline portrait ─── */}
      <SectionFrame label="Who I am">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-14 lg:gap-20">
          <figure className="w-32 shrink-0 self-start sm:w-44 lg:w-52">
            <picture>
              <source media="(min-width: 761px)" srcSet={portraitDesktopSrcSet} sizes={common.sizes} />
              <source media="(max-width: 760px)" srcSet={portraitMobileSrcSet} sizes={common.sizes} />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt arrives via portraitMobileRest */}
              <img {...portraitMobileRest} loading="lazy" className="h-auto w-full" />
            </picture>
          </figure>
          <div className="max-w-2xl">
            <p className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
              I&apos;m a machine learning engineer from Menoufia, Egypt, with a mechatronics
              foundation — hands-on across machine learning, computer vision, and data engineering,
              gained through internships and applied projects.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              I was born in 2002 and grew up in the UAE — Sharjah, then Dubai — before moving to
              Egypt in 2019 for university. Between 15 and 18 I played football at the Emirates Club
              youth academy in the UAE, on the left wing.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              What pulls it together is an interest in end-to-end AI-driven products: not just
              models, but everything around them. Right now that means building and launching
              Movenue, a live SaaS platform, while continuing to grow as an ML engineer.
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* ─── Engineering trajectory ─── */}
      <Trajectory />

      {/* ─── Education ─── */}
      <SectionFrame label="Education" title="B.Sc. Mechatronics Systems Engineering.">
        <dl className="grid gap-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Degree</dt>
            <dd className="mt-3 text-base leading-relaxed text-ink">
              B.Sc. Mechatronics Systems Engineering
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">University</dt>
            <dd className="mt-3 text-base leading-relaxed text-ink">
              MSA University, Giza, Egypt — in partnership with the University of Greenwich, UK
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Timeframe</dt>
            <dd className="mt-3 font-mono text-sm text-champagne-strong">Sep 2019 — Jul 2024</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">GPA</dt>
            <dd className="mt-3 font-mono text-sm text-champagne-strong">3.62 / 4.0</dd>
          </div>
        </dl>
      </SectionFrame>

      {/* ─── Capabilities logo wall (same confirmed clusters/technologies as
             Home; About-specific presentation — DECISIONS #51) ─── */}
      <CapabilitiesWall />

      {/* Forward path — the page must not dead-end */}
      <section aria-label="Connect" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-32 mt-28 border-t border-line pt-20 sm:mb-40 sm:mt-36 sm:pt-24">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            The rest is better in person<span className="text-champagne">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Find me on LinkedIn or GitHub, or head straight to the work and the experience behind
            it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
            <QuietLink href={site.linkedin} external>
              LinkedIn
            </QuietLink>
            <QuietLink href={site.github} external>
              GitHub
            </QuietLink>
            <QuietLink href="/work">See the work</QuietLink>
          </div>
        </div>
      </section>
    </>
  );
}
