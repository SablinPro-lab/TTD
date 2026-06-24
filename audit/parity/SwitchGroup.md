# SwitchGroup — pixel-parity audit (Figma 1:1833)

Variant: Property 1=Default (1:1834) — горизонтальная группа switch-инстансов на жёлтой плашке.

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Fill контейнера | #ffe900 (super-yellow) | super-yellow | super-yellow | ✅ |
| Скругление контейнера | 8 (M) | radius-s (4) | radius-m (8) | ⚠️ исправлено |
| Padding контейнера | 4/4/4/4 (XXS) | XXS (4) | XXS (4) | ✅ |
| itemSpacing (gap) | 2 (XXXS) | XXS (4) | XXXS (2) | ⚠️ исправлено |
| Layout | HORIZONTAL align MIN | inline-flex | inline-flex | ✅ |
| Пункт — скругление | 4 (switch radius) | radius-s | radius-s | ✅ |
| Пункт — padding | 14 (switch big) | XS/M (8/20) | S (14) | ⚠️ исправлено |
| Пункт — шрифт | Pixform 10px | Akkurat (`--ds-font-family`) text-gr 11px | Pixform 10px (tokenGap) | ⚠️ исправлено |
| Пункт — letter-spacing | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| Пункт — textCase | UPPER | uppercase | uppercase | ✅ |
| Активный — fill | #ffffff (switch=on) | control-on-color + shadow-1 | control-on-color (без тени) | ⚠️ исправлено |
| Активный — цвет текста | #000 | text-primary | text-primary | ✅ |

Checklist: текст ⚠️ (шрифт/размер) · иконки ✓ (нет) · раскладка ✓ · скругление ⚠️ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- Пункт font-size = 10px — нет точного токена (caps=8, text-gr=11). Захардкожен 10px.
- letter-spacing 20% (0.2em) — нет токена, захардкожен.
- hover-фон пункта = rgba(255,255,255,0.4) — Figma не задаёт hover (interaction-стейт), полупрозрачного белого токена нет.
