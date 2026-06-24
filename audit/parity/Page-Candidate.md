# Parity: Page «Candidate» (Figma 1:4092) ↔ React `Candidate.tsx`

Источник: Figma `ct9b7yfSwULxIG3mIPlSg8`, node **1:4092**. React: `src/pages/screens/Candidate.tsx` (+ `PageFrame.tsx`).
Обновлено D46 (исправлены стадии пайплайна).

| Параметр | Figma | React | Статус |
|---|---|---|---|
| Header + крошки + «Назад» | Hired & Wired / Generate report / tabs / Profile·Log out / Back / крошки | PageFrame → Header + SecondRow back | ✅ |
| **Пайплайн (стадии)** | **9**: Applied · Interviewed · Onboarding · Half-term · Common · Leads team · Minus one · C-level · Fired | те же 9 (PageFrame stages) | ✅ исправлено (были Sourcing/Screening/Interview/Offer/Hired) |
| CardTop (yellow) | Sarah Mitchell + Senior Software Engineer + Teams/Access + Promote/Negotiate/Suspend/Fire + теги + Level 4 | CardTop variant=default (фото+бленды), теги, tagsRight | ✅ |
| Notify | зелёный + «More info» (onColor) | Notify + action Button onColor | ✅ |
| Achievements | olive-карточка: Top performer/Team player/Innovator/Mentor + Q4-даты + «All achievements» | section card-olive + 4 колонки + Button | ✅ |
| Personal Development | белая: dotted-bar + Onboarding/Adapting/Performing/Ready + Next Level + Febrary 2026 + More info | section + Bar + стадии + Button | ✅ |
| Reports to / Mentoring | белая: 3 + 3 профиля-пилюли + Org chart | section + Profile short/short-outlined + Button | ✅ |
| Отступы/скругление | 830px, gap-секций, radius L | gap-ds-xxs/xl/xxl, rounded-l | ✅ |

**Чек:** текст ✓ · изображения ✓ · dropdowns (нет; tabs/segmented рабочие) ✓ · раскладка ✓ · скругление ✓ · отступы ✓
**Статус: ✅** — 0 ❌.

### D47
- Активная PROMOTE (тёмная #000), остальные белые ✅. Personal Development — бар big+green (2 ряда) ✅.
- Reports/Mentoring — разноцветные пилюли: peach/mint/pink (Reports), olive/lavender/peach (Mentoring) ✅.

### D48
- Шапка (header 1:4093): пайплайн 9 стадий + BACK + крошки — совпадает ✅.

### D49
- Отступы (1:4095): padding 30, space-between, hero 30, actions/tags 2, секции 4 — сверено ✅.
