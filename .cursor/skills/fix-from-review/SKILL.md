---
name: fix-from-review
description: Apply fixes from structured review findings until blocking items are resolved. Invoke via /fix-from-review after code-review or ui-review.
disable-model-invocation: true
---

# Fix from review

## When to use

- Review output lists concrete issues, especially when **`[[BLOCKING]]`** was used or severity is `blocking` / `important`.

## Steps

1. List blocking and important items; ignore suggestions unless quick wins.
2. Fix root causes; avoid expanding scope beyond the review.
3. Re-run **`npm run build`** ([package.json](@package.json)).
4. Summarize what changed and re-request review if needed (`/code-review`, `/ui-review`, or subagents).

## References

- Architecture: [.cursor/rules/architecture.mdc](@.cursor/rules/architecture.mdc)
- UI: [.cursor/rules/ui-system.mdc](@.cursor/rules/ui-system.mdc)
- Git: [.cursor/rules/git-workflow.mdc](@.cursor/rules/git-workflow.mdc) — keep PRs targeting **`dev`**.

## Loop

- Repeat until no blocking findings remain or the user accepts residual risk explicitly.
