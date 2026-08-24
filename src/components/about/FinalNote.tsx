"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { site } from "@/content/site";

const storyWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * THE CLOSE — "The rest is better in person." One confident statement, one
 * supporting line, then the CTA cluster. More breathing room than the
 * sections above — this is the ending, not another chapter. No new claims,
 * no recap label: the page has already shown where he started and what he
 * built.
 */
export function FinalNote() {
  const reduce = useReducedMotion();

  return (
    <section id="about-final" aria-label="Get in touch" className="scroll-mt-24 pb-24 pt-24 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={storyWrap}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px" }}
        >
          <motion.h2 variants={line} className="mt-16 font-display text-4xl leading-[1.06] tracking-tight text-ink sm:text-6xl sm:leading-[1.04]">
            The rest is
            <br />
            better in person<span className="text-champagne">.</span>
          </motion.h2>

          <motion.p variants={line} className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Find me on LinkedIn or GitHub, or head straight to the work.
          </motion.p>

          <motion.div variants={line} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact" variant="primary">
              Get in touch
            </ButtonLink>
            <QuietLink href={site.linkedin} external>
              LinkedIn
            </QuietLink>
            <QuietLink href={site.github} external>
              GitHub
            </QuietLink>
            <QuietLink href="/work">See the work</QuietLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
