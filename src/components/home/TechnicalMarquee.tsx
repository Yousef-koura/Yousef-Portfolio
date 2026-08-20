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
  "ROS",
  "Docker",
];

function Row() {
  return (
    <div className="marquee-group" aria-hidden="true">
      {items.map((item, index) => (
        <span key={item} className="flex shrink-0 items-center">
          <span
            className={`whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] sm:text-sm ${
              index < 4 ? "text-ink/80" : "text-muted"
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="mx-7 h-1 w-1 rounded-full bg-champagne/50 sm:mx-9" />
        </span>
      ))}
    </div>
  );
}

export function TechnicalMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line/70 bg-surface/40 py-7 sm:py-9">
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