"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const DEFAULT_SCALE = "text-[clamp(6rem,20vw,17rem)]";

type GhostTypeProps = {
  /** The oversized word/glyph rendered as the ghost layer */
  children: string;
  /** Wrapper placement/alignment overrides (the layer is absolute inset-0) */
  className?: string;
  /** Typography scale overrides — defaults to the Interlude treatment */
  textClassName?: string;
  /** Scroll-drift amplitude in px (top of viewport → bottom) */
  drift?: number;
};

/**
 * Ghost-typography signature motif — an oversized, near-invisible display
 * word drifting slowly behind content (extracted from the Interlude chapter
 * word; see DECISIONS #33). Purely decorative: aria-hidden, unselectable,
 * non-interactive; drift is disabled under prefers-reduced-motion.
 *
 * Placement is deliberately sparse — exactly three instances on Home
 * (Interlude "Profile", Selected Work "Index", Profile pull-quote glyph).
 * Do not add a fourth without a logged decision.
 */
export function GhostType({ children, className = "", textClassName, drift = 48 }: GhostTypeProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden ${className}`}
    >
      <motion.p
        style={reduce ? undefined : { y }}
        className={`font-display leading-none tracking-tight text-ink/[0.05] ${textClassName ?? DEFAULT_SCALE}`}
      >
        {children}
      </motion.p>
    </div>
  );
}
