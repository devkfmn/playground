/**
 * Conceptual: review-fix-loop — if subagent summary contains [[BLOCKING]], nudge fix-from-review + builder + re-review.
 */
import fs from 'node:fs'

const stdin = fs.readFileSync(0, 'utf8')
let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

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
