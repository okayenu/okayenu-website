'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const { login, register, isLoading } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') {
        await login(email, password)
      } else if (mode === 'register') {
        await register({ email, password, firstName, lastName })
      }
      router.push('/profile')
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-[80vh] flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="font-display text-3xl font-bold">
              <span className="text-navy-800">Fit</span>
              <span className="text-fitsona-500">sona</span>
            </span>
            <h1 className="font-display text-2xl font-bold text-navy-800 mt-4">
              {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {mode === 'login' ? 'Sign in to access your account' : mode === 'register' ? 'Join the Fitsona community' : 'Enter your email to reset your password'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required
                      className="input-field pl-10" placeholder="First name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required
                    className="input-field" placeholder="Last name" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="input-field pl-10" placeholder="you@example.com" />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    className="input-field pl-10 pr-10" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-fitsona-500 focus:ring-fitsona-400" />
                  Remember me
                </label>
                <button type="button" onClick={() => setMode('reset')} className="text-sm text-fitsona-500 font-medium hover:text-fitsona-600">
                  Forgot password?
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

            <button type="submit" disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <button onClick={() => setMode('register')} className="text-fitsona-500 font-semibold hover:text-fitsona-600">Sign Up</button>
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-fitsona-500 font-semibold hover:text-fitsona-600">Sign In</button>
              </p>
            )}
          </div>

          {mode !== 'reset' && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 uppercase tracking-wider">or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-navy-800 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-navy-800 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  Facebook
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-fitsona-500 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-fitsona-400 blur-3xl" />
        </div>
        <div className="relative text-center max-w-md z-10">
          <Sparkles size={48} className="text-fitsona-400 mx-auto mb-6" />
          <h2 className="font-display text-4xl font-bold text-white mb-4">Fashion That Fits Your Story</h2>
          <p className="text-white/70 leading-relaxed">
            Join thousands of fashion enthusiasts discovering their perfect style through personalized recommendations, 3D try-on, and community-driven reviews.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-white/60 text-sm">
            <div><span className="block text-2xl font-bold text-white">10K+</span>Products</div>
            <div><span className="block text-2xl font-bold text-white">50K+</span>Members</div>
            <div><span className="block text-2xl font-bold text-white">4.8</span>Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
