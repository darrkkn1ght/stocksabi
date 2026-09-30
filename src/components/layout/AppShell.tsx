import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { useAuth } from '../../lib/AuthContext'
import { Logo } from '../ui/Logo'

export const AppShell: React.FC = () => {
  const { business } = useAuth()

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col md:flex-row text-[#202820]">
      {/* Desktop Sidebar Rail */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-30 bg-white border-b border-[#E5E4DA] px-4 py-3 flex items-center justify-between">
        <Logo className="scale-75 origin-left" />
        <div className="text-[11px] font-medium text-[#73796F] bg-[#F7F5EF] px-2.5 py-1 rounded-full border border-[#E5E4DA]">
          {business?.name || 'My Store'} ({business?.currency || 'NGN'})
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
