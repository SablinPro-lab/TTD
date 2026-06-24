# Parity: Page «Candidate» (Figma 1:4092) ↔ React `Candidate.tsx`

Источник: Figma «Тестовая дизайн-система» `ct9b7yfSwULxIG3mIPlSg8`, node **1:4092** (`[deprecated] Candidate`).
React: `src/pages/screens/Candidate.tsx` (+ `PageFrame.tsx`). Прогон: 2026-06-24.

Метод: структура из Figma MCP (`get_design_context`), сверка со скриншотом
`.screenshots/fig-page-candidate.png`. Отступы/радиусы/типографика — токенами или компонентами ДС.

## Diff Figma ↔ React

| Секция (Figma node) | Figma | React | Статус |
|---|---|---|---|
| Header (1:4093) | logo · табы · user-menu · крошки + пайплайн-стадии (h114) | `PageFrame stages={['Sourcing','Screening','Interview','Offer','Hired']}` → Header показывает Bar + стадии | ✅ |
| card_top default (1:4095) | yellow-карточка: углы TEAMS/access, имя «Sarah Mitchell», роль gold «Senior Software Engineer», действия Promote/Negotiate/Suspend/Fire, теги frontend-team/Innovation Lab/Lead Developer/Member + Add, tagsRight «Level 4 (code red)» + Add | `<CardTop variant="default">` name/role + `cornerLeft/Right` + `actions` + `tags` + `tagsRight` | ✅ |
| notify (1:4096) | зелёная плашка + текст + (по брифу) кнопка «More info» | `<Notify action={<Button onColor>More info</Button>}>` тот же текст | ✅ |
| notify текст | «Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.» | дословно | ✅ |
| Achievements (1:4097) | card-olive, padding 30, radius 12: заголовок + 4 колонки (сериф-лейбл + caps-сублейбл) + btn «ALL ACHIEVEMENTS» | `<section bg-card-olive p-ds-xl rounded-l>` + `grid-cols-4` + `<Button>All achievements` | ✅ |
| ачивки | Top performer/Q4 2024 · Team player/Q4 2024 · Innovator/Q4 2023 · Mentor/Q4 2025 | дословно | ✅ |
| Personal Development (1:4113) | белая карточка: dotted Bar + стадии (Onboarding/Adapting/Performing/Ready), «Next Level / Lead Software Engineer», «Prediction: / Febrary 2026», btn «MORE INFO» | `<section bg-card-white>` + `<Bar>` + стадии-ряд + Next Level + Prediction + `<Button>More info` | ✅ |
| Reports to (1:4131) | белая карточка: заголовок + 3 профиля-пилюли (Michael Lee/Product manager, Emily Carter/UX designer, David Smith/Data analyst) + btn «ORG CHART» | `<Profile variant=short/short-outlined>` ×3 + `<Button>Org chart` | ✅ |
| Mentoring (1:4138) | заголовок + 3 профиля-пилюли (Michael Thompson/Project manager, Emily Davis/UX designer, James Wilson/Data analyst) | `<Profile>` ×3 в той же белой карточке | ✅ |

## Чек-лист

- текст ✓ — имя/роль/действия/теги CardTop, notify, ачивки, стадии, Next Level / Prediction, имена-роли пилюль — дословно из Figma/брифа.
- изображения ✓ — yellow-текстура CardTop (фото + mix-blend), аватары-силуэты — из компонентов ДС.
- dropdowns ✓ — теги/действия CardTop кликабельны (`onTag`/`onAction`), кнопки секций — рабочие; табы Header.
- раскладка ✓ — header(+пайплайн) → CardTop → notify → Achievements → Personal Development → Reports/Mentoring; gap 4px (`gap-ds-xxs`).
- скругление ✓ — все карточки `rounded-l` (12px) через компоненты/секции.
- отступы ✓ — токены `gap-ds-xxs/xs/m/xl/xxl`, `p-ds-xl`; без произвольных px кроме `w-[830px]`/`grid-cols-4`.

## Отклонения / token-gaps

- ⚠️ **Achievements/Personal Development/Reports/Mentoring** в Figma — кастомные фреймы (не отдельные
  компоненты ДС), собраны из примитивов (`Bar`, `Profile`, `Button`) + токен-вёрстки. Сублейблы ачивок
  и стадии — `text-caps` (8px), ближайший токен к figma-7px caps.
- ⚠️ **Цвет пилюль Reports/Mentoring**: Figma-пилюли разноцветные (dropdown red/green/pink). Компонент
  `Profile` short/short-outlined даёт peach/gray — использован микс этих двух вариантов (как в брифе).
- Bar `value` (62%) и точные позиции стадий — приближение к dotted-bar макета (компонент `Bar` —
  точечный, шаг фиксирован токенами).

**Итог: ✅ (0 ❌).**
