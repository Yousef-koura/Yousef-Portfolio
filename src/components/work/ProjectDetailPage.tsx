import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QuietLink } from "@/components/ui/QuietLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { DemoVideo } from "@/components/work/DemoVideo";
import { TechStackRow } from "@/components/work/tech-icons";
import type { ProjectDetail } from "@/content/projects";

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
      <span id={id}>{children}</span>
    </h2>
  );
}

/** Paragraph stack shared by the prose sections. */
function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="max-w-2xl space-y-5">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed text-muted sm:text-base">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * CSS laptop bezel around a real capture — screen, hinge, base. Pure
 * decoration drawn in CSS; the pixels inside are always the project's own.
 */
function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <figure>
      <div className="rounded-t-lg border border-line bg-obsidian p-2 sm:p-3">
        <div className="overflow-hidden border border-line bg-surface">{children}</div>
      </div>
      <div aria-hidden="true" className="relative mx-auto h-3 w-[94%] rounded-b-md border border-t-0 border-line bg-surface sm:h-4" >
        <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-full bg-line/80 sm:w-24" />
      </div>
    </figure>
  );
}

/** Quiet labeled panel for builds with no capture — nothing is invented. */
function QuietPanel({ name, domain }: { name: string; domain: string }) {
  return (
    <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 border border-line bg-surface px-6 text-center">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne/70" />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{name}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/50">{domain}</span>
    </div>
  );
}

function DetailMedia({ detail }: { detail: ProjectDetail }) {
  if (detail.video && detail.image) {
    return (
      <LaptopFrame>
        <DemoVideo
          video={detail.video}
          poster={detail.video.poster ?? detail.image}
          sizes="(min-width: 1152px) 1088px, 100vw"
          label={`${detail.name} demo`}
          aspect="16 / 9"
          className="border-0"
        />
      </LaptopFrame>
    );
  }
  if (detail.image) {
    return (
      <LaptopFrame>
        <Image
          src={detail.image.src}
          alt={detail.image.alt}
          width={detail.image.width}
          height={detail.image.height}
          preload
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="h-auto w-full"
        />
      </LaptopFrame>
    );
  }
  return <QuietPanel name={detail.name} domain={detail.domain} />;
}

/**
 * Shared WORK detail template (`/work/[slug]`) — one data-driven composition
 * serving full pages (Problem → Methodology → Solution → Results → Stack →
 * Links) and short pages alike: sections render only when their sourced data
 * exists, so PotatoScan and Steganography Detector stay honest instead of
 * padded. Every statement traces to `yousef-portfolio-content.md` §6.
 */
export function ProjectDetailPage({
  detail,
  previous,
  next,
}: {
  detail: ProjectDetail;
  previous?: { slug: string; name: string };
  next?: { slug: string; name: string };
}) {
  const primaryLink = detail.links[0];
  const secondaryLinks = detail.links.slice(1);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-32 pt-36 sm:px-8 sm:pb-40 sm:pt-44">
      {/* Breadcrumb — always an exit, never a dead end */}
      <nav aria-label="Breadcrumb" className="border-t border-line pt-4">
        <Link
          href="/work"
          className="group/bk inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-champagne"
        >
          <ArrowLeft
            size={12}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/bk:-translate-x-1"
          />
          All work
        </Link>
        <span className="ml-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted/50">
          {detail.kind}
        </span>
      </nav>

      {/* Hero */}
      <header className="mt-16 sm:mt-24">
        <p className="font-mono text-xs tracking-[0.22em] text-champagne-strong">{detail.domain}</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
          {detail.name}
          <span className="text-champagne">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {detail.positioningLine}
        </p>

        <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 md:grid-cols-3">
          {detail.role ? (
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Role</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">{detail.role}</dd>
            </div>
          ) : null}
          {detail.timeframe ? (
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Timeframe</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">{detail.timeframe}</dd>
            </div>
          ) : null}
          {detail.status ? (
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Status</dt>
              <dd className="mt-2 inline-flex items-center gap-2 text-sm text-ink">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
                {detail.status}
              </dd>
            </div>
          ) : null}
        </dl>

        {primaryLink ? (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={primaryLink.href} variant="primary" external={primaryLink.external}>
              {primaryLink.label}
            </ButtonLink>
            {secondaryLinks.map((link) => (
              <QuietLink key={link.href} href={link.href} external={link.external}>
                {link.label}
              </QuietLink>
            ))}
          </div>
        ) : null}
      </header>

      {/* Media — real captures in a CSS laptop frame; quiet panel otherwise */}
      <RevealImage>
        <div className="mt-16 sm:mt-20">
          <DetailMedia detail={detail} />
        </div>
      </RevealImage>

      {/* Problem */}
      <Reveal>
        <section aria-labelledby="pd-problem" className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-[200px_1fr] md:gap-16">
          <SectionHeading id="pd-problem">Problem</SectionHeading>
          <Prose paragraphs={detail.problem} />
        </section>
      </Reveal>

      {/* Methodology */}
      {detail.methodology ? (
        <Reveal>
          <section aria-labelledby="pd-methodology" className="mt-20 border-t border-line pt-10">
            <SectionHeading id="pd-methodology">Methodology</SectionHeading>
            <dl className="mt-10">
              {detail.methodology.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[200px_1fr] md:gap-16"
                >
                  <dt className="font-display text-lg tracking-tight text-ink">{group.label}</dt>
                  <dd className="max-w-2xl space-y-4">
                    {group.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed text-muted sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>
      ) : null}

      {/* Solution — where demo captures play, when they exist */}
      {detail.solution ? (
        <Reveal>
          <section aria-labelledby="pd-solution" className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-[200px_1fr] md:gap-16">
            <SectionHeading id="pd-solution">Solution</SectionHeading>
            <Prose paragraphs={detail.solution} />
          </section>
        </Reveal>
      ) : null}

      {/* Results */}
      {detail.results && detail.results.length > 0 ? (
        <Reveal>
          <section aria-labelledby="pd-results" className="mt-20 border-t border-line pt-10">
            <SectionHeading id="pd-results">Results</SectionHeading>
            <dl className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-3">
              {detail.results.map((metric) => (
                <div key={metric.value}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <p className="font-display text-3xl leading-none tracking-tight text-ink sm:text-4xl">
                      {metric.value}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {metric.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>
      ) : null}

      {/* Stack — confirmed technologies only; brand marks or neutral glyphs */}
      <Reveal>
        <section aria-labelledby="pd-stack" className="mt-20 border-t border-line pt-10">
          <SectionHeading id="pd-stack">Stack</SectionHeading>
          <TechStackRow items={detail.stack} className="mt-10" />
        </section>
      </Reveal>

      {/* Closing nav — previous / next through the curated order */}
      <Reveal>
        <nav
          aria-label="Continue"
          className="mt-24 grid grid-cols-2 items-end gap-x-4 border-t border-line pt-12 sm:flex sm:items-end sm:justify-between"
        >
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="group/pv -my-3 inline-flex min-w-0 items-center gap-3 py-3 pr-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-champagne"
            >
              <ArrowLeft
                size={12}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover/pv:-translate-x-1"
              />
              <span className="min-w-0">
                Previous
                <span className="mt-1 block break-words font-display text-base normal-case leading-snug tracking-tight text-ink transition-colors duration-300 group-hover/pv:text-champagne">
                  {previous.name}
                </span>
              </span>
            </Link>
          ) : (
            <Link
              href="/work"
              className="-my-3 inline-flex items-center gap-2 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-champagne"
            >
              <ArrowLeft size={12} aria-hidden="true" />
              Back to all work
            </Link>
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group/nx -my-3 inline-flex min-w-0 items-center justify-self-end gap-3 py-3 pl-1 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-champagne"
            >
              <span className="min-w-0">
                Next
                <span className="mt-1 block break-words font-display text-base normal-case leading-snug tracking-tight text-ink transition-colors duration-300 group-hover/nx:text-champagne">
                  {next.name}
                </span>
              </span>
              <ArrowRight
                size={12}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover/nx:translate-x-1"
              />
            </Link>
          ) : null}
        </nav>
      </Reveal>
    </article>
  );
}
