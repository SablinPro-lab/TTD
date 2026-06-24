export type ReleaseNoteType = 'added' | 'changed' | 'fixed' | 'deprecated'

export interface ReleaseNote {
  /** ISO-дата YYYY-MM-DD. */
  date: string
  /** Имя компонента или 'Tokens'. */
  component: string
  /** Тип изменения. */
  type: ReleaseNoteType
  /** Что изменилось (человекочитаемо). */
  change: string
}
