import type { WorkMetric } from "@/content/projects";

/**
 * One evidence figure — value in display type, label beneath in mono caps.
 * Shared by WORK index and detail compositions.
 */
export function MetricFigure({
  metric,
  size = "md",
}: {
  metric: WorkMetric;
  size?: "sm" | "md" | "lg";
}) {
  const valueSize =
    size === "lg" ? "text-4xl sm:text-6xl" : size === "sm" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl";
  return (
    <div>
      <p className={`font-display ${valueSize} leading-none tracking-tight text-ink`}>{metric.value}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{metric.label}</p>
    </div>
  );
}
