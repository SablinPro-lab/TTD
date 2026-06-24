# Pixel-parity: Icon ← Figma `icons` (1:1747)

Figma: каждая иконка — TEXT-глиф SF Symbols (SF Pro Display Semibold, 12px) на канве 16×16px,
цвет #000000. Глифы: play `􀊄` (play.fill), user `􀉪` (person.fill), more `􀍠` (ellipsis),
arrow-down `􀄈` (arrow.down), close `􀁎` (xmark.circle).

React реализует те же значки как inline-SVG (currentColor) — это легитимная DS-реинтерпретация
SF Symbols (проприетарный шрифт не бандлится). Сверяем размер/цвет/семантику.

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Канва (default size) | 16×16px | **24×24px** | 16px | ✅ исправлено |
| Цвет | #000000 | text-primary #000 | text-primary #000 | ✅ |
| viewBox | (16) | 24 | 24 (масштабируется) | ✅ |
| play | filled ▶ | filled | filled | ✅ |
| user | person.fill | stroked контур | stroked (DS-стиль) | ⚠️ stroke vs fill |
| more | ellipsis (3 dots) | 3 точки | 3 точки | ✅ |
| arrow-down | arrow.down | стрелка | стрелка | ✅ |
| close | xmark.circle | круг + крест | круг + крест | ✅ |

Checklist: текст — (n/a) · иконки ✓ (размер 16, цвет #000, верная семантика) · раскладка ✓ · скругление — (n/a) · отступы — (n/a).

Overall: ⚠️ (значки нарисованы как обводки/заливки в едином DS-стиле, а не точные SF Symbols;
геометрически — однотонные currentColor-иконки 16px, что соответствует роли. Точные глифы SF
невозможны без проприетарного шрифта — см. tokenGap.)

## tokenGap
Шрифт SF Pro Display (иконочные глифы) — проприетарный, не бандлится → значки воспроизведены
inline-SVG. Это осознанное расхождение формы при сохранении размера/цвета/семантики.
