# Pixel-parity: Flag ← Figma `flag` (1:1767)

Figma: глиф SF Pro Display Semibold 20px, закладка (bookmark).
- **no** (1:1768): `􀉞` bookmark (контур), цвет **#000000** (text-primary).
- **yes** (1:1770): `􀉟` bookmark.fill (залитая), цвет **#979797** (text-secondary).

Маппинг React: `active=true` → «yes» (залитая, серая); `active=false` → «no» (контур, чёрная).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Форма | bookmark | bookmark (path) | bookmark (path) | ✅ |
| off (no): заливка | контур | контур | контур | ✅ |
| off (no): цвет | #000000 | text-primary #000 | text-primary #000 | ✅ |
| on (yes): заливка | залитая | залитая | залитая | ✅ |
| on (yes): цвет | **#979797** | **text-primary #000** | text-secondary #979797 | ✅ исправлено |
| Размер | глиф 20px | 24px (viewBox) | 24px (viewBox) | ✅ ~ок |
| Toggle/состояния | — | hover/active/focus | сохранено | ✅ |

Checklist: текст — (n/a) · иконка ✓ (форма + заливка + цвет по состоянию) · раскладка ✓ · скругление ✓ (radius-s на фокус-обёртке) · отступы — (n/a).

Overall: ✅

## tokenGap
Нет (`--ds-color-text-primary`, `--ds-color-text-secondary`). Глиф SF Pro → SVG-bookmark (форма-аналог).
