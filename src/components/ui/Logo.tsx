import React from 'react'

interface LogoProps {
  className?: string
  iconOnly?: boolean
  light?: boolean
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, light = false }) => {
  const primaryColor = light ? 'white' : '#17243A'
  const accentColor = '#356AE6'
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={iconOnly ? "32" : "32"} 
        height={iconOnly ? "32" : "32"} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Dynamic Abstract S Lettermark with Growth Arrow */}
        <path 
          d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20" 
          stroke={accentColor} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeDasharray="40 100"
          strokeDashoffset="20"
        />
        <path 
          d="M26 12C26 12 21 11 16 11C11.5 11 10 13.5 10 16C10 19 14 20 20 21C26 22 28 24 28 27.5C28 32 23.5 33 18 33C14 33 12 32 12 32" 
          stroke={primaryColor} 
          strokeWidth="5" 
          strokeLinecap="round" 
        />
        {/* Growth Arrow merging into the top of the S */}
        <path 
          d="M23 9L30 8L29 15" 
          stroke={accentColor} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M30 8L20.5 17.5" 
          stroke={accentColor} 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
      </svg>

      {!iconOnly && (
        <span className="font-serif text-xl font-bold tracking-tight" style={{ color: primaryColor }}>
          STOCKSABI
        </span>
      )}
    </div>
  )
}
