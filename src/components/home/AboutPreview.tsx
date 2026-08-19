import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";

const facts = [
  { label: "Education", value: "B.Sc. Mechatronics Systems Engineering — MSA University · University of Greenwich, UK" },
  { label: "GPA", value: "3.62 / 4.0" },
  { label: "Base", value: "Menoufia, Egypt" },
  { label: "Military service", value: "Completed" },
  { label: "Currently", value: "Building Movenue — live SaaS" },
];

export function AboutPreview() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Profile</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              An ML engineer who thinks end-to-end.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Junior Machine Learning Engineer with a Mechatronics Engineering background and hands-on experience across
              machine learning, computer vision, and data engineering — gained through internships and applied projects.
              Interested in machine learning and building end-to-end AI-driven products.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              That mechatronics foundation means I think about AI systems from sensor to deployment — reinforced by
              hands-on Docker and Kubernetes work and the product work behind Movenue.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="ghost">
                More about me
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border border-line bg-surface">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[132px_1fr] gap-4 border-b border-line px-6 py-5 last:border-b-0"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{fact.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}