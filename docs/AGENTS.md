# AGENTS.md — Working Instructions for AI Agents

## Mandatory reading order before any work

1. Read [ROADMAP.md](./ROADMAP.md) first — current phase, progress, next required task, blockers.
2. Read [PROJECT.md](./PROJECT.md) — project purpose, phase, principles, scope.
3. Read [TECH_STACK.md](./TECH_STACK.md) before making technical decisions.
4. Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) before making visual decisions.
5. Read [CONTENT.md](./CONTENT.md) before writing portfolio content.
6. Read [DECISIONS.md](./DECISIONS.md) before changing an established decision.
7. Inspect existing code before modifying it — never overwrite work you do not understand.

## Non-negotiable rules

1. Never invent personal information — no fabricated projects, facts, achievements, technologies, dates, metrics, or experience.
2. Never overwrite existing work without understanding it first.
3. Prefer simple, maintainable solutions.
4. Avoid unnecessary dependencies.
5. Avoid overengineering.
6. Preserve responsive behavior.
7. Consider accessibility.
8. Consider performance.
9. Test changes before declaring them complete.
10. Keep documentation synchronized with important architectural decisions.

## Source of truth

**SOURCE OF TRUTH:**
User-provided information > project documentation > existing implementation > reasonable inference.

If information is missing, flag it instead of inventing it.

## Content integrity

- Distinguish clearly between:
  - **Confirmed facts** — from user-provided documents (resume, LinkedIn, content file)
  - **Decisions** — recorded in [DECISIONS.md](./DECISIONS.md)
  - **Assumptions** — reasonable inferences, must be labeled as such
  - **Proposals** — ideas, not decisions, must not be treated as final
  - **Unresolved questions** — flag these explicitly, never silently resolve them
- Do not treat proposals as decisions.
- Real project evidence must remain real. AI-generated imagery must never be presented as real project evidence.
- No unsupported claims in copy or UI.

## Content conflicts

Content conflicts previously flagged between the resume, LinkedIn, and the old site have been **resolved** using resume-authoritative values (see [CONTENT.md](./CONTENT.md)). Do not re-open them unless the source files reveal a genuine contradiction. Remaining content decisions — which old-site-only projects to include and whether to present military service as an experience entry — are user decisions; flag them, do not decide silently.

## Git commit convention

Only create a commit when the user explicitly asks for a commit. Never commit automatically after completing a task unless explicitly requested.

Commit format: `<type>: <short imperative description>`

Allowed types:

- `feat:` — new functionality or feature
- `fix:` — bug fix or correction
- `design:` — visual/UI/design changes
- `refactor:` — code restructuring without behavior change
- `perf:` — performance improvement
- `docs:` — documentation-only changes
- `chore:` — maintenance, configuration, dependencies, tooling
- `test:` — tests or testing changes
- `content:` — portfolio content changes
- `deploy:` — deployment/configuration changes

Rules:

1. Before committing, inspect git status and the changed files.
2. Review the diff before committing.
3. Do not include unrelated changes in the commit.
4. Keep the commit message concise and specific.
5. Use lowercase type prefixes exactly as defined above.
6. Use imperative language after the colon.
7. Do not end the commit subject with a period.
8. Do not use generic messages (e.g., "update files", "changes", "final changes", "fix stuff", "work done").
9. If changes contain multiple related modifications, choose the type that best represents the primary purpose.
10. If the user explicitly provides a commit message, follow it unless it violates the format above.
11. After committing, report: commit hash, commit message, files/area included, and confirmation that the working tree was checked.

Because this is a portfolio project, `content:` and `design:` are particularly useful — let the Git history tell a clean story.

## Roadmap workflow

**ROADMAP.md is the primary navigation document for project progress.** Follow this workflow on every task.

### Before every task

1. Read [ROADMAP.md](./ROADMAP.md).
2. Identify the current phase.
3. Check which tasks are completed.
4. Check the next required task.
5. Read the relevant project documentation.
6. Do not skip ahead to a later phase without explicit user approval.

### During the task

- Work only within the current approved phase unless the user explicitly changes scope.
- If a decision affects a future phase, document it appropriately.
- Do not silently change completed decisions.
- If a blocker appears, mark the relevant phase **BLOCKED** in ROADMAP.md and explain why.

### After every task

1. Update docs/ROADMAP.md.
2. Update phase status.
3. Mark completed tasks.
4. Record remaining tasks.
5. Record blockers if any.
6. Update relevant documentation files.
7. Ensure ROADMAP.md agrees with PROJECT.md and DECISIONS.md.

## Phase discipline

Do NOT skip ahead. The project proceeds in defined phases (see [ROADMAP.md](./ROADMAP.md)):

0. PROJECT INITIALIZATION — completed
1. FOUNDATION / DISCOVERY — completed
2. INFORMATION ARCHITECTURE + VISUAL IDENTITY — completed
3. UX / PAGE ARCHITECTURE — completed
4. WIREFRAMES + VISUAL COMPOSITION
4A. HOME PAGE (user-directed implementation milestone) — in progress
5. BRAND SYSTEM
6. COMPONENT / DESIGN SYSTEM ARCHITECTURE
7. APPLICATION INITIALIZATION
8. CORE UI IMPLEMENTATION
9. HOMEPAGE IMPLEMENTATION
10. WORK / PROJECTS
11. ABOUT / EXPERIENCE / PUBLICATIONS / CONTACT
12. MOTION + 3D POLISH
13. CONTENT + ASSET INTEGRATION
14. QUALITY / ACCESSIBILITY / PERFORMANCE
15. DEPLOYMENT
16. FINAL REVIEW

If a task implies skipping a phase (e.g., jumping to implementation before sitemap/wireframe/identity decisions), stop and flag it.

This list is a coarse map only. [ROADMAP.md](./ROADMAP.md) is the authoritative source for granular phase status — do not rely on this list being kept in lockstep with it manually; check ROADMAP.md before every task.
