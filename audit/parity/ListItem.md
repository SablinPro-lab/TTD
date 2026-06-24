# Pixel-parity: ListItem ← Figma `list` (1:1787)

Figma (inner `Property 1=Default`): HORIZONTAL, align CENTER, itemSpacing 14px,
padding 14px сверху/снизу + 0 по бокам, **нижняя граница 1px #eaeaea** (lines), без фона/скругления.
- Title «Sarah Johnson»: Akkurat LL Cyr TT Regular **20px** (h3), letterSpacing **−2%**, #000.
- Meta «Document / created by Alan / 24.05.2025»: **Pixform Regular 10px**, letterSpacing **20%**, UPPER, **#000000** (дата выровнена вправо).
- Action: инстанс button (серая пилюля r999, текст «edit» Pixform 10px UPPER).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Раскладка | flex, align center | flex, align center | flex, align center | ✅ |
| Gap | 14px | **24px (indent-l)** | indent-s (14px) | ✅ исправлено |
| Padding | 14px / 0 | **14px / 20px** | indent-s / 0 | ✅ исправлено |
| Фон | нет | **bg-base** | убран | ✅ исправлено |
| Скругление | нет | **radius-s** | убрано | ✅ исправлено |
| Разделитель | bottom 1px #eaeaea | **нет** | border-bottom lines | ✅ исправлено |
| Title размер | 20px (h3) | **15px (M)** | h3 (20px) | ✅ исправлено |
| Title начертание | Regular | **medium** | regular | ✅ исправлено |
| Title letter-spacing | −2% | (нет) | −0.02em | ✅ исправлено |
| Title цвет | #000 | (наследовал) | text-primary | ✅ |
| Meta шрифт | Pixform | **Akkurat** | font-family-pixel | ✅ исправлено |
| Meta размер | 10px | **11px (text-gr)** | 10px | ✅ исправлено |
| Meta letter-spacing | 20% | **0.08em** | 0.2em | ✅ исправлено |
| Meta регистр | UPPER | uppercase | uppercase | ✅ |
| Meta цвет | **#000000** | **secondary + opacity 0.6** | text-primary | ✅ исправлено |
| Дата → вправо | textAlign RIGHT | center-группа | last-child margin-left auto | ✅ исправлено |
| Action справа | последний | margin-left auto | margin-left auto | ✅ |

Checklist: текст ✓ (title 20px Regular −2%; meta Pixform 10px 20% UPPER #000) · иконки — (n/a) · раскладка ✓ (gap 14, дата/действие вправо) · скругление ✓ (нет, bottom-border) · отступы ✓ (14/0).

Overall: ✅

## tokenGap
- Meta font-size 10px: нет точного токена (caps=8, text-gr=11) → литерал `10px`.
- Meta letter-spacing 20% (0.2em): нет точного токена (`--ds-letter-spacing-caps`=0.08em) → литерал `0.2em`.
