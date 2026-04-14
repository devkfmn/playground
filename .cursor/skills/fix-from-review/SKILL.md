---
name: fix-from-review
description: Apply fixes from structured review findings until blocking items are resolved. Invoke via /fix-from-review after review subagents report issues.
disable-model-invocation: true
---

# Fix from review

## When to use

- Review output lists concrete issues, especially when **`[[BLOCKING]]`** was used or severity is `blocking` / `important`.

## Steps

1. List blocking and important items; ignore suggestions unless quick wins.
2. Delegate **builder-agent** to apply fixes on the **same feature branch** (no new scope); the builder pushes the branch and updates the existing PR to **`dev`**.
3. Re-run **`npm run build`** ([package.json](@package.json)) after edits if you touch the app.
4. Re-run auto review in order: **code-review-agent**, then **ui-review-agent** (or **UI N/A** per [.cursor/agents/ui-review-agent.md](@.cursor/agents/ui-review-agent.md)).

## References

- Architecture: [.cursor/rules/architecture.mdc](@.cursor/rules/architecture.mdc)
- UI: [.cursor/rules/ui-system.mdc](@.cursor/rules/ui-system.mdc)
- Git: [.cursor/rules/git-workflow.mdc](@.cursor/rules/git-workflow.mdc) — feature branch only; PR targets **`dev`**.

## Loop

- Repeat until no blocking findings remain or the user accepts residual risk explicitly.
