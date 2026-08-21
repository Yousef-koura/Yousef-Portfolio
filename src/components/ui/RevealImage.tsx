"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealImageProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Editorial masked image reveal — the frame wipes open top-to-bottom while the
 * image settles from a slight scale. Runs once, on scroll entry. Under
 * prefers-reduced-motion (or before hydration) the image simply renders.
 */
export function RevealImage({ children, className = "" }: RevealImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const inner = el.querySelector("[data-reveal-inner]");
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.06 },
          {
            scale: 1,
            duration: 1.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`[clip-path:inset(0_0_0_0)] ${className}`}>
      <div data-reveal-inner className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
