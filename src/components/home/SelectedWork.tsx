import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { QuietLink } from "@/components/ui/QuietLink";
import { GhostType } from "@/components/ui/GhostType";
import { EvidenceChart } from "@/components/ui/EvidenceChart";
import { SecondaryProjectRow } from "@/components/cards/ProjectCard";
import { featuredProject, secondaryProjects } from "@/content/projects";

export function SelectedWork() {
  const primaryLink = featuredProject.links[0];
  const displayUrl = primaryLink?.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <SectionFrame
      id="work"
      label="Selected Work"
      action={<QuietLink href="/work">All work</QuietLink>}
    >
      {/* Movenue — the primary visual proof. The product leads; words stay out of its way. */}
      <Reveal>
        <article className="group">
          {/* Caption row — name left, live status + domain right */}
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h3 className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {featuredProject.name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-1 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="flex items-center gap-2 text-champagne">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
                {featuredProject.status}
              </span>
              {primaryLink ? (
                <a
                  href={primaryLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-champagne"
                >
                  {displayUrl}
                  <ArrowUpRight size={12} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>

          {/* Full-width screenshot — masked editorial reveal */}
          <div className="mt-8 overflow-hidden border border-line bg-surface transition-colors duration-500 group-hover:border-champagne/30 sm:mt-10">
            <RevealImage>
              <Image
                src={featuredProject.image.src}
                alt={featuredProject.image.alt}
                width={featuredProject.image.width}
                height={featuredProject.image.height}
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.012]"
              />
            </RevealImage>
          </div>

          {/* Hairline info strip — one sentence, one metric, role/timeframe */}
          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:gap-16">
            <p className="max-w-xl text-sm leading-relaxed text-muted">{featuredProject.summary}</p>
            <div className="sm:text-right">
              <p className="font-mono text-xs leading-relaxed text-ink">{featuredProject.evidence}</p>
              <p className="mt-2 font-mono text-[11px] text-muted">
                {featuredProject.role} · {featuredProject.timeframe}
              </p>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Confirmed metrics — one bounded interactive comparison (DECISIONS #33).
          Static data from src/content/evidence.ts; keyboard + screen-reader equivalent. */}
      <Reveal>
        <div className="mt-16 max-w-2xl sm:mt-20">
          <EvidenceChart />
        </div>
      </Reveal>

      {/* Secondary projects — minimal numbered index, ghost "Index" signature behind */}
      <div className="relative mt-24 border-t border-line sm:mt-28">
        <GhostType className="justify-end pr-[2%]" textClassName="text-[clamp(5rem,13vw,11rem)]">
          Index
        </GhostType>
        <p className="sr-only">More projects</p>
        {secondaryProjects.map((project, index) => (
          <Reveal key={project.name} delay={0.05 * (index + 1)} y={20}>
            <SecondaryProjectRow project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
