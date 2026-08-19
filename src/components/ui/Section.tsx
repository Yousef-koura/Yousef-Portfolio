type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 sm:py-28 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}