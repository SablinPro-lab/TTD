# TextArea — pixel-parity audit (Figma 1:1794)

Variant: Property 1=Default (1:1795). Label «head line» + поле с плейсхолдером «type something here».
Шрифты в Figma заданы как Inter (fallback проприетарного Akkurat/Pixform) — мапим на семейства DS.

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| gap (label↔field) | 8 (XS) | XS | XS | ✅ |
| Label — размер | 8px (caps) | caps 8px | caps 8px | ✅ |
| Label — letter-spacing | 20% | 0.08em (caps) | 0.2em | ⚠️ исправлено |
| Label — цвет | #000000 | text-secondary | text-primary | ⚠️ исправлено |
| Label — textCase | UPPER | uppercase | uppercase | ✅ |
| Поле — fill | #ececec ≈ #eaeaea | control-secondary | control-secondary | ✅ (ближайший) |
| Поле — скругление | 4 | radius-s | radius-s | ✅ |
| Поле — padding | 8/14/8/14 | S/M (14/20) | XS/S (8/14) | ⚠️ исправлено |
| Поле — выравнивание текста | сверху (counterAxis MIN) | сверху (textarea default) | сверху | ✅ |
| Текст/плейсхолдер — шрифт | Pixform-эквивалент | Akkurat (поле) | `--ds-font-family-pixel` | ⚠️ исправлено |
| Текст поля — размер | 10px | m 15px | 10px (tokenGap) | ⚠️ исправлено |
| Плейсхолдер — размер | 10px | text-gr 11px | 10px | ⚠️ исправлено |
| Плейсхолдер — цвет | #cbcbcb (gray) | text-secondary @0.5 | --ds-color-gray | ⚠️ исправлено |
| Плейсхолдер — case/spacing | UPPER / 20% | uppercase / caps | uppercase / 0.2em | ⚠️ исправлено |

Checklist: текст ⚠️ (шрифт/размер/цвет/spacing) · иконки ✓ (нет) · раскладка ✓ · скругление ✓ · отступы ⚠️

Overall: ⚠️ исправлено

## tokenGap
- Текст поля font-size = 10px — нет точного токена. Захардкожен 10px.
- letter-spacing 20% — нет токена, захардкожен 0.2em.
- Fill поля #ececec — нет отдельного токена, использован ближайший `--ds-color-control-secondary` (#eaeaea).
