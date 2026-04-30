---
name: polish-ui
description: Improves or recreates existing UI using the repository design system document as the single source of truth. Use when the user asks to polish, clean up, modernize, or visually improve a page, screen, component, or flow, or to recreate a page to match the design system—without changing product behavior unless they ask.
---

# Polish UI

## Preconditions

1. **Design system required**  
   Read `docs/design/design-system.md` **before** editing UI.  
   If that file does **not** exist: **stop**. Tell the user the design-system document is required for this skill and they should add it first.

2. **Target**  
   Identify the page, screen, component, or flow to polish. Inspect the current implementation (markup, styles, shared components, layout) before changing code.

## Principles

- **Source of truth:** All visual and pattern decisions align with `docs/design/design-system.md`.
- **Preserve behavior:** Keep existing product behavior, data flow, routes, permissions, and business logic unless the user explicitly requests behavior changes.
- **Reuse first:** Prefer existing components, tokens, styles, and patterns from the codebase and design system.
- **Scope:** Limit edits to the chosen page, screen, component, or flow. No unrelated redesigns or a new visual direction.
- **No new UI libraries** unless the user explicitly approves adding one.
- **Do not change** backend logic, data models, API contracts, routing structure, or authentication unless explicitly requested.

## What to improve

When polishing or lightly recreating UI, improve where the design system supports it:

- Visual hierarchy, layout, spacing, typography, alignment, component consistency  
- Responsive behavior at common mobile and desktop widths  
- Interaction and feedback states: loading, empty, error, disabled, hover, focus, active (where relevant)  
- Accessibility basics: labels, focus visibility, keyboard use, contrast, accessible names for icon-only controls  

## Recreating a page (layout / presentation)

Keep the same functional purpose, core user actions, and required content and data. Restructure layout only when it improves clarity, usability, or design-system consistency. Replace inconsistent local styling with design-system-aligned components or patterns. Remove visual clutter when it is safe. Stay responsive and accessible as above.

## Vague requests

Pick the **smallest** relevant page, screen, component, or flow. Do **not** redesign the whole application. Ask **one short** clarification question only if the target UI cannot be identified.

## Before finishing

1. Re-check the result against `docs/design/design-system.md`.  
2. Confirm behavior: preserved, or list explicit behavior changes.  
3. Confirm scope: no unrelated files changed.  
4. Where practical: responsive layout and basic accessibility states.

**Closing summary for the user**

- What was polished or recreated.  
- Any behavior changes, or an explicit statement that behavior was preserved.  
- Follow-ups intentionally left out of scope.

## Failure and edge cases

| Situation | Action |
|-----------|--------|
| `docs/design/design-system.md` missing | Abort; user must create it first. |
| Target UI unclear | Ask which page, screen, component, or flow to polish (one short question). |
| Implementation not found | Say so; ask for file path, route, or component name. |
| Design system compliance would need behavior or architecture changes | Stop; ask before proceeding. |
| Design system guidance ambiguous | Make the smallest conservative UI improvement; explain the ambiguity. |
