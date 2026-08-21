const items = [
  "Machine Learning",
  "Computer Vision",
  "Data Engineering",
  "Robotics",
  "Python",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "Next.js",
  "Supabase",
  "OpenCV",
  "Docker",
];

function Row() {
  return (
    <div className="marquee-group" aria-hidden="true">
      {items.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          {/* Uniform tone — ambient texture, no arbitrary emphasis */}
          <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-muted/80 sm:text-sm">
            {item}
          </span>
          <span aria-hidden="true" className="mx-7 h-1 w-1 rounded-full bg-champagne/40 sm:mx-9" />
        </span>
      ))}
    </div>
  );
}

export function TechnicalMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line/70 bg-surface/40 py-6 sm:py-8">
      <div className="marquee-mask marquee">
        <div className="marquee-track">
          <Row />
          <Row />
        </div>
      </div>
      <p className="sr-only">
        Technical areas: {items.join(", ")}
      </p>
    </div>
  );
}