"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  SiDatabricks,
  SiDocker,
  SiFastapi,
  SiKubernetes,
  SiNvidia,
  SiOpencv,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiUltralytics,
} from "@icons-pack/react-simple-icons";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionFrame } from "@/components/ui/SectionFrame";

/**
 * ABOUT capabilities wall (DECISIONS #51, restructured per #52). Continuous
 * header-less rows of chips that travel in alternating directions relative to
 * page scroll (row 1 left→right, row 2 right→left, row 3 left→right), so the
 * section reads as one continuous logo-wall texture rather than three
 * separately-headed blocks. The cluster taxonomy itself stays on Home's
 * Capabilities section.
 *
 * Row composition: all confirmed capabilities are dealt cluster-interleaved
 * and width-balanced so EVERY row's natural content genuinely overflows the
 * column at every breakpoint. This is the fix for the prior pass's row-2 bug:
 * that row ("Computer Vision & Robotics", 7 chips) was the only one whose
 * natural content fit INSIDE the column, so its motion depended entirely on
 * the min-w floor manufacturing overflow — whenever that utility was absent
 * from the compiled CSS (the documented Turbopack dev-cache case), maxX
 * measured 0 and the row sat static while the others moved. Motion now
 * derives from real content overflow only; no synthetic space, no slack to
 * distribute, uniform gaps throughout.
 *
 * Chips with a real Simple Icons mark get one (recolored to the palette —
 * muted default, champagne on hover/focus within the 5% accent discipline);
 * technique/methodology terms render as identical text-only chips.
 * Brand/icon availability verified against @icons-pack/react-simple-icons
 * v13.15.1 — Delta Lake and AWS marks were removed upstream and do not
 * exist there, so those two render as text chips.
 *
 * Reduced motion: `motion-reduce:` utilities switch every row to a fully
 * static wrapped grid at first paint (CSS media query — no hydration wait),
 * and the scroll-linked x binding is additionally gated off via
 * useReducedMotion. No clipping, no masking, everything legible. All items
 * stay ordinary <li> text in static DOM order for screen readers regardless
 * of scroll state; no focusable elements inside tracks.
 */

/* Same library and same per-technology mappings WORK's tech-icons.tsx uses
   (YOLOv8→Ultralytics, Jetson Nano→NVIDIA); never introduces a technology. */
const brandIcons = {
  Python: SiPython,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  OpenCV: SiOpencv,
  "YOLOv8": SiUltralytics,
  "Jetson Nano": SiNvidia,
  Databricks: SiDatabricks,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  FastAPI: SiFastapi,
} as const;

type ScrollDirection = "ltr" | "rtl";

/**
 * All 25 confirmed capabilities (zero added/removed vs the clusters in
 * content/experience.ts), dealt round-robin from the interleaved cluster
 * sequence into width-balanced rows (~1200–1290px natural at desktop vs the
 * ~1090px column) so every row overflows on its own merits. Within-row order
 * preserves each cluster's internal ordering.
 */
const capabilityRows: readonly string[][] = [
  [
    "Python",
    "PyTorch",
    "Neural Networks",
    "YOLOv8",
    "Transfer Learning",
    "Object Detection (YOLO)",
    "Docker",
    "FastAPI",
  ],
  [
    "TensorFlow",
    "ETL / ELT",
    "OpenCV",
    "CNNs",
    "Delta Lake",
    "Databricks",
    "Star Schema",
    "LLMs",
    "RAG",
    "AWS",
  ],
  [
    "SQL",
    "Supervised & Unsupervised Learning",
    "Medallion Architecture",
    "MobileNetV2",
    "Jetson Nano",
    "Fuzzy PID",
    "Kubernetes",
  ],
];

function CapabilityRow({ items, direction }: { items: readonly string[]; direction: ScrollDirection }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [maxX, setMaxX] = useState(0);
  const reduce = useReducedMotion();

  /* Overflow distance drives how far the row may travel; clamped to 0 when a
     row fits its viewport, which makes the transform a no-op there. With the
     width-balanced composition above this never happens in practice — but if
     it ever did, the row degrades gracefully to static instead of relying on
     manufactured space. */
  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setMaxX(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], direction === "ltr" ? [-maxX, 0] : [0, -maxX]);

  return (
    <div ref={sectionRef}>
      {/* Viewport clips the traveling track; under reduced motion both the
          clip and the edge fade are removed so the grid reads plainly. */}
      <div
        ref={viewportRef}
        className="overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]"
      >
        <motion.ul
          ref={trackRef}
          style={reduce ? undefined : { x }}
          className="flex w-max gap-3 py-1 will-change-transform sm:gap-4 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:transform-none"
        >
          {items.map((item) => {
            const Icon = brandIcons[item as keyof typeof brandIcons];
            return (
              <li
                key={item}
                className="group/chip inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 sm:px-5"
              >
                {Icon ? (
                  <Icon
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-colors duration-300 group-hover/chip:text-champagne group-focus-within/chip:text-champagne"
                  />
                ) : null}
                <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover/chip:text-ink group-focus-within/chip:text-ink">
                  {item}
                </span>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}

export function CapabilitiesWall() {
  return (
    <SectionFrame label="Capabilities">
      {/* Heading integrity: the visible cluster headers were removed so the
          rows read continuously; this keeps the section in the document
          outline for assistive tech. */}
      <h3 className="sr-only">Technologies and methods</h3>
      <div className="flex flex-col gap-10 sm:gap-12">
        {capabilityRows.map((row, index) => (
          <CapabilityRow key={index} items={row} direction={index % 2 === 0 ? "ltr" : "rtl"} />
        ))}
      </div>
    </SectionFrame>
  );
}
