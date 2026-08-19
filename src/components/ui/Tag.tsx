export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}