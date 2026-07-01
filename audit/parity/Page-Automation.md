# Parity: Page «Automation» (Figma 1:4230) ↔ React `Automation.tsx`

Источник: Figma `ct9b7yfSwULxIG3mIPlSg8`, node **1:4230** (`[deprecated] Automation_mail-editor`).
React: `src/pages/screens/Automation.tsx` + организм `FlowCanvas`. Роут `/pages/automation`. D58.

| Параметр | Figma | React | Статус |
|---|---|---|---|
| Шапка | header + BACK слева + SAVE/DEPLOY справа (builder) | Header + secondRowActions (Back/Save/Deploy) | ✅ |
| Левая панель (350) | «Automation» + input «Marketing funnel» + Node library (7) + Templates (3) | aside 350 + Input + 7 кнопок + 3 пилюли | ✅ |
| Node library — цвета | 3×#f7e0dd · 2×#e0e2a4 · #fad5e7 · #ddd6ef | oncard-red×3 · card-olive×2 · card-pink · card-lavender (DOM-сверено) | ✅ |
| Канва (центр) | 3 ноды (280×115, r8) + 2 нитки (Final Decision) | FlowCanvas: 3 FlowNode + 2 bezier-нитки | ✅ |
| Ноды — цвета | #f5cfca / #ddd6ef / #fad5e7 | red / lavender / pink (DOM-сверено) | ✅ |
| Нитки | чёрные кривые | SVG bezier, stroke #000 1.5px | ✅ |
| Drag-and-drop | — | ноды перетаскиваются (DOM: transform меняется, нитки следуют) | ✅ |
| Соединение нитками | — | drag выход→вход создаёт edge (DOM: 2→3) | ✅ |
| Правая панель (350) | «Node Properties» + input + 2 switch + 4 text_area + Save | aside 350 + Input + SwitchGroup + 4 TextArea + Button | ✅ |
| Отступы/раскладка | панели 350, gap/padding 30 | flex, w-350, gap-ds-xl, p-ds-xl | ✅ |
| overflow | — | 0 (1440) | ✅ |

**Чек:** текст ✓ · цвета ✓ · ноды/нитки ✓ · drag ✓ · соединение ✓ · панели/отступы ✓ · оптимизация (rAF) ✓
**Статус: ✅** — собрана из существующих компонентов + новый организм FlowCanvas. 0 ❌. 0 console errors.

### D59
- Нитки поверх карточек (SVG z-index 10, pointer-events:none) ✅. Добавление нод из библиотеки (клик → addNode, 3→4) и удаление (× на ноде, 4→3, нитки убираются) ✅. Drag/connect работают, overflow 0.

### D60
- Рабочий прототип: grid-канва ✅; DnD из библиотеки (drop в точку курсора, 2→3) ✅; нитки точно к чёрным точкам (wireStart=порт, Y=106) ✅; отключение кликом по проводу (1→0) ✅; «...» → меню Delete (3→2 + нитка) ✅. 0 ошибок.

### D61
- Кружки-порты реактивны: цвет+«поп» при подключении/отключении (→зелёный), пульс целей/источника при протяжке, увеличение наведённой цели ✅ (DOM-сверено). 0 ошибок.

### D62
- Цвет портов: подключён — ярко-чёрный (0,0,0), свободен — серый (151,151,151) как на референсе; зелёный убран, анимация сохранена ✅.

### D63
- Связи на настоящем HTML5 <canvas> (DPR, ResizeObserver, rAF+reduced-motion, токены) ✅; canvas pointer-events:none (порт кликается под ним) ✅; ноды в границах (клампинг) ✅; отключение — hit-test по canvas ✅. Границы: адаптив 3 панелей (стопка <1024) → overflow=0 на 375/768/1440 ✅.

## D67 (2026-07-01) — зазоры и границы нод
- Зазор панель↔канва: **8px** (`indent-xs`) — точь-в-точь Figma Frame 1407 (было 30px «серой рамкой»). Наружные поля страницы — 30px (`indent-xl`). Канва @1440 = 664px = Figma node 1:4253.
- Ноды на канве строго в границах (кламп `[0, W−280]×[0, H−125]`) — не режутся у краёв; overflow канвы `visible`.

## D68 (2026-07-01) — задвиг за панели + сворачивание
- Ноду можно задвинуть за боковые панели (уходит ПОД них); панели z-10 поверх канвы (z-0); вынос клипается рядом (overflow-x:clip), скролла страницы нет.
- Панель Node Properties сворачивается в rail 44px — доп. поведение прототипа (в статичном Figma-макете панель всегда развёрнута; сворачивание — интерактивное расширение, не ломает соответствие развёрнутого состояния).
