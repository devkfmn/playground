---
name: code-review
description: Technical code review checklist. Standard flow delegates code-review-agent first; use /code-review for ad-hoc checklist without a subagent if needed.
disable-model-invocation: true
---

# Code review

## Standard workflow

After **builder-agent** opens a PR, the single prescribed step is to delegate **[code-review-agent](@.cursor/agents/code-review-agent.md)**, then **ui-review-agent** (or **UI N/A**). Use this skill only when you need the same checklist inline without delegating that subagent.

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
