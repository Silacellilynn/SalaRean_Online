import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCourseById, enrollInCourse, getEnrollmentsForUser } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import {
  PlayCircle,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Star,
  Users,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react'

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState({})

  useEffect(() => {
    async function load() {
      const data = await getCourseById(courseId)
      setCourse(data)

      if (user && data) {
        const enrollments = await getEnrollmentsForUser(user.id)
        const enrolled = enrollments.some(e => e.course_id === courseId)
        setIsEnrolled(enrolled)
      }

      // Default expand first module
      if (data?.modules?.length > 0) {
        setExpandedModules({ [data.modules[0].id]: true })
      }
      setLoading(false)
    }
    load()
  }, [courseId, user])

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }))
  }

  const handleEnrollOrContinue = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (!isEnrolled) {
      await enrollInCourse(user.id, course.id)
      setIsEnrolled(true)
    }

    navigate(`/courses/${course.id}/learn`)
  }

  if (loading) {
    return <div className="p-12 text-center text-[#555555]">Loading course curriculum...</div>
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#111111]">Course Not Found</h2>
        <Link to="/courses" className="mt-4 inline-block text-amber-400 hover:underline">
          Return to Catalog
        </Link>
      </div>
    )
  }

  const allLessons = course.modules?.flatMap(m => m.lessons || []) || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Course Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#e3dfd7] bg-gradient-to-r from-[#f1f1f1] via-[#f4f4f4] to-[#ececec] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                {course.course_code}
              </span>
              {course.primary_subject && (
                <span className="rounded-md bg-[#e7e7e7] px-2.5 py-1 text-xs font-semibold text-[#333333]">
                  {course.subject_label || course.primary_subject} • Grade {course.grade_level}
                </span>
              )}
              <span className="rounded-md bg-[#e7e7e7] px-2.5 py-1 text-xs font-semibold text-[#444444]">
                {course.difficulty}
              </span>
              <span className="rounded-md bg-[#e7e7e7] px-2.5 py-1 text-xs font-semibold text-[#444444]">
                {course.duration_weeks} Weeks Duration
              </span>
            </div>

            <h1 className="text-2xl font-black text-[#111111] sm:text-4xl leading-tight">
              {course.title}
            </h1>

            <p className="text-sm text-[#444444] leading-relaxed max-w-2xl">
              {course.description}
            </p>

            <div className="flex items-center space-x-6 pt-2 text-xs text-[#555555]">
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <Star className="h-4 w-4 fill-amber-400" />
                <span>{course.rating || 4.9}</span>
                <span className="text-[#555555] font-normal">({course.reviews_count || 120} reviews)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Users className="h-4 w-4 text-[#555555]" />
                <span>{course.enrolled_count || 340} students enrolled</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="h-4 w-4 text-emerald-400" />
                <span>Verified Certificate</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleEnrollOrContinue}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
              >
                <span>{isEnrolled ? 'Continue Learning' : 'Enroll in Course (Free)'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              {course.primary_subject && (
                <button
                  onClick={() => user
                    ? navigate(`/student/quizzes?course=${encodeURIComponent(course.id)}`)
                    : navigate('/login')}
                  className="flex items-center space-x-2 rounded-xl border border-[#d8d2c8] bg-[#f4f4f4] px-5 py-3.5 text-sm font-bold text-[#111111] hover:border-amber-400/50 hover:bg-[#e9e9e9] transition cursor-pointer"
                >
                  <HelpCircle className="h-4 w-4 text-amber-400" />
                  <span>Take Class Quiz</span>
                </button>
              )}
            </div>
          </div>

          {/* Thumbnail preview */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="h-full w-full object-cover min-h-[220px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div className="text-xs text-amber-300 font-medium">
                Taught by {course.teacher_name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Outline */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">Course Curriculum</h2>
            <p className="text-xs text-[#555555] mt-1">
              {course.modules?.length || 0} Modules • {allLessons.length} Lessons
            </p>
          </div>

          <div className="space-y-4">
            {course.modules?.map((mod) => {
              const isExpanded = expandedModules[mod.id]
              return (
                <div
                  key={mod.id}
                  className="overflow-hidden rounded-xl border border-[#e3dfd7] bg-[#f1f1f1]"
                >
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="flex w-full items-center justify-between p-4 text-left transition hover:bg-[#e9e9e9] cursor-pointer"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-[#111111]">{mod.title}</h3>
                      {mod.description && (
                        <p className="mt-0.5 text-xs text-[#555555]">{mod.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-[#555555]">
                      <span>{mod.lessons?.length || 0} lessons</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[#e3dfd7] bg-[#f7f7f7] px-4 py-2 divide-y divide-[#e5e5e5]">
                      {mod.lessons?.map((les) => (
                        <div key={les.id} className="flex items-center justify-between py-2.5 text-xs">
                          <div className="flex items-center space-x-2.5">
                            <PlayCircle className="h-4 w-4 text-amber-400" />
                            <span className="font-medium text-[#333333]">{les.title}</span>
                          </div>
                          <span className="text-[#555555]">{les.duration_minutes || 15} mins</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Instructor & Meta Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Instructor Profile</h3>
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                {(course.teacher_name || 'A')[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-[#111111]">{course.teacher_name}</p>
                <p className="text-xs text-[#555555]">SalaRean Lead Instructor</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-[#444444] leading-relaxed">
              Veteran engineering mentor specializing in scalable React ecosystems, Supabase PostgreSQL, and competitive team leadership.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Course Guarantees</h3>
            <div className="flex items-center space-x-2 text-xs text-[#444444]">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Full lifetime access to materials</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#444444]">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Verified Certificate of Completion</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#444444]">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Hands-on homework assignments</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#444444]">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Instructor grading and feedback</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
