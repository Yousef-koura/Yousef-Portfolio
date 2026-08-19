"use client";

import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function scrollToTarget(target: string) {
  if (typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.querySelector(target)?.scrollIntoView();
    return;
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -72, duration: 1.1 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}