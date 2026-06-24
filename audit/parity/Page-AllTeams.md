# Parity: Page «All teams» (Figma 1:4010) ↔ React `AllTeams.tsx`

Источник: Figma «Тестовая дизайн-система» `ct9b7yfSwULxIG3mIPlSg8`, node **1:4010** (`[deprecated] All_teams`).
React: `src/pages/screens/AllTeams.tsx` (+ общий каркас `PageFrame.tsx`). Прогон: 2026-06-24.

Метод: вытянута точная структура из Figma MCP (`get_design_context`), сверена со скриншотом
`.screenshots/fig-page-allteams.png`. Раскладка/отступы/радиусы/типографика — токенами Tailwind
(`gap-ds-*`, `p-ds-*`, `rounded-l`, `text-*`, `font-display`) или внутри компонентов ДС.

## Diff Figma ↔ React

| Секция (Figma node) | Figma | React | Статус |
|---|---|---|---|
| Header (1:4011) | logo · табы · user-menu · крошки | `PageFrame` → `<Header>` logo «Hired & Wired», CTA «Generate report», табы All teams/All templates, «Profile · Log out», крошки Home·Something·Something | ✅ |
| Frame 1356 (1:4012) | контент-колонка 830px, gap 4 | `-mx-ds-l` колонка (830 = 782 + 2×24 padding), `gap-ds-xxs` (4px) | ✅ |
| card_top glass (1:4013) | hero «All teams» / сабтайтл / switch_group [Overview·Employees·Report] / btn «add team» | `<CardTop variant="glass">` name/role + `segmented=<SwitchGroup>` + `footer=<Button cta>Add team` | ✅ |
| Frame 1707 (1:4014) — 4 метрики | Health / Productivity / Distribution / Hiring, mini-graph + caption | `grid-cols-4 gap-ds-xxs` из `<CardMetric>` ×4 | ✅ |
| метрика captions | Overall: Good · +12% This Month · 8 Teams Active · 15 Open Position | те же тексты | ✅ |
| метрика цвета (по брифу) | Health=red, Productivity=lavender, Distribution=green, Hiring=olive | `color` props совпадают с брифом | ⚠️ |
| Frame 1354 (1:4019) — сетка команд | 2 колонки × 3 ряда, gap 4 | `grid-cols-2 gap-ds-xxs` из `<Team>` ×6 | ✅ |
| team (1:4020) | «Engineering Team» · 24 people · Productivity 89% · highlight · avatars +21 | первая карточка 1:1; ещё 5 — синтетические команды того же шаблона | ✅ |

## Чек-лист

- текст ✓ — заголовок/сабтайтл hero, сегменты, метрики-captions, первая team-карточка — дословно из Figma.
- изображения ✓ — glass-фон hero и аватары — из компонентов ДС (CardTop glass-img, Avatar-силуэты).
- dropdowns ✓ — сегментный `SwitchGroup` интерактивен (`useState`), таб-переключатель в Header — рабочий.
- раскладка ✓ — header → glass-hero → 4-up метрики → 2-up команды; gap 4px между секциями (`gap-ds-xxs`).
- скругление ✓ — карточки `rounded-l` (12px) через компоненты; hero/метрики/team — radius L.
- отступы ✓ — только токены (`gap-ds-xxs/m`, `p-ds-xl`, `px-ds-l`, `py-ds-xl`), без произвольных px кроме `w-[830px]`/`grid-cols-*`.

## Отклонения / token-gaps

- ⚠️ **Цвета метрик** заданы по явному маппингу брифа (red/lavender/green/olive). В самом Figma
  1:4014 фактически red/pink/violet(lavender)/yellow. Следую брифу как источнику требований.
- ⚠️ **5 из 6 team-карточек — синтетические** (Figma-инстансы все клоны «Engineering Team»;
  реальные данные есть только у первой). Шаблон и метрики идентичны компоненту.
- `[&>.ds-team]:min-w-0` снимает `min-width:440px` карточки Team (Figma-ширина 413px), чтобы 2
  колонки уложились в 830px-фрейм. `[&>.ds-card-metric]:w-full` — метрики тянутся на равные доли
  (Figma flex-1) вместо фикс-190px. Оба — arbitrary-варианты (селекторы), не хардкод значений.

**Итог: ✅ (0 ❌).**
