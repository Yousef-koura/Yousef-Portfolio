import { Reveal } from "@/components/ui/Reveal";
import { QuietLink } from "@/components/ui/QuietLink";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { site } from "@/content/site";

type NowEntry = {
  org: string;
  role: string;
  period: string;
  caption: string;
  prose: React.ReactNode;
  /** Quiet mono link under the entry (e.g. "Building →" for Movenue) */
  link?: { href: string; label: string };
};

/**
 * NOW — chapter 05. The present tense, as one connected pair rather than two
 * separate entries: FlyRank (systems learning from data) and Movenue
 * (products learning from people). Mobile links them with a spine; sm+ sets
 * them as mirrored columns divided by a shared hairline. Movenue carries a
 * "building" link — it's the thing being actively built.
 */
const ENTRIES: NowEntry[] = [
  {
    org: "FlyRank AI",
    role: "Machine Learning Engineer",
    period: "Jun 2026 — Present · Remote",
    caption: "teaching me how systems learn from data",
    prose: "End-to-end ML workflow on the company's data warehouse — from raw analysis in Python and SQL to a benchmarked, interpretable model.",
  },
  {
    org: "Movenue",
    role: "Founder & Developer",
    period: "Jun 2026 — Present",
    caption: "teaching me how products learn from people",
    link: { href: site.movenue, label: "Building" },
    prose: (
      <>
        Building a SaaS product for sports venues and players in Egypt — court management, booking, owner analytics.
        Live at{" "}
        <a
          href={site.movenue}
          target="_blank"
          rel="noopener noreferrer"
          className="text-champagne-strong underline decoration-line underline-offset-4 transition-colors hover:text-champagne"
        >
          movenue.vercel.app<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </>
    ),
  },
];

export function Currently() {
  return (
    <SectionFrame id="now" label="Now" meta="Present tense" spacing="compact">
      <h2 className="sr-only">What I&apos;m doing now</h2>

      <div className="relative mt-8 grid gap-10 pl-8 sm:grid-cols-2 sm:gap-12 sm:pl-0">
        {/* Connective tissue: spine (mobile) / shared divider (sm+) */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[5px] top-4 w-px bg-line sm:hidden"
        />
        <span aria-hidden="true" className="absolute bottom-4 left-1/2 top-4 hidden w-px bg-line sm:block" />

        {ENTRIES.map((entry) => (
          <Reveal key={entry.org} y={16} className="relative sm:pr-10 lg:pr-14">
            {/* Node tying the entry to the connector */}
            <span
              aria-hidden="true"
              className="absolute -left-8 top-[7px] flex h-[11px] w-[11px] items-center justify-center rounded-full border border-champagne/60 bg-obsidian sm:hidden"
            >
              <span className="h-[4px] w-[4px] rounded-full bg-champagne" />
            </span>

            <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">{entry.org}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-champagne-strong">{entry.role}</p>
            <time className="mt-1 block font-mono text-[11px] tracking-[0.16em] text-muted">{entry.period}</time>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted/90 sm:text-base">{entry.prose}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/60">{entry.caption}</p>
              {entry.link ? <QuietLink href={entry.link.href} external>{entry.link.label}</QuietLink> : null}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
