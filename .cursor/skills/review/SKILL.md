---
name: review
description: Delegate combined code and UI review to review-clanker. Use when the user types `/review` after local feature review (/build-and-run).
disable-model-invocation: true
---

# Review

Use this skill only to delegate **[review-clanker](@.cursor/agents/review-clanker.md)**.

## Steps

1. Identify the current local branch or diff and the latest accepted plan if it is available.
2. Delegate **`review-clanker`** instead of doing an inline checklist review.
3. Keep the review scoped to the current branch or diff.
4. If the review returns **`[[BLOCKING]]`**, tell the user to click **Build** on the accepted plan again, then re-run **`/build-and-run`** and **`/review`**.

## Notes

- Do **not** replace the subagent with a manual prose checklist unless delegation is impossible.
- **`review-clanker`** emits **`UI: N/A`** in the UI section when no `src/**/*.{js,jsx,css}` files changed.
