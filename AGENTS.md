# Project Instructions

Operating flow: **Issue → Plan → Build → Auto review → Fix loop → integrate on `dev` → human test → promote to `main`.** Details: [docs/cursor-system-overview.md](docs/cursor-system-overview.md) and [docs/cursor-operating-model-architecture.md](docs/cursor-operating-model-architecture.md). Cursor product behavior (Plan Mode, [subagents](https://cursor.com/docs/subagents), [hooks](https://cursor.com/docs/hooks), [cloud agent](https://cursor.com/docs/cloud-agent)) is summarized against official docs in [docs/cursor_sources.md](docs/cursor_sources.md).

## Branch policy (strict)

Subagents, cloud agents, and any automated actor in this workflow must:

- Work only on a **feature branch**; **commit and push only that branch** to the remote.
- Open pull requests with **`gh pr create --base dev`** (or equivalent). **Never** use `--base main`.
- **Never** push, merge, or commit directly to **`dev`** or **`main`**. Integration onto `dev` is a **human** merge of the PR.

**`main`** is off limits for agents: no PRs to `main`, no pushes to `main`, no agent-driven merges into `main`. Moving work from `dev` to `main` is **human-only** after [release-readiness](.cursor/skills/release-readiness/SKILL.md).

## Single path (how to work)

1. **Issue** — Tie work to a GitHub issue ([.github/ISSUE_TEMPLATE/feature-bug-chore.yml](.github/ISSUE_TEMPLATE/feature-bug-chore.yml)). Keep the issue number in prompts, plan, and PR body.
2. **Plan** — Turn on [Plan mode](https://cursor.com/docs/agent/plan-mode). Run **`/plan-from-issue`** once and get the plan accepted before any implementation.
3. **Build** — Delegate **`builder-agent`** with the handoff checklist in [.cursor/agents/builder-agent.md](.cursor/agents/builder-agent.md) (issue, approved plan, acceptance criteria). The builder creates the feature branch, implements, runs **`npm run build`**, pushes the branch, and opens the PR to **`dev`**.
4. **Auto review** — In order: delegate **`code-review-agent`**, then **`ui-review-agent`**, unless the change touches **no** UI-relevant files under `src/` (see [.cursor/agents/ui-review-agent.md](.cursor/agents/ui-review-agent.md)); if UI N/A, skip `ui-review-agent` and state that in the thread.
5. **Fix loop** — If any review includes **`[[BLOCKING]]`**, run **`/fix-from-review`**, then delegate **`builder-agent`** again on the **same** feature branch. Re-run **code-review-agent** and **ui-review-agent** (with the same UI N/A rule) until there is no blocking.
6. **Dev** — **Human** merges the PR into **`dev`** on GitHub.
7. **Human test** — Validate acceptance criteria on **`dev`** (deployed, preview, or local checkout).
8. **Main** — Run **`/release-readiness`**, then **human** promotes **`dev` → `main`** only.

## Rules and automation

- **Rules:** [.cursor/rules/git-workflow.mdc](.cursor/rules/git-workflow.mdc), [.cursor/rules/architecture.mdc](.cursor/rules/architecture.mdc), [.cursor/rules/ui-system.mdc](.cursor/rules/ui-system.mdc) when applicable.
- **Hooks:** [.cursor/hooks.json](.cursor/hooks.json) — optional strict plan gate via `CURSOR_STRICT_PLAN_GATE=1`, post-edit **`npm run build`** when `src/` changed, shell policy for PR base and risky `git push`, subagent follow-up on **`[[BLOCKING]]`**. See the architecture doc for the wiring table.

## Verification

- Use only scripts defined in [package.json](package.json). Today that is **`npm run build`** after substantive app changes.
- Do not invent `lint`, `typecheck`, or `test` until those scripts exist.

## Maintenance

- Repo setup and inventory: [docs/project_init.md](docs/project_init.md).
- Cursor doc index: [docs/cursor_sources.md](docs/cursor_sources.md).
