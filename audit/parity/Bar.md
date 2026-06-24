# Pixel-parity: Bar ← Figma `bar` (1:120)

Figma: точечный (dotted) прогресс-индикатор. Точка = Rectangle 5×5px, cornerRadius 20 (=полный круг),
itemSpacing 2px → шаг 7px. Filled = #b8c6c3 (Bar/filled), empty = #ffffff (Bar/empty).
- **Default**: один ряд точек, высота трека 5px.
- **big**: каждая «колонка» — вертикальный стек из 2 точек (5 + 2 + 5 = 12px), колонки с шагом 7px → 2 ряда, высота 12px.

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Диаметр точки | 5px | 5px | 5px (`--ds-dot`) | ✅ |
| Зазор / шаг | 2px / 7px | 2px / **8px** | 2px / 7px (`--ds-step`) | ✅ исправлено |
| Радиус точки | круг | круг (radial) | круг (radial) | ✅ |
| Цвет пустых | #ffffff | **control-secondary #eaeaea** | `--ds-color-bar-empty` #fff | ✅ исправлено |
| Цвет заполненных | #b8c6c3 | bar-filled #b8c6c3 | `--ds-color-bar-filled` | ✅ |
| Высота default | 5px | 5px | 5px | ✅ |
| big: размер точки | 5px (×2 ряда) | **8px (1 ряд)** | 5px, 2 ряда, h=12px | ✅ исправлено |
| Высота big | 12px | 8px | 12px | ✅ исправлено |
| Заполнение | пропорционально value | width %% | width %% | ✅ |

Checklist: текст — (n/a) · иконки/форма ✓ (круглые точки 5px, шаг 7px) · раскладка ✓ · скругление ✓ (круг) · отступы ✓ (шаг 7px).

Overall: ✅

## tokenGap
Нет. Все значения легли на токены (`--ds-color-bar-empty`, `--ds-color-bar-filled`; шаг 7px/12px — геометрия точек, не токенизируется).
