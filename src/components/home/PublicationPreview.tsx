import Image from "next/image";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { QuietLink } from "@/components/ui/QuietLink";
import { publication } from "@/content/experience";

export function PublicationPreview() {
  return (
    <SectionFrame id="publications" label="Publication">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
        {/* The certificate — presented plainly as evidence */}
        <Reveal>
          <figure className="border border-line">
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
          </figure>
        </Reveal>

        {/* Text column — date, title, venue. Nothing else. */}
        <div>
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
