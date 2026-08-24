import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  /** Forces a file download instead of navigating (anchor `download` attribute) */
  download?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  download,
  onClick,
  className = "",
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-champagne text-obsidian hover:bg-champagne-light"
      : "border border-line text-ink hover:border-champagne hover:text-champagne";

  const inner = (
    <>
      <span>{children}</span>
      {external ? (
        <>
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : (
        <ArrowRight size={14} aria-hidden="true" />
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
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      download={download || undefined}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </Link>
  );
}