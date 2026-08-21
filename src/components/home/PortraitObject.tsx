import Image from "next/image";

const PORTRAIT_SRC = "/portrait/yousef-portrait.jpeg";

/**
 * Soft radial mask so the graded portrait's edges melt into its Obsidian bed
 * instead of reading as a hard rectangle.
 */
const EDGE_MELT =
  "radial-gradient(ellipse 118% 118% at 46% 40%, #000 55%, rgba(0,0,0,0.62) 74%, transparent 92%)";

/**
 * Duotone editorial portrait (supersedes the plain masked plane; see
 * DECISIONS #30 → #32):
 *
 *   1. An Obsidian gradient bed acts as the duotone shadow end.
 *   2. The photo is grayscaled and composited with `mix-blend-luminosity`,
 *      mapping its luminance onto the bed — shadows sink into Obsidian.
 *   3. A low-opacity champagne `soft-light` grade warms the highlights,
 *      tying the image into the palette without turning it gold.
 *
 * Composition: an asymmetric editorial crop — a taller-than-column frame with
 * a single diagonal cut across the top-right corner, bleeding past the hero
 * grid's right edge on desktop (contained by the hero's overflow-hidden).
 *
 * Motion: a one-time CSS load reveal (frame wipes open while the plane
 * settles from a slight scale), defined under
 * `prefers-reduced-motion: no-preference` in globals.css — reduced-motion
 * visitors see the final state immediately. Afterwards the portrait is
 * fully static: no parallax, no sway, no pointer-follow.
 */
export function PortraitObject() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[min(80vw,340px)] [clip-path:polygon(0_0,74%_0,100%_26%,100%_100%,0_100%)] sm:max-w-[400px] lg:-mr-6 lg:-mt-6 lg:mx-0 lg:w-[min(36vw,470px)] lg:max-w-none xl:-mr-10">
      <div className="portrait-reveal absolute inset-0">
        <div className="portrait-settle absolute inset-0 isolate">
          {/* Duotone shadow end — Obsidian bed */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#12141a] via-obsidian to-black" />

          {/* Luminance-mapped portrait */}
          <Image
            src={PORTRAIT_SRC}
            alt="Yousef Koura — machine learning engineer"
            fill
            preload
            sizes="(min-width: 1024px) 38vw, 80vw"
            className="object-cover object-center brightness-[0.94] contrast-[1.06] grayscale mix-blend-luminosity"
            style={{ WebkitMaskImage: EDGE_MELT, maskImage: EDGE_MELT }}
          />

          {/* Champagne highlight grade */}
          <div aria-hidden="true" className="absolute inset-0 bg-champagne opacity-30 mix-blend-soft-light" />
        </div>
      </div>
    </div>
  );
}
