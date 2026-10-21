import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCourses, getPlatformStats, getAnnouncements } from '../../services/lmsService'
import {
  BookOpen,
  Trophy,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    students: 1240,
    teachers: 45,
    courses: 72,
    activeEnrollments: 3890,
    certificates: 745
  })
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    getCourses().then(data => setCourses(data.slice(0, 3)))
    getPlatformStats().then(setStats)
    getAnnouncements().then(setAnnouncements)
  }, [])

  return (
    <div className="space-y-24 pb-20">
      {/* Announcements Banner */}
      {announcements.length > 0 && (
        <div className="border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent px-4 py-2.5">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-xs">
            <div className="flex items-center space-x-2 truncate">
              <span className="rounded bg-amber-500 px-1.5 py-0.5 font-bold text-black uppercase text-[10px]">Notice</span>
              <span className="font-semibold text-amber-200 truncate">{announcements[0].title}:</span>
              <span className="text-[#444444] truncate hidden sm:inline">{announcements[0].content}</span>
            </div>
            <Link to="/courses" className="ml-4 shrink-0 font-medium text-amber-400 hover:underline">
              View Catalog →
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-semibold text-[#8b6c1a] mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SalaRean Online Education Platform</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-[#111111] sm:text-6xl lg:text-7xl">
            Learn. Improve. <span className="gold-gradient-text">Achieve.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-[#4b4b4b] sm:text-lg">
            Welcome to SalaRean Online — explore engaging subject classes for Grades 1 through 12, with lessons, practice quizzes, and teacher feedback.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses"
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition-all hover:scale-105 hover:from-amber-400 hover:to-yellow-400"
            >
              <BookOpen className="h-4 w-4" />
              <span>Explore Classes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/student"
              className="flex items-center space-x-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-[#111111] backdrop-blur-md transition hover:bg-white/10 hover:border-amber-400/40"
            >
              <span>Student Dashboard</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 border-y border-[#d8d2c8] bg-[#f2f0ec]/90 py-8 backdrop-blur-md sm:grid-cols-4">
            <div>
              <p className="text-3xl font-extrabold text-[#111111]">{stats.students}+</p>
              <p className="mt-1 text-xs font-medium text-[#555555] uppercase tracking-wider">Active Students</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-amber-400">{stats.courses}+</p>
              <p className="mt-1 text-xs font-medium text-[#555555] uppercase tracking-wider">Available Classes</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#111111]">{stats.certificates}+</p>
              <p className="mt-1 text-xs font-medium text-[#555555] uppercase tracking-wider">Certificates Issued</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-amber-400">99.4%</p>
              <p className="mt-1 text-xs font-medium text-[#555555] uppercase tracking-wider">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-end mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Featured Subjects</span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#111111]">Popular Classes</h2>
            <p className="mt-1 text-sm text-[#555555]">Choose a subject and grade to start learning.</p>
          </div>
          <Link
            to="/courses"
            className="mt-4 flex items-center space-x-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 sm:mt-0"
          >
            <span>View All Classes</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e3dfd7] bg-[#f3f3f3] transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md border border-amber-400/30">
                  {course.course_code}
                </div>
                <div className="absolute top-3 right-3 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-extrabold text-black uppercase">
                  {course.is_free ? 'Free Track' : `$${course.price}`}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center space-x-2 text-xs text-[#555555] mb-2">
                  <span className="rounded bg-white/5 px-2 py-0.5 font-medium text-amber-400">
                    {course.difficulty}
                  </span>
                  <span>•</span>
                  <span>{course.duration_weeks} Weeks</span>
                  <span>•</span>
                  <div className="flex items-center text-amber-400 font-semibold">
                    <Star className="h-3 w-3 fill-amber-400 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#111111] group-hover:text-amber-300 transition">
                  {course.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs text-[#555555] leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">
                      {(course.teacher_name || 'T')[0]}
                    </div>
                    <span className="text-xs font-medium text-[#444444]">{course.teacher_name}</span>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="flex items-center space-x-1 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features / Benefits */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e3dfd7] bg-gradient-to-b from-[#f5f3ee] to-[#ece7df] p-8 sm:p-12 lg:p-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Why SalaRean Online?</span>
            <h2 className="mt-2 text-3xl font-black text-[#111111] sm:text-4xl">Engineered for Real-World Competence</h2>
            <p className="mt-3 text-sm text-[#555555]">
              A comprehensive system built on Supabase PostgreSQL with rigorous evaluations and verifiable certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e3dfd7] bg-[#f0f0f0] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
                <PlayCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Video & Interactive Lessons</h3>
              <p className="mt-2 text-xs text-[#555555] leading-relaxed">
                Stream curated lessons with automatic timestamp resumption, downloadable supplementary guides, and progress sync.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e3dfd7] bg-[#f0f0f0] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Assignments & Quizzes</h3>
              <p className="mt-2 text-xs text-[#555555] leading-relaxed">
                Hands-on practical homework, timed examination system, and instant automated grading with passing score enforcement.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e3dfd7] bg-[#f0f0f0] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Verified Certificates</h3>
              <p className="mt-2 text-xs text-[#555555] leading-relaxed">
                Earn cryptographic verifiable credential certificates upon 100% course completion ready for your CV or LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Student Voices</span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#111111]">What Our Students Say</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Ung Pengseng',
              role: 'Full-Stack Student',
              text: 'The combination of React practical exercises and Supabase PostgreSQL database architecture gave me the exact skills needed to build modern web applications.',
              rating: 5
            },
            {
              name: 'Devina Putri',
              role: 'Esports Team Analyst',
              text: 'The tournament operations and IGL coaching track was phenomenal. Clear modules, actionable assignments, and instant instructor feedback.',
              rating: 5
            },
            {
              name: 'Rizky Pratama',
              role: 'AI Track Graduate',
              text: 'Learning how to connect LLMs with custom databases and building production-ready architectures made this the highest ROI online course I have taken.',
              rating: 5
            }
          ].map((t, idx) => (
            <div key={idx} className="rounded-2xl border border-white/5 bg-[#121422] p-6">
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-[#444444] leading-relaxed italic">"{t.text}"</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs font-bold text-[#111111]">{t.name}</p>
                <p className="text-[11px] text-[#555555]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Knowledge Base</span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#111111]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How do I obtain my official certificate of completion?',
              a: 'Once you complete 100% of all lessons in a course and achieve passing grades in quizzes and assignments, your certificate is automatically generated and downloadable from your Certificates tab.'
            },
            {
              q: 'Is the platform connected to Supabase PostgreSQL?',
              a: 'Yes! The entire backend is built on Supabase, utilizing PostgreSQL tables, Row Level Security (RLS) policies, Supabase Auth, and Supabase Storage.'
            },
            {
              q: 'Can instructors grade assignments directly in the platform?',
              a: 'Yes. Instructors have a dedicated Teacher Hub to review submitted files, assign numerical marks, and provide written constructive feedback.'
            }
          ].map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-[#121420] p-5">
              <h3 className="text-sm font-bold text-[#111111] flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="mt-2 text-xs text-[#555555] leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
