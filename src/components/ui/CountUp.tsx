"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Count-up proof metric.
 *
 * The final value is rendered into the static DOM so it is readable without
 * JavaScript or animation. Under `prefers-reduced-motion` (or before the
 * scroll trigger fires) the number stays at its final value — no animation,
 * no transforms, nothing hidden.
 *
 * When motion is allowed, the number counts 0 → value once when the element
 * enters the viewport (GSAP ScrollTrigger, `once: true`), scoped to this
 * component's GSAP context so it cleans up on unmount.
 */
type CountUpProps = {
  /** Final numeric value (rendered verbatim into the static DOM). Optional
   *  when a static `text` override is provided instead (e.g. "Live"). */
  value?: number;
  /** Short label shown beneath the number. */
  label: string;
  /** Preserved hedge from the source, e.g. "up to". Rendered verbatim. */
  qualifier?: "up to";
  /** Tiny context line beneath the label. */
  context: string;
  /** Optional static text rendered as the big value instead of animating a
   *  number (used for non-numeric proof such as "Live"). */
  text?: string;
  className?: string;
};

export function CountUp({
  value = 0,
  label,
  qualifier,
  context,
  text,
  className = "",
}: CountUpProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const animated = text === undefined;

  useEffect(() => {
    if (!animated) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = numRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        { num: 0 },
        { num: value },
        {
          duration: 1,
          ease: "power3.out",
          snap: { num: 1 },
          onUpdate: function () {
            el.textContent = Math.round(
              (this.targets()[0] as unknown as { num: number }).num,
            ).toLocaleString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [animated, value]);

  return (
    <div className={`portal-snapshot__item ${className}`}>
      <div className="portal-snapshot__value">
        {qualifier ? (
          <span className="portal-snapshot__qualifier">up to</span>
        ) : null}
        <span ref={numRef} className="portal-snapshot__number">
          {animated ? value : text}
        </span>
      </div>
      <div className="portal-snapshot__label">{label}</div>
      <div className="portal-snapshot__context">{context}</div>
    </div>
  );
}
