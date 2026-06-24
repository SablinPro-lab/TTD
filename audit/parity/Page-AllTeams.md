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

### D48
- Метрики: столбики → капсульный индикатор (progress-pill, трек белый + заполнение чёрное), caption снизу ✅. Шапка (glass-hero 1:4013) — совпадает ✅.

### D49
- CardMetric: график (Graph, бары bg-base) вместо капсулы — точь-в-точь Figma 1:1936 ✅. Hero-фон (стекло) на месте, object-fit cover ✅. Бары везде — mask, без обрезки ✅.

### D50
- Full-size hero (1:4013): фон во ВСЮ ширину страницы (full-bleed 1440, image cover), заголовок/сабтайтл/Add team/табы центр — не «карточка-блок» ✅ (DOM hero w=1440, left=0, radius 0; скрин подтверждён).
- Метрики (1:4015-4018): graph — широкие чанковые плитки (DOM 71×67 / 71×40), карточка 205×195, uniform [100,59]; исправлен h-full, ломавший высоту ✅. Цвета палитры (red/pink/lavender/olive) ✅.
- Аватары команд: серый #979797 + белый person, единообразно (dog убран) ✅.

### D51
- Регрессия overflow устранена: hero — w-full слот (НЕ 100vw), правого отступа/гориз.скролла нет (DOM overflow=0 на 1280/900/600) ✓.
- Hero центр восстановлен (DOM: центр имени == центр вьюпорта) ✓; фон — чистое фото cover без overlay/блюра (1:4013) ✓; белая линия-разделитель под топ-навом возвращена ✓.
- Скролл доходит до конца ✓.

### D52
- Адаптив/скролл: убран overflow-x-clip (скролл документом, не контейнером); убрана белая линия под топ-навом (откат хедера); сняты фикс min-width + переносы. DOM: overflow=0 на 1440/1024/900/768/375; десктоп-вид как в Figma ✅.

### D53
- Шапка прозрачная (фон убран), отступы плотнее 20% (токены); Back — зелёный (text-green). CardTop Variant2 (glass) от САМОГО ВЕРХА (top=0, 100%, вне main); шапка поверх на десктопе (≥768) / в потоке на мобиле. DOM: десктоп overlay+overflow0, мобайл без наложения+overflow0 ✅.
