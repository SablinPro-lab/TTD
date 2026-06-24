# CardMetrica — pixel-parity (Figma node 1:1942 «card_metrica», вариант Default 1:1943)

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Фон | белый | on-color | on-color | ✅ |
| Радиус | 12px | 4px (s) | radius-l (12) | ✅ |
| Padding | 30px | 20px (m) | 30px (xl) | ✅ |
| Ширина | 181 (fixed) | 160 | 181 | ✅ |
| Gap title↔value-block | 90px | 24px (l) | 90px (xxl) | ✅ |
| Заголовок | Instrument Serif 40px ls -1% | display 20px | display 40px ls -1% | ⚠️ (40px override) |
| Значение | Instrument Serif 84px lh 90% ls -1% | display 56px | h1 (84) lh .9 ls -1% | ✅ |
| Подпись под значением | Pixform 10px UPPER «Total received» | отсутствовала | добавлен проп `caption` | ✅ |
| value↔caption gap | 8px | — | 8px (xs) через __block | ✅ |

Checklist: текст ✓ · раскладка ✓ · скругление ✓ · отступы ✓ · добавлен недостающий sub-element (caption)

## tokenGap
- Заголовок 40px (Instrument Serif): нет токена между description(30) и h1(84). Использован literal `40px`.

Overall: ⚠️ (один tokenGap — 40px заголовок)


## Доработка D43 («съехала карточка»)
Заголовок «Applications» (одно длинное слово) вылезал за узкую карточку 181px. Добавлен `overflow-wrap: anywhere` → переносится по символам (Applicati/ons), как в Figma. Ширина 181 / заголовок 121 / 2 строки, без overflow. ✅ совпадает.
