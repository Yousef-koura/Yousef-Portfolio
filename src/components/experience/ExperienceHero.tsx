"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";

/* Metadata + intro settle in as the heading finishes most of its rise —
   the Home hero's item language (opacity/y rise on the shared ease curve),
   byte-consistent with WorkHero. */
const settleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.78 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * EXPERIENCE hero — same identity pattern as the WORK hero (no kicker, no
 * bare rule; hairlines begin at the timeline's indexed section below).
 * Heading enters via the shared masked line reveal; metadata + intro settle
 * in shortly after. Reduce-gated throughout.
 */
export function ExperienceHero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 sm:px-8 sm:pt-44">
      <motion.div variants={settleWrap} initial={reduce ? false : "hidden"} animate="show">
        <div className="mt-16 flex flex-col gap-10 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-9xl">
            <MaskedLineReveal lines={[<>Experience<span className="text-champagne">.</span></>]} />
          </h1>
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-muted lg:text-right"
          >
            04 roles · newest first
            <br />
            2023 — 2026
          </motion.p>
        </div>
        <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Four machine learning and AI roles since 2023 — what each one involved, and the results measured along
          the way.
        </motion.p>
      </motion.div>
    </section>
  );
}
