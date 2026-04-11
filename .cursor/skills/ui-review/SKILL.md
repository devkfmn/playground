---
name: ui-review
description: Review UI changes for design-system and layout consistency. Invoke via /ui-review when src UI files changed.
disable-model-invocation: true
---

# UI review

## When to use

- Pull requests or changes touching [ui-system.mdc](@.cursor/rules/ui-system.mdc) globs (`src/**/*.{js,jsx,css}`).

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

## Isolation

- Delegate to [ui-review-agent](@.cursor/agents/ui-review-agent.md) for a focused pass when helpful.
