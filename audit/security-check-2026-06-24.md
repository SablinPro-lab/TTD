# Security Check — 2026-06-24 (этап: дизайн-система, статический SPA)

Объект: **FIgma tests** — React + Vite + TS design-system + превью/страницы. Бэкенда, БД, auth,
загрузок, вебхуков, серверного деплоя **нет** → соответствующие разделы N/A.
Рецепт: `vibe-coding-course/product/prompts/security-check.md`. Проверки реальные (git grep / npm audit / чтение файлов).

## Сводка
- 🔴 Критично: **0**   ⚠️ Среднее: **2**   ✅ В порядке: **6**   N/A: **8**

## Таблица по разделам

| Разд. | Статус | Что проверял (реально) | Результат |
|---|---|---|---|
| Secrets в репо | ✅ | `git grep` по figd_/ghp_/sk-/AKIA/BEGIN/api_key/secret/password/token | только ложные «token gap»/«design token»; реальных секретов нет |
| `.env`/ключи закоммичены | ✅ | `git ls-files \| grep .env/.pem/.key/id_rsa/credential` | ничего не закоммичено; `.gitignore` покрывает `.figma-live.json`, node_modules, dist, .screenshots |
| Figma access-token | ✅ | контент `.figma-tokens.json`, `.figma-snapshot.json` | только дизайн-токены + `fileKey/fileName/components`; `figd_/bearer/access_token` отсутствуют |
| XSS / инъекции в рендере | ✅ | `grep dangerouslySetInnerHTML\|eval\|innerHTML\|document.write\|new Function` в `src/` | не найдено |
| Внешние скрипты / инлайны | ✅ | `index.html` | preconnect к fonts.gstatic.com (Google Fonts) + безопасный anti-FOUC inline (localStorage, try/catch); сторонних `<script src>` нет |
| Прод-зависимости | ✅ | `npm audit --omit=dev` | **0 уязвимостей** |
| Dev-зависимости | ⚠️ | `npm audit` (вкл. dev) | **2 (1 high, 1 moderate)** — `esbuild` транзитивно через `vite` |
| Figma fileKey в исходниках | ⚠️ | `git grep ct9b7yfSwULxIG3mIPlSg8` | идентификатор файла (не credential), но присутствует в docs/src — информационно |
| Auth / сессии / JWT | N/A | — | бэкенда нет |
| IDOR / доступы к данным | N/A | — | нет API/БД |
| CSRF / SSRF | N/A | — | нет серверных запросов от пользователя |
| File uploads | N/A | — | нет |
| Webhooks / payments | N/A | — | нет |
| Деплой / SSH / инфра | N/A | — | статика, серверного деплоя нет |
| HTTPS / HSTS | N/A | — | хостинг вне скоупа этого репо |
| CSP (серверный) | N/A | — | нет сервера; для статики — на стороне хостинга |

## Критично 🔴
Нет. **Критерий стадии (🔴 = 0) выполнен.**

## В backlog ⚠️
### dev.1 — esbuild (через vite), 1 high + 1 moderate
- Где: `node_modules/vite` → `esbuild` (devDependency).
- Что/Атака: известная проблема dev-сервера esbuild (любой сайт может слать запросы к локальному
  dev-серверу и читать ответ). Затрагивает **только `npm run dev`**, НЕ прод-сборку (отдаём статику).
- Чинить: апгрейд `vite` до версии с пропатченным esbuild (мажор, breaking) — планово, не вслепую
  (`npm audit fix --force` не запускаем — мажорный даунгрейд/апгрейд ломает сборку). Риск в реальной
  эксплуатации низкий: dev-сервер локальный, прод не затронут.
### info.1 — Figma fileKey в исходниках
- Где: `DECISIONS.md`, `NOTES.md`, `audit/*`, `.figma-*`, `src` (комментарии-источники).
- Что: `fileKey` — идентификатор Figma-файла, не секрет; доступ к файлу требует авторизованной
  Figma-сессии/токена (их в репо нет). Оставляю как есть (учебный/демо-проект); при желании можно
  вынести в `.env`-переменную.

## Починено в этом прогоне ✅
Находок к починке (🔴) не было.

## Что не проверено / Out of scope
- Хостинг/CDN, TLS-конфиг, заголовки безопасности на стороне раздачи статики — вне этого репозитория.
- Приватность Figma-файла — управляется в Figma, не в коде.

## Дополнительный слой (официальный плагин + /security-review)
- `/security-review` (официальная команда) **в этой сессии не запускалась**: cwd сессии — корень
  vibe-coding-course (не git этого проекта), а git-репо находится в `FIgma tests/`. Для прогона нужно
  открыть проект как cwd=`FIgma tests`. Ручной прогон по разделам выполнен и покрывает релевантную
  для статического SPA поверхность атаки.
- Плагин `security-guidance@claude-plugins-official` работает фоном на коммитах.
