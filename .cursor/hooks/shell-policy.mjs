/**
 * Conceptual: pr-open-trigger + strict PR base dev / no push to main.
 * beforeShellExecution — return permission JSON.
 */
import fs from 'node:fs'

const stdin = fs.readFileSync(0, 'utf8')
let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  printAllow()
  process.exit(0)
}

const command = String(payload.command || '')

function printAllow() {
  process.stdout.write(
    JSON.stringify({
      permission: 'allow',
    })
  )
}

function printDeny(userMessage, agentMessage) {
  process.stdout.write(
    JSON.stringify({
      permission: 'deny',
      user_message: userMessage,
      agent_message: agentMessage,
    })
  )
}

// Block pushes to main
if (/\bgit\s+push\b/i.test(command)) {
  if (/\bmain\b/.test(command) || /:main\b/.test(command) || /refs\/heads\/main/.test(command)) {
    printDeny(
      'Push to main blocked by project hook.',
      'Do not push to main. Open a PR into dev (gh pr create --base dev) and merge there first; main is human-release only.'
    )
    process.exit(0)
  }
}

// Enforce PR base dev for gh pr create
if (/\bgh(\.exe)?\s+pr\s+create\b/i.test(command)) {
  const hasBaseDev = /--base(\s+|=)dev\b/i.test(command)
  const hasBaseMain = /--base(\s+|=)main\b/i.test(command)
  if (hasBaseMain || !hasBaseDev) {
    printDeny(
      'PR must target dev.',
      'Re-run with an explicit dev base, e.g. gh pr create --base dev (and do not use --base main). Agents must not open PRs to main.'
    )
    process.exit(0)
  }
  process.stdout.write(
    JSON.stringify({
      permission: 'allow',
      agent_message:
        'PR targets dev. After creation, run /code-review and /ui-review (or delegate code-review-agent and ui-review-agent).',
    })
  )
  process.exit(0)
}

printAllow()
process.exit(0)
