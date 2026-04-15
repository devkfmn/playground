/**
 * review-fix-loop — if subagent summary contains [[BLOCKING]], nudge fix-from-review + builder + re-review.
 * When builder-agent completes successfully, set GitHub issue label status:in-review (see issue-status-labels.mjs).
 */
import fs from 'node:fs'
import { applyBuilderStopLabel } from './issue-status-labels.mjs'

const stdin = fs.readFileSync(0, 'utf8')
let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

applyBuilderStopLabel(payload)

const summary = String(payload.summary || '')
if (!summary.includes('[[BLOCKING]]')) {
  process.stdout.write('{}')
  process.exit(0)
}

process.stdout.write(
  JSON.stringify({
    followup_message:
      'Subagent reported [[BLOCKING]]. Run /fix-from-review, delegate builder-agent on the same feature branch, then re-run code-review-agent and ui-review-agent (or UI N/A per ui-review-agent instructions).',
  })
)
process.exit(0)
