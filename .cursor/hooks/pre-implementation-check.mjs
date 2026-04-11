/**
 * Maps to conceptual hook: pre-implementation-check (beforeSubmitPrompt).
 * Default: fail-open. Set CURSOR_STRICT_PLAN_GATE=1 to block prompts that look
 * like implementation starts without an issue ref (#nnn) or plan marker.
 */
import fs from 'node:fs'

const stdin = fs.readFileSync(0, 'utf8')

function out(obj) {
  process.stdout.write(JSON.stringify(obj))
}

let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  out({ continue: true })
  process.exit(0)
}

const prompt = String(payload.prompt || '')
const strict = process.env.CURSOR_STRICT_PLAN_GATE === '1'

const looksImplement =
  /\b(implement|build\s+out|add\s+(a\s+)?feature|write\s+code|start\s+(coding|implementation))\b/i.test(
    prompt
  )

const hasIssue = /#\d+/.test(prompt)
const hasPlan = /\bPLAN:\b|\.cursor\/plans\//i.test(prompt)

if (strict && looksImplement && !hasIssue && !hasPlan) {
  out({
    continue: false,
    user_message:
      'Implementation-style prompt blocked until you add an issue reference (#123) or an explicit plan marker (e.g. PLAN: or .cursor/plans/...). Unset strict mode by removing CURSOR_STRICT_PLAN_GATE=1.',
  })
  process.exit(0)
}

out({ continue: true })
process.exit(0)
