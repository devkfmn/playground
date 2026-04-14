# Cursor System Overview

**Canonical paths and diagrams:** [cursor-operating-model-architecture.md](cursor-operating-model-architecture.md) (maps this overview to `.cursor/` files and real hook events). **Doc index:** [cursor_sources.md](cursor_sources.md) (includes [Cloud agent](https://cursor.com/docs/cloud-agent)). **Root workflow:** [AGENTS.md](../AGENTS.md).

This document defines all required Rules, Skills, Subagents, and Hooks for the project.

Each entry describes a file that must be created and refined.

---

## RULES (Global Policy Layer)

### AGENTS.md
Defines the global workflow: issue-first development, mandatory planning, feature-branch-only work for automated agents, PRs to `dev`, automated review loop, human merge to `dev`, human testing, and human promotion to `main`.

### rules/ui-system.md
Defines the complete UI design system including tokens, layout, components, states, and consistency rules.

### rules/architecture.md
Defines architectural constraints, folder structure, naming conventions, and allowed patterns.

### rules/git-workflow.md
Defines branching strategy, PR requirements, forbidden direct pushes to `dev`/`main` by automated agents, and rules for merging into dev and promoting to main.

---

## SKILLS (Reusable Procedures)

Repo layout: [.cursor/skills/&lt;name&gt;/SKILL.md](../.cursor/skills/).

### skills/plan-from-issue
Creates a detailed, structured implementation plan based on a GitHub issue.

### skills/code-review
Checklist for technical review; the **standard flow** delegates **code-review-agent** instead (see Subagents).

### skills/ui-review
Checklist for UI review; the **standard flow** delegates **ui-review-agent** instead (see Subagents).

### skills/fix-from-review
Applies fixes based on structured review findings until all blocking issues are resolved (then re-run review subagents per [AGENTS.md](../AGENTS.md)).

### skills/release-readiness
Validates that a feature is ready to be promoted from dev to main.

---

## SUBAGENTS (Specialized Roles)

Paths: [.cursor/agents/*.md](../.cursor/agents/).

### subagents/builder-agent.md
Implements features on a feature branch from an approved plan; pushes that branch only; opens or updates PRs targeting **`dev`**.

### subagents/code-review-agent.md
First pass of auto review: technical correctness, architectural compliance, and risks.

### subagents/ui-review-agent.md
Second pass of auto review: design system and UI consistency (skipped when no UI-relevant `src/` changes per agent instructions).

---

## HOOKS (Automation & Enforcement)

### hooks/pre-implementation-check
Optional strict gate: implementation-like prompts may require a linked issue or plan marker when `CURSOR_STRICT_PLAN_GATE=1`.

### hooks/post-implementation-check
After edits under `src/`, marks dirty; on agent stop, runs **`npm run build`** when appropriate.

### hooks/pr-open-trigger (+ branch policy)
`beforeShellExecution`: enforces **`gh pr create --base dev`** and blocks risky **`git push`** patterns (including to **`main`** and **`dev`**).

### hooks/review-gate
`subagentStart`: reserved for future gating; v1 logs only.

### hooks/review-fix-loop
`subagentStop`: if a review summary contains **`[[BLOCKING]]`**, suggests **`/fix-from-review`**, **builder-agent**, and re-running the review subagents.

---

## SYSTEM FLOW (REFERENCE)

Issue → Plan → Build (builder-agent) → Auto Review (code-review-agent → ui-review-agent, with documented UI N/A skip) → Fix Loop → Dev (human merge PR) → Human Test → Main (human promotion)
