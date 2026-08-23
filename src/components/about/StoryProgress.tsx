"use client";

import { useEffect, useState } from "react";

/**
 * STORY PROGRESS — a whisper of wayfinding across the five chapters
 * (01 Who I am · 02 Before the code · 03 The path · 04 What I care about
 * · 05 Now). Desktop: a fixed numeral rail on the left gutter; the active
 * chapter's label surfaces beside its numeral. Mobile: a tiny fixed
 * "0X / 05" counter. Purely decorative (aria-hidden, pointer-events-none)
 * — navigation lives in the header. Section → chapter mapping is
 * order-based; IntersectionObserver drives the active state.
 */
const CHAPTERS = [
  { num: "01", label: "Who I am" },
  { num: "02", label: "Before the code" },
  { num: "03", label: "The path" },
  { num: "04", label: "What I care about" },
  { num: "05", label: "Now" },
] as const;

const SPY_IDS = [
  "about-start",
  "before-the-code",
  "the-path",
  "principles",
  "now",
  "about-final",
] as const;

const CHAPTER_FOR_SECTION: Record<(typeof SPY_IDS)[number], number> = {
  "about-start": 0,
  "before-the-code": 1,
  "the-path": 2,
  principles: 3,
  now: 4,
  "about-final": 4,
};

export function StoryProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.id);
        if (visible.length === 0) return;
        // Latest section in document order wins
        const current = [...SPY_IDS].reverse().find((id) => visible.includes(id));
        if (current) setActive(CHAPTER_FOR_SECTION[current]);
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
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
        <span className="text-champagne-strong">{CHAPTERS[active].num}</span> / 05
      </div>
    </>
  );
}
