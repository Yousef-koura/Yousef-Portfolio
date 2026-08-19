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