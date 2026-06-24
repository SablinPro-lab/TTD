#!/usr/bin/env node
/**
 * figma-sync — детерминированное ядро синхронизации Figma → доки/release-notes.
 *
 * Разделение ответственности:
 *   • Чтение/запись В Figma (Description, страницы) идёт через Figma MCP и поэтому
 *     выполняется СКИЛЛОМ `figma-sync` (агентом). Скилл выгружает текущее состояние
 *     отслеживаемых компонентов в `.figma-live.json`.
 *   • Этот скрипт — чистый Node без сети: он сравнивает `.figma-snapshot.json`
 *     (последнее известное состояние) с `.figma-live.json` (текущее), находит
 *     ручные правки, и при --apply обновляет снапшот + дописывает release-notes,
 *     а также печатает список доков/Description, которые надо привести в соответствие.
 *
 * Запуск (одной командой):
 *   npm run figma:sync             # dry-run: показать дифф
 *   npm run figma:sync -- --apply  # применить: снапшот + release-notes + TODO по докам
 *   npm run figma:sync -- --init   # засеять снапшот из .figma-live.json (первый раз)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SNAPSHOT = join(root, '.figma-snapshot.json')
const LIVE = join(root, '.figma-live.json')
const RELEASE_NOTES = join(root, 'src', 'release-notes', 'release-notes.json')

const args = new Set(process.argv.slice(2))
const APPLY = args.has('--apply')
const INIT = args.has('--init')

const today = () => new Date().toISOString().slice(0, 10)
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n')

function fail(msg) {
  console.error(`\n❌ ${msg}\n`)
  process.exit(1)
}

if (!existsSync(LIVE)) {
  fail(
    `Нет .figma-live.json. Его выгружает скилл figma-sync через Figma MCP.\n` +
      `   Сначала запусти скилл (он прочитает компоненты из Figma), потом этот скрипт.`,
  )
}

const live = readJson(LIVE)

// ── режим инициализации ───────────────────────────────────────────────
if (INIT) {
  writeJson(SNAPSHOT, { ...live, updatedAt: today() })
  console.log('✅ Снапшот засеян из .figma-live.json')
  process.exit(0)
}

if (!existsSync(SNAPSHOT)) fail('Нет .figma-snapshot.json — запусти с --init.')
const snap = readJson(SNAPSHOT)

// ── вычисление диффа ──────────────────────────────────────────────────
const snapComps = snap.components ?? {}
const liveComps = live.components ?? {}
const ids = new Set([...Object.keys(snapComps), ...Object.keys(liveComps)])

const arrEq = (a = [], b = []) =>
  a.length === b.length && a.every((x, i) => x === b[i])

/** @type {{type:string, component:string, change:string, docPath?:string, nodeId?:string}[]} */
const changes = []

for (const id of ids) {
  const before = snapComps[id]
  const after = liveComps[id]

  if (before && !after) {
    changes.push({
      type: 'deprecated',
      component: before.reactComponent ?? before.figmaName ?? id,
      change: `Компонент удалён/спрятан в Figma (был node ${id}).`,
      docPath: before.docPath,
    })
    continue
  }
  if (!before && after) {
    changes.push({
      type: 'added',
      component: after.reactComponent ?? after.figmaName ?? id,
      change: `Новый компонент в Figma: ${after.figmaName} (node ${id}). Нужен React-компонент и доки.`,
      docPath: after.docPath,
      nodeId: id,
    })
    continue
  }

  // существует в обоих — ищем ручные правки
  const name = after.reactComponent ?? after.figmaName ?? id
  if ((before.description ?? '') !== (after.description ?? '')) {
    changes.push({
      type: 'changed',
      component: name,
      change: `Description в Figma изменён вручную: "${after.description}". Синхронизировать доки.`,
      docPath: after.docPath,
      nodeId: id,
    })
  }
  if (!arrEq(before.variants, after.variants)) {
    const added = (after.variants ?? []).filter((v) => !(before.variants ?? []).includes(v))
    const removed = (before.variants ?? []).filter((v) => !(after.variants ?? []).includes(v))
    const parts = []
    if (added.length) parts.push(`добавлены варианты: ${added.join(', ')}`)
    if (removed.length) parts.push(`убраны варианты: ${removed.join(', ')}`)
    changes.push({
      type: 'changed',
      component: name,
      change: `Изменён набор вариантов (${parts.join('; ')}). Обновить props и доки.`,
      docPath: after.docPath,
      nodeId: id,
    })
  }
}

// ── вывод ─────────────────────────────────────────────────────────────
if (changes.length === 0) {
  console.log('✅ Расхождений между Figma и снапшотом нет. Синхронизация не требуется.')
  process.exit(0)
}

console.log(`\n🔎 Найдено изменений: ${changes.length}\n`)
for (const c of changes) {
  console.log(`  • [${c.type}] ${c.component}: ${c.change}`)
}

if (!APPLY) {
  console.log(`\nℹ️  Это dry-run. Запусти с --apply, чтобы обновить снапшот и release-notes.\n`)
  process.exit(0)
}

// ── применение: release-notes + снапшот ───────────────────────────────
const notes = existsSync(RELEASE_NOTES) ? readJson(RELEASE_NOTES) : []
const date = today()
for (const c of changes) {
  notes.unshift({ date, component: c.component, type: c.type, change: c.change })
}
writeJson(RELEASE_NOTES, notes)
writeJson(SNAPSHOT, { ...live, updatedAt: date })

console.log(`\n✅ Применено:`)
console.log(`   • release-notes: +${changes.length} запис(ь/и) → ${'src/release-notes/release-notes.json'}`)
console.log(`   • снапшот обновлён → .figma-snapshot.json`)

const docTodos = changes.filter((c) => c.docPath)
if (docTodos.length) {
  console.log(`\n📝 Привести в соответствие вручную (агент / MCP):`)
  for (const c of docTodos) {
    console.log(`   • доки: ${c.docPath}`)
    if (c.nodeId && c.type === 'changed') {
      console.log(`     (Description в Figma уже изменён вручную — нужно обновить .docs.mdx)`)
    }
    if (c.nodeId && c.type === 'added') {
      console.log(`     + создать React-компонент и записать Description в Figma (node ${c.nodeId})`)
    }
  }
}
console.log('')
