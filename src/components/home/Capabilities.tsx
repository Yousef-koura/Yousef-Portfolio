import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { capabilities } from "@/content/experience";

export function Capabilities() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            title="Tools I use to ship."
            description="A contextual view of my working toolkit — the skills appear where they matter, across projects and experience."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((group, index) => (
            <Reveal key={group.title} delay={0.05 * index}>
              <div className="flex h-full flex-col border border-line bg-surface p-7">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl tracking-tight text-ink">{group.title}</h3>
                  <span aria-hidden="true" className="font-mono text-xs text-muted">
                    0{index + 1}
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}