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

Open / unresolved (carried from Phase 3, do not resolve silently):
- Resume destination URL — RESUME CTA intentionally omitted until it exists.
- Portrait use on ABOUT — the portrait is approved for the Home hero; whether it also appears on ABOUT is a later-milestone decision (PHASE 4A covers HOME only).
- Military service presentation — included as identity context ("Military service · completed") only, not as an experience entry.
- Which old-site-only projects to include on WORK later.
- Typography finalization (Phase 5), full 3D visual language/WebGL concept (Phase 12), metadataBase/deployment URL (Phase 15).

Next step: transparent-portrait art direction + reading-progress iteration complete — pending user visual review; then proceed to the WORK page milestone, not a bulk implementation of all pages.

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
