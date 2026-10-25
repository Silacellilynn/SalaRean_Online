import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  BookOpen,
  GraduationCap,
  Shield,
  Layers,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Database,
  UserRound
} from 'lucide-react'
import SupabaseConnectModal from './SupabaseConnectModal'

export default function Navbar() {
  const { user, logout, switchRole, isSupabaseConfigured } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [showSupabaseModal, setShowSupabaseModal] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleRoleSelect = (newRole) => {
    switchRole(newRole)
    setProfileMenuOpen(false)
    setMobileMenuOpen(false)
    if (newRole === 'student') navigate('/student')
    else if (newRole === 'teacher') navigate('/teacher')
    else if (newRole === 'admin') navigate('/admin')
    else if (newRole === 'management') navigate('/management')
  }

  const roleOptions = [
    { role: 'student', label: 'Student', icon: GraduationCap },
    { role: 'teacher', label: 'Teacher', icon: BookOpen },
    { role: 'admin', label: 'Admin', icon: Shield },
    { role: 'management', label: 'Management', icon: Layers },
  ]

  const handleLogout = async () => {
    setLogoutError('')
    try {
      await logout()
      setMobileMenuOpen(false)
      setProfileMenuOpen(false)
      navigate('/')
    } catch (error) {
      setLogoutError(error.message || 'Unable to sign out. Please try again.')
    }
  }

  const roleColors = {
    student: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    teacher: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    admin: 'border-red-500/30 bg-red-500/10 text-red-400',
    management: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#d9c98f]/60 bg-[#fffdf9]/90 backdrop-blur-md shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#111111] via-[#2d2d2d] to-[#d4af37] text-[#f9f7f3] font-extrabold text-xl shadow-lg shadow-[#d4af37]/20 transition-transform group-hover:scale-105">
            S
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-wider text-[#111111]">SalaRean</span>
              <span className="text-xs font-semibold uppercase text-[#b8921a] px-1.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
                Online
              </span>
            </div>
            <p className="text-[10px] text-[#555555] hidden sm:block">Learn. Improve. Achieve.</p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition hover:text-amber-400 ${location.pathname === '/' ? 'text-amber-400 font-semibold' : 'text-[#444444]'}`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`transition hover:text-amber-400 ${location.pathname.startsWith('/courses') ? 'text-amber-400 font-semibold' : 'text-[#444444]'}`}
          >
            Courses Catalog
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              aria-expanded={profileMenuOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                profileMenuOpen || location.pathname.startsWith('/student') ||
                location.pathname.startsWith('/teacher') ||
                location.pathname.startsWith('/admin') ||
                location.pathname.startsWith('/management')
                  ? 'border-[#d4af37]/50 bg-[#d4af37]/10 text-[#8b6c1a]'
                  : 'border-[#d8d2c8] text-[#444444] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:text-[#8b6c1a]'
              }`}
            >
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="" className="h-5 w-5 rounded-full object-cover" />
              ) : (
                <UserRound className="h-4 w-4" />
              )}
              <span>Profile</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#e3dfd7] bg-white p-2 shadow-xl">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 border-b border-[#e3dfd7] px-2 py-3">
                      <img
                        src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                        alt=""
                        className="h-10 w-10 rounded-full border border-[#d4af37]/40 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#111111]">{user.full_name || 'Account'}</p>
                        <p className="truncate text-xs text-[#666666]">{user.email}</p>
                      </div>
                    </div>
                    <div className="px-2 py-2 text-xs text-[#666666]">
                      <p className="capitalize">Role: {user.role}</p>
                      {user.member_id && <p className="mt-1">Member ID: {user.member_id}</p>}
                    </div>
                    <Link
                      to={
                        user.role === 'teacher' ? '/teacher' :
                        user.role === 'admin' ? '/admin' :
                        user.role === 'management' ? '/management' : '/student'
                      }
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center rounded-lg px-2.5 py-2 text-sm font-medium text-[#333333] transition hover:bg-[#f5f1ea]"
                    >
                      My Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="px-2.5 py-2 text-sm font-semibold text-[#111111]">Welcome to SalaRean</p>
                    <p className="px-2.5 pb-2 text-xs text-[#666666]">Sign in to access your courses and learning dashboard.</p>
                    <Link
                      to="/login"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-sm font-semibold text-[#333333] transition hover:bg-[#f5f1ea]"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block rounded-lg bg-[#d4af37]/15 px-2.5 py-2 text-sm font-semibold text-[#765b12] transition hover:bg-[#d4af37]/25"
                    >
                      Create an account
                    </Link>
                  </>
                )}
                {!isSupabaseConfigured && (
                  <div className="mt-1 border-t border-[#e3dfd7] pt-2">
                    <p className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#777777]">
                      Switch demo role
                    </p>
                    {roleOptions.map(({ role, label, icon: RoleIcon }) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition hover:bg-[#f5f1ea] ${
                          user?.role === role ? 'font-semibold text-[#8b6c1a]' : 'text-[#333333]'
                        }`}
                      >
                        <RoleIcon className="h-4 w-4" />
                        <span>{label}</span>
                        {user?.role === role && <span className="ml-auto text-xs">Current</span>}
                      </button>
                    ))}
                  </div>
                )}
                {user && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg border-t border-[#e3dfd7] px-2.5 py-2.5 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                )}
                {logoutError && <p role="alert" className="px-2.5 py-2 text-xs text-red-700">{logoutError}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls: Role Switcher & User Profile */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Supabase connection indicator badge */}
          <div
            title={
              isSupabaseConfigured
                ? 'Connected to live Supabase backend'
                : 'Running in demo mode. Configure VITE_SUPABASE_URL in .env to connect to your live project.'
            }
            className={`flex items-center space-x-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border ${
              isSupabaseConfigured
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
            }`}
          >
            <Database className="h-3 w-3" />
            <span>{isSupabaseConfigured ? 'Supabase Live' : 'Demo Mode'}</span>
          </div>

        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#555555] hover:bg-white/5 hover:text-[#111111]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0e101b] px-4 pt-3 pb-6 md:hidden">
          <div className="space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#333333] hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#333333] hover:bg-white/5"
            >
              Courses Catalog
            </Link>
            {user && (
              <div className="rounded-lg border border-[#d8d2c8] bg-white/70 px-3 py-3">
                <p className="text-sm font-semibold text-[#111111]">{user.full_name || 'Account'}</p>
                <p className="mt-0.5 truncate text-xs text-[#666666]">{user.email}</p>
                <p className="mt-1 text-xs capitalize text-[#8b6c1a]">{user.role} account</p>
                {user.member_id && <p className="mt-1 text-xs text-[#666666]">Member ID: {user.member_id}</p>}
              </div>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-[#333333] hover:bg-white/5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-amber-400 hover:bg-white/5"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to={
                    user.role === 'teacher' ? '/teacher' :
                    user.role === 'admin' ? '/admin' :
                    user.role === 'management' ? '/management' : '/student'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-amber-400 hover:bg-white/5"
                >
                  My Dashboard ({user.role})
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {logoutError && (
            <p role="alert" className="mt-3 text-xs font-medium text-red-700">
              {logoutError}
            </p>
          )}

          {!isSupabaseConfigured && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold text-[#555555] uppercase mb-2">Switch demo role</p>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map(({ role, label }) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize text-left ${
                      user?.role === role ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-[#444444]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
