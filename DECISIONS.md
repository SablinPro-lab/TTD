# DECISIONS — Figma DS (тестовая дизайн-система)

Журнал принятых решений и допущений. Дата старта: 2026-06-23.

## Контекст

- Figma-файл — **источник правды**: `ct9b7yfSwULxIG3mIPlSg8` («Тестовая дизайн-система»).
  В нём 5 секций (`ds-atoms`, `ds-molecules`, `ds-organisms`, `design`, `styles`), 74 варианта
  компонентов, токены в секции `styles`.
- Проект локальный, **никуда не публикуется**. Ничего из него не уходит в репозиторий
  соседний продукт-проект — отдельная граница.

## D1. Объём — пилот на 3 атомах

Решение: сделать сквозной пайплайн на `Button`, `Switch`, `Input` (+ токены), а не на всех 74
компонентах. Причина: проверить связку «Figma → код → доки → release-notes → sync» end-to-end
без риска утонуть; дальше тиражировать по той же схеме. (Выбор пользователя.)

## D2. Стек — Vite + React + TS, БЕЗ Storybook

Изначально ставили Storybook (стандарт для дизайн-систем), но **пробелы в пути проекта**
(`/Users/.../Project AI/FIgma tests`) ломают сборку Storybook на MDX:

- `build-storybook` падает: `Rollup failed to resolve import @storybook/addon-docs/dist/mdx-react-shim.js`
  — путь в ошибке закодирован как `Project%20AI/FIgma%20tests`, резолв не разэкранирует пробел.
- `storybook dev` поднимается, но `.docs.mdx` отдаётся 404 (тот же корень).
- Симлинк без пробелов не помогает — Vite/Rollup резолвят realpath с пробелами.

Решение: **убрать Storybook**, оставить чистый Vite + React + TS. MDX-доки рендерятся прямо в
приложении через `@mdx-js/rollup` (+ `@mdx-js/react` provider, `remark-gfm` для таблиц). Плагин
`@mdx-js/rollup` не использует storybook-шим, поэтому пробелы в пути его не ломают — `npm run build`
и `npm run dev` зелёные. (Выбор пользователя: «запусти просто на реакте без сторибука».)

Альтернатива на будущее: перенести проект в путь без пробелов — тогда Storybook заработает.

## D3. Токены

Извлечены из Figma `styles` (node `1:4405`) через `get_variable_defs` → `src/styles/theme.css`
как CSS-переменные `--ds-*`. Замечания:
- Все `font/family/*` в файле указывают на **Inter** — используем Inter везде.
- Радиусы (`rounds/S`, `rounds/Over`, `radius/L`) = 4px.
- Правило: хардкод хексов/пикселей в компонентах запрещён, только `var(--ds-*)`.

## D4. API компонентов (маппинг на Figma-варианты)

- **Button** (`btn`, COMPONENT_SET 1:1840). Figma-оси `CTA?` (yes/no) × `type`
  (secondary/On color/small/big/node) сведены к идиоматичному React-API:
  `variant: secondary|onColor|cta|node` + `size: small|big`. «CTA?=yes, type=big» → `variant="cta" size="big"`.
- **Switch** (`switch`, 1:1758). Оси `switch` (on/off) × `size` (big/small) → `checked` + `size`.
  Семантика: `role="switch"`, `aria-checked`.
- **Input** (`input`, 1:1799). Один вариант `Default` → `label` (uppercase-заголовок) + нативное поле.

## D5. Документация компонентов

`<Component>.docs.mdx` лежит рядом с кодом и **рендерится в самом приложении** на `/docs/:component`
(а не в Storybook). Тот же по смыслу краткий текст продублирован в поле **Description**
соответствующего COMPONENT_SET в Figma (проставлено через `use_figma`). Синхронность —
по содержанию, не по точной строке.

## D6. Release Notes

- Машиночитаемый источник — `src/release-notes/release-notes.json` (новые записи сверху,
  поля: `date`, `component`, `type: added|changed|fixed|deprecated`, `change`).
- React-страница `/release-notes` рендерит его.
- Зеркальная страница **«Release Notes»** создана в Figma-файле (page id `14:13378`) с тем же
  содержимым.

## D7. Архитектура figma-sync (почему гибрид: CLI + скилл)

Чистый Node-скрипт **не может** вызывать Figma MCP, а запись Description/страниц **в** Figma
возможна только через Plugin API (`use_figma`). Поэтому:
- `scripts/figma-sync.mjs` — детерминированное ядро без сети: диффит `.figma-snapshot.json`
  (последнее известное состояние) против `.figma-live.json` (текущее), на изменения генерит
  release-notes и обновляет снапшот. Режимы: dry-run / `--apply` / `--init`. Одна команда:
  `npm run figma:sync`.
- Скилл `.claude/skills/figma-sync/SKILL.md` — оркестрирует MCP-часть: читает компоненты из Figma
  (Description + варианты) → пишет `.figma-live.json` → зовёт CLI → приводит `.docs.mdx`/Description
  в соответствие. Скил оставлен в проекте для дальнейшей работы.

`.figma-live.json` — временный (gitignored), выгружается скилом перед каждым прогоном.

## D8. Гейт на изменения + git-hook

`scripts/check-docs.mjs`: если изменён `src/components/<Name>/<Name>.tsx|.css` — обязаны быть тронуты
`<Name>.docs.mdx` И `release-notes.json`; если `theme.css` — обязан `release-notes.json`. Подключён
как pre-commit hook через `git config core.hooksPath .githooks`. Используется `execFileSync('git', [...])`
(массив аргументов, без шелла) — во избежание инъекции (замечание security-плагина).

## D9. Безопасность зависимостей

`npm audit` показывает 2 уязвимости (moderate+high) в `esbuild`/`vite` — это advisory dev-сервера
(`esbuild <=0.24.2`). Фикс — мажорный апгрейд до `vite@8` (breaking). Решение: для **локального,
непубликуемого** пилота **не** форсировать мажор; риск принят (dev-only, приложение наружу не
выставляется). Перепроверить при выходе из пилота / при появлении деплоя.

## D10. Скриншоты

Playwright MCP «прибит» к корню соседнего проекта (только туда может писать). Чтобы скрины
этого проекта не оседали в чужом репозитории, заведена папка **`.screenshots/`** внутри проекта
(gitignored): снимаем в разрешённый корень и сразу переносим сюда. Сюда же сложены референсы Figma.

## D11. Полная миграция системы + режим автономии

Пользователь: перенести всю систему (atoms + molecules + organisms + экраны секции `design`),
работать на полную без вопросов, решения по неймингу/структуре принимать самому и фиксировать
здесь. Порядок: atoms → molecules → organisms → screens (нижние слои раньше верхних).

## D12. Нейминг компонентов (Figma → React)

Имя React-компонента = имя папки (так работает гейт `check-docs`). Где имя Figma неудобно как
идентификатор — берём идиоматичное React-имя, маппинг хранится в `.figma-snapshot.json`
(`figmaName` → `reactComponent`):

- `error` → **ErrorBanner** (избегаем коллизии с JS `Error`)
- `avatars` → **AvatarGroup** (множественное → «группа»)
- `list` → **ListItem** (компонент = одна строка списка)
- `icons` → **Icon** (компонент = один значок, выбор через `name`)
- `switch group` → **SwitchGroup**, `text_area` → **TextArea**, `card metric` → `CardMetric` и т.п.
  (пробелы/змеиный_регистр → PascalCase)
- Описания в Figma `Description` хранятся с экранированием `&lt;`/`&gt;` (так их отдаёт MCP);
  снапшот хранит тот же вид, чтобы будущие диффы figma-sync не ловили ложные «changed».

## D13. Токен accent

Шапки-карточки организма `card top` в Figma — на фото-фоне (image fill), который в коде не
воспроизводится. Добавлен токен `--ds-color-accent: #ffd60a` для акцентной шапки. Это
единственный токен НЕ из Figma-переменных; помечен в `theme.css`.

## D14. Экраны секции `design` — композиции, не пиксель-реплики

В секции `design` 27 фреймов (экраны 1440px из компонентов + черновики/дубли). Пиксель-в-пиксель
реплицировать все нецелесообразно. Решение: собрать представительный набор из 5 ключевых экранов
(All teams, Hiring campaign, Candidate, Negotiate, Success) как React-страницы, **скомпонованные из
компонентов ДС** — это и есть корректная демонстрация системы «в сборе». Роут `/screens/:slug`,
страницы в `src/pages/screens/`. Это не дизайн-в-Figma, а использование ДС, поэтому в снапшот
компонентов экраны не попадают (отслеживаются только переиспользуемые компоненты).

## D19. Конвенция именования (Stage Prepare)

- **React:** `PascalCase`, имя компонента = имя папки = имя экспорта (`Button`, `CardMetric`). Уже соблюдено.
- **Figma component sets:** `lower_snake_case`, без пробелов, без опечаток, без Capital/plural-рассинхрона.
- **Секции Figma:** `ds-<layer>` (`ds-atoms`/`ds-molecules`/`ds-organisms`), плюс `design`, `styles`.
- **Маппинг** `figmaName ↔ reactComponent` хранится в `.figma-snapshot.json`; точное посимвольное
  совпадение Figma↔React не требуется (разные конвенции), требуется консистентность внутри каждой.
- **Variant-свойства** (`Property 1`/`type`/`CTA?`/…) неоднородны — нормализация отложена на
  соответствующие этапы Atoms/Molecules/Organisms (глубокий уровень компонентов, в Prepare не трогаем).
- Применённые ренеймы — `audit/renames.md` (7 шт. в Figma; в React ренеймов нет).

## D25. Dropdown — кастомное меню, раскрытие вниз

Нативный `<select>` заменён на кастомный dropdown: меню `position:absolute; top:100%` (раскрывается
**вниз** под контролом), закрытие по Esc и клику вне, `aria-haspopup/expanded` + `listbox/option`,
шеврон поворачивается. API не изменился. Проверено геометрией: menuTop ≥ controlBottom.

## D27. «Живые варианты» в доках — интерактивные

Секции «Живые варианты» в `*.docs.mdx` сделаны интерактивными: каждый пример обёрнут в
`export const Demo = () => { const […] = useState(); … }` + `<Demo />`. Контролируемые компоненты
теперь переключаются (Switch/Flag/MenuSwitch/Task/Notify/TopMenu-табы), дисплейные — с пикерами/
слайдерами/счётчиками (Status/Icon/Avatar/AvatarGroup/Bar/Graph/Profile/Button/Tag/ListItem/ErrorBanner).
Доп.: в `CardTop` добавлен колбэк `onAction(label)`, чтобы пилюли-действия были живыми. Проверено:
Switch в доках toggle true→false по клику. (Input/TextArea/Dropdown/SwitchGroup уже были живыми.)

## D26. Живой адаптивный макет (/live) + адаптивная шапка

- `src/pages/LiveApp.tsx` — responsive-дашборд целиком из компонентов ДС (TopMenu, Dropdown,
  SwitchGroup, CardMetric/CardMetrica, CampaignPreview, Team, Profile, Notify, Status, Tag, Switch).
  Сетки на `repeat(auto-fit, minmax())`, две колонки схлопываются (≤860px), hero/контролы стопкой (≤600px).
  Флюидность компонентов с большими min-width — через scoped-оверрайды в `.live-app` (min-width:0).
- Поправлена **глобальная шапка** (`.ds-layout__header/__nav`) — `flex-wrap` + media (≤640px), иначе
  навигация переполняла мобайл. Проверено: при 390px горизонтального оверфлоу нет.

## D24. Дисплейная типографика = сериф (Stage Molecules/Organisms)

Системный паттерн из Figma: крупные дисплейные значения, заголовки, числа и вордмарк используют
**Instrument Serif** (`--ds-font-family-display`), основной текст — Akkurat (Grotesk), служебный/моно —
Pixform (Pixel). Применено к: Button big, CampaignPreview (title/value), CardMetrica (title/value),
Attempt (amount), TopMenu (logo), CardTop (name), заголовки экранов. Notify — success-стиль на
Pixel-шрифте. Базовый текст компонентов остаётся на Grotesk.

## D23. Stage Atoms — фиксы достоверности (после корректных токенов)

С верными токенами проявились расхождения, исправлены:
- **Dropdown** `onColor`: чёрный → **brown** (`Controls/On Color/Brown` #d1a63b) + тёмный текст.
- **Button** `big`: шрифт → **display-сериф** (Instrument Serif); `node`: фон → **oncard-red** (#f7e0dd).
- **ErrorBanner**: фон белый → **oncard-red** (#f7e0dd, бледно-розовая плашка).
Остальные атомы корректны автоматически (на `var(--ds-*)`, токены подтянулись). Variant-prop нейминг
в Figma оставлен как есть (правка имён свойств в библиотеке вне зоны React-DS, риск для инстансов).

## D22. Stage Styles — токены приведены к remote-библиотеке

- **Источник правды токенов — remote Figma Variables.** `theme.css` на этапе миграции был заполнен по
  устаревшему чтению («всё Inter»); в Stage Styles переписан под актуальные значения (`audit/tokens.diff.md`).
- **Шрифты:** 3 семейства — Grotesk=`Akkurat LL Cyr TT` (основной), Antiqa=`Instrument Serif` (дисплей),
  Pixel=`Pixform`. **ОБНОВЛЕНО:** шрифты установлены в системе (Font Book) — точные family-имена совпадают
  с CSS (`Akkurat LL Cyr TT`/`Instrument Serif`/`Pixform`), реальные имена стоят первыми в стеке → браузер
  рендерит настоящие шрифты, `@font-face` не нужен (файлов в проекте нет). Для портативности (машины без
  лицензионных Akkurat/Pixform) в `index.html` подключены свободные **Inter** (фолбэк для Grotesk/Pixel) и
  **Instrument Serif** (Google Fonts) — добавлены в хвост стека. См. D28.
- **Accent:** выдуманный на D13 `#ffd60a` заменён реальным токеном `Color/superYellow` #ffe900;
  `--ds-color-accent` оставлен алиасом.
- **Имена `--ds-*` не менялись** (используются 32 компонентами) — обновлены только значения и добавлены
  новые токены. Опечатки имён библиотеки (`emty`, `On cads`, `base with`) не воспроизводятся в CSS-именах.
- **Снимок токенов** для синхронизации Styles — `.figma-tokens.json` (отдельно от `.figma-snapshot.json`).
- Витрина — `/docs/foundations` (группа «Основы»).

## D21. Структура под этапы

- **Figma:** секции приведены к единому префиксу `ds-` (`styles`→`ds-styles`, `design`→`ds-screens`;
  `ds-atoms`/`ds-molecules`/`ds-organisms` без изменений). Соответствие секция→этап — `audit/structure.md`.
- **React:** слои выражены **barrel-файлами** `components/{atoms,molecules,organisms}.ts` (re-export),
  `index.ts` собирает их. Физический перенос папок в `components/<layer>/<Name>/` **отложен** —
  массовое изменение импортов (Docs.tsx, screens) рискованно и не нужно на Prepare; делать на этапе,
  где компоненты и так трогаются. Сборка после введения слоёв — зелёная (172 модуля).

## D20. Дубликаты — deprecate вместо удаления

Удаление фреймов в Figma необратимо моим JSON-снапшотом (он хранит метаданные, не контент). Поэтому
дубли/черновики в секции `design` **не удаляю**, а помечаю префиксом `[deprecated] ` (обратимо,
залогировано). Канон в группе одноимённых экранов — по максимальной высоте (наиболее полный).
Удаление отложено на ручное подтверждение владельца. Лог — `audit/duplicates.md`.

## D15. Имя файла Figma

`figma.root.name` возвращает `Document`, тогда как отображаемое имя файла — «Тестовая дизайн-система».
В аудите фиксируем оба; как каноническое используем отображаемое.

## D16. `indents` (1:4478) — токен-сет, не UI-компонент

В секции `styles` есть COMPONENT_SET `indents` (9 вариантов спейсинга). Это артефакт-доска токенов,
а не UI-компонент. **Решение:** в React как компонент НЕ мигрируем — спейсинг уже в `theme.css`
(`--ds-indent-*`). В gaps он числится «только Figma» осознанно.

## D17. Токены — remote-библиотека (важно для этапа Styles)

Локальных Figma Variables/Styles в файле нет (0/0). Токены, на которые завязаны компоненты,
приходят из **внешней опубликованной библиотеки** (проба: переменная `indents/S (inner)`,
`remote:true`). **Решение для этапа Styles:** источник правды токенов — remote-библиотека; наш
`theme.css` — её зеркало. На этапе Styles нужно: либо подключить/прочитать библиотеку переменных,
либо явно зафиксировать локальную копию токенов как мост. Доска `styles` в файле — ручная витрина,
не примитивы Variables.

## D18. Rollback-снапшот этапа Prepare

Инструкция просит снапшот до изменений в `.figma-snapshot.json`. Этот файл уже занят под снапшот
figma-sync (32 компонента, другой формат/назначение). **Решение:** rollback-снимок этапа сохранён в
`audit/figma-snapshot.before-prepare.json` (имена/описания сетов и страниц ДО изменений), чтобы не
ломать figma-sync. Перед деструктивными правками этого достаточно для восстановления имён/описаний.

## Отслеживаемые узлы Figma

| React | Figma node | type |
|---|---|---|
| Button | `1:1840` (btn) | COMPONENT_SET |
| Switch | `1:1758` (switch) | COMPONENT_SET |
| Input | `1:1799` (input) | COMPONENT_SET |
| Tokens | `1:4405` (styles) | SECTION |
| Release Notes (page) | `14:13378` | PAGE |

## D28. Привязка шрифтов

Шрифты установлены пользователем в системе. Решение: использовать их по family-имени (точное
совпадение с CSS подтверждено через `system_profiler`). `@font-face` не добавляю — файлов в репозитории
нет, а проприетарные Akkurat/Pixform нельзя коммитить. Граница: на машинах без этих шрифтов рендерится
загруженный Inter (Grotesk/Pixel) и Instrument Serif (свободный, Google Fonts) — UI остаётся консистентным.

## D29. Tailwind (Stage Prepare)

- **Версия:** Tailwind **v3.4** (под явный `theme.extend`/`content`, как в задаче; v4 CSS-first отложен).
- **Config (ESM**, проект `type:module`): `tailwind.config.js` + `postcss.config.js` (`export default`).
- **theme.extend → токены `--ds-*`** (colors/fontFamily/fontSize/spacing(ds-*)/borderRadius/letterSpacing/maxWidth)
  через `var(--ds-…)` — один источник правды (theme.css ← remote Figma). Этап Styles расширяет этот блок.
- **preflight выключен** (`corePlugins.preflight=false`): Tailwind добавляет только утилиты и НЕ переопределяет
  CSS существующих компонентов (ограничение «не трогать компоненты глубоко»). Конвертация компонентов на
  Tailwind-классы не делается на Prepare.
- Директивы `@tailwind base/components/utilities` — в `src/styles/global.css`. Сборка зелёная.

## D30. Stage Styles (трек Tailwind) — полнота токенов

- Аудит покрытия `audit/tokens.coverage.md`: 50 Figma-токенов / 54 `--ds-*` в theme.css / **54 проброшено
  в Tailwind**; **битых ссылок 0** (каждый Tailwind-токен резолвится в реальный `--ds-*`).
- Закрыты пробелы: в Tailwind добавлены `fontWeight` (regular/medium) и негативные отступы (`ds-neg-1/ds-neg-xs`).
- В каталоге `/preview` (секция Styles) добавлена **шкала отступов** (indents 2…90px из токенов) — раньше её
  не было. Foundations дополнен секцией Tailwind-утилит.
- Источник правды токенов — `theme.css` (зеркало remote-библиотеки); Tailwind ссылается через `var(--ds-*)`.

## D31. Только Preview — остальные страницы удалены

Удалены страницы/роуты: Docs (`/docs`), LiveApp (`/live`), ReleaseNotes (`/release-notes`), Screens
(`/screens`), Home. Приложение = одна страница **Preview** (`/`, catch-all → `/`). На диске сохранены:
`*.docs.mdx` (доки компонентов), `src/release-notes/release-notes.json` + `types.ts`, `Foundations.docs.mdx`
— ими пользуются figma-sync и гейт check-docs; в UI они больше не рендерятся (CONTRIBUTING про /release-notes
теперь историчен).

## D32. Тёмная тема

`darkMode: 'class'` (Tailwind) + `.dark` в theme.css переопределяет поверхностные/текстовые токены;
инверсия `black`→светлый и `text-on-color`→тёмный, чтобы cta/graph/node читались на тёмном фоне.
Бренд-акценты (tech-*, super-yellow, brown, card-*) сохранены. Анти-FOUC: inline-скрипт в index.html
(localStorage `ds-theme` / prefers-color-scheme) ставит класс до рендера. Переключатель — в шапке.

## D33. Premium Preview — интерактив и демо-действия

- **Все контролы рабочие** (никаких заглушек). Где действие неочевидно — фидбэк через **toast**:
  Button-варианты → toast с названием; async-кнопка → состояние loading→toast; Dropdown/Switch/
  SwitchGroup/MenuSwitch/Tag(control)/Icon → toast + состояние; Flag → toggle; ListItem/CampaignPreview/
  Task/CardTop(onAction)/TopMenu/SecondRow кнопки → toast; Notify → dismiss; Graph → regenerate.
- **Copy code** на каждой карточке (navigator.clipboard + фолбэк, toast «Код скопирован»).
- **Поиск** фильтрует карточки по имени/описанию; **scroll-spy** подсвечивает активную секцию.
- a11y: focus-кольца (`focus-visible:ring`), `aria-label`/`aria-live`(toast)/`aria-pressed`, клавиатура.
- Сетка карточек 1→2 колонки (xl), широкие компоненты span-2; max-w-6xl, адаптив desktop/tablet/mobile.

## D34. Styles — вертикальная лента, крупнее, лаконичнее

По запросу: секция Styles перестроена из 2-колоночной сетки в **вертикальную ленту** — при прокрутке
вниз идут Typography → Colors → Spacing/indents → Radius/rounds, каждый блок во всю ширину (StyleBlock:
заголовок + описание + визуал). Цветовые свотчи увеличены (132px-сетка, высота свотча 96px), радиус-боксы
96×96. Кегли — сэмпл «Ag» в реальном размере + чёткая подпись «h1 · 84px»; отступы — бар + «M · 20px»
(не вглядываться). Премиально и лаконично.

## D35. Синхронизация новых цветов из Figma (доска colors 1:4466)

Повторная сверка Figma: на доске `colors` (ds-styles, 1:4466) добавлены 4 пастели, которых не было в ДС:
`#fad5e7` pink, `#ddd6ef` lavender, `#e0e2a4` olive, `#f5dedb` peach (на доске — raw-свотчи, не bound-переменные).
Заведены как токены `--ds-color-card-{pink,lavender,olive,peach}` (light + dark-оверрайды), проброшены в
Tailwind (`bg-card-*`) и добавлены в превью (секция Colors, теперь 20 свотчей). Проверено: computed-цвета
совпадают с Figma. Также `font/family/grotesk` (lowercase) в библиотеке сменился на «Akkurat LL Cyrillic»
(компоненты используют `Grotesk`=«Akkurat LL Cyr TT», совпадает с установленным) — добавил алиас в стек шрифта.
Важно: после правки tailwind.config.js dev-сервер нужно перезапустить (конфиг не подхватывается на лету).

## D36. Состояния, цвета-токены, спейсинг (Stage States)

**Figma-расхождение:** в макете НЕТ вариантов-состояний (нет осей state/hover/pressed/disabled —
проверено через componentPropertyDefinitions). → Состояния добавлены в коде по UX-практикам, не из макета.

**Модель состояний (единая):**
- `--ds-transition: 160ms cubic-bezier(.4,0,.2,1)` — единый duration/easing (+ в Tailwind: duration-ds/ease-ds).
- focus: `outline: 2px var(--ds-color-focus)` (focus = tech-purple), `outline-offset:2px`, по `:focus-visible`.
- hover: подъём (`translateY(-1px)`) + усиленная тень / сдвиг фона (hover-токены), active: `translateY(1px)`/press.
- disabled: `opacity .45` + not-allowed. selected: on/active-классы (Switch/SwitchGroup/MenuSwitch).
- **loading**: добавлен проп в Button (спиннер `ds-spin` + `aria-busy` + блокировка).
- **error**: добавлен проп в Input/TextArea (обводка `tech-red` + `aria-invalid`).

**Цвета:** хардкод-hex в компонентах НЕ найден (всё уже на `var(--ds-color-*)`). Тени/фокус были `rgba(0,0,0,…)`
— вынесены в токены `--ds-shadow-1/2/3` (+ dark-оверрайды) и `--ds-color-focus`; hover-цвета — токены
`control-secondary-hover`/`control-on-color-hover`/`black-hover`. Палитра синхронизирована с Figma (D35).

**Спейсинг:** все padding/margin/gap уже на шкале `--ds-indent-*`; единственная произвольная величина
(`--ds-bar-gap`) переведена на `var(--ds-indent-xxs)`. Внутренние размеры (иконки/точки/min-width) — не
spacing-шкала, оставлены.

**Preview:** demo показывают loading/disabled/error статически + hover/focus/active интерактивно (реальные
состояния через новый CSS). Премиум-вид сохранён.

## D37. Точная сверка Bar / SwitchGroup / Avatar с Figma

По замечанию: 3 компонента не совпадали с макетом — пересняты узлы через MCP и исправлены:
- **Bar** (1:120): в Figma — ТОЧКИ (dotted), не штрихи. Переделан на `radial-gradient(circle)` точки;
  заполнение — `text-primary`, пустое — `control-secondary` (на наших светлых/тёмных поверхностях
  оригинальные bar-токены #b8c6c3/#fff не читаются → используем контрастные токены, форма сохранена).
- **switch_group** (1:1833): фон контейнера — `super-yellow`, активный пункт — белая пилюля
  (`control-on-color` + тень), неактивные — `text-primary` на жёлтом. Было бело-серым.
- **avatar** (1:1727): силуэт (человек; для `name~=dog` — лапа) на круге `control-secondary` + кольцо
  (`gray`), вместо инициалов. `src` по-прежнему перекрывает картинкой.

## D38. Молекулы ↔ Figma (точная сверка) + Bar-цвет + Indents-превью

По замечанию пересняты узлы ds-molecules (1:1852) и приведены к макету:
- **Bar**: цвет заполнения = bar-filled #b8c6c3 (Figma Bar/On base filled), а не чёрный (проверено: точки бара = #b8c6c3/#fff).
- **Profile**: short → фон oncard-red #f7e0dd (персик), short-outlined → control-secondary #eaeaea; long — строка с бирюзовым баром + статус.
- **CardMetric (Health)**: зелёная карточка card-green #d4eee7 + мини-график (чёрные столбцы) + caption.
- **Team**: добавлен бар продуктивности (как в Figma).
- **ProjectPreview**: теги = oncard-yellow #fffd9e (светло-жёлтые чипы), не белые.
- Notify (green/pixel), FlowNode (oncard-red) — подтверждены.
- Все карточки: radius-s, тени-токены, паддинги на --ds-indent-* (общий знаменатель).
- **Indents в превью** переделан: читаемая подпись (text-m) + бар 24px нужной ширины, выровнено — было мелко.

## D39. Выравнивание превью — единая колонка, адаптив

По запросу весь файл выровнен: каталог переведён из 2-колоночной сетки (со span-2 у широких) в **единую колонку** — все карточки на всю ширину контейнера (max-w-6xl), одинаковая ширина/левый край, идут последовательно. Структура карточки единая (заголовок+бейдж+copy / описание / демо-подложка). Широкий контент демо (Header/TopMenu/Attempt/Team/…) скроллится внутри карточки (overflow-x-auto), не ломая страницу на мобайле. Секция Styles — те же full-width StyleBlock-и. Проверено: mobile 390 — scrollW=390, переполнения нет; desktop 1280 — single column, равная ширина. Шапка/нав переносятся/скроллятся на узких.

## D40. Шрифт капс-лейблов (Pixform vs Akkurat) + фикс дропдауна + профиль/команда

Сверка с Figma (атомы 1:119, молекулы 1:1852, организмы 1:1984; статус 1:1734, профиль 1:1853, команда 1:1920).

Правило шрифта (из карты textCase×family×size по всем секциям):
- UPPER ~10px → Pixform (--ds-font-family-pixel): статусы, роль профиля, мета команды (PRODUCTIVITY/PEOPLE/+N MORE/highlight), Notify.
- UPPER 8px → Akkurat (--ds-font-family): мелкие caps — метрики кампании (applied/rejected), перки Attempt, период ExperiencePreview, лейбл Input, стадии пайплайна, Switch.
Раньше статус/роль/мета шли Akkurat → отсюда жалоба «шрифт не такой». Исправлено: Status.__label, Profile.__role, Team мета → Pixform; Notify уже был Pixform; Campaign-статус — через Status (Pixform). 8px-caps оставлены Akkurat (соответствуют Figma).

Profile (не совпадал): имя — Akkurat Regular 20px (было medium 15px); роль — Pixform UPPER (было 8px Akkurat + opacity); в long точечный бар тянется до правого края (flex:1). Team name — Regular.

Dropdown «меню не видно»: причина — overflow-x-auto на демо-области (из D39) клипал абсолютное меню по вертикали. Демо-область → overflow:visible (src/pages/preview.css). Чтобы мобайл не получил горизонтальный скролл, сжатие широких компонентов (min-width:0 + внутренний overflow-x:auto) вынесено в @media(max-width:640px) — на десктопе они сохраняют натуральную ширину (Team 440px и т.п.).

Организмы: в ds-organisms ровно 6 компонент-сетов (second_row, topmenu, header, task, card_top, menu_switch) — все есть в каталоге, недостающих нет.

Отступы (верт/гор): секции 90px (indent-xxl), карточки 24px (indent-l, одинаково на всех 4 уровнях), паддинг карточки 24, демо 20, гор.паддинг main симметричен 24/24 — вся шкала на токенах --ds-indent-*.

## D41. Pixel-parity аудит всех 32 компонентов + левый sidebar-навигатор (FULL GAS)

Запрос: воспроизвести ВСЕ atoms/molecules/organisms из Figma пиксель-в-пиксель; на каждый компонент — audit/parity/<Component>.md (diff Figma↔React + чек текст/иконки/раскладка/скругление/отступы, статус ✅/⚠️/❌); левый навигатор; обновить preview.

Подход (решено самостоятельно):
- Node-id всех 32 компонентов извлечены из Figma (atoms 1:119, molecules 1:1852, organisms 1:1984).
- Parity-аудит распараллелен на 4 субагента по непересекающимся группам папок компонентов; каждый агент тянет спеку из Figma MCP (geometry/auto-layout/типографика/цвета/радиусы/тени), правит ТОЛЬКО свои компоненты и пишет свой parity-файл. Общие файлы (theme.css, tailwind.config.js, src/pages/*, DECISIONS.md, NOTES.md) агентам трогать запрещено — их веду я централизованно (во избежание конфликтов).
- Токены: правка только через существующие --ds-*; нехватку токена агент фиксирует в parity (tokenGap), добавляю централизованно.
- Публичный API пропсов компонентов держим обратно-совместимым (preview-catalog.tsx от него зависит).
- Навигатор: левый sidebar (Styles/Atoms/Molecules/Organisms + пункты-компоненты), scroll-spy active, hover/focus/active+transitions, collapse-секции, поиск; на узких экранах — бургер/drawer; a11y (клавиатура, aria, фокус-кольца). В Figma отдельного макета навигации DS нет → собираю из токенов (премиальный вид).

## D42. Итог pixel-parity (32 компонента) + 3 токена + левый навигатор

Parity-аудит завершён 4 субагентами (Atoms A/B, Molecules, Organisms). Итог: 32/32 приведены к Figma, **0 ❌**. Сводка — audit/parity/INDEX.md, по каждому компоненту — audit/parity/<Component>.md.

Главные системные находки (подтверждены скриншотами Figma): (1) контролы (кнопки/свитчи/инпуты/дропдаун/тег) используют Pixform 10px UPPER ls 0.2em, а не Akkurat; (2) кнопки secondary/onColor/cta — pill-радиус (999), big-cta — Instrument Serif, node — 2 строки (title+subLabel); (3) во многих компонентах были тени, которых в Figma нет (тень только на hover); (4) карточки молекул — radius 12 / padding 30; крупные числа — Instrument Serif 84px, заголовки — 40px; (5) Header в Figma имеет точечный Bar над стадиями (добавлен); CardTop — крупная карточка с серифным именем 84px, gold-ролью, белыми pill-действиями и рядами тегов (добавлены опц. пропсы tags/tagsRight/onTag).

Token-gaps решены централизованно (theme.css): --ds-font-size-control(10px), --ds-font-size-h2(40px), --ds-letter-spacing-pixel(0.2em); хардкоды 10/40px и 0.2em заменены на токены в 13 CSS. Остаток литералов — геометрия компонентов (dot 5px, tag h32, фикс-размеры карточек), не токены.

Решения по неоднозначностям: Icon оставлен инлайн-SVG в стиле DS (Figma=SF Symbols, проприетарный шрифт недоступен) — единственный ⚠️ с непокрытием формы глифа; всё остальное совпало по геометрии/цвету/типографике.

Левый sidebar-навигатор: разделы Styles/Atoms/Molecules/Organisms + пункты по каждому из 32 компонентов; scroll-spy активного пункта, collapse-секции (chevron, по умолчанию развёрнуты), поиск с очисткой и фильтрацией пунктов+контента, hover/focus/active+transitions, фокус-кольца; на <lg — верхний бар с бургером и drawer (оверлей, Esc, блокировка скролла, role=dialog/aria-modal). Превью переведено на этот layout, премиальный вид сохранён; светлая/тёмная темы и адаптив проверены (desktop 1280 / mobile 390, оверфлоу 0). Ловушка: Tailwind opacity-модификатор (bg-x/NN) не работает на CSS-var-цветах → скрим/бар заданы сплошным фоном.

## D43. Доработка карточек по фидбэку + новый организм Canban + отказ от адаптивного сжатия

По узлам Figma внесены правки «сделай идентично»:
- CampaignPreview (1:1884): было 3 метрики → 5 (142 Applied/89 Rejected/282 In progress/31 Final round/4 Offers sent), числа Instrument Serif 84, лейблы Akkurat 8.
- Notify (1:1980): длинный Pixform-30 текст UPPER green (2 строки, max-width 770) + белая pill «More info» (новый проп action); снят min-width.
- CardMetrica (1:1942): «съехала» — длинное слово «Applications» вылезало за узкую карточку 181px; добавлен overflow-wrap:anywhere → перенос по символам (Applicati/ons), как в Figma; align-items flex-start вместо space-between.
- Attempt (1:1948): демо приведено к макету — FIRST ATTEMPT, левый $8 750 (Lead role/Cookies/Free education), центр • FAILED, правый $12 750 (Lead role/Remote-work/Gym).
- CardTop (1:3744): сверены все элементы; добавлена радиальная текстура жёлтого фона (image-fill макета не бандлится → аппроксимация градиентами).

Canban (1:2048) — НОВЫЙ организм (его «не видно на превью», т.к. не был построен). Pipeline-борд: серифный заголовок «Pipeline» (Serif 84) + белая карточка с 4 колонками-стадиями (header сериф + серый счётчик) и строками-людьми (аватар·имя·роль). Добавлен в src/components/Canban, barrel organisms, каталог и навигатор (организмов теперь 7, компонентов всего 33).

РЕШЕНИЕ (по требованию «не сжимай ничего под адаптивы — делай как в фигма»): из preview.css удалён мобильный fluid-shrink (@media min-width:0/overflow-x). Компоненты показываются в НАТУРАЛЬНУЮ figma-ширину; на узких экранах широкие компоненты/борды выходят за вьюпорт (страница скроллится по горизонтали) — как в макете. Демо-область осталась overflow:visible (дропдауны видны). Отменяет адаптивную часть D39/D42.

## D43.2. Canban-раскладка + CardTop под Figma

Canban: заголовок «Pipeline» центрировался над всей шириной борда (~1300px) → уезжал вправо, борд ломал страницу. Решение: борд (.ds-canban__board) — overflow-x:auto + max-width:100% (горизонтальный скролл ВНУТРИ карточки, колонки 312px не сжимаются); .ds-canban width:100%, заголовок центрируется над видимой областью. Страница не разъезжается (overflow 0). Это не противоречит «не сжимай» — контент в натуральную ширину, просто прокручивается.

CardTop (1:3745, 830×480, VERTICAL SPACE_BETWEEN gap160, fill=IMAGE золотая текстура): был плоский яркий super-yellow (#ffe900) и короткая карточка (хаг контента). Приведено к макету: база #ffb700 (золото) + 6 радиальных кругов (аппроксимация image-текстуры, сам растровый fill не бандлим); min-height 480 + space-between → углы сверху / имя+роль+pill по центру / теги снизу (воздушные отступы как в Figma). min-width 600.

## D45. Привязка к TTD, 3 страницы, Release Notes, navbar Pages, зеркальный нейминг

- Репозиторий FIgma tests привязан к https://github.com/SablinPro-lab/TTD.git (origin); осмысленные коммиты.
- Страницы из Figma собраны из ДС (без хардкода): AllTeams (1:4010), AllTeamsOne (1:4071), Candidate (1:4092) — src/pages/screens/*, общий PageFrame (Header+контент 830px). Роуты /pages/*. Parity — audit/parity/Page-*.md.
- Энхансы под страницы: CardTop variant=glass (hero, node 1:3768, фото cardtop-glass.jpg + затухание в bg-base, чёрные пилюли, segmented/footer); CardMetric color (пастели).
- Release Notes — страница /release-notes (рендер release-notes.json). Правило (CONTRIBUTING): каждое изменение обновляет release-notes + доки + зеркальный нейминг.
- Зеркальный нейминг — раздел в CONTRIBUTING.md с таблицей конвертации Figma↔React (card_top→CardTop, color/tech/green→--ds-color-tech-green, All_teams→AllTeams и т.д.).
- Navbar превью: добавлен раздел Pages (ссылки-роуты), левое меню и премиальный вид сохранены.
- Решение по «[deprecated]»: страницы 1:4010/1:4092 помечены deprecated в Figma — строим под чистыми именами (AllTeams/Candidate), deprecated-статус не переносим (это маркер, не имя).

## D46. Parity-правки страниц + свёрнутый sidebar + кнопка «назад»

Сверка реализованных страниц с Figma (через MCP) и устранение расхождений:
- 1:4010 AllTeams: hero — ADD TEAM в центр-блок (Frame1698), SwitchGroup отдельным блоком вниз (switch_group y410, gap 160). Для этого segmented вынесен из ds-card-top__hero отдельным дочерним блоком; glass-карточке задан gap 160 (justify-end). Сетка команд — 6 идентичных «Engineering Team» (в Figma это клоны), было 6 разных.
- 1:4071 AllTeamsOne: статусы/роли 10 строк строго по Figma (On Track→green, Rocket Growth→purple, Failing→red); роли исправлены (QA Engineer, Data Analyst, Sales Executive, Content Strategist, Systems Analyst).
- 1:4092 Candidate: пайплайн — 9 стадий (Applied/Interviewed/Onboarding/Half-term/Common/Leads team/Minus one/C-level/Fired), было 5 выдуманных.

Левый sidebar: по умолчанию свёрнут (рельс 56px). railOpen = pinned || hovered. Hover (onMouseEnter/Leave) временно разворачивает (overlay, не двигает раскладку), клик по гамбургеру/кнопке pin закрепляет (pinned в localStorage ds-nav-pinned). Плавно (transition-[width] 200ms). A11y: aria-expanded/aria-pressed/aria-label, фокус-кольца. Мобильный drawer не тронут.

Кнопка «назад»: на страницах через Header onBack → SecondRow Back-pill (стрелка ← + «Back» + aria-label «Назад», состояния hover/focus/active от Button). navigate(-1) с фолбэком на каталог «/». Размещение — ряд крошек (Figma SecondRow), Figma-точно.

Раздел Pages в навигаторе и премиальный вид сохранены. Все страницы сверены по DOM (скриншот-тул флакует на загрузке кастом-шрифтов → детерминированная DOM-проверка). Цель 0 ❌ достигнута по всем трём.

## D47. Бар (tone из палитры), sidebar-аккордеоны, цветные пилюли, активная PROMOTE

- Bar: добавлен tone. default — sage #b8c6c3 / empty (атом, Figma 1:120). green — насыщенный tech-green #00867b + бледный card-green #d4eee7 (Figma team bar: #00867b/#d4eee7). Все бары на СТРАНИЦАХ (Team productivity, Profile long, Personal Development) переведены на tone=green — строго из палитры. big = 2 ряда.
- Sidebar (preview): секции-аккордеоны (счётчик+шеврон) СВЁРНУТЫ по умолчанию; состояние сохраняется (localStorage ds-nav-sections). Раздел Pages — НАВЕРХ отдельным свёрнутым аккордеоном. Рельс (56px) предыдущей итерации убран — sidebar видимый, премиальный вид. Мобильный drawer не тронут.
- Back-кнопки: пользователь подтвердил, что они есть в макете → ОСТАВЛЕНЫ (каталог + страницы). Пункт «убрать из каталога» отменён.
- Profile: проп color (peach/mint/pink/olive/lavender → токены card-*/oncard-*) для разноцветных пилюль Reports/Mentoring (Figma 4092: f7e0dd/d4eee7/fad5e7/e0e2a4/ddd6ef). Прогресс-бар long — tone=green.
- CardTop: проп activeAction — активная тёмная пилюля (Figma PROMOTE #000, остальные белые).
- AllTeams метрики: цвета из палитры (card-red/pink/lavender/olive). Hero glass 830×480 cover — полноширинный (подтверждено DOM).
- Candidate: PD-бар big+green (Figma 770×12, #00867b/#d4eee7); активная PROMOTE; цветные пилюли.
Всё сверено по DOM (скрин-тул флакует на шрифтах). 0 ❌.

## D48. Шапки (4013/4093), ровный Team-список, капсула метрик, страница Hiring campaign (4144)

- Шапки сверены с Figma: 1:4013 (glass-hero All teams: ADD TEAM центр, SwitchGroup внизу) и 1:4093 (header Candidate: topmenu + BACK + крошки + пайплайн 9 стадий) — уже соответствуют (D46/D47), визуально подтверждено.
- Team-список (1:4071): Profile variant=long переведён на ровную сетку — фикс-колонки [аватар][имя/роль 220][статус 150][бар flex]; статусы по x=562, бары по x=732, ширина 310 (DOM). Раньше колонки плавали (хаотично).
- Метрики (1:4010): столбчатый мини-график заменён горизонтальной капсулой (progress-pill) — проп CardMetric.progress, трек control-on-color (белый, в dark — белый на пастельном острове), заполнение text-primary. Решение по требованию пользователя (реф = капсула), отступает от текущих столбиков Figma 4010 — зафиксировано. Цвета из палитры.
- Новая страница Hiring_campaign (1:4144) → src/pages/screens/HiringCampaign.tsx, роут /pages/hiring-campaign, в navbar Pages. Состав строго из существующих компонентов: CardTop(yellow, activeAction=Finish) + Task×6 (компактные, без error — как в макете) + CardMetrica×3 + CampaignPreview(Funnel, 5 метрик) + Canban(Pipeline). Дубликаты не плодились.
Всё сверено DOM+скриншотами. 0 ❌.
