"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";

/* Metadata + intro settle in as the heading finishes most of its rise —
   the Home hero's item language (opacity/y rise on the shared ease curve). */
const settleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.78 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * WORK index hero — identity carried by the nav's active state plus the
 * H1 alone (kicker removed in a prior pass; its leftover bare top rule
 * removed too — hairlines belong to indexed sections, as on Home).
 * Heading enters via the shared masked line reveal; metadata + intro
 * settle in shortly after. Reduce-gated throughout.
 */
export function WorkHero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 sm:px-8 sm:pt-44">
      <motion.div variants={settleWrap} initial={reduce ? false : "hidden"} animate="show">
        <div className="mt-16 flex flex-col gap-10 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
          {/* One existing-token step up at desktop only — the H1 carries the
              row's asymmetric weight against the quiet mono metadata */}
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-9xl">
            <MaskedLineReveal lines={[<>Work<span className="text-champagne">.</span></>]} />
          </h1>
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-muted lg:text-right"
          >
            07 projects · 07 pages
            <br />
            2023 — 2026
          </motion.p>
        </div>
        <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Machine learning, computer vision, LLM systems, data engineering, and one live SaaS product —
          every entry opens into its own project page.
        </motion.p>
      </motion.div>
    </section>
  );
}
