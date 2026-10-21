import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react'
import GoogleAuthButton from '../../components/GoogleAuthButton'

export default function RegisterPage() {
  const { register, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'student',
    memberId: ''
  })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignUp = async () => {
    setError('')
    setGoogleLoading(true)

    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message || 'Google sign-up failed. Please try again.')
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(formData)
      if (formData.role === 'teacher') navigate('/teacher')
      else navigate('/student')
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-black font-extrabold text-2xl shadow-lg shadow-amber-500/20 mb-3">
            W
          </div>
          <h2 className="text-2xl font-black text-[#111111]">Join SalaRean Online</h2>
          <p className="mt-1 text-xs text-[#555555]">Register your student or instructor account</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center space-x-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <GoogleAuthButton loading={googleLoading} onClick={handleGoogleSignUp} />
        <p className="mt-2 text-center text-[11px] text-[#666666]">
          New Google accounts are created with the student role.
        </p>
        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#666666]">
          <span className="h-px flex-1 bg-[#d8d2c8]" />
          <span>or register with email</span>
          <span className="h-px flex-1 bg-[#d8d2c8]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ung Pengseng"
                  className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 pl-10 pr-3 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">Username</label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="pengseng_dev"
                className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 px-3.5 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@gmail.com"
                className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 6 characters"
                  className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 pl-10 pr-3 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">Account Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher / Instructor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-1.5">
              SalaRean Member ID / Student ID <span className="text-[#666666] font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              placeholder="WEX-2026-XXXX"
              className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 px-3.5 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
          >
            <span>{loading ? 'Registering Account...' : 'Create Account'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#555555]">
          <span>Already have an account? </span>
          <Link to="/login" className="font-semibold text-amber-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
