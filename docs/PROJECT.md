# Yousef Portfolio — Project Overview

## Project name

**Yousef Portfolio** — personal professional portfolio for **Yousef Koura**.

## Purpose

To present Yousef as a complete professional — not only as an ML engineer — with technical credibility, engineering ability, personality, breadth, strong visual taste, and evidence rather than generic claims.

## Portfolio objective

A single, premium, highly visual web experience that frames the person and the work credibly, invites exploration, and makes it easy for the right people to connect.

## Target audience

- ML/AI hiring managers and recruiters (primary per prior positioning work)
- Engineering collaborators and peers
- Potential clients or partners for the SaaS/product work (Movenue)
- Anyone evaluating Yousef's portfolio as professional evidence

## Current project phase

**PHASE 4A — HOME PAGE (IMPLEMENTATION) — IN PROGRESS**

The application is initialized (Next.js 16 + TypeScript + Tailwind) and the Home page is implemented as the first implementation milestone, following the approved Phase 3 architecture. Only HOME is built; WORK, ABOUT, EXPERIENCE, PUBLICATIONS, and CONTACT remain later milestones (currently honest placeholder pages so navigation never breaks).

The Home opening integrates the **approved portrait** as art-directed transparent cutouts (desktop/mobile pair via `<picture>` — see DECISIONS #34) and features **Movenue** as the featured SaaS project (live at https://movenue.vercel.app/).

Full phase list, progress, and statuses: [ROADMAP.md](./ROADMAP.md) — the primary navigation document.

Phase history:
- **PHASE 0 — PROJECT INITIALIZATION: COMPLETED** — documentation system, source-of-truth hierarchy, principles, Git/commit conventions.
- **PHASE 1 — FOUNDATION / DISCOVERY: COMPLETED** — content inventory built; content conflicts resolved (resume-authoritative values).
- **PHASE 2 — INFORMATION ARCHITECTURE + VISUAL IDENTITY: COMPLETED** — approved sitemap, visual direction, color palette, and interaction philosophy recorded.
- **PHASE 3 — UX / PAGE ARCHITECTURE: COMPLETED** — approved page-level UX architecture recorded in PHASE3_UX.md.
- **PHASE 4A — HOME PAGE: IN PROGRESS** — Home page implemented (user-directed implementation milestone ahead of the roadmap's wireframe-first sequence; see ROADMAP.md).

## Core principles

- Content first, implementation second.
- Evidence over adjectives.
- Design should frame the work, not hide it.
- Motion should communicate hierarchy or interaction.
- 3D should have a purpose.
- Performance is part of quality.
- Mobile is a first-class experience.
- Accessibility matters.
- SEO matters.
- Real project evidence must stay real; AI-generated imagery must not be presented as real evidence.
- No unsupported claims.
- No unnecessary backend infrastructure.
- No unnecessary dependencies.
- Prefer maintainability over cleverness.

## What the portfolio should communicate

- A complete professional identity (ML, robotics/mechatronics, product, engineering)
- Technical credibility with real, verifiable project evidence
- Engineering ability demonstrated through outcomes and metrics
- Personality — a human being, not a template
- Breadth without becoming unfocused
- Strong visual taste and quality

## Explicitly out of scope

- Blog / articles section (not currently planned)
- Testimonials page (not currently planned)
- Standalone Skills listing page (skills are contextual by design)
- E-commerce or dynamic content
- Database, CMS, auth, or backend infrastructure
- Overly complex tech that does not serve the content

## Approved high-level sitemap

- **HOME**
- **WORK**
- **ABOUT**
- **EXPERIENCE**
- **PUBLICATIONS**
- **CONTACT**

Notes:
- **RESUME** — available as a prominent, persistent action/link rather than necessarily a full page.
- **SKILLS** — intentionally NOT a standalone top-level page. Skills appear in context: projects, experience, about/profile, and relevant technical sections. No shallow tech-listing page.
- The portfolio is a complete professional portfolio, not an ML-only portfolio.
- Recorded formally in [DECISIONS.md](./DECISIONS.md) #14–15.

## Current decisions (confirmed)

- Portfolio scope: complete professional personal portfolio.
- High-level sitemap: HOME, WORK, ABOUT, EXPERIENCE, PUBLICATIONS, CONTACT; RESUME as persistent action; skills contextual.
- Visual direction: PREMIUM + TECHNICAL + PERSONAL + MODERN.
- Color palette: Obsidian + Champagne (tokens in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)).
- Technical stack: Next.js, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Motion/Framer Motion, Lenis, Three.js + R3F + Drei, Lucide React, next/font; Vercel; no DB/CMS/backend.
- Selective 3D; motion serves content.

Full log: [DECISIONS.md](./DECISIONS.md).

## Current unknowns / open decisions

- Exact typography (next design decision)
- Final logo / mark
- Detailed page wireframes
- Exact homepage composition
- Component inventory
- Motion choreography
- Exact 3D concept
- Final positioning statement (currently provisional)
- Which old-site-only projects to include
- Whether to present military service as an experience entry

## Document references

- [ROADMAP.md](./ROADMAP.md) — long-term execution plan and progress tracker (primary navigation)
- [AGENTS.md](./AGENTS.md) — working instructions for AI agents
- [SKILLS.md](./SKILLS.md) — intended technical skill/toolset
- [TECH_STACK.md](./TECH_STACK.md) — selected technology stack
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — design system (palette decided; typography OPEN)
- [CONTENT.md](./CONTENT.md) — content inventory and status
- [DECISIONS.md](./DECISIONS.md) — decision log

## Source material

- `yousef-portfolio-content.md` — consolidated content reference (resume, LinkedIn, old site). Resume treated as authoritative; previous content conflicts resolved.
- `projects&certificate_images/` — raw project and certificate image assets.
