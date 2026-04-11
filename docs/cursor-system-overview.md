# Cursor System Overview

**Canonical paths and diagrams:** [cursor-operating-model-architecture.md](cursor-operating-model-architecture.md) (maps this overview to `.cursor/` files and real hook events). **Doc index:** [cursor_sources.md](cursor_sources.md). **Root workflow:** [AGENTS.md](../AGENTS.md).

This document defines all required Rules, Skills, Subagents, and Hooks for the project.

Each entry describes a file that must be created and refined.

---

## RULES (Global Policy Layer)

### AGENTS.md
Defines the global workflow: issue-first development, mandatory planning, dev-only changes, automated review loop, and human testing on dev before promoting to main.

### rules/ui-system.md
Defines the complete UI design system including tokens, layout, components, states, and consistency rules.

### rules/architecture.md
Defines architectural constraints, folder structure, naming conventions, and allowed patterns.

### rules/git-workflow.md
Defines branching strategy, PR requirements, and rules for merging into dev and promoting to main.

---

## SKILLS (Reusable Procedures)

### skills/plan-from-issue.md
Creates a detailed, structured implementation plan based on a GitHub issue.

### skills/implement-from-plan.md
Implements a feature strictly following an approved implementation plan.

### skills/code-review.md
Reviews code for correctness, edge cases, regressions, and adherence to architecture rules.

### skills/ui-review.md
Reviews UI for consistency with the design system, including layout, spacing, responsiveness, and states.

### skills/fix-from-review.md
Applies fixes based on structured review findings until all blocking issues are resolved.

### skills/release-readiness.md
Validates that a feature is ready to be promoted from dev to main.

---

## SUBAGENTS (Specialized Roles)

### subagents/builder-agent.md
Implements features, manages branches, and creates or updates PRs based on approved plans.

### subagents/code-review-agent.md
Evaluates PRs for technical correctness, architectural compliance, and potential risks.

### subagents/ui-review-agent.md
Evaluates UI changes for design system compliance and visual consistency.

---

## HOOKS (Automation & Enforcement)

### hooks/pre-implementation-check
Ensures that implementation cannot start without an approved plan and linked issue.

### hooks/post-implementation-check
Runs linting, build, and tests to validate basic correctness after implementation.

### hooks/pr-open-trigger
Triggers code review and UI review agents when a PR is created or updated.

### hooks/review-gate
Blocks progression if any review agent reports blocking issues.

### hooks/review-fix-loop
Automatically re-invokes the builder agent to fix issues until all review checks pass.

---

## SYSTEM FLOW (REFERENCE)

Issue → Plan → Build → Auto Review → Fix Loop → Dev → Human Test → Main