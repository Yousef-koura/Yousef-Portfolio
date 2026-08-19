# Yousef Koura — Portfolio Content Reference

Consolidated source-of-truth for building/updating the portfolio website. Compiled from: updated resume (docx, most current), LinkedIn export (txt), and the existing live portfolio HTML. Where sources conflict, the **resume is treated as authoritative** (most recently updated); conflicts are flagged in the Notes section at the bottom.

---

## 1. Identity & Contact

- **Name:** Yousef Koura (also goes by Yousef Ahmed)
- **Title:** Machine Learning Engineer (junior / early-career)
- **Location:** Menoufia, Egypt
- **Military service:** Completed
- **Email:** yousefahmed.ae20@gmail.com
- **Phone:** +20 107 047 5596
- **Portfolio site:** https://yousef-koura.github.io/
- **LinkedIn:** https://linkedin.com/in/yousefkoura
- **GitHub:** https://github.com/Yousef-koura

## 2. Positioning (from AI Fluency Track work)

- **Audience:** ML hiring managers / recruiters
- **One core claim:** "I can ship production ML systems, not just notebooks."
- **One desired action:** get the visitor to message him or book a call
- **Sitemap (intentional, agreed scope):** Hero/Home → Work/Case Studies → About → Contact. Deliberately **no** standalone Skills page, **no** blog, **no** testimonials page.

## 3. Summary / About Text

**Resume version (current):**
Junior Machine Learning Engineer with a Mechatronics Engineering background and hands-on experience across machine learning, computer vision, and data engineering, gained through internships and applied projects. Interested in machine learning and building end-to-end AI-driven products, currently building and launching a live SaaS platform (Yalla7gez) while continuing to grow as an ML engineer.

**LinkedIn "About" version (more detailed, slightly older framing):**
Junior Machine Learning Engineer specializing in Computer Vision and Applied AI, with a Mechatronics Engineering foundation (GPA 3.62/4). Built classification/prediction models across healthcare (tumor classification), finance (loan repayment prediction), real estate (housing price prediction), and ad targeting — CNNs, YOLO-based object detection, Python, TensorFlow. Graduation project: AI-powered plant disease detection robot (YOLOv8-MobileNetV3 + TensorRT on Jetson Nano, ~20 FPS, 96% accuracy), published at IUGRC 2024. Currently interning on the ML team at FlyRank AI on an end-to-end ML workflow (data prep, feature engineering, leakage auditing, group-based validation, model evaluation). Mechatronics background → thinks about AI systems end-to-end, sensor data to deployment, reinforced by hands-on Docker/Kubernetes work.
Open to: **Junior Machine Learning Engineer, AI Engineer, Computer Vision Engineer** roles.

## 4. Experience

### Machine Learning Intern — FlyRank AI (Chicago, USA · Remote)
**Jun 2026 – Present**
- Analyzed FlyRank's data warehouse (`fact_content_daily_performance`) using Python, Pandas, and SQL to evaluate content/page performance; aggregated raw records to page/client level, defined a data contract, selected 5 key features to formulate a page-prioritization problem.
- Designed a temporal train/test split (train on March, out-of-time evaluate on April) instead of random splitting to test real-world generalization.
- Built an interpretable Decision Tree model in Scikit-learn, benchmarked against a rule-based baseline; applied EDA, correlation analysis, and feature selection to justify model choice.
- Completed applied training in Claude Code, Claude Platform, and MCP — building/testing MCP servers/clients with the Python SDK; completed AI Fluency coursework applying the 4D framework (Description, Discernment, Delegation, Diligence) to responsible AI use.
- *(LinkedIn version adds broader framing: GroupKFold cross-validation grouped by client to prevent client-level leakage; output translated into a "Content Action Playbook" for SEO/content teams. Tools: Python, pandas, NumPy, scikit-learn, Jupyter Notebooks, Git/GitHub.)*

### Technical Office Engineer, License Department — Egyptian Armed Forces Engineering Authority (Cairo, Egypt · On-site)
**Jan 2025 – Mar 2026 (1 yr 3 mos)** — mandatory military service
- Supported technical-office activities within the Engineering Authority; worked with engineering documentation and administrative processes related to the licensing department.
- Coordinated technical documentation and follow-up activities across engineering functions.
*(Note: this is military service — include only if desired; resume omits it as an "experience" entry and instead just notes "Military Service Completed" in the header.)*

### Machine Learning Intern — PioPetro (Ohio, USA · Remote)
**Jun 2024 – Aug 2024**
- Built and evaluated 4+ predictive models in Python/Scikit-learn for petroleum production forecasting across Exploration, Artificial Lift, and Well Stimulation use cases; achieved up to **87% R² score** on held-out test sets.

### Machine Learning Intern — Information Technology Institute (ITI) (Menoufia, Egypt)
**Jul 2023 – Sep 2023**
- Built and benchmarked 6+ supervised/unsupervised Scikit-learn models (classification, regression, clustering) across structured datasets; achieved up to **97% F1** on held-out test sets.
- Applied cross-validation, hyperparameter tuning, and evaluation metrics (Accuracy, F1, RMSE).

### AI Intern — Digital HUB (D-HUB) (Cairo, Egypt)
**Aug 2023 (1 mo)**
- Built a breast cancer detection classifier achieving **96% accuracy** using CNNs and Scikit-learn; awarded **3rd place** in a competitive AI challenge co-hosted with the Electronics Research Institute.
- *(LinkedIn version describes this as a 4-project internship: Breast Cancer Detection, Loan Repayment Prediction, Housing Price Prediction, Social Media Ad Placement — all classification/regression projects using data prep, feature selection, model training/evaluation.)*

## 5. Education

**B.Sc. Mechatronics Systems Engineering** — GPA 3.62/4.0 *(LinkedIn lists 3.63/4)*
Sep 2019 – Jul 2024
MSA University (Modern Sciences and Arts University), Giza, Egypt — dual-accredited, supervised/delivered in partnership with **University of Greenwich, UK** (BEng, Mechatronics, Robotics & Automation Engineering)

## 6. Projects

### Yalla7gez — Bilingual SaaS Court Booking Platform
**Founder & Developer · Jun 2026 – Present**
- Two-sided marketplace SaaS in **Next.js, TypeScript, Supabase, Tailwind CSS** for padel/football court owners and players in Egypt; Venue → Court hierarchy; full Arabic/English localization.
- Designed atomic booking **PostgreSQL** RPCs and row-level security (RLS) policies to prevent double-booking, including a partial unique index and hardened SECURITY DEFINER functions for concurrent bookings.
- Built an owner analytics dashboard with **Recharts** (period-over-period deltas, booking heatmaps) and a player booking flow with dynamic slot generation, session grouping, cancellations.
- Developed a **Vitest** integration test suite (58+ tests) and middleware-based route protection.

### Agri-Bot — AI-Powered Crop Disease Detection Robot
**Graduation Project · Nov 2023 – Jun 2024**
- 3-stage inference pipeline: **YOLOv8** (plant detection) → **MobileNetV2** (disease classification) → fuzzy PID (autonomous motor response).
- Deployed on NVIDIA **Jetson Nano** at **20 FPS, 96% accuracy**.
- Published at **IUGRC 2024** (8th International Undergraduate Research Conference, Military Technical College), Jul 28, 2024. Paper title: "AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot."
- Also includes fuzzy PID motor control and a web interface (per older site copy).
- GitHub: https://github.com/Yousef-koura/AGRI-BOT

### Personal RAG Chatbot
**May 2026**
- AI chatbot using **LangChain, ChromaDB, Groq (Llama 4 Scout)**, FastAPI backend, custom HTML chat UI — natural language Q&A over Yousef's own CV/portfolio knowledge base.
- Pipeline: PDF knowledge base → LangChain chunking → sentence-transformers / HuggingFace embeddings (all-MiniLM-L6-v2) → ChromaDB retrieval → Groq Llama 4 Scout generates grounded answer.
- Lessons learned: chunk_overlap matters (too low splits facts across boundaries); persisting the vector store avoids re-embedding on restart; FastAPI's lifespan context manager is the cleanest way to load heavy models once at startup.
- Tech stack: FastAPI, LangChain, ChromaDB, HuggingFace Embeddings, Groq API/Llama 4 Scout, plain HTML/CSS/JS chat UI.
- GitHub: https://github.com/Yousef-koura/personal-rag-assistant

### FMCG Data Engineering Pipeline
**Apr 2026**
- End-to-end Lakehouse pipeline on **Databricks** using **PySpark, Delta Lake, Unity Catalog**, Medallion Architecture (Bronze → Silver → Gold), Star Schema modeling, incremental loading, live Genie AI dashboard.
- Scenario: consolidating a large FMCG retailer's acquisition of a smaller company into one Lakehouse.
- Ingestion layer: DBFS (simulating AWS S3); transformation/modeling in SQL.
- Incremental load job with 4 sequential tasks: dim_customers → dim_products → dim_pricing → fact_orders.
- GitHub: https://github.com/Yousef-koura/FMCG_Data_Engineer_Project

### Chest X-Ray Pneumonia Classification (PneumoScan)
**May 2023 / Apr 2026 per site**
- Compared custom CNN vs. ResNet-18 transfer learning on **5,863 chest X-rays** (LinkedIn/site says 5,216); addressed class imbalance via `pos_weight` and `WeightedRandomSampler`.
- Models compared: Custom CNN baseline (75% accuracy); ResNet-18 + loss reweighting (**85.1–85% accuracy, 89.3% F1, 100% pneumonia recall**); ResNet-18 + weighted sampling (80% accuracy). Winner: ResNet-18 + pos_weight reweighting.
- Deployment: exported to **ONNX**, served via **FastAPI** backend, custom **React.js** frontend for drag-and-drop X-ray upload with real-time diagnosis + confidence score.
- GitHub: https://github.com/Yousef-koura/Deep_Learning_Projects/tree/main/PRJ-004_xray_CNN

### Other projects referenced on existing site (not in resume — verify before including)
- **Ball Tracking Robot** — OpenCV + PID control, 95% detection accuracy, sub-5cm tracking error, real-time visual servoing. GitHub: https://github.com/Yousef-koura/Ball-Tracking-Robot
- **Steganography Detector** — CNN-based hidden data detection, 90% classification accuracy. GitHub: https://github.com/Yousef-koura/Steganography-Detector
- **Breast Cancer AI** (standalone repo) — 95% accuracy, 3rd place challenge winner. GitHub: https://github.com/Yousef-koura/Breast-Cancer-Ai
- **Machine Learning Projects** (collection) — 8+ ML projects (regression/classification/clustering); best model 94% accuracy on housing price prediction. GitHub: https://github.com/Yousef-koura/Machine-Learning-Projects
- **PotatoScan — AI Potato Disease Detector** — CNN leaf disease detection, full-stack FastAPI + React app. GitHub: https://github.com/Yousef-koura/Deep_Learning_Projects/tree/main/PRJ-003_Potato_Disease_CNN
- **SQL Projects** — 15+ SQL exercises (window functions, CTEs, joins, query optimization) + interactive Tableau dashboard for bike-share data. GitHub: https://github.com/Yousef-koura/SQL_Projects

## 7. Skills

**Programming & ML/DL:** Python, SQL, Supervised & Unsupervised Learning, Neural Networks, CNNs, RNNs, Transfer Learning, Object Detection (YOLO), LLMs, RAG

**Frameworks:** TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, FastAPI, OpenCV, LangChain, LangSmith

**Data & Web:** ETL/ELT, Medallion Architecture, Delta Lake, Databricks, Star Schema, Next.js, TypeScript, Supabase, Tailwind CSS, PostgreSQL

**MLOps & Soft Skills:** Git, GitHub, Docker, Kubernetes, AWS, Problem-solving, Time management, Adaptability, Research

## 8. Publications

**"AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot"**
Published at the 8th International Undergraduate Research Conference (IUGRC 8), Military Technical College — Jul 28, 2024.

## 9. Certifications

- Machine Learning Specialization — Coursera / DeepLearning.AI (Supervised ML: Regression and Classification), 2023
- Python 101 for Data Science — IBM / Cognitive Class, Mar 2021 (Credential ID: 66e18320d71547fd92f901d4ce92c636)
- The Arduino Platform and C Programming — Coursera, Apr 2022
- Introduction to Containers w/ Docker, Kubernetes & OpenShift — IBM, Jun 2026 (Credential ID: K2VTBZZPH0WO)
- Claude & MCP Training — Claude 101, Cowork, Code 101/In Action, Platform 101, MCP (2026)
- AI Fluency — 4D Framework (2026)

## 10. Languages

- Arabic — Native or bilingual proficiency
- English — Professional working proficiency

## 11. Related in-progress work (context, not necessarily site content)

- **ML capstone project:** a research-paper-style HTML report on a ranking-pages/decision-support model built from FlyRank search-visibility signals, deployed on GitHub, currently being redesigned visually (separate from the main portfolio site).
- **FlyRank AI Fluency Track:** 8-week track producing weekly assignments (FL-01, FL-02, ...); FL-01 covered an AI workflow audit, FL-02 defined the portfolio sitemap above.

---
