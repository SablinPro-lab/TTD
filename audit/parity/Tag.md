# Tag — pixel-parity audit (Figma 1:1772)

Варианты: control (1:1773), static (1:1776). h24, padding 8 все, radius 4, gap 10.
control = текст + иконка-крестик 16×16; static = только текст.

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Высота | 24 | авто | авто (padding 8 + текст) | ✅ |
| padding | 8/8/8/8 | XS/S (8/14) | XS (8) | ⚠️ исправлено |
| Скругление | 4 | radius-s | radius-s | ✅ |
| gap (текст↔иконка) | 10 | — | XS (8) tokenGap | ⚠️ исправлено |
| Шрифт | Pixform | Akkurat (`--ds-font-family`) | `--ds-font-family-pixel` | ⚠️ исправлено |
| Размер | 10px | text-gr 11px | 10px (tokenGap) | ⚠️ исправлено |
| letter-spacing | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| textCase | UPPER | uppercase | uppercase | ✅ |
| Цвет текста | #000000 | text-primary | text-primary | ✅ |
| Fill control | #eaeaea | control-on-color (#fff)+shadow-1 | control-secondary, без тени | ⚠️ исправлено |
| Иконка control | крестик 16×16 (SF 􀁎) | нет | + SVG-крестик 16×16 | ⚠️ исправлено |
| Fill static | #f7e0dd (oncard-red) | control-on-color (#fff)+shadow-1 | oncard-red, без тени | ⚠️ исправлено |
| Тень | нет | shadow-1 | нет | ⚠️ исправлено |
| Layout | HORIZONTAL center | inline-flex center | inline-flex center | ✅ |

Checklist: текст ⚠️ (шрифт/размер/spacing) · иконки ⚠️ (добавлен крестик в control) · раскладка ✓ · скругление ✓ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- font-size 10px — нет точного токена (text-gr=11). Захардкожен.
- letter-spacing 20% (0.2em) — нет токена, захардкожен.
- gap 10 — нет токена; ближайший XS(8).
- Иконка control — в Figma SF Symbol `􀁎` (крестик в круге); проприетарный шрифт-иконка не бандлится → переносимый инлайн-SVG того же размера 16×16, currentColor.
