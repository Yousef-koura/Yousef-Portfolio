import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { QuietLink } from "@/components/ui/QuietLink";

const facts = [
  { label: "Education", value: "B.Sc. Mechatronics — MSA · Greenwich" },
  { label: "GPA", value: "3.62 / 4.0" },
  { label: "Base", value: "Menoufia, Egypt" },
  { label: "Military service", value: "Completed" },
  { label: "Currently", value: "Building Movenue — live SaaS" },
];

export function AboutPreview() {
  return (
    <SectionFrame index="02" label="Profile">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        {/* The statement carries the section */}
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            An ML engineer who thinks end-to-end.
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted">
            From sensor to deployment — machine learning, computer vision, and data engineering.
          </p>
          <div className="mt-9">
            <QuietLink href="/about">More about me</QuietLink>
          </div>
        </Reveal>

        {/* Facts as a quiet spec list — label/value rows, scanned in seconds */}
        <Reveal delay={0.1}>
          <dl>
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-line/70 py-4 last:border-b last:border-line/70"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{fact.label}</dt>
                <dd className="text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
