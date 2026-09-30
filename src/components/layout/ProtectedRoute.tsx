import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute: React.FC = () => {
  const { user, business, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF]">
        <Loader2 className="w-8 h-8 animate-spin text-[#17243A]" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If they don't have a business, and they aren't already going to onboarding, redirect to onboarding
  if (!business && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  // If they have a business and are trying to go to onboarding, redirect to dashboard
  if (business && location.pathname === '/onboarding') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
