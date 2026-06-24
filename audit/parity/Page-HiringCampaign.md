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

### D49
- Pipeline (Canban) — full-width: колонки flex:1 (board 1220px), без скролла/обрезки, страница без оверфлоу ✅.

### D50
- Hero (1:4147): фон — жёлтое фото (image cover) ✅; только Finish(active)/Cancel — Suspend/Fire убраны (DOM 2 пилюли) ✅; дропдауны (Frontend-team/Innovation Lab/Lead Developer/Member + Level 4) перенесены ВВЕРХ, сгруппированы, нижний ряд убран (DOM topAboveHero=true) ✅.
- Pipeline (Canban): строки плотнее — row radius 4, имя 20, row-text gap 8; аватары серый+person ✅.

### D51
- Pipeline вынесен в after-слот PageFrame — full-width 1220 без 100vw/overflow (DOM overflow=0), скролл доходит до последнего блока (canban bottom 2538 < scrollH 2628) ✓.
- Hero (1:4147): только Finish/Cancel, дропдауны сверху — соответствует ✓.

### D52
- Адаптив/скролл: убран overflow-x-clip (скролл документом, не контейнером); убрана белая линия под топ-навом (откат хедера); сняты фикс min-width + переносы. DOM: overflow=0 на 1440/1024/900/768/375; десктоп-вид как в Figma ✅.

### D54
- Hero (1:4147): удалены лишние атомы — углы Teams/Access и дропдауны (Frontend-team/Innovation Lab/Lead Developer/Member/Level 4/Add). Остались заголовок + Active campaign + Finish/Cancel; контент центрирован (ds-card-top--centered). По актуальному рефу Figma (gold-на-жёлтом = невидимы). DOM: corners=0, dropdowns=0, overflow=0 ✅.
