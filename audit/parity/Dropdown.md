# Dropdown — pixel-parity audit (Figma 1:1804)

Варианты: OnColor filled-on (1:1805) / off (1:1811), default filled-on (1:1817) / off (1:1823).
Структура: label «head line» + control «Frame 1456» (текст + chevron-icon 16×16).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| gap (label↔control) | 8 (XS) | XS | XS | ✅ |
| Label — размер | 8px (caps) | caps 8px | caps 8px | ✅ |
| Label — letter-spacing | 20% | 0.08em | 0.2em | ⚠️ исправлено |
| Label — цвет (default) | #000000 | text-secondary | text-primary | ⚠️ исправлено |
| Label — цвет (onColor) | #d1a63b (brown) | text-secondary | control-brown | ⚠️ исправлено |
| Control — layout | HORIZONTAL space-between | space-between | space-between | ✅ |
| Control — padding | 8/14/8/14 | S (14 все) | XS/S (8/14) | ⚠️ исправлено |
| Control — скругление | 4 | radius-s | radius-s | ✅ |
| Control — шрифт | Pixform 10px | Akkurat text-gr 11px | `--ds-font-family-pixel` 10px (tokenGap) | ⚠️ исправлено |
| Control — letter-spacing | 20% | 0.08em | 0.2em | ⚠️ исправлено |
| Fill default | #eaeaea | control-on-color (#fff)+shadow-1 | control-secondary, без тени | ⚠️ исправлено |
| Fill onColor | #d1a63b | control-brown | control-brown | ✅ |
| Текст значения (onColor) | #ffffff | inherit (черный) | text-on-color (#fff) | ⚠️ исправлено |
| Текст значения (default filled) | #000000 | inherit | text-primary | ✅ |
| Placeholder (default off) | #979797 | opacity 0.5 | text-secondary | ⚠️ исправлено |
| Chevron | SF arrow icon, 16×16, color = текст | SVG chevron 16×16 | SVG chevron 16×16 currentColor | ✅ (эквивалент) |
| Меню (раскрытие) | n/a в наборе | вниз, кастом | сохранено, текст→Pixform 10px | ⚠️ исправлено |

Checklist: текст ⚠️ (шрифт/размер/цвет/spacing) · иконки ✓ (chevron-эквивалент) · раскладка ✓ · скругление ✓ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- Control/option font-size = 10px — нет точного токена. Захардкожен 10px.
- letter-spacing 20% (0.2em) — нет токена, захардкожен.
- Chevron: в Figma это SF Symbol (стрелка вниз `􀄈`); в React оставлен инлайн-SVG chevron того же размера/цвета как переносимый эквивалент (проприетарный шрифт-иконка не бандлится).
