# TECH_STACK.md — Selected Technology Stack

## Current stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | GSAP, GSAP ScrollTrigger |
| Animation | Motion / Framer Motion |
| Smooth scrolling | Lenis |
| 3D | Three.js, React Three Fiber, Drei |
| Icons | Lucide React |
| Brand icons | @icons-pack/react-simple-icons (tree-shakeable named imports; used only for confirmed technologies on WORK detail pages — concepts without a brand mark fall back to Lucide glyphs) |
| Fonts | next/font |
| Version control | Git + GitHub |
| Deployment | Vercel |
| Database | NONE |
| Backend | NONE (unless a genuinely necessary feature is identified later) |
| CMS | NONE |

Note: Three.js / React Three Fiber / Drei are **approved and reserved** for later use (the full WebGL/3D visual language remains a Phase 12 decision — [DECISIONS.md](./DECISIONS.md) #13/#29). They are not currently installed or in use: the Home hero uses a CSS-3D layered technique with no WebGL dependency.

## Architecture principle

The portfolio is intentionally a **repository-based, content-driven application**. Content lives in the repository (structured data / markdown) and is rendered by the Next.js app.

- **No** database
- **No** CMS
- **No** authentication system
- **No** backend

Do not add infrastructure merely for the sake of complexity. Architecture must stay appropriate for a personal portfolio.

## Status

The stack is **selected**. Individual implementation choices may still be evaluated later if there is a strong technical reason — record such changes in [DECISIONS.md](./DECISIONS.md).

## Non-negotiable engineering constraints

- Performance is part of quality (bundle size, lazy loading, image optimization).
- Mobile is a first-class experience.
- Accessibility matters.
- SEO and metadata matter.
- Only use a skill/tool where it serves the content (see [SKILLS.md](./SKILLS.md)).
