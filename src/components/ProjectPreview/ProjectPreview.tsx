import './ProjectPreview.css'

export interface ProjectPreviewProps {
  description: string
  /** Стек/метки проекта (жёлтые чипы). */
  tags?: string[]
}

/**
 * ProjectPreview — карточка проекта: описание + жёлтые теги стека.
 * Источник правды: Figma → ds-molecules → `project_preview` (node 1:1904).
 */
export function ProjectPreview({ description, tags = [] }: ProjectPreviewProps) {
  return (
    <div className="ds-project">
      <p className="ds-project__desc">{description}</p>
      {tags.length > 0 && (
        <div className="ds-project__tags">
          {tags.map((t) => (
            <span key={t} className="ds-project__tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectPreview
