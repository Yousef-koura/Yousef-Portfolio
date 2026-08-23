import { Reveal } from "@/components/ui/Reveal";
import { SectionFrame } from "@/components/ui/SectionFrame";

/**
 * BEFORE THE CODE — chapter 01. The person before the career, presented as
 * a memory sequence (year → moment), not employment history: UAE childhood,
 * the academy years, the 2019 return, engineering. Facts only (#51(a));
 * first person; every row is a small spine node on a shared hairline.
 */
const memories = [
  {
    meta: "2002 — UAE",
    title: "A childhood between two cities",
    prose: "Born in 2002; growing up split between Sharjah and Dubai.",
  },
  {
    meta: "AGES 15 – 18",
    title: "Football, taken seriously",
    prose: "Four years on the left wing at the Emirates Club youth academy.",
  },
  {
    meta: "2019",
    title: "Back to Egypt",
    prose: "University brought me home — engineering came next.",
  },
  {
    meta: "NEXT",
    title: "Machines, formally",
    prose: "A mechatronics engineering degree — and the questions that lead beyond it.",
  },
] as const;

export function BeforeTheCode() {
  return (
    <SectionFrame id="before-the-code" label="Before the code" meta="2002 — 2019" spacing="compact">
      <h2 className="sr-only">Before the code</h2>

      <ol className="relative mt-8 flex flex-col gap-8 before:absolute before:left-[5px] before:top-3 before:bottom-3 before:w-px before:bg-line before:content-['']">
        {memories.map((memory) => (
          <li key={memory.meta} className="relative pl-8">
            {/* Spine node */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[7px] flex h-[11px] w-[11px] items-center justify-center rounded-full border border-line bg-obsidian"
            >
              <span className="h-[4px] w-[4px] rounded-full bg-champagne" />
            </span>
            <Reveal y={16}>
              <p className="font-mono text-[10px] tracking-[0.22em] text-champagne-strong">{memory.meta}</p>
              <h3 className="mt-1.5 font-display text-lg tracking-tight text-ink sm:text-xl">{memory.title}</h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted/90">{memory.prose}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
