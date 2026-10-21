import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import GoogleAuthButton from '../../components/GoogleAuthButton'

export default function LoginPage() {
  const { login, switchRole, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setError('')
    setGoogleLoading(true)

    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.')
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/student')
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickDemoLogin = (role, demoEmail) => {
    setEmail(demoEmail)
    switchRole(role)
    if (role === 'student') navigate('/student')
    else if (role === 'teacher') navigate('/teacher')
    else if (role === 'admin') navigate('/admin')
    else if (role === 'management') navigate('/management')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-black font-extrabold text-2xl shadow-lg shadow-amber-500/20 mb-3">
            W
          </div>
          <h2 className="text-2xl font-black text-[#111111]">Welcome Back</h2>
          <p className="mt-1 text-xs text-[#555555]">Sign in to your SalaRean Online Portal</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center space-x-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <GoogleAuthButton loading={googleLoading} onClick={handleGoogleSignIn} />

        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#666666]">
          <span className="h-px flex-1 bg-[#d8d2c8]" />
          <span>or use email</span>
          <span className="h-px flex-1 bg-[#d8d2c8]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-[#555555] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-700 bg-gray-900 text-amber-500" />
              <span>Remember session</span>
            </label>
            <span className="text-amber-400 hover:underline cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick Demo Access Buttons */}
        <div className="mt-8 border-t border-[#e3dfd7] pt-6">
          <p className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider text-center mb-3">
            Instant Demo Logins
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('student', 'student@wexsee.edu')}
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2 text-center text-cyan-300 hover:bg-cyan-500/20 transition cursor-pointer"
            >
              Student (Ung Pengseng)
            </button>
            <button
              onClick={() => handleQuickDemoLogin('teacher', 'teacher@wexsee.edu')}
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-center text-amber-300 hover:bg-amber-500/20 transition cursor-pointer"
            >
              Teacher (Silacellilynn)
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin', 'admin@wexsee.edu')}
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-center text-red-300 hover:bg-red-500/20 transition cursor-pointer"
            >
              Super Admin
            </button>
            <button
              onClick={() => handleQuickDemoLogin('management', 'management@wexsee.edu')}
              className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-2 text-center text-purple-300 hover:bg-purple-500/20 transition cursor-pointer"
            >
              Management
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-[#555555]">
          <span>Don't have an account? </span>
          <Link to="/register" className="font-semibold text-amber-400 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  )
}
