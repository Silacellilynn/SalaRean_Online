import React, { useState, useEffect } from 'react'
import { getCourses, createCourse, addModuleToCourse, addLessonToModule } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import { PRIMARY_SUBJECTS } from '../../services/primaryCurriculum'
import { uploadLessonVideo } from '../../services/videoService'
import { DEFAULT_TEACHER_NAME } from '../../services/teacherIdentity'
import { PlusCircle, BookOpen, Layers, Video, CheckCircle, ArrowRight, X, Upload } from 'lucide-react'

export default function TeacherCourseManager() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showModuleModal, setShowModuleModal] = useState(false)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)

  // Forms
  const [courseForm, setCourseForm] = useState({
    title: '',
    course_code: '',
    description: '',
    thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    difficulty: 'Beginner',
    duration_weeks: 8,
    category_name: 'Primary School',
    primary_subject: 'Khmer Language',
    grade_level: 1,
    other_subject: ''
  })

  const [moduleTitle, setModuleTitle] = useState('')
  const [moduleDesc, setModuleDesc] = useState('')

  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration_minutes: 20,
    video_url: '',
    content: ''
  })
  const [lessonVideo, setLessonVideo] = useState(null)
  const [formError, setFormError] = useState('')
  const [savingLesson, setSavingLesson] = useState(false)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const list = await getCourses()
    setCourses(list)
  }
  const visibleCourses = courses.filter(course =>
    (subjectFilter === 'all' || course.primary_subject === subjectFilter) &&
    (gradeFilter === 'all' || String(course.grade_level || '') === gradeFilter)
  )

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    const subjectLabel = courseForm.primary_subject === 'Others'
      ? courseForm.other_subject.trim() || 'Others'
      : courseForm.primary_subject
    const grade = Number(courseForm.grade_level)
    await createCourse({
      ...courseForm,
      title: courseForm.title.trim() || `${subjectLabel} - Grade ${grade}`,
      primary_subject: courseForm.primary_subject,
      subject_label: courseForm.primary_subject === 'Others' ? subjectLabel : null,
      grade_level: grade,
      teacher_id: user?.id,
      teacher_name: user?.full_name || DEFAULT_TEACHER_NAME
    })
    setShowCreateModal(false)
    setCourseForm({
      title: '',
      course_code: '',
      description: '',
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      difficulty: 'Beginner',
      duration_weeks: 8,
      category_name: 'Primary School',
      primary_subject: 'Khmer Language',
      grade_level: 1,
      other_subject: ''
    })
    await loadCourses()
  }

  const handleAddModule = async (e) => {
    e.preventDefault()
    if (!selectedCourse) return
    await addModuleToCourse(selectedCourse.id, moduleTitle, moduleDesc)
    setShowModuleModal(false)
    setModuleTitle('')
    setModuleDesc('')
    await loadCourses()
  }

  const handleAddLesson = async (e) => {
    e.preventDefault()
    if (!selectedCourse || !selectedModule) return
    setSavingLesson(true)
    setFormError('')
    try {
      const uploadedVideo = lessonVideo
        ? await uploadLessonVideo(lessonVideo, selectedCourse.id)
        : {}
      await addLessonToModule(selectedCourse.id, selectedModule.id, {
        ...lessonForm,
        ...uploadedVideo,
        lesson_type: uploadedVideo.video_url || lessonForm.video_url ? 'video' : 'text'
      })
      setShowLessonModal(false)
      setLessonForm({ title: '', duration_minutes: 20, video_url: '', content: '' })
      setLessonVideo(null)
      await loadCourses()
    } catch (error) {
      setFormError(error.message || 'Could not save this lesson. Please try again.')
    } finally {
      setSavingLesson(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">Subject Classes & Lessons</h1>
          <p className="mt-1 text-xs text-[#555555]">
            Organize subjects by grade, add lesson materials, and upload class videos.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Class</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          aria-label="Filter classes by subject"
          className="rounded-xl border border-white/10 bg-[#121422] px-3 py-2 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
        >
          <option value="all">All Subjects and Courses</option>
          {PRIMARY_SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
        </select>
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          aria-label="Filter classes by grade"
          className="rounded-xl border border-white/10 bg-[#121422] px-3 py-2 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
        >
          <option value="all">All Grades</option>
          {Array.from({ length: 12 }, (_, index) => index + 1).map(grade => (
            <option key={grade} value={grade}>Grade {grade}</option>
          ))}
        </select>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {visibleCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="h-16 w-24 rounded-lg object-cover border border-white/5"
                />
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">{course.course_code}</span>
                  <h3 className="text-base font-bold text-[#111111]">{course.title}</h3>
                  <p className="text-xs text-[#555555]">
                    {course.primary_subject && `${course.subject_label || course.primary_subject} • Grade ${course.grade_level} • `}
                    {course.difficulty} • {course.duration_weeks} Weeks • {course.enrolled_count || 0} Students Enrolled
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedCourse(course)
                    setShowModuleModal(true)
                  }}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500 hover:text-black transition cursor-pointer"
                >
                  + Add Module
                </button>
              </div>
            </div>

            {/* Modules and Lessons of Course */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#555555] uppercase tracking-wider">Course Modules & Lessons:</h4>
              {course.modules?.length === 0 ? (
                <p className="text-xs text-[#666666] italic">No modules added yet. Click "+ Add Module" above.</p>
              ) : (
                course.modules?.map((mod) => (
                  <div key={mod.id} className="rounded-xl border border-white/5 bg-[#0c0e18] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#111111]">{mod.title}</span>
                      <button
                        onClick={() => {
                          setSelectedCourse(course)
                          setSelectedModule(mod)
                          setShowLessonModal(true)
                        }}
                        className="text-[11px] font-semibold text-amber-400 hover:underline cursor-pointer"
                      >
                        + Add Lesson
                      </button>
                    </div>

                    <div className="space-y-1.5 pl-2 border-l border-white/10">
                      {mod.lessons?.length === 0 ? (
                        <p className="text-[11px] text-[#666666]">No lessons yet.</p>
                      ) : (
                        mod.lessons?.map((les) => (
                          <div key={les.id} className="flex items-center justify-between text-xs text-[#444444] py-1">
                            <span>• {les.title}</span>
                            <span className="text-[10px] text-[#555555]">{les.duration_minutes} mins</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#111111] mb-4">Create a Subject Class</h3>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Subject</label>
                  <select
                    value={courseForm.primary_subject}
                    onChange={(e) => setCourseForm({ ...courseForm, primary_subject: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  >
                    {PRIMARY_SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Grade</label>
                  <select
                    value={courseForm.grade_level}
                    onChange={(e) => setCourseForm({ ...courseForm, grade_level: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  >
                    {Array.from({ length: 12 }, (_, index) => index + 1).map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
              </div>
              {courseForm.primary_subject === 'Others' && (
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Other subject name</label>
                  <input
                    value={courseForm.other_subject}
                    onChange={(e) => setCourseForm({ ...courseForm, other_subject: e.target.value })}
                    placeholder="Enter the subject"
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Class title (optional)</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="Defaults to the selected subject and grade"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Class Code (optional)</label>
                  <input
                    type="text"
                    value={courseForm.course_code}
                    onChange={(e) => setCourseForm({ ...courseForm, course_code: e.target.value })}
                    placeholder="Generated automatically"
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Difficulty</label>
                  <select
                    value={courseForm.difficulty}
                    onChange={(e) => setCourseForm({ ...courseForm, difficulty: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Class description</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Optional description of this class"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#111111] mb-3">Add Module to {selectedCourse?.title}</h3>
            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Module Title</label>
                <input
                  type="text"
                  required
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  placeholder="e.g. Module 3: Advanced Optimization"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Module Description</label>
                <textarea
                  rows={2}
                  value={moduleDesc}
                  onChange={(e) => setModuleDesc(e.target.value)}
                  placeholder="Brief synopsis of this module..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModuleModal(false)}
                  className="rounded-xl px-4 py-2 text-xs text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 cursor-pointer"
                >
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#111111] mb-3">Add Lesson to {selectedModule?.title}</h3>
            <form onSubmit={handleAddLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  placeholder="e.g. Lesson 4: Profiling & Performance Metrics"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">YouTube / Video URL (optional)</label>
                <input
                  type="url"
                  value={lessonForm.video_url}
                  onChange={(e) => {
                    setLessonForm({ ...lessonForm, video_url: e.target.value })
                    if (e.target.value) setLessonVideo(null)
                  }}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Or upload a video (up to 100 MB)</label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-[#0c0e18] p-3 text-xs text-[#444444] hover:border-amber-400/50">
                  <Upload className="h-4 w-4 text-amber-400" />
                  <span>{lessonVideo?.name || 'Choose a video file'}</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="sr-only"
                    onChange={(e) => {
                      setLessonVideo(e.target.files?.[0] || null)
                      if (e.target.files?.[0]) setLessonForm({ ...lessonForm, video_url: '' })
                    }}
                  />
                </label>
                <p className="mt-1 text-[10px] text-[#666666]">Uploaded videos are saved to your school storage or this browser in demo mode.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Lesson Notes & Text Content</label>
                <textarea
                  rows={4}
                  value={lessonForm.content}
                  onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                  placeholder="Markdown or key lesson points..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              {formError && <p role="alert" className="text-xs text-red-400">{formError}</p>}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLessonModal(false)}
                  className="rounded-xl px-4 py-2 text-xs text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLesson}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 disabled:opacity-50 cursor-pointer"
                >
                  {savingLesson ? 'Saving...' : 'Save Lesson'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
