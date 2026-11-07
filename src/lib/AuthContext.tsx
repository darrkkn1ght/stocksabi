import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { getStorageItem, setStorageItem, removeStorageItem } from './storage'
import {
  BUSINESS_STORAGE_KEY,
  SESSION_STORAGE_KEY,
  INVENTORY_STORAGE_KEY,
  seedLocalDemoData,
} from './demoData'

export interface Business {
  id: string
  name: string
  business_type: string
  country: string
  currency: string
  location?: string
}

interface LocalAuthState {
  user: User
  isLocal: boolean
}

interface AuthContextType {
  session: Session | null
  user: User | null
  business: Business | null
  isLoading: boolean
  isLocalMode: boolean
  refreshBusiness: () => Promise<void>
  updateBusinessProfile: (updates: Partial<Business>) => Promise<void>
  loginWithLocalAdmin: () => Promise<void>
  loginWithLocalCredentials: (email: string, fullName?: string) => Promise<void>
  createLocalBusiness: (data: Omit<Business, 'id'>, loadSampleData?: boolean) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLocalMode, setIsLocalMode] = useState(false)

  const fetchBusiness = useCallback(async (currentIsLocal?: boolean) => {
    const localSession = getStorageItem<LocalAuthState | null>(SESSION_STORAGE_KEY, null)
    if (currentIsLocal || localSession?.isLocal) {
      const savedBiz = getStorageItem<Business | null>(BUSINESS_STORAGE_KEY, null)
      setBusiness(savedBiz)
      return
    }

    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .limit(1)
        .single()
      
      if (error) throw error
      if (data) {
        setBusiness(data)
        setStorageItem(BUSINESS_STORAGE_KEY, data)
      } else {
        const savedBiz = getStorageItem<Business | null>(BUSINESS_STORAGE_KEY, null)
        setBusiness(savedBiz)
      }
    } catch (err) {
      console.warn('Using local business fallback:', err)
      const savedBiz = getStorageItem<Business | null>(BUSINESS_STORAGE_KEY, null)
      setBusiness(savedBiz)
    }
  }, [])

  const refreshBusiness = async () => {
    if (user) {
      await fetchBusiness(isLocalMode)
    }
  }

  const updateBusinessProfile = async (updates: Partial<Business>) => {
    if (!business) return
    const updated = { ...business, ...updates }
    setBusiness(updated)
    setStorageItem(BUSINESS_STORAGE_KEY, updated)

    if (!isLocalMode) {
      try {
        await supabase
          .from('businesses')
          .update({
            name: updated.name,
            business_type: updated.business_type,
            country: updated.country,
            currency: updated.currency,
          })
          .eq('id', business.id)
      } catch (err) {
        console.warn('Could not sync business update to cloud, saved locally:', err)
      }
    }
  }

  const loginWithLocalAdmin = async () => {
    const adminUser = {
      id: 'local-admin-user',
      email: 'admin@stocksabi.com',
      user_metadata: { full_name: 'Tunde' },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User

    const defaultBiz: Business = getStorageItem<Business | null>(BUSINESS_STORAGE_KEY, null) || {
      id: 'local-biz-1',
      name: 'Tunde Provisions',
      business_type: 'Provisions and groceries',
      country: 'Nigeria',
      currency: 'NGN',
      location: 'Ibadan, Oyo State',
    }

    // Seed demo data if local inventory is empty
    const existingProducts = getStorageItem(INVENTORY_STORAGE_KEY, [])
    if (!existingProducts || existingProducts.length === 0) {
      seedLocalDemoData()
    }

    setStorageItem(SESSION_STORAGE_KEY, { user: adminUser, isLocal: true })
    setStorageItem(BUSINESS_STORAGE_KEY, defaultBiz)
    setIsLocalMode(true)
    setUser(adminUser)
    setBusiness(defaultBiz)
  }

  const loginWithLocalCredentials = async (email: string, fullName?: string) => {
    const derivedName = fullName || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const localUser = {
      id: `local-user-${Date.now()}`,
      email,
      user_metadata: { full_name: derivedName },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User

    const existingBiz = getStorageItem<Business | null>(BUSINESS_STORAGE_KEY, null)
    setStorageItem(SESSION_STORAGE_KEY, { user: localUser, isLocal: true })
    setIsLocalMode(true)
    setUser(localUser)
    setBusiness(existingBiz)
  }

  const createLocalBusiness = async (data: Omit<Business, 'id'>, loadSampleData = true) => {
    const newBiz: Business = {
      ...data,
      id: `local-biz-${Date.now()}`,
    }
    if (loadSampleData) {
      const existingProducts = getStorageItem(INVENTORY_STORAGE_KEY, [])
      if (!existingProducts || existingProducts.length === 0) {
        seedLocalDemoData()
      }
    }
    setStorageItem(BUSINESS_STORAGE_KEY, newBiz)
    setBusiness(newBiz)
  }

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      // First check if a local session is active
      const localSession = getStorageItem<LocalAuthState | null>(SESSION_STORAGE_KEY, null)
      if (localSession?.isLocal && localSession.user) {
        if (mounted) {
          setIsLocalMode(true)
          setUser(localSession.user)
          const savedBiz = getStorageItem<Business | null>(BUSINESS_STORAGE_KEY, null)
          setBusiness(savedBiz)
          setIsLoading(false)
        }
        return
      }

      try {
        const { data: { session: supaSession }, error } = await supabase.auth.getSession()
        if (mounted) {
          if (error) {
            console.warn('Error getting Supabase session:', error)
          }
          setSession(supaSession)
          setUser(supaSession?.user ?? null)
          if (supaSession?.user) {
            await fetchBusiness(false)
          }
          setIsLoading(false)
        }
      } catch (err) {
        console.warn('Supabase unreachable during session init:', err)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      const localSession = getStorageItem<LocalAuthState | null>(SESSION_STORAGE_KEY, null)
      if (localSession?.isLocal) return // Don't override active local demo session

      setSession(newSession)
      setUser(newSession?.user ?? null)
      
      if (newSession?.user) {
        await fetchBusiness(false)
      } else {
        setBusiness(null)
      }
      setIsLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchBusiness])

  const signOut = async () => {
    removeStorageItem(SESSION_STORAGE_KEY)
    setIsLocalMode(false)
    setUser(null)
    setSession(null)
    setBusiness(null)
    try {
      await supabase.auth.signOut()
    } catch {
      // Ignore network errors when signing out offline
    }
  }

  const value = {
    session,
    user,
    business,
    isLoading,
    isLocalMode,
    refreshBusiness,
    updateBusinessProfile,
    loginWithLocalAdmin,
    loginWithLocalCredentials,
    createLocalBusiness,
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
