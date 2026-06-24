# Parity: Page «All teams one» (Figma 1:4071) ↔ React `AllTeamsOne.tsx`

Источник: Figma `ct9b7yfSwULxIG3mIPlSg8`, node **1:4071**. React: `src/pages/screens/AllTeamsOne.tsx` (+ `PageFrame.tsx`).
Обновлено D46 (исправлены статусы/роли в списке команды).

| Параметр | Figma | React | Статус |
|---|---|---|---|
| Header + крошки + «Назад» | как 4010 + Back-pill | PageFrame → Header + SecondRow back | ✅ |
| Hero (glass) | «Engineering Team» + «Detailed team overview…» + switch_group (Team/Campaigns/Access) внизу | CardTop variant=glass + segmented внизу | ✅ |
| Notify | зелёный, «Kai finished the UI designs…», без кнопки | Notify без action | ✅ |
| Секция «Team» | белая карточка, сериф-заголовок + список из 10 строк | section + 10× Profile variant=long | ✅ |
| **Строки (имя·роль·статус)** | Sarah Johnson·Senior Developer·**On Track**; Michael Smith·Product Manager·**Rocket Growth**; Emily Davis·UX Designer·On Track; David Brown·QA Engineer·**Rocket Growth**; Linda Garcia·Data Analyst·On Track; James Wilson·Software Engineer·**Failing**; Alice Thompson·Marketing Specialist·On Track; Robert Martinez·Sales Executive·**Failing**; Jessica Taylor·Content Strategist·On Track; Charles Lee·Systems Analyst·**Failing** | те же 10 строк, статусы: On Track→green, Rocket Growth→purple, Failing→red | ✅ исправлено (были все «On Track» green + неточные роли) |
| Отступы/скругление | 830px, gap 2 (ds-xxxs) строки, radius L | gap-ds-xxxs, rounded-l | ✅ |

**Чек:** текст ✓ · изображения (аватары) ✓ · dropdowns (SwitchGroup) ✓ · раскладка ✓ · скругление ✓ · отступы ✓
**Статус: ✅** — 0 ❌.

### D47
- Прогресс-бары строк — tone=green (#00867b/#d4eee7), строго из палитры ✅.

### D48
- Список Team: ровная сетка — статусы и точечные бары выстроены по колонкам (статус 150px, бар flex; DOM: status x=562, bar x=732, w=310) ✅.

### D50
- Full-size hero (1:4013): glass full-bleed во всю ширину (DOM left=0, без оверфлоу), заголовок «Engineering Team» центр ✅.
- Аватары списка Team — серый #979797 + чёткий person, единообразно ✅.
