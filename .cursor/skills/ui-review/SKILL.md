---
name: ui-review
description: UI review checklist. Standard flow delegates ui-review-agent after code-review-agent; use /ui-review for ad-hoc checklist without a subagent if needed.
disable-model-invocation: true
---

# UI review

## Standard workflow

**code-review-agent** runs first. If the change touches **`src/**/*.{js,jsx,css}`**, delegate **[ui-review-agent](@.cursor/agents/ui-review-agent.md)** next; otherwise record **UI N/A** and skip. Use this skill only when you need the same checklist inline without delegating that subagent.

## Checklist

1. **Layout** — sidebar, main, page structure consistent with [src/App.jsx](@src/App.jsx).
2. **Styles** — reuse patterns from [src/index.css](@src/index.css) and existing pages.
3. **Components** — readable JSX; sensible defaults for labels and navigation.
4. **States** — if applicable, loading/empty/error presentation is coherent.
5. **Responsive** — no obvious breakage at narrow widths.

## Output format

- **Summary** — short.
- **Findings** — severity: `suggestion` | `important` | `blocking`.
- Use **`[[BLOCKING]]`** in the body if the UI should not merge until fixed.
