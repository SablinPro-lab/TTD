# Pixel-parity audit — CardTop

Figma: `card_top` (1:3744) — variant `Default` (1:3745, 830×480), `Variant2` (1:3768, фото-фон).

Структура Figma (VERTICAL SPACE_BETWEEN, pad 30, radius 12, yellow #ffb700):
1. Frame 1700 — углы TEAMS / ACCESS (Pixform 10 UPPER ls20% brown #d1a63b).
2. Frame 1698 — hero: имя (Instrument Serif 84) + роль (Pixform 30 UPPER gold) + 4 белые пилюли.
3. Frame 1699 — нижние ряды brown-тегов с иконкой ↓ + «Add» (лево/право, SPACE_BETWEEN).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| card radius | 12 (L) | 4 (S) | 12 (L) | ✅ |
| card bg | #ffb700 | accent (super-yellow) | accent | ⚠️ |
| card padding | 30 | head pad L(24) | 30 (XL) | ✅ |
| углы | TEAMS/ACCESS Pixform 10 UPPER brown | 8px caps, opacity .7, наследуемый цвет | Pixform 11px UPPER brown | ✅ |
| имя | Instrument Serif 84px, lh90%, ls-1%, центр | display 30px (description), left | display 84px (h1), lh.9, ls-1%, центр | ✅ |
| роль/подзаголовок | Pixform 30px UPPER ls-3% gold, центр | 11px caps uppercase, opacity .8 | Pixform 30px UPPER gold, центр | ✅ |
| действия (пилюли) | белые, radius 999, Pixform 10 UPPER ЧЁРНЫЙ, gap 2, центр | brown заливка, белый текст, radius S(4), gap XS | белые radius 999, чёрный Pixform, gap XXXS(2) | ✅ |
| нижние теги | brown #d1a63b box radius 4 + белый Pixform + иконка ↓; «Add» круглая | ОТСУТСТВОВАЛИ | добавлены (tags/tagsRight + onTag) | ✅ |
| тег-иконка | SF Symbol ↓ (arrow.down.to.line) 16px белый | — | inline SVG ↓ 16px currentColor | ✅ |
| раскладка тегов | лево/право SPACE_BETWEEN, wrap | — | tags space-between, group wrap | ✅ |
| shadow | (есть в карточке) | shadow-2 | shadow-2 | ✅ |

Checklist: текст ✓ · иконки ✓ (тег ↓ добавлен) · раскладка ✓ · скругление ✓ · отступы ✓

## Key fixes
1. Имя: 30px left → Instrument Serif 84px (h1), lh 90%, ls -1%, по центру.
2. Подзаголовок-роль: переведён в gold Pixform 30px UPPER ls -3% по центру (был мелкий caps).
3. Action-пилюли: brown→белые, radius S→999 (pill), текст→чёрный Pixform; gap 2.
4. Добавлены целые отсутствовавшие нижние ряды brown-тегов (FRONTEND-TEAM/INNOVATION LAB/LEAD DEVELOPER/MEMBER + LEVEL 4 (CODE RED)) с иконкой-стрелкой и кнопками «Add» — новые опциональные пропы `tags`, `tagsRight`, `onTag` (+ опц. `headline` у тега).
5. Card radius 4→12, padding L→XL(30), углы — Pixform brown UPPER.

Обратная совместимость: пропы `name/role/cornerLeft/cornerRight/actions/onAction/accent` сохранены; добавлены только опциональные.

## tokenGap
- Card bg #ffb700 — нет точного токена; `--ds-color-accent` (=super-yellow #ffe900) ближайший жёлтый. Не вводили новый токен (запрещено).
- Pixform 10px и углы 10px — нет 10px-токена; используется `--ds-font-size-text-gr` (11px) как ближайший.
- Имя 84px = `--ds-font-size-h1` (точно). Роль 30px = `--ds-font-size-description` (точно).

Overall: ⚠️ (только цвет фона #ffb700 vs токен super-yellow #ffe900; структура/типографика приведены к Figma)


## Доработка D43 («проверь карточку и элементы»)
Элементы сверены: углы TEAMS/ACCESS, имя Instrument Serif 84 центр, роль gold Pixform 30, белые pill PROMOTE/NEGOTIATE/SUSPEND/FIRE, нижние ряды gold-тегов + Add. Добавлена радиальная текстура фона (в макете жёлтый с мягкими пятнами). ✅ элементы совпадают (фон — аппроксимация градиентами, image-fill из макета не бандлится).
