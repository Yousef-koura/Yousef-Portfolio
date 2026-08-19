export type ExperienceEntry = {
  org: string;
  role: string;
  location: string;
  timeframe: string;
  current?: boolean;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    org: "FlyRank AI",
    role: "Machine Learning Intern",
    location: "Chicago, USA · Remote",
    timeframe: "Jun 2026 — Present",
    current: true,
    summary:
      "Analyzed the production data warehouse, designed a temporal train/test split, and built an interpretable Decision Tree model; completed MCP/Claude applied training and the AI Fluency framework.",
  },
  {
    org: "PioPetro",
    role: "Machine Learning Intern",
    location: "Ohio, USA · Remote",
    timeframe: "Jun 2024 — Aug 2024",
    summary:
      "Built and evaluated 4+ predictive models for petroleum production forecasting across Exploration, Artificial Lift, and Well Stimulation use cases; up to 87% R² on held-out test sets.",
  },
  {
    org: "ITI",
    role: "Machine Learning Intern",
    location: "Menoufia, Egypt",
    timeframe: "Jul 2023 — Sep 2023",
    summary:
      "Benchmarked 6+ supervised/unsupervised scikit-learn models across classification, regression, and clustering; up to 97% F1 on held-out test sets.",
  },
  {
    org: "Digital HUB (D-HUB)",
    role: "AI Intern",
    location: "Cairo, Egypt",
    timeframe: "Aug 2023",
    summary:
      "Built a breast cancer detection classifier reaching 96% accuracy; awarded 3rd place in an AI challenge co-hosted with the Electronics Research Institute.",
  },
];

export const capabilities = [
  {
    title: "Machine Learning & AI",
    items: [
      "Python",
      "Supervised & Unsupervised Learning",
      "Neural Networks",
      "CNNs",
      "Transfer Learning",
      "Object Detection (YOLO)",
      "LLMs",
      "RAG",
    ],
  },
  {
    title: "Data & Engineering",
    items: ["SQL", "ETL / ELT", "Medallion Architecture", "Delta Lake", "Databricks", "Docker", "Kubernetes", "AWS"],
  },
  {
    title: "Full-stack & Product",
    items: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "FastAPI", "TensorFlow", "PyTorch"],
  },
];

export const publication = {
  title: "AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot",
  venue: "8th International Undergraduate Research Conference (IUGRC 8) — Military Technical College",
  date: "Jul 28, 2024",
  context:
    "Undergraduate research connected to the Agri-Bot graduation project — an AI-powered crop disease detection robot.",
};