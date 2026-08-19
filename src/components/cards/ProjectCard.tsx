import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Tag } from "@/components/ui/Tag";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group grid gap-8 rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-champagne/40 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
      <div className="relative overflow-hidden rounded-sm border border-line">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 border border-line bg-obsidian/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-champagne backdrop-blur">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
          {project.status}
        </span>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-champagne">{project.kind}</p>
        <h3 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">{project.name}</h3>
        <p className="mt-2 font-mono text-xs text-muted">
          {project.domain} · {project.role} · {project.timeframe}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>
        <p className="mt-5 border-l-2 border-champagne pl-4 text-sm leading-relaxed text-ink">{project.evidence}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
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
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links[0];
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors duration-300 hover:border-champagne/40">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-champagne">{project.domain}</p>
        <h3 className="mt-2 font-display text-2xl tracking-tight text-ink">{project.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-4 font-mono text-xs text-ink">{project.evidence}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
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
    </article>
  );
}