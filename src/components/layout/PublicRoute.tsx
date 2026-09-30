import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { Loader2 } from 'lucide-react'

export const PublicRoute: React.FC = () => {
  const { user, business, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF]">
        <Loader2 className="w-8 h-8 animate-spin text-[#17243A]" />
      </div>
    )
  }

  // If logged in, redirect them to app or onboarding
  if (user) {
    if (business) {
      return <Navigate to="/" replace />
    } else {
      return <Navigate to="/onboarding" replace />
    }
  }

  return <Outlet />
}
