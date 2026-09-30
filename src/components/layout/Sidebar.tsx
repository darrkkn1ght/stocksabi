import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { Logo } from '../ui/Logo'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ReceiptText,
  TrendingUp,
  Settings,
  Store,
  LogOut,
} from 'lucide-react'

export interface NavItem {
  name: string
  to: string
  icon: React.ComponentType<{ className?: string }>
}

export const navigationItems: NavItem[] = [
  { name: 'Overview', to: '/', icon: LayoutDashboard },
  { name: 'Sales', to: '/sales', icon: ShoppingBag },
  { name: 'Inventory', to: '/inventory', icon: Package },
  { name: 'Expenses', to: '/expenses', icon: ReceiptText },
  { name: 'Insights', to: '/insights', icon: TrendingUp },
  { name: 'Settings', to: '/settings', icon: Settings },
]

export const Sidebar: React.FC = () => {
  const { business, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="w-[232px] shrink-0 border-r border-[#E5E4DA] bg-white flex flex-col justify-between h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="px-5 py-6 border-b border-[#E5E4DA]/80">
          <Logo className="scale-[0.85] origin-left" />
          <p className="text-[11px] text-[#73796F] italic mt-3 leading-tight font-serif">
            Know your stock. Understand your money.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold text-[#8C9187] uppercase tracking-wider">
            Workspace
          </p>
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#17243A] text-white shadow-xs'
                      : 'text-[#5C6358] hover:text-[#202820] hover:bg-[#F7F5EF]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#356AE6]' : 'text-[#73796F]'
                      }`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Store Profile Footer */}
      <div className="p-3 border-t border-[#E5E4DA] bg-[#FAF8F3]">
        <div className="p-2.5 rounded-[10px] border border-[#E5E4DA] bg-white flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-[8px] bg-[#DDE8FF] text-[#17243A] flex items-center justify-center shrink-0">
              <Store className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#202820] truncate">
                {business?.name || 'My Store'}
              </p>
              <p className="text-[11px] text-[#73796F] truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#367A53] inline-block" />
                {business?.country || 'NG'} ({business?.currency || 'NGN'})
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Log out"
            className="p-1.5 text-[#73796F] hover:text-[#B74C43] hover:bg-[#F7F5EF] rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
