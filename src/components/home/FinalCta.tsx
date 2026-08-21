import { ArrowUpRight } from "lucide-react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <SectionFrame
      id="contact"
      label="Contact"
      className="relative pb-40 pt-48 sm:pb-48 sm:pt-56 lg:pb-52 lg:pt-72"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_46%_90%_at_50%_0%,rgba(201,168,106,0.07),transparent_70%)]"
      />
      <Reveal>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.5rem]">
            Have an ML problem, or want to work together?
          </h2>
          <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Open to Junior ML Engineer · AI Engineer · Computer Vision Engineer roles
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-12 inline-flex items-center gap-3 font-mono text-lg tracking-tight text-champagne transition-colors hover:text-champagne-light sm:text-2xl"
          >
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-champagne/50" />
            {site.email}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <div className="mt-14 flex justify-center">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
