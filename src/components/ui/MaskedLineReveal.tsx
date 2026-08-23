"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* Masked editorial line reveal — each line rises out of its own overflow clip.
   Extracted from the Home hero's name entrance; the constants are kept
   byte-identical to it so both read as one motion language. Reduce-gated:
   under prefers-reduced-motion the lines render immediately with no clip/rise
   (component gate + global MotionConfig reducedMotion="user"). */

const lineWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const line = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const } },
};

type MaskedLineRevealProps = {
  /** One entry per visual line; styling (e.g. champagne spans) rides on the node itself */
  lines: ReactNode[];
  className?: string;
};

export function MaskedLineReveal({ lines, className = "" }: MaskedLineRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      variants={lineWrap}
      initial={reduce ? false : "hidden"}
      animate="show"
      className={`block ${className}`}
    >
      {lines.map((node, i) => (
        <span key={i} className="block overflow-hidden pb-[0.07em] -mb-[0.07em]">
          <motion.span variants={line} className="block">
            {node}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
