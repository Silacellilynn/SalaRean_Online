import React, { useState, useEffect } from 'react'
import { getAssignments, gradeSubmission, createAssignment, getCourses } from '../../services/lmsService'
import { FileText, CheckCircle, PlusCircle, MessageSquare, ExternalLink } from 'lucide-react'

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedSub, setSelectedSub] = useState(null)
  const [score, setScore] = useState(95)
  const [feedback, setFeedback] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [asgForm, setAsgForm] = useState({
    title: '',
    course_id: '',
    course_title: '',
    description: '',
    deadline: '2026-11-15T23:59:00Z',
    max_score: 100
  })

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const [a, c] = await Promise.all([getAssignments(), getCourses()])
    setAssignments(a)
    setCourses(c)
    if (c.length > 0) {
      setAsgForm(prev => ({ ...prev, course_id: c[0].id, course_title: c[0].title }))
    }
  }

  const handleGrade = async (e) => {
    e.preventDefault()
    if (!selectedSub) return

    await gradeSubmission(selectedSub.assignment_id, selectedSub.student_id, score, feedback)
    setSelectedSub(null)
    setFeedback('')
    await load()
  }

  const handleCreateAssignment = async (e) => {
    e.preventDefault()
    const selectedCourseObj = courses.find(c => c.id === asgForm.course_id)
    await createAssignment({
      ...asgForm,
      course_title: selectedCourseObj?.title || asgForm.course_title
    })
    setShowCreateModal(false)
    setAsgForm({
      title: '',
      course_id: courses[0]?.id || '',
      course_title: courses[0]?.title || '',
      description: '',
      deadline: '2026-11-15T23:59:00Z',
      max_score: 100
    })
    await load()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">Assignment Grading Hub</h1>
          <p className="mt-1 text-xs text-[#555555]">
            Review submitted student repositories, assign marks, and issue constructive feedback.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Submissions by Assignment */}
      <div className="space-y-6">
        {assignments.map((asg) => (
          <div key={asg.id} className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase">{asg.course_title}</span>
                <h3 className="text-base font-bold text-[#111111]">{asg.title}</h3>
                <p className="text-xs text-[#444444] mt-0.5">{asg.description}</p>
              </div>
              <span className="text-xs text-[#555555] shrink-0 font-medium">Max {asg.max_score} pts</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#555555] uppercase tracking-wider">
                Student Submissions ({asg.submissions?.length || 0}):
              </h4>

              {asg.submissions?.length === 0 ? (
                <p className="text-xs text-[#666666] italic">No student submissions received yet.</p>
              ) : (
                asg.submissions?.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#0c0e18] p-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#111111] text-sm">{sub.student_name}</span>
                        <span className="text-[10px] text-[#555555]">({sub.student_email})</span>
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-[#444444] bg-white/5 p-2 rounded">
                        {sub.content}
                      </p>
                      {sub.feedback && (
                        <p className="mt-2 text-xs text-amber-300">
                          <span className="font-semibold text-amber-400">Feedback:</span> {sub.feedback}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 sm:shrink-0">
                      {sub.score !== null ? (
                        <span className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                          Graded: {sub.score} / {asg.max_score}
                        </span>
                      ) : (
                        <span className="text-xs text-amber-400 font-semibold">Pending Grade</span>
                      )}

                      <button
                        onClick={() => {
                          setSelectedSub({ ...sub, assignment_id: asg.id, max_score: asg.max_score })
                          setScore(sub.score || 90)
                          setFeedback(sub.feedback || '')
                        }}
                        className="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-black hover:bg-amber-400 transition cursor-pointer"
                      >
                        {sub.score !== null ? 'Edit Grade' : 'Grade Submission'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Grade Submission Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#111111] mb-1">Grade Submission</h3>
            <p className="text-xs text-[#555555] mb-4">Student: {selectedSub.student_name}</p>

            <form onSubmit={handleGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">
                  Numerical Score (Max: {selectedSub.max_score})
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  max={selectedSub.max_score}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Constructive Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide targeted feedback, praise strengths, and note improvements..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
                >
                  Save & Publish Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#111111] mb-4">Create New Homework Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Associated Course</label>
                <select
                  value={asgForm.course_id}
                  onChange={(e) => setAsgForm({ ...asgForm, course_id: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={asgForm.title}
                  onChange={(e) => setAsgForm({ ...asgForm, title: e.target.value })}
                  placeholder="e.g. Practical Project 3: Realtime Chatroom"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">Instructions & Criteria</label>
                <textarea
                  rows={3}
                  required
                  value={asgForm.description}
                  onChange={(e) => setAsgForm({ ...asgForm, description: e.target.value })}
                  placeholder="Detailed task guidelines and submission format..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 cursor-pointer"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

