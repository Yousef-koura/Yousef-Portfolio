import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Tag } from "@/components/ui/Tag";
import { SecondaryProjectRow } from "@/components/cards/ProjectCard";
import { featuredProject, secondaryProjects } from "@/content/projects";

export function SelectedWork() {
  const primaryLink = featuredProject.links[0];
  const displayUrl = primaryLink?.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <SectionFrame
      id="work"
      index="01"
      label="Selected Work"
      title="Evidence, not adjectives."
      description="A curated look at how I build — from production SaaS to computer vision systems and data pipelines."
      action={
        <ButtonLink href="/work" variant="ghost">
          All work
        </ButtonLink>
      }
    >
      {/* Movenue — flagship editorial composition */}
      <Reveal>
        <article className="group">
          {/* Top strip — name, domain, live status */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne">
                  {featuredProject.status}
                </span>
              </div>
              <h3 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {featuredProject.name}
              </h3>
            </div>
            {primaryLink ? (
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-champagne hover:text-champagne"
              >
                {displayUrl}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ) : null}
          </div>

          {/* Editorial body — asymmetric two-column */}
          <div className="grid gap-10 pt-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14 lg:pt-10">
            {/* Left — description, role, tags */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-champagne">
                  {featuredProject.kind}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  {featuredProject.summary}
                </p>
                <p className="mt-5 flex items-start gap-2 border-l-2 border-champagne/70 pl-3 font-mono text-xs leading-relaxed text-ink/90">
                  {featuredProject.evidence}
                </p>
              </div>
              <div className="mt-8">
                <p className="font-mono text-[11px] text-muted">
                  {featuredProject.role} · {featuredProject.timeframe}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {featuredProject.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — dominant screenshot */}
            <div className="relative overflow-hidden border border-line bg-surface transition-colors duration-500 group-hover:border-champagne/30">
              <Image
                src={featuredProject.image.src}
                alt={featuredProject.image.alt}
                width={featuredProject.image.width}
                height={featuredProject.image.height}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                priority
              />
              {/* Subtle bottom gradient for depth */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          </div>
        </article>
      </Reveal>

      {/* Secondary projects — editorial index rows */}
      <div className="mt-16 border-t border-line sm:mt-20">
        {secondaryProjects.map((project, index) => (
          <Reveal key={project.name} delay={0.05 * (index + 1)}>
            <SecondaryProjectRow project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
