# Project Instructions

Operating flow: **Issue → Plan → Build → Auto review → Fix loop → integrate on `dev` → human test → promote to `main`.** Details: [docs/cursor-system-overview.md](docs/cursor-system-overview.md) and [docs/cursor-operating-model-architecture.md](docs/cursor-operating-model-architecture.md).

## Branch policy (strict)

- **All agent-created pull requests must target `dev`** (e.g. `gh pr create --base dev`). Integration and review happen on `dev`.
- **`main` is off limits for agents:** do not open PRs with `--base main`, do not push or merge to `main`, and do not perform release merges as part of feature work. Moving work from `dev` to `main` is a **human-only** step after [release-readiness](.cursor/skills/release-readiness/SKILL.md).

## How to work

1. **Issue-first:** tie work to a GitHub issue when one exists ([.github/ISSUE_TEMPLATE/feature-bug-chore.yml](.github/ISSUE_TEMPLATE/feature-bug-chore.yml)).
2. **Planning:** use Plan Mode for non-trivial or multi-file work ([Plan mode](https://cursor.com/docs/agent/plan-mode)). Produce an explicit plan before large implementations.
3. **Skills (invoke with `/` in Agent):** `plan-from-issue` → `implement-from-plan` → optional `code-review` / `ui-review` → `fix-from-review` → humans use `release-readiness` before promotion.
4. **Subagents (`.cursor/agents/`):** delegate to `builder-agent` for implementation and PRs to `dev`; use `code-review-agent` and `ui-review-agent` for isolated reviews. Review output may include `[[BLOCKING]]` to drive the fix loop (see hooks below).
5. **Rules:** follow [.cursor/rules/git-workflow.mdc](.cursor/rules/git-workflow.mdc), [.cursor/rules/architecture.mdc](.cursor/rules/architecture.mdc), and [.cursor/rules/ui-system.mdc](.cursor/rules/ui-system.mdc) when applicable.
6. **Hooks:** [.cursor/hooks.json](.cursor/hooks.json) runs small checks (plan gate optional via `CURSOR_STRICT_PLAN_GATE=1`, post-edit `npm run build` when `src/` changed, PR base `dev`, subagent follow-up). See the architecture doc for the wiring table.

## Verification

- Use only scripts defined in [package.json](package.json). Today that is **`npm run build`** after substantive app changes.
- Do not invent `lint`, `typecheck`, or `test` until those scripts exist.

## Maintenance

- Repo setup and inventory: [docs/project_init.md](docs/project_init.md).
- Cursor doc index: [docs/cursor_sources.md](docs/cursor_sources.md).
