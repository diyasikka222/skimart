import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  as?: 'main' | 'div'
}

/** Centered content wrapper with the shared max-width and gutters. */
export function PageContainer({
  children,
  className,
  as: Tag = 'div',
}: PageContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 ${
        className ?? ''
      }`}
    >
      {children}
    </Tag>
  )
}