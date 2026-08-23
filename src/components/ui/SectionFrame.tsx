type SectionFrameProps = {
  id?: string;
  label: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  /** Quiet right-aligned micro-annotation on the label row (chapter marks, ranges) */
  meta?: React.ReactNode;
  className?: string;
  /**
   * Vertical rhythm preset. "full" (default) is the site-wide editorial
   * spacing; "compact" halves it for short personal sections (ABOUT
   * recomposition) so consecutive frames read as one continuous page
   * instead of section → void → section. Defaults never changed for
   * existing callers.
   */
  spacing?: "full" | "compact";
  children: React.ReactNode;
};

const spacingPresets = {
  full: {
    frame: "py-32 sm:py-40 lg:py-48",
    titleBlock: "mt-16 sm:mt-20",
    content: "mt-16 sm:mt-24",
    labelOnlyContent: "mt-12 sm:mt-14",
  },
  compact: {
    frame: "py-12 sm:py-14",
    titleBlock: "mt-10 sm:mt-12",
    content: "mt-10 sm:mt-12",
    labelOnlyContent: "mt-8 sm:mt-10",
  },
} as const;

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
  meta,
  className = "",
  spacing = "full",
  children,
}: SectionFrameProps) {
  const t = spacingPresets[spacing];

  return (
    <section id={id} className={`scroll-mt-24 ${t.frame} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Wayfinding label — the minimum chrome that keeps orientation */}
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{label}</span>
          {meta ? (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/60">{meta}</span>
          ) : null}
        </div>

        {title ? (
          <div className={`${t.titleBlock} flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between`}>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">{title}</h2>
              {description ? <p className="mt-5 text-base leading-relaxed text-muted">{description}</p> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}

        <div className={title ? t.content : t.labelOnlyContent}>{children}</div>
      </div>
    </section>
  );
}
