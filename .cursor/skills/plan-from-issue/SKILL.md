---
name: plan-from-issue
description: Produce a structured implementation plan from a GitHub issue. Invoke via /plan-from-issue when starting feature, bug, or chore work tied to an issue.
disable-model-invocation: true
---

# Plan from issue

## When to use

- You have (or will create) a GitHub issue and need a concrete plan before coding.
- Use with [AGENTS.md](@AGENTS.md): turn on [Plan mode](https://cursor.com/docs/agent/plan-mode), then run this skill.

## Inputs

- Issue link or number, or pasted issue body.
- Optional constraints (deadline, out of scope).

## Output structure

1. **Goal** — one paragraph tied to the issue.
2. **Acceptance criteria** — checklist mapped to issue items.
3. **Technical approach** — files to touch, routes/components if UI, data flow if any.
4. **Verification** — only commands from [package.json](@package.json) (e.g. `npm run build`).
5. **Risks / open questions** — short list.

## References

- Issue template: [.github/ISSUE_TEMPLATE/feature-bug-chore.yml](@.github/ISSUE_TEMPLATE/feature-bug-chore.yml)
- Architecture: [.cursor/rules/architecture.mdc](@.cursor/rules/architecture.mdc)

After the plan is accepted, the **Build** step is **only** via **builder-agent** (see [.cursor/agents/builder-agent.md](@.cursor/agents/builder-agent.md)): hand off issue, plan, and branch naming as described there.
