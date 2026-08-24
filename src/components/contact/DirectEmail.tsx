import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * PRIMARY CHANNEL — the page's visual focus, adapting Home FinalCta's email
 * treatment: a quiet mono lead-in (reusing the Home portal's "Start a
 * conversation" phrase), then the oversized champagne mailto with the
 * hairline dash + ArrowUpRight, and the primary pill beneath. The one accent
 * moment on the page; everything around it stays neutral. Mobile hides the
 * decorative dash and lets the address scale down so the mono string always
 * fits its column; overflow-wrap is a never-triggered-at-designed-sizes
 * safety net.
 */
export function DirectEmail() {
  return (
    <section aria-label="Primary contact" className="py-24 sm:py-32 lg:py-40">
      <Reveal>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Start a conversation</p>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono tracking-tight text-champagne transition-colors duration-300 hover:text-champagne-light text-lg sm:text-3xl md:text-4xl lg:text-5xl"
          >
            <span aria-hidden="true" className="hidden h-px w-8 shrink-0 bg-champagne/50 sm:block" />
            <span className="[overflow-wrap:anywhere]">{site.email}</span>
            <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 sm:h-7 sm:w-7 lg:h-9 lg:w-9" />
          </a>

          <div className="mt-12 flex justify-center">
            <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
