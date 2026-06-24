# Tokens diff — theme.css ↔ Figma remote library (Stage Styles)

Захвачено: 2026-06-23. Источник правды — remote-библиотека (`audit/tokens.figma.json`).
`theme.css` был заполнен на этапе миграции по устаревшему чтению (всё как Inter) — расходится.

## ❌ Неверные значения (исправить)

| token (CSS) | было | стало (Figma) | Figma-имя |
|---|---|---|---|
| `--ds-color-text-secondary` | #000000 | **#979797** | Text & icon/Secondary |
| `--ds-color-bg-base` | #ffffff | **#f2f2f2** | Background/Base |
| `--ds-color-control-secondary` | #ececec | **#eaeaea** | Controls/Secondary/default |
| `--ds-color-tech-green` | #1cbd37 | **#00867b** | tech/green |
| `--ds-radius-l` | 4px | **12px** | rounds/L |
| `--ds-radius-over` | 4px | **999px (pill)** | rounds/Over |
| `--ds-indent-xxl` | 60px | **90px** | indents/XXL (out) |
| `--ds-font-family` | Inter | **Akkurat LL Cyr TT** (Grotesk) | font/family/Grotesk |

## ➕ Отсутствуют (добавить)

- **Шрифты:** `--ds-font-family-display` = Instrument Serif (Antiqa), `--ds-font-family-pixel` = Pixform (Pixel).
- **Размер:** `--ds-font-size-h1` = 84px.
- **Радиус:** `--ds-radius-m` = 8px.
- **Отступы:** `--ds-indent-neg-xs` = -8px, `--ds-indent-neg-1` = -1px.
- **Цвета:** `lines` #eaeaea, `gray` #cbcbcb, `text-green` #00867b, `text-brown`/`control-brown` #d1a63b,
  `super-yellow` #ffe900, `bar-filled` #b8c6c3, `bar-empty` #ffffff,
  карточные фоны: `card-red` #f5cfca, `card-green` #d4eee7, `card-white` #ffffff,
  on-card: `oncard-red` #f7e0dd, `oncard-green` #d4eee7, `oncard-yellow` #fffd9e.
- **Размер:** `--ds-size-base-width` = 830px.

## 🔁 Уточнения

- `--ds-color-accent` (#ffd60a, выдуман на D13) → заменяю на реальный токен **`Color/superYellow` #ffe900**
  (`--ds-color-super-yellow`); `--ds-color-accent` оставляю алиасом на него.
- Опечатки в именах библиотеки (`emty`, `On cads`, `base with`) — фиксирую правильные имена в CSS-комментариях,
  не воспроизвожу опечатки в именах CSS-переменных.
- Имена существующих `--ds-*` НЕ меняю (используются в 32 компонентах) — правлю только значения и добавляю новые.

## ✅ Совпадает
black, text-primary, text-on-color, control-on-color, tech-purple, tech-red, tech-gray,
indents XXXS/XXS/XS/S/M/L, font-size caps/text-gr/M/h3/description, radius-s.
