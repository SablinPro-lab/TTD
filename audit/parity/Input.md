# Input — pixel-parity audit (Figma 1:1799)

Variant: Property 1=Default (1:1800). Структура: label «head line» + поле «profile» (Michael Lee).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| gap (label↔field) | 8 (XS) | XS | XS | ✅ |
| Label — шрифт/размер | Akkurat 8px (caps) | caps 8px | caps 8px | ✅ |
| Label — letter-spacing | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| Label — textCase | UPPER | uppercase | uppercase | ✅ |
| Label — цвет | #000000 | text-secondary (#979797) | text-primary | ⚠️ исправлено |
| Поле — fill | #eaeaea | control-secondary | control-secondary | ✅ |
| Поле — скругление | 4 | radius-s | radius-s | ✅ |
| Поле — padding | 8/14/8/14 | S/M (14/20) | XS/S (8/14) | ⚠️ исправлено |
| Текст поля — шрифт | Pixform | Akkurat (`--ds-font-family`) | `--ds-font-family-pixel` | ⚠️ исправлено |
| Текст поля — размер | 10px | m 15px | 10px (tokenGap) | ⚠️ исправлено |
| Текст поля — letter-spacing | 20% | — | 0.2em | ⚠️ исправлено |
| Текст поля — textCase | UPPER | — (none) | uppercase | ⚠️ исправлено |
| Layout контейнера | VERTICAL align MIN | column | column | ✅ |
| focus/error/disabled | n/a в Figma | кольцо/красное/dim | сохранено | ✅ |

Checklist: текст ⚠️ (шрифт/размер/spacing/case/цвет) · иконки ✓ (нет) · раскладка ✓ · скругление ✓ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- Текст поля font-size = 10px — нет точного токена (caps=8, text-gr=11). Захардкожен 10px.
- letter-spacing 20% (0.2em) — нет токена, захардкожен.
