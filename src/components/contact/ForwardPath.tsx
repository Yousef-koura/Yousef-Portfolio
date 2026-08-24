import { QuietLink } from "@/components/ui/QuietLink";
import { SectionFrame } from "@/components/ui/SectionFrame";

/**
 * FORWARD PATH — the page never dead-ends: two quiet text links back into
 * the evidence trail (work, experience). Deliberately compact and neutral so
 * nothing competes with the primary email CTA above.
 */
export function ForwardPath() {
  return (
    <SectionFrame label="Next" spacing="compact">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <QuietLink href="/work">See the work</QuietLink>
        <QuietLink href="/experience">View experience</QuietLink>
      </div>
    </SectionFrame>
  );
}
