# Button — pixel-parity audit (Figma 1:1840)

Варианты: secondary (1:1841), On color (1:1843), CTA/small (1:1845), CTA/big (1:1847), node (1:1849).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Скругление (secondary/onColor/cta) | 999 (пилюля) | radius-s (4px) | radius-over (999) | ⚠️ исправлено |
| Скругление (node) | 4 | radius-s (4) | radius-s (4) | ✅ |
| Шрифт (caps-кнопки) | Pixform | Akkurat (`--ds-font-family`) | `--ds-font-family-pixel` | ⚠️ исправлено |
| Размер шрифта (small) | 10px | text-gr 11px | 10px (tokenGap) | ⚠️ исправлено |
| Letter-spacing (small) | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| textCase (small) | UPPER | uppercase | uppercase | ✅ |
| Шрифт big | Instrument Serif 40px | display 30px | display, font-size description (30px, tokenGap) | ⚠️ исправлено |
| Letter-spacing big | -1% | 0 | -0.01em | ⚠️ исправлено |
| padding small/sec/onColor | 8/14/8/14 | XS/S | XS/S (8/14) | ✅ |
| padding big | 14/14/20/14 | S/L | S/S/M/S (14/14/20/14) | ⚠️ исправлено |
| padding node | 14 все | — (наследовал) | S (14) | ⚠️ исправлено |
| Fill secondary | #eaeaea | control-secondary | control-secondary | ✅ |
| Fill onColor | #ffffff | control-on-color | control-on-color | ✅ |
| Тень onColor | нет | shadow-1 | нет (тень только на hover) | ⚠️ исправлено |
| Fill cta | #000000 | --ds-color-black | --ds-color-black | ✅ |
| Цвет текста cta | #f2f2f2 | text-on-color (#fff) | text-on-color | ✅ (близко) |
| Fill node | #f7e0dd | oncard-red | oncard-red | ✅ |
| Тень node | нет | shadow-1 | нет (тень только hover) | ⚠️ исправлено |
| node — две строки | title (Akkurat 11) + subtitle (Pixform 10 caps) | одна строка | + опц. `subLabel` (Pixform 10 caps) | ⚠️ исправлено |
| Layout node | VERTICAL, align MIN, gap 8 | column, gap XXXS, align flex-start | column, gap XS, flex-start | ⚠️ исправлено |

Checklist: текст ⚠️ (шрифт/размер/spacing) · иконки ✓ (нет) · раскладка ✓ · скругление ⚠️ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- small font-size = 10px — нет точного токена (caps=8px, text-gr=11px). Захардкожен 10px.
- big font-size = 40px — ближайший токен `--ds-font-size-description` (30px) использован вместо точного 40px (нет токена 40px). Захардкодить 40px было бы точнее, но правило: ближайший токен. Записан как tokenGap.
- letter-spacing 20% (0.2em) и -1% — нет токенов (caps=0.08em), захардкожены.
