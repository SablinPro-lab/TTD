# CampaignPreview — pixel-parity (Figma node 1:1884, вариант Default 1:1885)

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Фон | белый | white (on-color) | on-color | ✅ |
| Радиус | 12px | 4px (s) | radius-l (12) | ✅ |
| Padding | 30px | 20px (m) | 30px (xl) | ✅ |
| Тень | нет | shadow-1 | удалена | ✅ |
| Gap head↔metrics | 90px | 24px (l) | 90px (xxl) | ✅ |
| Заголовок | Instrument Serif 40px ls -1% | display 20px | display 40px ls -1% | ⚠️ (40px override) |
| head aside gap | 14px | 20px (m) | 14px (s) | ✅ |
| Метрики — раскладка | SPACE_BETWEEN, value над label | gap 30 | SPACE_BETWEEN | ✅ |
| Значение | Instrument Serif 84px lh 90% ls -1% | display 30px | h1 (84) lh .9 | ✅ |
| value↔label gap | 8px | 4px (xxs) | 8px (xs) | ✅ |
| Подпись | Akkurat 8px UPPER ls 20% | Akkurat 8px opacity .6 | caps (8) UPPER, без opacity | ✅ |

Checklist: текст ✓ · раскладка ✓ · скругление ✓ · отступы ✓

## tokenGap
- Заголовок 40px (Instrument Serif): нет токена между description(30) и h1(84). Использован literal `40px`. theme.css не трогался.

Overall: ⚠️ (один tokenGap — 40px заголовок)


## Доработка D43 (по фидбэку «доделана не до конца»)
В Figma 5 метрик — добавлены: 142 Applied · 89 Rejected · 282 In progress · 31 Final round · 4 Offers sent (числа Instrument Serif 84px, лейблы Akkurat 8px). Демо обновлено. ✅ совпадает.
