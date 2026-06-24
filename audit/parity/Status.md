# Status — pixel-parity audit (Figma 1:1734)

Варианты: purple (1:1735), green (1:1738), red (1:1741), stopped (1:1744).
Структура: Ellipse 5×5 (точка) + текст (Pixform 10).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Точка — размер | 5×5 | 8×8 | 5×5 (tokenGap) | ⚠️ исправлено |
| Точка — форма | круг | 50% | 50% | ✅ |
| gap (точка↔текст) | 10 | XS (8) | XS (8) tokenGap | ✅ (ближайший) |
| Лейбл — шрифт | Pixform | Pixform (`--ds-font-family-pixel`) | Pixform | ✅ |
| Лейбл — размер | 10px | text-gr 11px | 10px (tokenGap) | ⚠️ исправлено |
| Лейбл — letter-spacing | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| Лейбл — textCase | UPPER | uppercase | uppercase | ✅ |
| Цвет purple | #9747ff (точка+текст) | tech-purple | tech-purple | ✅ |
| Цвет green | #00867b | tech-green | tech-green | ✅ |
| Цвет red | #cc0000 | tech-red | tech-red | ✅ |
| Цвет stopped — точка | #cbcbcb | tech-gray | tech-gray | ✅ |
| Цвет stopped — текст | #cbcbcb | text-primary (#000) | tech-gray | ⚠️ исправлено |
| Layout | HORIZONTAL center | inline-flex center | inline-flex center | ✅ |

Checklist: текст ⚠️ (размер/spacing/цвет stopped) · иконки ✓ (точка) · раскладка ✓ · скругление ✓ · отступы ✓

Overall: ⚠️ исправлено

## tokenGap
- Точка 5px — нет токена размера; захардкожена 5px (раньше было 8px).
- Лейбл font-size 10px — нет точного токена (text-gr=11). Захардкожен.
- gap 10 — нет токена; использован ближайший XS(8).
- letter-spacing 20% (0.2em) — нет токена, захардкожен.
