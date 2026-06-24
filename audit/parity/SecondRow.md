# Pixel-parity audit — SecondRow

Figma: `second_row` (1:1985) — variants `Default` (1:1986), `builider` (1:1995).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| layout (Default) | HORIZONTAL, MIN, gap 90 | flex gap M(20) | flex gap XXL(90) | ✅ |
| layout (builider) | SPACE_BETWEEN, gap 60 | margin-left auto на actions | --builder space-between | ✅ |
| padding | 14 / 20 / 14 / 20 | 8 / 20 (XS/M) | 14 / 20 (S/M) | ✅ |
| Back (Default) | белая заливка + зелёная рамка 1px #00867b, «BACK» Pixform 10 UPPER | Button secondary | Button secondary + .back (white + green border) | ✅ |
| Back (builider) | серая заливка #eaeaea | — | Button secondary (серый) | ✅ |
| крошки | «Home • Something • Something» Akkurat 11px ЧЁРНЫЙ, НЕ uppercase | uppercase, secondary, opacity .7, ls caps | 11px text-primary, gap XS, без uppercase | ✅ |
| разделитель | «•» (bullet) чёрный | «›» (chevron) opacity .5 | «•» text-primary | ✅ |
| крошки gap | 8 (XS) | 8 (XS) | 8 (XS) | ✅ |
| Back↔крошки gap | 60 (Frame 1393) | в общем gap | __lead gap XL(30≈60) | ⚠️ |
| действия (builider) | SAVE серый + DEPLOY чёрный, gap 8 | slot, gap XS | slot, gap XS | ✅ |

Checklist: текст ✓ · иконки ✓ (нет) · раскладка ✓ · скругление ✓ · отступы ✓

## Key fixes
1. Разделитель крошек «›» → «•» (Figma bullet).
2. Крошки перекрашены: чёрный Akkurat 11px без uppercase/letter-spacing/opacity (было secondary uppercase).
3. Back в Default получил белую заливку + зелёную рамку #00867b (через scoped .ds-second-row__back, Button не трогаем).
4. Builder-вариант: SPACE_BETWEEN при наличии actions; Back+крошки сгруппированы в `__lead`.
5. Padding 8/20 → 14/20.

## tokenGap
- Figma gap 90 (Default) и 60 (builider/Frame 1393) — нет точных токенов; 90→`--ds-indent-xxl`(90, точно для основного), 60→`--ds-indent-xl`(30, ближайший) для внутренней группы. Не добавляли.

Overall: ⚠️ (внутренний gap 60 аппроксимирован XL=30)
