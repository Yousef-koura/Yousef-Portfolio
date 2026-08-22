# DESIGN_SYSTEM.md — Design System

## Status

**PHASE 2 — INFORMATION ARCHITECTURE + VISUAL IDENTITY: COMPLETED.**
The visual direction is approved and the color palette is decided, including its approved light-theme mirror ([DECISIONS.md](./DECISIONS.md) #40). Typography and detailed design tokens remain OPEN (Phase 5 — BRAND SYSTEM). This document records the approved direction and open items. It does not lock typography or final branding.

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

## Light/dark theming (approved — DECISIONS #40)

The palette ships in two themes. **Dark is the brand/default theme**; light is a full mirror using the same token structure. The site does NOT follow `prefers-color-scheme` — first visit is always dark.

### Theme tokens

| Token | Dark (default) | Light |
| --- | --- | --- |
| Background (Obsidian) | `#0B0C0E` | `#F3F0E8` |
| Surface | `#14161A` | `#EAE6DC` |
| Raised * | `#1A1D22` | `#E1DCCD` |
| Primary text (Ink) | `#F3F0E8` | `#14161A` |
| Secondary text (Muted) | `#A9A9A3` | `#6E6E66` |
| Accent (Champagne) | `#C9A86A` | `#8C6A2E` |
| Accent highlight | `#E3C98E` | `#C9A86A` |
| Border (Line) | `#2A2C30` | `#DDD8CC` |

\* Raised is an implementation token (icon chips, elevated pills) outside the approved seven-token table. Its light value `#E1DCCD` was **ratified by the user during the Phase 2 sweep** — confirmed as-is. In light mode, brighter `#C9A86A` may be used for decorative non-text accents only; text/interactive accents must use a token that passes AA at its rendered size.

### Derived context shades (Phase 2 sweep — DECISIONS #41)

Three additional implementation tokens cover contexts where an approved hex measures below AA-small on its actual rendered composite. Their dark values are byte-identical mirrors of the approved tokens — zero dark-mode visual change:

| Token | Dark | Light | Purpose |
| --- | --- | --- | --- |
| Muted strong (`--tk-muted-strong`) | `#A9A9A3` (= Muted) | `#65655D` | Small muted text on tinted composites (nav capsule, Surface sections) |
| Champagne strong (`--tk-champagne-strong`) | `#C9A86A` (= Accent) | `#7A5B23` | Small champagne text (kickers, labels, links, active nav) |
| On-accent (`--tk-on-accent`) | `#0B0C0E` (= Background) | `#FFFDF7` | Labels resting on accent fills (CONTACT pill, portal actions) |

Direction note: on the mid-tone bronze `#8C6A2E`, darkening text can never reach AA-small (pure black tops out at 4.22:1), so the on-accent fix legitimately lightens instead. Large display accents keep regular Accent (AA-large 3:1).

### Behavior rules

- **Dark always defaults** — absent/invalid stored value renders dark; never read `prefers-color-scheme`.
- An explicit toggle choice persists in `localStorage["theme"]` and applies pre-paint via an inline init script (no flash, no hydration mismatch).
- Implementation: runtime variables `--tk-*` scoped by `[data-theme]` in `globals.css`; Tailwind color names map to them via `@theme inline`, so existing utilities (`bg-surface/70`, `text-muted`, opacity variants) re-theme automatically when `<html data-theme>` flips. `src/lib/theme.ts` applies/stores the theme and syncs `<meta name="theme-color">`. Do not hardcode palette hexes in components — use token utilities so both themes stay coherent.
- Scope note: Phase 1 themed the global shell + Header; **Phase 2 completed the sweep** — all `.portal-home` Home content (hero through footer) now resolves runtime tokens, with per-theme adjustments only for dark-tuned decoration (glow alphas, deck wash scrim, certificate elevation, hover tints).

### Measured contrast (light mode)

Measured against rendered composites (headless browser), not flat swatches:

| Pair | Ratio | WCAG |
| --- | --- | --- |
| Muted text on plain cream background | 4.51:1 | AA pass (small text) |
| CTA hover pairing (ink on champagne-light) | 8.01:1 | AAA |
| Muted nav text on capsule composite (~Surface/70 over cream) | 4.24 → **4.85:1** via Muted strong | AA pass (Phase 2 ruling) |
| Active nav accent on raised pill | 3.73 → **4.69:1** via Champagne strong | AA pass (Phase 2 ruling) |
| CONTACT pill label on bronze | 4.37 → **4.90:1** via On-accent | AA pass (Phase 2 ruling) |
| Small champagne text on cream / Surface (kickers, labels, links) | 4.37 / ~4.13 → **5.51 / 5.03:1** via Champagne strong | AA pass (sweep) |
| Muted text on Surface (experience section) | ~4.13 → **4.72:1** via Muted strong | AA pass (sweep) |

Dark-mode baseline pairs measure ≥7.48:1. The three Phase-1-flagged pairs were resolved by the user's Phase 2 ruling (adjust specific usage/shade, approved hexes untouched — see Derived context shades above); all ratios re-measured headlessly against rendered composites with translucent layers composited from live computed styles, at each pair's actual rendered size (10px mono → AA-small applies).

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

### Implemented treatment (Home opening portrait — Phase 4A, transparent cutout art direction)

The Home opening portrait is a **clean background-removed cutout** with no WebGL and no added client-side JS (originally a CSS-3D layered technique per [DECISIONS.md](./DECISIONS.md) #29; simplified per **#30**; duotone editorial per **#32**; current treatment per **#34**):

- **Art-directed asset pair:** two user-supplied transparent PNGs of the approved photo — `personal-image-desktop.png` (365×684) for ≥761px viewports and `personal-image-mobile.png` (394×634) below — rendered via `<picture>` + `getImageProps` (Next.js 16 pattern), breakpoint-matched to the portal archive's 760px CSS breakpoint. Each crop shows at its native aspect ratio (`object-contain`, bottom-anchored in the portal frame).
- **No grading or masking:** the cutout needs no gradient bed, luminosity/soft-light grades, radial edge melt, or corner clip-path — the subject shape is the composition. The one-time load reveal (inset clip-path wipe + scale settle, reduce-gated) is retained; afterwards the portrait is fully static.
- **LCP priority:** `loading="eager"` + `fetchPriority="high"` on the fallback image — `preload` cannot be used across art-direction variants without double-fetching.

The exact WebGL/3D visual language (Phase 12) remains an open decision; this treatment does not commit to it.

### Implemented signature patterns (Phase 4A)

Two documented patterns introduced during the Phase 4A iterations ([DECISIONS.md](./DECISIONS.md) #33):

- **`GhostType` ghost-typography motif** (`src/components/ui/GhostType.tsx`) — oversized display type at `text-ink/[0.05]` with slow reduce-gated scroll drift; aria-hidden and non-interactive. A recurring-but-sparse signature device: **exactly three instances on Home** (Interlude "Profile", Selected Work index "Index", Profile pull-quote glyph). Do not add instances without a logged decision.
- **`EvidenceChart` evidence visualization** (`src/components/ui/EvidenceChart.tsx`) — one bounded interactive Recharts comparison of confirmed project metrics from static `src/content/evidence.ts`; keyboard-operable row overlays, visually-hidden data table equivalent, reduce-gated entrance animation, no network dependency. Champagne appears only in the active/emphasized state.

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