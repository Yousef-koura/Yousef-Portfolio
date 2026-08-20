import { ArrowUpRight } from "lucide-react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <SectionFrame index="06" label="Contact" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_46%_90%_at_50%_0%,rgba(201,168,106,0.07),transparent_70%)]"
      />
      <Reveal>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Have an ML problem, or want to work together?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            Open to Junior ML Engineer, AI Engineer, and Computer Vision Engineer roles — always up for building
            useful things.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-flex items-center gap-3 font-mono text-lg tracking-tight text-champagne transition-colors hover:text-champagne-light sm:text-xl"
          >
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-champagne/50" />
            {site.email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href={site.github} external variant="ghost">
              GitHub
            </ButtonLink>
            <ButtonLink href={site.linkedin} external variant="ghost">
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}