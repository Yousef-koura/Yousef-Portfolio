"use client";

import { useState } from "react";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useReducedMotion } from "framer-motion";
import { evidenceMetrics } from "@/content/evidence";

/**
 * Evidence visualization — one compact, interactive comparison of confirmed
 * project metrics (see DECISIONS #33). Static data only (`src/content/
 * evidence.ts`): no network calls, no loading or error states possible.
 *
 * Accessibility: the SVG chart is decorative (`aria-hidden`); every row is
 * operable through real buttons overlaid on its equal-height band — pointer,
 * touch, and keyboard all drive the same selection — and a visually-hidden
 * data table carries the full information (values, qualifiers, context,
 * source traceability) for screen readers. Entrance animation is disabled
 * under prefers-reduced-motion.
 */

type ValueLabelProps = {
  x?: unknown;
  y?: unknown;
  width?: unknown;
  height?: unknown;
  value?: unknown;
  index?: unknown;
};

export function EvidenceChart() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);

  const inspect = (index: number) => {
    setActiveIndex(index);
  };
  const release = () => {
    if (!pinned) setActiveIndex(null);
  };
  const togglePin = (index: number) => {
    if (pinned && activeIndex === index) {
      setPinned(false);
      setActiveIndex(null);
    } else {
      setPinned(true);
      setActiveIndex(index);
    }
  };

  const active = activeIndex === null ? null : evidenceMetrics[activeIndex];

  const renderValueLabel = ({ x, y, width, height, value, index }: ValueLabelProps) => {
    if (typeof x !== "number" || typeof y !== "number" || typeof height !== "number") return null;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return null;
    const isActive = Number(index) === activeIndex;
    return (
      <text
        x={x + (typeof width === "number" ? width : 0) + 10}
        y={y + height / 2}
        dominantBaseline="middle"
        fontSize={11}
        fontFamily="var(--font-jetbrains), monospace"
        fill={isActive ? "#e3c98e" : "#a9a9a3"}
      >
        {numeric}%
      </text>
    );
  };

  return (
    <figure className="border border-line bg-surface p-6 sm:p-8">
      {/* Caption row */}
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Best reported results
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-muted/70">
          per-project metrics · accuracy / R² / F1
        </span>
      </figcaption>

      {/* Chart band — four equal-height rows; overlays align by construction */}
      <div className="relative mt-6 h-64 pr-12 sm:pr-14">
        <div aria-hidden="true" className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evidenceMetrics} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="project"
                width={96}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a9a9a3", fontSize: 11, fontFamily: "var(--font-jetbrains), monospace" }}
              />
              <Bar
                dataKey="value"
                barSize={16}
                radius={[2, 2, 2, 2]}
                isAnimationActive={!reduce}
                animationDuration={900}
              >
                {evidenceMetrics.map((entry, index) => (
                  <Cell key={entry.project} fill={index === activeIndex ? "#c9a86a" : "rgba(243,240,232,0.15)"} />
                ))}
                <LabelList dataKey="value" content={renderValueLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Keyboard/touch operable overlays — one focusable band per row */}
        <div className="absolute inset-0">
          {evidenceMetrics.map((entry, index) => (
            <button
              key={entry.project}
              type="button"
              onMouseEnter={() => inspect(index)}
              onMouseLeave={release}
              onFocus={() => inspect(index)}
              onBlur={release}
              onClick={() => togglePin(index)}
              aria-label={`${entry.project}: ${entry.qualifier ? `${entry.qualifier} ` : ""}${entry.value}% ${
                entry.metric
              }, ${entry.context}`}
              className="absolute inset-x-0 h-1/4 border-b border-line/50 last:border-b-0"
              style={{ top: `${index * 25}%` }}
            />
          ))}
        </div>
      </div>

      {/* Detail readout — mirrors the current selection */}
      <p
        aria-live="polite"
        className={`mt-5 min-h-[2.75rem] border-l-2 pl-4 font-mono text-xs leading-relaxed transition-colors duration-300 ${
          active ? "border-champagne/60 text-ink/90" : "border-line text-muted"
        }`}
      >
        {active
          ? `${active.qualifier ? `${active.qualifier} ` : ""}${active.value}% ${active.metric} — ${active.context}`
          : "Hover, focus, or tap a project to inspect its confirmed result."}
      </p>

      {/* Accessible equivalent — full data including source traceability */}
      <table className="sr-only">
        <caption>Confirmed project metrics used in the chart above</caption>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Result</th>
            <th scope="col">Context</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {evidenceMetrics.map((entry) => (
            <tr key={entry.project}>
              <th scope="row">{entry.project}</th>
              <td>{`${entry.qualifier ? `${entry.qualifier} ` : ""}${entry.value}% ${entry.metric}`}</td>
              <td>{entry.context}</td>
              <td>{entry.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
