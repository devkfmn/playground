/**
 * Conceptual: review-gate — v1 allows all subagents; optional stderr log.
 */
import fs from 'node:fs'

const stdin = fs.readFileSync(0, 'utf8')
let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  process.stdout.write(JSON.stringify({ permission: 'allow' }))
  process.exit(0)
}

const type = payload.subagent_type || ''
const task = String(payload.task || '').slice(0, 200)
console.error(`[subagentStart] type=${type} task=${task}`)

process.stdout.write(JSON.stringify({ permission: 'allow' }))
process.exit(0)
