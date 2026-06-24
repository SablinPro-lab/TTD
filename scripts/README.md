# scripts

## figma-sync.mjs

Детерминированное ядро синхронизации Figma → доки/release-notes. **Без сети** — диффит
`.figma-snapshot.json` (последнее известное состояние) против `.figma-live.json` (текущее
состояние, которое выгружает скилл `figma-sync` через Figma MCP).

```bash
npm run figma:sync             # dry-run: показать дифф снапшот ↔ Figma
npm run figma:sync -- --apply  # применить: release-notes + снапшот + TODO по докам
npm run figma:sync -- --init   # засеять снапшот из .figma-live.json (первый раз)
```

Что детектит: добавленные/удалённые компоненты, изменённый **Description**, изменённый набор
**вариантов**. На каждое изменение создаётся запись release-notes (`added|changed|deprecated`).

> Запись Description/страниц **в** Figma идёт через MCP (`use_figma`) — это делает скилл `figma-sync`
> (агент), не этот скрипт. См. `.claude/skills/figma-sync/SKILL.md`.

## check-docs.mjs

Гейт «каждое изменение компонента обновляет доки + release-notes». Подключён как git
pre-commit hook (`.githooks/pre-commit`, `git config core.hooksPath .githooks`).

```bash
npm run docs:check                                     # по staged-файлам (pre-commit)
node scripts/check-docs.mjs --range origin/main..HEAD  # по диапазону коммитов (CI)
```
