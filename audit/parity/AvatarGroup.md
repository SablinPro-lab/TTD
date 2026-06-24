# Pixel-parity: AvatarGroup ← Figma `avatars` (1:1782)

Figma: HORIZONTAL, primaryAxis MIN, counterAxis CENTER, itemSpacing **−8px** (фиксированный нахлёст),
аватары — инстансы avatar 30×30px (image-circle, без кольца). В Figma 3 аватара, без «+N».
(Сиреневая рамка #9747ff вокруг — это bounding-box variant-set'а, не часть компонента.)

| Параметр | Figma | React (до) | React (после) | Статус |
|---|---|---|---|---|
| Раскладка | inline-flex, align center | inline-flex | inline-flex + align center | ✅ исправлено |
| Размер аватара | 30px | **32px** | 30px | ✅ исправлено |
| Нахлёст | −8px (фикс.) | **−round(size·0.3)** ≈ −10px | −8px (`--ds-indent-xs`) | ✅ исправлено |
| Кольцо вокруг item | нет | **2px bg-base** | убрано | ✅ исправлено |
| «+N» | нет в Figma | есть (`max`) | сохранено (доп. фича) | ⚠️ extra |
| Скругление | круг | круг | круг | ✅ |

Checklist: текст — («+N» pixel-стиль, доп.) · иконки/картинки ✓ · раскладка ✓ (нахлёст −8) · скругление ✓ · отступы ✓.

Overall: ✅ («+N» — обратно-совместимая надстройка, в Figma-варианте отсутствует).

## tokenGap
Нет (нахлёст −8px = `--ds-indent-xs`).
