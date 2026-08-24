"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { experience } from "@/content/experience";

gsap.registerPlugin(ScrollTrigger);

/* Current-entry emphasis follows the Home experience-preview precedent:
   identical typography across entries; only the accents shift to champagne
   (small accent text uses the AA-safe strong token per DECISIONS #41). */
function CurrentChip() {
  return (
    <span className="flex items-center gap-1.5 border border-champagne/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-champagne">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne" />
      Current
    </span>
  );
}

/**
 * EXPERIENCE timeline — a vertical spine with one node per role.
 * The spine is decorative chrome (aria-hidden, pointer-events-none); the
 * entries themselves are a plain reverse-chronological <ol> so screen readers
 * get a clean sequential timeline. Desktop ≥lg alternates entries either side
 * of the centred spine; below lg everything stacks single-column along a
 * left-edge spine in the same reading order. The champagne spine draws in
 * progressively via ScrollTrigger (scrubbed to scroll) and each entry
 * fade/rises through the shared Reveal primitive — both disabled under
 * prefers-reduced-motion, where the section renders fully drawn immediately.
 */
export function ExperienceTimeline() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const spineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!spineRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="timeline" label="Professional timeline" meta="2023 — 2026">
      <h2 id="timeline-heading" className="sr-only">
        Career timeline, newest first
      </h2>

      <div ref={listRef} className="relative">
        {/* Decorative spine — hidden from AT and interaction alike */}
        <span
          ref={spineRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[5px] top-0 w-px origin-top bg-champagne/40 lg:left-1/2"
        />

        <ol aria-labelledby="timeline-heading" className="flex flex-col gap-y-14 sm:gap-y-20">
          {experience.map((entry, index) => {
            const isCurrent = Boolean(entry.current);
            const left = index % 2 === 0;

            return (
              <li key={`${entry.org}-${entry.role}`} className="relative">
                <Reveal y={24} className="relative">
                  {/* Node tying the entry to its place on the spine */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[5px] top-[3px] flex h-[11px] w-[11px] -translate-x-1/2 items-center justify-center rounded-full border bg-obsidian lg:left-1/2 ${
                      isCurrent ? "border-champagne" : "border-champagne/50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-[4px] w-[4px] rounded-full ${isCurrent ? "bg-champagne" : "bg-champagne/70"}`}
                    />
                  </span>

                  <div
                    className={`pl-10 sm:pl-12 lg:w-1/2 lg:pl-0 ${
                      left ? "lg:pr-14 xl:pr-20" : "lg:ml-auto lg:pl-14 xl:pl-20"
                    }`}
                  >
                    <p
                      className={`font-mono text-xs tracking-[0.16em] ${
                        isCurrent ? "text-champagne-strong" : "text-muted"
                      }`}
                    >
                      {entry.timeframe}
                    </p>

                    <h3 className="mt-3 font-display text-xl tracking-tight text-ink sm:text-2xl">{entry.org}</h3>
                    <p
                      className={`mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] ${
                        isCurrent ? "text-champagne-strong" : "text-muted-strong"
                      }`}
                    >
                      {entry.role}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                        {entry.location}
                      </p>
                      {isCurrent ? <CurrentChip /> : null}
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-sm leading-relaxed text-muted/90 sm:text-[15px]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-muted-strong/60"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {entry.technologies ? (
                      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted/60">
                        {entry.technologies.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionFrame>
  );
}
