# CONTRIBUTING — Figma DS

Дизайн-система живёт в двух местах одновременно: **Figma** (источник правды визуала) и
**React** (`src/components`). Чтобы они не разъезжались, действует одно железное правило.

## 🔒 Железное правило

> **Любое изменение компонента ОБЯЗАНО в том же коммите:**
> 1. обновить доки в React — `src/components/<Name>/<Name>.docs.mdx`;
> 2. обновить **Description** соответствующего компонента в Figma (тот же краткий текст);
> 3. добавить запись в release notes — `src/release-notes/release-notes.json`.

Описание в Figma и React-доки держим **синхронными по содержанию**. Новый токен (цвет, шрифт,
отступ) — сначала в Figma (секция `styles`), потом в `src/styles/theme.css`. Хардкод хексов и
пикселей в компонентах запрещён — только `var(--ds-*)`.

## Поток работы

```
изменение в Figma ──▶ /figma-sync ──▶ дифф ──▶ обновить .docs.mdx + Description + release-notes
изменение в коде  ──▶ обновить .docs.mdx + release-notes  ──▶ commit
```

- **Меняешь напрямую в Figma** (правка варианта, Description): запусти скилл **`figma-sync`** —
  он вычитает компоненты через Figma MCP, сравнит со снапшотом `.figma-snapshot.json`, найдёт
  ручные правки и проведёт их в доки + release notes. Подробности — `scripts/README.md`.
- **Меняешь код компонента:** руками обнови его `.docs.mdx`, Description в Figma и release notes.

## Release notes

Формат записи (`src/release-notes/release-notes.json`, новые — сверху):

```json
{ "date": "YYYY-MM-DD", "component": "Button", "type": "added|changed|fixed|deprecated", "change": "что изменилось" }
```

Страница рендерится в приложении на `/release-notes` и должна совпадать со страницей
**«Release Notes»** в Figma-файле.

## Гейт (автопроверка)

`scripts/check-docs.mjs` следит за правилом и подключён как **git pre-commit hook**
(`.githooks/pre-commit`). Коммит падает, если компонент изменён, а его `.docs.mdx` или
release-notes не тронуты.

Однократно включить хуки в свежем клоне:

```bash
git config core.hooksPath .githooks
```

Проверить вручную: `npm run docs:check`. В CI: `node scripts/check-docs.mjs --range origin/main..HEAD`.

## Команды

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Запустить витрину/доки локально (Vite + React) |
| `npm run build` | Собрать (tsc + vite) |
| `npm run figma:sync` | Дифф Figma ↔ снапшот (dry-run); `-- --apply` — применить |
| `npm run docs:check` | Гейт доков по staged-файлам |
