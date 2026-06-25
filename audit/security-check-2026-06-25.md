# Security check — 2026-06-25

Проект: **FIgma tests** (репо TTD) — статический React+Vite+TS SPA дизайн-системы.
Повод: деплой на Vercel (`my-ttd`) после правок D50–D54 (полностью презентационные: CSS/раскладка/адаптив).
Критерий: 🔴 = 0 до push/deploy (CONTRIBUTING.md).

| Проверка | Статус | Метод | Результат |
|---|---|---|---|
| Секреты в репо | ✅ | `git grep` figd_/ghp_/sk_live/api_key/secret/password/token | реальных секретов нет (совпадения — текст прошлых отчётов) |
| `.env` в git | ✅ | `git ls-files \| grep .env` | не отслеживается |
| XSS / инъекции в рендере | ✅ | `git grep` dangerouslySetInnerHTML / innerHTML / eval / new Function / document.write по `src/` | не найдено |
| Пользовательский ввод | ✅ | весь контент — статические данные/пропсы, без внешнего ввода/fetch | n/a |
| Сетевые вызовы / токены Figma | ✅ | в рантайме нет fetch/токенов; Figma — только dev (MCP) | n/a |
| Зависимости (`npm audit`) | ⚠️ | `npm audit` | 2 уязв. (1 high, 1 moderate) в `vite`/`esbuild` — **dev-tooling** (esbuild dev-server CORS). На прод-артефакт (статика) НЕ влияет. Фикс = `vite@8` (breaking) → отложено в `security-todo`. |
| Прод-артефакт | ✅ | `npm run build` → `dist/` (статические html/js/css) | сборка чистая, runtime-зависимостей с уязвимостями нет |
| Деплой-конфиг | ✅ | добавлен `vercel.json` (SPA rewrite → index.html) | deep-links `/pages/*` отдают приложение, не 404 |

## Изменения с прошлого отчёта (2026-06-24)
D50–D54 — только презентация (hero, шапка, адаптив, удаление лишних атомов страницы 4). Новых зависимостей, сетевых вызовов, обработчиков ввода, опасных паттернов рендера НЕ добавлено → security-поверхность неизменна.

## Итог
**🔴 = 0 — деплой разрешён.** ⚠️ vite/esbuild (dev-only) → `docs/security-todo` (фикс breaking, вне деплоя).
