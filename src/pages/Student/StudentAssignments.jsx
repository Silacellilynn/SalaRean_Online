import React, { useState, useEffect } from 'react'
import { getAssignments, submitAssignment } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import { FileText, CheckCircle, Clock, AlertCircle, Send, Check, MessageSquare } from 'lucide-react'

export default function StudentAssignments() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissionText, setSubmissionText] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadAssignments()
  }, [])

  const loadAssignments = async () => {
    const data = await getAssignments()
    setAssignments(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedAssignment || !user) return

    setSubmitting(true)
    await submitAssignment(selectedAssignment.id, user, {
      content: submissionText,
      file_url: fileUrl
    })

    setSuccessMsg('Assignment submitted successfully!')
    setSubmitting(false)
    setSelectedAssignment(null)
    setSubmissionText('')
    setFileUrl('')
    await loadAssignments()
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">Course Assignments</h1>
        <p className="mt-1 text-xs text-[#555555]">
          Submit practical projects, homework deliverables, and track teacher reviews.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center space-x-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((asg) => {
          const userSub = asg.submissions?.find(s => s.student_id === user?.id)
          const isGraded = userSub?.status === 'graded'

          return (
            <div
              key={asg.id}
              className="rounded-2xl border border-white/10 bg-[#121422] p-6 transition hover:border-amber-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {asg.course_title}
                  </span>
                  <h3 className="text-lg font-bold text-[#111111]">{asg.title}</h3>
                  <p className="text-xs text-[#444444] leading-relaxed pt-1">{asg.description}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="flex items-center space-x-2 text-xs">
                    <Clock className="h-4 w-4 text-[#555555]" />
                    <span className="text-[#555555]">
                      Due: {new Date(asg.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    Max Score: {asg.max_score} pts
                  </span>

                  {userSub ? (
                    <span className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-bold ${
                      isGraded
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      <Check className="h-3 w-3" />
                      <span>{isGraded ? `Graded: ${userSub.score}/${asg.max_score}` : 'Submitted (Under Review)'}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedAssignment(asg)
                        setSubmissionText('')
                        setFileUrl('')
                      }}
                      className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
                    >
                      Submit Work
                    </button>
                  )}
                </div>
              </div>

              {/* Submission details & teacher feedback */}
              {userSub && (
                <div className="mt-5 rounded-xl border border-white/5 bg-[#0c0e18] p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#555555] text-[11px]">
                    <span>Submitted on: {new Date(userSub.submitted_at).toLocaleString()}</span>
                    {userSub.file_url && (
                      <a href={userSub.file_url} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                        View Attached Deliverable ↗
                      </a>
                    )}
                  </div>
                  <p className="text-[#333333] bg-white/5 p-2.5 rounded-lg font-mono text-[11px]">
                    {userSub.content}
                  </p>

                  {userSub.feedback && (
                    <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-amber-200">
                      <p className="font-bold flex items-center space-x-1.5 text-amber-400 mb-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Teacher Feedback:</span>
                      </p>
                      <p className="text-xs">{userSub.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#111111] mb-1">Submit Assignment</h3>
            <p className="text-xs text-amber-400 font-semibold mb-4">{selectedAssignment.title}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">
                  Submission Notes / Code / GitHub Repository URL:
                </label>
                <textarea
                  required
                  rows={4}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Paste your GitHub repository link, project URL, or solution notes..."
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444444] mb-1">
                  File URL or Storage Link (Optional):
                </label>
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://storage.wexsee.edu/files/my-submission.zip"
                  className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
                >
                  {submitting ? 'Submitting...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

