# Duplicates — Stage Prepare

Захвачено: 2026-06-23. Действие — **не удаляем**, помечаем `[deprecated] ` (обратимо).
Компонент-сеты: дубликатов нет (все имена уникальны). Дубли/черновики — в секции `design` (экраны).

## Черновые фреймы (6) → [deprecated]

- `1:3788` «Frame 1450»
- `1:3797` «Frame 1451»
- `1:3804` «Frame 1452»
- `1:3812` «Frame 1453»
- `1:3820` «::»
- `1:4397` «Frame 1454»

## Дубли экранов: канон + deprecated

| Имя | Канон (kept) | Помечены deprecated |
|---|---|---|
| Hiring_campaign | `1:4144` (h=2492) | `1:3827`, `1:3837` |
| All_teams_campaigns | `1:3847` (h=1898) | `1:3856`, `1:3865` |
| Candidate | `1:3874` (h=1853) | `1:4092` |
| All_teams | `1:4050` (h=1736) | `1:4010`, `1:4026` |
| Automation_mail-editor | `1:4188` (h=933) | `1:4230`, `1:4272` |

_Канон выбран по максимальной высоте (наиболее полный экран)._

## Уникальные экраны (оставлены без изменений)

- Negotiate (`1:3926`)
- Candidate_interviewed (`1:3950`)
- All_teams_one (`1:4071`)
- Hiring_campaign_add (`1:4163`)
- Success (`1:4177`)
- Hiring_campaign_wizard (`1:4312`)
- Hiring_campaign_wizard--viewport (`1:4353`)

## Откат

Исходные имена design-фреймов — в `audit/figma-snapshot.before-prepare.json` (поле `designFrames`).
Снять deprecation: вернуть имя без префикса `[deprecated] `.
