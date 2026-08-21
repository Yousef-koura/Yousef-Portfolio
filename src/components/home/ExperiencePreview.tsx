import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { QuietLink } from "@/components/ui/QuietLink";
import { experience } from "@/content/experience";

export function ExperiencePreview() {
  return (
    <SectionFrame
      index="04"
      label="Experience"
      action={<QuietLink href="/experience">Full experience</QuietLink>}
    >
      <ol className="border-t border-line">
        {experience.map((entry, index) => {
          const isCurrent = Boolean(entry.current);
          return (
            <li
              key={`${entry.org}-${entry.role}`}
              className="grid gap-x-10 gap-y-1.5 border-b border-line py-6 sm:grid-cols-[190px_1fr] sm:py-7 lg:grid-cols-[220px_1fr]"
            >
              {/* Timeframe — champagne only for the current role */}
              <Reveal delay={0.04 * index} y={14}>
                <p
                  className={`font-mono text-xs tracking-[0.16em] sm:pt-1 ${
                    isCurrent ? "text-champagne" : "text-muted"
                  }`}
                >
                  {entry.timeframe}
                </p>
              </Reveal>

              {/* Role — one uniform line per entry; summary kept to a single quiet line */}
              <Reveal delay={0.04 * index + 0.04} y={14}>
                <div>
                  <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-lg tracking-tight text-ink sm:text-xl">
                    {entry.role}
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                        isCurrent ? "text-champagne" : "text-muted"
                      }`}
                    >
                      {entry.org}
                    </span>
                    {isCurrent ? (
                      <span className="flex items-center gap-1.5 border border-champagne/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-champagne">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne" />
                        Current
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted/90">{entry.summary}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </SectionFrame>
  );
}
