# Pixel-parity audit — TopMenu

Figma: `topmenu` (1:2001) — variants `all` (1:2002), `templates` (1:2012), `off` (1:2022).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| layout | HORIZONTAL, SPACE_BETWEEN, center | flex, gap M, нет space-between | flex space-between center | ✅ |
| padding | 14 / 20 / 14 / 20 | 14 / 24 (S/L) | 14 / 20 (S/M) | ✅ |
| левый блок | Frame 1357: логотип + (действие+табы), gap 90 | logo, action, tabs в одном ряду | __left gap XXL(90) | ✅ |
| действие+табы gap | 20 (M) | — | __controls gap M | ✅ |
| табы gap | 20 (M) | gap XS (8) | gap M (20) | ✅ |
| логотип | «Hired & Wired» Instrument Serif 23px, чёрный, НЕ uppercase | display, h3 (20px) | display h3, text-primary | ⚠️ |
| действие | белая пилюля «Generate report» Pixform 10 UPPER | slot (Button cta) | slot | ✅ |
| табы | menu_switch (active=рамка) | MenuSwitch | MenuSwitch (исправлен) | ✅ |
| user-меню | «Profile  Log out» Akkurat 11px ЧЁРНЫЙ, НЕ uppercase, gap 8 | uppercase, secondary, opacity .7, ls caps | 11px text-primary, gap XS, без uppercase | ✅ |
| user позиция | справа (SPACE_BETWEEN) | margin-left auto | space-between + flex | ✅ |
| активный таб | `all`→All teams, `templates`→All templates | value-driven | value-driven | ✅ |

Checklist: текст ✓ · иконки ✓ (нет) · раскладка ✓ · скругление ✓ · отступы ✓

## Key fixes
1. Раскладка: добавлены группы `__left` (логотип+контролы, gap 90) и право-выровненный `__user` через SPACE_BETWEEN — раньше всё было одной строкой с gap.
2. User-меню перекрашено в чёрный Akkurat 11px без uppercase/letter-spacing/opacity (Figma «Profile / Log out» — обычный чёрный текст).
3. Табы gap 8 → 20 (M); padding 14/24 → 14/20.
4. Логотип остаётся Instrument Serif (display).

## tokenGap
- Логотип 23px — нет токена; используется `--ds-font-size-h3` (20px), ближайший. Не добавляли токен.

Overall: ⚠️ (только размер логотипа 23px vs токен 20px)
