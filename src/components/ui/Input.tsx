import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefixText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, prefixText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[#202820] tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#73796F]">
              {leftIcon}
            </div>
          )}
          {prefixText && (
            <span className="absolute left-3.5 text-sm font-semibold text-[#73796F] select-none">
              {prefixText}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-white text-[#202820] placeholder-[#A4A9A0] text-sm rounded-[10px] border transition-colors duration-150 py-2.5 outline-none
              ${prefixText ? 'pl-9' : leftIcon ? 'pl-10' : 'pl-3.5'}
              ${rightIcon ? 'pr-10' : 'pr-3.5'}
              ${
                error
                  ? 'border-[#B74C43] focus:border-[#B74C43] focus:ring-2 focus:ring-[#B74C43]/20'
                  : 'border-[#E5E4DA] focus:border-[#17243A] focus:ring-2 focus:ring-[#17243A]/15'
              }
              disabled:bg-[#F2EFE8] disabled:text-[#8C9187] disabled:cursor-not-allowed
              ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-[#73796F]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-[#B74C43] font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#73796F]">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'
