# Parity: Page «All teams» (Figma 1:4010) ↔ React `AllTeams.tsx`

Источник: Figma `ct9b7yfSwULxIG3mIPlSg8`, node **1:4010**. React: `src/pages/screens/AllTeams.tsx` (+ `PageFrame.tsx`).
Обновлено D46 (исправлены расхождения hero + сетки команд).

| Параметр | Figma | React | Статус |
|---|---|---|---|
| Header + крошки | Hired & Wired / Generate report / tabs / Profile·Log out / Home•Something•Something | PageFrame → Header | ✅ |
| Кнопка «Назад» | Back-pill в ряду крошек | SecondRow back: стрелка + «Back» + aria-label, hover/focus/active | ✅ |
| Hero (glass) | фото-стекло, затухает в bg-base | CardTop variant=glass (cardtop-glass.jpg + gradient fade) | ✅ |
| **Hero порядок** | title → subtitle → **ADD TEAM** (центр); **switch_group внизу** (y410, gap 160) | footer=ADD TEAM в hero-блоке; segmented=SwitchGroup отдельным блоком внизу (gap 160) | ✅ исправлено (был обратный порядок) |
| Метрики (4) | Health/Productivity/Distribution/Hiring + мини-график (bg-base) + caps-caption | 4× CardMetric (red/lavender/green/olive), graph bg-base, captions точные | ✅ |
| **Сетка команд** | **6 идентичных** «Engineering Team» (24 people · 89% · «Petya…» · +21 more) | 6 идентичных Team-клонов | ✅ исправлено (были 6 разных) |
| Отступы | content 830px, gap 4 (ds-xxs) | -mx-ds-l + gap-ds-xxs, grid-cols-4 / grid-cols-2 | ✅ |
| Скругление | radius L (12) | rounded-l токен | ✅ |

**Чек:** текст ✓ · изображения ✓ · dropdowns (SwitchGroup) ✓ · раскладка ✓ · скругление ✓ · отступы ✓
**Статус: ✅** — 0 ❌.

### D47
- Цвета метрик из палитры: Health=card-red, Productivity=card-pink, Distribution=card-lavender, Hiring=card-olive ✅
- Бар команды — tone=green (#00867b/#d4eee7) ✅. Hero glass 830×480 cover (полноширинный) ✅.
