# DESIGN_SYSTEM.md — Design System

## Status

**PHASE 2 — INFORMATION ARCHITECTURE + VISUAL IDENTITY: COMPLETED.**
The visual direction is approved and the color palette is decided. Typography and detailed design tokens remain OPEN (Phase 5 — BRAND SYSTEM). This document records the approved direction and open items. It does not lock typography or final branding.

## Design goal

**PREMIUM + TECHNICAL + PERSONAL + MODERN**

## Visual mood

The palette should feel:
- Architectural
- Premium
- Technical
- Mature
- Restrained

## Color palette — OBSIDIAN + CHAMPAGNE (approved)

### Design tokens

| Token | Value | Usage |
| --- | --- | --- |
| Background (Obsidian) | `#0B0C0E` | Primary environment |
| Surface | `#14161A` | Cards, elevated panels |
| Primary text | `#F3F0E8` | Major typography (warm off-white) |
| Secondary text | `#A9A9A3` | Muted info, metadata |
| Accent (Champagne) | `#C9A86A` | Emphasis, interaction, CTA |
| Accent highlight | `#E3C98E` | Highlights on accent states |
| Border | `#2A2C30` | Subtle borders, hairlines |

### Accent discipline

Champagne/gold must be used **sparingly** — approximately **95% restrained neutrals, 5% accent**. The accent communicates:
- interaction
- emphasis
- selected states
- important metadata
- CTA emphasis
- subtle decorative details

Do NOT turn the website gold.

### Usage rules

**DO:**
- Use Obsidian as the primary environment.
- Use warm off-white for major typography.
- Use muted gray for secondary information.
- Use champagne for emphasis.
- Use borders subtly.
- Maintain strong contrast.

**AVOID:**
- Neon purple
- Magenta-heavy gradients
- Orange/purple combinations from the reference
- Excessive gold
- Rainbow gradients
- Generic "AI neon" aesthetics
- Excessive glow effects

## Typography

**STATUS: OPEN / NEXT DESIGN DECISION.** The typeface is not locked. Do not automatically reuse Kanit from the reference.

Desired characteristics:
- Strong display typography for hero/headings
- Highly readable body typography
- Technical / editorial character
- Excellent numeric readability
- Responsive scaling
- Compatibility with the visual identity

## Spacing philosophy

- Generous whitespace
- Editorial, project-focused composition
- Rhythm and breathing room over density
- Exact spacing scale: future implementation detail

## Border philosophy

- Subtle borders / hairlines (`#2A2C30`)
- Structure through restraint, not heavy outlines
- Radius system: OPEN. Shadow system: OPEN.

## Motion philosophy

**MOTION MUST SERVE CONTENT.**

Approved interaction language:
- Smooth scrolling (Lenis)
- Scroll-linked reveals
- Sticky sections
- Project card stacking
- Subtle parallax
- Magnetic interactions where appropriate
- Hover states
- Page/section transitions
- Selective 3D interaction

Do not animate everything. Motion should communicate hierarchy or interaction and must never block usability.

## 3D philosophy

- 3D must have a purpose — it should reinforce the professional identity, not distract from content.
- Selective WebGL (Three.js / React Three Fiber), not everywhere.
- Performance-conscious: compressed textures, optimized models, GPU-friendly transforms.
- Reduce complexity when necessary, especially on mobile.

## Responsive philosophy

- Desktop may be visually ambitious; **mobile is a first-class experience**.
- 3D/animation-heavy components: performance-conscious behavior, reduce complexity when necessary, respect reduced-motion preferences, preserve content hierarchy, never let animation block usability.

## Accessibility principles

- Strong contrast (per approved tokens)
- Semantic markup, focus states, keyboard navigation
- Respect `prefers-reduced-motion`
- Content hierarchy must survive without animation

## Performance principles

The reference uses many GIFs and heavy visual assets — do NOT copy that approach literally. Prefer:
- WebP/AVIF
- Optimized images
- Lazy loading
- Compressed textures
- Optimized 3D models
- Selective WebGL
- GPU-friendly transforms
- Minimal unnecessary animation
- Code splitting where appropriate

Goal: **PREMIUM VISUAL QUALITY + PROFESSIONAL PERFORMANCE.**

## Visual reference (user-provided — inspiration only)

A detailed 3D-creator-portfolio reference was provided as **design inspiration**, not an implementation specification. It demonstrates oversized hero typography, dark cinematic background, animated navigation, large portrait/subject composition, scroll-driven image marquee, animated About section, large service typography, sticky project cards, card stacking, magnetic interactions, Framer Motion-style reveals, interactive visual elements, and selective 3D objects.

### Kept from the reference (as direction)
- Oversized typography
- Cinematic dark presentation
- Strong visual hierarchy
- Sophisticated motion
- Scroll-driven interactions
- Sticky / stacking project cards
- Selective 3D
- Magnetic / interactive elements
- Generous whitespace
- Editorial composition
- Strong project imagery

### NOT copied from the reference
- Exact colors (palette is now Obsidian + Champagne)
- Exact typography (open)
- Exact assets
- Exact content
- Exact layout
- Exact branding

## Remaining UNDECIDED (do not finalize without explicit user decision)

- Typography (next design decision)
- Logo / mark
- Radius system
- Shadow system
- Motion choreography (specific animations)
- 3D visual language (exact concept)
- Detailed page / homepage composition

## Relationship to phases

- **Phase 2 (completed):** Information Architecture + Visual Identity — high-level sitemap and color palette decided here.
- **Phase 3 (next):** UX / Page Architecture — page-level architecture and content models.
- **Phase 4:** Wireframes + Visual Composition.
- **Phase 5:** Brand System — typography, type scale, logo/mark, spacing, border, radius, shadow, image/icon treatment, motion tokens, 3D visual language. This completes DESIGN_SYSTEM.md.
- Phase 6+: Interaction system, UI system, and implementation; motion and 3D specifics will be finalized there.

Full phase list and progress: [ROADMAP.md](./ROADMAP.md).