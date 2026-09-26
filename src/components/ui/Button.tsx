import React, { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#174B3A]/30 disabled:opacity-50 disabled:pointer-events-none select-none rounded-[10px]'

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: 'bg-[#174B3A] text-white hover:bg-[#10372B] active:translate-y-[1px]',
      secondary:
        'bg-white text-[#202820] border border-[#E5E4DA] hover:bg-[#F7F5EF] hover:border-[#D8D6CB] active:translate-y-[1px]',
      accent:
        'bg-[#D7F36B] text-[#10372B] font-semibold hover:bg-[#C9EB58] active:translate-y-[1px]',
      outline:
        'bg-transparent text-[#174B3A] border border-[#174B3A] hover:bg-[#174B3A]/5 active:translate-y-[1px]',
      ghost:
        'bg-transparent text-[#73796F] hover:text-[#202820] hover:bg-black/5 active:translate-y-[1px]',
      danger: 'bg-[#B74C43] text-white hover:bg-[#9e3f37] active:translate-y-[1px]',
    }

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-5 py-3 gap-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
