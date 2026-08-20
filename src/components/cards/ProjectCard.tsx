import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Tag } from "@/components/ui/Tag";

/**
 * Featured project — the visual leads. Full-width screenshot with an editorial
 * caption overlaid on the image; supporting facts sit below in an asymmetric
 * hairline strip rather than a generic card.
 */
export function FeaturedProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links[0];
  const displayUrl = primaryLink?.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article className="group">
      <figure className="relative overflow-hidden border border-line bg-surface">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Bottom scrim so the caption stays legible over bright screenshots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
          <div className="flex flex-col items-start gap-3">
            <span className="flex items-center gap-1.5 border border-line bg-obsidian/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-champagne backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
              {project.status}
            </span>
            <h3 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {project.name}
            </h3>
          </div>
          {displayUrl ? (
            <span className="flex items-center gap-1.5 border border-line bg-obsidian/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur">
              {displayUrl}
              <ArrowUpRight size={12} aria-hidden="true" />
            </span>
          ) : null}
        </figcaption>
      </figure>

      <div className="grid gap-8 border-x border-b border-line p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:p-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-champagne">{project.kind}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{project.summary}</p>
          <p className="mt-5 flex items-start gap-2 border-l-2 border-champagne pl-3 font-mono text-xs leading-relaxed text-ink">
            {project.evidence}
          </p>
        </div>
        <div className="lg:border-l lg:border-line lg:pl-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {project.domain} · {project.role} · {project.timeframe}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.links.map((link) => (
              <ButtonLink key={link.label} href={link.href} external={link.external}>
                {link.label}
              </ButtonLink>
            ))}
            <ButtonLink href="/work" variant="ghost">
              See all work
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Secondary project — an editorial index row (numbered, hairline-separated)
 * with a small visual thumb on the right. Deliberately different from the
 * featured composition so the section never reads as a card wall.
 */
export function SecondaryProjectRow({ project, index }: { project: Project; index: number }) {
  const primaryLink = project.links[0];

  return (
    <article className="group grid items-center gap-6 border-b border-line py-8 sm:grid-cols-[1fr_220px] sm:gap-10 lg:py-9">
      <div>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="font-mono text-xs text-muted">
            0{index + 1}
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-champagne/40" />
          <p className="font-mono text-[11px] uppercase tracking-widest text-champagne">{project.domain}</p>
        </div>
        <h3 className="mt-3 font-display text-2xl tracking-tight text-ink transition-colors duration-300 group-hover:text-champagne sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-3 font-mono text-xs text-ink">{project.evidence}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={primaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:text-champagne"
          >
            {primaryLink.label}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{project.timeframe}</span>
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-line sm:w-full">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 640px) 220px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    </article>
  );
}