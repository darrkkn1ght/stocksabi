import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface Business {
  id: string
  name: string
  business_type: string
  country: string
  currency: string
}

interface AuthContextType {
  session: Session | null
  user: User | null
  business: Business | null
  isLoading: boolean
  refreshBusiness: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchBusiness = async () => {
    try {
      // Because of RLS, we only get businesses we belong to
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .limit(1)
        .single()
      
      if (data) {
        setBusiness(data)
      } else {
        setBusiness(null)
      }
    } catch (err) {
      console.error('Error fetching business:', err)
      setBusiness(null)
    }
  }

  const refreshBusiness = async () => {
    if (user) {
      await fetchBusiness()
    }
  }

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (mounted) {
        if (error) {
          console.error('Error getting session:', error)
        }
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchBusiness()
        }
        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      
      if (newSession?.user) {
        await fetchBusiness()
      } else {
        setBusiness(null)
      }
      setIsLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    session,
    user,
    business,
    isLoading,
    refreshBusiness,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
