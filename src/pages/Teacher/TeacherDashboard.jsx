import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourses, getAssignments, getQuizzes, getAllUsers } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/StatCard'
import {
  BookOpen,
  Users,
  FileText,
  Star,
  PlusCircle,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [assignments, setAssignments] = useState([])
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    async function load() {
      const [c, a, q] = await Promise.all([
        getCourses(),
        getAssignments(),
        getQuizzes()
      ])
      setCourses(c)
      setAssignments(a)
      setQuizzes(q)
    }
    load()
  }, [])

  const totalSubmissions = assignments.reduce((acc, curr) => acc + (curr.submissions?.length || 0), 0)

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#f6f3eb] to-[#f1f1f1] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Instructor Portal
          </span>
          <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">
            Welcome, {user?.full_name || 'Coach Ariq'}
          </h1>
          <p className="mt-1 text-xs text-[#444444]">
            Manage course syllabi, grade student project deliverables, and monitor engagement.
          </p>
        </div>

        <Link
          to="/teacher/courses"
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create New Course</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          color="gold"
          subtitle="Authored tracks"
        />
        <StatCard
          title="Active Students"
          value="557"
          icon={Users}
          color="blue"
          subtitle="Across all cohorts"
        />
        <StatCard
          title="Submissions"
          value={totalSubmissions}
          icon={FileText}
          color="purple"
          subtitle="Awaiting review"
        />
        <StatCard
          title="Average Rating"
          value="4.9 / 5.0"
          icon={Star}
          color="green"
          subtitle="Student reviews"
        />
      </div>

      {/* Management Quick Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Hub */}
        <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111]">Your Courses</h3>
            <Link to="/teacher/courses" className="text-xs text-amber-400 hover:underline">
              Manage All →
            </Link>
          </div>
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-amber-400">{c.course_code}</span>
                  <p className="font-bold text-[#111111]">{c.title}</p>
                  <p className="text-[10px] text-[#555555] mt-0.5">{c.enrolled_count || 120} students enrolled</p>
                </div>
                <Link
                  to={`/courses/${c.id}`}
                  className="rounded-lg border border-white/10 px-3 py-1 text-[11px] font-semibold text-[#444444] hover:bg-white/10 hover:text-[#111111]"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions to Grade */}
        <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111]">Pending Assignments</h3>
            <Link to="/teacher/assignments" className="text-xs text-amber-400 hover:underline">
              Review Hub →
            </Link>
          </div>
          <div className="space-y-3">
            {assignments.map((asg) => (
              <div key={asg.id} className="rounded-xl bg-white/5 p-3.5 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-[10px] font-bold">{asg.course_title}</span>
                  <span className="text-[#555555] text-[10px]">{asg.submissions?.length || 0} Submissions</span>
                </div>
                <p className="font-bold text-[#111111]">{asg.title}</p>
                <div className="pt-2 flex justify-end">
                  <Link
                    to="/teacher/assignments"
                    className="text-amber-400 font-semibold text-[11px] hover:underline"
                  >
                    Grade Submissions →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
