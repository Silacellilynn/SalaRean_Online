import React, { useState, useEffect } from 'react'
import { getPlatformStats, getCourses } from '../../services/lmsService'
import StatCard from '../../components/StatCard'
import { Layers, TrendingUp, Award, Users, BookOpen, CheckCircle } from 'lucide-react'

export default function ManagementDashboard() {
  const [stats, setStats] = useState({
    students: 1240,
    teachers: 45,
    courses: 72,
    activeEnrollments: 3890,
    completedCourses: 820,
    certificates: 745
  })
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getPlatformStats().then(setStats)
    getCourses().then(setCourses)
  }, [])

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-[#f3f1f7] to-[#f1f1f1] p-6 sm:p-8">
        <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="h-4 w-4" />
          <span>Executive Oversight</span>
        </div>
        <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">SalaRean Academic Analytics</h1>
        <p className="mt-1 text-xs text-[#444444]">
          Strategic metrics, cohort retention, certificate distributions, and institutional growth indicators.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Community Enrollment"
          value={stats.activeEnrollments}
          icon={TrendingUp}
          color="purple"
          trend="+18.4%"
        />
        <StatCard
          title="Certified Alumni"
          value={stats.certificates}
          icon={Award}
          color="gold"
          trend="+12.5%"
        />
        <StatCard
          title="Curriculum Completion"
          value="84.2%"
          icon={CheckCircle}
          color="green"
          trend="+5.1%"
        />
        <StatCard
          title="Active Instructors"
          value={stats.teachers}
          icon={Users}
          color="blue"
          trend="+8.0%"
        />
      </div>

      {/* Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Popularity & Cohort Share */}
        <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
          <h3 className="text-base font-bold text-[#111111]">Most Enrolled Tracks</h3>
          <div className="space-y-4">
            {courses.map((c, i) => {
              const percentages = [85, 65, 45, 30]
              const p = percentages[i % percentages.length]
              return (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#111111]">{c.title}</span>
                    <span className="text-amber-400">{c.enrolled_count || 240} Students</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full"
                      style={{ width: `${p}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Academic Milestones */}
        <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
          <h3 className="text-base font-bold text-[#111111]">Quarterly Milestones (Q3-Q4 2026)</h3>
          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-400">✓ Supabase Database Architecture</span>
                <span className="text-[#555555] font-mono">100% Target Met</span>
              </div>
              <p className="text-[#444444]">
                18 relational PostgreSQL tables deployed with strict Row Level Security policies.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-400">✓ Digital Examination Accreditation</span>
                <span className="text-[#555555] font-mono">100% Target Met</span>
              </div>
              <p className="text-[#444444]">
                Automated quiz grading engine, passing scores enforcement, and certificate issuance.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-amber-400">⏳ Phase 2: Live WebRTC Classrooms</span>
                <span className="text-[#555555] font-mono">In Progress</span>
              </div>
              <p className="text-[#444444]">
                Integration planned for scheduled cohort live seminars and coach reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
