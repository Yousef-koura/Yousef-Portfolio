import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { DemoVideo } from "@/components/work/DemoVideo";
import { WorkHero } from "@/components/work/WorkHero";
import { projectDetails } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Seven real projects — machine learning, computer vision, LLM systems, data engineering, and a live SaaS platform. Every entry links to real repositories and running products.",
};

function StatusChip({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-champagne">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
      {status}
    </span>
  );
}

/**
 * WORK index — PHASE 4B grid. One full-width flagship composition leads;
 * the remaining six builds sit in a uniform responsive grid of cards, each
 * linking to its own `/work/[slug]` detail page. Builds without a capture
 * get a quiet labeled panel — no imagery is invented.
 */
export default function WorkPage() {
  const [flagship, ...tiles] = projectDetails;

  return (
    <>
      <WorkHero />

      {/* ─── Flagship · Movenue, full-width composition ─── */}
      {flagship ? (
        <Reveal>
          <section aria-label={`${flagship.name} — flagship build`} className="mx-auto mt-24 max-w-6xl px-5 sm:mt-32 sm:px-8">
            <div className="border-t border-line">
              <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 pt-6 sm:pt-8">
                <h2 className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span aria-hidden="true" className="font-mono text-xs text-champagne-strong">01</span>
                  <span className="font-display text-5xl leading-none tracking-tight text-ink sm:text-7xl">
                    {flagship.name}
                  </span>
                </h2>
                <div className="pb-1 text-right font-mono text-[10px] uppercase tracking-[0.22em]">
                  <p className="text-muted">{flagship.kind}</p>
                  {flagship.status ? (
                    <p className="mt-1.5">
                      <StatusChip status={flagship.status} />
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* The capture links straight into the detail page — contained
                within the section (max-w-4xl) so it reads as the flagship
                visual without going full-bleed edge to edge */}
            {flagship.image ? (
              <Link
                href={`/work/${flagship.slug}`}
                aria-label={`Open ${flagship.name} project page`}
                className="group/fl mx-auto mt-10 block w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface sm:mt-12"
              >
                <Image
                  src={flagship.image.src}
                  alt={flagship.image.alt}
                  width={flagship.image.width}
                  height={flagship.image.height}
                  preload
                  sizes="(min-width: 960px) 896px, 100vw"
                  className="h-auto w-full transition-transform duration-700 group-hover/fl:scale-[1.01]"
                />
              </Link>
            ) : null}

            <div className="grid gap-8 border-b border-line pt-8 pb-10 sm:grid-cols-[1.2fr_1fr] sm:gap-16">
              <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{flagship.summary}</p>
              <div className="sm:text-right">
                {flagship.results?.map((metric) => (
                  <p key={metric.value} className="font-mono text-xs leading-relaxed text-ink">
                    <span className="text-champagne-strong">{metric.value}</span> {metric.label}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] text-muted">{flagship.timeframe}</p>
              <Link
                href={`/work/${flagship.slug}`}
                className="group/cs inline-flex items-center gap-2 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-champagne-strong transition-colors duration-300 hover:text-champagne"
              >
                Read the project page
                <ArrowRight size={12} aria-hidden="true" className="transition-transform duration-300 group-hover/cs:translate-x-1" />
              </Link>
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* ─── Grid · six uniform tiles, one per build ─── */}
      <section aria-label="All projects" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-24 border-t border-line pt-4 sm:mt-32">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">All projects</span>
        </div>

        {/* Two columns from the smallest breakpoint up (user-directed density
            change); three from lg. Half-width reflow handled per-element below. */}
        <div className="mt-10 grid grid-cols-2 gap-4 pb-4 sm:gap-8 lg:grid-cols-3">
          {tiles.map((project, i) => (
            <Reveal key={project.slug} delay={0.05 * ((i % 3) + 1)} y={20}>
              {/* Card is a positioned container rather than the link itself so
                  the video controls are real, independently focusable buttons
                  (no button-in-anchor nesting); the title link stretches across
                  the card via its inset pseudo-element instead. */}
              <div className="group/tile relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-champagne hover:border-champagne/40">
                {/* Thumb — the build's own capture, or a quiet labeled panel */}
                <div className="relative overflow-hidden border-b border-line">
                  {project.image ? (
                    project.video ? (
                      <DemoVideo
                        video={project.video}
                        poster={project.video.poster ?? project.image}
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        label={`${project.name} demo`}
                        aspect="16 / 9"
                        className="bg-transparent"
                      />
                    ) : (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={project.image.src}
                          alt=""
                          width={project.image.width}
                          height={project.image.height}
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/tile:scale-[1.03]"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex aspect-video flex-col items-center justify-center gap-2 bg-surface px-4 text-center sm:gap-3 sm:px-6">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne/70" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        {project.domain}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex grow flex-col p-4 sm:p-7">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span aria-hidden="true" className="text-champagne-strong">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    {project.status ? <StatusChip status={project.status} /> : null}
                  </div>

                  <h3 className="mt-4 font-display text-base leading-tight tracking-tight text-ink sm:mt-5 sm:text-2xl">
                    <Link
                      href={`/work/${project.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-muted sm:mt-2">
                    {project.kind}
                  </p>

                  {/* Summary is a desktop-only density affordance — half-width
                      mobile cards stay compact (title/status/tags/date only) */}
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted hidden lg:block sm:mt-4">
                    {project.summary}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-2 pt-5 sm:pt-6">
                    <span className="font-mono text-[10px] leading-snug text-muted/80 sm:text-[11px]">
                      {project.timeframe ?? project.domain}
                    </span>
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-all duration-300 group-hover/tile:translate-x-1 group-hover/tile:text-champagne"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Forward path — the page must not dead-end */}
      <section aria-label="Contact" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-32 mt-28 border-t border-line pt-20 sm:mb-40 sm:mt-36 sm:pt-24">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Questions about any build above are welcome<span className="text-champagne">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Architecture, metrics, or code — reach out directly for a deeper walkthrough.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
            <QuietLink href="mailto:yousefahmed.ae20@gmail.com" external>
              Email directly
            </QuietLink>
          </div>
        </div>
      </section>
    </>
  );
}
