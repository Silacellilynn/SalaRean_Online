import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourses } from '../../services/lmsService'
import { PRIMARY_SUBJECTS } from '../../services/primaryCurriculum'
import { Search, Filter, Star, Clock, BookOpen, ArrowRight } from 'lucide-react'

export default function CourseCatalogPage() {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')

  useEffect(() => {
    getCourses().then(setCourses)
  }, [])

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = String(c.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          String(c.course_code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          String(c.description || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || c.category_name?.toLowerCase().includes(selectedCategory)
    const matchesDifficulty = selectedDifficulty === 'all' || c.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase()
    const matchesSubject = selectedSubject === 'all' || c.primary_subject === selectedSubject
    const matchesGrade = selectedGrade === 'all' || String(c.grade_level || '') === selectedGrade

    return matchesSearch && matchesCategory && matchesDifficulty && matchesSubject && matchesGrade
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111111] sm:text-4xl">Classes & Courses</h1>
        <p className="mt-1 text-sm text-[#555555]">
          Explore subject classes from Grade 1 through Grade 12, with grade-level learning goals, lessons, and practice quizzes.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#666666]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, course code (e.g. WEX-WEB-101)..."
            className="w-full rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-2.5 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            aria-label="Filter by grade"
            className="rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] px-3 py-2 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Grades</option>
            {Array.from({ length: 12 }, (_, index) => index + 1).map(grade => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            aria-label="Filter by subject"
            className="rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] px-3 py-2 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Subjects</option>
            {PRIMARY_SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] px-3 py-2 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] px-3 py-2 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Tracks</option>
            <option value="web">Web & Mobile Development</option>
            <option value="ai">AI & Data Engineering</option>
            <option value="esports">Esports Operations</option>
          </select>
        </div>
      </div>

      {/* Grid of Courses */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] p-12 text-center text-[#555555]">
          <BookOpen className="mx-auto h-12 w-12 text-gray-600 mb-3" />
          <p className="text-base font-bold text-[#111111]">No matching courses found</p>
          <p className="text-xs text-[#555555] mt-1">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e3dfd7] bg-[#f1f1f1] transition duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-md bg-black/75 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md border border-amber-400/30">
                  {course.course_code}
                </div>
                <div className="absolute top-3 right-3 rounded-md bg-emerald-500/90 px-2.5 py-0.5 text-[10px] font-extrabold text-black uppercase">
                  {course.is_free ? 'Free' : `$${course.price}`}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center space-x-2 text-xs text-[#555555] mb-2">
                  <span className="rounded bg-white/5 px-2 py-0.5 font-medium text-amber-400">
                    {course.primary_subject
                      ? `${course.subject_label || course.primary_subject} • Grade ${course.grade_level}`
                      : course.difficulty}
                  </span>
                  <span>•</span>
                  <span>{course.duration_weeks} Weeks</span>
                  <span>•</span>
                  <div className="flex items-center text-amber-400 font-semibold">
                    <Star className="h-3 w-3 fill-amber-400 mr-1" />
                    <span>{course.rating || 5.0}</span>
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
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
