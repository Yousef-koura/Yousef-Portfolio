import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/content/experience";

export function Capabilities() {
  return (
    <SectionFrame
      index="05"
      label="Capabilities"
      title="Tools I use to ship."
      description="A contextual view of my working toolkit — skills shown where they matter."
    >
      <div className="border-t border-line">
        {capabilities.map((group, index) => (
          <Reveal key={group.title} delay={0.05 * index}>
            <div className="grid gap-4 border-b border-line py-8 sm:grid-cols-[240px_1fr] sm:gap-10 sm:py-9">
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl tracking-tight text-ink">{group.title}</h3>
              </div>
              <p className="font-mono text-xs uppercase leading-loose tracking-wider text-muted">
                {group.items.map((item, itemIndex) => (
                  <span key={item}>
                    {itemIndex > 0 ? <span aria-hidden="true" className="mx-2.5 text-line">/</span> : null}
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}