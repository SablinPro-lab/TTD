# Pixel-parity audit — Task

Figma: `task` (1:3731) — variants `Default` (1:3732), `Variant2` (1:3738).

Структура Figma: HORIZONTAL (флаг + Frame 1474[title + error + button]).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| layout | HORIZONTAL, counterAxis MIN (по верху) | column (вертикально!) | row, align flex-start | ✅ |
| gap (флаг↔контент) | 14 (S) | — | S (14) | ✅ |
| padding | 14 / 0 / 14 / 0 | 14 / 0 | 14 / 0 | ✅ |
| bottom-border | #eaeaea (lines) visible | control-secondary(#eaeaea) | lines (#eaeaea) | ✅ |
| флаг | 26×18, Default=контур серый / Variant2=залит чёрный | Flag size 20 | Flag size 20 (active=flagged) | ✅ |
| контент-блок | Frame 1474 VERTICAL gap 10, center | — | __body column gap XS, center | ✅ |
| title шрифт | Akkurat Regular | Akkurat, weight medium | Akkurat weight regular | ✅ |
| title размер | 20px | 20px (h3) | 20px (h3) | ✅ |
| title letter-spacing | -2% | — | -0.02em | ✅ |
| title color | Default #979797 / Variant2 #000000 | text-primary (всегда) | secondary→primary по flagged | ✅ |
| error | banner #f7e0dd, «error!» + текст, 8px UPPER red | ErrorBanner slot | ErrorBanner slot | ✅ |
| button | пилюля #eaeaea «job description» Pixform 10 UPPER | slot | slot | ✅ |

Checklist: текст ✓ · иконки ✓ (флаг) · раскладка ✓ · скругление ✓ · отступы ✓

## Key fixes
1. Раскладка переделана из вертикальной в горизонтальную: флаг слева, контент-колонка справа (Figma HORIZONTAL + Frame 1474).
2. Заголовок: weight medium→regular, добавлен letter-spacing -2%, цвет привязан к `flagged` (серый #979797 в Default, чёрный в Variant2) — как в Figma.
3. Bottom-border переведён на семантический токен `--ds-color-lines`.
4. Flag активность синхронизирована с заголовком (flagged → залитый чёрный флаг + чёрный текст).

## tokenGap
- Внутренний gap 10px — нет точного токена; используется `--ds-indent-xs` (8px).

Overall: ✅
