/**
 * Confirmed project metrics — the dataset for the Selected Work evidence
 * visualization. Every figure below traces verbatim to a CONFIRMED entry in
 * docs/CONTENT.md (see `source` per row); nothing here is estimated,
 * rounded, or inferred. CONTENT.md itself carries a publish-time note to
 * re-verify exact figures against the source material before launch.
 *
 * This module is the single source for the chart — no network calls, no
 * fetching, no runtime data loading anywhere in the visualization path.
 */
export type EvidenceMetric = {
  project: string;
  /** Best reported result, expressed as a percentage (0–100) */
  value: number;
  /** Metric kind — deliberately shown per-bar; these are not one scale */
  metric: "Accuracy" | "R² (coefficient of determination)" | "F1 score";
  /** Preserved hedging from the source (e.g. "up to 87% R²") */
  qualifier?: "up to";
  /** Supporting context line */
  context: string;
  /** Full spoken/printed sentence used in the detail readout */
  detail: string;
  /** Traceability back to the content inventory */
  source: string;
};

export const evidenceMetrics: EvidenceMetric[] = [
  {
    project: "Agri-Bot",
    value: 96,
    metric: "Accuracy",
    context: "YOLOv8 → MobileNetV2 pipeline · Jetson Nano · 20 FPS",
    detail: "Agri-Bot's crop-disease detection pipeline reached 96% accuracy running at 20 FPS on a Jetson Nano.",
    source: "CONTENT.md › Projects — “20 FPS, 96% accuracy” (CONFIRMED)",
  },
  {
    project: "PioPetro",
    value: 87,
    metric: "R² (coefficient of determination)",
    qualifier: "up to",
    context: "across 4+ predictive models",
    detail: "PioPetro predictive models reached up to 87% R² across 4+ models.",
    source: "CONTENT.md › Experience — “4+ predictive models, up to 87% R²” (CONFIRMED)",
  },
  {
    project: "ITI",
    value: 97,
    metric: "F1 score",
    qualifier: "up to",
    context: "across 6+ scikit-learn models",
    detail: "ITI machine learning work reached up to 97% F1 across 6+ scikit-learn models.",
    source: "CONTENT.md › Experience — “6+ scikit-learn models, up to 97% F1” (CONFIRMED)",
  },
  {
    project: "D-HUB",
    value: 96,
    metric: "Accuracy",
    context: "breast cancer classifier · 3rd place, ERI challenge",
    detail: "The D-HUB breast cancer classifier reached 96% accuracy — 3rd place in the ERI challenge.",
    source: "CONTENT.md › Experience — “96% accuracy, 3rd place in ERI challenge” (CONFIRMED)",
  },
];
