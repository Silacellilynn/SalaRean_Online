import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function getDashboardPath(role) {
  if (role === 'teacher') return '/teacher'
  if (role === 'admin') return '/admin'
  if (role === 'management') return '/management'
  return '/student'
}

export default function AuthCallbackPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate(getDashboardPath(user.role), { replace: true })
    }
  }, [loading, user, navigate])

  if (loading || user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-sm text-[#444444]" role="status">
        Completing Google sign-in...
      </div>
    )
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-red-500/30 bg-[#121422] p-8 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-red-400" />
        <h1 className="mt-4 text-lg font-bold text-[#111111]">Google sign-in wasn’t completed</h1>
        <p className="mt-2 text-sm text-[#555555]">
          Please try again. If the problem continues, check that Google is enabled in your Supabase authentication settings.
        </p>
        <Link to="/login" className="mt-5 inline-block text-sm font-semibold text-amber-400 hover:underline">
          Return to sign in
        </Link>
      </div>
    </div>
  )
}
