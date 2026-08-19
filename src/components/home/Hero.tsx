"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
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

const profileRows = [
  { label: "Name", value: "Yousef Koura" },
  { label: "Role", value: "ML Engineer · Computer Vision & Applied AI" },
  { label: "Base", value: "Menoufia, Egypt" },
  {
    label: "Education",
    value: "B.Sc. Mechatronics Systems Engineering — MSA University · University of Greenwich, UK",
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-32 lg:pb-28">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,106,0.09),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f3f0e8 1px, transparent 1px), linear-gradient(to bottom, #f3f0e8 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
          <motion.div variants={item}>
            <Eyebrow>Machine Learning Engineer</Eyebrow>
            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Open to ML / AI / Computer Vision roles
            </p>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-6xl leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            Yousef
            <br />
            <span className="text-champagne">Koura</span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Machine learning engineer with a mechatronics foundation, building end-to-end AI products — from computer
            vision and data engineering to production SaaS. Currently shipping{" "}
            <a
              href="https://movenue.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-ink underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-champagne"
            >
              Movenue
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            .
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
            >
              View selected work
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted"
          >
            <li>{site.location}</li>
            <li aria-hidden="true" className="text-line">
              ·
            </li>
            <li>Military service · completed</li>
            <li aria-hidden="true" className="text-line">
              ·
            </li>
            <li>B.Sc. Mechatronics Systems Engineering</li>
          </motion.ul>
        </motion.div>

        {/* Profile spec sheet */}
        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="border border-line bg-surface/80 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-champagne">Profile</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Portfolio
              </span>
            </div>

            <dl className="divide-y divide-line">
              {profileRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[92px_1fr] gap-4 px-6 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink">{row.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[92px_1fr] gap-4 px-6 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Current</dt>
                <dd className="text-sm leading-relaxed text-ink">
                  <a
                    href="https://movenue.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-champagne transition-colors hover:text-champagne-light"
                  >
                    Building Movenue — live
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[92px_1fr] gap-4 px-6 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Availability</dt>
                <dd className="text-sm text-ink">Open to ML / AI / CV roles</dd>
              </div>
            </dl>
          </div>
        </motion.aside>
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