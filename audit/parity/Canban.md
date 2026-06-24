# Canban (Pipeline) — parity Figma ↔ React

Источник: Figma → ds-organisms → `canban` (node **1:2048**, 1440×667).
Новый организм — раньше отсутствовал в React («не видел на превью»), добавлен (D43).

## Структура (Figma)
- Серифный заголовок **«Pipeline»** (Instrument Serif 84px, по центру) над бордом.
- Белая карточка (radius 12, padding 30), внутри — горизонтальный ряд колонок-стадий с разделителями.
- Колонка (Frame 1400, 312px, gap 20): шапка [название (Serif 40) · счётчик (Serif 40, серый #cbcbcb)] + список строк (gap 2).
- Строка-человек: серая пилюля (control-secondary, radius 8, padding 14) — аватар 30 · имя (15px) · роль (Pixform 10 UPPER).

## Diff

| Параметр | Figma | React | Статус |
|---|---|---|---|
| Заголовок | Instrument Serif 84, центр | `--ds-font-family-display` h1, center | ✅ |
| Карточка | white, r12, pad30 | control-on-color, radius-l, indent-xl | ✅ |
| Колонка | 312px, gap20, разделители | width 312, gap indent-m, border-left lines | ✅ |
| Шапка колонки | name Serif40 + count Serif40 gray | display h2 + gray | ✅ |
| Строка | gray pill r8, avatar30·name·role | control-secondary radius-m, Avatar 30 + Pixform role | ✅ |
| Данные | Applied4/Screening6/Interview3/Offer1 + люди | те же имена/роли/счётчики | ✅ |

**Чек:** текст ✓ · иконки (аватары-силуэты) ✓ · раскладка ✓ · скругление ✓ · отступы ✓
**Статус: ✅** — добавлен и приведён к макету.
**Адаптив:** по требованию НЕ сжимается — борд в натуральную figma-ширину (на узком экране уходит за вьюпорт, как в макете).
