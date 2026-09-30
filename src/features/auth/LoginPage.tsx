import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Store } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
    // Success is handled by the AuthContext which redirects via ProtectedRoute
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-[12px] bg-[#17243A] flex items-center justify-center text-[#356AE6] font-serif font-bold text-2xl mx-auto mb-4">
          <Store className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#202820]">Log in to your account</h2>
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
              onClick={async () => {
                setLoading(true)
                setError('')
                const email = 'admin@stocksabi.com'
                const password = 'password123'
                
                // Now that the account is hard-seeded in Postgres, just sign in natively!
                const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
                
                if (signInError) {
                  setError(signInError.message)
                }
                setLoading(false)
              }}
            >
              Use Built-in Admin
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#73796F]">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-[#17243A] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
