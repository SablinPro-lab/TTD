#!/usr/bin/env node
/**
 * check-docs — гейт «каждое изменение компонента обновляет доки + release-notes».
 *
 * Правило (см. CONTRIBUTING.md):
 *   • Изменил `src/components/<Name>/<Name>.tsx|.css` →
 *       ОБЯЗАН в том же коммите тронуть `<Name>.docs.mdx` И `release-notes.json`.
 *   • Изменил токены `src/styles/theme.css` → ОБЯЗАН тронуть `release-notes.json`.
 *
 * Запуск:
 *   node scripts/check-docs.mjs            # проверяет staged-файлы (для pre-commit)
 *   node scripts/check-docs.mjs --range A..B  # проверяет диапазон коммитов (для CI)
 */

import { execFileSync } from 'node:child_process'

const argv = process.argv.slice(2)
const rangeIdx = argv.indexOf('--range')
const range = rangeIdx !== -1 ? argv[rangeIdx + 1] : null

function changedFiles() {
  // execFile с массивом аргументов: без шелла, метасимволы в `range` не интерпретируются.
  const gitArgs = range
    ? ['diff', '--name-only', '--diff-filter=ACM', range]
    : ['diff', '--cached', '--name-only', '--diff-filter=ACM']
  return execFileSync('git', gitArgs, { encoding: 'utf8' })
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

const files = changedFiles()
const has = (p) => files.includes(p)
const RELEASE_NOTES = 'src/release-notes/release-notes.json'
const touchedReleaseNotes = has(RELEASE_NOTES)

const errors = []

// — компоненты —
const compRe = /^src\/components\/([^/]+)\/\1\.(tsx|css)$/
const touchedComponents = new Set()
for (const f of files) {
  const m = f.match(compRe)
  if (m) touchedComponents.add(m[1])
}

for (const name of touchedComponents) {
  const docPath = `src/components/${name}/${name}.docs.mdx`
  if (!has(docPath)) {
    errors.push(`Компонент «${name}» изменён, но доки не тронуты: ожидаю изменение ${docPath}`)
  }
  if (!touchedReleaseNotes) {
    errors.push(`Компонент «${name}» изменён, но нет записи в ${RELEASE_NOTES}`)
  }
}

// — токены —
if (has('src/styles/theme.css') && !touchedReleaseNotes) {
  errors.push(`Токены (theme.css) изменены, но нет записи в ${RELEASE_NOTES}`)
}

if (errors.length) {
  console.error('\n❌ Проверка доков не пройдена (см. CONTRIBUTING.md):\n')
  for (const e of errors) console.error(`   • ${e}`)
  console.error(
    '\nЧто делать: обнови <Component>.docs.mdx + Figma Description и добавь запись в release-notes.json' +
      ' (или прогони `npm run figma:sync -- --apply`). Затем повтори коммит.\n',
  )
  process.exit(1)
}

console.log('✅ check-docs: доки и release-notes в порядке.')
