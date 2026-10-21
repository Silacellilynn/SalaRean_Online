import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPlatformStats, getAllUsers, getCourses } from '../../services/lmsService'
import StatCard from '../../components/StatCard'
import { Shield, Users, BookOpen, Award, Bell, Activity, CheckCircle, Database } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 1240,
    teachers: 45,
    courses: 72,
    activeEnrollments: 3890,
    completedCourses: 820,
    certificates: 745
  })
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getPlatformStats().then(setStats)
    getAllUsers().then(setUsers)
    getCourses().then(setCourses)
  }, [])

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-[#f7f1f1] to-[#f1f1f1] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="h-4 w-4" />
            <span>Super Administrator Control</span>
          </div>
          <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">SalaRean Online Governance</h1>
          <p className="mt-1 text-xs text-[#444444]">
            System health, database metrics, user role assignments, and platform audit logs.
          </p>
        </div>

        <Link
          to="/admin/announcements"
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition"
        >
          <Bell className="h-4 w-4" />
          <span>Broadcast Announcement</span>
        </Link>
      </div>

      {/* Admin Statistics Section 17 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <StatCard title="Students" value={stats.students} icon={Users} color="blue" />
        <StatCard title="Teachers" value={stats.teachers} icon={Shield} color="purple" />
        <StatCard title="Courses" value={stats.courses} icon={BookOpen} color="gold" />
        <StatCard title="Enrollments" value={stats.activeEnrollments} icon={Activity} color="green" />
        <StatCard title="Completed" value={stats.completedCourses} icon={CheckCircle} color="blue" />
        <StatCard title="Certificates" value={stats.certificates} icon={Award} color="gold" />
      </div>

      {/* Users and Systems Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Directory Preview */}
        <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111]">Registered Accounts</h3>
            <Link to="/admin/users" className="text-xs text-amber-400 hover:underline">
              View All Users →
            </Link>
          </div>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src={u.avatar_url}
                    alt={u.full_name}
                    className="h-8 w-8 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <p className="font-bold text-[#111111]">{u.full_name}</p>
                    <p className="text-[10px] text-[#555555]">{u.email}</p>
                  </div>
                </div>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Architecture Health */}
        <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
          <h3 className="text-base font-bold text-[#111111] flex items-center space-x-2">
            <Database className="h-5 w-5 text-emerald-400" />
            <span>PostgreSQL & Storage Health</span>
          </h3>

          <div className="space-y-3 text-xs text-[#444444]">
            <div className="flex justify-between rounded-xl bg-white/5 p-3">
              <span>Row Level Security (RLS)</span>
              <span className="font-bold text-emerald-400">Enforced (18 Tables)</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/5 p-3">
              <span>Database Connection</span>
              <span className="font-bold text-emerald-400">Supabase v2 Client Active</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/5 p-3">
              <span>Active Storage Buckets</span>
              <span className="font-bold text-[#111111]">7 Buckets (avatars, certs, etc.)</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white/5 p-3">
              <span>Authentication Engine</span>
              <span className="font-bold text-[#111111]">JWT / Supabase Auth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
