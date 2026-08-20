"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const PORTRAIT_SRC = "/portrait/yousef-portrait.jpeg";

const IDLE_Y = 3.5; // degrees — continuous idle sway
const IDLE_X = 2; // degrees
const MOUSE_Y = 6; // degrees — pointer-follow range
const MOUSE_X = 4; // degrees

/**
 * Soft radial mask so the portrait's near-black background melts into the
 * obsidian hero instead of reading as a hard rectangle. Generous ellipse —
 * only the outer edges fade; the subject stays fully readable. The main image
 * is scaled slightly larger than its plane so masked edges bleed past the
 * container, letting the composition extend beyond the frame.
 */
const MASK = "radial-gradient(ellipse 112% 112% at 50% 44%, #000 52%, rgba(0,0,0,0.72) 72%, transparent 90%)";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function PortraitObject() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const canInteract = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    canInteract.current = true;
  }, []);

  const idleY = useMotionValue(0);
  const idleX = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 50, damping: 16, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 50, damping: 16, mass: 0.8 });

  const rotateY = useTransform(() => idleY.get() + springX.get() * MOUSE_Y);
  const rotateX = useTransform(() => idleX.get() + springY.get() * MOUSE_X);

  useEffect(() => {
    if (reduce) return;
    const cY = animate(idleY, [0, IDLE_Y, 0, -IDLE_Y, 0], {
      duration: 18,
      ease: "easeInOut",
      repeat: Infinity,
    });
    const cX = animate(idleX, [0, IDLE_X, 0, -IDLE_X, 0], {
      duration: 22,
      ease: "easeInOut",
      repeat: Infinity,
    });
    return () => {
      cY.stop();
      cX.stop();
    };
  }, [reduce, idleY, idleX]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canInteract.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const onPointerLeave = () => {
    if (!canInteract.current) return;
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[min(80vw,380px)] [perspective:1600px] lg:max-w-none lg:w-full lg:max-h-[75vh]"
    >
      {/* Ambient key light behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[16%] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 74% 64% at 46% 36%, rgba(201,168,106,0.14), transparent 62%)",
        }}
      />

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative aspect-[4/5] w-full [transform-style:preserve-3d] will-change-transform"
      >
        {/* Deep echo layer — furthest back, faintest, widest offset */}
        <div aria-hidden="true" className="absolute inset-0" style={{ transform: "translateZ(-150px)" }}>
          <div className="relative h-full w-full -translate-x-[7%] -translate-y-[5%] scale-[1.12]">
            <Image
              src={PORTRAIT_SRC}
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 80vw"
              className="object-cover opacity-20 blur-[6px] brightness-[0.45]"
              style={{ WebkitMaskImage: MASK, maskImage: MASK }}
            />
          </div>
        </div>

        {/* Near echo layer — duplicated, offset, pushed back in Z for parallax depth */}
        <div aria-hidden="true" className="absolute inset-0" style={{ transform: "translateZ(-90px)" }}>
          <div className="relative h-full w-full -translate-x-[4%] -translate-y-[3%] scale-[1.06]">
            <Image
              src={PORTRAIT_SRC}
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 80vw"
              className="object-cover opacity-30 blur-[4px] brightness-[0.55]"
              style={{ WebkitMaskImage: MASK, maskImage: MASK }}
            />
          </div>
        </div>

        {/* Main portrait plane */}
        <div className="absolute inset-0" style={{ transform: "translateZ(0px)" }}>
          {/* Image bleeds past the plane edge, masked so the fade reads as
              subject extending beyond the frame rather than a hard rectangle */}
          <div className="absolute -inset-[4%]">
            <Image
              src={PORTRAIT_SRC}
              alt="Yousef Koura — machine learning engineer"
              width={640}
              height={641}
              priority
              sizes="(min-width: 1024px) 42vw, 80vw"
              className="h-full w-full object-cover scale-[1.03] object-center"
              style={{ WebkitMaskImage: MASK, maskImage: MASK }}
            />
          </div>

          {/* Subtle film grain over the portrait */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay"
            style={{ backgroundImage: NOISE }}
          />

          {/* Cinematic grade — warm champagne rim light on the left/top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "linear-gradient(115deg, rgba(201,168,106,0.26), transparent 48%)",
            }}
          />
          {/* Top-edge champagne kiss — restrained rim highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
          />
          {/* Fade into the dark at the base */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,12,14,0.24), transparent 30%, transparent 68%, rgba(11,12,14,0.5))",
            }}
          />

          {/* Inner editorial hairline frame */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-[8%] border border-line/50" />

          {/* Corner framing ticks */}
          <span aria-hidden="true" className="absolute left-0 top-0 h-5 w-5 border-l border-t border-line/80" />
          <span aria-hidden="true" className="absolute right-0 top-0 h-5 w-5 border-r border-t border-line/80" />
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-line/80" />
          <span aria-hidden="true" className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-line/80" />
        </div>

        {/* Foreground detail layer — floats in front, adds parallax */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Horizontal light guide */}
          <div className="absolute inset-x-0 top-[58%] flex items-center gap-3 pr-10">
            <span className="h-px flex-1 bg-champagne/30" />
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/70" />
          </div>
          {/* Technical readout */}
          <div className="absolute bottom-[7%] left-0 flex items-center gap-2.5 border border-line/70 bg-obsidian/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-champagne">F/2.8</span>
            <span aria-hidden="true">·</span>
            <span>1/125</span>
            <span aria-hidden="true">·</span>
            <span>35mm</span>
          </div>
        </div>
      </motion.div>

      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 left-[6%] right-[6%] -z-10 h-10 rounded-[50%] bg-black/60 blur-lg"
      />

      {/* Editorial vertical strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 top-1/2 hidden origin-center -translate-y-1/2 rotate-90 lg:block"
      >
        <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-muted/70">
          Yousef Koura — Machine Learning Engineer — Menoufia, Egypt
        </p>
      </div>

      {/* Status tag */}
      <div className="absolute -right-2 -top-4 hidden items-center gap-2 rounded-full border border-line/70 bg-obsidian/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted lg:flex">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
        Open to work
      </div>
    </div>
  );
}