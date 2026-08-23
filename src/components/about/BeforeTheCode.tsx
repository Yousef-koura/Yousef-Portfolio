import { Reveal } from "@/components/ui/Reveal";
import { SectionFrame } from "@/components/ui/SectionFrame";

/**
 * BEFORE THE CODE — chapter 02. The person before the career, as four
 * editorial entries (number → title → one short line), not employment
 * history: UAE childhood, the academy years, the 2019 return, engineering.
 * Facts only; first person; hairline rows keep it quiet and scannable.
 */
const memories = [
  {
    num: "01",
    title: "Sharjah → Dubai",
    prose: "Born in 2002 — growing up between two cities.",
  },
  {
    num: "02",
    title: "Football",
    prose: "Four years with Emirates Club's youth academy.",
  },
  {
    num: "03",
    title: "2019",
    prose: "Back to Egypt.",
  },
  {
    num: "04",
    title: "Mechatronics",
    prose: "Machines became the starting point.",
  },
] as const;

export function BeforeTheCode() {
  return (
    <SectionFrame id="before-the-code" label="Before the code" meta="2002 — 2019" spacing="compact">
      <h2 className="sr-only">Before the code</h2>

      <ol className="mt-6">
        {memories.map((memory) => (
          <li key={memory.num} className="border-t border-line py-5 first:border-t-0 first:pt-0 sm:py-6">
            <Reveal y={14}>
              <p className="font-mono text-[10px] tracking-[0.24em] text-champagne-strong">{memory.num}</p>
              <h3 className="mt-1.5 font-display text-xl uppercase tracking-tight text-ink sm:text-2xl">
                {memory.title}
              </h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted/90">{memory.prose}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
