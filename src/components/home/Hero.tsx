"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PortraitObject } from "@/components/home/PortraitObject";
import { scrollToTarget } from "@/lib/smooth-scroll";
import { site } from "@/content/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function Hero() {
  const reduce = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [36, -56]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-28 pt-28 lg:pb-32 lg:pt-32">
      {/* Editorial backdrop — restrained atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,106,0.08),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f3f0e8 1px, transparent 1px), linear-gradient(to bottom, #f3f0e8 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
      </div>

      {/*
        Editorial composition — two columns on desktop:
        Column 1: name (dominant) → role → positioning → CTAs
        Column 2: portrait (spans both rows, bleeds beyond cell)

        Mobile: intentional single-column flow — name → role → positioning →
        portrait → CTAs → metadata. Portrait stays prominent.
      */}
      <div className="hero-grid mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Identity — the dominant visual block */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="hero-identity"
        >
          <motion.h1
            variants={item}
            className="hero-name font-display leading-[0.88] tracking-tight text-ink"
          >
            Yousef
            <br />
            <span className="text-champagne">Koura</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 flex items-center gap-3"
          >
            <span aria-hidden="true" className="inline-block h-px w-10 shrink-0 bg-champagne/70" />
            <span className="font-display text-xl tracking-tight text-ink sm:text-2xl lg:text-[1.65rem]">
              Machine Learning Engineer
            </span>
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            Mechatronics-trained ML engineer building end-to-end AI products —
            computer vision, data pipelines, and live SaaS.
          </motion.p>
        </motion.div>

        {/* Portrait — fills column 2, bleeds beyond its cell for editorial depth */}
        <div ref={portraitRef} className="hero-portrait">
          <motion.div style={reduce ? undefined : { y: portraitY }}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PortraitObject />
            </motion.div>
          </motion.div>
        </div>

        {/* CTAs + metadata — clean functional strip */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="hero-cta"
        >
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <ButtonLink
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
            >
              View selected work
            </ButtonLink>
            <ButtonLink href={site.movenue} external variant="ghost">
              Movenue live
              <ArrowUpRight size={14} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-4 font-mono text-xs text-muted"
          >
            <li>{site.location}</li>
            <li aria-hidden="true" className="text-line">·</li>
            <li>B.Sc. Mechatronics</li>
          </motion.ul>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget("#work");
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-label="Scroll to selected work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-champagne sm:flex"
      >
        <span>Scroll</span>
        <ChevronDown size={14} aria-hidden="true" className="animate-bounce" />
      </motion.a>
    </section>
  );
}
