# Pixel-parity: Avatar ← Figma `avatar` (1:1727)

Figma: все 3 пресета (katya 1:1728, dog 1:1730, petya 1:1732) — это просто Ellipse 30×30px
с заливкой IMAGE (scaleMode FILL). **Нет** кольца/обводки, **нет** серого фона, **нет** силуэт-глифа.
Дефолтный диаметр = 30px.

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Форма | круг (Ellipse) | круг (radius-over) | круг (radius-over) | ✅ |
| Диаметр (default) | 30px | **40px** | 30px | ✅ исправлено |
| Заливка | IMAGE, FILL | img object-fit cover | img object-fit cover | ✅ |
| Кольцо/обводка | **нет** | inset 1px gray | убрано (нет при картинке) | ✅ исправлено |
| Фон | нет (картинка) | control-secondary всегда | прозрачный при `<img>` | ✅ исправлено |
| Силуэт (нет src) | — (в Figma всегда картинка) | человек/лапа | оставлен как graceful-fallback | ⚠️ extra |

Checklist: текст — (n/a) · иконка/картинка ✓ (image-fill, cover) · раскладка ✓ · скругление ✓ (круг) · отступы — (n/a).

Overall: ✅ (силуэт остаётся только как фолбэк без `src` — обратная совместимость с preview-каталогом, где аватары без картинок).

## tokenGap
Нет.
