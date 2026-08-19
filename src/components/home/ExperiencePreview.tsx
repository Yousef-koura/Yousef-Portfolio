import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { experience } from "@/content/experience";

export function ExperiencePreview() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Experience"
            title="A trajectory across ML, engineering, and product."
            action={
              <ButtonLink href="/experience" variant="ghost">
                Full experience
              </ButtonLink>
            }
          />
        </Reveal>

        <ol className="border-t border-line">
          {experience.map((entry, index) => (
            <Reveal key={`${entry.org}-${entry.role}`} delay={0.04 * index}>
              <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[220px_1fr] sm:gap-10 lg:py-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">{entry.timeframe}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted/70">{entry.location}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">{entry.role}</h3>
                    <span className="text-muted">—</span>
                    <span className="text-base text-muted">{entry.org}</span>
                    {entry.current && (
                      <span className="flex items-center gap-1.5 border border-champagne/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-champagne">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne" />
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{entry.summary}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}