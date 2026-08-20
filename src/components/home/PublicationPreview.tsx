import Image from "next/image";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { publication } from "@/content/experience";

export function PublicationPreview() {
  return (
    <SectionFrame
      index="04"
      label="Publication"
      title="Research, published."
      description="Undergraduate research from the Agri-Bot graduation project, presented at an international conference."
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <Reveal>
          <figure>
            <div className="relative border border-line bg-surface p-3 sm:p-6">
              <Image
                src="/projects/iugrc-certificate.png"
                alt="IUGRC 2024 publication certificate for the AgRobot paper"
                width={983}
                height={678}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
              {/* Archival corner ticks */}
              <span aria-hidden="true" className="absolute left-2 top-2 h-4 w-4 border-l border-t border-line/80" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-line/80" />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span>Plate 01 — Publication certificate</span>
              <span className="text-champagne">IUGRC 8 · 2024</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-line pt-6 sm:pt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-champagne">IUGRC 8 · {publication.date}</p>
            <h3 className="mt-4 font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
              {publication.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{publication.venue}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{publication.context}</p>
            <div className="mt-8">
              <ButtonLink href="/publications" variant="ghost">
                View publications
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}