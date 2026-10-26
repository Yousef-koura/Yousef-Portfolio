# Phase 4A Report — Home Page UI/UX Level-Up (Below the Hero)

**Project:** Yousef Koura Portfolio
**Phase:** 4A — Home Page (implementation milestone)
**Scope:** Home page only, everything BELOW the hero. Header and hero untouched.
**Date:** 2026-10-25
**Commit:** None (not explicitly requested)

---

## 1. Prerequisites check (STEP 0)

| Prerequisite | Status | Detail |
|---|---|---|
| ui-ux-pro-max skill installed | YES | `.opencode/skills/ui-ux-pro-max` (SKILL.md + `data/` + `scripts/`) |
| Python 3 available | YES | `D:\download_99\Anaconda\python.exe`, v3.12.41 (the `python3` store alias is absent, but `python` works) |

I read, in order: ROADMAP.md, PROJECT.md, AGENTS.md, TECH_STACK.md, DESIGN_SYSTEM.md, CONTENT.md, DECISIONS.md, PHASE3_UX.md, plus the full Home implementation (`PortalArchive.tsx`, `.portal-home` styles in `globals.css`, `GhostType`, `EvidenceChart`, `RevealImage`, `SectionFrame`/`QuietLink` and related primitives, `src/content/*`, site metadata, `src/lib/theme.ts`). Baseline verified: production build, `tsc --noEmit`, ESLint all clean (only 1 pre-existing unrelated warning in `opengraph-image.tsx`).

**Skill guidance (advisory only):** I ran the skill's design-system generator (`"AI engineer developer portfolio dark premium minimal mobile-first"` — returns a generic purple/cyan "AI-Native UI" that does NOT match our locked Obsidian+Champagne palette, so it was read but NOT applied; typography is a Phase 5 open decision and was not finalized) plus domain searches for minimalism/editorial dark mode, information density & visual hierarchy, mobile touch targets & spacing, resilient text & compact labels, reduced motion, and small label contrast. The skill is advisory; it did not override the palette, theme system, sitemap, or any logged decision.

---

## 2. Audit findings before the change (verified, mobile-first)

The live Home is `PortalArchive.tsx` (hero = `portal-hero`, owner-satisfied, byte-identical after this pass). Below the hero:

- **(a) Heavy micro-chrome:** mono kickers like "01 — SIGNAL / INTENT", a 31rem ghost numeral "01", side labels, and the interaction hint "DRAG / ARROW KEYS TO BROWSE".
- **(b) Busy Selected Work deck:** stacked overlapping cards (rotate/scale by depth), hover-only `.deck-card__detail` (information hidden until hover — violates no-hover-only), large display text near card edges.
- **(c) "Digital HUB (D-HUB)" wrapped awkwardly** in the Experience list.
- **(d) ~10px mono text** throughout (kickers, deck, roster, dates) — hard to read on phones.
- **(e) Large dead vertical gaps** (10vw/22vw section padding, `min-height` sections, `aspect-ratio` deck) and uneven rhythm.
- **(f) No short human "about me" moment.**
- **(g) Gen AI / Applied AI evidence not prominent** — the RAG assistant was buried card #2 in the busy deck; Applied AI was already first in the roster but the block repeated Selected Work's domains.

Confirmed source material exists (CONTENT.md / `yousef-portfolio-content.md`): Movenue (live SaaS, founder), Personal RAG Chatbot (LangChain, ChromaDB, Groq Llama 4 Scout, FastAPI, May 2026, GitHub), Agri-Bot, FMCG pipeline, IUGRC publication, four confirmed experience roles.

---

## 3. Implementation summary (STEP 2)

Files touched:

| File | Change |
|---|---|
| `src/components/home/PortalArchive.tsx` | Rewrote everything below the byte-identical hero: statement, new about block, Selected Work (leads + index), focus areas, compact experience, calm publication, final CTA; removed drag-carousel state/handlers |
| `src/app/globals.css` | Replaced `.portal-home` non-hero styles with calm, token-driven styles; kept hero rules byte-identical; added 44px touch-target floor and ≥12px legibility floor; removed deck/hover-only/publication-matting CSS |
| `src/app/layout.tsx` | `<title>`, meta description, Open Graph + Twitter text → "AI Engineer", keeping "machine learning" searchable; no Junior/Senior |
| `src/content/site.ts` | `site.role` → "AI Engineer" |
| `src/app/opengraph-image.tsx` | `alt` → "Yousef Koura — AI Engineer"; share-card text "MACHINE LEARNING ENGINEER" → "AI ENGINEER" |
| `src/components/layout/Footer.tsx` | Footer bio aligned to "AI Engineer …" (no stale "Machine Learning Engineer"-only reference on Home) |
| `src/app/page.tsx` | Home-page comment updated to reference the new title |
| `docs/CONTENT.md` | Identity title → "AI Engineer"; Professional positioning records the role line + descriptor |
| `docs/DECISIONS.md` | New decision row #57 (2026-10-25) recording the repositioning |
| `docs/ROADMAP.md` | Phase 4A status + log entry + current-roadmap-state updated |

No new dependencies. No new pages/routes. Sitemap unchanged. Header/hero untouched. Palette locked to existing `--tk-*` tokens. Typography left provisional (Space Grotesk / Inter / JetBrains Mono via next/font — no typeface swap).

---

## 4. Section structure: before vs. after (mobile-first, below hero)

| # | Before (PortalArchive) | After (Phase 4A) |
|---|---|---|
| 1 | Statement: kicker "01 — SIGNAL / INTENT" + role line "Machine Learning Engineer" + positioning statement + ghost numeral "01" + signal schematic | Statement: role line "**AI Engineer**" + quiet descriptor "Applied AI · LLMs/RAG · Computer vision · Machine learning · Data" + unchanged positioning statement (champagne emphasis on "models, data, and decisions"). Kicker, ghost numeral, signal schematic removed |
| 2 | (none) | **About preview (NEW):** "About me" heading + 2-sentence confirmed-facts copy + "More about me" QuietLink. No portrait |
| 3 | Selected Work: kicker, h2 "PROJECT ARCHIVE.", stacked 5-card drag/arrow-keys deck + dots, hover-only details | Selected Work: quiet label "Selected work" + heading + two **calm leads** (Movenue, Personal RAG Chatbot — image, name, status, one-line summary, evidence/tech line, link) + short minimal tapable index (Agri-Bot, FMCG Intelligence, Content Opportunity Scoring) |
| 4 | Practice / Focus: 3 roster rows (strong display type) | Focus areas: single quiet line "Applied AI · Computer vision · Data engineering" (Applied AI first) |
| 5 | Experience / Selected: kicker, dates-head, hover-revealed summaries, "Digital HUB (D-HUB)" wrapping | Experience: quiet label + heading + **compact uniform rows** (timeframe + role/org + inline summary, no hover-reveal); "Digital HUB (D-HUB)" wraps at word boundaries; mobile stacks timeframe above org |
| 6 | Publication / 2024: kicker, large ghost-number, certificate, big title | Publication: quiet label + certificate image + calmer title/venue/date + "Read publication" |
| 7 | Final CTA: kicker, large h2, actions | Final CTA: kept ("LET'S MAKE THE SIGNAL USEFUL.", open-to-roles facts unchanged), harmonized rhythm/scale |

Mobile layout: single clear column throughout, fluid `clamp()` typography, `overflow:clip` on the portal container, no horizontal overflow, `svh`-based hero preserved, images lazy-loaded below the fold.

---

## 5. What was removed and why (each tied to an audit finding / skill guideline)

| Removed | Finding / guideline |
|---|---|
| "01 — SIGNAL / INTENT" kicker (and other numbered chapter kickers) | (a) heavy micro-chrome; skill: fewer labels, mono microcopy only where it carries real information |
| Ghost numeral "01" (31rem) | (a) decorative chrome; skill: fewer decorative layers |
| Signal schematic inline-SVG | "fewer decorative layers"; it was aria-hidden decorative. **Note:** this reverses the statement-section visual swap (prior user-approved decision) — flagged below for review |
| Stacked drag / arrow-keys card deck + deck-dots + deck-hint "DRAG / ARROW KEYS TO BROWSE" | (b) busy overlapping deck; (a) interaction hint; skill: no dragging-only interactions (WCAG 2.2 AA — needs single-pointer/tap alternative), no hover-only info |
| Hover-only `.deck-card__detail` and hover-revealed `.experience-summary` (font-size 0→12px on hover) | (a) no hover-only information; skill: dragging movements need tap/button alternative; nothing hover-only |
| 10px mono labels across kickers/deck/roster/dates | (d) legibility; skill: no essential text below ~12px, mono labels legible or removed — raised to ≥12px |
| Dead vertical gaps (10vw/22vw padding, min-height sections, aspect-ratio deck) | (e) uneven rhythm; skill: one consistent vertical rhythm, remove dead gaps |
| EvidenceChart on Home | Design direction: remove from Home if justified as reducing noise — justified (metrics live on the two leads' evidence lines and on the WORK detail pages); reduces client JS (Recharts) |

All confirmed project links preserved (Movenue live, RAG GitHub, Agri-Bot/FMCG/COPS GitHub or WORK detail). EvidenceChart's accessibility properties (visually-hidden data table, source traceability) are not needed on Home anymore; the full metric data remains on WORK.

---

## 6. Skill guidance applied vs. deliberate deviations

**Applied (advisory, consistent with locked constraints):**
- Minimal / editorial style, calm, few deliberate elements — applied to every section.
- Dark mode (Obedian default) with approved light mirror; no `prefers-color-scheme` reading — token system already in place; my new styles use `--tk-*` only.
- Information density & visual hierarchy — one focal point per section, quiet supporting text, removed simultaneous type styles.
- Mobile touch targets ≥44px — added `min-height:44px` to portal-action pills, index rows, lead links, portal-text-link, and Home QuietLinks; ≥8px spacing between targets.
- Reduced motion — kept the existing reduce-gated `[data-reveal]` reveal; removed continuous/decorative motion (no marquee, no hover animations, no parallax below hero); no infinite loops.
- Resilient text & compact labels — labels wrap (`overflow-wrap:break-word`), chip/text rows wrap, no clipping; labels ≥12px.
- Small label contrast — all mono labels use `tk-champagne-strong` / `tk-muted-strong` (measured AA-small per DESIGN_SYSTEM.md).
- Heading hierarchy — h1 (hero) → h2 (statement/about/selected-work/experience/close) → h3/h4 (leads, index) — sequential, no skipped levels.
- Safe areas / single column / no horizontal scroll — `overflow:clip`, responsive padding, `svh` hero preserved.
- Color not used alone — status uses a champagne dot + text; links are underlined.

**Deliberate deviations (documented):**
- **Removed the signal schematic** — contradicts the prior statement-section visual swap (a user-approved decision). Reverted to a cleaner text-only statement for "fewer decorative layers". Flagged for owner review; can be restored.
- **Did not apply the skill's generated design-system colors/typography** — palette is locked (Obsidian + Champagne), typography is Phase 5 open. The skill output was read as advice only.
- **Removed EvidenceChart from Home** — though it was a documented DECISIONS #33 pattern; justified as noise reduction and recorded here.

---

## 7. Positioning copy (exact) and proposed new copy needing owner approval

### Exact positioning copy implemented

**Role line (Home statement section):** `AI Engineer`

**Quiet supporting descriptor (beneath role line):**
> Applied AI · LLMs/RAG · Computer vision · Machine learning · Data

("Machine Learning" retained because many job postings say "AI/ML Engineer." All items trace to CONTENT.md §82 Machine Learning / AI capability areas.)

**Positioning statement (unchanged, single champagne emphasis):**
> I build the systems beneath a useful interface: <em>models, data, and decisions</em> brought into the same room.

**Metadata (layout.tsx):**
- `<title>`: `Yousef Koura — AI Engineer` (template `%s — Yousef Koura`)
- description: `AI Engineer with a Mechatronics Engineering background — applied AI, LLMs/RAG, computer vision, machine learning, and end-to-end data engineering. Currently building Movenue, a live SaaS court management and booking platform.` (keeps "machine learning" searchable; no Junior/Senior)
- Open Graph title/description and Twitter title/description mirror the above.
- `site.role` = "AI Engineer"; `og:image:alt` / `twitter:image:alt` = "Yousef Koura — AI Engineer"; share-card text "MACHINE LEARNING ENGINEER" → "AI ENGINEER".
- Footer bio aligned to the same wording.

**Focus areas (Applied AI first):** `Applied AI · Computer vision · Data engineering`

**Selected Work leads:**
- Movenue — Live · movenue.vercel.app — "Court management and booking platform — a two-sided marketplace for padel/football court owners and players in Egypt." — "Founder & Developer · Jun 2026 – Present · Live booking product hardened against concurrent double-booking."
- Personal RAG Chatbot — Completed · GitHub — "Grounded Q&A chatbot over a personal knowledge base — LangChain chunking, ChromaDB retrieval, and Groq (Llama 4 Scout) generation behind a FastAPI service." — "Developer · May 2026 · Grounded answers from a persistent vector store with tuned chunk overlap."

### Proposed new copy needing owner approval

**"About me" block (2 sentences):**
> Based in Menoufia, Egypt, I hold a B.Sc. in Mechatronics Systems Engineering and have worked on ML and AI internships spanning data, computer vision, and applied AI. I now build AI-native products — most recently Movenue, a live court management and booking platform.

All facts confirmed (Menoufia base §16; Mechatronics B.Sc. §19; ML/AI internships §40–45; building Movenue §31). No traits invented. No portrait in this block (per constraint).

---

## 8. Gen AI / Applied AI claims — "needs owner confirmation"

**None raised.** I verified every Gen AI / Applied AI statement against CONTENT.md / `yousef-portfolio-content.md` and wrote **no** unsupported claims. Specifically:
- RAG assistant describes only LangChain / ChromaDB / Groq Llama 4 Scout / FastAPI / May 2026 (CONTENT.md §33; `projects.ts`).
- Movenue describes only the live booking product / founder role (CONTENT.md §31).
- No claim of agents, fine-tuning, evaluation frameworks, LLMOps, or production LLM deployment appears anywhere.

Since no stronger unsupported Gen AI claim was written into the site, there are no "needs owner confirmation" Gen AI items to list. (If the owner later wants a stronger Gen AI claim, that would need confirmation against source material first.)

---

## 9. Flagged but not decided / open items

| Item | Status |
|---|---|
| **Signal schematic removal** — reverts the prior statement-section visual swap (user-approved). I removed it for "fewer decorative layers". | Flagged for owner review; restorable if desired |
| **About-me wording** — 2 sentences above | Presented for owner approval |
| **Footer bio** — aligned to "AI Engineer ..." on the shared Footer (renders on all pages) | Text-only consistency change; flagged since Footer is shared |
| **Visual breakpoint / contrast / touch-target verification at 320/375/390/430/768/1024/1440 in both themes** | Not performable in this session (no image read-back available; dev server could not be reliably launched). Verified instead via rendered HTML structure, token-based AA-compliant theming, and fluid `clamp()` typography. Recommended for owner/QA sign-off |
| **Resume destination URL** — remains open globally (pre-existing) | Unchanged; not resolved silently |
| **Typography** — Phase 5 open decision | Left provisional; no typeface swapped; if the skill's guidance argues for a change, recorded here as a proposal, not implemented |

Everything flagged was explicitly called out rather than silently resolved, per AGENTS.md.

---

## 10. Verification evidence (STEP 3)

| Check | Result |
|---|---|
| Production build (`next build`) | PASS — 20 static/SSG routes, including `/` |
| `tsc --noEmit` | PASS — exit 0 |
| ESLint | PASS — exit 0 (only the pre-existing unrelated `opengraph-image.tsx` `` LCP warning) |
| Header/hero unchanged | Verified by code — `portal-hero` block and all `portal-stage`/`portal-portrait-frame`/`portal-title` rules are byte-identical in `PortalArchive.tsx` and `globals.css` |
| Metadata | Verified in prerendered `.next/server/app/index.html`: `<title>`, description, og:title/description, twitter title/description all "AI Engineer" + "machine learning" retained; `og:image:alt`/`twitter:image:alt` = "Yousef Koura — AI Engineer"; OG image regenerated (new content hash) |
| No stale "Machine Learning Engineer"-only reference on Home | Confirmed — remaining source occurrences are on unrelated pages (/contact, /about) and the dormant unmounted `Hero.tsx`, all out of scope; the hero's aria-label ("machine learning engineer") is inside the preserved hero and was intentionally left untouched |
| Touch targets ≥44px | `min-height:44px` applied to portal-action, portal-index-item, portal-lead__link, portal-lead__status a, portal-text-link, Home QuietLinks (`portal-ql`) |
| Minimum font size | No essential text below ~12px; mono labels raised to 12px; body ~14–16px |
| Text reflow | Single column, `overflow-wrap:break-word`, fluid `clamp()`, flex-wrap; no fixed-width clipping |
| Contrast | All text uses measured AA-compliant tokens (`tk-ink`, `tk-muted-strong`, `tk-champagne-strong`, `tk-champagne`/`tk-on-accent`) per DESIGN_SYSTEM.md |
| Motion | reduce-gated `[data-reveal]` only; no continuous/decorative/hover-only motion below hero; `prefers-reduced-motion` respected |
| No horizontal overflow | `overflow:clip` on container; single column; responsive widths |
| Images | lazy-loaded below the fold (`loading="lazy"`), `sizes` attributes, hero portrait `eager`/`fetchPriority="high"` preserved |
| Keyboard / semantics | Semantic headings (h1→h6 sequential), links are real `<a>`/`<Link>`, buttons are real buttons, `aria-label`/`sr-only` preserved, focus outlines tokenized (`--tk-champagne`) |
| Scroll-spy / theme / footer / nav | Unchanged shared components; IDs `#work/#about/#experience/#publications/#contact` preserved for nav highlighting |

---

## 11. "Two paths (career vs. builder)" section — NOT built

**Explicitly confirmed:** The "two paths / career vs. builder" section was **not built**. No new page or route was created. The sitemap was not changed.

**Structural consideration for adding it later:** The Home page now ends with the Final CTA (`#contact`). A future "two paths" section can be inserted as a new `SectionFrame`-styled section between Publication and Final CTA (or after Experience), using the same `max-w-6xl` container, `border-t border-line` wayfinding label, and `data-reveal` reveal pattern already established. The `scroll-mt-24` heading offset and the existing section IDs keep scroll-spy nav highlighting compatible. No structural refactor would be required — the page is open to adding that section as a later milestone.

---

## 12. Open items / follow-ups

1. Owner visual/UX sign-off of the re-composed Home (breakpoints 320/375/390/430/768/1024/1440, both themes, landscape phone) — could not be performed with image read-back in this session.
2. Owner approval of the about-me wording and the signal-schematic removal.
3. Resume destination URL remains open (pre-existing; not resolved silently).
4. Typography finalization remains Phase 5 (open; not implemented here).
5. Re-run Lighthouse / mobile performance (throttled) post-deploy as a manual step (pre-existing Phase 14/15 item).

---

## 13. Constraint compliance checklist

| Constraint | Status |
|---|---|
| Header & hero byte-identical | YES |
| Palette locked (Obsidian + Champagne, `--tk-*` only) | YES |
| No new hex / accent colors | YES |
| Dark default, never `prefers-color-scheme` | YES |
| Skill advisory only (no override) | YES |
| Typography not finalized/swapped | YES |
| Reused existing primitives | YES |
| No new dependencies | YES |
| No invented facts / metrics / projects | YES (all from CONTENT.md) |
| No "Junior"/"Senior" added | YES |
| "Movenue" name (not Yalla7gez) | YES |
| "Two paths" section not built | YES |
| No new page / route / sitemap change | YES |
| WCAG AA contrast, 44px touch, reduced motion, no hover-only, semantic headings | YES |
| Build / tsc / lint clean | YES |
