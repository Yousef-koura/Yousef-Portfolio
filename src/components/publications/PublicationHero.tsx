"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MaskedLineReveal } from "@/components/ui/MaskedLineReveal";
import { publication } from "@/content/experience";

/* Metadata + intro settle in as the heading finishes most of its rise —
   the Work/Experience hero item language (opacity/y rise on the shared ease
   curve), byte-consistent constants. */
const settleWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.78 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * PUBLICATIONS hero — the WorkHero/ExperienceHero identity pattern applied to
 * the paper: kicker → masked display title (the short name carries the
 * Work-scale display weight; the full formal title continues beneath it so
 * the exact wording survives every viewport, subordinate to the name) →
 * supporting line. No right-side metadata column: type/venue/date all live in
 * the confirmed <dl> below, and duplicating them beside the title read as
 * filler rather than composition. The dl + action row ride the same stagger
 * so the whole opening reads as one choreography. Reduce-gated throughout.
 */
export function PublicationHero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 sm:px-8 sm:pt-44">
      {/* Kicker enters first (0.1–0.2s), ahead of the title's masked rise */}
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-xs uppercase tracking-[0.22em] text-champagne-strong"
      >
        IUGRC 8 · 2024
      </motion.p>

      <motion.div variants={settleWrap} initial={reduce ? false : "hidden"} animate="show">
        <div className="mt-8 sm:mt-10">
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-9xl">
            <MaskedLineReveal
              lines={[
                <Fragment key="agrobot-name">
                  AgRobot<span className="text-champagne">:</span>{" "}
                </Fragment>,
                <Fragment key="agrobot-subtitle">
                  <span className="mt-4 block max-w-xl font-display text-xl leading-snug tracking-tight text-ink sm:mt-5 sm:text-2xl lg:max-w-2xl lg:text-3xl">
                    Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot
                    <span className="text-champagne">.</span>
                  </span>
                </Fragment>,
              ]}
            />
          </h1>
        </div>

        <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          An AI-powered inspection robot that detects crop diseases autonomously and recommends their
          medication — bringing deep learning to greenhouse farming on embedded hardware.
        </motion.p>

        {/* Confirmed metadata — the Work detail page's dl grammar. Authors +
            Venue carry the scan (ink); Location/Date/Type stay quiet so the
            eye lands on who and where-published first. Extra mobile row gap
            lets the five fields breathe without cards or borders. */}
        <motion.dl
          variants={item}
          className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 sm:gap-y-8 md:grid-cols-3"
        >
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Authors</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink">
              {publication.authors.join(" · ")}
              <span className="mt-1 block text-xs text-muted">{publication.affiliation}</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Venue</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink">
              8th International Undergraduate Research Conference (IUGRC 8)
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Location</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{publication.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Date</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{publication.date}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Type</dt>
            <dd className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
              <span className="capitalize">{publication.type}</span>
            </dd>
          </div>
        </motion.dl>

        {/* Actions — exactly two exits; the paper is the whole journey here
            (Agri-Bot's link lives in Context, where the connection is told) */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4"
        >
          <ButtonLink href={publication.pdfHref} variant="primary" external>
            Read the paper
          </ButtonLink>
          <ButtonLink href={publication.pdfHref} variant="ghost" external download>
            Download PDF
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
