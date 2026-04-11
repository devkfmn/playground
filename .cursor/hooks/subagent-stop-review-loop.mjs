/**
 * Conceptual: review-fix-loop — if subagent summary contains [[BLOCKING]], nudge fix-from-review.
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
      'Subagent reported [[BLOCKING]]. Run /fix-from-review (or implement fixes) addressing the findings, then re-run review.',
  })
)
process.exit(0)
