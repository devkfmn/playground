/**
 * review-gate — v1 allows all subagents; optional stderr log.
 * When builder-agent starts, set GitHub issue label status:in-progress (see issue-status-labels.mjs).
 */
import fs from 'node:fs'
import { applyBuilderStartLabel } from './issue-status-labels.mjs'

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

applyBuilderStartLabel(payload)

process.stdout.write(JSON.stringify({ permission: 'allow' }))
process.exit(0)
