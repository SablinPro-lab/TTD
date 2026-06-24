# Pixel-parity audit — Header

Figma: `header` (1:2032) — variant `default` (1:2033).

Структура Figma (VERTICAL): [topmenu 45px] + [second_row 43px] + [Frame 1382 26px: bar(dots) + подписи этапов].

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| layout | VERTICAL stack | column | column | ✅ |
| bg | base (#f2f2f2) | bg-base | bg-base | ✅ |
| ряд 1 | topmenu instance | TopMenu | TopMenu | ✅ |
| ряд 2 | second_row instance | SecondRow | SecondRow | ✅ |
| ряд 3 | Frame 1382: прогресс-бар (dots) + подписи этапов | ТОЛЬКО подписи этапов (бар отсутствовал) | Bar + подписи (добавлен Bar) | ✅ |
| ряд 3 padding | 0 / 20 | 14 / 24 (S/L) | 8 / 20 (XS/M) | ⚠️ |
| ряд 3 gap (бар↔подписи) | 8 (XS) | — | XS (8) | ✅ |
| подписи этапов | UPPER 8px, ls caps, secondary, spread | caps 8px, ls caps, secondary, space-between | то же + Pixform | ✅ |
| шрифт подписей | (микро-uppercase → Pixform) | --ds-font-family | --ds-font-family-pixel | ✅ |
| ряд 3 border | (нет top-border в Figma) | border-top 1px | убран | ✅ |

Checklist: текст ✓ · иконки ✓ (dots-бар добавлен) · раскладка ✓ · скругление ✓ · отступы ⚠️

## Key fixes
1. Добавлен прогресс-бар (Bar atom) над подписями этапов — в Figma третий ряд (Frame 1382) — это dots-бар + подписи; в React был только текст. Новый опциональный проп `progress` (default 60).
2. Подписи этапов переведены на `--ds-font-family-pixel` (uppercase micro-label convention).
3. Третий ряд: убран лишний top-border; padding S/L → XS/M; добавлен внутренний gap XS.

## tokenGap
- Высота ряда 26px и вертикальный padding — нет токена под 26px; используется XS (8) сверху/снизу как ближайшее визуальное соответствие.

Overall: ⚠️ (вертикальные отступы ряда 3 аппроксимированы)
