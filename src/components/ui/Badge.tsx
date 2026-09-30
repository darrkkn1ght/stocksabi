import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary' | 'accent'
  size?: 'sm' | 'md'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const variants: Record<NonNullable<BadgeProps['variant']>, { badge: string; dot: string }> = {
    success: {
      badge: 'bg-[#EBF5EF] text-[#367A53] border border-[#CDE5D6]',
      dot: 'bg-[#367A53]',
    },
    warning: {
      badge: 'bg-[#FFF8E6] text-[#B77826] border border-[#F6E2B6]',
      dot: 'bg-[#B77826]',
    },
    danger: {
      badge: 'bg-[#FDF1F0] text-[#B74C43] border border-[#F8D2D0]',
      dot: 'bg-[#B74C43]',
    },
    neutral: {
      badge: 'bg-[#EFECE3] text-[#5C6358] border border-[#DFDDD3]',
      dot: 'bg-[#73796F]',
    },
    primary: {
      badge: 'bg-[#DDE8FF] text-[#17243A] border border-[#b3c9fc]',
      dot: 'bg-[#17243A]',
    },
    accent: {
      badge: 'bg-[#F4F9D7] text-[#111b2b] border border-[#DFF18A]',
      dot: 'bg-[#728514]',
    },
  }

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md tracking-tight ${variants[variant].badge} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${variants[variant].dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  )
}
