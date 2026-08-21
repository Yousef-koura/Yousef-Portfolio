type SectionFrameProps = {
  id?: string;
  index: string;
  label: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Editorial section frame — a continuing technical hairline with an index and
 * label, followed by the section statement. Gives the Home page one continuous
 * grid language instead of disconnected blocks.
 */
export function SectionFrame({
  id,
  index,
  label,
  title,
  description,
  action,
  className = "",
  children,
}: SectionFrameProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-28 sm:py-32 lg:py-40 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Technical index rule — continues the page's hairline system */}
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-champagne">{index}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{label}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line/70" />
        </div>

        {title ? (
          <div className="mt-14 flex flex-col gap-6 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">{title}</h2>
              {description ? <p className="mt-5 text-base leading-relaxed text-muted">{description}</p> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}

        <div className="mt-14 sm:mt-20">{children}</div>
      </div>
    </section>
  );
}