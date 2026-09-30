import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/AuthContext'
import { Button } from '../../components/ui/Button'
import { Store } from 'lucide-react'

const BUSINESS_TYPES = [
  'Provisions and groceries',
  'Cosmetics and beauty',
  'Fashion and clothing',
  'Household goods',
  'Electronics',
  'Other'
]

export const OnboardingPage: React.FC = () => {
  const { user, refreshBusiness } = useAuth()
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [type, setType] = useState(BUSINESS_TYPES[0])
  const [country, setCountry] = useState('Nigeria')
  const [currency, setCurrency] = useState('NGN')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    const { error: insertError } = await supabase
      .from('businesses')
      .insert([{
        name,
        business_type: type,
        country,
        currency
      }])

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    // Refresh context to load the newly created business and redirect to dashboard
    await refreshBusiness()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-[12px] bg-[#17243A] flex items-center justify-center text-[#356AE6] font-serif font-bold text-2xl mx-auto mb-4">
          <Store className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#202820]">Setup your business</h2>
        <p className="mt-2 text-[#73796F]">Tell us about your shop to get started.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-[#E5E4DA] sm:rounded-[24px] sm:px-10">
          <form className="space-y-6" onSubmit={handleCreateBusiness}>
            {error && (
              <div className="bg-[#B74C43]/10 border border-[#B74C43]/20 text-[#B74C43] p-3 rounded-[10px] text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#202820] mb-1">Business Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tunde Provisions"
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#202820] mb-1">Business Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none bg-white"
              >
                {BUSINESS_TYPES.map(bt => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#202820] mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none bg-[#F7F5EF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202820] mb-1">Currency</label>
                <input
                  type="text"
                  required
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none bg-[#F7F5EF]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Create Business Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
