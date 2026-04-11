/**
 * Conceptual: post-implementation-check — run npm run build if src/ was edited.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const stdin = fs.readFileSync(0, 'utf8')
let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

if (payload.status !== 'completed') {
  process.stdout.write('{}')
  process.exit(0)
}

const root = process.cwd()
const dirty = path.join(root, '.cursor', 'hooks', '.dirty')
if (!fs.existsSync(dirty)) {
  process.stdout.write('{}')
  process.exit(0)
}

fs.unlinkSync(dirty)

const res = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
  cwd: root,
  encoding: 'utf8',
  shell: false,
})

if (res.status === 0) {
  process.stdout.write('{}')
  process.exit(0)
}

const err = (res.stderr || res.stdout || '').slice(-4000)
process.stdout.write(
  JSON.stringify({
    followup_message:
      `npm run build failed after edits under src/. Fix the errors, then re-run build.\n\nLast output (truncated):\n${err}`,
  })
)
process.exit(0)
