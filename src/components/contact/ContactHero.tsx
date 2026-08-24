"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";

/* Metadata settles in as the heading finishes most of its rise — the
   Work/Experience/Publications hero item language (opacity/y rise on the
   shared ease curve), byte-consistent constants. */
const settleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.78 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * CONTACT hero — the shared subpage identity grammar applied to the site's
 * final page: eyebrow → masked display statement with the champagne period →
 * supporting copy. Mobile drops one display step below the sibling heroes so
 * the longer statement survives every viewport without mid-mask wrapping.
 * Reduce-gated throughout.
 */
export function ContactHero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 sm:px-8 sm:pt-44">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow>Contact.</Eyebrow>
      </motion.div>

      <motion.div variants={settleWrap} initial={reduce ? false : "hidden"} animate="show">
        <h1 className="mt-8 font-display text-[2rem] leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-8xl">
          <MaskedLineReveal
            lines={[
              <>Let&apos;s build</>,
              <>
                something useful<span className="text-champagne">.</span>
              </>,
            ]}
          />
        </h1>

        <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Machine Learning Engineer focused on applied AI, computer vision, and data-driven systems. Open to
          Junior ML Engineer, AI Engineer, and Computer Vision Engineer opportunities.
        </motion.p>
      </motion.div>
    </section>
  );
}
