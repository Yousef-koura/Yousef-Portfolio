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
- **Hero portrait (Phase 4A iteration):** the portrait asset is now approved and integrated into the Home hero as a dimensional 3D object — CSS 3D layered treatment (perspective + `preserve-3d`): a Z-offset echo/depth layer, a radial-masked main plane that melts into the Obsidian background, a champagne rim-light layer, and a foreground detail layer; framer-motion drives a restrained idle sway plus spring-smoothed pointer-follow parallax. `prefers-reduced-motion` and coarse pointers disable interaction; the portrait remains a static, polished composition for them.
- Motion: Lenis smooth scroll, GSAP ScrollTrigger reveals, Framer Motion hero/menu; `prefers-reduced-motion` respected.
- 3D: full WebGL/3D visual language remains a Phase 12 decision; the Home hero currently uses the CSS-3D layered technique above (no new dependency).
- Placeholder pages for WORK / ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT so navigation has no dead links (the pages themselves are future milestones).
- Project assets copied to `public/projects/` (Movenue screenshot used as the featured visual); portrait copied to `public/portrait/`.
- Metadata, semantic markup, skip link, focus states, alt text.
- **Home page refinement (visual/UX review iteration):** technical marquee band added after the Hero (pure CSS `@keyframes` loop with `translateX(-50%)`, duplicated groups, edge mask fades, hover-pause, `prefers-reduced-motion` disabled); hero portrait enlarged and re-composed with a deeper two-layer echo system, film grain, restrained champagne rim light, masked edge bleed past its container, and right-edge bleed in the hero grid; editorial `SectionFrame` system added (indexed hairline rules + technical labels) so the Home reads as one continuous composition; Selected Work rebalanced so the Movenue visual dominates and copy density dropped; About/Experience/Publication/Capabilities/Final CTA copy tightened and re-composed editorially.
- **Home page refinement (editorial refinement iteration):** hero re-composed as an asymmetric two-column grid — identity + positioning top-left, portrait filling ~45–50% of the hero width in the right column (rows 1–2), CTAs + metadata bottom-left; intentional single-column mobile flow (identity → portrait → CTAs) so the portrait stays prominent on small screens; restrained scroll parallax on the portrait (framer-motion `useScroll` + `useTransform`, disabled under `prefers-reduced-motion`); Selected Work reworked so the Movenue screenshot leads full-width with an overlaid editorial caption and asymmetric hairline info strip, while secondary projects became numbered editorial index rows (no identical card wall); About preview moved to an asymmetric heading + profile-data composition; Experience preview moved to a date-column editorial list (timeframe left, role/org/highlight right); Publication preview treated as an archival research artifact ("Plate 01" caption + corner ticks); Capabilities re-clustered into ML & AI / Computer Vision & Robotics / Data & Systems (confirmed technologies only); marquee band and final CTA given subtle background-shift treatment.
- **Home page refinement (art direction iteration):** hero typography made dramatically dominant — `clamp(3.5rem, 8vw + 0.5rem, 10rem)` name scale on desktop, `clamp(3.2rem, 14vw, 5rem)` on mobile, with tighter `leading-[0.88]`; removed redundant "Portfolio" eyebrow; removed dense hero metadata line (military service, full degree name) to reduce visual noise; added "Movenue live" CTA linking to the live product; hero grid extracted to CSS classes (`hero-grid`, `hero-identity`, `hero-portrait`, `hero-cta`) for precise editorial control; portrait given controlled bleed beyond its grid cell (`margin-left: -2rem; margin-right: -3rem` on desktop); portrait capped at `75vh` height for proportional balance; portrait max-width tightened on mobile (`max-w-[min(80vw,380px)]`); Selected Work Movenue layout replaced with custom editorial composition — name as dominant `text-6xl` heading, asymmetric two-column body (`0.42fr` text / `0.58fr` screenshot), screenshot border transitions to champagne on hover (this Movenue layout was later superseded by the full-width image-led recomposition recorded in the Phase 4A visual recomposition entry below); marquee items updated to include ROS, scikit-learn, Supabase, TensorFlow for more meaningful technical content; `site.movenue` URL added to site.ts; zero "Yalla7gez" references confirmed.
- **Home page refinement (Phase 4A visual/UX pass):** page re-choreographed as a journey (identity → anticipation → proof → breathing space → person → trajectory → credibility → technical identity → connection); global section rhythm increased via SectionFrame (`py-28/32/40`) without lengthening content; hero CTA hierarchy simplified to one dominant champagne CTA ("View selected work") plus quiet text links ("Movenue live", "Get in touch") via a new `QuietLink` primitive — secondary section actions ("All work", "More about me", "Full experience", "View publications") also demoted to QuietLink so champagne pills are reserved for the primary journey and final CTA; marquee calmed (uniform item tone — position-based emphasis removed, loop slowed 46s→64s, tighter band); new `RevealImage` primitive adds a one-time masked clip-path reveal + scale settle for the Movenue screenshot and IUGRC certificate; new `Interlude` breathing space between Selected Work and Profile (giant ghost "Profile" chapter word, slow scroll drift, aria-hidden decorative, reduced-motion safe); About preview made typography-led (statement up to `lg:text-6xl`, facts restyled as an airy spec grid instead of resume-table rows); Experience preview re-presented as a trajectory — current FlyRank entry enlarged with champagne date/org, older entries progressively reduced in size/contrast, wider date column and taller rows; Publication certificate framed as a physical artifact (deeper matting, masked reveal, staged two-step text reveal); Capabilities rows airier (larger group titles `text-2xl/3xl`, dimmer dot-separated items, `py-10/14`) with no technologies added or removed; Final CTA given a deliberate approach pause (`pt-36→lg:pt-56`) and deeper close; hero scroll cue switched from `animate-bounce` to a slower custom `scroll-cue-drift` keyframe; hero backdrop atmosphere slightly dimmed. No factual content, metrics, links, or project data changed; no new dependencies; all motion respects `prefers-reduced-motion`.
- **Home page refinement (independent QA pass):** content-integrity fix — marquee item "ROS" (undocumented in the content source) replaced with confirmed "OpenCV"; About preview paragraph de-duplicated (dropped the clause restating the hero positioning verbatim; kept only the "sensor to deployment" framing); dead code from earlier iterations removed (`FeaturedProjectCard`, `SectionHeader`, `Section` primitives); mobile menu now closes on Escape and returns focus to the toggle; "(opens in a new tab)" announcements made consistent across `QuietLink`/`ButtonLink` external variants and raw external anchors; portrait image intrinsic dimensions corrected to the real 1024×1024 asset; Interlude breathing space shortened on mobile (`26vh` vs desktop `46–52vh`) so it reads as a pause, not a void; Movenue screenshot no longer `priority`-preloaded (below the fold, competed with the hero LCP) and `sizes` attributes refined on Movenue/certificate/portrait images to stop overserving on wide screens. Verified: production build, TypeScript, ESLint clean; single H1 → logical heading tree; alt text, skip link, focus-visible outlines, reduced-motion paths intact; no horizontal overflow vectors (all bleed/marquee/ghost elements inside `overflow-hidden` containers).
- **Home page recomposition (Phase 4A visual recomposition — user-directed):** full visual recomposition of the Home page toward a more minimal, premium, editorial, visually calm result (references translated, not copied: alenmalkoc.com/en, heynesh.com, fuch.ai). Page rhythm re-sequenced as immersive → texture → editorial proof → minimal index → pause → person → visual evidence → minimal metadata → large CTA — **Publication preview moved before Experience preview** so the published artifact (visual evidence) precedes the compressed metadata lists. Header redesigned: quiet typographic wordmark left ("Yousef Koura", no mark), compact mono uppercase nav right (WORK / ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT — HOME intentionally carried by the wordmark; footer + mobile menu keep the full six-item nav), lighter scroll state (`bg-obsidian/70 backdrop-blur-xl`, hairline border), champagne reserved for active/hover only; existing mobile accessibility behavior preserved (Escape close, focus return, aria attributes). Hero: visible copy reduced further (one-line positioning, "Get in touch" CTA dropped from hero — contact lives in nav + final CTA); name now enters via a masked per-line rise (overflow-hidden clip reveal, staggered), portrait enters with a scale settle instead of a y-shift; PortraitObject treatment untouched (DECISIONS #28–29). Selected Work recomposed image-led: Movenue name + live status/domain caption row above a **full-width** masked-reveal screenshot, followed by a hairline info strip (one-sentence summary · evidence metric · role/timeframe) and tags demoted to a single mono dot-separated line (pill boxes removed); secondary projects converted from thumbnail rows to a **minimal numbered index** (number · name · one metric line · domain/timeframe right-aligned · arrow; whole row is the link; summaries and thumbnails removed from Home — they remain available for the WORK page). Profile compressed: facts reduced 6→5 (University merged into Education value) as label/value spec rows, support paragraph shortened to its sensor-to-deployment clause. Publication compressed to date/title/venue (+ certificate artifact untouched). Experience compressed to uniform tight rows (timeframe | role — org | Current chip | one quiet summary line; per-entry location lines and size hierarchy removed). Capabilities compressed to a three-column minimal index (group title + mono item list per column; section title/description removed). Final CTA enlarged (`lg:text-[5.5rem]` heading, larger email action) with the open-to-roles paragraph demoted to a single mono label line. No factual content, metrics, links, or project data changed; no new dependencies; no WebGL; all motion respects `prefers-reduced-motion`. Verified: production build, TypeScript, ESLint clean; SSR smoke test confirms section order (Profile → Publication → Experience → Capabilities), desktop nav composition, and all key content present.

- **Home page redesign (Phase 4A minimal density pass — user-directed):** full-page density reduction after user feedback that the page felt heavy (too much text, no breathing room, visual clutter), the portrait too large with an overdone 3D/parallax effect, and the header wordmark too quiet. **Header:** wordmark rebuilt bold display-weight (`font-bold`, scaled up) per DECISIONS #31; desktop nav links grouped inside a subtle bordered/tinted capsule (`border-line`/`bg-surface/70`, dark tint — no frosted panel) with CONTACT promoted to a solid champagne pill outside the capsule; Escape-close/focus-return, aria-expanded/controls, body scroll lock, aria-current all preserved; mobile menu unchanged. **Hero:** name scale cut sharply (desktop `clamp(3.5rem,8vw+0.5rem,10rem)` → `clamp(2.75rem,4.5vw+1rem,5.75rem)`; mobile/tablet similarly reduced) so the header wordmark and hero stop competing and the hero's dominant weight shifts to the positioning line (bumped one step in size; copy unchanged and still provisional); hero metadata strip removed (location · B.Sc. — both live elsewhere); scroll cue removed; backdrop reduced to a single faint radial tint (grid-lines layer and noise overlay removed); portrait scroll parallax removed. **Portrait (supersedes the #29 technique — DECISIONS #30):** PortraitObject rewritten as a single flat radial-masked plane (~420px desktop cap, no grid bleed) — echo layers, rim light, film grain, inner frame, corner ticks, foreground readout layer, ground shadow, vertical editorial strip, "Open to work" badge, idle sway, and pointer parallax all removed; component now has zero client-side JS; remaining hero entrance motion stays reduce-gated. **SectionFrame:** index numerals, champagne index color, and filler hairline removed — wayfinding kept via top hairline + mono label only; section padding raised (`py-32/40/48`). **TechnicalMarquee deleted outright** (redundant with Capabilities' confirmed technologies; explicitly decorative chrome) along with its CSS keyframes/mask; page rhythm becomes immersive → proof → pause → person → evidence → metadata → CTA. **Selected Work:** section title "Evidence, not adjectives." cut; Movenue tags line cut (data retained in `projects.ts` for WORK); Movenue heading calmed (`text-7xl` → `text-6xl`); numbered secondary index unchanged. **Profile:** "From sensor to deployment…" paragraph cut (breadth restated by Capabilities); statement + all five fact rows + link kept. **Publication:** matting simplified (padding/corner ticks/"Plate 01" figcaption/duplicate IUGRC chip/text-column border-t removed); date/title/venue/link intact. **Final CTA:** ghost GitHub/LinkedIn buttons removed (both remain in footer/contact), approach padding deepened; heading, roles line, email, "Get in touch" kept. **Interlude:** bottom hairline tick removed; breathing-space word kept. No factual content, metrics, dates, or links altered or invented anywhere; no dependencies added or removed; remaining motion (masked name rise, entrance scale settle, Reveal/RevealImage, Interlude drift) all respects `prefers-reduced-motion`.
- **Home page refinement (portrait evolution + signature motifs + evidence iteration — user-directed):** **Portrait** redesigned from the plain radial-masked plane (DECISIONS #30) into a duotone editorial treatment (**DECISIONS #32**) — Obsidian gradient bed + grayscale photo composited via `mix-blend-luminosity` + ~30% champagne `soft-light` highlight grade; asymmetric `aspect-[3/4]` crop with a single diagonal top-right corner cut; controlled right-edge bleed past the hero grid on desktop (`lg:-mr-6`/`xl:-mr-10`) and slight rise (`lg:-mt-6`); one-time CSS load reveal (inset clip-path wipe + scale settle, 0.25s delay) declared only under `prefers-reduced-motion: no-preference`, fully static afterwards; Hero's residual framer-motion portrait wrapper removed so the component keeps zero client-side JS; `priority` migrated to Next.js 16 `preload`. **Ghost-typography motif** extracted from Interlude into reusable `ui/GhostType.tsx` (identical Interlude render) and applied in exactly two further places — ghost word "Index" behind Selected Work's numbered secondary index and a ghost quotation glyph behind the Profile pull-quote — three total instances, deliberately sparse (**DECISIONS #33**). **Evidence visualization**: new `ui/EvidenceChart.tsx` (Recharts, new dependency) in Selected Work — horizontal bar comparison of best reported results from static `content/evidence.ts` (Agri-Bot 96% accuracy · PioPetro up to 87% R² · ITI up to 97% F1 · D-HUB 96% accuracy; every figure verbatim from CONTENT.md CONFIRMED entries); keyboard-operable focusable row overlays + aria-live detail readout + visually-hidden data table with source traceability; chart SVG aria-hidden; entrance animation disabled under reduced motion; no network path. **Header**: scroll-aware nav highlighting on Home via IntersectionObserver over section ids (`#work/#about/#experience/#publications/#contact` added to their SectionFrames); highlight reuses the existing champagne active convention, visual-only — `aria-current` stays route-based; Escape/focus-return/aria-expanded mobile behavior untouched. Verified: production build, `tsc --noEmit`, ESLint clean.
- **Home page refinement (transparent portrait art direction + reading progress — user-directed):** **Portrait assets replaced.** The user supplied two background-removed cutout exports of the approved photo — `personal-image-desktop.png` (365×684) and `personal-image-mobile.png` (394×634) — replacing `yousef-portrait.jpeg`, which is removed from `public/portrait/` (raw JPG sources archived in `projects&certificate_images/`). The duotone editorial treatment (**DECISIONS #32**) is retired per **DECISIONS #34**: the cutouts are presented clean at their native aspect ratios with no gradient bed, luminosity/soft-light grades, radial edge melt, or corner clip-path; the one-time reduce-gated load reveal is kept. **Portal archive opening stage** (`PortalArchive.tsx` — the live Home hero): the single `fill`+`preload` image is replaced by `<picture>` art direction via Next.js 16's `getImageProps` pattern — desktop crop ≥761px, mobile crop below (matched to the portal's 760px breakpoint), responsive `srcSet`s on both `<source>`s; LCP priority moved to `loading="eager"` + `fetchPriority="high"` (docs-recommended substitute since `preload` would double-fetch across art-direction variants); `.portal-stage__image` now carries the absolute-fill behavior previously injected by `fill`; the decorative statement-section portrait is repointed to the mobile cutout (it also referenced the deleted asset). **Editorial Hero path** (`PortraitObject.tsx`, currently unmounted): migrated to the same two assets and the same `getImageProps` + `<picture>` pattern so it stays consistent if reintroduced. **Header:** champagne scroll-progress hairline added at the header's bottom edge (`scaleX` from document scroll fraction; visual-only — **DECISIONS #35**). Verified: production build, `tsc --noEmit`, ESLint clean; rendered HTML confirmed serving both art-direction sources with responsive srcSets and no stale references to the deleted portrait.
- **Home page refinement (positioning role line — user-directed):** added the explicit role line "Machine Learning Engineer" to the Home arrival flow, placed in the portal statement section ("01 — SIGNAL / INTENT") directly above the provisional positioning copy in `PortalArchive.tsx` (the live Home; the unmounted editorial `Hero.tsx` was left untouched). New `.portal-statement__role` style uses only existing tokens — Space Grotesk display, weight 500, `clamp(1rem,.8rem+.9vw,1.45rem)`, ink color, sentence case — deliberately between the 10px mono kicker/meta level and the large statement copy so it reads as a positioning statement without competing with display type or violating champagne discipline. The line and copy are wrapped in a single in-flow `.portal-statement__body` (the section is a row-flex of absolutely-positioned siblings; wrapper preserves existing geometry exactly) and enter via the section's existing reduce-gated `[data-reveal]` choreography — no new animation pattern. No other hero/statement elements altered; no dependencies added. Verified: production build, `tsc --noEmit`, ESLint clean; rendered HTML confirms the line renders inside the statement section ahead of the positioning copy. Note: this implements the role identity only; the final positioning statement remains MISSING/open in [CONTENT.md](./CONTENT.md).
- **Mobile header/nav redesign (Rekorder-inspired mobile menu — user-directed):** **Header bar:** wordmark centered on mobile/tablet (<lg) via a 3-column grid (`grid-cols-[1fr_auto_1fr]`, wordmark `col-start-2 justify-self-center`, toggle `col-start-3 justify-self-end`); at `lg` the container reverts to the original `flex justify-between` so desktop is pixel-identical. Bar height (h-16/lg:h-20), padding, scroll blur/border treatment, and progress hairline unchanged. **Mobile menu panel** re-skinned from the full-width obsidian stacked list to an inset rounded card per **DECISIONS #36**: Surface-token background (`bg-surface/95 backdrop-blur-xl`), Border hairline, `rounded-2xl` corners, 2-column grid of all six nav items (HOME…CONTACT as items 1–6; CONTACT keeps href `/contact`), each item a compact mono uppercase link (`text-[10px] tracking-[0.18em]`) prefixed by a 4px dot bullet (`h-1 w-1 rounded-full`); active/hover shift text+dot to champagne only (accent discipline). Escape-close/focus-return effect, body scroll lock, `aria-expanded/controls`, per-link close handlers, route-based `aria-current`, and scroll-spy logic reused verbatim — only the panel's visual output changed (height-clip animation → opacity/y fade since the inset card must not be height-clipped). No new dependencies. Verified: production build, `tsc --noEmit`, ESLint clean; SSR HTML confirms grid placement classes + intact aria wiring; generated CSS contains all new utilities; width math checked at 320px (longest label "PUBLICATIONS" ≈94px vs ≈95px label budget — fits without wrap, `whitespace-nowrap` guards), 375px, 390px, 430px.
- **Header regression fixes (desktop seam + mobile single-shape menu — user-directed):** Two regressions from the pill/panel iteration corrected per **DECISIONS #37**. **Desktop:** the scrolled-state border hairline is suppressed at ≥lg (`lg:border-transparent`) so no full-width line paints beneath the bar in any state (frosted scroll treatment + #35 progress hairline kept), and all open-state bar styling is scoped below-lg with explicit `lg:` restores so a persisted-open menu can never restyle the desktop bar. Pixel A/B vs pre-pill HEAD (git worktree) proved the scrolled hairline predates the mobile work but read as an unwanted seam; post-fix scans show the y=80 line row eliminated (mean luminance 43.5 → 11.2) with zero new full-width rows. **Mobile:** open state rebuilt as one structural element in `Header.tsx` — outer `motion.div` owns the single background/radius/shadow (animated ink→Surface, pill→16px, dual-layer shadow morph); trigger `<motion.button layout>` reduced to transparent geometry-only zone inside it (shared-layout morph preserved); nav grid is an internal zone (zero gap measured: chip bottom = grid top = same edge; only independent paint is the Border-token top hairline divider). Wordmark glyphs crossfade dark↔light as the shape's bg flips. Escape-close/focus-return/scroll-lock/aria verified via simulated key events through CDP. Note: Turbopack dev caches the Tailwind CSS module on `globals.css` only — editing component classnames requires clearing `.next` to regenerate utilities. Verified: production build, `tsc --noEmit`, ESLint clean; CDP structural suite 22/22 (computed styles, pixel-row scans, a11y key-event simulation); final visual sign-off manual by user.

- **Mobile header refinement pass (light dropdown panel + shrink-to-fit bar + theme-toggle stub — user-directed):** Six refinements to the mobile (<lg) header per **DECISIONS #38**. (1) A theme-toggle stub joins the speaker chip in the bar — Lucide Sun/Moon flipping local icon state only (no real theming applied yet), same raised-chip convention, dynamic aria-label ("Switch to light mode"/"Switch to dark mode"). (2) Icon de-duplication: the speaker's absolute-overlay placement is replaced by an in-bar icon group so speaker + theme toggle each render exactly once and stay visible/reachable with the menu open. (3) Dropdown panel background switched from Surface-dark to the pill's own light Ink token (`bg-ink`); the bar keeps that background in BOTH states so no background interpolation exists at all (color flash structurally impossible) and the wordmark crossfade is removed (dark variant serves both states); the active item inverts to a Surface pill with Ink text + champagne dot (16.4:1 / 8.0:1), inactive items move to Obsidian text on Ink (17.7:1 — Muted fails at 2.1:1 there) with Border-tone dots warming to champagne on hover. (4) Radius unified to `rounded-2xl` (16px, the #36 precedent) for the bar in both states AND the panel; the mobile full-pill radius is retired. (5) Open-state shrink: the bar morphs full-width ↔ hug logo+controls through the existing Framer `layout` setup (`justify-self-stretch`↔`justify-self-center`, trigger `flex-1`↔`flex-none`) and the menu expands below as its OWN sibling shape (same Ink/radius/shadow family, `w-[min(100%,20rem)]`, centered under the shrunk bar). (6) Click/tap-outside close added (`pointerdown` gated on the open state, ignoring targets inside bar/panel) alongside the untouched Escape-close/focus-return/scroll-lock/per-link close behavior; reduced-motion path unchanged (global `MotionConfig reducedMotion="user"` + CSS reduce block). Only `src/components/layout/Header.tsx` touched in code. Verified: production build, `tsc --noEmit`, ESLint clean; production-server HTML assertions — `lucide-volume-2`=2 (one per breakpoint), `lucide-sun`=1, `lucide-moon`=0, exactly one menu trigger, exactly one dark-wordmark img (mobile) + one light img (desktop), panel correctly absent from closed-state SSR; WCAG ratios computed from token values; final visual sign-off manual.
- **Statement-section visual swap (portrait → signal schematic — user-directed):** In the Home arrival flow's "01 — SIGNAL / INTENT" statement section (`PortalArchive.tsx`), the ghosted circular portrait — which reused the hero's mobile cutout asset (`personal-image-mobile.png`, grayscale, 35% opacity, rotated 18°) behind the giant stroked numeral — is replaced by an abstract inline-SVG **signal schematic**: hairline grid rules, a graduated baseline with ruler ticks, one calm trace line with a single "event" peak marked by the section's only champagne accent (node dot + ring + dashed drop line to the baseline); no text or numerals inside the graphic so nothing can be misread as metrics or project evidence. Palette limited to literal mirrors of the existing `.portal-home` tokens (`#F3F0E8`/`#A9A9A3`/`#2A2C30`/`#C9A86A`) — no new colors; accent discipline held (one champagne node). The layer is `aria-hidden` + `focusable="false"`, pointer-events-none, painted beneath the z-indexed copy exactly where the portrait sat; desktop occupies the portrait's former slot (right bleed `-7vw`, `clamp(340px,44vw,640px)`, flex-centered like the numeral), ≤760px re-anchors bottom-right (`bottom 8vw`, right `-14vw`, `78vw` wide) keeping the kicker band clean. Fully static — reduced-motion safe by construction (the only motion remains the section's existing reduce-gated `[data-reveal]` entrance); zero JS added. The hero `<picture>` art direction and all DECISIONS #28–34 portrait treatments elsewhere are untouched. **Phase-status flag (resolved):** this task originated as a WORK-page-hero change, but investigation found /work still serving the Phase-4A placeholder — no WORK hero exists in source, git history, or build output — and the described markup ("01 — SIGNAL / INTENT", stroked numeral, ghosted portrait, philosophy headline) matched this Home section exactly; the user confirmed retargeting to Home. **PHASE 10 therefore stays NOT STARTED and that status was accurate**, not out of sync. Hero copy for this slot: three candidate sentences were drafted from CONTENT.md-confirmed material only and presented to the user as options; the live sentence is unchanged pending their pick. Verified: production build, `tsc --noEmit`, ESLint clean; prerendered HTML shows zero `portal-statement__portrait` references and intact kicker/numeral/role/copy/schematic structure.
- **Positioning statement confirmed (original sentence retained — user-directed):** In the Home "01 — SIGNAL / INTENT" statement section (`PortalArchive.tsx`), the interim evidence-first sentence is reverted to the ORIGINAL positioning statement per **DECISIONS #39**: "I build the systems beneath a useful interface: models, data, and decisions brought into the same room." — with the section's single champagne accent (`<em>` via `.portal-statement em`) on "models, data, and decisions", the same single-accent pattern the replaced sentence used, applied to the sentence's natural thesis contrast. Kicker, role line, ghost numeral, and signal schematic untouched. This resolves the long-open final-positioning content item: [CONTENT.md](./CONTENT.md) "Professional positioning" now records it CONFIRMED (was MISSING), consistent with [DECISIONS](./DECISIONS.md) #39. Verified: production build, `tsc --noEmit`, ESLint clean; rendered emphasis confirmed at desktop + mobile widths via headless-browser read-back.
- **Real light/dark theming — Phase 1: infrastructure + Header proof case (user-directed):** genuine theming implemented per **DECISIONS #40**, replacing the #38 toggle stubs' local icon-state flip. All eight color tokens became runtime variables `--tk-*` scoped by `[data-theme="dark"]`/`[data-theme="light"]` in `globals.css`, with Tailwind's color names mapped via `@theme inline` so every existing utility (including opacity variants, resolved at runtime through `color-mix(in oklab, …)`) re-themes when `<html data-theme>` flips; per-theme `color-scheme`/scrollbar colors plus tokenized `::selection` and `:focus-visible`. SSR renders `data-theme="dark"` (brand default — `prefers-color-scheme` never read) plus a pre-paint inline init script honoring a stored `localStorage["theme"]` choice without flash or hydration mismatch (`suppressHydrationWarning`); new `src/lib/theme.ts` is the runtime source of truth (apply/store/read + `<meta name="theme-color">` sync); the `viewport.colorScheme` export was dropped in favor of CSS-declared `color-scheme`. Both existing Sun/Moon toggles wired (desktop icon button + mobile raised chip) via `useSyncExternalStore` over a MutationObserver on the attribute (eslint's `react-hooks/set-state-in-effect` rule forbids effect-driven setState). `Header.tsx` fully converted as proof case: wordmark assets swap by theme for legibility (reversed on the mobile ink bar) and the CONTACT pill hover pairing adds ink text only in light mode. Approved light palette applied verbatim; derived `--tk-raised:#E1DCCD` flagged provisional; measured light-mode sub-AA pairs flagged for ruling (muted-on-capsule 4.24:1, active-nav-on-pill 3.73:1, CONTACT pill 4.37:1 — all AA-large-compliant; details in DESIGN_SYSTEM.md). `.portal-home` Home content intentionally untouched — that is the Phase 2 sweep, section-by-section (`ButtonLink`/skip-link champagne hovers are known deferred casualties). Verified headlessly (puppeteer-core + Edge against the production build): fresh-session dark default, toggle flip + persistence across reload, init-script-only application proven with all app JS blocked, desktop + mobile computed-style audits, ten reference screenshots captured; production build, `tsc --noEmit`, ESLint clean.

- **Real light/dark theming — Phase 2: full Home sweep + contrast rulings applied (user-directed, DECISIONS #41):** With Phase 1's infrastructure + Header proof case approved and the user's rulings received (light `--tk-raised` `#E1DCCD` **ratified**; the three flagged sub-AA pairs fixed by adjusting the specific usage/shade, approved hexes untouched), the entire `.portal-home` Home content was converted from pinned dark hexes to the token system. **Contrast fixes first:** three derived implementation tokens added (`--tk-muted-strong` `#65655D`, `--tk-champagne-strong` `#7A5B23`, `--tk-on-accent` `#FFFDF7` in light; dark values byte-identical mirrors of approved tokens) — re-measured headlessly against true rendered composites: muted-on-capsule 4.24→4.85, active-nav-on-pill 3.73→4.69, CONTACT pill 4.37→4.90; all AA-small at their actual 10px mono size. Direction note recorded: on mid-tone bronze `#8C6A2E` darkening can never pass AA-small (pure black = 4.22), so the on-accent fix legitimately lightens. The same standard swept across newly-themed text: footer column labels/hovers, skip-link focus pairing, portal kickers/labels/links (champagne-strong), experience-section muted text (section-scoped muted-strong on its Surface background — caught a real failure live when the audit measured "VIEW FULL EXPERIENCE" at 4.0 before the fix). **Sweep mechanism:** the portal block's local `--p-*` mirrors now resolve the runtime tokens (`--p-gold-text` alias added for small-text accent contexts); section backgrounds (`#0b0c0e` panels/publication, `#14161a` dates) → Background/Surface tokens; deck wash scrim rebuilt via `color-mix(in srgb, var(--tk-background) 90%, transparent)` so card overlays follow the theme; signal-schematic SVG strokes/fills routed through theme vars (grid hairlines stepped .05→.065 so the texture survives on cream). **Dark-tuned decoration got light-specific adjustments only where it failed on cream:** hero glow/stage alphas stepped down (.19→.12, .055→.04), action hover shadow softened, date-row hover/active champagne tints rebased to bronze alphas, and the IUGRC certificate plate given a whisper of ink-alpha elevation in light only — interior-vs-bg luminance delta measured 150 dark vs 14 light (white paper cannot tonally pop on cream); crop, matting structure, and hover color-reveal untouched. **Verification per section** (production build via puppeteer-core + Edge; dark AND light × mobile 390px AND desktop 1440px screenshots per section; plus a computed-style audit enumerating every rendered fg/bg/stroke color against the palette families with WCAG measurement of every text node): hero → statement → selected work → roster → experience → publications → final CTA → footer, each verified before the next; end-to-end toggle pass clicked both theme toggles (desktop chip + mobile chip), confirmed `data-theme` flip, `<meta name="theme-color">` sync (#0B0C0E↔#F3F0E8), localStorage persistence across reload, and full-page captures show zero unconverted dark regions in light mode outside the by-design mobile ink bar. Production build, `tsc --noEmit`, ESLint all clean. No layout, spacing, copy, or motion changes; no new dependencies shipped.

Open / unresolved (carried from Phase 3, do not resolve silently):
- Resume destination URL — RESUME CTA intentionally omitted until it exists.
- Portrait use on ABOUT — the portrait is approved for the Home hero; whether it also appears on ABOUT is a later-milestone decision (PHASE 4A covers HOME only).
- Military service presentation — included as identity context ("Military service · completed") only, not as an experience entry.
- ~~Which old-site-only projects to include on WORK later.~~ RESOLVED 2026-08-23 (DECISIONS #42): PotatoScan + Steganography Detector included on WORK's secondary index; the other four old-site-only projects excluded.
- Typography finalization (Phase 5), full 3D visual language/WebGL concept (Phase 12), metadataBase/deployment URL (Phase 15).

Next step: real-theming Phase 2 complete (DECISIONS #41) — pending user visual sign-off of the per-section sweep screenshots; the WORK page milestone was subsequently implemented under **PHASE 4B** below.

---

## PHASE 4B — WORK PAGE (IMPLEMENTATION MILESTONE)
**Status: IN PROGRESS** (implemented — pending user visual/UX review)

A **user-directed implementation milestone**, sibling to Phase 4A. Originally scoped to the WORK index plus exactly ONE project detail page (`/work/movenue`); expanded in the final 2026-08-23 session (DECISIONS #44, update log below) so ALL SEVEN project detail pages are now implemented alongside a recomposed index grid. Phase 4 (wireframes) and Phase 10 (WORK/PROJECTS full scope: filtering, media model, richer per-project content) remain open.

Completed (2026-08-23, see DECISIONS #42 for full detail):
- WORK index (`src/app/work/page.tsx`) rewritten from the Phase-4A placeholder into a quiet editorial system: header block ("Work." display H1, 07 projects · 01 case study metadata, factual intro), five primary entries numbered 01–05 separated by hairlines and deliberately non-uniform (Movenue as dominant full-width feature with champagne case-study link; Agri-Bot, PneumoScan, Personal RAG Chatbot, FMCG Pipeline as alternating asymmetric two-column rows with metrics strips), then a secondary numbered index "Further builds" (06–07: PotatoScan, Steganography Detector via `SecondaryProjectRow`) honestly labeled as slimmer-documentation entries pending verification, and a closing forward path (Get in touch pill + direct email) so the page never dead-ends.
- Data layer added to `src/content/projects.ts`: `WorkProject` type, ordered `workProjects` (Movenue entry derives shared fields from `featuredProject`), narrow `WorkIndexEntry` type + `workIndexProjects`, and `movenueCaseStudy`; existing exports untouched (Home unaffected); `SecondaryProjectRow` prop narrowed to `WorkIndexEntry` (optional timeframe).
- Detail route `src/app/work/[slug]/page.tsx` + `MovenueCaseStudy.tsx` per PHASE3_UX §7: breadcrumb back-link, hero header (role/timeframe/status/stack meta grid + solid-champagne "Visit Movenue" pill), full-width masked-reveal screenshot, Overview / Role & ownership / Approach / Evidence sections, closing nav. `generateStaticParams` pre-renders ONLY movenue; `dynamicParams = false` 404s every other slug. No next-project link (only one detail page exists).
- Content integrity held: all metrics/dates/tags/links verbatim from `yousef-portfolio-content.md` §6; PneumoScan's anomalous source figures rendered verbatim where shown and still flagged in CONTENT.md; no Movenue repo link invented.
- Demo-capture video plan corrected before shipping: the assumed `public/videos/*.mp4` assets do NOT exist anywhere in the repo or git history (earlier investigation note was wrong); the click-to-load player component was removed and entries render static captures only (PneumoScan: quiet labeled frame). Player deferred until real assets exist.
- Verified: production build clean (`/work` static, `/work/movenue` SSG), `tsc --noEmit`, ESLint clean, SSR content assertions (metrics/links/404 handling/UTF-8/Home regression), asset availability checks, desktop+mobile screenshots captured for manual review.

Open / unresolved (status as of the #44 session — see the update log below for what changed):
- ~~Six remaining project detail pages (Agri-Bot, PneumoScan, RAG Assistant, FMCG Pipeline, PotatoScan, Steganography Detector)~~ RESOLVED 2026-08-23 — all seven detail pages implemented (DECISIONS #44); fuller verified content for PotatoScan/Steganography remains desirable but their pages render only sourced material.
- PneumoScan data anomalies ("85.1–85%" figure, dual-date timeframe) — user correction requested, rendered verbatim meanwhile.
- ~~Demo-capture videos for project entries — no assets exist yet; reintroduce player when provided.~~ RESOLVED 2026-08-23 — three real captures encoded and embedded (DECISIONS #44).
- Final visual sign-off of this page by the user.

Update (2026-08-23, later session — compositional redesign + copy fix + dormant video infra, see DECISIONS #43):
- `/work` recomposed from per-entry template reuse into SIX distinct compositions, user-approved in planning: Movenue full-bleed breakout media band (the page's only full-bleed element); Agri-Bot hardware-dominant asymmetric grid with vertical metrics rail; PneumoScan metrics-forward typographic band (no image asset exists — none invented); RAG Chatbot quiet UI-forward smaller-scale mirror; FMCG dashboard-led `<figure>`+figcaption strip with its large metric; secondary tier as calm numbered rows. Shared primitives extracted to `src/components/work/entry-parts.tsx` (`StatusChip`, `EntryHeader`, `EntryMedia`, `TagLine`, `MetricFigure`, `EntryActions`); the retired template component was deleted.
- Leaked internal-process copy fixed: the secondary-tier label became "Additional builds", the process-note intro line was removed entirely, and both entries carry real one-line descriptions sourced from `yousef-portfolio-content.md` §6 (PotatoScan full-stack FastAPI+React framing; Steganography 90% accuracy). `SecondaryProjectRow` renders the sourced summary.
- Demo-video infrastructure built DORMANT (user decision: "infra now, activate later"): `HoverVideo` client component (mount-on-intent `<video muted loop playsinline preload="none">` over the poster; hover-in/out on fine pointers, tap affordance on touch, focusable button keyboard toggle, reduced-motion blocks hover autoplay only, load failure reverts to poster) + optional `ProjectVideo` data field, unset everywhere until real encoded assets land in `public/videos/`. Zero footprint while dormant (verified).
- Verified headlessly against production builds: tsc/ESLint clean; 18/18 composition×breakpoint checks (375/820/1440 — no horizontal overflow, no clipped children); 18/18 HoverVideo behavioral assertions via request-level harness with genuinely decodable media generated in-browser (hover play with advancing currentTime, leave unmount, Enter/Space toggle, reduced-motion gating confirmed active, touch tap, real-404 failed→poster fallback); leak scan clean; Home regression checked. Final visual sign-off remains manual.

Update (2026-08-23, final session — index grid + ALL SEVEN detail pages live, see DECISIONS #44):
- `/work` recomposed as an index grid per the approved plan: one full-width flagship composition for Movenue (capture linking into its detail page, summary + verbatim metric lines, champagne "Read the project page"), then a uniform responsive card grid (sm:2 / lg:3) for the remaining six builds — each tile links to its own `/work/[slug]` page and shows number/status/name/kind/sourced summary/timeframe; builds without a capture get a quiet labeled panel. The #43 six-compositions scroll, `entry-parts.tsx`, `MovenueCaseStudy.tsx`, and their data blocks (`workProjects`, `movenueCaseStudy`, `workIndexProjects`) are retired.
- ALL SEVEN project detail pages now live (`/work/movenue|agri-bot|pneumoscan|personal-rag-chatbot|fmcg-pipeline|potatoscan|steganography-detector`) via one data-driven template (`ProjectDetailPage.tsx` over new `projectDetails` in `projects.ts`): Problem → Methodology → Solution → Results → Stack → Links → curated prev/next nav. Short pages render only the sections their sourced content supports (PotatoScan, Steganography Detector stay honest instead of padded). `generateStaticParams` covers all seven slugs; `dynamicParams = false`.
- Real demo videos shipped: three raw AVI captures in `public/videos/` re-encoded to H.264 MP4 + poster stills (agribot-demo 5.9 MB, fmcg-pipeline-demo 1.3 MB, rag-chatbot-demo 3.97 MB; WebM dropped as larger); embedded via `HoverVideo` inside Solution sections and index tiles, held in a pure-CSS laptop bezel on detail pages. `HoverVideo` gained an optional explicit `aspect` prop.
- Tech-stack icon row added to detail pages: `@icons-pack/react-simple-icons` brand marks for confirmed technologies, neutral Lucide glyph chips for concepts without marks (new dependency recorded in TECH_STACK.md).
- Content integrity held throughout: every figure/description/tag/link traces to `yousef-portfolio-content.md` §6; anomalies rendered verbatim and still flagged in CONTENT.md; no Movenue repo link invented.
- Verified: production build clean (`/work` static + all seven `/work/[slug]` SSG paths), `tsc --noEmit`, ESLint clean; prerendered-HTML content assertions passed on all eight routes including section-presence AND absence checks on short pages.

Update (2026-08-23, fix pass — user visual review, see DECISIONS #45):
- Movenue flagship capture contained: full-container dominance reduced to a centered `max-w-4xl` (896px at desktop; unchanged below ~960px viewports) — reads as reduced, not demoted (still >2.5× any grid thumb).
- `rounded-2xl` (16px, the #36 precedent) applied to every card surface on `/work`: flagship capture block + all six ALL PROJECTS tiles (`overflow-hidden` clips children cleanly).
- Video interaction REVERSED (supersedes the #43/#44 hover-autoplay-muted behavior): `HoverVideo` deleted, replaced by `DemoVideo` — static poster by default everywhere, always-visible play affordance (real focusable button), playback starts ONLY on explicit click and WITH audio, Play/Pause toggle + explicit close control return the frame to the poster state (playback end does too), load/playback failure reverts to poster, zero autoplay paths. Index tiles restructured to a stretched-link pattern (title `<Link>` covers the card via inset pseudo-element) so video controls are real buttons, not button-inside-anchor. Hover-hide CSS rules removed from globals.css.
- Audio asset correction (verified, not assumed): container scan showed the served MP4s carried NO audio track (#44(c) had stripped it) while the raw AVI sources carry audible MP3 stereo (mean −15.8 to −32 dB); all three MP4s re-encoded from the AVIs preserving audio (H.264 CRF 28, preset medium, ≤1280px long edge, yuv420p, faststart + AAC 128k stereo: agribot 7.3 MB · fmcg 3.4 MB · rag 5.9 MB), each verified non-silent post-encode. ffmpeg was used as a temporary external tool only — no new project dependency.
- Mobile grid: ALL PROJECTS renders 2 columns from the smallest breakpoint (`grid-cols-2 gap-4`, `lg:grid-cols-3` unchanged); half-width reflow kept within the existing type scale (card padding `p-4 sm:p-7`, titles `text-base sm:text-2xl`, meta line `text-[10px] sm:text-[11px]`; summary keeps its designed `line-clamp-3` ellipsis).
- Verified: production build clean, `tsc --noEmit` + ESLint clean; headless suite 30/30 against the production server — fresh loads mount zero `<video>` elements across `/work` + all three video-bearing detail routes (nothing plays until clicked); trusted-pointer click starts playback with `muted=false volume=1` and advancing currentTime; pause holds its frame; resume works; close restores poster and returns focus to the play control; keyboard Enter starts playback; tile players play in place without navigating; stretched title links still navigate; 2-column grid confirmed at 375/390/430 with zero horizontal overflow and zero clipped text nodes; flagship measured 896px centered at 1440 and full content column at 375; computed border-radius 16px on all seven card surfaces; Home h1/header/footer regression clean; zero console/page errors. Full-page screenshots captured at 375/820/1440 for manual review (agent image read-back unavailable in this session). Final visual sign-off manual by user.

Update (2026-08-23, second visual-review fix pass — top-of-page hairline rhythm, redundant kicker removal, mobile card density — user-directed):
- Top-of-page hairline audit (computed-style, production build): the page-top frame itself was already convention-exact (`border-t border-line` = 1px solid `#2A2C30`, `pt-4`, mono label — byte-identical construction to the ALL PROJECTS frame); the inconsistent rule near the top was the **flagship Movenue frame** — its label-slot `pt-4` sat EMPTY (no mono label, unlike every other hairline on the site) AND stacked with the heading row's own `pt-6 sm:pt-8`, producing 40–48px of dead space between rule and content vs the ~24px rule→label rhythm elsewhere. Fixed by removing the empty outer `pt-4` so the row's single `pt-6 sm:pt-8` is the one designed padding (matches the detail-template `border-t … pt-8` rhythm); rule y-position unchanged; no label copy invented. Lower hairlines (flagship bottom strip, ALL PROJECTS, card thumbs, contact rule) untouched.
- Redundant "WORK" kicker above the H1 removed (page identity carried by the nav's active state + H1 alone); the bare single top rule stays as the header frame; heading gap retuned `mt-14 sm:mt-20` → `mt-16 sm:mt-20` so the post-removal spacing lands exactly on SectionFrame's rule→title rhythm (desktop 80px unchanged; mobile 56→64px compensates the vanished label line).
- Mobile-only density fix on ALL PROJECTS tiles: the one-line summary paragraph is hidden below `lg` via `hidden lg:block` (responsive utility over conditional render — pure CSS, SSR-stable, no hydration shift); title, status chip, kind/domain tags line, and timeframe/metric row all kept; desktop cards render the description unchanged (`line-clamp-3`). Measured card height drops ~80px at 375/390/430 (e.g. Agri-Bot 358→278px).
- Verified: production build clean, `tsc --noEmit` + ESLint clean; headless suite 36/36 against the production server — kicker absent at 375/390/430/1440, top rule position/color byte-stable (y=144 mobile / y=176 desktop), flagship frame padding 0px + inner 24/32px, summaries `display:none h=0` at all three mobile widths and `display:block clamp-3` at 1440, radius 16px + status/kind/date rows intact on all six tiles, zero `<video>` mounts on load, flagship capture still 896px centered, ALL PROJECTS frame untouched, `/work/movenue` detail + Home portal regression clean, zero horizontal overflow. Screenshots captured for manual review (agent image read-back unavailable in this session). Final visual sign-off manual by user.

Update (2026-08-23, hero-entrance fix pass — user-directed, see DECISIONS #46):
- WORK hero entrance upgraded onto the site's existing masked per-line reveal language: the Home name-entrance technique (overflow-hidden clip spans, staggered framer-motion rise `y 112%→0%`, 1.05s, `cubic-bezier(0.22,1,0.36,1)`) was extracted byte-for-byte out of the unmounted editorial `Hero.tsx` into a shared `src/components/ui/MaskedLineReveal.tsx` primitive (**DECISIONS #46**); Hero now consumes it so the dormant path stays one motion language if reintroduced. A new client component `src/components/work/WorkHero.tsx` owns the header section; `page.tsx` remains a server component holding metadata and everything below the hero.
- Staggered choreography: the "Work." H1 rises ~0.2s→1.25s; the mono project-count/date-range metadata settles starting 0.78s and the intro paragraph follows at ~0.92s (the Home `item` language — opacity/y-20 rise, 0.8s, same ease curve), so the heading leads and supporting text lands as it finishes; whole sequence completes by ~1.7s.
- H1 scale raised exactly ONE existing Tailwind type-scale step at desktop only (`lg:text-8xl` → `lg:text-9xl`, 96px→128px) so the heading carries stronger asymmetric weight against the quiet right-aligned mono metadata; mobile/tablet steps unchanged (prior mobile-density pass preserved).
- Reduce-gating unchanged in kind (component `useReducedMotion` initial-false gate + global `MotionConfig reducedMotion="user"` + CSS reduce block): under `prefers-reduced-motion` the heading/metadata/intro render immediately with no clip or rise. No new graphics/SVG accents, no GhostType instance (#33 cap respected), intro copy untouched, nothing below the hero touched.
- Verified: production build clean, `tsc --noEmit` + ESLint clean; headless suite against the production server — fresh loads at 1440×900/375×812 show the H1 riser mid-flight at ~700ms (y≈32px, sampled on the actual rising span) while metadata AND intro still hold opacity 0, then all elements settle to identity transform / opacity 1 by ~1.8s with zero horizontal overflow at either width and expected computed font-sizes (128px/60px); reduced-motion emulation confirms no hidden state is ever applied (riser carries no inline transform, sits inside the H1 box) and metadata is visible immediately; prerendered SSR HTML carries the full hero content; Home portal hero + role line regression clean and `/work/movenue` still serves; zero console/page errors across every pass. Final visual sign-off manual by user.

Open / unresolved:
- PneumoScan data anomalies ("85.1–85%" figure, dual-date timeframe) — user correction requested, rendered verbatim meanwhile.
- Final visual sign-off of this page by the user.

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
**Status: NOT STARTED** (asset-organization prep completed 2026-08-23 — see log below)

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

Log:
- **Asset audit + reorganization (2026-08-23, prep for this phase):** `projects&certificate_images/` audited file-by-file against code references, CONTENT.md, and DECISIONS #34. (a) Four byte-identical duplicates of actively-served `public/` images removed from the raw folder only (`Agribot.png`, `FMCG dashboard.png`, `personal_rag_assistant.png`, `iugrc publication certificate.png` — SHA-256 verified identical to their `public/projects/` counterparts, which remain in use). (b) Raw sources preserved untouched: `Yousef personal photo.png` (DECISIONS #34 archive; hash-verified unchanged) and `movenue.png` — discovered NOT to be a duplicate: 1898×848 full-page live-site capture vs the 718×618 different crop served in production; retained as the sole full-res source (documentation gap flagged for a future decision entry). (c) Three future-phase certificate images relocated to new `public/certificates/`: `iti-mlal-certificate.png`, `piopetro-certificate.png`, `dhub-certificate.png` (git mv, content untouched; not yet referenced in code — ready for Phase 11). (d) Two orphan candidates flagged and left in place awaiting explicit user decision (NOT deleted): `breast cancer.jpg` (tied to the excluded Breast Cancer AI project, DECISIONS #42) and `logo - white.png` / `logo - black.jpeg` (possible Phase 5 brand inputs; differ from the used `logo-wordmark*.png` pair). CONTENT.md "Available assets" rewritten to match reality (it previously listed three portrait files that no longer exist anywhere). Verified: all 20+ asset paths referenced from `src/` resolve under `public/`; production build (16 static/SSG routes), `tsc --noEmit`, ESLint all clean.

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
- PHASE 4B — WORK PAGE (user-directed implementation milestone) — IN PROGRESS (WORK index grid + ALL SEVEN project detail pages implemented; real demo videos embedded; pending user visual sign-off — DECISIONS #44)
- PHASES 4, 6–16 — NOT STARTED (PHASE 5 PARTIALLY COMPLETED)

The project is currently in:

**PHASE 4B — WORK PAGE (IMPLEMENTATION MILESTONE)**
