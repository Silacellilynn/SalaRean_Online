import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourseById, getEnrollmentsForUser, toggleLessonCompletion } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import { resolveLessonVideo } from '../../services/videoService'
import confetti from 'canvas-confetti'
import CertificateModal from '../../components/CertificateModal'
import {
  PlayCircle,
  CheckCircle,
  Circle,
  Award,
  ChevronLeft,
  BookOpen,
  FileText,
  HelpCircle,
  Download,
  Share2
} from 'lucide-react'

export default function CoursePlayerPage() {
  const { courseId } = useParams()
  const { user } = useAuth()

  const [course, setCourse] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [certificateToShow, setCertificateToShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [resolvedVideo, setResolvedVideo] = useState('')
  const [videoError, setVideoError] = useState('')

  useEffect(() => {
    async function load() {
      const c = await getCourseById(courseId)
      setCourse(c)

      if (user) {
        const enrollments = await getEnrollmentsForUser(user.id)
        const enr = enrollments.find(e => e.course_id === courseId)
        setEnrollment(enr || { progress: 0, completed_lessons: [] })
      }

      // Default to first lesson
      if (c?.modules?.[0]?.lessons?.[0]) {
        setActiveLesson(c.modules[0].lessons[0])
      }
      setLoading(false)
    }
    load()
  }, [courseId, user])

  useEffect(() => {
    let cancelled = false
    let localVideoUrl = ''
    setResolvedVideo('')
    setVideoError('')
    if (!activeLesson?.video_url) return undefined

    resolveLessonVideo(activeLesson.video_url)
      .then(({ url, isLocal }) => {
        if (cancelled) {
          if (isLocal) URL.revokeObjectURL(url)
          return
        }
        localVideoUrl = isLocal ? url : ''
        setResolvedVideo(url || '')
      })
      .catch(error => {
        if (!cancelled) setVideoError(error.message || 'Could not load this lesson video.')
      })

    return () => {
      cancelled = true
      if (localVideoUrl) URL.revokeObjectURL(localVideoUrl)
    }
  }, [activeLesson])

  const handleToggleComplete = async () => {
    if (!user || !activeLesson) return

    const updated = await toggleLessonCompletion(user.id, course.id, activeLesson.id)
    setEnrollment({ ...updated })

    if (updated.progress === 100) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      })
    }
  }

  if (loading) {
    return <div className="p-12 text-center text-[#555555]">Loading learning environment...</div>
  }

  if (!course) {
    return <div className="p-12 text-center text-[#555555]">Course not found.</div>
  }

  const allLessons = course.modules?.flatMap(m => m.lessons || []) || []
  const isCurrentCompleted = enrollment?.completed_lessons?.includes(activeLesson?.id)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Header Navigation */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <Link
            to="/student"
            className="flex items-center space-x-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-[#444444] hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <div>
            <h1 className="text-base font-bold text-[#111111] truncate max-w-md sm:max-w-xl">
              {course.title}
            </h1>
            <p className="text-[11px] text-[#555555]">
              {course.course_code} • {course.teacher_name}
            </p>
          </div>
        </div>

        {/* Course Progress Bar */}
        <div className="flex items-center space-x-4">
          <div className="w-36 sm:w-48">
            <div className="flex justify-between text-[11px] font-semibold text-[#444444] mb-1">
              <span>Course Progress</span>
              <span className="text-amber-400">{enrollment?.progress || 0}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                style={{ width: `${enrollment?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {enrollment?.progress === 100 && (
            <button
              onClick={() => {
                setCertificateToShow({
                  student_name: user?.full_name?.toUpperCase() || 'UNG PENGSENG',
                  course_title: course.title,
                  certificate_number: `WEX-2026-${Math.floor(100000 + Math.random() * 900000)}`,
                  teacher_name: course.teacher_name,
                  issued_at: new Date().toISOString()
                })
              }}
              className="flex items-center space-x-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition cursor-pointer"
            >
              <Award className="h-4 w-4" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Learning Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Video Player and Lesson Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            {activeLesson?.video_url ? (
              activeLesson.video_source_type === 'upload' ? (
                resolvedVideo ? (
                  <video
                    src={resolvedVideo}
                    title={activeLesson.title}
                    className="h-full w-full"
                    controls
                    playsInline
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[#555555]">
                    {videoError || 'Loading lesson video...'}
                  </div>
                )
              ) : (
                <iframe
                  src={activeLesson.video_url}
                  title={activeLesson.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            ) : (
              <div className="flex h-full items-center justify-center text-center p-6 text-[#555555]">
                <div>
                  <PlayCircle className="mx-auto h-12 w-12 text-gray-600 mb-2" />
                  <p className="text-sm font-semibold text-[#111111]">Reading & Practical Lab</p>
                  <p className="text-xs text-[#555555]">Follow the written guide below.</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#121422] p-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Active Lesson</span>
              <h2 className="text-lg font-bold text-[#111111]">{activeLesson?.title || 'Select a Lesson'}</h2>
            </div>

            <button
              onClick={handleToggleComplete}
              className={`flex items-center space-x-2 rounded-xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
                isCurrentCompleted
                  ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20'
              }`}
            >
              {isCurrentCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              <span>{isCurrentCompleted ? 'Completed (Click to Undo)' : 'Mark as Completed'}</span>
            </button>
          </div>

          {/* Lesson Text / Materials */}
          <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider text-amber-400">Lesson Material & Notes</h3>
            <div className="prose prose-invert max-w-none text-xs text-[#444444] leading-relaxed space-y-3 whitespace-pre-line font-sans">
              {activeLesson?.content || 'No additional text material for this lesson.'}
            </div>
          </div>
        </div>

        {/* Right: Modules & Lessons Playlist */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#121422] p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Course Modules</h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {course.modules?.map((mod) => (
                <div key={mod.id} className="rounded-xl border border-white/5 bg-[#0e101b] overflow-hidden">
                  <div className="bg-white/5 p-3 text-xs font-bold text-[#111111]">
                    {mod.title}
                  </div>
                  <div className="divide-y divide-white/5">
                    {mod.lessons?.map((les) => {
                      const isCompleted = enrollment?.completed_lessons?.includes(les.id)
                      const isActive = activeLesson?.id === les.id
                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`flex w-full items-center justify-between p-3 text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-amber-500/15 text-amber-300 border-l-2 border-amber-400'
                              : 'hover:bg-white/5 text-[#444444]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate pr-2">
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-[#666666] shrink-0" />
                            )}
                            <span className="text-xs font-medium truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-[#555555] shrink-0">{les.duration_minutes || 15}m</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links to assignments and quizzes */}
          <div className="rounded-xl border border-white/10 bg-[#121422] p-4 space-y-2">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Evaluation Hub</h4>
            <Link
              to="/student/assignments"
              className="flex items-center justify-between rounded-lg bg-white/5 p-2.5 text-xs text-[#444444] hover:bg-white/10 hover:text-amber-300 transition"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-amber-400" />
                <span>Course Assignments</span>
              </div>
              <span className="text-[10px] text-[#555555]">View tasks →</span>
            </Link>
            <Link
              to="/student/quizzes"
              className="flex items-center justify-between rounded-lg bg-white/5 p-2.5 text-xs text-[#444444] hover:bg-white/10 hover:text-amber-300 transition"
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-amber-400" />
                <span>Knowledge Check Quizzes</span>
              </div>
              <span className="text-[10px] text-[#555555]">Take test →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {certificateToShow && (
        <CertificateModal
          certificate={certificateToShow}
          onClose={() => setCertificateToShow(null)}
        />
      )}
    </div>
  )
}
