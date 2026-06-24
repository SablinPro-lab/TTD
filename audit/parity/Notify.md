# Notify — pixel-parity (Figma node 1:1980 «notify», вариант Default 1:1981)

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Фон | #d4eee7 (card-green) | card-green | card-green | ✅ |
| Радиус | 12px | 4px (s) | radius-l (12) | ✅ |
| Padding | 30px | 14/20 (s/m) | 30px (xl) | ✅ |
| Тень | нет | shadow-2 | удалена | ✅ |
| Раскладка | VERTICAL gap 14px (текст + кнопка) | row, min-height 56 | column gap 14 (s) | ✅ |
| Текст — шрифт | Pixform 30px UPPER | Pixform 15px | Pixform description (30) UPPER | ✅ |
| Текст — letter-spacing | -3% | — | -0.03em | ✅ |
| Текст — цвет | #00867b (text-green) | tech-green (=#00867b) | text-green | ✅ |
| dismiss-действие | белый pill «More info» | children (underline link) | children в .underline, наследует цвет | ✅ |

Примечание: кнопка-pill в Figma — отдельный инстанс `button`; в React действие приходит через `children`
(каталог передаёт ссылку `dismiss`). Стиль ссылки наследует цвет/шрифт текста уведомления.

Checklist: текст ✓ · раскладка ✓ · скругление ✓ · отступы ✓

Overall: ✅


## Доработка D43 («сделай идентично»)
Текст приведён к Figma (длинный Pixform 30px UPPER green, перенос в 2 строки, max-width 770) + добавлена белая pill «More info» (новый проп `action`). Снят min-width. ✅ совпадает.
