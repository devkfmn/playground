---
name: code-review
description: Technical code review for correctness, regressions, and architecture fit. Invoke via /code-review on a PR, branch, or described change set.
disable-model-invocation: true
---

# Code review

## When to use

- Before merging a PR to `dev`, or when validating a completed implementation.

## Checklist

1. **Correctness** — logic errors, edge cases, error handling.
2. **Architecture** — matches [.cursor/rules/architecture.mdc](@.cursor/rules/architecture.mdc).
3. **Scope** — no unrelated drive-by refactors unless justified.
4. **Verification** — author ran [package.json](@package.json) scripts (`npm run build`); note gaps.
5. **Security basics** — no secrets in code; sensible inputs if user-facing.

## Output format

- **Summary** — a few sentences.
- **Findings** — severity: `suggestion` | `important` | `blocking`.
- If anything is blocking merge, add a single line anywhere in the review body: **`[[BLOCKING]]`** (hooks and fix loop key off this when subagents return summaries).

## Isolation

- For deep passes, delegate to [code-review-agent](@.cursor/agents/code-review-agent.md) and fold its summary into your final note.
