type SectionFrameProps = {
  id?: string;
  label: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Minimal section frame — a single hairline with a quiet mono label for
 * wayfinding, then the content in generous whitespace. Deliberately free of
 * index numerals, filler rules, and other decorative chrome.
 */
export function SectionFrame({
  id,
  label,
  title,
  description,
  action,
  className = "",
  children,
}: SectionFrameProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-32 sm:py-40 lg:py-48 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Wayfinding label — the minimum chrome that keeps orientation */}
        <div className="border-t border-line pt-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{label}</span>
        </div>

        {title ? (
          <div className="mt-16 flex flex-col gap-6 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">{title}</h2>
              {description ? <p className="mt-5 text-base leading-relaxed text-muted">{description}</p> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}

        <div className={title ? "mt-16 sm:mt-24" : "mt-12 sm:mt-14"}>{children}</div>
      </div>
    </section>
  );
}
