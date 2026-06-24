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

## 🛡️ Security-чек перед push и deploy (железное правило)

> **Перед КАЖДЫМ `git push` и КАЖДЫМ деплоем — обязательный security-check.**
> Без свежего прогона push/deploy не делаем.

Что входит:
1. Ручной прогон по внутреннему security-чек-листу (разделы, релевантные
   статическому SPA: secrets, XSS/инъекции, утечки токенов, зависимости).
2. `npm audit` (после смены `package.json`/lock — обязательно).
3. Отчёт → `audit/security-check-<YYYY-MM-DD>.md`. **Критерий: 🔴 = 0.** Найденные 🔴 чиним ДО push/deploy;
   ⚠️ — в backlog отчёта.

Бэкап-напоминалка — git-хук `.githooks/pre-push` (печатает напоминание перед push). Хук — подстраховка,
а не замена: правило выполняем сами. Trivial-пуш без новых рисков можно протолкнуть `git push --no-verify`,
но это осознанное исключение.

## 🪞 Зеркальный нейминг (обязательно)

> **Названия фреймов, компонентов, токенов и стилей в Figma ЗЕРКАЛЬНО повторяются в React.**
> Любое расхождение — баг, чинится сразу. Семантика имени одна; меняется только регистр/формат по
> фиксированной таблице конвертации ниже (Figma использует `snake_case` и пути `category/name`,
> React — `PascalCase` для компонентов и `--ds-<category>-<name>` для токенов).

| Сущность | Figma | React | Пример |
| --- | --- | --- | --- |
| Компонент | `snake_case` (имя ноды/сета) | `PascalCase` (папка + файл + экспорт) | `card_top` → `CardTop` |
| Вариант | `Property 1=<value>` | проп `variant` / соответствующий проп | `Property 1=glass` → `variant="glass"` |
| Страница/экран | имя фрейма | `PascalCase` файл в `src/pages/screens/` | `All_teams` → `AllTeams` |
| Цвет-токен | `color/<group>/<name>` | `--ds-color-<group>-<name>` | `color/tech/green` → `--ds-color-tech-green` |
| Отступ-токен | `indents/<name>` | `--ds-indent-<name>` | `indents/s-(inner)` → `--ds-indent-s` |
| Радиус-токен | `rounds/<name>` | `--ds-radius-<name>` | `rounds/over` → `--ds-radius-over` |
| Шрифт-токен | `font/family/<name>` | `--ds-font-family[-<name>]` | `font/family/pixel` → `--ds-font-family-pixel` |
| Размер шрифта | `font/size/<name>` | `--ds-font-size-<name>` | `font/size/description` → `--ds-font-size-description` |

Правила:
- Новый компонент/токен — имя берём из Figma и конвертируем по таблице; не выдумываем синонимы.
- Слова в имени НЕ меняем (`card_top` → `CardTop`, не `ProfileHeader`).
- Реестр соответствий компонент↔node-id ведём в `audit/parity/INDEX.md`.

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
