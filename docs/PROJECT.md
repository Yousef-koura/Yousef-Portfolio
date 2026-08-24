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

**PHASE 11 — ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT — IN PROGRESS**

The application is initialized (Next.js 16 + TypeScript + Tailwind); the Home page is implemented (Phase 4A, pending review), the WORK page is implemented in its expanded form — a recomposed WORK index (flagship composition + uniform card grid for seven projects) plus ALL SEVEN project detail pages under `/work/[slug]`, with three real demo-capture videos embedded and a sourced tech-stack icon row (Phase 4B) — and the ABOUT page is implemented as the third implementation milestone (Phase 4C). The EXPERIENCE page is now implemented as the start of Phase 11: an animated vertical timeline of the four confirmed roles (FlyRank AI · PioPetro · ITI · Digital HUB (D-HUB)) with a champagne spine that draws in on scroll, alternating desktop layout, fully inline responsibilities/evidence, and military service excluded from the page entirely by explicit user decision (DECISIONS #53). PUBLICATIONS and CONTACT remain later milestones (currently honest placeholder pages so navigation never breaks).

The WORK index leads with Movenue as the full-width flagship linking into its detail page; the remaining six builds sit in a uniform responsive grid of tiles, each opening its own page. Detail pages render Problem → Methodology → Solution → Results → Stack → Links → prev/next from one data-driven template, with short pages (PotatoScan, Steganography Detector) rendering only the sections their sourced content supports (DECISIONS #42–#44).

The Home opening integrates the **approved portrait** as art-directed transparent cutouts (desktop/mobile pair via `<picture>` — see DECISIONS #34) and features **Movenue** as the featured SaaS project (live at https://movenue.vercel.app/).

Full phase list, progress, and statuses: [ROADMAP.md](./ROADMAP.md) — the primary navigation document.

Phase history:
- **PHASE 0 — PROJECT INITIALIZATION: COMPLETED** — documentation system, source-of-truth hierarchy, principles, Git/commit conventions.
- **PHASE 1 — FOUNDATION / DISCOVERY: COMPLETED** — content inventory built; content conflicts resolved (resume-authoritative values).
- **PHASE 2 — INFORMATION ARCHITECTURE + VISUAL IDENTITY: COMPLETED** — approved sitemap, visual direction, color palette, and interaction philosophy recorded.
- **PHASE 3 — UX / PAGE ARCHITECTURE: COMPLETED** — approved page-level UX architecture recorded in PHASE3_UX.md.
- **PHASE 4A — HOME PAGE: IN PROGRESS** — Home page implemented (user-directed implementation milestone ahead of the roadmap's wireframe-first sequence; see ROADMAP.md).
- **PHASE 4B — WORK PAGE: IN PROGRESS** — WORK index recomposed as flagship + card grid, and ALL SEVEN `/work/[slug]` detail pages implemented via a shared data-driven template; three real demo-capture videos encoded and embedded (MP4 + posters); tech-stack icon row added (`@icons-pack/react-simple-icons` + Lucide fallbacks) (DECISIONS #44, amending #42–#43). Pending user visual sign-off.
- **PHASE 4C — ABOUT PAGE: IN PROGRESS** — `/about` implemented: hero, personal statement + small inline portrait (DECISIONS #48), trajectory narrative spine with the military-service phase describing the role (DECISIONS #49; presentation re-formed by #51 then superseded by the spine in #52) and contextual certification mentions (DECISIONS #50), education block, About-owned continuous Capabilities chip rows over all 25 confirmed capabilities (DECISIONS #51 as amended by #52), links out. Pending user visual sign-off.
- **PHASE 11 — ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT: IN PROGRESS** — EXPERIENCE implemented (2026-08-24, DECISIONS #53): animated vertical timeline of the four confirmed roles, military service excluded from the page entirely by explicit user decision; Publications + Contact remain placeholders.

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
- Which old-site-only projects to include
- ~~Whether to present military service as an experience entry~~ RESOLVED — ABOUT: narrative prose (DECISIONS #49/#51/#52); EXPERIENCE: excluded entirely (DECISIONS #53)

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
