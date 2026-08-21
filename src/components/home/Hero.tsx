"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { PortraitObject } from "@/components/home/PortraitObject";
import { scrollToTarget } from "@/lib/smooth-scroll";
import { site } from "@/content/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/* Masked editorial line reveal — each name line rises out of its own clip */
const lineWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const line = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-28 lg:pb-28 lg:pt-32">
      {/* Single faint atmospheric tint — nothing else */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,106,0.06),transparent_55%)]" />
      </div>

      {/*
        Editorial composition — two columns on desktop:
        Column 1: name → role → positioning → CTAs
        Column 2: portrait (quiet, contained)

        Mobile: single-column flow — name → role → positioning →
        portrait → CTAs.
      */}
      <div className="hero-grid mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Identity — weight sits on the positioning line, not on name scale */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="hero-identity"
        >
          <motion.h1
            variants={lineWrap}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="hero-name font-display leading-[0.92] tracking-tight text-ink"
          >
            <span className="block overflow-hidden pb-[0.07em] -mb-[0.07em]">
              <motion.span variants={line} className="block">
                Yousef
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.07em] -mb-[0.07em]">
              <motion.span variants={line} className="block text-champagne">
                Koura
              </motion.span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 font-display text-xl tracking-tight text-ink sm:text-2xl lg:text-[1.65rem]">
            Machine Learning Engineer
          </motion.p>

          {/* The positioning line carries the hero's dominant statement (provisional copy) */}
          <motion.p variants={item} className="mt-5 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
            Building end-to-end AI products — from computer vision to live SaaS.
          </motion.p>
        </motion.div>

        {/* Portrait — art-directed transparent cutout (desktop/mobile crops);
            its one-time load reveal is reduce-gated inside PortraitObject */}
        <div className="hero-portrait">
          <PortraitObject />
        </div>

        {/* CTAs — the one primary journey action plus a quiet external link */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="hero-cta"
        >
          <motion.div variants={item} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
            >
              View selected work
            </ButtonLink>
            <QuietLink href={site.movenue} external>
              Movenue live
            </QuietLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
