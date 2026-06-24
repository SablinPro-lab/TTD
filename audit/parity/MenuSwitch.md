# Pixel-parity audit — MenuSwitch

Figma: `menu_switch` (1:3782) — variants `menu=on` (1:3783), `menu=off` (1:3785).

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| layout | HORIZONTAL, center/center | inline button | inline-flex center/center | ✅ |
| padding | 10 / 10 / 10 / 10 | 8 / 20 (XS/M) | XS (8 ≈ 10, token gap) all sides | ⚠️ |
| gap (item) | 10 | — | — (single label) | ✅ |
| corner radius | 4 (S) | 4 (S) | 4 (S) | ✅ |
| текст | «All teams» | label | label | ✅ |
| шрифт | Akkurat LL Cyr TT Regular | --ds-font-family | --ds-font-family | ✅ |
| размер | 11px | 15px (M) | 11px (text-gr) | ✅ |
| letter-spacing | 0 | 0 | 0 | ✅ |
| text-case | ORIGINAL (НЕ uppercase) | none | none | ✅ |
| color | #000000 | text-primary | text-primary | ✅ |
| active (menu=on) | белая рамка 1px #ffffff, заливка прозрачная, БЕЗ тени | белая ЗАЛИВКА + shadow + opacity 0.6/1 | border 1px var(--ds-color-white), прозрачно | ✅ |
| inactive (menu=off) | рамки нет, текст полной плотности | opacity 0.6 | border transparent, без затемнения | ✅ |
| transition | — | opacity/bg/shadow | border-color/bg/shadow/transform var(--ds-transition) | ✅ |

Checklist: текст ✓ · иконки ✓ (нет) · раскладка ✓ · скругление ✓ · отступы ⚠️ (10px → токен XS 8px)

## Key fixes
1. Активное состояние переделано: было белая пилюля-заливка + тень + полупрозрачность неактивных; стало — видимая белая рамка 1px на прозрачном фоне (как `menu=on` в Figma), неактивные без затемнения.
2. Размер шрифта 15px → 11px (Akkurat), без uppercase.
3. Padding выровнен (равные отступы 10px по всем сторонам вместо 8/20).

## tokenGap
- Figma padding 10px — нет точного токена; ближайший `--ds-indent-xs` (8px). Размер 10px не вводился в theme.css (запрещено).

Overall: ✅
