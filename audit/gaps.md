# Gaps — Figma ↔ React

Захвачено: 2026-06-23 19:11.

## Общее (есть и в Figma, и в React) — 32

- bar → `Bar`
- avatar → `Avatar`
- status → `Status`
- icons → `Icon`
- switch → `Switch`
- flag → `Flag`
- tag → `Tag`
- error → `ErrorBanner`
- avatars → `AvatarGroup`
- list → `ListItem`
- text_area → `TextArea`
- input → `Input`
- dropdown → `Dropdown`
- graph → `Graph`
- switch_group → `SwitchGroup`
- button → `Button`
- profile → `Profile`
- node → `FlowNode`
- campaign_preview → `CampaignPreview`
- project_preview → `ProjectPreview`
- experience_preview → `ExperiencePreview`
- team → `Team`
- card_metric → `CardMetric`
- card_metrica → `CardMetrica`
- attempt → `Attempt`
- notify → `Notify`
- second_row → `SecondRow`
- topmenu → `TopMenu`
- header → `Header`
- task → `Task`
- card_top → `CardTop`
- menu_switch → `MenuSwitch`

## Только Figma — 1

- indents (`1:4478`) — токен-сет (спейсинг), в React представлен токенами theme.css, как компонент НЕ нужен

## Только React — 0

— нет (все React-компоненты имеют Figma-источник)

## Заметки
- Экраны (`src/pages/screens/*`) и страницы приложения (Home/Docs/ReleaseNotes) — не DS-компоненты, в маппинг не входят.
- Токены (`src/styles/theme.css`) зеркалят remote-переменные Figma; маппинг переменных — задача этапа Styles.
