---
name: release-readiness
description: Human-facing checklist before promoting dev to main. Invoke via /release-readiness; agents do not merge to main.
disable-model-invocation: true
---

# Release readiness

## When to use

- **Humans** preparing to promote **`dev` → `main`** after feature work has integrated on `dev`.
- Not for opening feature PRs (those always go to **`dev`** per [git-workflow.mdc](@.cursor/rules/git-workflow.mdc) and [AGENTS.md](@AGENTS.md)).

## Checklist

- [ ] `dev` contains the intended commits and has been tested (human QA as required by [AGENTS.md](@AGENTS.md)).
- [ ] CI / `npm run build` (and any future scripts) are green for the merge path you use.
- [ ] Release notes / changelog updated if the team tracks them.
- [ ] No known blocking defects for this release slice.
- [ ] Promotion PR or merge is executed by a **human** with appropriate rights—not delegated as “finish the release” to the builder agent.

## References

- [docs/project_init.md](@docs/project_init.md) for repo scripts and setup.
- [docs/cursor-operating-model-architecture.md](@docs/cursor-operating-model-architecture.md) for full flow context.
