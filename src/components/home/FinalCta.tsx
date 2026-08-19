import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden border border-line bg-surface px-6 py-20 text-center sm:px-12 lg:py-28">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.1),transparent_65%)]"
            />
            <Eyebrow className="justify-center">Next step</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Have an ML problem, or want to work together?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
              I&apos;m open to Junior ML Engineer, AI Engineer, and Computer Vision Engineer roles — and always
              interested in building useful things. The fastest way to reach me is through the contact page or directly
              by email.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
      </div>
    </Section>
  );
}