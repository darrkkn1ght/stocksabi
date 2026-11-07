import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/AuthContext'
import { Button } from '../../components/ui/Button'
import { Logo } from '../../components/ui/Logo'

const BUSINESS_TYPES = [
  'Provisions and groceries',
  'Cosmetics and beauty',
  'Fashion and clothing',
  'Household goods',
  'Electronics',
  'Other'
]

export const OnboardingPage: React.FC = () => {
  const { user, isLocalMode, refreshBusiness, createLocalBusiness } = useAuth()
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [type, setType] = useState(BUSINESS_TYPES[0])
  const [location, setLocation] = useState('Ibadan, Oyo State')
  const [country, setCountry] = useState('Nigeria')
  const [currency, setCurrency] = useState('NGN')
  const [loadSampleData, setLoadSampleData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    if (isLocalMode) {
      await createLocalBusiness(
        {
          name,
          business_type: type,
          country,
          currency,
          location,
        },
        loadSampleData
      )
      navigate('/')
      return
    }

    try {
      const { error: insertError } = await supabase
        .from('businesses')
        .insert([{
          name,
          business_type: type,
          country,
          currency
        }])

      if (insertError) {
        await createLocalBusiness(
          {
            name,
            business_type: type,
            country,
            currency,
            location,
          },
          loadSampleData
        )
        navigate('/')
        return
      }

      await refreshBusiness()
      navigate('/')
    } catch {
      await createLocalBusiness(
        {
          name,
          business_type: type,
          country,
          currency,
          location,
        },
        loadSampleData
      )
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Logo />
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

            <div>
              <label className="block text-sm font-medium text-[#202820] mb-1">Store Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ibadan, Oyo State"
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none"
              />
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

            <label className="flex items-start gap-3 p-3.5 rounded-[12px] bg-[#F7F5EF] border border-[#E5E4DA] cursor-pointer">
              <input
                type="checkbox"
                checked={loadSampleData}
                onChange={(e) => setLoadSampleData(e.target.checked)}
                className="mt-0.5 rounded border-[#E5E4DA] text-[#17243A] focus:ring-[#17243A]"
              />
              <div>
                <span className="block text-sm font-bold text-[#202820]">Start with sample retail products & sales</span>
                <span className="block text-xs text-[#73796F] mt-0.5">Populate your workspace immediately with sample inventory and transactions.</span>
              </div>
            </label>

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Create Business Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
