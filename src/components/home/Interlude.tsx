"use client";

import { GhostType } from "@/components/ui/GhostType";

/**
 * Breathing space between Selected Work and Profile — a near-silent pause.
 * A giant ghost chapter word drifts slowly through generous whitespace so the
 * visitor feels the page exhale before the person behind the work appears.
 * Purely decorative (the following section carries the real label); the ghost
 * treatment itself lives in `GhostType` and is reduce-gated there.
 */
export function Interlude() {
  return (
    <section
      aria-hidden="true"
      className="relative flex h-[26vh] max-h-[220px] min-h-[160px] items-center justify-center overflow-hidden sm:h-[46vh] sm:max-h-[520px] sm:min-h-[280px] lg:h-[52vh]"
    >
      <GhostType>Profile</GhostType>
    </section>
  );
}
