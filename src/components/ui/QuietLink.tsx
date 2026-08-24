import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type QuietLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  /** Forces a file download instead of navigating (anchor `download` attribute) */
  download?: boolean;
  className?: string;
};

/**
 * Quiet text link for secondary section actions. Keeps champagne pill buttons
 * reserved for the page's primary journey (hero → work, final CTA) so nothing
 * competes with them.
 */
export function QuietLink({ href, children, external, download, className = "" }: QuietLinkProps) {
  const classes = `group/ql inline-flex items-center gap-2 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-champagne ${className}`;

  const inner = (
    <>
      <span className="border-b border-line pb-1 transition-colors duration-300 group-hover/ql:border-champagne/50">
        {children}
      </span>
      {external ? (
        <>
          <ArrowUpRight
            size={12}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/ql:-translate-y-0.5 group-hover/ql:translate-x-0.5"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : (
        <ArrowRight
          size={12}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/ql:translate-x-1"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download || undefined}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} download={download || undefined} className={classes}>
      {inner}
    </Link>
  );
}
