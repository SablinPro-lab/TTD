# Pixel-parity: Graph ← Figma `graph` (1:1829)

Figma (inner `Property 1=Default`): HORIZONTAL, counterAxis MAX (по нижнему краю), itemSpacing **2px**,
2 столбца Rectangle шириной 70.5px, cornerRadius 4 (radius-s), цвет **#979797** (text-secondary).
Высоты 82 / 48px (≈ 100% / 58.5%).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Раскладка | flex, align bottom | flex, flex-end | flex, flex-end | ✅ |
| Gap | 2px | **14px (indent-s)** | indent-xxxs (2px) | ✅ исправлено |
| Ширина столбца | 70.5px | 72px | 70px | ✅ ~ок |
| Скругление | 4px | radius-s | radius-s | ✅ |
| Цвет | **#979797** (secondary) | **#000 (black)** | text-secondary | ✅ исправлено |
| Высоты (default) | 82/48 ≈ 100/58.5% | [100, 60] | [100, 60] | ✅ ~ок |

Checklist: текст — (n/a) · форма/блоки ✓ (radius-4, #979797) · раскладка ✓ (gap 2, низ) · скругление ✓ · отступы ✓ (gap 2).

Overall: ✅

## tokenGap
- Ширина столбца 70px (Figma 70.5px) — геометрия, не токенизируется (значения близки).
