import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  Award,
  BarChart2,
  Users,
  Bell,
  Settings,
  PlusCircle,
  CheckCircle,
  GraduationCap,
  Calendar,
  MessageSquare
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar({ role }) {
  const location = useLocation()
  const { user } = useAuth()

  const navConfigs = {
    student: [
      { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/student/courses', label: 'My Courses', icon: BookOpen },
      { path: '/student/assignments', label: 'Assignments', icon: FileText },
      { path: '/student/quizzes', label: 'Quizzes & Tests', icon: HelpCircle },
      { path: '/student/grades', label: 'Grades & Results', icon: BarChart2 },
      { path: '/student/certificates', label: 'Certificates', icon: Award },
    ],
    teacher: [
      { path: '/teacher', label: 'Instructor Dashboard', icon: LayoutDashboard },
      { path: '/teacher/courses', label: 'Course Management', icon: BookOpen },
      { path: '/teacher/assignments', label: 'Assignment Grading', icon: FileText },
      { path: '/teacher/quizzes', label: 'Quiz Builder & Scores', icon: HelpCircle },
    ],
    admin: [
      { path: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
      { path: '/admin/users', label: 'User Directory', icon: Users },
      { path: '/admin/courses', label: 'Courses Governance', icon: BookOpen },
      { path: '/admin/announcements', label: 'Announcements Broadcast', icon: Bell },
    ],
    management: [
      { path: '/management', label: 'Executive Overview', icon: BarChart2 },
      { path: '/management/analytics', label: 'Student Growth & KPIs', icon: LayoutDashboard },
    ]
  }

  const items = navConfigs[role] || navConfigs.student

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0e101a] p-4 hidden md:flex md:flex-col justify-between min-h-[calc(100vh-65px)]">
      <div>
        {/* User mini profile card in sidebar */}
        <div className="mb-6 rounded-xl border border-white/5 bg-[#141624] p-3">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.full_name}
              className="h-10 w-10 rounded-full border border-amber-400/30 object-cover"
            />
            <div className="overflow-hidden">
              <p className="truncate text-xs font-bold text-[#111111]">{user?.full_name || 'User'}</p>
              <span className="inline-block rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                {user?.role || role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? 'border-l-2 border-amber-400 bg-amber-500/15 text-amber-300'
                    : 'text-[#555555] hover:bg-white/5 hover:text-[#111111]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-[#555555]'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom info */}
      <div className="rounded-xl border border-amber-500/10 bg-gradient-to-b from-amber-500/5 to-transparent p-3 text-center">
        <p className="text-[11px] font-semibold text-amber-300">SalaRean Online 2026</p>
        <p className="text-[10px] text-[#555555] mt-0.5">PostgreSQL & Supabase RLS</p>
      </div>
    </aside>
  )
}
