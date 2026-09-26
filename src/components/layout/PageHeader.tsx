import React from 'react'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  actions?: React.ReactNode
  serifTitle?: boolean
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  actions,
  serifTitle = false,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E4DA] ${className}`}
    >
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#174B3A]">
            {eyebrow}
          </p>
        )}
        <h1
          className={`text-2xl sm:text-3xl text-[#202820] leading-tight tracking-tight ${
            serifTitle ? 'font-serif font-normal' : 'font-sans font-bold'
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[#73796F] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0">
          {actions}
        </div>
      )}
    </div>
  )
}
