# Switch — pixel-parity audit (Figma 1:1758)

Варианты: on/big (1:1759), off/big (1:1761), off/small (1:1763), on/small (1:1765).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Скругление | 4 | radius-s | radius-s | ✅ |
| padding big | 14/14/14/14 | XS/M (8/20) | S (14) | ⚠️ исправлено |
| padding small | 8/14/8/14 | XXS/S (4/14) | XS/S (8/14) | ⚠️ исправлено |
| Шрифт лейбла (big) | Pixform 10px | Akkurat 11px | Pixform 10px (tokenGap) | ⚠️ исправлено |
| Шрифт лейбла (small) | Akkurat 8px | Akkurat 11px | Akkurat 8px (caps) | ⚠️ исправлено |
| Letter-spacing | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| textCase | UPPER | uppercase | uppercase | ✅ |
| Fill on/big | #ffffff | control-on-color | control-on-color | ✅ |
| Тень on/big | нет | shadow-1 | нет (только hover) | ⚠️ исправлено |
| Fill off/big | прозрачный | transparent | transparent | ✅ |
| Fill on/small | #eaeaea | control-on-color (#fff) | control-secondary | ⚠️ исправлено |
| Fill off/small | #eaeaea | control-secondary | control-secondary | ✅ |
| Цвет текста on/small | #000000 | text-primary | text-primary | ✅ |
| Цвет текста off/small | #979797 | text-primary | text-secondary | ⚠️ исправлено |
| Layout | HORIZONTAL center/center | inline-flex center | inline-flex center | ✅ |

Checklist: текст ⚠️ (шрифт/размер) · иконки ✓ (нет) · раскладка ✓ · скругление ✓ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- big-лейбл font-size = 10px — нет точного токена (caps=8, text-gr=11). Захардкожен 10px.
- letter-spacing 20% (0.2em) — нет токена (caps=0.08em), захардкожен.
