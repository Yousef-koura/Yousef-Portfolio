"use client";

import { useEffect, useState } from "react";

/**
 * STORY PROGRESS — a whisper of wayfinding across six beats
 * (01 About · 02 Before the code · 03 The shift · 04 The path · 05 Now
 * · 06 End). Desktop: a fixed numeral rail in the left gutter; the active
 * chapter's label surfaces beside its numeral. Mobile: a tiny fixed
 * "0X / 06" counter. Purely decorative (aria-hidden, pointer-events-none)
 * — navigation lives in the header.
 *
 * Active chapter = the tracked element whose top edge sits closest to the
 * viewport's reading line. This handles nested markers gracefully: the
 * "the-shift" sentinels live INSIDE the path section, so they win while
 * the questions are at the reading line and hand back to the section once
 * scrolled past. Hidden twins (mobile/desktop sentinel pairs) report a
 * zero rect and are skipped. No layout impact; degrades to chapter 01.
 */
const CHAPTERS = [
  { num: "01", label: "About" },
  { num: "02", label: "Before the code" },
  { num: "03", label: "The shift" },
  { num: "04", label: "The path" },
  { num: "05", label: "Now" },
  { num: "06", label: "End" },
] as const;

const SPY_IDS = [
  "about-start",
  "before-the-code",
  "the-shift",
  "the-shift-lg",
  "the-path",
  "principles",
  "now",
  "about-final",
] as const;

const CHAPTER_FOR_SECTION: Record<(typeof SPY_IDS)[number], number> = {
  "about-start": 0,
  "before-the-code": 1,
  "the-shift": 2,
  "the-shift-lg": 2,
  "the-path": 3,
  principles: 3,
  now: 4,
  "about-final": 5,
};

/* Reading line: slightly above viewport centre */
const READING_LINE = 0.46;

export function StoryProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    /* Re-evaluate from live geometry on every intersection change */
    const evaluate = () => {
      const line = window.innerHeight * READING_LINE;
      let bestChapter = -1;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue; // hidden twin
        const distance = Math.abs(rect.top - line);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestChapter = CHAPTER_FOR_SECTION[el.id as (typeof SPY_IDS)[number]];
        }
      }
      if (bestChapter >= 0) setActive(bestChapter);
    };

    const observer = new IntersectionObserver(evaluate, {
      rootMargin: "-40% 0px -52% 0px",
      threshold: 0,
    });

    elements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3.5 xl:flex"
      >
        {CHAPTERS.map((chapter, i) => (
          <span key={chapter.num} className="flex items-center gap-2.5">
            <span
              className={`h-px transition-all duration-500 ${i === active ? "w-5 bg-champagne" : "w-2.5 bg-line"}`}
            />
            <span
              className={`font-mono text-[9px] tracking-[0.22em] transition-colors duration-500 ${
                i === active ? "text-champagne-strong" : "text-muted/35"
              }`}
            >
              {chapter.num}
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.22em] transition-all duration-500 ${
                i === active ? "text-champagne-strong opacity-100" : "hidden"
              }`}
            >
              {chapter.label}
            </span>
          </span>
        ))}
      </div>

      {/* Mobile counter */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-3 right-4 z-30 font-mono text-[10px] tracking-[0.18em] text-muted/50 xl:hidden"
      >
        <span className="text-champagne-strong">{CHAPTERS[active].num}</span> / 06
      </div>
    </>
  );
}
