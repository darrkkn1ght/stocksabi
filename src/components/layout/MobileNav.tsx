import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ReceiptText,
  Settings,
} from 'lucide-react'

export const MobileNav: React.FC = () => {
  const navItems = [
    { name: 'Overview', to: '/', icon: LayoutDashboard },
    { name: 'Sales', to: '/sales', icon: ShoppingBag },
    { name: 'Stock', to: '/inventory', icon: Package },
    { name: 'Expenses', to: '/expenses', icon: ReceiptText },
    { name: 'Settings', to: '/settings', icon: Settings },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E4DA] px-2 py-1.5 safe-area-pb shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1.5 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#174B3A] font-semibold'
                    : 'text-[#73796F] hover:text-[#202820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-md transition-colors ${
                      isActive ? 'bg-[#174B3A]/10 text-[#174B3A]' : 'text-[#73796F]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="mt-0.5">{item.name}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
