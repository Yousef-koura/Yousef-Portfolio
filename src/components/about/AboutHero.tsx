"use client";

import { getImageProps } from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";

/* Entrance language: the statement rises via MaskedLineReveal while copy and
   portrait settle in behind it. The portrait enters through a vertical clip
   mask (maskReveal) with a slight settle on the image itself (imgSettle) —
   one restrained beat, no bouncing. A whisper of scroll parallax (drift)
   keeps it alive on desktop only, reduce-gated. */
const settleWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] } },
};

const imgSettle: Variants = {
  hidden: { scale: 1.06, y: -12 },
  show: { scale: 1, y: 0, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } },
};

const HEADLINE_LINES = [
  <>I&apos;m a machine</>,
  <>learning engineer</>,
  <>who started</>,
  <>with machines<span className="text-champagne">.</span></>,
];

/* Approved cutout pair + <picture> pattern shared by both compositions
   (mobile/tablet float, lg+ column). Not an LCP candidate here: default
   lazy loading, no fetchPriority. */
const common = {
  alt: "Yousef Koura",
};

const {
  props: { srcSet: portraitDesktopSrcSet },
} = getImageProps({ ...common, src: "/portrait/personal-image-desktop.png", width: 365, height: 684 });

const {
  props: { srcSet: portraitMobileSrcSet, ...portraitMobileRest },
} = getImageProps({ ...common, src: "/portrait/personal-image-mobile.png", width: 394, height: 634 });

function PortraitPicture({ sizes, className }: { sizes: string; className?: string }) {
  return (
    <picture>
      <source media="(min-width: 761px)" srcSet={portraitDesktopSrcSet} sizes={sizes} />
      <source media="(max-width: 760px)" srcSet={portraitMobileSrcSet} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt arrives via portraitMobileRest */}
      <img {...portraitMobileRest} loading="lazy" className={className} />
    </picture>
  );
}

/**
 * ABOUT hero — "I started with machines." The page's identity beat.
 * Mobile/tablet: a single editorial composition — the statement spans full
 * measure while the cutout floats right and RISES into the headline zone
 * (negative top margin), so the supporting copy wraps around its lower body.
 * The portrait is part of the opening composition, never a stacked block.
 * Desktop: two-column lockup, portrait bottom-aligned right with the same
 * masked entrance plus a subtle scroll drift.
 */
export function AboutHero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, -44]);

  return (
    <section
      ref={sectionRef}
      id="about-start"
      className="relative overflow-x-clip pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44"
    >
      {/* Quiet corner annotation — the technical voice, once */}
      <span
        aria-hidden="true"
        className="absolute right-6 top-28 hidden select-none font-mono text-sm text-muted/30 sm:block lg:right-8"
      >
        +
      </span>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={settleWrap}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="lg:flex lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="flow-root max-w-3xl">
            <motion.div variants={item}>
              <Eyebrow>About.</Eyebrow>
            </motion.div>

            <h1 className="relative z-10 mt-7 font-display text-[1.75rem] leading-[1.08] tracking-tight text-ink sm:text-5xl sm:leading-[1.03] lg:text-6xl">
              <MaskedLineReveal lines={HEADLINE_LINES} />
            </h1>

            {/* Mobile/tablet portrait — floated right, raised beside lines 3–4;
                the cutout's transparent margins keep headline text clear */}
            <motion.figure
              variants={maskReveal}
              className="float-right -mt-9 ml-5 w-[45vw] max-w-[210px] sm:-mt-14 sm:w-[240px] lg:hidden"
            >
              <motion.div variants={imgSettle}>
                <PortraitPicture sizes="(max-width: 639px) 45vw, 240px" className="h-auto w-full" />
              </motion.div>
              <figcaption className="mt-2 text-right font-mono text-[9px] uppercase tracking-[0.22em] text-muted/60">
                Fig. 01 — est. 2002
              </figcaption>
            </motion.figure>

            <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m from Menoufia, Egypt, with a mechatronics engineering foundation — years spent around robots,
              sensors, and control systems. What pulled me toward machine learning was the part of those systems that
              decides: how software perceives, learns, and acts.
            </motion.p>

            <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted/90">
              Born in 2002 — a childhood split between Sharjah and Dubai, four years on the wing at the Emirates Club
              academy, then back to Egypt for engineering in 2019.
            </motion.p>
          </div>

          {/* Desktop portrait — bottom-aligned column, masked reveal + drift */}
          <motion.figure
            variants={maskReveal}
            style={reduce ? undefined : { y: drift }}
            className="hidden w-56 shrink-0 self-end lg:block xl:w-64"
          >
            <motion.div variants={imgSettle}>
              <PortraitPicture sizes="(min-width: 1280px) 256px, 224px" className="h-auto w-full" />
            </motion.div>
            <motion.figcaption
              variants={item}
              className="mt-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted/60"
            >
              <span>Fig. 01</span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
              <span>est. 2002</span>
            </motion.figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}
