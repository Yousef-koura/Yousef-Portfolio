"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Breathing space between Selected Work and Profile — a near-silent pause.
 * A giant ghost chapter word drifts slowly through generous whitespace so the
 * visitor feels the page exhale before the person behind the work appears.
 * Purely decorative (the following section carries the real label); parallax
 * is disabled under prefers-reduced-motion.
 */
export function Interlude() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative flex h-[26vh] max-h-[220px] min-h-[160px] select-none items-center justify-center overflow-hidden sm:h-[46vh] sm:max-h-[520px] sm:min-h-[280px] lg:h-[52vh]"
    >
      <motion.p
        style={reduce ? undefined : { y }}
        className="font-display text-[clamp(6rem,20vw,17rem)] leading-none tracking-tight text-ink/[0.05]"
      >
        Profile
      </motion.p>
      <span className="absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-line/60" />
    </section>
  );
}
