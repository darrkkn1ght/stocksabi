import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/AuthContext'
import { Button } from '../../components/ui/Button'
import { Logo } from '../../components/ui/Logo'

export const LoginPage: React.FC = () => {
  const { loginWithLocalAdmin, loginWithLocalCredentials } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        if (
          signInError.message.toLowerCase().includes('fetch') ||
          signInError.message.toLowerCase().includes('network')
        ) {
          if (email.toLowerCase() === 'admin@stocksabi.com') {
            await loginWithLocalAdmin()
          } else {
            await loginWithLocalCredentials(email)
          }
          setLoading(false)
          return
        }
        setError(signInError.message)
        setLoading(false)
      }
    } catch {
      if (email.toLowerCase() === 'admin@stocksabi.com') {
        await loginWithLocalAdmin()
      } else {
        await loginWithLocalCredentials(email)
      }
      setLoading(false)
    }
  }

  const handleBuiltInAdmin = async () => {
    setLoading(true)
    setError('')
    try {
      await loginWithLocalAdmin()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#202820]">Log in to your account</h2>
        <p className="mt-2 text-sm text-[#73796F]">Know your stock. Understand your money.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-[#E5E4DA] sm:rounded-[24px] sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-[#B74C43]/10 border border-[#B74C43]/20 text-[#B74C43] p-3 rounded-[10px] text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#202820] mb-1">Email address</label>
              <input
                type="email"
                required
                placeholder="tunde@stocksabi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-[#202820]">Password</label>
                <Link to="/forgot-password" className="text-sm font-bold text-[#17243A] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Sign in
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E4DA]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#73796F]">Or</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="secondary" 
              className="w-full border border-[#17243A] text-[#17243A]"
              onClick={handleBuiltInAdmin}
            >
              Use Built-in Admin (Demo Store)
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[#73796F]">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-[#17243A] hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-xs text-[#73796F]">
              <Link to="/landing" className="hover:text-[#17243A] hover:underline">
                View product overview &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
