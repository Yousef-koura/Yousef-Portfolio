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
| Fonts | next/font |
| Version control | Git + GitHub |
| Deployment | Vercel |
| Database | NONE |
| Backend | NONE (unless a genuinely necessary feature is identified later) |
| CMS | NONE |

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
