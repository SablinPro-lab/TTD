---
name: figma-sync
description: Синхронизирует Figma-компоненты с React-доками и release notes. Читает компоненты из Figma через MCP, сравнивает со снапшотом .figma-snapshot.json, находит ручные правки (Description, варианты), проводит их в <Component>.docs.mdx + Figma Description + release-notes.json и обновляет снапшот. Запускай по фразам «figma-sync», «синхронизируй фигму», «подтяни изменения из Figma», «sync figma docs».
---

# Skill: figma-sync

Назначение: держать Figma (источник правды визуала) и React-дизайн-систему в одном состоянии.
Ловит ручные правки, сделанные напрямую в Figma, и проводит их в код/доки/release notes.

Файл Figma: `ct9b7yfSwULxIG3mIPlSg8` («Тестовая дизайн-система»).
Детерминированное ядро диффа — `scripts/figma-sync.mjs` (см. `scripts/README.md`).

## Процесс (выполнять по шагам)

1. **Что отслеживаем.** Прочитай `.figma-snapshot.json` → возьми список `components` (их `nodeId`,
   `figmaName`, `reactComponent`, `docPath`).

2. **Выгрузить живое состояние из Figma.** Для каждого `nodeId`:
   - **ОБЯЗАТЕЛЬНО** сначала загрузи скилл `figma-use` (он нужен перед любым `use_figma`).
   - Через `use_figma` прочитай у компонента/компонент-сета:
     - `description` (поле Description),
     - имена вариантов (дочерние COMPONENT-ноды у COMPONENT_SET).
   - Собери объект той же формы, что снапшот, и запиши в `.figma-live.json`
     (ключи: `fileKey`, `fileName`, `components{ <nodeId>: {nodeId, figmaName, reactComponent, docPath, description, variants[]} }`).

3. **Дифф.** Запусти `npm run figma:sync` (dry-run) — покажет расхождения снапшот ↔ Figma.

4. **Применить.** Запусти `npm run figma:sync -- --apply`. Скрипт:
   - допишет записи в `src/release-notes/release-notes.json`,
   - обновит `.figma-snapshot.json`,
   - напечатает список доков/Description, которые надо привести в соответствие.

5. **Привести в соответствие (ручная часть, через тебя):**
   - для каждого изменённого компонента обнови его `<Component>.docs.mdx` (текст «Назначение»,
     таблицу props/вариантов) — содержимое должно совпасть с новым Description;
   - если правка шла из кода, а не из Figma — наоборот, запиши новый текст в Figma `Description`
     через `use_figma` (после `figma-use`);
   - синхронизируй страницу **«Release Notes»** в Figma с `release-notes.json` (новые записи сверху).

6. **Проверка.** Убедись, что `npm run build` зелёный и `npm run docs:check` (на застейдженных
   файлах) проходит. Все принятые допущения занеси в `DECISIONS.md`.

## Замечания

- Запись Description и страниц **в** Figma возможна только через Figma MCP (`use_figma`), поэтому
  это делает скилл (агент), а не standalone-скрипт. Чистый Node-скрипт лишь диффит снапшот ↔ live.
- Пробелы в пути проекта ломают Storybook (MDX), поэтому витрина/доки — на чистом Vite+React.
  Подробности и решения — `DECISIONS.md`.
