import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

const facts = [
  { label: "Education", value: "B.Sc. Mechatronics Systems Engineering" },
  { label: "University", value: "MSA University · University of Greenwich, UK" },
  { label: "GPA", value: "3.62 / 4.0" },
  { label: "Base", value: "Menoufia, Egypt" },
  { label: "Military service", value: "Completed" },
  { label: "Currently", value: "Building Movenue — live SaaS" },
];

export function AboutPreview() {
  return (
    <SectionFrame index="02" label="Profile">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            An ML engineer who thinks end-to-end.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Mechatronics-trained ML engineer working across machine learning, computer vision, and data engineering —
            from sensor to deployment, reinforced by Docker/Kubernetes work and building Movenue.
          </p>
          <div className="mt-9">
            <ButtonLink href="/about" variant="ghost">
              More about me
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="border-t border-line">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[128px_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[150px_1fr]"
              >
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{fact.label}</dt>
                <dd className="text-sm leading-relaxed text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </SectionFrame>
  );
}