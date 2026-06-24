# Renames — Stage Prepare

Захвачено: 2026-06-23 19:1x. Конвенция — см. DECISIONS D19.

## Figma (component sets): старое → новое

| id | старое | новое | причина |
|---|---|---|---|
| `1:1840` | btn | button | abbr → полное слово, согласовано с React Button |
| `1:1833` | switch group | switch_group | пробел → snake_case |
| `1:1936` | card metric | card_metric | пробел → snake_case |
| `1:1942` | Cards metrica | card_metrica | пробел/Capital/plural → snake_case singular |
| `1:3744` | card top | card_top | пробел → snake_case |
| `1:1948` | attemt | attempt | опечатка attemt → attempt |
| `1:1985` | second-row | second_row | hyphen → snake_case |

## React: ренеймов нет

React-компоненты уже в PascalCase (этап миграции). Маппинг figmaName↔reactComponent — в `.figma-snapshot.json`.

## Отложено (variant-props)

Имена variant-свойств в Figma неоднородны ('Property 1', 'type', 'CTA?', 'switch', 'menu', 'size').
Это глубокий уровень компонентов — нормализация на этапах Atoms/Molecules/Organisms.
