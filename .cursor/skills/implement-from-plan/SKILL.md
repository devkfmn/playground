---
name: implement-from-plan
description: Implement a feature strictly per an approved plan. Invoke via /implement-from-plan after plan sign-off.
disable-model-invocation: true
---

# Implement from plan

## When to use

- An implementation plan exists and is agreed (from `/plan-from-issue` or equivalent).

## Rules to follow

- [architecture.mdc](@.cursor/rules/architecture.mdc) — layout, files, patterns.
- [ui-system.mdc](@.cursor/rules/ui-system.mdc) — UI when editing `src/**/*.{js,jsx,css}`.
- [git-workflow.mdc](@.cursor/rules/git-workflow.mdc) — **open PRs only against `dev`** (`gh pr create --base dev`). Do not target `main`.

## Steps

1. Re-read the plan and keep scope aligned with acceptance criteria.
2. Implement in small steps; prefer matching existing code style in the repo.
3. Run **`npm run build`** before considering work done (see [package.json](@package.json)).
4. Open or update a PR to **`dev`**; describe what changed and how you verified.

## Delegation

- For larger implementation batches, the parent agent may delegate to [builder-agent](@.cursor/agents/builder-agent.md) while preserving the plan as source of truth.
