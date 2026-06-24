# Parity: Page «All teams one» (Figma 1:4071) ↔ React `AllTeamsOne.tsx`

Источник: Figma «Тестовая дизайн-система» `ct9b7yfSwULxIG3mIPlSg8`, node **1:4071** (`All_teams_one`).
React: `src/pages/screens/AllTeamsOne.tsx` (+ `PageFrame.tsx`). Прогон: 2026-06-24.

Метод: структура из Figma MCP (`get_design_context`), сверка со скриншотом
`.screenshots/fig-page-allteamsone.png`. Отступы/радиусы/типографика — токенами или компонентами ДС.

## Diff Figma ↔ React

| Секция (Figma node) | Figma | React | Статус |
|---|---|---|---|
| Header (1:4072) | logo · табы · user-menu · крошки | `PageFrame` → `<Header>` (тот же каркас) | ✅ |
| Frame 1356 (1:4073) | контент-колонка 830px, gap 4 | `-mx-ds-l` колонка, `gap-ds-xxs` (4px) | ✅ |
| card_top glass (1:4074) | hero «Engineering Team» / сабтайтл «Detailed team overview and performance metrics» / switch_group [Team·Campaigns·Access] | `<CardTop variant="glass">` name/role + `segmented=<SwitchGroup>` (без footer) | ✅ |
| notify (1:4076) | зелёная плашка, Pixform 30 UPPER, без кнопки | `<Notify>` тот же текст, без `action` | ✅ |
| notify текст | «Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.» | дословно | ✅ |
| Frame 1364 (1:4079) — секция Team | белая карточка: заголовок «Team» (сериф) + список профилей gap 2 | `<section bg-card-white rounded-l p-ds-xl>` + `<h2 font-display>` + список gap `ds-xxxs` (2px) | ✅ |
| profile ×10 (1:4082…) | строка long: аватар + имя(20) + роль(Pixform 10) + Status green «On Track» + dotted Bar | `<Profile variant="long">` name/role + `status={green,'On Track'}` + `progress` | ✅ |
| имена/роли | Sarah Johnson/Senior Developer, Michael Smith, Emily Davis, David Brown, Linda Garcia, James Wilson, Alice Thompson, Robert Martinez, Jessica Taylor, Charles Lee | те же 10 имён; роли назначены по брифу | ✅ |

## Чек-лист

- текст ✓ — hero, сабтайтл, сегменты, notify (дословно), заголовок «Team», 10 имён — из Figma/брифа.
- изображения ✓ — glass-фон hero, аватары-силуэты — из компонентов ДС.
- dropdowns ✓ — `SwitchGroup` (Team/Campaigns/Access) интерактивен через `useState`; табы Header рабочие.
- раскладка ✓ — header → glass-hero → notify → белая секция со списком; gap 4px (`gap-ds-xxs`), строки gap 2px (`gap-ds-xxxs`).
- скругление ✓ — hero/notify/секция `rounded-l` (12px); строки Profile — нижняя линия (как в Figma).
- отступы ✓ — токены `gap-ds-xxs/xxxs/xl`, `p-ds-xl`, `px-ds-l`, `py-ds-xl`; без произвольных px кроме `w-[830px]`.

## Отклонения / token-gaps

- ⚠️ **Роли и значения progress** заданы по брифу (Figma все профили — клон «Sarah Johnson /
  Senior Developer / On Track»). Имена — точные; роли разнесены для правдоподобия списка.
- В Figma 10 строк-инстансов; бриф упоминал «~11» — взято фактическое число из макета (10).
- Status во всех строках — green «On Track» (как в Figma-инстансе); вариативность не предполагалась.

**Итог: ✅ (0 ❌).**
