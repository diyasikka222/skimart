interface PageTitleProps {
  title: string
  description?: string
  id?: string
}

export function PageTitle({ title, description, id }: PageTitleProps) {
  return (
    <div>
      <h1 id={id} className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-ink-secondary sm:text-base">{description}</p>
      )}
    </div>
  )
}