import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/content/experience";

export function Capabilities() {
  return (
    <SectionFrame label="Capabilities">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
        {capabilities.map((group, index) => (
          <Reveal key={group.title} delay={0.06 * index} y={18}>
            <div className="border-t border-line pt-5">
              <h3 className="font-display text-lg tracking-tight text-ink">{group.title}</h3>
              <ul className="mt-4 flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
