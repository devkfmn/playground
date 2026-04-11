# Project Init

## Purpose

Setup and maintenance checklist for this repository (stack, CI, hygiene, and Cursor operating assets). Update this file when those areas change.

## Bootstrap Checklist

### Repo basics

- [ ] Confirm repository purpose, stack, and primary verification command.
- [ ] Keep root `AGENTS.md` aligned with how humans and agents are expected to work here.

### Cursor operating model (Cursor 3–aligned)

- [ ] Rules under `.cursor/rules/` match team policy; see [cursor-operating-model-architecture.md](cursor-operating-model-architecture.md).
- [ ] Skills under `.cursor/skills/<name>/SKILL.md` stay in sync with workflow changes.
- [ ] Subagents under `.cursor/agents/*.md` reflect roles you actually delegate.
- [ ] `.cursor/hooks.json` and `.cursor/hooks/*.mjs` stay safe on all OSes (Node-based hooks here); trusted workspace required for hooks to run.

### Review and verification

- [ ] Add `.github/pull_request_template.md` if missing.
- [ ] Add `.github/workflows/` with the smallest useful CI check set.
- [ ] Document only commands that exist in `package.json`.
- [ ] Add `lint`, `typecheck`, and `test` only after the corresponding tooling is installed.

## Current state

### Verification

- `npm run build`

### Cursor artifacts in this repo

| Area | Paths |
|------|--------|
| Agent instructions | [AGENTS.md](../AGENTS.md) |
| Project rules | `.cursor/rules/ui-system.mdc`, `.cursor/rules/architecture.mdc`, `.cursor/rules/git-workflow.mdc` |
| Skills | `.cursor/skills/plan-from-issue/`, `implement-from-plan/`, `code-review/`, `ui-review/`, `fix-from-review/`, `release-readiness/` (each contains `SKILL.md`) |
| Subagents | `.cursor/agents/builder-agent.md`, `code-review-agent.md`, `ui-review-agent.md` |
| Hooks | `.cursor/hooks.json`, `.cursor/hooks/*.mjs` |
| Architecture map | [docs/cursor-operating-model-architecture.md](cursor-operating-model-architecture.md) |
| Overview | [docs/cursor-system-overview.md](cursor-system-overview.md) |
| Doc index | [docs/cursor_sources.md](cursor_sources.md) |

### Notes

- No `lint`, `typecheck`, or `test` script is installed yet.
- Optional strict plan gate: set environment variable `CURSOR_STRICT_PLAN_GATE=1` (see architecture doc) for stricter `beforeSubmitPrompt` behavior.

## Change Log

### 2026-04-12

- Added Cursor 3–aligned scaffold: `AGENTS.md`, `.cursor/rules`, `.cursor/skills`, `.cursor/agents`, `.cursor/hooks.json` + Node hook scripts, and [cursor-operating-model-architecture.md](cursor-operating-model-architecture.md).

### 2026-04-11

- Removed the previous Cursor-oriented operating model (project rules, slash commands, skills, operating-model docs, and saved-plan policy) in preparation for a new operating model.
