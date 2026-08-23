"use client";

import { useState } from "react";
import { SectionFrame } from "@/components/ui/SectionFrame";

/**
 * WHAT I CARE ABOUT — chapter 04 reframed as three principles rather than
 * three cards: 01 UNDERSTAND (ML), 02 BUILD (Products), 03 CONNECT (Systems).
 * Editorial hairline rows; hover (desktop) previews the supporting copy and
 * runs a champagne underline, click/tap pins it open. One item shown at a
 * time; copy is the existing careAreas prose, verbatim.
 */
const PRINCIPLES = [
  {
    num: "01",
    word: "Understand",
    topic: "Machine Learning",
    prose: "Models and systems that turn data into useful decisions — built and benchmarked honestly, not demoed.",
  },
  {
    num: "02",
    word: "Build",
    topic: "Products",
    prose: "Turning technical ideas into things people can actually use — shipped, live, and maintained.",
  },
  {
    num: "03",
    word: "Connect",
    topic: "Systems",
    prose: "The mechatronics instinct: think end to end — sensor to deployment — across software, automation, AI, and real-world hardware.",
  },
] as const;

export function Principles() {
  // Two input channels: hover previews (mouse only, transient), click pins
  // (persistent, also how touch/keyboard activate). `shown` resolves which
  // row is expanded; hover never fights the pinned state because it clears
  // on pointer leave.
  const [pinned, setPinned] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? pinned;

  return (
    <SectionFrame id="principles" label="What I care about" meta="Three principles" spacing="compact">
      <h2 className="sr-only">What I care about</h2>

      <div className="mt-8 border-b border-line" onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovered(null);
      }}>
        {PRINCIPLES.map((principle, i) => {
          const isOpen = shown === i;
          return (
            <div key={principle.num} className="border-t border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`principle-${principle.num}`}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setHovered(i);
                }}
                onClick={() => setPinned((cur) => (cur === i ? -1 : i))}
                className="group flex w-full items-center gap-5 py-5 text-left sm:gap-7 sm:py-6"
              >
                <span className="w-6 shrink-0 font-mono text-[10px] tracking-[0.22em] text-champagne-strong">
                  {principle.num}
                </span>
                <span className="relative">
                  <span
                    className={`font-display text-2xl tracking-tight transition-colors duration-500 sm:text-4xl ${
                      isOpen ? "text-ink" : "text-muted-strong group-hover:text-ink"
                    }`}
                  >
                    {principle.word}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-champagne transition-transform duration-500 ${
                      isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
                <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70 sm:block">
                  {principle.topic}
                </span>
              </button>

              <div
                id={`principle-${principle.num}`}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-md pb-6 pl-[2.75rem] pr-4 text-sm leading-relaxed text-muted sm:pl-[3.75rem] sm:text-base">
                    {principle.prose}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile topic echo — the sm+ row hides it, so repeat quietly */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted/50 sm:hidden">
        {PRINCIPLES.map((p) => (
          <li key={p.num}>{p.topic}</li>
        ))}
      </ul>
    </SectionFrame>
  );
}
