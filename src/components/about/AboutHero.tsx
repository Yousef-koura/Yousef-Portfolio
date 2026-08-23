"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";

/* Metadata + intro settle in as the heading finishes most of its rise —
   the same item language WORK's hero uses (opacity/y rise on the shared
   ease curve), so both subpages enter identically. */
const settleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.78 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * ABOUT hero — mirrors the WORK index hero's entrance (masked line reveal H1,
 * quiet mono metadata, settle-in intro). No top rule: hairlines belong to the
 * indexed sections below, matching Home and WORK.
 */
export function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 sm:px-8 sm:pt-44">
      <motion.div variants={settleWrap} initial={reduce ? false : "hidden"} animate="show">
        <div className="mt-16 flex flex-col gap-10 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-9xl">
            <MaskedLineReveal lines={[<>About<span className="text-champagne">.</span></>]} />
          </h1>
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase leading-loose tracking-[0.22em] text-muted lg:text-right"
          >
            Menoufia, Egypt
            <br />
            B.Sc. Mechatronics Systems Engineering
          </motion.p>
        </div>
        <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          The person behind the engineer — where the work comes from, and the path that shaped it.
        </motion.p>
      </motion.div>
    </section>
  );
}
