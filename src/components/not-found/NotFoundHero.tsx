"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";
import { QuietLink } from "@/components/ui/QuietLink";

/* Metadata settles in as the heading finishes most of its rise — the
   Work/Experience/Publications/Contact hero item language (opacity/y rise on
   the shared ease curve), byte-consistent constants. */
const settleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.78 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * NOT FOUND hero — the shared subpage identity grammar applied to the 404:
 * eyebrow → masked display statement with the champagne period → supporting
 * copy → one primary journey action plus a quiet link into the work.
 * Mobile keeps the Contact-hero display step so the line survives 320px.
 * Reduce-gated throughout.
 */
export function NotFoundHero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto flex min-h-[68svh] max-w-6xl flex-col px-5 pb-28 pt-36 sm:min-h-[64svh] sm:px-8 sm:pb-36 sm:pt-44">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow>404 / Not found</Eyebrow>
      </motion.div>

      <motion.div variants={settleWrap} initial={reduce ? false : "hidden"} animate="show">
        <h1 className="mt-8 font-display text-[2rem] leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <MaskedLineReveal
            lines={[
              <>This page went</>,
              <>
                off the map<span className="text-champagne">.</span>
              </>,
            ]}
          />
        </h1>

        <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="/">Back home</ButtonLink>
          <QuietLink href="/work">View the work</QuietLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
