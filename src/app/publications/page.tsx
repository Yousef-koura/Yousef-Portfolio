import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { PublicationHero } from "@/components/publications/PublicationHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { publication } from "@/content/experience";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Publications",
  description:
    "AgRobot — an AI-powered crop disease detection and medication recommendation robot. The IUGRC 8 conference paper by Yousef Koura and collaborators, presented at the Military Technical College, Cairo. Read the full paper.",
  path: "/publications",
});

/**
 * Indexed editorial section label — ProjectDetailPage's mono heading grammar
 * plus the site's numbering device (champagne index over quiet label).
 */
function SectionHeading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <div>
      <p aria-hidden="true" className="font-mono text-xs text-champagne-strong">
        {index}
      </p>
      <h2 id={id} className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        {title}
      </h2>
    </div>
  );
}

/**
 * PUBLICATIONS — PHASE 11 milestone. Hero (shared WorkHero language) →
 * metadata + actions → 01 Abstract (curated, not a paper dump) → measured
 * results strip → 02 Publication (the paper's first page as an archival
 * plate, linking into the full PDF) → 03 Context (Agri-Bot connection +
 * keywords) → WORK/EXPERIENCE's closing forward path. Content renders only
 * CONFIRMED facts from the actual paper (public/Publication/AgRobot_paper_09.pdf).
 */
export default function PublicationsPage() {
  return (
    <>
      <PublicationHero />

      {/* ─── 01 · Abstract — curated to two short paragraphs from the paper's ─── */}
      <Reveal>
        <section
          aria-labelledby="pub-abstract"
          className="mx-auto mt-24 grid max-w-6xl gap-6 border-t border-line px-5 pt-10 sm:px-8 sm:mt-32 md:grid-cols-[200px_1fr] md:gap-16"
        >
          <SectionHeading id="pub-abstract" index="01" title="Abstract" />
          <div className="max-w-2xl space-y-5">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              AgRobot is an inspection robot that uses deep learning to autonomously detect plant
              diseases and recommend their medication — a response to the yield threat infections
              pose to agriculture and food security.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              An NVIDIA Jetson Nano runs the perception pipeline — YOLOv8 locates leaves,
              MobileNetV2 classifies the disease, and a fuzzy-PID controller delivers the most
              stable navigation of the control strategies explored — reaching 96% average detection
              accuracy at 20 frames per second on the embedded hardware.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ─── Measured results — editorial numbers, quiet hairline separators ─── */}
      <section aria-label="Measured results" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-20 border-t border-line pt-10 sm:mt-24 sm:pt-12">
          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {publication.metrics.map((metric, i) => (
              <Reveal key={metric.value} delay={0.08 * i} y={20}>
                <div className="py-8 sm:px-8 sm:py-2 sm:first:pl-0 sm:last:pr-0">
                  <p className="font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl">
                    {metric.value}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                    {metric.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02 · Publication — the paper's first page as an archival plate ─── */}
      <Reveal>
        <section
          aria-labelledby="pub-paper"
          className="mx-auto mt-24 grid max-w-6xl gap-6 border-t border-line px-5 pt-10 sm:px-8 sm:mt-32 md:grid-cols-[200px_1fr] md:gap-16"
        >
          <SectionHeading id="pub-paper" index="02" title="Publication" />
          <div>
            <RevealImage>
              <a
                href={publication.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the full AgRobot paper (PDF)"
                className="group/plate block w-full max-w-3xl"
              >
                <figure className="paper-plate border border-line bg-surface p-2 sm:p-3">
                  <div className="overflow-hidden border border-line">
                    <Image
                      src={publication.preview.src}
                      alt={publication.preview.alt}
                      width={publication.preview.width}
                      height={publication.preview.height}
                      sizes="(min-width: 1152px) 736px, calc(100vw - 2.5rem)"
                      className="h-auto w-full transition-transform duration-700 group-hover/plate:scale-[1.015]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/60">
                    <span>First page — full paper: {publication.pages} pages</span>
                    <span>PDF</span>
                  </figcaption>
                </figure>
              </a>
            </RevealImage>

            {/* Read/download repeat — the obvious path from the preview */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href={publication.pdfHref} variant="primary" external>
                Read the full paper
              </ButtonLink>
              <QuietLink href={publication.pdfHref} external download className="py-3 sm:py-1">
                Download PDF
              </QuietLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── 03 · Context — why this publication lives in the portfolio ─── */}
      <Reveal>
        <section
          aria-labelledby="pub-context"
          className="mx-auto mt-24 grid max-w-6xl gap-6 border-t border-line px-5 pt-10 sm:px-8 sm:mt-32 md:grid-cols-[200px_1fr] md:gap-16"
        >
          <SectionHeading id="pub-context" index="03" title="Context" />
          <div className="max-w-2xl">
            {/* Lineage — the one story this section exists to tell, told in the
                site's own grammar (display name over mono micro-label) with a
                single champagne descent mark between the two artifacts */}
            <div>
              <p className="font-display text-xl tracking-tight text-ink">Agri-Bot</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Graduation project
              </p>
              <ArrowDown size={12} aria-hidden="true" className="my-5 ml-0.5 text-champagne-strong" />
              <p className="font-display text-xl tracking-tight text-ink">
                AgRobot<span className="text-champagne">.</span>
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Research publication — IUGRC 8
              </p>
            </div>
            <p className="mt-10 text-sm leading-relaxed text-muted sm:text-base">
              The same YOLOv8 and MobileNetV2 pipeline on Jetson Nano hardware, carried from the
              working build into formal research. The paper was presented at IUGRC 8, held at the
              Military Technical College in Cairo.
            </p>
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/60">Keywords</p>
              <p className="mt-3 font-mono text-[10px] uppercase leading-loose tracking-[0.22em] text-muted">
                {publication.keywords.join(" / ")}
              </p>
            </div>
            <div className="mt-8">
              <QuietLink href="/work/agri-bot" className="py-3 sm:py-1">
                See the Agri-Bot build
              </QuietLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Forward path — the page must not dead-end (WORK/EXPERIENCE closing pattern).
          Approach tightened ~25% vs the Work page's rhythm so this reads as the
          Context section's natural continuation rather than a new chapter.
          Two exits only: contact (the confident close), paper (for arrivals here). */}
      <section aria-label="Contact" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-32 mt-20 border-t border-line pt-14 sm:mb-40 sm:mt-28 sm:pt-20">
          <h2 className="text-balance font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Questions about the research are welcome<span className="text-champagne">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Methods, metrics, or the build behind the paper — reach out directly for a deeper walkthrough.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact">
              Get in touch
            </ButtonLink>
            <QuietLink href={publication.pdfHref} external>
              Read the paper
            </QuietLink>
          </div>
        </div>
      </section>
    </>
  );
}
