# NOTES — Stage 1: PREPARE

Release notes этапа подготовки дизайн-системы (Figma ↔ React). Записи по ходу, сверху — новые шаги внутри этапа идут по порядку 0→4.

Файл Figma: `ct9b7yfSwULxIG3mIPlSg8` («Тестовая дизайн-система»).
Стадии всего проекта: **Prepare (текущая)** → Styles → Atoms → Molecules → Organisms.

---

## [Шаг 0] Проверка соединения — checked — 2026-06-23 19:11

**Сделано:** прочитал Figma-файл через MCP (`use_figma`), вывел сводку.
**Результат — соединение работает:**
- `figma.root.name` = `Document`; отображаемое имя файла (из URL/контекста) = «Тестовая дизайн-система». (Рассинхрон имени — см. DECISIONS D15.)
- Страниц: **2** — `Page 1` (6 верхнеуровневых детей: 5 секций), `Release Notes` (создана на прошлом этапе; counter детей у не-текущей страницы = 0 из-за ленивой загрузки страниц, не баг).
- Секции на Page 1: `ds-atoms`, `ds-molecules`, `ds-organisms`, `design`, `styles`.
- Компонент-сетов: **33** (на прошлом этапе мигрировано 32 = 16+10+6; 33-й найду в инвентаризации — вероятно в `design`/`styles`).
- Вариантов (COMPONENT): **74**.
- Локальные стили: paint **0**, text **0**, effect **0**, grid **0**.
- Локальные переменные/коллекции: **0 / 0**.

**Решение/находка (критично для Styles):** при пустых локальных стилях и переменных `get_variable_defs`
ранее возвращал токены (`Color/*`, `font/*`, `indents/*`…). Вывод: токены — **remote (внешняя библиотека)**,
а секция `styles` в файле — ручная визуальная доска токенов, не Figma Variables/Styles. Подтвержу в Шаге 1.
**Затронуто:** только чтение. **Осталось:** полная инвентаризация (Шаг 1).

---

## [Шаг 1] Инвентаризация — added — 2026-06-23 19:14

**Сделано:** полная опись Figma + React, маппинг, снапшот для отката.
**Файлы:** `audit/inventory.json`, `audit/inventory.md`, `audit/gaps.md`,
`audit/figma-raw.json`, `audit/figma-snapshot.before-prepare.json` (rollback).
**Результат:**
- 33 компонент-сета (32 UI + 1 токен-сет `indents` 1:4478 в секции `styles`), 74 варианта.
- Маппинг Figma↔React: **общих 32**, только-Figma **1** (`indents` — токен, в React не компонент),
  только-React **0**.
- **Стили изучены:** локальных стилей/переменных нет; токены — **remote-библиотека** (проба:
  `btn.paddingLeft` → `indents/S (inner)`, `remote:true`). Доска `styles` = ручные визуалы
  (Colors=эллипсы, Typography=таблица, indents=компонент-сет).
**Решения:** D15 (имя файла), D16 (`indents` — токен, не мигрируем), D17 (remote-токены → этап Styles),
D18 (rollback-снапшот в `audit/`, т.к. `.figma-snapshot.json` занят figma-sync).
**Затронуто:** только чтение + новые файлы в `audit/`. **Осталось:** нейминг (Шаг 2).

---

## [Шаг 2] Нейминг — renamed — 2026-06-23 19:18

**Сделано:** зафиксирована конвенция (DECISIONS D19), применены ренеймы в Figma.
**Затронуто (Figma, 7 сетов):** btn→button, switch group→switch_group, card metric→card_metric,
Cards metrica→card_metrica, card top→card_top, attemt→attempt (опечатка), second-row→second_row.
**React:** ренеймов нет (уже PascalCase). Обновлены `.figma-snapshot.json` (figmaName),
`audit/figma-raw.json`, `audit/inventory.*`. Лог — `audit/renames.md`.
**Решения:** D19 (конвенция; нормализация variant-props отложена на этапы компонентов).
**Откат:** имена до изменений — в `audit/figma-snapshot.before-prepare.json`.
**Осталось:** дубликаты (Шаг 3).

---

## [Шаг 3] Дубликаты — deprecated — 2026-06-23 19:24

**Сделано:** поиск дублей/почти-дублей и черновиков; пометка `[deprecated] ` (без удаления — обратимо).
**Компонент-сеты:** дубликатов НЕТ (имена уникальны).
**Секция `design` (27 фреймов):** помечено deprecated **15**:
- 6 черновиков (Frame 1450/1451/1452/1453/1454, `::`);
- 9 неканонических дублей экранов: Hiring_campaign ×2, All_teams_campaigns ×2, Candidate ×1,
  All_teams ×2, Automation_mail-editor ×2.
**Канон оставлен (по макс. высоте):** Hiring_campaign `1:4144`, All_teams_campaigns `1:3847`,
Candidate `1:3874`, All_teams `1:4050`, Automation_mail-editor `1:4188`.
**Решение:** не удаляю (контентное удаление необратимо снапшотом) → deprecate-префикс (D20).
**Лог:** `audit/duplicates.md`. **Откат:** `audit/figma-snapshot.before-prepare.json` → `designFrames`.
**Осталось:** структура (Шаг 4).

---

## [Шаг 4] Структура — changed — 2026-06-23 19:28

**Сделано:** приведение структуры под этапы Styles→Atoms→Molecules→Organisms.
**Figma:** секции к единому префиксу — `styles`→`ds-styles`, `design`→`ds-screens`
(итого: ds-atoms, ds-molecules, ds-organisms, ds-screens, ds-styles).
**React:** добавлены слои-barrel `components/{atoms,molecules,organisms}.ts`, `index.ts` собирает их.
Физический перенос папок отложен (D21). Сборка зелёная — 172 модуля.
**Файлы:** `audit/structure.md`, `src/components/{atoms,molecules,organisms}.ts`, обновлён `index.ts`.
**Решения:** D21 (структура; перенос папок отложен).
**Осталось:** финальный summary.

---

## [ИТОГ ЭТАПА] Prepare завершён — 2026-06-23 19:30

**Проверено:** Figma MCP отвечает; файл «Тестовая дизайн-система», 2 страницы, 5 секций,
33 компонент-сета (32 UI + 1 токен-сет), 74 варианта, 32 React-компонента; gaps 32/1/0.
**Переименовано:** Figma 7 сетов (snake_case, фикс опечатки) + 2 секции (ds-styles, ds-screens);
React — без ренеймов (уже PascalCase).
**Дубликаты:** компонент-сетов нет; в `ds-screens` помечено `[deprecated]` 15 фреймов
(6 черновиков + 9 неканонических дублей), каноны выбраны.
**Удалено/смёржено:** ничего не удалено (deprecate-стратегия, D20); merge не потребовался.
**Стили:** изучены — токены remote-библиотека (D17), `theme.css` — их зеркало.
**Артефакты:** `audit/{inventory.json,inventory.md,gaps.md,renames.md,duplicates.md,structure.md,figma-raw.json,figma-snapshot.before-prepare.json}`.
**Готовность к этапу Styles:** ДА. Стартовая точка Styles — секция `ds-styles` + remote-переменные
(подключить/прочитать библиотеку, сверить с `theme.css`).

---
---

# Stage 2: STYLES

Цели (самоопределены): извлечь каталог токенов из remote-библиотеки → сверить с theme.css →
закрыть расхождения → задокументировать + снимок токенов. Источник правды — remote Variables.

## [S1] Извлечение токенов — added — 2026-06-23 19:40

**Сделано:** `get_variable_defs` по секциям ds-styles + ds-atoms/molecules/organisms, собран каталог.
**Файл:** `audit/tokens.figma.json`.
**Находка (критично):** актуальные токены ≠ значения в `theme.css` (тот заполнялся по устаревшему
чтению «всё Inter»). Реально: 3 семейства (Antiqa=Instrument Serif, Grotesk=Akkurat LL Cyr TT,
Pixel=Pixform); bg-base #f2f2f2; text-secondary #979797; tech-green #00867b (тил); rounds/Over=999;
indents XXL=90; + палитра карточек, superYellow, lines, brown; font h1=84; size base-width=830.

## [S2] Сверка theme.css ↔ Figma — changed(plan) — 2026-06-23 19:41

**Сделано:** диф зафиксирован — `audit/tokens.diff.md`.
**Итог:** 8 неверных значений, ~18 отсутствующих токенов, 1 уточнение (accent→superYellow).
Имена существующих `--ds-*` не меняю (используются компонентами) — правлю значения + добавляю новые.
**Осталось:** обновить theme.css (S3).

## [S3] Обновление theme.css — changed — 2026-06-23 19:45

**Сделано:** theme.css переписан как зеркало remote-библиотеки. Имена `--ds-*` сохранены,
значения исправлены (8), добавлены новые токены (~18), 3 семейства шрифтов с фолбэками.
**Затронуто:** `src/styles/theme.css` (значения tokens — влияет на визуал всех компонентов:
bg #f2f2f2, secondary-текст серый, green→тил, pill-радиус 999). Сборка зелёная (173 модуля).
**Решения:** D22.

## [S4] Foundations + снимок токенов — added — 2026-06-23 19:46

**Сделано:** витрина токенов в доках + машинный снимок токенов.
**Файлы:** `src/foundations/Foundations.docs.mdx` (группа «Основы», роут `/docs/foundations`),
обновлён `src/pages/Docs.tsx`, создан `.figma-tokens.json` (снимок для синка Styles),
`audit/tokens.figma.json`, `audit/tokens.diff.md`. Release-notes: +2 (Tokens changed, Foundations added).
**Проверено визуально:** страница Foundations рендерит шрифты/кегли/цвета/отступы/радиусы.

## [ИТОГ STAGE STYLES] — 2026-06-23 19:47

**Извлечено:** полный каталог токенов из remote-библиотеки. **Исправлено:** 8 неверных значений
в theme.css + добавлено ~18 токенов + 3 семейства шрифтов. **Документировано:** /docs/foundations,
снимок `.figma-tokens.json`. **Сборка:** зелёная (173 модуля). **Готовность к Atoms:** ДА —
токены верные; компоненты уже на var(--ds-*), визуал автоматически подтянул новые значения.

---
---

# Stage 3: ATOMS

Цель: сверить 16 атомов React↔Figma с корректными токенами, починить расхождения.

## [Atoms] Сверка и фиксы — changed — 2026-06-23 19:50

**Сделано:** эталон секции `ds-atoms` (корректные токены) → сверка с React.
**Фиксы (3):** Dropdown onColor→brown; Button big→serif, node→oncard-red; ErrorBanner→oncard-red.
**Проверено:** /docs/dropdown — onColor коричнево-золотой ✓; bg #f2f2f2, тил-green ✓ (Home).
**Остальные 13 атомов** — корректны без правок (на токенах). Сборка зелёная. Release-notes +3.
**Решения:** D23. **Осталось:** Molecules (Stage 4), Organisms (Stage 5).

---
---

# Stage 4: MOLECULES

## [Molecules] Сверка и фиксы — changed — 2026-06-23 19:56

**Сделано:** эталон секции `ds-molecules` (корректные токены) → сверка.
**Паттерн:** крупные дисплейные значения — **сериф** (Instrument Serif).
**Фиксы:** CampaignPreview title+value→serif; CardMetrica title+value→serif; Attempt amount→serif;
FlowNode фон→oncard-red (розовая нода); Notify→card-green + tech-green + pixel-шрифт (success).
**Не трогал:** Profile/Team/CardMetric/Project/Experience — корректны (на токенах). Сборка зелёная.
**Осталось:** Organisms (Stage 5).

---
---

# Stage 5: ORGANISMS

## [Organisms] Сверка и фиксы — changed — 2026-06-23 20:00

**Сделано:** эталон секции `ds-organisms` → сверка.
**Фиксы:** TopMenu логотип→сериф; CardTop имя→сериф, пилюли→brown(#d1a63b)+белый текст;
заголовки экранов (.ds-screen h1/h2)→сериф. CardTop accent уже superYellow (Stage Styles).
**Не трогал:** SecondRow/Header/Task/MenuSwitch — корректны (Task наследовал розовый ErrorBanner). Сборка зелёная.
**Решения:** D24 (дисплейная типографика = сериф — системно).

---
---

# ✅ ВСЕ 5 ЭТАПОВ ЗАВЕРШЕНЫ — 2026-06-23 20:02

| Этап | Итог |
|---|---|
| 1 Prepare | инвентаризация, нейминг (7 Figma-ренеймов), дубликаты (15 deprecated), структура (ds-* секции, React-слои) |
| 2 Styles | токены из remote-библиотеки, theme.css исправлен (8 значений + ~18 новых + 3 шрифта), Foundations + .figma-tokens.json |
| 3 Atoms | 3 фикса (Dropdown brown, Button serif/node, ErrorBanner pink) |
| 4 Molecules | serif-дисплей (CampaignPreview/CardMetrica/Attempt), FlowNode pink, Notify green/pixel |
| 5 Organisms | TopMenu/CardTop serif, пилюли brown, заголовки экранов serif |

**Сборка:** зелёная. **Визуально проверено:** Foundations, Dropdown, экран Hiring Campaign — совпадает с Figma.
**Журналы:** NOTES.md (запись по каждому шагу), DECISIONS.md (D15–D24), audit/* (8 файлов + tokens).

---
---

# Доработки: Dropdown + Live layout — 2026-06-23 20:10

## [Dropdown] раскрытие вниз — changed
Нативный select → кастомное меню (position:absolute top:100%), вниз под контролом; Esc/клик-вне,
aria listbox/option, поворот шеврона. Проверено геометрией (menuTop ≥ controlBottom, 4 опции под контролом).

## [LiveApp] живой адаптивный макет — added
`/live` («Макет») — responsive-дашборд из компонентов ДС. Десктоп проверен скриншотом;
мобайл 390px — проверено: колонки схлопываются (two-col→1, metrics→1), hero стопкой, без оверфлоу.

## [Layout] адаптивная шапка — fixed
`.ds-layout__header/__nav` — flex-wrap + media(≤640px). Был оверфлоу навигации на мобайле (536px) — устранён.

Сборка зелёная. Решения: D25, D26.

---
---

# Интерактивные доки — «живые варианты живые» — 2026-06-23 20:20

## [Docs] интерактив — changed
Секции «Живые варианты» в *.docs.mdx обёрнуты в stateful `Demo` (useState). Контролируемые
компоненты переключаются; дисплейные — пикеры/слайдеры/счётчики. CardTop: добавлен onAction.
**Затронуто:** ~18 .docs.mdx + CardTop.tsx (onAction).
**Проверено:** /docs/switch — клик переключает aria-checked true→false (живой). Сборка зелёная (187 модулей).
**Решения:** D27.

---
---

# Шрифты привязаны — 2026-06-23 20:22

**Было:** только имена семейств + фолбэк-стек (D22), реальные шрифты не подключены → рендер фолбэком.
**Стало:** пользователь установил шрифты в систему. Family-имена точно совпадают с CSS
(`Akkurat LL Cyr TT`, `Instrument Serif`, `Pixform`), реальные имена первыми в стеке → используются.
В `index.html` подключены свободные Inter + Instrument Serif (Google Fonts) как портативный фолбэк;
в body/pixel-стек добавлен Inter. `@font-face` не нужен (файлов в репо нет).
**Проверено:** `document.fonts.check` = true для всех 4 семейств; canvas-замер — текст рендерится
настоящими шрифтами (Instrument Serif 184px, Akkurat 257px ≠ monospace 307px), не фолбэком.
**Решения:** D22 (обновлён), D28. Сборка зелёная.

---
---

# Stage PREPARE (v2): + Tailwind + Preview — 2026-06-23 22:28

Повторный прогон Prepare с двумя новыми целями: Tailwind (шаг 1) и превью-страница (шаг 6).
Шаги 0/2–5 в основном выполнены в первом проходе Prepare — пере-проверяю и обновляю audit.

## [Шаг 0] Проверка соединения — checked — 2026-06-23 22:28
Figma MCP отвечает. Файл «Тестовая дизайн-система» (root.name=Document), 2 страницы
(Page 1, Release Notes), секции: ds-atoms, ds-molecules, ds-organisms, ds-screens, ds-styles
(переименованы в прошлом проходе). 33 компонент-сета, 74 варианта. Локальных стилей/переменных 0
(токены — remote-библиотека). Состояние прошлого Prepare сохранилось.

## [Шаг 1] Tailwind — added — 2026-06-23 22:30
**Сделано:** установлены tailwindcss@3.4 + postcss + autoprefixer; созданы `tailwind.config.js` и
`postcss.config.js` (ESM); `theme.extend` замаплен на токены `--ds-*` (colors/fontFamily/fontSize/
spacing/borderRadius/letterSpacing/maxWidth); директивы в `src/styles/global.css`; preflight выключен.
**Затронуто:** package.json, tailwind.config.js, postcss.config.js, src/styles/global.css.
**Решения:** D29. **Проверка:** сборка зелёная (CSS 32→35KB — утилиты добавились). **Осталось:** инвентаризация (Шаг 2).

## [Шаг 2] Инвентаризация — checked — 2026-06-23 22:31
Регенерирован `audit/inventory.json` из текущего состояния: 33 компонент-сета (32 UI + токен `indents`),
74 варианта, 32 React-компонента. Маппинг: общих 32, только-Figma 1 (indents), только-React 0.
Файлы audit на месте (inventory/gaps/renames/duplicates/structure/tokens.*). Стили — remote-библиотека (D17/D22).

## [Шаг 3] Нейминг — verified — 2026-06-23 22:31
Конвенция D19 применена в прошлом проходе (7 ренеймов Figma: button/switch_group/card_metric/card_metrica/
card_top/attempt/second_row; React — PascalCase). `audit/renames.md` актуален. Новых несоответствий нет —
ренеймов не требуется.

## [Шаг 4] Дубликаты — verified — 2026-06-23 22:31
Дубликатов компонент-сетов нет. В `ds-screens` 15 фреймов помечены `[deprecated]` (6 черновиков + 9 дублей,
D20), каноны выбраны. `audit/duplicates.md` актуален. Новых дублей не появилось. Удалений нет (deprecate-стратегия).

## [Шаг 5] Структура — changed — 2026-06-23 22:31
Секции Figma `ds-*` и React-слои-barrel из прошлого прохода в силе. Обновлён `audit/structure.md`:
добавлены Tailwind (theme.extend под токены) и превью-страница `/preview`. Деструктивных операций в Figma
в этом проходе нет → rollback-снапшот `audit/figma-snapshot.before-prepare.json` валиден.

## [Шаг 6] Превью-страница — added — 2026-06-23 22:38
**Сделано:** `src/pages/Preview.tsx` + роут `/preview` + пункт навигации «Превью». Живой каталог всех
компонентов по уровням (Styles/Atoms 16/Molecules 10/Organisms 6), хром на Tailwind-утилитах
(`bg-bg-base`, `font-display`, `text-caps`, `rounded-s`, `p-ds-m`, grid auto-fill и т.д.).
**Затронуто:** src/pages/Preview.tsx, src/router.tsx, src/components/index.ts (барель уже был).
**Проверено:** 4 секции, 48 ячеек; Tailwind-токен-классы резолвятся (bg-base→#f2f2f2, tech-green→#00867b);
h1 в Instrument Serif; без оверфлоу; скриншот снят. Сборка зелёная (188 модулей).

## [ИТОГ Prepare v2] — 2026-06-23 22:38
Соединение ✓. Tailwind подключён (theme.extend↔токены, preflight off). Инвентаризация/нейминг/дубликаты/
структура — подтверждены (наследие первого прохода) + обновлены. Превью-страница готова. Деструктивных
операций в Figma в этом проходе нет. Готовность к этапу Styles: ДА (Tailwind-структура под токены готова).

---
---

# Stage STYLES (трек Tailwind) — 2026-06-23 22:46

## [S1] Аудит покрытия токенов — checked — 2026-06-23 22:46
`audit/tokens.coverage.md`: 50 Figma / 54 `--ds-*` / 54 в Tailwind. Битых ссылок 0. Пробел: 4 токена
(2 fontWeight + 2 negative indents) не были в Tailwind.

## [S2] Закрытие пробелов — changed — 2026-06-23 22:46
В `tailwind.config.js` добавлены fontWeight (regular/medium) и negative spacing (ds-neg-1/ds-neg-xs).
Повторный аудит: **54/54, пробелов нет**. Фон: в каталоге `/preview` Styles не показывал отступы.

## [S3] Отступы в каталоге + Tailwind-дока — added/changed — 2026-06-23 22:46
В `src/pages/Preview.tsx` (Styles) добавлена ячейка **«Отступы (indents)»** — бары из токенов
(XXXS 2 … XXL 90px), проверено: фактические ширины 2/4/8/14/20/24/30/90px. В Foundations добавлена
секция «Использование в Tailwind». (Реакция на «нету размера отступов в дизайн-системе».)

## [S4] Финал Styles — 2026-06-23 22:46
Сборка зелёная. Покрытие токенов полное. Каталог Styles: 5 ячеек (Шрифты/Кегли/Цвета/Радиусы/Отступы).
Решения: D30. release-notes +2. Готовность к этапу Atoms: ДА.

---
---

# Preview → премиум + только Preview — 2026-06-23 23:23

## [A] Удаление страниц — removed — 2026-06-23 23:23
Удалены Docs/LiveApp/ReleaseNotes/Screens/Home + роуты. Роутер: `/`→Preview, `*`→`/`. Данные доков/
release-notes сохранены (figma-sync/check-docs). Сборка: 188→138 модулей.

## [B1] Тема light/dark — added — 2026-06-23 23:23
Tailwind darkMode:'class' + `.dark` оверрайды токенов (инверсия black/on-color, акценты сохранены) +
анти-FOUC inline-скрипт. Проверено: toggle → bodyBg #0b0b0d, токены флипаются.

## [B2] UI-примитивы — added — 2026-06-23 23:23
`preview-ui.tsx`: ToastProvider/useToast, useCopy, CopyCodeButton, ThemeToggle, Card, useScrollSpy, иконки.

## [B3] Каталог — added — 2026-06-23 23:23
`preview-catalog.tsx`: 32 компонента (Atoms 16 / Molecules 10 / Organisms 6), у каждого demo с рабочим
интерактивом (кнопки→toast/состояния) + сниппет code.

## [B4] Сборка страницы — added — 2026-06-23 23:23
`Preview.tsx`: sticky header (поиск + theme), section-nav со scroll-spy, секция Styles (токены) + карточки
по уровням, сетка 1→2 кол (широкие span-2), адаптив. 32 карточки.

## [C] Сверка с Figma — checked — 2026-06-23 23:23
Каталог покрывает все 32 Figma-компонента (0 пропусков, 0 лишних). Интерактивные сеты (button 5 вар.,
switch 4, dropdown 4, flag/tag/menu_switch/icons) — все представлены. Расхождений нет.
Проверено вживую: тема, поиск (switch→3 карточки), клик демо-кнопки → toast «Secondary», copy-code.

## [Активные кнопки/контролы]
Button(5 вар.+async+disabled), Switch, SwitchGroup, Dropdown(2), Tag(control), Icon(5), Flag, Bar(slider),
Graph(regenerate), ListItem(Edit), CampaignPreview(More info), Notify(dismiss), MenuSwitch(group),
TopMenu(action+tabs), SecondRow(Back/Save/Deploy), Header(action+tabs+back), Task(toggle), CardTop(4 пилюли),
+ copy-code на каждой из 32 карточек, ThemeToggle, Search. Демо-действия — toast/state (D33).

## [Styles redesign] — changed — 2026-06-23 23:35
Секция Styles: 2-колоночная сетка → вертикальная лента (Typography→Colors→Spacing→Radius), блоки во всю
ширину. Свотчи 156×96 (было 40×40), радиус-боксы 96×96, подписи размеров крупно («h1 · 84px», «M · 20px»).
Проверено DOM: порядок/stacked/размеры. Сборка зелёная. Решение D34.

## [Figma re-sync: цвета] — added — 2026-06-23 23:45
Перечитал Figma. Доска colors (1:4466) обновлена — добавлены пастели pink/lavender/olive/peach, которых
не было в ДС. Завёл токены card-{pink,lavender,olive,peach} (light+dark) → theme.css, Tailwind, превью.
Проверено DOM: 20 свотчей, новые цвета = #fad5e7/#ddd6ef/#e0e2a4/#f5dedb (совпадают с Figma), 0 ошибок.
Нюанс: dev пересобирает Tailwind только после рестарта (конфиг). Решение D35. Сборка зелёная.

---
---

# Stage STATES (состояния + цвета-токены + спейсинг) — 2026-06-24 00:04

## [Состояния] added — 2026-06-24 00:04
Единая модель: transition 160ms (token), focus-кольцо (tech-purple, :focus-visible), hover-подъём,
active-press, disabled. Добавлены: Button.loading (спиннер+aria-busy), Input/TextArea.error (tech-red+aria-invalid),
selected — Switch(on)/SwitchGroup/MenuSwitch(active). Покрыты: Button, Switch, SwitchGroup, Dropdown(control+options),
Tag(control), Flag, Input, TextArea, MenuSwitch, CardTop(пилюли). Молекулы/организмы наследуют через композицию.

## [Цвета] changed — 2026-06-24 00:04
Хардкод-hex в компонентах не найден (всё на --ds-color-*). Тени rgba(0,0,0,…) → токены --ds-shadow-1/2/3
(+dark). Фокус/hover/error — токены (focus=tech-purple, error=tech-red). Палитра = Figma (D35, +pastel card-*).

## [Спейсинг] changed — 2026-06-24 00:04
Все padding/margin/gap уже на --ds-indent-*. --ds-bar-gap → var(--ds-indent-xxs). Произвольных значений нет.

## [Preview] changed — 2026-06-24 00:04
Demo: Button(loading+disabled), Input(error+disabled) показаны явно; hover/focus/active работают на всех
интерактивных. Проверено DOM: transition=0.16s ×5, спиннер+aria-busy, error-обводка rgb(204,0,0). Премиум сохранён.

## [Figma расхождение] — 2026-06-24 00:04
В макете нет вариантов-состояний (нет осей state/hover/pressed) → состояния добавлены кодом по UX-практикам. D36.

## [Fix Bar/SwitchGroup/Avatar] fixed — 2026-06-24 00:16
Сверка с Figma по замечанию. Bar → точки (radial-gradient) вместо штрихов. SwitchGroup → жёлтый фон + белая активная пилюля. Avatar → силуэт человека/собаки (лапа) + кольцо вместо инициалов. Проверено DOM+скрин: bar radial-gradient, sg bg rgb(255,233,0)/active white, avatar glyph+ring. Сборка зелёная. Решение D37.

## [Молекулы ↔ Figma + Bar + Indents] fixed — 2026-06-24
Сверка ds-molecules: Bar-цвет #b8c6c3, Profile short=персик/outlined=серый, CardMetric=зелёный+мини-график, Team+бар, ProjectPreview-теги жёлтые. Indents-превью крупнее. Проверено DOM+скрин. Сборка зелёная. D38.

## [Выравнивание превью] changed — 2026-06-24
Каталог → единая колонка (ровно/последовательно), карточки full-width равной ширины. Широкие демо — overflow-x-auto внутри карточки. Проверено DOM+скрин: mobile 390 без оверфлоу (single column), desktop 1280 ровно. D39.

## [Сверка атомы/молекулы/организмы + шрифт + dropdown] — 2026-06-24
Pixform для 10px-капс (Status/Profile role/Team meta), 8px-caps оставлены Akkurat. Profile: имя Regular 20px, роль Pixform, длинный бар. Dropdown-меню больше не обрезается (demo overflow:visible; сжатие широких — только @media≤640). Организмы: все 6 на месте. Отступы на токен-шкале. Сборка зелёная, проверено DOM+скрин (desktop+mobile). D40.

## [Pixel-parity 32 + навигатор] — 2026-06-24
4 субагента сверили все atoms/molecules/organisms с Figma и привели к макету (0 ❌; audit/parity/*.md + INDEX). Системно: контролы→Pixform 10px/0.2em; кнопки→pill; тени только на hover; карточки radius12/padding30; крупные числа сериф 84px, заголовки 40px; Header+Bar над стадиями; CardTop с серифным именем 84px и тегами. Заведены токены --ds-font-size-control/-h2/--ds-letter-spacing-pixel, хардкоды заменены (13 CSS). Левый навигатор (collapse/поиск/scroll-spy/drawer/a11y), превью на новом layout. Светлая/тёмная/мобайл проверены. D42.

## [Доработка карточек + Canban + без адаптива] — 2026-06-24
CampaignPreview→5 метрик; Notify→длинный текст+pill; CardMetrica→перенос заголовка (фикс «съехала»); Attempt→полные офферы/перки; CardTop→текстура фона. Новый организм Canban (Pipeline-борд, node 1:2048) — добавлен в каталог/навигатор (33 компонента). Убрано адаптивное сжатие превью: компоненты в натуральную figma-ширину (как просили). Всё сверено скриншотами Figma↔React, сборка зелёная. D43.

## [Attempt: позиция FAILED] — 2026-06-24
Статус FAILED стоял ниже (на уровне перков) из-за align-items:center ряда. → flex-start (Figma cnt=MIN) + центровка статуса по высоте суммы. Теперь на уровне $-сумм. D43.1

## [Canban-раскладка + CardTop] — 2026-06-24
Canban: борд скроллится внутри карточки (заголовок больше не уезжает, страница не ломается). CardTop: золотой #ffb700 + текстура + высота 480 (space-between) — как в Figma (было ярко-жёлтое и короткое). D43.2

## [TTD + 3 страницы + Release Notes + navbar Pages + зеркальный нейминг] — 2026-06-24
Репо привязан к TTD. Построены 3 страницы (All teams/All teams one/Candidate) из ДС, роуты /pages/*, parity-файлы. CardTop+glass, CardMetric+color. Страница /release-notes. Navbar+Pages. CONTRIBUTING: зеркальный нейминг + правило release-notes/доки. Все страницы сверены скриншотами Figma↔React, сборка зелёная. D45.

## [Parity страниц + свёрнутый sidebar + назад] — 2026-06-24
4010: hero ADD TEAM↔SwitchGroup порядок + 6 идентичных команд. 4071: разные статусы/роли (10 строк). 4092: пайплайн 9 стадий. Sidebar свёрнут по умолчанию (hover/click+pin+persist). Back-кнопка со стрелкой+aria на страницах (navigate -1). Parity-файлы ✅ 0❌. Сверено DOM. D46.

## [Бар tone + sidebar-аккордеоны + цветные пилюли + PROMOTE] — 2026-06-24
Bar tone=green (насыщ.+бледный, палитра), бары страниц зелёные, big=2 ряда. Sidebar: аккордеоны свёрнуты по умолч.+persist, Pages наверх, рельс убран. Back оставлены (в макете есть). Profile color (цветные пилюли) + green long-бар. CardTop activeAction (тёмная PROMOTE). Метрики 4010 из палитры. Candidate PD big+green. Сверено DOM. D47.

## [Шапки 4013/4093 + Team-сетка + капсула метрик + Hiring campaign 4144] — 2026-06-24
Шапки совпадают (glass-hero + pipeline). Profile-long → ровная сетка (статус 150/бар flex). CardMetric → капсула progress-pill. Новая страница HiringCampaign (CardTop+Task×6+CardMetrica×3+CampaignPreview+Canban), роут + navbar Pages. Сверено DOM+скрин. D48.

## [CardMetric=graph 1936 + bar mask + Pipeline full-width + фон 4013] — 2026-06-24
CardMetric: капсула→Graph (Figma 1:1936). Bar: mask (space) — без обрезки, ровные ряды, палитра. Canban: колонки flex:1 full-width (organism) + full-bleed на странице. Hero-фон 4013 на месте. Отступы 4095 сверены. Graph.height опционален. Сверено DOM+скрин. D49.

## [Откат контейнерного скролла + реальный адаптив (хедер/мобилка) + откат белой линии] — 2026-06-24
Корень «скроллится контейнером» = overflow-x-clip на корне (делал страницу скролл-контейнером) → убрал, скролл снова документом. Откат белой линии под топ-навом (хедер как был). Реальный адаптив: сняты фикс min-width (Header/TopMenu 720, SecondRow 560, CardTop 600, Task 520, CampaignPreview 460) + flex-wrap; media ≤640 для Profile-long (перенос) и Canban (заголовок 30, колонки стопкой); сетки страниц адаптивные. DOM: overflow=0 на 1440/1024/900/768/375 на всех 4 страницах, скролл документом, десктоп = Figma. D52.

## [Фикс регрессии: overflow/скролл/адаптив + hero центр/фон/линия + типографика] — 2026-06-24
Корень: full-bleed через 100vw (w-screen) шире вьюпорта на скроллбар → правый отступ/гориз.скролл/мелкий адаптив. Фикс: полноширина через w-full слоты PageFrame (hero/after), overflow-x-clip на корне. DOM: overflow=0 (1280/900/600), Pipeline 1220 без overflow, скролл до конца. Hero: центр восстановлен, overlay/затухание убраны (чистое фото cover, 1:4013), возвращена белая линия под топ-навом (1:4011). Страница 4: Pipeline в after-слот, hero = Finish/Cancel+дропдауны сверху (1:4147). Типографика: размер перед образцом. Сверено DOM. D51.

## [Full-size hero + метрики=graph 4015-4018 + аватары + страница 4 (4147) + Reports/Mentoring + Pipeline] — 2026-06-24
Hero glass → FULL-BLEED баннер (фон во всю ширину, контент центр; AllTeams+AllTeamsOne, подтв. скрином 1440). Метрики: причина «мини-графиков» = h-full ломал высоту 195 → бары схлопывались; убран h-full, плитки graph широкие/чанковые (205×195, [100,59]) — по Figma 1:4015-4018 это graph, НЕ капсула (конфликт решён в пользу Figma). Аватары: серый #979797 + белый person (opacity 1), единообразно, dog убран. Страница 4 (1:4147): жёлтое фото, только Finish/Cancel, дропдауны вверх (CardTop tagsPosition='top'). Reports/Mentoring: Profile short крупнее (pad 20, min-w 240), аватар серый. Pipeline (Canban organism): row radius 4, имя 20, row-text gap 8. Сверено DOM. D50.
