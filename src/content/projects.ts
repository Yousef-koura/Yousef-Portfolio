export type Project = {
  name: string;
  kind: string;
  domain: string;
  summary: string;
  description?: string;
  role: string;
  timeframe: string;
  status: "Live" | "Completed";
  tags: string[];
  evidence: string;
  links: { label: string; href: string; external?: boolean }[];
  image: { src: string; alt: string; width: number; height: number };
};

export const featuredProject: Project = {
  name: "Movenue",
  kind: "Featured · SaaS / Product",
  domain: "Court management & booking",
  summary:
    "Court management and booking platform — a two-sided marketplace for padel/football court owners and players.",
  description:
    "A two-sided marketplace for padel/football court owners and players in Egypt, with a Venue → Court hierarchy and full Arabic/English localization. Atomic booking PostgreSQL RPCs and row-level security policies prevent double-booking, while an owner analytics dashboard and a player booking flow round out the product.",
  role: "Founder & Developer",
  timeframe: "Jun 2026 — Present",
  status: "Live",
  tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts", "Vitest"],
  evidence:
    "Live product — an automated booking engine hardened against concurrent double-booking, backed by an integration test suite.",
  links: [{ label: "Visit Movenue", href: "https://movenue.vercel.app/", external: true }],
  image: {
    src: "/projects/movenue.png",
    alt: "Movenue — court management and booking platform",
    width: 1898,
    height: 848,
  },
};

export const secondaryProjects: Project[] = [
  {
    name: "Agri-Bot",
    kind: "Graduation Project",
    domain: "Agriculture · Computer Vision",
    summary:
      "AI-powered crop disease detection robot with a 3-stage pipeline — YOLOv8 plant detection → MobileNetV2 disease classification → fuzzy PID motor response.",
    role: "Graduation Project",
    timeframe: "Nov 2023 — Jun 2024",
    status: "Completed",
    tags: ["YOLOv8", "MobileNetV2", "Jetson Nano", "Fuzzy PID", "TensorRT"],
    evidence: "20 FPS · 96% accuracy · published at IUGRC 2024",
    links: [{ label: "View on GitHub", href: "https://github.com/Yousef-koura/AGRI-BOT", external: true }],
    image: {
      src: "/projects/agribot.png",
      alt: "Agri-Bot — AI-powered crop disease detection robot",
      width: 450,
      height: 600,
    },
  },
  {
    name: "Personal RAG Chatbot",
    kind: "Applied Project",
    domain: "LLMs · RAG",
    summary:
      "A grounded Q&A chatbot over a personal knowledge base — LangChain chunking, ChromaDB retrieval, and Groq (Llama 4 Scout) generation behind a FastAPI service.",
    role: "Developer",
    timeframe: "May 2026",
    status: "Completed",
    tags: ["LangChain", "ChromaDB", "Groq", "FastAPI", "Hugging Face"],
    evidence: "Grounded answers with a persistent vector store and tuned chunk overlap.",
    links: [
      { label: "View on GitHub", href: "https://github.com/Yousef-koura/personal-rag-assistant", external: true },
    ],
    image: {
      src: "/projects/rag-assistant.png",
      alt: "Personal RAG Chatbot — grounded question answering over a knowledge base",
      width: 1880,
      height: 827,
    },
  },
  {
    name: "FMCG Data Engineering Pipeline",
    kind: "Data Engineering",
    domain: "Data · Lakehouse",
    summary:
      "An end-to-end Lakehouse pipeline on Databricks — Medallion Architecture (Bronze → Silver → Gold) with Star Schema modeling for a retailer acquisition scenario.",
    role: "Developer",
    timeframe: "Apr 2026",
    status: "Completed",
    tags: ["Databricks", "PySpark", "Delta Lake", "Unity Catalog"],
    evidence: "Incremental load job across 4 sequential modeling tasks.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Yousef-koura/FMCG_Data_Engineer_Project",
        external: true,
      },
    ],
    image: {
      src: "/projects/fmcg-dashboard.png",
      alt: "FMCG Data Engineering Pipeline — Lakehouse dashboard",
      width: 1587,
      height: 705,
    },
  },
];

/** Result metrics rendered verbatim from the sourced content document. */
export type WorkMetric = { value: string; label: string };

/**
 * Optional demo-capture clip for an entry. Real encoded captures live in
 * `public/videos/` (H.264 MP4 + AAC audio — voiceover preserved, long edge
 * ≤1280px, faststart); when set, media renders via DemoVideo with the
 * project image as poster/resting state. Never point at files that don't
 * exist.
 */
export type ProjectVideo = { mp4: string; webm?: string };

/**
 * WORK detail pages (`/work/[slug]`) — PHASE 4B grid + detail milestone.
 * One structured entry per project; the shared ProjectDetailPage template
 * renders full pages (Problem → Methodology → Solution → Results → Stack →
 * Links → Nav) and short pages (the subset the source supports — PotatoScan
 * and Steganography Detector stay honest instead of padded). Every string,
 * figure, qualifier, and link traces to `yousef-portfolio-content.md` §6;
 * known source anomalies are rendered verbatim and flagged in docs/CONTENT.md.
 */
export type TechKey =
  | "nextdotjs"
  | "typescript"
  | "supabase"
  | "tailwindcss"
  | "postgresql"
  | "vitest"
  | "nvidia"
  | "ultralytics"
  | "fastapi"
  | "langchain"
  | "huggingface"
  | "onnx"
  | "react"
  | "databricks"
  | "apachespark"
  | "html5"
  | "network"
  | "layers"
  | "transfer"
  | "database"
  | "sparkles"
  | "workflow"
  | "star";

export type TechItem = { label: string; key: TechKey };

export type DetailLink = { label: string; href: string; external?: boolean };

export type MethodologyGroup = { label: string; body: string[] };

export type ProjectDetail = {
  slug: string;
  name: string;
  kind: string;
  domain: string;
  status?: "Live" | "Completed";
  timeframe?: string;
  role?: string;
  /** One-line positioning under the detail-page H1 */
  positioningLine: string;
  /** Index-grid card line */
  summary: string;
  problem: string[];
  methodology?: MethodologyGroup[];
  solution?: string[];
  results?: WorkMetric[];
  stack: TechItem[];
  links: DetailLink[];
  image?: Project["image"];
  video?: ProjectVideo;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "movenue",
    name: "Movenue",
    kind: "SaaS / Product",
    domain: "Court management & booking",
    status: "Live",
    timeframe: "Jun 2026 — Present",
    role: "Founder & Developer",
    positioningLine:
      "A live two-sided marketplace for padel/football court owners and players in Egypt.",
    summary:
      "A two-sided marketplace for padel/football court owners and players in Egypt — Venue → Court hierarchy, full Arabic/English localization, and a booking engine engineered against concurrent double-booking.",
    problem: [
      "Court venues in Egypt need a way to manage their locations and take bookings online, while players need a dependable way to find and reserve courts. Movenue serves both sides of that marketplace through a Venue → Court hierarchy, with the full product localized in Arabic and English.",
      "The core engineering constraint is booking integrity: concurrent bookings must never double-allocate a court. The platform runs live in production at movenue.vercel.app.",
    ],
    methodology: [
      {
        label: "Booking engine",
        body: [
          "Atomic PostgreSQL RPCs and row-level security (RLS) policies prevent double-booking. A partial unique index enforces the constraint at the database level, and hardened SECURITY DEFINER functions keep concurrent bookings safe.",
        ],
      },
      {
        label: "Product surfaces",
        body: [
          "An owner analytics dashboard built with Recharts surfaces period-over-period deltas and booking heatmaps.",
          "The player booking flow covers dynamic slot generation, session grouping, and cancellations.",
        ],
      },
      {
        label: "Quality gates",
        body: [
          "A Vitest integration test suite of 58+ tests backs the platform, alongside middleware-based route protection.",
        ],
      },
    ],
    solution: [
      "Movenue is live as a founder-built SaaS product: owners manage venues, courts, pricing, and analytics; players search, book, group into sessions, and cancel — all fully localized in Arabic and English.",
    ],
    results: [
      { value: "58+", label: "integration tests (Vitest)" },
      { value: "AR / EN", label: "full localization" },
      { value: "Live", label: "in production" },
    ],
    stack: [
      { label: "Next.js", key: "nextdotjs" },
      { label: "TypeScript", key: "typescript" },
      { label: "Supabase", key: "supabase" },
      { label: "PostgreSQL", key: "postgresql" },
      { label: "Tailwind CSS", key: "tailwindcss" },
      { label: "Recharts", key: "sparkles" },
      { label: "Vitest", key: "vitest" },
    ],
    links: [{ label: "Visit Movenue", href: "https://movenue.vercel.app/", external: true }],
    image: featuredProject.image,
  },
  {
    slug: "agri-bot",
    name: "Agri-Bot",
    kind: "Graduation Project · Research",
    domain: "Agriculture · Computer Vision · Robotics",
    status: "Completed",
    timeframe: "Nov 2023 — Jun 2024",
    role: "Graduation Project",
    positioningLine:
      "An AI-powered robot that detects crop disease and responds autonomously — published research.",
    summary:
      "An AI-powered crop disease detection robot running a 3-stage pipeline — YOLOv8 plant detection → MobileNetV2 disease classification → fuzzy PID autonomous motor response — deployed on a Jetson Nano with a web interface.",
    problem: [
      "Crop disease spreads quietly: by the time a farmer spots damaged leaves in the field, the window for targeted treatment has often closed. Agri-Bot was built as a graduation project to put detection and response on an autonomous platform — a robot that finds plants, classifies disease, and acts on what it sees.",
      "The work was published at IUGRC 2024 under the paper title \"AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot\".",
    ],
    methodology: [
      {
        label: "Perception pipeline",
        body: [
          "A 3-stage inference pipeline: YOLOv8 detects plants in the camera frame, MobileNetV2 classifies the detected plant's disease, and a fuzzy PID controller translates each classification into autonomous motor response.",
        ],
      },
      {
        label: "Edge deployment",
        body: [
          "The full pipeline runs onboard an NVIDIA Jetson Nano at 20 FPS with 96% accuracy, with TensorRT in the stack for accelerated inference.",
        ],
      },
      {
        label: "Interface",
        body: ["A web interface exposes the robot's perception and state."],
      },
    ],
    solution: [
      "The shipped system is a working robot: it drives to plants, detects and classifies disease onboard, and responds autonomously through its motor control — demonstrated end-to-end in the capture below.",
    ],
    results: [
      { value: "20 FPS", label: "on Jetson Nano" },
      { value: "96%", label: "accuracy" },
      { value: "IUGRC 2024", label: "published · Jul 28, 2024" },
    ],
    stack: [
      { label: "YOLOv8", key: "ultralytics" },
      { label: "MobileNetV2", key: "network" },
      { label: "Jetson Nano", key: "nvidia" },
      { label: "TensorRT", key: "nvidia" },
      { label: "Fuzzy PID", key: "workflow" },
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/Yousef-koura/AGRI-BOT", external: true }],
    image: {
      src: "/projects/agribot.png",
      alt: "Agri-Bot — AI-powered crop disease detection robot",
      width: 450,
      height: 600,
    },
    video: { mp4: "/videos/agribot-demo.mp4" },
  },
  {
    slug: "pneumoscan",
    name: "PneumoScan",
    kind: "Deep Learning · Deployment",
    domain: "Healthcare · Computer Vision",
    status: "Completed",
    timeframe: "May 2023 / Apr 2026",
    role: "Developer",
    positioningLine:
      "Chest X-ray pneumonia classification benchmarked across model families and served full-stack.",
    summary:
      "A chest X-ray pneumonia classifier benchmarking a custom CNN against ResNet-18 transfer learning across 5,863 images — class imbalance handled via pos_weight reweighting and WeightedRandomSampler, exported to ONNX and served through FastAPI behind a React drag-and-drop frontend.",
    problem: [
      "Pneumonia diagnosis depends on chest X-ray reading, and distinguishing pneumonia from healthy lungs is exactly the kind of pattern-recognition task convolutional networks do well. This project builds and benchmarks a classifier on 5,863 chest X-rays, then puts the winning model behind a real interface clinicians-style users can actually operate.",
      "The dataset is imbalanced — fewer pneumonia-negative cases than positive — so naive training flatters itself. Handling that imbalance honestly is part of the engineering problem.",
    ],
    methodology: [
      {
        label: "Benchmark design",
        body: [
          "Three configurations compared on the same data: a custom CNN baseline reaching 75% accuracy, ResNet-18 transfer learning with loss reweighting, and ResNet-18 with weighted sampling at 80% accuracy. Class imbalance is addressed via pos_weight reweighting and WeightedRandomSampler.",
        ],
      },
      {
        label: "Winning configuration",
        body: [
          "ResNet-18 + pos_weight reweighting wins: 85.1–85% accuracy, 89.3% F1, and 100% pneumonia recall.",
        ],
      },
      {
        label: "Deployment path",
        body: [
          "The winning model is exported to ONNX and served through a FastAPI backend, with a custom React frontend for drag-and-drop X-ray upload returning real-time diagnosis plus a confidence score.",
        ],
      },
    ],
    solution: [
      "The shipped application takes an uploaded chest X-ray and returns a real-time diagnosis with a confidence score — ONNX inference through FastAPI, drag-and-drop upload in React.",
    ],
    results: [
      { value: "85.1–85%", label: "accuracy — ResNet-18 + pos_weight" },
      { value: "89.3%", label: "F1 score" },
      { value: "100%", label: "pneumonia recall" },
      { value: "5,863", label: "chest X-rays" },
    ],
    stack: [
      { label: "Custom CNN", key: "layers" },
      { label: "ResNet-18", key: "network" },
      { label: "Transfer Learning", key: "transfer" },
      { label: "ONNX", key: "onnx" },
      { label: "FastAPI", key: "fastapi" },
      { label: "React", key: "react" },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Yousef-koura/Deep_Learning_Projects/tree/main/PRJ-004_xray_CNN",
        external: true,
      },
    ],
  },
  {
    slug: "personal-rag-chatbot",
    name: "Personal RAG Chatbot",
    kind: "LLMs · Retrieval",
    domain: "Applied AI · RAG",
    status: "Completed",
    timeframe: "May 2026",
    role: "Developer",
    positioningLine:
      "Grounded natural-language Q&A over Yousef's own CV and portfolio knowledge base.",
    summary:
      "Natural-language Q&A over Yousef's own CV/portfolio knowledge base — PDFs chunked through LangChain, embedded with all-MiniLM-L6-v2, retrieved from ChromaDB, and answered by Groq's Llama 4 Scout behind a FastAPI service.",
    problem: [
      "A CV or portfolio answers only the questions its layout thought to include. A retrieval-augmented chatbot lets a reviewer ask in plain language — \"what did he deploy on Jetson Nano?\" — and get a grounded answer from the underlying documents rather than a generic model's guess.",
    ],
    methodology: [
      {
        label: "Retrieval pipeline",
        body: [
          "PDF knowledge base → LangChain chunking → sentence-transformers embeddings via Hugging Face (all-MiniLM-L6-v2) → ChromaDB vector store → Groq-hosted Llama 4 Scout generates answers grounded in retrieved context.",
        ],
      },
      {
        label: "Serving",
        body: [
          "FastAPI backend with a custom plain HTML/CSS/JS chat UI; FastAPI's lifespan context manager loads the heavy models once at startup.",
        ],
      },
      {
        label: "Lessons learned",
        body: [
          "chunk_overlap matters — too low splits facts across chunk boundaries; persisting the vector store avoids re-embedding on restart; FastAPI's lifespan pattern proved the cleanest way to load heavy models once.",
        ],
      },
    ],
    solution: [
      "The shipped chatbot answers natural-language questions about Yousef's experience and projects with responses grounded in the vector-retrieved source documents — demonstrated in the capture below.",
    ],
    stack: [
      { label: "FastAPI", key: "fastapi" },
      { label: "LangChain", key: "langchain" },
      { label: "ChromaDB", key: "database" },
      { label: "Hugging Face Embeddings", key: "huggingface" },
      { label: "Groq · Llama 4 Scout", key: "sparkles" },
      { label: "HTML/CSS/JS UI", key: "html5" },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Yousef-koura/personal-rag-assistant",
        external: true,
      },
    ],
    image: {
      src: "/projects/rag-assistant.png",
      alt: "Personal RAG Chatbot — grounded question answering over a knowledge base",
      width: 1880,
      height: 827,
    },
    video: { mp4: "/videos/rag-chatbot-demo.mp4" },
  },
  {
    slug: "fmcg-pipeline",
    name: "FMCG Data Engineering Pipeline",
    kind: "Data Engineering",
    domain: "Data · Lakehouse",
    status: "Completed",
    timeframe: "Apr 2026",
    role: "Developer",
    positioningLine:
      "An end-to-end Databricks Lakehouse consolidating a retail acquisition — Bronze → Silver → Gold.",
    summary:
      "An end-to-end Lakehouse consolidation of a large FMCG retailer's acquisition of a smaller company — Databricks, PySpark, Delta Lake and Unity Catalog organized as a Medallion Architecture with Star Schema modeling and incremental loading.",
    problem: [
      "When a large FMCG retailer acquires a smaller company, two incompatible data estates land in one lap: duplicated customers, divergent product catalogs, misaligned pricing, and order history split across systems. The scenario this pipeline models is consolidating exactly that acquisition into a single governed Lakehouse.",
    ],
    methodology: [
      {
        label: "Architecture",
        body: [
          "A Medallion Architecture (Bronze → Silver → Gold) on Databricks using PySpark, Delta Lake, and Unity Catalog, with Star Schema dimensional modeling for the analytical layer.",
        ],
      },
      {
        label: "Ingestion & transformation",
        body: [
          "The ingestion layer uses DBFS simulating AWS S3 landing storage; transformation and modeling run in SQL.",
        ],
      },
      {
        label: "Incremental loading",
        body: [
          "An incremental load job chains four sequential tasks: dim_customers → dim_products → dim_pricing → fact_orders.",
        ],
      },
    ],
    solution: [
      "The shipped pipeline delivers consolidated, incrementally loaded Gold-layer tables behind a live Genie AI dashboard — the walkthrough below shows the working environment.",
    ],
    results: [
      { value: "4", label: "sequential incremental-load tasks" },
    ],
    stack: [
      { label: "Databricks", key: "databricks" },
      { label: "PySpark", key: "apachespark" },
      { label: "Delta Lake", key: "layers" },
      { label: "Unity Catalog", key: "database" },
      { label: "Star Schema", key: "star" },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Yousef-koura/FMCG_Data_Engineer_Project",
        external: true,
      },
    ],
    image: {
      src: "/projects/fmcg-dashboard.png",
      alt: "FMCG Data Engineering Pipeline — Lakehouse dashboard",
      width: 1587,
      height: 705,
    },
    video: { mp4: "/videos/fmcg-pipeline-demo.mp4" },
  },
  {
    slug: "potatoscan",
    name: "PotatoScan",
    kind: "Applied Deep Learning",
    domain: "Agriculture · Computer Vision",
    status: "Completed",
    positioningLine:
      "CNN potato-leaf disease detection, served as a full-stack application.",
    summary:
      "A CNN potato-leaf disease detector served as a full-stack application — FastAPI behind a React frontend.",
    problem: [
      "Potato leaf disease is visible to a trained eye long before it is actionable at scale. PotatoScan applies CNN classification to leaf imagery and packages the model as a usable full-stack application rather than a notebook.",
    ],
    stack: [
      { label: "CNN Classification", key: "layers" },
      { label: "FastAPI", key: "fastapi" },
      { label: "React", key: "react" },
    ],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Yousef-koura/Deep_Learning_Projects/tree/main/PRJ-003_Potato_Disease_CNN",
        external: true,
      },
    ],
  },
  {
    slug: "steganography-detector",
    name: "Steganography Detector",
    kind: "Applied Deep Learning",
    domain: "Computer Vision · Security",
    status: "Completed",
    positioningLine:
      "A CNN classifier that detects hidden data embedded in images — 90% accuracy.",
    summary:
      "A CNN classifier that detects hidden data embedded in images, reaching 90% classification accuracy.",
    problem: [
      "Steganography hides payloads inside ordinary-looking images, which defeats filename- and metadata-based screening. This detector trains a CNN to classify whether an image carries hidden data from the pixels themselves, reaching 90% accuracy.",
    ],
    results: [{ value: "90%", label: "classification accuracy" }],
    stack: [{ label: "CNN Classification", key: "layers" }],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Yousef-koura/Steganography-Detector",
        external: true,
      },
    ],
  },
];

export const projectSlugs = projectDetails.map((project) => project.slug);

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails.find((project) => project.slug === slug);
}

/** Curated-order previous/next navigation for detail pages. */
export function getAdjacentProjects(slug: string): {
  previous?: Pick<ProjectDetail, "slug" | "name">;
  next?: Pick<ProjectDetail, "slug" | "name">;
} {
  const index = projectDetails.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous:
      index > 0
        ? { slug: projectDetails[index - 1].slug, name: projectDetails[index - 1].name }
        : undefined,
    next:
      index < projectDetails.length - 1
        ? { slug: projectDetails[index + 1].slug, name: projectDetails[index + 1].name }
        : undefined,
  };
}

/**
 * WORK page — secondary numbered index (PHASE 4B, copy fix 2026-08-23):
 * old-site-only builds included by explicit user decision. One-line
 * descriptions trace to `yousef-portfolio-content.md` §6; internal
 * process notes are never rendered to visitors.
 *
 * Still consumed by Home's SelectedWork preview rows.
 */
export type WorkIndexEntry = {
  name: string;
  domain: string;
  timeframe?: string;
  summary: string;
  links: { label: string; href: string; external?: boolean }[];
};

