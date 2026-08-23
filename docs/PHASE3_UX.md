# PHASE3_UX.md — Approved Phase 3 UX / Page Architecture

## Status

**PHASE 3 — UX / PAGE ARCHITECTURE: APPROVED.** This document records the reviewed and approved page-level UX architecture derived from the Phase 3 investigation report. It defines exactly what every page needs to accomplish before visual layouts are designed (Phase 4).

This is planning/architecture only — no implementation decisions are made here for routes, components, code, or visual layouts. It intentionally does NOT resolve the content questions that remain user decisions.

## Document map

| Document | Purpose |
| --- | --- |
| **PHASE3_UX.md** | Approved page-level UX architecture (this document) |
| ROADMAP.md | Long-term execution plan and progress tracker (primary navigation) |
| PROJECT.md | Current project context |
| DECISIONS.md | Decision history |
| AGENTS.md | Rules for agents |
| DESIGN_SYSTEM.md | Visual/design system |
| CONTENT.md | Portfolio content source |
| TECH_STACK.md | Technical architecture |

## Phase 3 scope (from ROADMAP.md)

Phase 3 goal: **Define exactly what every page needs to accomplish before designing the visual layouts.**

Scope: Global UX, header/navigation, footer, CTA strategy, HOME / WORK / ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT page architecture, project content model, project media model, mobile UX, recruiter journey.

Deliverable: **Approved page-level UX architecture** (this document).

---

## 1. Global UX

### Confirmed context

The portfolio is a **complete professional personal portfolio**, not an ML-only portfolio. It presents Yousef Koura as a professional with technical credibility, engineering ability, personality, breadth, strong visual taste, and evidence rather than generic claims.

- Objective: a single, premium, highly visual web experience that frames the person and the work credibly, invites exploration, and makes it easy for the right people to connect.
- Primary audience: ML/AI hiring managers and recruiters. Secondary: engineering collaborators and peers; potential clients or partners for the SaaS/product work; anyone evaluating the portfolio as professional evidence.

### Approved sitemap (Decisions #14–15)

- **HOME**
- **WORK**
- **ABOUT**
- **EXPERIENCE**
- **PUBLICATIONS**
- **CONTACT**
- **RESUME** — a persistent, prominent action/link, NOT a mandatory top-level page.
- **SKILLS** — intentionally NOT a standalone top-level page. Skills appear contextually: in projects, experience, about/profile, and relevant technical sections. No shallow tech-listing page.

### Approved interaction language (Decisions #18–19)

- Smooth scrolling (Lenis)
- Scroll-linked reveals
- Sticky sections
- Project card stacking
- Subtle parallax
- Magnetic interactions where appropriate
- Hover states
- Page/section transitions
- Selective 3D (Three.js / React Three Fiber) where it has a purpose — never everywhere

Principle: **motion serves content.** Motion communicates hierarchy or interaction and must never block usability. Aesthetic guardrails: architectural, premium, technical, mature, restrained; no neon, no rainbow gradients, no generic "AI neon" look, no excessive glow. Accent discipline: approximately **95% restrained neutrals, 5% accent** — the Champagne accent is for interaction, emphasis, selected states, important metadata, CTA emphasis, and subtle decorative details.

### Approved visual identity (for architecture reference only)

- Direction: **PREMIUM + TECHNICAL + PERSONAL + MODERN**
- Palette: **Obsidian + Champagne** (tokens in DESIGN_SYSTEM.md). Background `#0B0C0E`, Surface `#14161A`, Primary text `#F3F0E8`, Secondary text `#A9A9A3`, Accent `#C9A86A`, Accent highlight `#E3C98E`, Border `#2A2C30`.

### Cross-cutting rules that govern every page

- **Content first, implementation second.** Architecture exists to frame the work and the person.
- **Evidence over adjectives.** Real project evidence must remain real; no unsupported claims in copy or UI.
- **Mobile is a first-class experience**, not a degraded desktop.
- **Performance is part of quality** — optimized media, lazy loading, GPU-friendly transforms, selective WebGL, code splitting where appropriate.
- **Accessibility matters** — strong contrast, semantic markup, focus states, keyboard navigation, `prefers-reduced-motion` respected; content hierarchy must survive without animation.
- **SEO and metadata matter** — title, description, Open Graph, sitemap, robots, structured data where appropriate.
- **Resume-authoritative content.** Content must be verified against the source (`yousef-portfolio-content.md`) before being written into the site.
- No database, CMS, auth, or backend. Content lives in the repository.

---

## 2. Header / navigation

### Purpose

The header is the persistent wayfinding system. It must make the site's structure obvious at a glance, keep RESUME always reachable, and never get in the way of the content.

### Architecture

- Persistent header across all pages.
- Primary navigation reflects the approved sitemap: HOME, WORK, ABOUT, EXPERIENCE, PUBLICATIONS, CONTACT.
- RESUME is a persistent, prominent action in the header (link/action rather than page).
- Navigation states: default, scrolled, and active-page indication (selected states use the accent per the 5% discipline).
- Site identity (name/wordmark) in the header — final mark is OPEN (Phase 5), do not finalize.
- Contact should be reachable via navigation (CONTACT page) and via the persistent CTA strategy (see Section 4).

### Rules

- Navigation must communicate hierarchy and interaction via motion; it must never block usability.
- The header must not overload the user — calm, editorial, premium.
- Requires responsive + mobile treatment (see Section 11 — Mobile UX).

---

## 3. Footer

### Purpose

The footer is the closing utility layer: secondary navigation, essential contact signals, and identity/credibility markers. It is the last persistent place to route the user toward connection.

### Architecture

- Identity recap (name/wordmark) and short professional context.
- Secondary navigation mirroring the primary sitemap where useful.
- Essential contact signals: email, LinkedIn, GitHub, location (Menoufia, Egypt), and RESUME link.
- Legal/credibility markers as appropriate (e.g., copyright line, "Built with …" acknowledgment optional).
- Final CTA affordance toward CONTACT/RESUME if not already exhausted in the page (see CTA strategy).

### Rules

- Never present unsupported claims in the footer.
- Keep it calm and minimal; the footer should not duplicate the full header weight.
- Contact links use confirmed values only (see Section 10 — CONTACT architecture).

---

## 4. CTA strategy

### Purpose

A small, deliberate set of calls-to-action that moves the primary audience (ML/AI hiring managers and recruiters) toward the two outcomes that matter: **see the evidence** and **connect** (or **view the resume**).

### Approved persistent CTAs

- **RESUME** — persistent action available site-wide (header, footer, and contextual locations). The resume destination/URL is a **pending user decision** — do not invent a resume URL.
- **CONTACT** — persistent route to the CONTACT page (header/footer) plus page-level contact CTAs (especially HOME and WORK).
- **Work/evidence CTA** — route toward WORK and project detail as the primary evidence consumption path.

### CTA hierarchy per context

- **HOME:** one primary CTA for the page (view selected work or connect), backed by secondary CTAs (RESUME, CONTACT). The hero should not fight multiple competing primary actions.
- **WORK:** per-project card CTA (open the project) and a section-level CTA toward CONTACT or RESUME at the end.
- **Project Detail:** CTA toward the next project, back to WORK, and toward CONTACT/RESUME.
- **EXPERIENCE / ABOUT / PUBLICATIONS:** contextual CTAs — resume, contact, or external evidence links (e.g., publication). Not every section needs a big CTA.
- **CONTACT:** the final, unambiguous primary CTA of the site.

### Rules

- Accent is used sparingly for CTA emphasis (5% discipline) — not every element is a CTA.
- CTAs must be real and functional — never dead links, never placeholder destinations.
- Never invent URLs for resume or any external target.

---

## 5. HOME architecture

### Purpose

The homepage is the professional front door. It must, in the first moments, answer: **who is Yousef Koura, what does he do, and why should I keep exploring?** It frames the full professional identity — ML engineering plus robotics/mechatronics, product, and engineering breadth — not only ML.

### Architecture (sequence, in order of intent)

1. **Hero — professional positioning.** Oversized, premium typography; name and role; immediate positioning claim. Purpose: instant clarity of identity and craft. The final positioning statement is **pending user decision** (currently provisional).
2. **Selected work.** A curated, high-evidence preview of the best projects (not all). Routes to WORK and project detail. Purpose: prove capability with real evidence immediately.
3. **About / profile.** A short personal/professional snapshot that makes the person human and credible; routes to ABOUT. Portrait usage is **pending user decision** — note that the portrait has since been approved for and used in the HOME hero (DECISIONS #28); whether it also appears on ABOUT is a later-milestone decision.
4. **Experience preview.** Timeline/roles highlights; routes to EXPERIENCE. Purpose: establish trajectory and professional seriousness.
5. **Publication preview.** The IUGRC publication signal; routes to PUBLICATIONS. Purpose: academic/research credibility.
6. **Capabilities / skills.** Contextual presentation of skills/capabilities — not a shallow tech list; supports the identity claim. Purpose: quick competence framing without a standalone skills page.
7. **Final CTA.** Close the page with a clear path to connect (CONTACT) or RESUME.

### Rules

- Every section must serve either identity, evidence, or a path forward — nothing decorative-only.
- Selectivity is intentional: the homepage previews, it does not dump the full catalog.
- Motion and selective 3D reinforce hierarchy; they never hide content.
- Real metrics only; no inflated counts ("30+ projects", "8 certifications" are rejected).

---

## 6. WORK architecture

### Purpose

WORK is the primary evidence surface. It must make the range of engineering work credible and explorable, and make each project's substance visible within seconds.

### Architecture

- **Project listing.** A curated set of real projects, each with verified content. Presentation order is a Phase 4/5 composition decision.
- **Project card structure.** The card must communicate, at a glance: project identity, domain/context, role, primary technologies, a headline result/evidence signal, and a clear path to detail. Card stacking and hover states are part of the approved interaction language.
- **Filtering / category strategy.** Marked "if useful" in Phase 3 scope — **considered, not yet decided**. Do not silently commit to filters; decide deliberately in Phase 4 if retained. Content is limited enough that lightweight organization (e.g., by domain: healthcare, agriculture, SaaS/product, data engineering, ML tooling) may be sufficient without filter machinery.
- **Project content model.** Every project entry must carry structured fields (not invented — verified against CONTENT.md source):
  - title
  - one-line positioning/summary
  - context (problem/domain)
  - role and ownership
  - approach / what was built
  - technologies used
  - evidence/results (real metrics only — e.g., 96% accuracy Agri-Bot, 87% R² PioPetro, 97% F1 ITI; verify exact figures against source at publish time)
  - date/timeframe
  - links (repo(s), live site if any) — confirmed values only
  - status (e.g., ongoing Movenue, completed)
  - optional: related publication, related education/certification
- **Project media model.** Each project may carry media: real project imagery (available assets in `projects&certificate_images/`), diagrams, dashboards, and video where real. Rules:
  - Real evidence stays real; AI-generated imagery must never be presented as project evidence.
  - Optimize all media (WebP/AVIF, compression, lazy loading).
  - Media supports the story; it never replaces the story.

### Rules

- Include only real, verified projects. Which **old-site-only provisional projects** (Ball Tracking Robot, Steganography Detector, standalone Breast Cancer AI repo, ML Projects collection, PotatoScan, SQL Projects) are included is a **pending user decision** — do not decide silently.
- Project cards and detail must not require hover-only information (mobile and keyboard parity).
- Every project links out to real evidence where it exists.

---

## 7. Project Detail architecture

### Purpose

Project detail is where the portfolio's credibility is proven in depth. It must let a reviewer understand the problem, the role, the approach, the evidence, and how to verify it — without fluff.

### Architecture

- **Project hero/header.** Project identity, domain, role, timeframe, status, key technologies, and headline result.
- **Overview.** The problem and context in plain, professional language.
- **Role and ownership.** What Yousef specifically did (founder/developer, graduation project, intern work, etc.).
- **Approach / build.** Architecture and approach at a technical-but-readable level; the real work, not adjectives.
- **Evidence.** Real metrics, real media (images/diagrams/video), and links to real repos/live artifacts. No unsupported claims.
- **Related context.** Optional: tie to education, certifications, or the IUGRC publication where genuinely connected (e.g., Agri-Bot ↔ publication).
- **Navigation/CTAs.** Next project, back to WORK, and a contextual path to CONTACT or RESUME.

### Rules

- Depth serves review: a recruiter should be able to understand and verify the work without contacting Yousef first.
- Media model and content model from WORK apply here fully.
- Never pad detail pages; if a project is thin on evidence, present it honestly rather than inflating it.

---

## 8. ABOUT architecture

### Purpose

ABOUT makes the professional identity human and complete: the person behind the engineer, the engineering trajectory, and the breadth that makes the portfolio more than an ML showcase.

### Architecture

- **Personal/professional story.** Who Yousef is, professional and personal context (e.g., based in Menoufia, Egypt; military service completed). Portrait usage here is **pending user decision** — do not assume the portrait is approved. *(Resolved 2026-08-23 — DECISIONS #48: approved as a small inline figure; PHASE 4C.)*
- **Engineering trajectory.** The path from Mechatronics Systems Engineering (B.Sc., MSA University, in partnership with University of Greenwich, UK) through ML internships and into product/engineering work — the arc that explains breadth.
- **Education.** B.Sc. Mechatronics Systems Engineering (Sep 2019–Jul 2024), GPA 3.62/4.0 (resume-authoritative).
- **Skills / capabilities where appropriate.** Contextual capability framing — not a standalone skill list.
- **Supporting evidence.** Certifications (presentation of which to show and in what depth is an **open presentation decision** — *(resolved for ABOUT 2026-08-23, DECISIONS #50: contextual inline mentions)*), achievements (e.g., D-HUB 3rd place, ERI challenge), and links to real profiles (LinkedIn, GitHub).

### Rules

- Military service: whether to include it as a formal experience entry or only as "Military service completed" is a **pending user decision** — flag, do not decide. *(Resolved for ABOUT 2026-08-23 — DECISIONS #49: narrative prose paragraph, not a timeline entry.)*
- Every claim must be supported by the source; no invented facts.
- ABOUT must not duplicate EXPERIENCE wholesale — it frames the story; EXPERIENCE carries the timeline detail.

---

## 9. EXPERIENCE architecture

### Purpose

EXPERIENCE is the professional timeline. It must make the trajectory, responsibilities, achievements, and technologies legible at a glance and in depth.

### Architecture

- **Timeline / list structure.** Chronological, role-first presentation. Reverse-chronological is the natural professional convention.
- **Role information.** Organization, role title, location (incl. remote), timeframe, and current/ongoing status where applicable.
- **Responsibilities.** What the role actually involved — concrete, source-backed.
- **Achievements / outcomes.** Real results only (e.g., PioPetro up to 87% R² across 4+ predictive models; ITI 6+ scikit-learn models up to 97% F1; FlyRank data-warehouse analysis, temporal train/test split, Decision Tree model, MCP/Claude training, AI Fluency 4D framework).
- **Technologies / evidence.** Contextual technology tags and, where useful, links to related projects/publications.

### Confirmed experience entries (CONTENT.md)

- **Machine Learning Intern, FlyRank AI** (Chicago, USA · Remote; Jun 2026–present) — current.
- **Technical Office Engineer, License Department, Egyptian Armed Forces Engineering Authority** (Cairo, Egypt; Jan 2025–Mar 2026, mandatory military service) — **inclusion presentation is a pending user decision**.
- **Machine Learning Intern, PioPetro** (Ohio, USA · Remote; Jun–Aug 2024).
- **Machine Learning Intern, ITI** (Menoufia, Egypt; Jul–Sep 2023).
- **AI Intern, Digital HUB (D-HUB)** (Cairo, Egypt; Aug 2023) — resume framing authoritative.

### Rules

- Role-first structure; every entry verifiable against the source.
- FlyRank exposure details (GroupKFold client-grouped validation, Content Action Playbook framing) are available for richer descriptions where useful.
- No invented dates, titles, or metrics.

---

## 10. PUBLICATIONS architecture

### Purpose

PUBLICATIONS gives the research/academic credibility signal: a real publication presented with its context and verifiable evidence.

### Architecture

- **Publication cards.** The IUGRC 8 publication ("AgRobot: Towards AI-Powered Crop Disease Detection and Medication Recommendation Robot", 8th International Undergraduate Research Conference, Military Technical College, Jul 28, 2024). Card shows title, venue, date, and connection to Agri-Bot.
- **Publication details.** Abstract-level context, what was built/contributed, and the research context (conference, year).
- **External links / PDFs.** Link to the real publication/certificate evidence where it exists (certificate image available in `projects&certificate_images/`). No invented PDF URLs.
- Relationship to projects: Agri-Bot ↔ publication connection is genuine and should be surfaced.

### Rules

- Only real publications with real evidence.
- No fabricated links or PDFs — external targets must be confirmed before implementation.

---

## 11. CONTACT architecture

### Purpose

CONTACT is the conversion point of the site: make it effortless for the right people to connect with Yousef.

### Architecture

- **Primary CTA.** An unambiguous "get in touch" action — the site's final CTA.
- **Email.** `yousefahmed.ae20@gmail.com` (confirmed).
- **LinkedIn.** `https://linkedin.com/in/yousefkoura` (confirmed).
- **GitHub.** `https://github.com/Yousef-koura` (confirmed).
- **Resume.** Resume link/action — **destination URL is a pending user decision**; do not invent one.
- **Optional booking/contact mechanism.** Considered; **not decided** — no form/backend is approved (no database/CMS/auth/backend per stack). Decide deliberately if a mechanism beyond direct contact links is genuinely needed.
- Location context: Menoufia, Egypt; open to Junior ML Engineer / AI Engineer / Computer Vision Engineer roles (from LinkedIn framing).

### Rules

- Every contact target must be a confirmed value — no placeholders, no invented URLs.
- Phone number availability: +20 107 047 5596 exists on the resume; whether/how it is displayed on-site is a presentation detail to confirm before implementation.
- Keep the final CTA calm and prominent, consistent with the 5% accent discipline.

---

## 12. Mobile UX

### Purpose

**Mobile is a first-class experience.** The architecture must hold its hierarchy and quality on small screens; it must never read as a degraded desktop.

### Architecture

- **Mobile hierarchy.** Same information intent as desktop, re-prioritized for a single-column, thumb-first flow. Content hierarchy must survive without animation.
- **Navigation.** A compact mobile navigation pattern that keeps RESUME and CONTACT reachable; hamburger/menu states per Phase 4 design. Persistent header must not consume vertical space aggressively.
- **Responsive content density.** Reduced density, larger touch targets, readable type; cards and project detail reflow; images optimized for mobile bandwidth.
- **Animation reductions.** Respect `prefers-reduced-motion`; simplify or remove parallax/3D/stacking where they cost performance or usability on device. Reduce 3D complexity on mobile.
- **Performance.** Optimized media, lazy loading, GPU-friendly transforms, selective WebGL — mobile first for performance decisions.

### Rules

- Nothing may be hover-only on mobile.
- Tap targets, focus states, and keyboard parity remain mandatory.
- 3D/animation must never block content access on mobile.

---

## 13. Recruiter journey

### Primary journey (ML/AI hiring managers and recruiters)

1. **Arrive on HOME.** Within seconds: name, role, positioning, and a professional identity that is clearly more than "ML engineer". The hero must not leave the reviewer guessing.
2. **Verify the claim.** Route to WORK (primary evidence surface) — selected work, then project detail for depth: problem, role, approach, real metrics, real links. This is where credibility is won.
3. **Check the trajectory.** EXPERIENCE (and ABOUT for context) shows internships, outcomes, education (Mechatronics B.Sc., GPA 3.62/4.0), and breadth — engineering, robotics, product, ML.
4. **Confirm research/academic signal.** PUBLICATIONS (IUGRC) reinforces depth where relevant.
5. **Get the resume.** The persistent RESUME action provides the official document without a mandatory page.
6. **Connect.** CONTACT with confirmed email/LinkedIn/GitHub makes the next step obvious and frictionless.

### Support journey (collaborators, partners/clients, general evaluation)

Same backbone: HOME → WORK/detail → ABOUT → CONTACT, with additional routes to GitHub and LinkedIn. The Movenue product/SaaS work serves the client/partner path.

### Rules

- Every journey step must be reachable from the persistent navigation and page-level CTAs.
- No step may dead-end; each page must provide a forward path.
- The resume destination must exist before launch (pending user decision — must be resolved before Phase 13).

---

## 14. Open questions / blockers (pending decisions — do NOT resolve silently)

These remain user decisions. They are deliberately NOT resolved in this document:

1. **Final positioning statement.** RESOLVED 2026-08-22 — confirmed as "I build the systems beneath a useful interface: models, data, and decisions brought into the same room." (see [DECISIONS.md](./DECISIONS.md) #39 and [CONTENT.md](./CONTENT.md) "Professional positioning").
2. **Resume destination URL.** No resume URL has been confirmed. Do not invent one. Must be resolved before resume CTAs are wired (before Phase 13 content integration).
3. **Portrait approval (HOME resolved, ABOUT open).** The portrait asset (`Yousef personal photo.jpeg`) is **approved for the Home hero** (DECISIONS #28). Whether/where the portrait also appears on ABOUT is a later-milestone decision — do not assume it applies elsewhere. **RESOLVED 2026-08-23** — portrait approved for ABOUT as a small static inline figure beside the opening statement (DECISIONS #48; PHASE 4C).
4. **Inclusion of old-site-only provisional projects.** Ball Tracking Robot, Steganography Detector, standalone Breast Cancer AI repo, ML Projects collection, PotatoScan, SQL Projects — which (if any) are included is a pending user decision. Source still says "verify before including".
5. **Military service presentation.** Whether the Armed Forces Engineering Authority role is a full experience entry or only "Military service completed" is a pending user decision. **RESOLVED 2026-08-23** — presented on ABOUT as narrative prose (not a timeline entry); EXPERIENCE inherits the ruling (DECISIONS #49; PHASE 4C).
6. **Certifications presentation.** Which certifications to show and in what depth is an open presentation decision. **RESOLVED for ABOUT 2026-08-23** — contextual inline mentions woven into the trajectory narrative only, no standalone list/block on ABOUT (DECISIONS #50; PHASE 4C). Other pages decide their own depth per milestone.
7. **Phone number display.** Whether/how the phone number appears on CONTACT is a presentation detail to confirm.
8. **WORK filtering/category strategy.** Considered, not decided — decide deliberately in Phase 4 if retained.
9. **Contact mechanism beyond direct links.** Optional booking/contact mechanism is considered but not decided; no backend/CMS/form infrastructure is approved.
10. **Typography, logo/mark, radius, shadows, motion choreography, 3D concept.** Explicitly out of Phase 3 scope — resolved in Phase 4 (layouts) and Phase 5 (brand system), per DECISIONS.md.

## 15. Phase 3 acceptance criteria

Phase 3 is **COMPLETED and APPROVED** when:

- Every page in the sitemap (HOME, WORK, ABOUT, EXPERIENCE, PUBLICATIONS, CONTACT) has a defined purpose and architecture.
- Global UX, header/navigation, footer, and CTA strategy are defined.
- The project content model and project media model are defined.
- Mobile UX is defined and mobile is treated as a first-class experience.
- The recruiter journey is defined.
- Open questions/blockers are explicitly documented as pending decisions (Section 14) and none were silently resolved.
- The architecture preserves approved terminology and decisions from Phase 2 (sitemap, palette, interaction philosophy) and does not change the sitemap, palette, or interaction philosophy.
- No implementation code, routes, or components were created.

**Status: All acceptance criteria met — architecture APPROVED. Phase 3 is COMPLETE.**