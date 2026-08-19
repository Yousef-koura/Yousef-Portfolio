import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { publication } from "@/content/experience";

export function PublicationPreview() {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Publication"
            title="Research, published."
            description="Undergraduate research from the Agri-Bot graduation project, presented at an international conference."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <article className="grid gap-8 border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-champagne">IUGRC 8 · Jul 28, 2024</p>
              <h3 className="mt-4 font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
                {publication.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{publication.venue}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{publication.context}</p>
              <div className="mt-8">
                <ButtonLink href="/publications" variant="ghost">
                  View publications
                </ButtonLink>
              </div>
            </div>
            <figure className="border border-line">
              <Image
                src="/projects/iugrc-certificate.png"
                alt="IUGRC 2024 publication certificate for the AgRobot paper"
                width={983}
                height={678}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}