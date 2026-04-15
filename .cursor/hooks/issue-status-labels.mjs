/**
 * GitHub issue status labels for builder-agent lifecycle (hooks + shared helpers).
 * Fail-open: never throws; logs to stderr on recoverable gh failures.
 */
import { execSync, spawnSync } from 'node:child_process'

export const STATUS = {
  inProgress: 'status:in-progress',
  inReview: 'status:in-review',
  done: 'status:done',
}

const ALL_STATUS = [STATUS.inProgress, STATUS.inReview, STATUS.done]

export function extractIssueNumber(...texts) {
  for (const t of texts) {
    const m = String(t || '').match(/#(\d+)/)
    if (m) return parseInt(m[1], 10)
  }
  return null
}

export function getRepoSlug() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY.trim()
  try {
    const url = execSync('git remote get-url origin', {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()
    const m = url.match(/github\.com[:/]([^/]+\/[^/.]+)/)
    if (!m) return null
    return m[1].replace(/\.git$/i, '')
  } catch {
    return null
  }
}

function log(...args) {
  console.error('[issue-status-labels]', ...args)
}

function gh(args) {
  return spawnSync('gh', args, {
    encoding: 'utf8',
    shell: false,
  })
}

function ghIssueEdit(repo, issue, extraArgs) {
  const r = gh(['issue', 'edit', String(issue), '--repo', repo, ...extraArgs])
  if (r.status !== 0 && r.stderr) {
    log('gh stderr:', r.stderr.trim())
  }
  return r
}

/** Remove status labels that might be present; ignore missing-label errors. */
function removeStatusLabels(repo, issue, except) {
  for (const label of ALL_STATUS) {
    if (label === except) continue
    gh(['issue', 'edit', String(issue), '--repo', repo, '--remove-label', label])
  }
}

export function isBuilderSubagent(payload) {
  const typ = String(payload.subagent_type || '')
  if (typ === 'builder-agent' || typ === 'builder_agent') return true
  const task = String(payload.task || '')
  if (/\bbuilder-agent\b/i.test(task)) return true
  const desc = String(payload.description || '')
  if (/builder/i.test(desc) && /approved plan/i.test(desc)) return true
  return false
}

/**
 * subagentStart: transition to status:in-progress when builder starts.
 */
export function applyBuilderStartLabel(payload) {
  if (!isBuilderSubagent(payload)) return
  const issue = extractIssueNumber(payload.task)
  if (!issue) {
    log('skip in-progress: no #issue in task')
    return
  }
  const repo = getRepoSlug()
  if (!repo) {
    log('skip in-progress: could not resolve repo from origin')
    return
  }
  removeStatusLabels(repo, issue, STATUS.inProgress)
  const r = ghIssueEdit(repo, issue, ['--add-label', STATUS.inProgress])
  if (r.status !== 0) log('gh issue edit in-progress failed', r.status)
}

/**
 * subagentStop: transition to status:in-review when builder completes successfully.
 */
export function applyBuilderStopLabel(payload) {
  if (!isBuilderSubagent(payload)) return
  if (payload.status !== 'completed') return
  const issue = extractIssueNumber(payload.task, payload.summary)
  if (!issue) {
    log('skip in-review: no #issue in task/summary')
    return
  }
  const repo = getRepoSlug()
  if (!repo) {
    log('skip in-review: could not resolve repo from origin')
    return
  }
  removeStatusLabels(repo, issue, STATUS.inReview)
  const r = ghIssueEdit(repo, issue, ['--add-label', STATUS.inReview])
  if (r.status !== 0) log('gh issue edit in-review failed', r.status)
}
