# ROADMAP.md — Portfolio Execution Plan + Progress Tracker

This is the project's navigation system — the long-term execution plan and progress tracker for the entire portfolio project.

It is NOT a detailed technical specification. It records where the project is, what has been completed, what comes next, what must not be skipped, and when the project is ready for implementation and deployment.

**THIS IS THE PRIMARY NAVIGATION DOCUMENT FOR PROJECT PROGRESS.** Read it before every task.

## Document map

| Document | Purpose |
| --- | --- |
| PROJECT.md | Current project context |
| **ROADMAP.md** | Complete project journey and progress |
| DECISIONS.md | Decision history |
| AGENTS.md | Rules for agents |
| DESIGN_SYSTEM.md | Visual/design system |
| CONTENT.md | Portfolio content source |
| TECH_STACK.md | Technical architecture |

## Status system

Use these statuses consistently:

- **NOT STARTED**
- **IN PROGRESS**
- **BLOCKED**
- **REVIEW**
- **COMPLETED**

Every phase must have:

- status
- objective
- tasks
- deliverables

A phase is COMPLETED **only** when its required deliverables have been reviewed and accepted. Do not mark a phase COMPLETED simply because some files were created.

---

## PHASE 0 — PROJECT INITIALIZATION
**Status: COMPLETED**

Goals:
- establish project purpose
- establish agent environment
- create documentation system
- establish source-of-truth hierarchy
- establish engineering principles
- establish Git/commit conventions

Deliverables:
- PROJECT.md
- AGENTS.md
- SKILLS.md
- TECH_STACK.md
- DESIGN_SYSTEM.md
- CONTENT.md
- DECISIONS.md
- ROADMAP.md

---

## PHASE 1 — FOUNDATION / DISCOVERY
**Status: COMPLETED**

Goals:
- understand the complete personal profile
- inventory projects
- inventory experience
- inventory publications
- inventory education
- inventory skills
- inventory certifications
- resolve content conflicts
- establish portfolio scope

Deliverables:
- verified content inventory
- resolved content conflicts
- confirmed portfolio objective
- confirmed project scope

---

## PHASE 2 — INFORMATION ARCHITECTURE + VISUAL IDENTITY
**Status: COMPLETED**

Goals:
- define portfolio sitemap
- define content hierarchy
- define navigation strategy
- establish visual direction
- establish color palette
- establish interaction principles
- establish 3D philosophy
- establish performance principles

Confirmed sitemap:

- **HOME**
- **WORK**
- **ABOUT**
- **EXPERIENCE**
- **PUBLICATIONS**
- **CONTACT**

RESUME:
Persistent action/link rather than mandatory page.

SKILLS:
Presented contextually rather than as a standalone top-level page.

Confirmed visual direction:

**PREMIUM + TECHNICAL + PERSONAL + MODERN**

Confirmed palette — Obsidian + Champagne:

- Background: `#0B0C0E`
- Surface: `#14161A`
- Primary: `#F3F0E8`
- Secondary: `#A9A9A3`
- Accent: `#C9A86A`
- Accent highlight: `#E3C98E`
- Border: `#2A2C30`

Confirmed interaction philosophy:
- sophisticated motion
- scroll-driven interactions
- sticky/stacking cards
- selective 3D
- magnetic interactions where useful
- motion serves content
- performance is part of quality
- mobile is first-class

---

## PHASE 3 — UX / PAGE ARCHITECTURE
**Status: COMPLETED**

Goal:
Define exactly what every page needs to accomplish before designing the visual layouts.

Tasks:

### 3.1 Global UX
- navigation
- header
- footer
- persistent resume CTA
- contact CTA
- responsive navigation
- mobile navigation

### 3.2 Homepage architecture
- hero purpose
- professional positioning
- selected work
- about/profile
- experience preview
- publication preview
- capabilities/skills
- final CTA

### 3.3 WORK architecture
- project listing
- filtering/category strategy if useful
- project card structure
- project detail structure
- project content model
- project media model

### 3.4 ABOUT architecture
- personal/professional story
- engineering trajectory
- education
- skills/capabilities where appropriate
- supporting evidence

### 3.5 EXPERIENCE architecture
- timeline/list structure
- role information
- responsibilities
- achievements
- technologies/evidence

### 3.6 PUBLICATIONS architecture
- publication cards
- publication details
- research context
- external links/PDFs

### 3.7 CONTACT architecture
- primary CTA
- email
- LinkedIn
- GitHub
- resume
- optional booking/contact mechanism

### 3.8 Mobile UX
- mobile hierarchy
- navigation
- responsive content density
- animation reductions

Deliverable:
Approved page-level UX architecture — recorded in [PHASE3_UX.md](./PHASE3_UX.md).

---

## PHASE 4 — WIREFRAMES + VISUAL COMPOSITION
**Status: NOT STARTED**

Goals:
- translate UX architecture into layouts
- define homepage composition
- define page-level layouts
- define responsive compositions
- define project card composition
- define project detail composition

Tasks:
- low-fidelity wireframes
- homepage composition
- desktop layout
- tablet layout
- mobile layout
- navigation states
- project layouts
- content hierarchy validation

Deliverable:
Approved wireframe/layout specification.

> **Note:** The roadmap's original plan was wireframes before implementation. At the user's direction, the project instead proceeded to an implementation milestone — **PHASE 4A — HOME PAGE** below — using the approved Phase 2 visual direction, Phase 3 UX architecture, and DESIGN_SYSTEM.md tokens. Formal wireframe/spec work remains an option for later phases if the user requests it.

---

## PHASE 4A — HOME PAGE (IMPLEMENTATION MILESTONE)
**Status: IN PROGRESS** (Home implemented — pending user visual/UX review)

This milestone is a **user-directed implementation milestone** that precedes the roadmap's wireframe-first sequence. It implements ONLY the HOME page. It does not claim Phase 4 (wireframes) or Phase 9 (homepage, in the original sequence) are complete.

Completed:
- Application initialized: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ESLint.
- Approved dependencies installed: GSAP + ScrollTrigger, Framer Motion, Lenis, Lucide React, next/font.
- Design tokens (Obsidian + Champagne) wired into the design system.
- Provisional typography: Space Grotesk (display) + Inter (body) + JetBrains Mono (mono) — pending Phase 5 brand system.
- Global UX: fixed header with responsive/mobile nav, footer, persistent structure (RESUME omitted — destination pending user decision).
- Home sections per PHASE3_UX.md: Hero, Selected Work (Movenue featured + Agri-Bot, RAG Chatbot, FMCG pipeline), About preview, Experience preview, Publication preview, Capabilities, Final CTA.
- Motion: Lenis smooth scroll, GSAP ScrollTrigger reveals, Framer Motion hero/menu; `prefers-reduced-motion` respected.
- 3D: intentionally deferred to a clean CSS fallback for this milestone (3D concept is an open decision; see DECISIONS #26).
- Placeholder pages for WORK / ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT so navigation has no dead links (the pages themselves are future milestones).
- Project assets copied to `public/projects/` (Movenue screenshot used as the featured visual).
- Metadata, semantic markup, skip link, focus states, alt text.

Open / unresolved (carried from Phase 3, do not resolve silently):
- Final positioning statement (hero copy uses confirmed resume summary as provisional text).
- Resume destination URL — RESUME CTA intentionally omitted until it exists.
- Portrait approval — the About preview uses text only (portrait NOT used).
- Military service presentation — included as identity context ("Military service · completed") only, not as an experience entry.
- Which old-site-only projects to include on WORK later.
- Typography finalization (Phase 5), 3D concept (Phase 12), metadataBase/deployment URL (Phase 15).

Next step: visual/UX review of the Home page — then future milestones (WORK, ABOUT, EXPERIENCE, PUBLICATIONS, CONTACT), not a bulk implementation of all pages.

---

## PHASE 5 — BRAND SYSTEM
**Status: PARTIALLY COMPLETED**

Already completed:
- visual direction
- color palette

Still required:
- typography
- type scale
- logo/mark
- spacing system
- border system
- radius system
- shadow/elevation system
- image treatment
- icon treatment
- motion tokens
- 3D visual language

Deliverable:
Complete DESIGN_SYSTEM.md.

---

## PHASE 6 — COMPONENT / DESIGN SYSTEM ARCHITECTURE
**Status: NOT STARTED**

Goals:
Translate the approved UX and visual system into reusable UI architecture.

Define:
- component hierarchy
- layout primitives
- typography components
- buttons
- navigation
- cards
- project components
- timeline components
- publication components
- CTA components
- media components
- animation wrappers
- 3D scene architecture

Deliverable:
Component architecture/specification.

---

## PHASE 7 — APPLICATION INITIALIZATION
**Status: NOT STARTED**

Goals:
Initialize the actual application.

Tasks:
- initialize Next.js
- TypeScript
- Tailwind
- install approved dependencies
- configure fonts
- establish folder structure
- establish design tokens
- configure linting
- configure formatting
- configure Git
- establish environment configuration if required

Deliverable:
Clean runnable application foundation.

---

## PHASE 8 — CORE UI IMPLEMENTATION
**Status: NOT STARTED**

Build:
- global layout
- navigation
- footer
- typography
- buttons
- base components
- responsive system
- theme/design tokens

Deliverable:
Functional design system.

---

## PHASE 9 — HOMEPAGE IMPLEMENTATION
**Status: NOT STARTED**

Build:
- hero
- professional positioning
- visual/3D hero experience
- selected work
- profile/about section
- experience preview
- publications preview
- capabilities
- CTA

Implement:
- Motion
- GSAP/ScrollTrigger
- Lenis
- selective 3D

Deliverable:
Complete homepage.

---

## PHASE 10 — WORK / PROJECTS
**Status: NOT STARTED**

Build:
- work listing
- project cards
- project detail pages
- project media
- project navigation
- relevant motion/3D

Deliverable:
Complete WORK experience.

---

## PHASE 11 — ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT
**Status: NOT STARTED**

Build:
- About
- Experience
- Publications
- Contact

Integrate:
- verified content
- external links
- resume
- publications
- project evidence

Deliverable:
Complete portfolio content experience.

---

## PHASE 12 — MOTION + 3D POLISH
**Status: NOT STARTED**

Goals:
Make the visual experience feel premium.

Tasks:
- scroll choreography
- page transitions
- magnetic interactions
- sticky/stacking interactions
- parallax
- 3D hero/visuals
- hover states
- micro-interactions

Rules:
- motion serves content
- avoid excessive animation
- preserve accessibility
- support prefers-reduced-motion
- optimize GPU usage

Deliverable:
Polished interaction system.

---

## PHASE 13 — CONTENT + ASSET INTEGRATION
**Status: NOT STARTED**

Tasks:
- final copy
- project images
- project videos
- diagrams
- publication assets
- profile image
- resume
- external links

Rules:
- real evidence remains real
- never invent metrics
- never present AI-generated imagery as project evidence
- optimize all media

Deliverable:
Complete content-integrated portfolio.

---

## PHASE 14 — QUALITY / ACCESSIBILITY / PERFORMANCE
**Status: NOT STARTED**

Validate:

FUNCTIONALITY
- navigation
- links
- buttons
- forms if any
- project routes

RESPONSIVENESS
- mobile
- tablet
- desktop
- ultra-wide

ACCESSIBILITY
- keyboard navigation
- semantic HTML
- contrast
- focus states
- alt text
- reduced motion

PERFORMANCE
- image optimization
- 3D performance
- animation performance
- bundle size
- loading behavior
- Core Web Vitals

SEO
- metadata
- title
- description
- Open Graph
- sitemap
- robots
- structured data where appropriate

CONTENT
- factual accuracy
- spelling
- consistency
- professional tone

Deliverable:
QA report and resolved issues.

---

## PHASE 15 — DEPLOYMENT
**Status: NOT STARTED**

Deployment target:

**Vercel**

Tasks:
- connect GitHub repository
- configure Vercel
- configure production build
- configure domain if available
- verify environment
- verify production assets
- verify routes
- verify SEO
- verify mobile
- verify performance

Deliverable:
Production portfolio deployed.

---

## PHASE 16 — FINAL REVIEW
**Status: NOT STARTED**

Final evaluation:

CONTENT
- Does it represent the complete professional profile?

POSITIONING
- Is the professional identity immediately clear?

DESIGN
- Does the visual identity feel premium and intentional?

UX
- Is information easy to navigate?

TECHNICAL
- Does the implementation demonstrate engineering quality?

3D/MOTION
- Does interaction improve the experience rather than distract?

PERFORMANCE
- Does the site remain fast?

MOBILE
- Is mobile a first-class experience?

ACCESSIBILITY
- Is the site usable by a broad audience?

DEPLOYMENT
- Is production stable?

Deliverable:
Final portfolio approval.

---

## Agent roadmap rule

Update this document and follow the workflow below on every task.

### BEFORE EVERY TASK

1. Read docs/ROADMAP.md.
2. Identify the current phase.
3. Check which tasks are completed.
4. Check the next required task.
5. Read the relevant project documentation.
6. Do not skip ahead to a later phase without explicit user approval.

### DURING THE TASK

- Work only within the current approved phase unless the user explicitly changes scope.
- If a decision affects a future phase, document it appropriately.
- Do not silently change completed decisions.
- If a blocker appears, mark the relevant phase **BLOCKED** and explain why.

### AFTER EVERY TASK

1. Update docs/ROADMAP.md.
2. Update phase status.
3. Mark completed tasks.
4. Record remaining tasks.
5. Record blockers if any.
6. Update relevant documentation files.
7. Ensure ROADMAP.md agrees with PROJECT.md and DECISIONS.md.

**ROADMAP.md must remain the primary navigation document for project progress.**

## ROADMAP is not a substitute for decisions

Do not store detailed technical decisions only in ROADMAP.md. Use:

- **ROADMAP.md** → progress and sequence
- **DECISIONS.md** → actual project decisions
- **PROJECT.md** → current project context
- **AGENTS.md** → agent behavior/rules
- **DESIGN_SYSTEM.md** → visual system
- **CONTENT.md** → content truth
- **TECH_STACK.md** → technical architecture

## Cross-document consistency

Whenever the roadmap is updated, check consistency with:

- PROJECT.md
- DECISIONS.md
- AGENTS.md

If there is a conflict:

1. Do not silently choose one.
2. Identify the conflict.
3. Preserve the confirmed decision.
4. Ask the user if a real decision is required.

## Current roadmap state

- PHASE 0 — COMPLETED
- PHASE 1 — COMPLETED
- PHASE 2 — COMPLETED
- PHASE 3 — COMPLETED
- PHASE 4A — HOME PAGE (user-directed implementation milestone) — IN PROGRESS (Home implemented, pending review)
- PHASES 4, 6–16 — NOT STARTED (PHASE 5 PARTIALLY COMPLETED)

The project is currently in:

**PHASE 4A — HOME PAGE (IMPLEMENTATION MILESTONE)**
