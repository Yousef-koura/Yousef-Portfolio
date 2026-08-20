import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { experience } from "@/content/experience";

export function ExperiencePreview() {
  return (
    <SectionFrame
      index="03"
      label="Experience"
      title="A trajectory across ML, engineering, and product."
      action={
        <ButtonLink href="/experience" variant="ghost">
          Full experience
        </ButtonLink>
      }
    >
      <ol>
        {experience.map((entry, index) => (
          <li
            key={`${entry.org}-${entry.role}`}
            className="grid gap-3 border-b border-line py-8 first:border-t sm:grid-cols-[150px_1fr] sm:gap-12 sm:py-10"
          >
            <Reveal delay={0.02 * index}>
              <p className="font-mono text-xs tracking-[0.15em] text-muted sm:pt-1.5">{entry.timeframe}</p>
            </Reveal>
            <Reveal delay={0.04 * index}>
              <div>
                <h3 className="flex flex-wrap items-center gap-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
                  {entry.role}
                  {entry.current ? (
                    <span className="flex items-center gap-1.5 border border-champagne/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-champagne">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne" />
                      Current
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-champagne">{entry.org}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{entry.location}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{entry.summary}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}