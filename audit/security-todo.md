# Security TODO (⚠️ — не блокеры деплоя)

## ⚠️ vite/esbuild — dev-server уязвимости (npm audit: 1 high, 1 moderate)
- **Где:** `vite` (<=6.4.2) → `esbuild` (dev-server CORS, GHSA). Только **dev-tooling**.
- **Влияние на прод:** нет — деплой = статический `dist/` (html/js/css), dev-сервер в прод не используется.
- **Фикс:** `npm audit fix --force` ставит `vite@8` (breaking change) → отдельной задачей с прогоном сборки/превью, вне релиза.
- **Зафиксировано:** 2026-06-25 (security-check перед деплоем на Vercel).
