/**
 * Marks workspace dirty for post-implementation-check when src/ is edited.
 * Pairs with stop-post-build.mjs (conceptual post-implementation-check).
 */
import fs from 'node:fs'
import path from 'node:path'

const stdin = fs.readFileSync(0, 'utf8')
let payload = {}
try {
  payload = JSON.parse(stdin || '{}')
} catch {
  process.exit(0)
}

const root = process.cwd()
const filePath = String(payload.file_path || '')
if (!filePath) process.exit(0)

const rel = path.relative(root, filePath).split(path.sep).join('/')
if (!rel.startsWith('src/')) process.exit(0)

const dir = path.join(root, '.cursor', 'hooks')
fs.mkdirSync(dir, { recursive: true })
fs.writeFileSync(path.join(dir, '.dirty'), String(Date.now()), 'utf8')
process.exit(0)
