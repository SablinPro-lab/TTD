# Pixel-parity: ErrorBanner ← Figma `error` (1:1778)

Figma (inner `Property 1=Default`): HORIZONTAL, align MIN/MIN (по верху), bg #f7e0dd (oncard-red),
cornerRadius 4 (radius-s), padding 8px со всех сторон, itemSpacing 14px.
Текст: Akkurat LL Cyr TT **Regular**, fontSize **8px** (caps), letterSpacing **20%**, textCase UPPER,
цвет #cc0000 (tech-red). Тени НЕТ.
Лейбл «error!» + сообщение «add more money for salary, …».

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Фон | #f7e0dd (oncard-red) | oncard-red | oncard-red | ✅ |
| Скругление | 4px | radius-s | radius-s | ✅ |
| Padding | 8px (все) | **14px / 20px** | indent-xs (8px) | ✅ исправлено |
| Gap | 14px | indent-s (14px) | indent-s | ✅ |
| Выравнивание | top (flex-start) | **center** | flex-start | ✅ исправлено |
| Размер шрифта | 8px (caps) | **11px (text-gr)** | caps (8px) | ✅ исправлено |
| Начертание | Regular | **label medium** | regular (оба) | ✅ исправлено |
| Letter-spacing | 20% (0.2em) | **0.08em (caps)** | 0.2em | ✅ исправлено |
| Регистр | UPPER | uppercase | uppercase | ✅ |
| Цвет | #cc0000 (tech-red) | tech-red | tech-red | ✅ |
| Тень | нет | **shadow-1** | убрана | ✅ исправлено |

Checklist: текст ✓ (8px Regular, l-s 20%, UPPER, #cc0000) · иконки — (n/a) · раскладка ✓ (top, gap 14) · скругление ✓ · отступы ✓ (8px).

Overall: ✅

## tokenGap
- letter-spacing 20% (0.2em): нет точного токена (`--ds-letter-spacing-caps` = 0.08em) → задано литералом `0.2em`.
