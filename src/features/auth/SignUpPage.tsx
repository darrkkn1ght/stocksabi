import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Store } from 'lucide-react'

export const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      }
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-[12px] bg-[#17243A] flex items-center justify-center text-[#356AE6] font-serif font-bold text-2xl mx-auto mb-4">
          <Store className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#202820]">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-[#E5E4DA] sm:rounded-[24px] sm:px-10">
          {success ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-[#367A53]/10 text-[#367A53] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#202820] mb-2">Check your email</h3>
              <p className="text-[#73796F] text-sm mb-6">
                We've sent a verification link to <strong>{email}</strong>. Please click the link to verify your account.
              </p>
              <Link to="/login">
                <Button variant="secondary" className="w-full">Return to log in</Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSignUp}>
              {error && (
                <div className="bg-[#B74C43]/10 border border-[#B74C43]/20 text-[#B74C43] p-3 rounded-[10px] text-sm text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-[#202820] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none"
                />
              </div>

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
                <label className="block text-sm font-medium text-[#202820] mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-[10px] border border-[#E5E4DA] focus:ring-2 focus:ring-[#17243A] focus:border-transparent transition-all outline-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                Sign up
              </Button>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <p className="text-sm text-[#73796F]">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#17243A] hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
