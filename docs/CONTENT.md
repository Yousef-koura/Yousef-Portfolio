# CONTENT.md — Content Inventory

## Source

Authoritative content lives in **`yousef-portfolio-content.md`** (consolidated from resume, LinkedIn, and the old live site; resume treated as authoritative). Previous cross-source conflicts have been resolved with resume-authoritative values and must not be re-opened. This file is an inventory/status index, not a duplicate. Content must be verified against the source before being written into the site.

Status labels:
- **CONFIRMED** — supported by the source material, no open conflict
- **PROVISIONAL** — present but has an open conflict or needs verification
- **MISSING** — not available; do not invent it

---

## Identity

- **CONFIRMED** — Name: Yousef Koura (also goes by Yousef Ahmed); Title: Junior / early-career Machine Learning Engineer; Location: Menoufia, Egypt; Military service: completed.
- **CONFIRMED (user-provided, 2026-08-23 — not present in `yousef-portfolio-content.md`; DECISIONS #51)** — Born 2002; lived in the UAE (Sharjah and Dubai) until 2019, then moved to Egypt for university. Live on `/about` as plain biographical statements in the "Who I am" copy — no traits or claims attached to them.
- **CONFIRMED (user-provided, 2026-08-23 — not present in `yousef-portfolio-content.md`; DECISIONS #51)** — Played football at Emirates Club (UAE) youth academy, ages 15–18, position: left wing. Same rendering rule as above.
- **CONFIRMED** — B.Sc. Mechatronics Systems Engineering background.
- **CONFIRMED** — GPA: 3.62/4.0 (resume-authoritative; LinkedIn alternative superseded).

## Professional positioning

- **PROVISIONAL** — Prior AI Fluency work defined audience ("ML hiring managers/recruiters") and a core claim ("I can ship production ML systems, not just notebooks."). The portfolio represents a **complete professional**, not only an ML engineer.
- **CONFIRMED** — Approved high-level sitemap: HOME, WORK, ABOUT, EXPERIENCE, PUBLICATIONS, CONTACT. RESUME is a persistent action, not a mandatory page. No standalone Skills page (skills appear contextually). See [DECISIONS.md](./DECISIONS.md) #14–15.
- **CONFIRMED** — Final positioning statement (decided 2026-08-22): "I build the systems beneath a useful interface: models, data, and decisions brought into the same room." Live in the Home "01 — SIGNAL / INTENT" statement section (`PortalArchive.tsx`) with the section's single champagne `<em>` accent on "models, data, and decisions". See [DECISIONS.md](./DECISIONS.md) #39.
- **IMPLEMENTED (user-directed, Aug 2026)** — The role line **"Machine Learning Engineer"** is now live in the Home arrival flow (portal statement section, above the confirmed positioning copy; see `PortalArchive.tsx`). This implements the role identity only; it is separate from the now-confirmed positioning statement above ([DECISIONS.md](./DECISIONS.md) #39) and does not replace it.

## Projects

- **CONFIRMED** — Movenue (formerly Yalla7gez; SaaS court management and booking platform, founder/developer, Jun 2026–present; Next.js, TypeScript, Supabase, Tailwind, PostgreSQL, Recharts, Vitest; live at https://movenue.vercel.app/).
- **CONFIRMED** — Agri-Bot (graduation project, YOLOv8 → MobileNetV2 → fuzzy PID, Jetson Nano, 20 FPS, 96% accuracy, IUGRC 2024 publication).
- **CONFIRMED** — Personal RAG Chatbot (LangChain, ChromaDB, Groq Llama 4 Scout, FastAPI, May 2026).
- **CONFIRMED** — FMCG Data Engineering Pipeline (Databricks, PySpark, Delta Lake, Unity Catalog, Medallion Architecture, Apr 2026).
- **CONFIRMED** — PneumoScan / Chest X-ray pneumonia classification (5,863 X-rays; custom CNN vs ResNet-18, ONNX + FastAPI + React, May 2023/Apr 2026). **Known source anomalies, rendered verbatim where shown and awaiting user correction:** the accuracy figure appears in the source as "85.1–85%" and the timeframe is dual-date ("May 2023 / Apr 2026").
- **PROVISIONAL → PARTIALLY RESOLVED (2026-08-23, DECISIONS #42; presentation updated 2026-08-23, DECISIONS #43; now rendered as honest short detail pages per DECISIONS #44)** — Old-site-only projects not in the resume: Ball Tracking Robot, Steganography Detector, standalone Breast Cancer AI repo, ML Projects collection, PotatoScan, SQL Projects. **User decision recorded:** only **PotatoScan** and **Steganography Detector** are included — on the WORK page's secondary index (06–07), now titled **"Additional builds"**; NOT presented as fully proven. Per #43 the tier no longer narrates internal process: each row carries a real one-line description sourced from this file's §6 (PotatoScan — CNN potato-leaf disease detector served full-stack, FastAPI behind React; Steganography Detector — CNN detecting hidden data in images, 90% classification accuracy), replacing the earlier "slimmer documentation / write-ups pending verification" process language, which was internal-only and never meant for visitors. The other four remain excluded. Source still says "verify before including" — fuller detail for these two is still needed before any richer presentation.
- **CONFIRMED** — Resolved values (resume-authoritative): PneumoScan uses 5,863 images; Agri-Bot uses MobileNetV2 for disease classification; inflated old-site counts rejected.

## Experience

- **CONFIRMED** — Machine Learning Intern, FlyRank AI (Chicago, USA · Remote; Jun 2026–present). Data warehouse analysis, temporal train/test split, Decision Tree model, MCP/Claude training, AI Fluency (4D framework).
- **CONFIRMED** — Technical Office Engineer, License Department, Egyptian Armed Forces Engineering Authority (Cairo, Egypt; Jan 2025–Mar 2026, mandatory military service). **RESOLVED for ABOUT (2026-08-23, DECISIONS #49):** presented on `/about` as a narrative prose paragraph describing the actual role content (technical-office support, engineering documentation, licensing-department administrative processes, cross-function coordination) — not as a title/org/dates timeline entry. EXPERIENCE's future milestone inherits this ruling.
- **CONFIRMED** — Machine Learning Intern, PioPetro (Ohio, USA · Remote; Jun–Aug 2024). 4+ predictive models, up to 87% R².
- **CONFIRMED** — Machine Learning Intern, ITI (Menoufia, Egypt; Jul–Sep 2023). 6+ scikit-learn models, up to 97% F1.
- **CONFIRMED** — AI Intern, Digital HUB (D-HUB) (Cairo, Egypt; Aug 2023). Breast cancer classifier, 96% accuracy, 3rd place in ERI challenge. Resume framing is authoritative.
- **CONFIRMED** — FlyRank exposure (GroupKFold client-grouped validation, Content Action Playbook framing) is available for richer descriptions where useful.

## Education

- **CONFIRMED** — B.Sc. Mechatronics Systems Engineering, Sep 2019–Jul 2024, MSA University (Giza, Egypt), in partnership with University of Greenwich, UK (BEng Mechatronics, Robotics & Automation Engineering).
- **CONFIRMED** — GPA 3.62/4.0 (see Identity).

## Publications

- **CONFIRMED** — "AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot," 8th International Undergraduate Research Conference (IUGRC 8), Military Technical College, Jul 28, 2024. Certificate image available in `projects&certificate_images/`.

## Research

- **MISSING** — No formal research section beyond the IUGRC publication (which is recorded under Publications). Related in-progress work: ML capstone HTML report on ranking-pages model (context, not necessarily site content).

## Skills

- **CONFIRMED** — Full skill list in the source (Programming/ML-DL, Frameworks, Data & Web, MLOps & Soft Skills). May be trimmed/reorganized in later phases; do not add skills not in the source.

## Certifications

- **CONFIRMED** — ML Specialization (Coursera/DeepLearning.AI, 2023); Python 101 for Data Science (IBM/Cognitive Class, Mar 2021, has credential ID); Arduino Platform & C Programming (Coursera, Apr 2022); Intro to Containers w/ Docker/Kubernetes/OpenShift (IBM, Jun 2026, has credential ID); Claude & MCP Training (2026); AI Fluency — 4D Framework (2026).
- **RESOLVED for ABOUT (2026-08-23, DECISIONS #50)** — Certifications appear on `/about` ONLY as contextual inline mentions inside the trajectory narrative (ML Specialization at the ITI moment; IBM Containers/Docker/Kubernetes/OpenShift at FlyRank). No standalone certification list/block exists on ABOUT; certifications without a woven moment there are intentionally omitted from that page. The old site's inflated "8 certifications" figure remains rejected. Certificate images remain available in `public/certificates/` for future phases. Presentation depth on other pages (EXPERIENCE/CONTACT/resume) remains a per-milestone decision.

## Achievements

- **CONFIRMED** — D-HUB 3rd place (ERI challenge). Project metrics (96% accuracy, 87% R², 97% F1, etc.) are confirmed per the source; verify exact figures against the source at publish time.
- **CONFIRMED** — Old-site inflated stats ("30+ projects", "8 certifications") are rejected; real project/cert lists are the source.

## Robotics

- **CONFIRMED** — Agri-Bot (detection robot, fuzzy PID, Jetson Nano).
- **PROVISIONAL** — Ball Tracking Robot (OpenCV + PID; old-site-only, user decision needed on inclusion).
- **CONFIRMED** — Mechatronics engineering education and military engineering-office experience support the robotics narrative.

## Machine Learning / AI

- **CONFIRMED** — Computer vision (CNNs, YOLO), classic ML (supervised/unsupervised), LLMs/RAG, MLOps exposure (Docker/Kubernetes), end-to-end ML workflow experience at FlyRank.
- **CONFIRMED** — Domain projects: healthcare, finance, real estate, ad targeting, agriculture.

## Other relevant work

- **CONFIRMED** — Movenue (founder/product work, bilingual SaaS) — relevant to product/engineering story.
- **CONFIRMED** — Military service engineering-office work (ABOUT presentation resolved — see Experience; DECISIONS #49).
- **CONFIRMED** — MCP / Claude platform training and applied building.

## Contact information

- **CONFIRMED** — Email: yousefahmed.ae20@gmail.com.
- **CONFIRMED** — Phone: +20 107 047 5596 (resume format is authoritative).
- **CONFIRMED** — Location: Menoufia, Egypt. Open to Junior ML Engineer / AI Engineer / Computer Vision Engineer roles (from LinkedIn framing).

## External links

- **CONFIRMED** — LinkedIn: https://linkedin.com/in/yousefkoura
- **CONFIRMED** — GitHub: https://github.com/Yousef-koura
- **CONFIRMED** — Current portfolio site: https://yousef-koura.github.io/
- **CONFIRMED** — Project repos: AGRI-BOT, personal-rag-assistant, FMCG_Data_Engineer_Project, Deep_Learning_Projects (PRJ-004 xray CNN, PRJ-003 Potato Disease CNN), plus old-site-only repos pending verification.

## Available assets

*(Reorganized 2026-08-23 — asset audit: byte-duplicates of in-use `public/` files removed from the raw folder; future-phase certificates relocated to `public/certificates/`; raw sources preserved. See ROADMAP.md Phase 13 prep entry.)*

- **CONFIRMED** — Served project images live in `public/projects/` and are referenced from `src/content/projects.ts` and the Home portal archive: `agribot.png`, `rag-assistant.png`, `fmcg-dashboard.png`, `movenue.png` (718×618 crop), `iugrc-certificate.png`.
- **CONFIRMED** — Raw-source archive retained in `projects&certificate_images/`: `Yousef personal photo.png` (1024×1024 raw portrait source; DECISIONS #34) and `movenue.png` (1898×848 full-page capture of the live Movenue site — the sole full-res source of the served `movenue.png` crop; not a duplicate). Do not delete or move these.
- **CONFIRMED** — Certificate images for the future Certifications/Experience presentation (Phase 11) relocated to `public/certificates/`: `iti-mlal-certificate.png`, `piopetro-certificate.png`, `dhub-certificate.png`. Not yet referenced in code.
- **AWAITING USER DECISION** — Unreferenced, undocumented candidates flagged by the 2026-08-23 audit (still in `projects&certificate_images/`): `breast cancer.jpg` (illustration tied to the excluded Breast Cancer AI project, DECISIONS #42) and `logo - white.png` / `logo - black.jpeg` (possible Phase 5 brand inputs; differ from the `logo-wordmark*.png` pair actually used).
- **CONFIRMED** — Portrait: the site uses the transparent PNG pair in `public/portrait/` — `personal-image-desktop.png` (365×684, ≥761px viewports) and `personal-image-mobile.png` (394×634, below) — **approved for the Home opening** (clean cutouts at native aspect ratio via `<picture>` art direction with a one-time load reveal, DECISIONS #28–34) **and for ABOUT** (2026-08-23, DECISIONS #48) as a small static inline figure beside the opening statement.
- **CONFIRMED** — Demo media in `public/videos/`: three encoded MP4s + poster stills in active use (`agribot-demo.mp4`, `rag-chatbot-demo.mp4`, `fmcg-pipeline-demo.mp4`) and their source AVI captures, intentionally retained on disk per DECISIONS #44(c). Voice intro at `public/audio/intro voice.mp3`.
- **MISSING** — Favicon / logo mark / brand assets (expected in Phase 5 Brand System; two candidate raw logo files flagged above).

---

## Do not invent

Anything marked MISSING or PROVISIONAL must not be written as confirmed fact into the site. Flag it to the user instead.
