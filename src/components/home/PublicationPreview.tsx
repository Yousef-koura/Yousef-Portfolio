import Image from "next/image";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { QuietLink } from "@/components/ui/QuietLink";
import { publication } from "@/content/experience";

export function PublicationPreview() {
  return (
    <SectionFrame index="03" label="Publication">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
        {/* The certificate — presented as a physical evidence artifact */}
        <Reveal>
          <figure>
            <div className="relative border border-line bg-surface p-4 sm:p-8">
              <RevealImage>
                <Image
                  src="/projects/iugrc-certificate.png"
                  alt="IUGRC 2024 publication certificate for the AgRobot paper"
                  width={983}
                  height={678}
                  sizes="(min-width: 1024px) min(50vw, 540px), 100vw"
                  className="h-auto w-full"
                />
              </RevealImage>
              {/* Archival corner ticks */}
              <span aria-hidden="true" className="absolute left-2 top-2 h-4 w-4 border-l border-t border-line/80" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-line/80" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span>Plate 01 — Publication certificate</span>
              <span className="text-champagne">IUGRC 8 · 2024</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Text column — date, title, venue. Nothing else. */}
        <div className="border-t border-line pt-7 sm:pt-9">
          <Reveal delay={0.05}>
            <p className="font-mono text-xs uppercase tracking-widest text-champagne">
              IUGRC 8 · {publication.date}
            </p>
            <h3 className="mt-5 font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
              {publication.title}
            </h3>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted">{publication.venue}</p>
            <div className="mt-9">
              <QuietLink href="/publications">View publications</QuietLink>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
