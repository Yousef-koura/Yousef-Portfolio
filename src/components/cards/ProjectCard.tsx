import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

/**
 * Secondary project — a minimal numbered index row. The whole row is the link;
 * one metric line carries the evidence. Deliberately silent next to the
 * Movenue feature so the section reads as a curated index, not a card wall.
 */
export function SecondaryProjectRow({ project, index }: { project: Project; index: number }) {
  const primaryLink = project.links[0];

  return (
    <a
      href={primaryLink.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 border-b border-line py-7 sm:grid-cols-[3rem_1fr_auto_1.5rem] sm:gap-x-6 sm:py-8"
    >
      <span aria-hidden="true" className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-champagne">
        0{index + 1}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-xl tracking-tight text-ink transition-colors duration-300 group-hover:text-champagne sm:text-2xl">
          {project.name}
          <span className="sr-only"> (opens in a new tab)</span>
        </h3>
        <p className="mt-1.5 font-mono text-xs text-muted sm:text-sm">{project.evidence}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{project.domain}</p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted/70">{project.timeframe}</p>
      </div>

      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="self-center justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne"
      />
    </a>
  );
}
