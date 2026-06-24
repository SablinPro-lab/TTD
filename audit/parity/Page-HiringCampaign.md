# Parity: Page «Hiring campaign» (Figma 1:4144) ↔ React `HiringCampaign.tsx`

Источник: Figma `ct9b7yfSwULxIG3mIPlSg8`, node **1:4144** (`Hiring_campaign`).
React: `src/pages/screens/HiringCampaign.tsx` (+ `PageFrame.tsx`). Роут `/pages/hiring-campaign`. D48.

| Параметр | Figma | React | Статус |
|---|---|---|---|
| Header + BACK + крошки | Hired & Wired / Generate report / tabs / Profile·Log out / Back / Home•Something•Something | PageFrame → Header + SecondRow back | ✅ |
| CardTop (yellow) | «Senior Frontend Developer Campaign» + «Active campaign» + Teams/Access + Finish(active)/Cancel/Suspend/Fire + теги (Frontend-team/Innovation Lab/Lead Developer/Member + Add) + Level 4 (code red) + Add | CardTop variant=default, activeAction=Finish, tags/tagsRight | ✅ |
| Task (чеклист) | белая карточка «Task» + 6 задач (флаг + заголовок + кнопка): Confirm budget / Define role… / Post job… / Review applications / Conduct interviews / Onboarding paperwork | section + 6× Task (flagged 1-3, action onColor) | ✅ |
| 3 метрики (CardMetrica) | Applications 142 «Total received» / in Progress 28 «Active candidates» / Conversion Rate 19.7% «To interview stage» | grid-cols-3 × CardMetrica | ✅ |
| Funnel (CampaignPreview) | «Funnel» + Active + More info + 142/89/282/31/4 (Applied/Rejected/In progress/Final round/Offers sent) | CampaignPreview title=Funnel, status green, 5 метрик | ✅ |
| Pipeline (Canban) | борд Applied 4 / Screening 6 / Interview 3 / Offer 1 | Canban title=Pipeline, 4 колонки | ✅ |
| Отступы/скругление | content 830px, gap-секций 4 (ds-xxs), radius L | -mx-ds-l + gap-ds-xxs, rounded-l | ✅ |

**Чек:** текст ✓ · изображения (фон CardTop, аватары) ✓ · бар/точки (Canban) ✓ · цвета ✓ · выравнивание ✓ · dropdowns/tabs ✓ · раскладка ✓ · скругление ✓ · отступы ✓
**Статус: ✅** — собрана из существующих компонентов (без дубликатов), 0 ❌.
