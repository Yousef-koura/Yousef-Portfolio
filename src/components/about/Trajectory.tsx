import { QuietLink } from "@/components/ui/QuietLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFrame } from "@/components/ui/SectionFrame";

type TrajectoryPhase = {
  timeframe: string;
  current?: boolean;
  label: string;
  /** Condensed story-beat prose; facts verbatim from the content source */
  prose: React.ReactNode;
};

/**
 * Engineering trajectory — a narrative spine, not a timeline table. A quiet
 * vertical hairline with a small node per phase transition; each phase is a
 * short story-beat label plus 2–3 sentences of condensed prose. Deliberately
 * distinct from EXPERIENCE's role-first entries (org/title/location/dates/
 * responsibilities) — this section tells the story; this page's Education
 * block and the EXPERIENCE page carry the formal facts.
 *
 * Every fact/date/figure is condensed verbatim from
 * yousef-portfolio-content.md §4–§6, §9 — nothing invented, only reframed.
 * The military-service phase keeps DECISIONS #49's substance ruling (what the
 * role actually involved — no achievements); FlyRank and Movenue share the
 * same "Jun 2026 — Present" range and are told as one closing beat.
 * Certifications remain contextual inline mentions only (DECISIONS #50).
 *
 * The spine and nodes are static by construction (reduced-motion readable);
 * the per-phase entrance is handled by the reduce-gated Reveal primitive.
 */
const phases: TrajectoryPhase[] = [
  {
    timeframe: "Sep 2019 — Jul 2024",
    label: "Machines come first.",
    prose:
      "The path opens with hardware, not models: a B.Sc. in Mechatronics Systems Engineering at MSA University, Giza — delivered in partnership with the University of Greenwich, UK — finished at 3.62/4.0. It closes with Agri-Bot, an AI-powered crop-disease detection robot running at 20 FPS and 96% accuracy on a Jetson Nano, published at IUGRC 2024.",
  },
  {
    timeframe: "Jul 2023 — Sep 2023",
    label: "Machine learning becomes the craft.",
    prose:
      "A summer internship at ITI turns machine learning into daily practice: six-plus supervised and unsupervised models built in scikit-learn, reaching up to 97% F1 on held-out test sets, with cross-validation and hyperparameter tuning part of the process. The Machine Learning Specialization from DeepLearning.AI (Coursera, 2023) gives the same year its formal backbone.",
  },
  {
    timeframe: "Aug 2023",
    label: "Proof, early.",
    prose:
      "At Digital HUB (D-HUB) in Cairo, a breast-cancer detection classifier built with CNNs and scikit-learn lands at 96% accuracy — third place in an AI challenge co-hosted with the Electronics Research Institute.",
  },
  {
    timeframe: "Jun 2024 — Aug 2024",
    label: "Into industry, remotely.",
    prose:
      "Remote work for PioPetro (Ohio, USA) applies machine learning to petroleum production forecasting across exploration, artificial lift, and well stimulation use cases — four-plus predictive models, reaching up to 87% R² on held-out test sets.",
  },
  {
    timeframe: "Jan 2025 — Mar 2026",
    label: "Service, kept technical.",
    prose:
      "Between internships sits a different kind of engineering year: mandatory military service, spent as a Technical Office Engineer in the License Department of the Egyptian Armed Forces Engineering Authority in Cairo — working with engineering documentation and the licensing department's administrative processes, and coordinating technical documentation and follow-up activities across engineering functions.",
  },
  {
    timeframe: "Jun 2026 — Present",
    current: true,
    label: "Now: end to end, twice over.",
    prose: (
      <>
        The present runs on two threads. At FlyRank AI (Chicago, USA · remote), the full workflow:
        analyzing the company&apos;s data warehouse in Python, pandas, and SQL; designing a temporal
        train/test split rather than a random one; building an interpretable Decision Tree
        benchmarked against a rule-based baseline — with IBM&apos;s containers certification (Docker,
        Kubernetes, and OpenShift, June 2026) covering deployment. Alongside it,{" "}
        <a
          href="https://movenue.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-champagne-strong underline decoration-line underline-offset-4 transition-colors hover:text-champagne"
        >
          Movenue<span className="sr-only"> (opens in a new tab)</span>
        </a>{" "}
        — a live court-management and booking platform for Egypt, founded and built on Next.js,
        TypeScript, and Supabase.
      </>
    ),
  },
];

export function Trajectory() {
  return (
    <SectionFrame
      label="Trajectory"
      title="From mechatronics to machine learning."
      description="One continuous path — each stop is dated and sourced, nothing smoothed over."
    >
      <ol className="relative">
        {/* The spine — a single quiet hairline behind every node. Static by
            construction, so reduced-motion visitors get the full reading
            experience without any animation state. */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-line"
        />

        {phases.map((phase, index) => {
          const isCurrent = Boolean(phase.current);
          return (
            <li key={phase.label} className="relative pb-16 pl-10 last:pb-0 sm:pl-12">
              {/* Node marking the phase transition on the spine */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 flex h-[11px] w-[11px] items-center justify-center rounded-full border bg-obsidian ${
                  isCurrent ? "border-champagne" : "border-line"
                }`}
              >
                {isCurrent ? <span className="h-[5px] w-[5px] rounded-full bg-champagne" /> : null}
              </span>

              <Reveal delay={index === 0 ? 0 : 0.05}>
                {/* Date — small and secondary, sitting beside its node */}
                <time
                  className={`font-mono text-[11px] tracking-[0.16em] ${
                    isCurrent ? "text-champagne" : "text-muted"
                  }`}
                >
                  {phase.timeframe}
                </time>
                <h3 className="mt-2 font-display text-xl tracking-tight text-ink sm:text-2xl">
                  {phase.label}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted/90 sm:text-base">
                  {phase.prose}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="mt-12">
        <QuietLink href="/experience">Full timeline and metrics</QuietLink>
      </div>
    </SectionFrame>
  );
}
