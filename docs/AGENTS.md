# AGENTS.md — Working Instructions for AI Agents

## Mandatory reading order before any work

1. Read [PROJECT.md](./PROJECT.md) first — project purpose, phase, principles, scope.
2. Read [TECH_STACK.md](./TECH_STACK.md) before making technical decisions.
3. Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) before making visual decisions.
4. Read [CONTENT.md](./CONTENT.md) before writing portfolio content.
5. Read [DECISIONS.md](./DECISIONS.md) before changing an established decision.
6. Inspect existing code before modifying it — never overwrite work you do not understand.

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

Content conflicts previously flagged between the resume, LinkedIn, and the old site have been **resolved** using resume-authoritative values (see [CONTENT.md](./CONTENT.md)). Do not re-open them unless the source files reveal a genuine contradiction. Remaining content decisions — which old-site-only projects to include, whether to present military service as an experience entry, and the final positioning statement — are user decisions; flag them, do not decide silently.

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

## Phase discipline

Do NOT skip ahead. The project proceeds in defined phases (see [PROJECT.md](./PROJECT.md)):

1. FOUNDATION — completed
2. INFORMATION ARCHITECTURE + VISUAL IDENTITY — in progress
3. DETAILED UX / PAGE ARCHITECTURE + WIREFRAME PLANNING — next
4. INTERACTION SYSTEM
5. UI SYSTEM
6. IMPLEMENTATION
7. VALIDATION

If a task implies skipping a phase (e.g., jumping to implementation before sitemap/wireframe/identity decisions), stop and flag it.
