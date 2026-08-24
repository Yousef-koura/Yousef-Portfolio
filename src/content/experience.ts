export type ExperienceEntry = {
  org: string;
  role: string;
  location: string;
  timeframe: string;
  current?: boolean;
  summary: string;
  /** Full responsibilities/evidence for the EXPERIENCE page — rendered inline, no accordion */
  highlights: string[];
  /** Only where the technology is confirmed in CONTENT.md — never an invented stack */
  technologies?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    org: "FlyRank AI",
    role: "Machine Learning Intern",
    location: "Chicago, USA · Remote",
    timeframe: "Jun 2026 — Present",
    current: true,
    summary:
      "Production data warehouse analysis, temporal train/test split design, and an interpretable Decision Tree model; MCP/Claude applied training and AI Fluency (4D framework).",
    highlights: [
      "End-to-end production data warehouse analysis",
      "Temporal train/test split design",
      "An interpretable Decision Tree model",
      "Applied MCP/Claude training",
      "AI Fluency — the 4D framework",
    ],
  },
  {
    org: "PioPetro",
    role: "Machine Learning Intern",
    location: "Ohio, USA · Remote",
    timeframe: "Jun 2024 — Aug 2024",
    summary:
      "4+ predictive models for petroleum production forecasting; up to 87% R² on held-out test sets.",
    highlights: [
      "4+ predictive models for petroleum production forecasting",
      "Up to 87% R² on held-out test sets",
    ],
  },
  {
    org: "ITI",
    role: "Machine Learning Intern",
    location: "Menoufia, Egypt",
    timeframe: "Jul 2023 — Sep 2023",
    summary:
      "6+ supervised/unsupervised scikit-learn models across classification, regression, and clustering; up to 97% F1.",
    highlights: [
      "6+ supervised/unsupervised models across classification, regression, and clustering",
      "Up to 97% F1",
    ],
    technologies: ["scikit-learn"],
  },
  {
    org: "Digital HUB (D-HUB)",
    role: "AI Intern",
    location: "Cairo, Egypt",
    timeframe: "Aug 2023",
    summary:
      "Breast cancer detection classifier at 96% accuracy; 3rd place in an AI challenge co-hosted with the Electronics Research Institute.",
    highlights: [
      "Breast cancer detection classifier at 96% accuracy",
      "3rd place in the ERI challenge co-hosted with the Electronics Research Institute",
    ],
  },
];

export const capabilities = [
  {
    title: "ML & AI",
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
    title: "Computer Vision & Robotics",
    items: [
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "YOLOv8",
      "MobileNetV2",
      "Jetson Nano",
      "Fuzzy PID",
    ],
  },
  {
    title: "Data & Systems",
    items: [
      "SQL",
      "ETL / ELT",
      "Medallion Architecture",
      "Delta Lake",
      "Databricks",
      "Star Schema",
      "Docker",
      "Kubernetes",
      "AWS",
      "FastAPI",
    ],
  },
];

export const publication = {
  title: "AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot",
  venue: "8th International Undergraduate Research Conference (IUGRC 8) — Military Technical College",
  date: "Jul 28, 2024",
  context:
    "Undergraduate research connected to the Agri-Bot graduation project — an AI-powered crop disease detection robot.",
  /* Fields below extend the original home-page object (title/venue/date/context stay
     byte-identical — PortalArchive renders them). Everything traces to the actual
     paper PDF (public/Publication/AgRobot_paper_09.pdf) or CONTENT.md CONFIRMED entries. */
  authors: ["K. Yousef", "M. Mohamed", "G. Tarek"],
  affiliation: "Modern Science and Arts University (MSA), Egypt",
  location: "Military Technical College, Cairo, Egypt",
  type: "Conference paper",
  pages: 9,
  pdfHref: "/Publication/AgRobot_paper_09.pdf",
  keywords: ["Disease detection", "AI-powered robot", "Greenhouse farming", "YOLOv8", "MobileNetV2"],
  metrics: [
    { value: "96%", label: "Average detection accuracy" },
    { value: "20 FPS", label: "Real time on the NVIDIA Jetson Nano" },
    { value: "13", label: "Disease classes — tomato & potato" },
  ],
  preview: {
    src: "/Publication/agrobot-paper-preview.png",
    width: 1224,
    height: 1584,
    alt: "First page of the AgRobot conference paper — title, authors, abstract, and keywords as published at IUGRC 8",
  },
} as const;