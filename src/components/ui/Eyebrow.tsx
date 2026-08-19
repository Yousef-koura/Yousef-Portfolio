export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-champagne ${className}`}>
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 bg-champagne" />
      {children}
    </p>
  );
}