# DECISIONS.md — Decision Log

Recorded decisions only. Proposals and assumptions are NOT decisions and must not be entered here.

## Status legend

- **Decided** — confirmed decision. Do not reverse without logging a change here.
- **Open** — open question. Must be resolved deliberately in the appropriate phase, not incidentally.
- **Future** — planned implementation detail, not yet decided.

## Decision log

| # | Date | Decision | Status |
| --- | --- | --- | --- |
| 1 | 2026-08-19 | **Portfolio purpose:** A complete professional personal portfolio (represents the full professional identity, not only ML engineering). | Decided |
| 2 | 2026-08-19 | **Scope:** Projects, experience, publications, skills, education, certifications, achievements, and relevant professional identity. | Decided |
| 3 | 2026-08-19 | **Deployment:** Vercel. | Decided |
| 4 | 2026-08-19 | **Database:** None. | Decided |
| 5 | 2026-08-19 | **CMS:** None. | Decided |
| 6 | 2026-08-19 | **Architecture:** Next.js-based application with repository-managed content. | Decided |
| 7 | 2026-08-19 | **Visual ambition:** Highly interactive and visually sophisticated, inspired by premium creative portfolios. | Decided |
| 8 | 2026-08-19 | **3D:** Allowed and encouraged where it strengthens the experience (Three.js / React Three Fiber), but not everywhere. | Decided |
| 9 | 2026-08-19 | **Final sitemap:** SUPERSEDED by #14. | Decided |
| 10 | 2026-08-19 | **Final color palette:** SUPERSEDED by #16–17. | Decided |
| 11 | 2026-08-19 | **Final typography:** Not decided. | Open |
| 12 | 2026-08-19 | **Final branding / logo-mark:** Not decided. | Open |
| 13 | 2026-08-19 | **Tech stack:** Next.js, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Motion/Framer Motion, Lenis, Three.js + React Three Fiber + Drei, Lucide React, next/font, Git/GitHub, Vercel. No database, no backend, no CMS. | Decided |
| 14 | 2026-08-19 | **High-level sitemap:** HOME, WORK, ABOUT, EXPERIENCE, PUBLICATIONS, CONTACT. | Decided |
| 15 | 2026-08-19 | **RESUME + SKILLS:** RESUME is a prominent persistent action/link, not necessarily a full page. SKILLS is intentionally NOT a standalone top-level page — skills appear contextually (projects, experience, about/profile, relevant technical sections). No shallow tech-listing page. | Decided |
| 16 | 2026-08-19 | **Visual identity:** PREMIUM + TECHNICAL + PERSONAL + MODERN. Palette: **Obsidian + Champagne**, dark cinematic premium. Reference portfolio is inspiration only — not copied. | Decided |
| 17 | 2026-08-19 | **Approved color tokens:** Background `#0B0C0E`, Surface `#14161A`, Primary text `#F3F0E8`, Secondary text `#A9A9A3`, Accent `#C9A86A`, Accent highlight `#E3C98E`, Border `#2A2C30`. Accent usage ~5% of visual balance; used for interaction, emphasis, selected states, key metadata, CTA emphasis, subtle decoration. | Decided |
| 18 | 2026-08-19 | **Interaction language:** Smooth scrolling, scroll-linked reveals, sticky sections, project card stacking, subtle parallax, magnetic interactions where appropriate, hover states, page/section transitions, selective 3D. Principle: **motion serves content.** | Decided |
| 19 | 2026-08-19 | **Aesthetic guardrail:** No excessive neon, no magenta-heavy gradients, no orange/purple reference combinations, no rainbow gradients, no generic "AI neon" look, no excessive glow. Palette is architectural, premium, technical, mature, restrained. | Decided |
| 20 | 2026-08-19 | **Exact typography:** Undecided — next design decision. Do not reuse Kanit from the reference automatically. | Open |
| 21 | 2026-08-19 | **Logo / mark:** Undecided. | Open |
| 22 | 2026-08-19 | **Detailed page wireframes:** Planned in Phase 3. | Future |
| 23 | 2026-08-19 | **Exact homepage composition:** Planned in Phase 3. | Future |
| 24 | 2026-08-19 | **Component inventory:** Planned in Phase 3+. | Future |
| 25 | 2026-08-19 | **Motion choreography (specific animations):** Planned in later phases. | Future |
| 26 | 2026-08-19 | **Exact 3D concept:** Planned in later phases. | Future |
| 27 | 2026-08-19 | **SaaS project rename:** The court management and booking platform is named **Movenue** (formerly Yalla7gez). Live URL: https://movenue.vercel.app/. "Yalla7gez" is not used in the implemented portfolio. | Decided |
| 28 | 2026-08-19 | **Portrait approved (Home hero):** The portrait asset `Yousef personal photo.jpeg` is approved for use and integrated into the Home hero as a dimensional, art-directed object. This resolves the previously-open portrait decision for the HOME page only; portrait use on ABOUT remains a later-milestone decision. | Decided |
| 29 | 2026-08-19 | **Home hero 3D portrait technique:** CSS 3D transforms (`perspective` + `preserve-3d`) with layered image planes — a Z-offset echo/depth layer, a masked main portrait plane (radial mask so the photo's dark background melts into Obsidian), a champagne rim-light layer, and a foreground detail layer — driven by framer-motion (idle sway + spring-smoothed pointer-follow parallax). No WebGL dependency was added: the existing stack provided a performant solution for a flat portrait asset, keeping bundle size and mobile cost low. Full WebGL/3D visual language remains a Phase 12 decision. | Decided |

## Rules

- Do not treat proposals as decisions.
- Do not silently reverse a decision — record the change here with a new row and date.
- Open items (11, 12, 20–26) must be resolved deliberately in the appropriate phase per [ROADMAP.md](./ROADMAP.md) (typography/logo → Phase 5 Brand System; wireframes/homepage composition → Phase 4; component inventory → Phase 6; motion choreography/3D concept → Phase 12), not incidentally during implementation.