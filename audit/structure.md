# Structure — Stage Prepare

Захвачено: 2026-06-23. Структура приведена в порядок под будущие этапы
**Styles → Atoms → Molecules → Organisms**.

## Figma (после Prepare)

Страницы:
- `Page 1` — вся система (5 секций ниже)
- `Release Notes` — журнал изменений (зеркало React `/release-notes`)

Секции на Page 1 (единый префикс `ds-`):
| секция | роль | этап |
|---|---|---|
| `ds-styles` (было `styles`) | токены-доска: Colors/Typography/Indents | **Styles** |
| `ds-atoms` | 16 компонент-сетов | **Atoms** |
| `ds-molecules` | 10 компонент-сетов | **Molecules** |
| `ds-organisms` | 6 компонент-сетов | **Organisms** |
| `ds-screens` (было `design`) | экраны-композиции; дубли помечены `[deprecated]` | (демо) |

Токены — **remote-библиотека** (D17), не локальные Variables. На этапе Styles: подключить/прочитать
библиотеку переменных и сверить с `theme.css`.

## React (после Prepare)

Физически — плоско, плюс слои-barrel:
```
src/
  styles/theme.css            ← слой Styles (токены --ds-*), зеркало remote-переменных
  components/
    atoms.ts                  ← barrel слоя (re-export 16)
    molecules.ts              ← barrel слоя (re-export 10)
    organisms.ts              ← barrel слоя (re-export 6)
    index.ts                  ← re-export atoms+molecules+organisms
    <Name>/<Name>.tsx|.css|.docs.mdx|index.ts   ← 32 компонента (плоско)
  pages/                      ← Home, Docs, ReleaseNotes, Screens + screens/*
```

Слой компонента определяется его barrel-файлом (atoms/molecules/organisms), что соответствует
секциям Figma. Импорт по слою: `import { Button } from '@/components/atoms'`.

## Целевая физическая структура (план, отложено)

Перенос папок в `src/components/{atoms,molecules,organisms}/<Name>/` — **отложен** (массовое
изменение импортов в Docs.tsx, screens, барелях; риск без выгоды на этапе Prepare). Делать на
этапе, где компоненты и так трогаются. Сейчас слои выражены barrel-файлами — этого достаточно
для следующих этапов. Решение — DECISIONS D21.

---

## Обновление (Prepare v2): Tailwind + Preview

- **Tailwind** подключён (`tailwind.config.js`/`postcss.config.js`, ESM), `theme.extend` мапит токены
  `--ds-*`; preflight off. Утилиты доступны для новых страниц (preview), компоненты не переписывались.
- **Превью-страница** `/preview` (`src/pages/Preview.tsx`) — живой каталог всех компонентов по уровням
  (Styles/Atoms/Molecules/Organisms), стилизована Tailwind. Точка визуальной проверки перед этапами.
- React-слои-barrel (`components/{atoms,molecules,organisms}.ts`) и секции Figma `ds-*` — без изменений.
