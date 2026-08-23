"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QuietLink } from "@/components/ui/QuietLink";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { num: "01", name: "Mechatronics", caption: "machines & control" },
  { num: "02", name: "Robotics", caption: "sensing & acting" },
  { num: "03", name: "Machine Learning", caption: "intelligence & data" },
  { num: "04", name: "Products", caption: "shipping what it learns" },
] as const;

/* Activation window: the last ~40% of the scene's scroll drives the four
   stages, synced with the champagne line filling across the track. */
const ACTIVATE_FROM = 0.58;

/**
 * THE QUESTION CHANGED · THE PATH — chapters 03+04 merged into ONE beat.
 * Why the shift happened (move → understand) and what the shift was
 * (mechatronics → robotics → ML → products) told as a single scene.
 *
 * Desktop (motion allowed): the outer scene gets an explicit scroll canvas
 * (height set by GSAP on the CONTAINER itself); the only pinned element is
 * one sticky h-screen child fully contained by it — no h-full siblings, no
 * shared-DOM mutation, so nothing can leak into neighbouring sections.
 * Scrub order: first question recedes → second question dominates → the
 * path fades in below → the connecting line fills while stages activate
 * in sequence (active brightens, past quiets, future dims).
 *
 * Mobile/tablet/no-JS/reduced-motion: a quiet vertical sequence with
 * subtle reveals — no pinning, no viewport-height choreography.
 */
export function QuestionPath() {
  const [active, setActive] = useState(0);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const q1Ref = useRef<HTMLParagraphElement | null>(null);
  const q2Ref = useRef<HTMLParagraphElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const pathRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  /* Mobile scrub targets (opacity only — zero layout impact) */
  const mQuestionsRef = useRef<HTMLDivElement | null>(null);
  const mq1Ref = useRef<HTMLDivElement | null>(null);
  const mq2Ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    /* Mobile/tablet — the question swap as a quiet scroll-linked beat:
       first question dims slightly while the second comes forward.
       Opacity-only, scrubbed inside the block's own bounds — no pinning,
       no transforms that could shift neighbouring sections. */
    mm.add("(max-width: 1023px)", () => {
      const wrap = mQuestionsRef.current;
      const q1 = mq1Ref.current;
      const q2 = mq2Ref.current;
      if (!wrap || !q1 || !q2) return;

      const tween = gsap
        .timeline({
          scrollTrigger: { trigger: wrap, start: "top 70%", end: "top 20%", scrub: true },
        })
        .to(q1, { opacity: 0.55, ease: "none", duration: 0.6 }, 0)
        .fromTo(q2, { opacity: 0.8 }, { opacity: 1, ease: "none", duration: 0.6 }, 0);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    /* Desktop only — everything else keeps the stacked rendering. */
    mm.add("(min-width: 1024px)", () => {
      const scene = sceneRef.current;
      const q1 = q1Ref.current;
      const q2 = q2Ref.current;
      const arrow = arrowRef.current;
      const path = pathRef.current;
      const fill = fillRef.current;
      if (!scene || !q1 || !q2 || !arrow || !path || !fill) return;

      /* Scene canvas + absolutely-positioned beats INSIDE the sticky stage
         (the stage itself is the positioned ancestor). Applied only here,
         reverted automatically by matchMedia on leave/resize/unmount. */
      gsap.set(scene, { height: "320vh" });
      gsap.set([q1, q2], {
        position: "absolute",
        left: 0,
        right: 0,
        top: "42%",
        marginInline: "auto",
        maxWidth: "42rem",
        yPercent: -50,
      });
      gsap.set(arrow, { position: "absolute", left: "50%", top: "62%", xPercent: -50 });
      gsap.set(path, { position: "absolute", left: 0, right: 0, bottom: "8%" });

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const t = gsap.utils.clamp(0, 1, (self.progress - ACTIVATE_FROM) / (1 - ACTIVATE_FROM));
              const i = Math.min(STAGES.length - 1, Math.floor(t * STAGES.length));
              setActive((prev) => (prev === i ? prev : i));
            },
          },
        })
        .fromTo(arrow, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.1 }, 0.14)
        .to(q1, { autoAlpha: 0.12, y: -56, scale: 0.96, duration: 0.26 }, 0.16)
        .fromTo(q2, { autoAlpha: 0, y: 72 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out" }, 0.34)
        .fromTo(path, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.56)
        .fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1 - ACTIVATE_FROM, ease: "none" }, ACTIVATE_FROM);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const stageTone = (i: number) => {
    if (i === active) {
      return {
        num: "text-champagne-strong",
        name: "text-ink",
        caption: "text-muted",
        dot: "border-champagne shadow-[0_0_0_4px_color-mix(in_srgb,var(--tk-champagne)_16%,transparent)]",
        dotCore: "bg-champagne",
      };
    }
    if (i < active) {
      return {
        num: "text-muted-strong",
        name: "text-ink/75",
        caption: "text-muted/70",
        dot: "border-champagne/50",
        dotCore: "bg-champagne/60",
      };
    }
    return {
      num: "text-muted/40",
      name: "text-muted/55",
      caption: "text-muted/35",
      dot: "border-line",
      dotCore: "bg-line",
    };
  };

  return (
    <section id="the-path" className="scroll-mt-24 overflow-x-clip py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Chapter mark */}
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
          <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-muted">
            The question changed
          </h2>
          <span aria-hidden="true" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/60">
            Machines → Products
          </span>
        </div>

        {/* ── Mobile / tablet / reduced-motion / no-JS: quiet vertical story ──
               Extra whitespace here is intentional — this is the page's
               visual center; it breathes more than surrounding sections. */}
        <div ref={mQuestionsRef} className="mt-16 lg:hidden">
          <Reveal>
            <div ref={mq1Ref} className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted/70">
                Mechatronics → Robotics
              </p>
              <p className="mt-4 font-display text-[1.7rem] leading-[1.12] tracking-tight text-muted-strong sm:text-4xl">
                How do I make
                <br />
                the machine <span className="text-muted">move?</span>
              </p>
            </div>
          </Reveal>

          <Reveal y={10}>
            <p aria-hidden="true" className="my-9 text-center text-champagne">
              <ArrowDown size={18} strokeWidth={1.5} />
            </p>
          </Reveal>

          <Reveal>
            <div ref={mq2Ref} className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-champagne-strong">
                Machine Learning
              </p>
              <p className="mt-4 font-display text-[2rem] leading-[1.08] tracking-tight text-ink sm:text-5xl">
                How do I make
                <br />
                the machine <span className="text-champagne">understand?</span>
              </p>
            </div>
          </Reveal>

          {/* Wayfinding sentinel — end of "the shift" beat (mobile tree) */}
          <span id="the-shift" aria-hidden="true" className="block" />

          {/* The path — simple numbered progression, subtle per-stage reveals */}
          <ol className="relative mt-16 flex flex-col gap-8 before:absolute before:left-[5px] before:top-3 before:bottom-3 before:w-px before:bg-line before:content-['']">
            {STAGES.map((stage) => (
              <li key={stage.num} className="relative pl-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[7px] flex h-[11px] w-[11px] items-center justify-center rounded-full border border-champagne/50 bg-obsidian"
                >
                  <span className="h-[4px] w-[4px] rounded-full bg-champagne/80" />
                </span>
                <Reveal y={14}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-champagne-strong">{stage.num}</span>
                    <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">{stage.name}</h3>
                  </div>
                  <p className="mt-1.5 pl-[2.05rem] font-mono text-[10px] uppercase tracking-[0.18em] text-muted/80">
                    {stage.caption}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Wayfinding sentinel — scene entry on desktop */}
        <span id="the-shift-lg" aria-hidden="true" className="hidden lg:block" />

        {/* ── Desktop: one controlled sticky scene ──
               Explicit canvas on the container, ONE pinned child inside it;
               every animated beat is absolutely positioned within that child. */}
        <div ref={sceneRef} className="relative hidden lg:block">
          <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden py-20 text-center">
            <p ref={q1Ref}>
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.26em] text-muted/70">
                Mechatronics → Robotics
              </span>
              <span className="block font-display text-4xl leading-[1.08] tracking-tight text-muted-strong xl:text-5xl">
                How do I make
                <br />
                the machine <span className="text-muted">move?</span>
              </span>
            </p>

            <span ref={arrowRef} aria-hidden="true" className="text-champagne">
              <ArrowDown size={18} strokeWidth={1.5} />
            </span>

            <p ref={q2Ref}>
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.26em] text-champagne-strong">
                Machine Learning
              </span>
              <span className="block font-display text-5xl leading-[1.04] tracking-tight text-ink xl:text-6xl">
                How do I make
                <br />
                the machine <span className="text-champagne">understand?</span>
              </span>
            </p>

            <div ref={pathRef} className="w-full">
              <div className="mx-auto w-full max-w-4xl px-8">
                <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em]">
                  <span className="text-muted/70">Four stages, one direction</span>
                  <span className="text-champagne-strong">
                    {String(active + 1).padStart(2, "0")} / 04 — {STAGES[active].name}
                  </span>
                </div>

                <div className="relative mt-12">
                  <span aria-hidden="true" className="absolute left-0 right-0 top-[6px] h-px bg-line" />
                  <span
                    aria-hidden="true"
                    ref={fillRef}
                    className="absolute left-0 right-0 top-[6px] h-px origin-left bg-champagne will-change-transform"
                  />

                  <ol className="relative grid grid-cols-4 gap-8">
                    {STAGES.map((stage, i) => {
                      const tone = stageTone(i);
                      return (
                        <li key={stage.num}>
                          <span
                            aria-hidden="true"
                            className={`flex h-[13px] w-[13px] items-center justify-center rounded-full border bg-obsidian transition-colors duration-500 ${tone.dot}`}
                          >
                            <span
                              className={`h-[5px] w-[5px] rounded-full transition-colors duration-500 ${tone.dotCore}`}
                            />
                          </span>
                          <p
                            className={`mt-6 font-mono text-[10px] tracking-[0.22em] transition-colors duration-500 ${tone.num}`}
                          >
                            {stage.num}
                          </p>
                          <h3
                            className={`mt-2 font-display text-2xl tracking-tight transition-all duration-500 ${tone.name} ${
                              i === active ? "-translate-y-0.5" : ""
                            }`}
                          >
                            {stage.name}
                          </h3>
                          <p
                            className={`mt-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-500 ${tone.caption}`}
                          >
                            {stage.caption}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing narrative — shared, normal flow after the story */}
        <Reveal delay={0.05}>
          <p className="mt-16 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            It starts with physical machines: a mechatronics degree, robots, control systems you can hold. Robotics
            keeps raising questions about intelligence — perception, data, decisions — and chasing those questions
            turned machine learning into the craft. Military service came after university; ML engineering and product
            building came next.
          </p>
        </Reveal>

        <div className="mt-8">
          <QuietLink href="/experience">Full timeline and metrics</QuietLink>
        </div>
      </div>
    </section>
  );
}
