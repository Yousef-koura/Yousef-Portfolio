import { ArrowUpRight } from "lucide-react";
import type { WorkIndexEntry } from "@/content/projects";

/**
 * Secondary project — a minimal numbered index row. The whole row is the link;
 * the one-line description carries the substance. Deliberately quiet next to
 * the primary compositions so the tier reads as a curated index, not a card
 * wall — with real descriptions and no internal process notes.
 */
export function SecondaryProjectRow({ project, index }: { project: WorkIndexEntry; index: number }) {
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
        <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">{project.summary}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{project.domain}</p>
        {project.timeframe ? (
          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted/70">{project.timeframe}</p>
        ) : null}
      </div>

      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="self-center justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne"
      />
    </a>
  );
}
