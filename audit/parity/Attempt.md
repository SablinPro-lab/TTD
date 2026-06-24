# Attempt — pixel-parity (Figma node 1:1948 «attempt»; Default 1:1949, Variant2 1:1965)

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Фон | белый | on-color | on-color | ✅ |
| Радиус | 12px | 4px (s) | radius-l (12) | ✅ |
| Padding | 30px | 24px (l) | 30px (xl) | ✅ |
| Тень | нет | shadow-1 | удалена | ✅ |
| Gap карточки | 24px | — | 24px (l) | ✅ |
| Верхний лейбл | Pixform 10px UPPER #000 (1 на карточку) | per-offer 8px caps | top label из offers[0].label, Pixform text-gr | ✅ |
| Раскладка | ряд [левый оффер \| статус \| правый], SPACE_BETWEEN gap 60 | 2-col grid + absolute status | flex-row + order, статус по центру | ✅ |
| Статус | по центру, верт. отцентрован | absolute top | order:2, align center | ✅ |
| Сумма | Instrument Serif 40px ls -1% | display 30px | display 40px ls -1% | ⚠️ (40px override) |
| Правая сумма/перки | выравнивание вправо | text-align right | align-items flex-end + right | ✅ |
| amount↔perks gap | 14px | 8px (xs) | 14px (s) | ✅ |
| Перки | Pixform 10px UPPER #979797 ls 20% | 8px caps secondary opacity .7 | Pixform text-gr secondary | ✅ |
| perks gap | 8px | 1px | 8px (xs) | ✅ |
| Variant2 (next attempt) | без статуса, `$?` | поддержан (status опц.) | поддержан | ✅ |

Checklist: текст ✓ · раскладка ✓ · скругление ✓ · отступы ✓

## tokenGap
- Сумма 40px (Instrument Serif): нет токена между description(30) и h1(84). Использован literal `40px`.

Overall: ⚠️ (один tokenGap — 40px сумма)


## Доработка D43 («карточка не такая»)
Демо приведено к Figma: верх-метка FIRST ATTEMPT, левый оффер $8 750 (Lead role/Cookies/Free education), центр • FAILED, правый $12 750 (Lead role/Remote-work/Gym, выравнивание вправо). Структура [offer|status|offer] подтверждена. ✅ совпадает.

## Доработка D43.1 («FAILED висит ниже»)
Ряд выравнивался по центру → статус опускался к перкам. Исправлено: align-items ряда flex-start (Figma cnt=MIN) + статус отцентрован по высоте суммы (40px). Центр FAILED = центр $-суммы (delta 0px). ✅
