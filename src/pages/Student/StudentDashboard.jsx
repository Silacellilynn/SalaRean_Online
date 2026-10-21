import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  getCourses,
  getEnrollmentsForUser,
  getAssignments,
  getQuizzes,
  getCertificates,
  getAnnouncements
} from '../../services/lmsService'
import StatCard from '../../components/StatCard'
import CertificateModal from '../../components/CertificateModal'
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  FileText,
  PlayCircle,
  HelpCircle,
  Bell,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react'

export default function StudentDashboard() {
  const { user } = useAuth()

  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [assignments, setAssignments] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [certificates, setCertificates] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!user) return
      const [allCourses, userEnr, allAsg, allQuiz, allCerts, allAnn] = await Promise.all([
        getCourses(),
        getEnrollmentsForUser(user.id),
        getAssignments(),
        getQuizzes(),
        getCertificates(),
        getAnnouncements()
      ])

      setCourses(allCourses)
      setEnrollments(userEnr)
      setAssignments(allAsg)
      setQuizzes(allQuiz)
      setCertificates(allCerts.filter(c => c.student_id === user.id || c.student_name?.toLowerCase().includes('pengseng')))
      setAnnouncements(allAnn)
      setLoading(false)
    }
    loadData()
  }, [user])

  // Get enrolled course details
  const enrolledCourseObjects = enrollments.map(enr => {
    const courseObj = courses.find(c => c.id === enr.course_id)
    return {
      ...enr,
      course: courseObj
    }
  }).filter(e => Boolean(e.course))

  const averageProgress = enrolledCourseObjects.length > 0
    ? Math.round(enrolledCourseObjects.reduce((acc, curr) => acc + (curr.progress || 0), 0) / enrolledCourseObjects.length)
    : 0

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#f4f2eb] via-[#f1f1f1] to-[#f2f0ec] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Welcome Back</span>
            </div>
            <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">
              Greetings, {user?.full_name || 'Student'}!
            </h1>
            <p className="mt-1 text-xs text-[#444444]">
              Continue learning across your subjects, lessons, and class quizzes.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition"
          >
            <span>Browse Classes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value={enrolledCourseObjects.length}
          icon={BookOpen}
          color="gold"
          subtitle="Active curricula"
        />
        <StatCard
          title="Overall Progress"
          value={`${averageProgress}%`}
          icon={TrendingUp}
          color="blue"
          subtitle="Curriculum completion"
        />
        <StatCard
          title="Certificates"
          value={certificates.length}
          icon={Award}
          color="green"
          subtitle="Verified credentials"
        />
        <StatCard
          title="Assignments Pending"
          value={assignments.length}
          icon={FileText}
          color="red"
          subtitle="Due this term"
        />
      </div>

      {/* Main Enrolled Courses & Continue Learning */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#111111] flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <span>Continue Learning</span>
            </h2>
            <Link to="/courses" className="text-xs font-semibold text-amber-400 hover:underline">
              View All
            </Link>
          </div>

          {enrolledCourseObjects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#121422] p-8 text-center text-[#555555]">
              <p className="text-sm font-semibold text-[#111111]">You are not enrolled in any courses yet</p>
              <Link
                to="/courses"
                className="mt-3 inline-block rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400"
              >
                Enroll Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourseObjects.map(({ course, progress, status }) => (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#121422] p-5 transition hover:border-amber-500/30"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="h-16 w-24 rounded-lg object-cover shrink-0 border border-white/5"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {course.course_code}
                      </span>
                      <h3 className="text-sm font-bold text-[#111111] leading-snug">{course.title}</h3>
                      <p className="text-[11px] text-[#555555] mt-0.5">Instructor: {course.teacher_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 sm:shrink-0">
                    <div className="w-28 sm:w-36">
                      <div className="flex justify-between text-[11px] font-semibold text-[#444444] mb-1">
                        <span>Progress</span>
                        <span className="text-amber-400">{progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <Link
                      to={`/courses/${course.id}/learn`}
                      className="flex items-center space-x-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-xs font-bold text-[#111111] hover:bg-amber-500 hover:text-black transition"
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span>{progress === 100 ? 'Review' : 'Resume'}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Certificates Section */}
          <div className="pt-4">
            <h2 className="text-lg font-bold text-[#111111] flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 text-emerald-400" />
              <span>Earned Certificates</span>
            </h2>

            {certificates.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-[#121422] p-6 text-center text-xs text-[#555555]">
                Complete 100% of any course to earn your verified Certificate of Completion.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setActiveCertificate(cert)}
                    className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-gradient-to-r from-[#f5f2e9] to-[#f1f1f1] p-4 cursor-pointer hover:border-amber-400 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-amber-500/15 p-2 text-amber-400">
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#111111] truncate max-w-[180px]">{cert.course_title}</p>
                        <p className="text-[10px] font-mono text-amber-400">{cert.certificate_number}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#555555] uppercase">View →</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Announcements & Upcoming Tasks */}
        <div className="space-y-6">
          {/* Announcements Widget */}
          <div className="rounded-2xl border border-white/10 bg-[#121422] p-5">
            <div className="flex items-center space-x-2 text-amber-400 mb-4">
              <Bell className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Announcements</h3>
            </div>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="rounded-xl border border-white/5 bg-[#0e101b] p-3 text-xs">
                  <p className="font-bold text-[#111111] text-xs">{ann.title}</p>
                  <p className="mt-1 text-[11px] text-[#555555] leading-relaxed">{ann.content}</p>
                  <span className="mt-2 block text-[9px] text-amber-400/80 uppercase font-semibold">
                    Posted by {ann.author_name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tasks */}
          <div className="rounded-2xl border border-white/10 bg-[#121422] p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Upcoming Assignments</h3>
            <div className="space-y-2">
              {assignments.map(asg => (
                <Link
                  key={asg.id}
                  to="/student/assignments"
                  className="block rounded-lg bg-white/5 p-3 text-xs transition hover:bg-white/10 hover:text-amber-300"
                >
                  <p className="font-bold text-[#111111] truncate">{asg.title}</p>
                  <p className="text-[10px] text-[#555555] mt-0.5 truncate">{asg.course_title}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-amber-400">
                    <span>Max {asg.max_score} pts</span>
                    <span>Submit Work →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  )
}
