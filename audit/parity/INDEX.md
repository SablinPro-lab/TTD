# Parity-аудит: Figma ↔ React (33 компонента)

> Обновлено D43: добавлен организм **Canban** (1:2048); по фидбэку доведены до идентичности
> CampaignPreview (5 метрик), Notify (текст+pill), CardMetrica (перенос заголовка / «съехала»),
> Attempt (офферы+перки), CardTop (текстура). Превью: убрано адаптивное сжатие — компоненты в
> натуральную figma-ширину.


Источник: Figma «Тестовая дизайн-система» `ct9b7yfSwULxIG3mIPlSg8`
(atoms 1:119 · molecules 1:1852 · organisms 1:1984). Прогон: 2026-06-24 (см. DECISIONS D41–D42).

Метод: для каждого компонента вытянута точная спека из Figma MCP (геометрия, auto-layout,
padding/gap, типографика, цвета→hex, strokes, effects, per-corner radius), сверена с React и
исправлена под макет. Детали по каждому — в одноимённом `<Component>.md`.

**Легенда:** ✅ совпадало (правок мало/нет) · ⚠️ приведено к Figma (были расхождения — исправлены;
возможны задокументированные token-gaps) · ❌ не удалось. **Итог: 0 ❌.**

## Atoms (16)

| Компонент | Статус | Ключевое |
|---|---|---|
| Button | ⚠️ | radius → pill (999) для secondary/onColor/cta; текст → Pixform 10px; node = 2 строки (title+subLabel); убраны базовые тени |
| Switch | ⚠️ | padding big 14 / small 8/14; big-лейбл Pixform, small Akkurat 8px; on/small fill #eaeaea |
| SwitchGroup | ⚠️ | контейнер radius M(8); gap XXXS(2); пункты Pixform 10px; убрана тень активного |
| Input | ⚠️ | лейбл → primary; поле Pixform 10px UPPER; padding 8/14 |
| TextArea | ⚠️ | лейбл → primary; поле Pixform; placeholder серый 10px; padding 8/14 |
| Dropdown | ⚠️ | default fill #eaeaea без тени; лейбл brown для onColor; Pixform; padding 8/14 |
| Status | ⚠️ | точка 8→5px; лейбл 11→10px Pixform; stopped → серый #cbcbcb |
| Tag | ⚠️ | control fill #eaeaea + X-иконка; static персик; padding 8; Pixform |
| Bar | ✅ | шаг точек 7px (dot 5 + gap 2); empty-точка белая; big = 2 ряда (h12) |
| Avatar | ✅ | размер 40→30px; убраны кольцо/фон на фото (фото-кружок) |
| AvatarGroup | ✅ | аватар 30px; нахлёст −8px; без кольца |
| Icon | ⚠️ | размер 24→16px; глифы — инлайн-SVG в стиле DS (Figma=SF Symbols, проприетарный шрифт недоступен) |
| Flag | ✅ | active=серый #979797 (Figma yes=filled gray, no=outline) |
| ErrorBanner | ✅ | padding 8; 8px caps regular; без тени; ls 0.2em |
| ListItem | ✅ | нижняя линия 1px; заголовок 20px regular; мета Pixform 10px |
| Graph | ✅ | gap 2px; столбцы серые #979797 |

## Molecules (10)

| Компонент | Статус | Ключевое |
|---|---|---|
| Profile | ✅ | имя ls −2%; имя↔роль gap 8; аватар 30px; short padding 14 |
| FlowNode | ✅ | bg card-red; radius 12; коннектор-точки слева серая/справа чёрная; subtitle Pixform |
| CampaignPreview | ⚠️ | title Instrument Serif 40px (h2); значения 84px; radius 12; padding 30; убрана тень |
| ProjectPreview | ✅ | desc 20px ls −2%; теги Pixform 10px, gap 2, h32 |
| ExperiencePreview | ✅ | period Pixform 10px; company/desc 11px чёрные; gaps 14/8/30 |
| Team | ✅ | radius 12; padding 30; PRODUCTIVITY/HIGHLIGHT — Akkurat 8px серый; 24 PEOPLE/+N/highlight — Pixform 10px |
| CardMetric | ✅ | столбцы графика #000→bg-base; gap 2; radius 12; caption Pixform |
| CardMetrica | ⚠️ | title сериф 40px; value 84px; добавлен caption «Total received» (Pixform) |
| Attempt | ⚠️ | раскладка [offer | center-status | offer]; сумма сериф 40px; перки Pixform 10px |
| Notify | ✅ | текст Pixform 30px UPPER; колонка gap 14; radius 12; padding 30; без тени |

## Organisms (6)

| Компонент | Статус | Ключевое |
|---|---|---|
| MenuSwitch | ✅ | active = белая 1px рамка на прозрачном (было бел. pill); 11px Akkurat |
| TopMenu | ⚠️ | SPACE_BETWEEN: [logo·(action+tabs)] · [Profile·Log out]; user-menu чёрный Akkurat 11px; tab gap 20 |
| SecondRow | ⚠️ | разделитель крошек › → •; крошки чёрные 11px; Back-pill бел.+зелёная рамка |
| Header | ⚠️ | добавлен недостающий точечный Bar над стадиями (проп `progress`); стадии Pixform |
| Task | ✅ | раскладка вертик.→горизонт. (флаг слева); цвет заголовка завязан на состояние |
| CardTop | ⚠️ | имя Instrument Serif 84px по центру; роль gold Pixform 30px; pill-действия белые круглые; нижние ряды тегов (brown + иконка + «Add»); D43: добавлена радиальная текстура фона |
| **Canban** (D43) | ✅ | **новый** организм (node 1:2048): заголовок «Pipeline» Serif 84 + белая карточка с 4 колонками-стадиями (header сериф + счётчик) и строками-людьми (аватар·имя·роль) |

## Token-gaps → новые токены (D42)

Агенты многократно упирались в отсутствие токена; заведены централизованно в `theme.css`:
- `--ds-font-size-control: 10px` — Pixform-текст контролов/мелких лейблов.
- `--ds-font-size-h2: 40px` — Instrument Serif mid (заголовки кампаний/сумм/секций).
- `--ds-letter-spacing-pixel: 0.2em` — Pixform 20% трекинг.

Хардкоды 10px/40px/0.2em заменены на эти токены (13 CSS-файлов). Остаточные литералы —
**геометрия компонентов** (точка 5px, высота тега 32px, фиксированные размеры карточек), не
дизайн-токены; так же как предсуществующие dot-размеры.
