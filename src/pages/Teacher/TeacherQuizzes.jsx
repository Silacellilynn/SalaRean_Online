import React, { useState, useEffect } from 'react'
import { getQuizzes, createQuiz, getCourses, getAllUsers } from '../../services/lmsService'
import { HelpCircle, PlusCircle, CheckCircle, Clock, Trash2, ClipboardList } from 'lucide-react'

export default function TeacherQuizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [quizTitle, setQuizTitle] = useState('')
  const [courseId, setCourseId] = useState('')
  const [timeLimit, setTimeLimit] = useState(20)
  const [passingScore, setPassingScore] = useState(75)
  const [description, setDescription] = useState('')

  // Questions builder state
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      question: 'What is the role of PostgreSQL Row Level Security (RLS) in Supabase?',
      points: 25,
      options: [
        { text: 'To restrict table rows based on authenticated user context', is_correct: true },
        { text: 'To encrypt hard disk storage', is_correct: false },
        { text: 'To automatically cache SQL query plans', is_correct: false },
        { text: 'To compress multimedia assets', is_correct: false }
      ]
    }
  ])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const [q, c, users] = await Promise.all([getQuizzes(), getCourses(), getAllUsers()])
    setQuizzes(q)
    setCourses(c)
    setStudents(users.filter(person => person.role === 'student'))
    if (c.length > 0) setCourseId(c[0].id)
  }

  const quizAttempts = quizzes.flatMap(quiz => (quiz.attempts || []).map(attempt => ({
    ...attempt,
    quiz_title: quiz.title,
    course_title: quiz.course_title
  }))).sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))

  const handleAddQuestion = () => {
    const newQ = {
      id: `q-${Date.now()}`,
      question: 'New question statement...',
      points: 25,
      options: [
        { text: 'Option A (Correct)', is_correct: true },
        { text: 'Option B', is_correct: false },
        { text: 'Option C', is_correct: false },
        { text: 'Option D', is_correct: false }
      ]
    }
    setQuestions([...questions, newQ])
  }

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    const selectedCourse = courses.find(c => c.id === courseId)

    await createQuiz({
      title: quizTitle,
      course_id: courseId,
      course_title: selectedCourse?.title || 'Selected Track',
      description,
      time_limit_minutes: Number(timeLimit),
      passing_score: Number(passingScore),
      questions
    })

    setShowModal(false)
    setQuizTitle('')
    setDescription('')
    await load()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">Quiz & Examination Builder</h1>
          <p className="mt-1 text-xs text-[#555555]">
            Construct automated evaluations, set passing scores, and publish questions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Quiz</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {quiz.course_title}
              </span>
              <h3 className="text-base font-bold text-[#111111] mt-1">{quiz.title}</h3>
              <p className="text-xs text-[#555555] mt-1">{quiz.description}</p>
            </div>

            <div className="flex items-center space-x-4 border-t border-white/5 pt-3 text-xs text-[#444444]">
              <span className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>{quiz.time_limit_minutes} Mins</span>
              </span>
              <span>•</span>
              <span>Passing: {quiz.passing_score}%</span>
              <span>•</span>
              <span>{quiz.questions?.length || 0} Questions</span>
            </div>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#121422]">
        <div className="flex items-center gap-3 border-b border-white/10 p-5">
          <ClipboardList className="h-5 w-5 text-amber-400" />
          <div>
            <h2 className="text-base font-bold text-[#111111]">Student quiz scores</h2>
            <p className="text-xs text-[#555555]">Scores are recorded automatically when students submit a quiz.</p>
          </div>
        </div>
        {quizAttempts.length === 0 ? (
          <p className="p-5 text-xs text-[#555555]">No quiz attempts have been submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#555555]">
                <tr className="border-b border-white/5">
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-5 py-3 font-semibold">Class / Quiz</th>
                  <th className="px-5 py-3 font-semibold">Score</th>
                  <th className="px-5 py-3 font-semibold">Result</th>
                  <th className="px-5 py-3 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {quizAttempts.map(attempt => {
                  const student = students.find(person => person.id === attempt.student_id)
                  return (
                    <tr key={attempt.id}>
                      <td className="px-5 py-3 text-[#111111]">{student?.full_name || attempt.student_id}</td>
                      <td className="px-5 py-3">
                        <p className="text-[#333333]">{attempt.course_title}</p>
                        <p className="mt-0.5 text-[#666666]">{attempt.quiz_title}</p>
                      </td>
                      <td className="px-5 py-3 font-bold text-amber-300">{attempt.score}%</td>
                      <td className={`px-5 py-3 font-semibold ${attempt.is_passed ? 'text-emerald-400' : 'text-red-400'}`}>
                        {attempt.is_passed ? 'Passed' : 'Needs practice'}
                      </td>
                      <td className="px-5 py-3 text-[#555555]">
                        {attempt.completed_at ? new Date(attempt.completed_at).toLocaleString() : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quiz Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#141624] p-6 shadow-2xl my-8">
            <h3 className="text-lg font-bold text-[#111111] mb-4">Create Timed Examination / Quiz</h3>

            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Course</label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Quiz Title</label>
                  <input
                    type="text"
                    required
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="e.g. Midterm Examination"
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Time Limit (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#444444] mb-1">Passing Score (%)</label>
                  <input
                    type="number"
                    required
                    value={passingScore}
                    onChange={(e) => setPassingScore(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Questions Section */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">Questions List ({questions.length})</span>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="text-xs text-amber-400 font-semibold hover:underline cursor-pointer"
                  >
                    + Add Question
                  </button>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="rounded-xl border border-white/5 bg-[#0c0e18] p-3 text-xs">
                      <p className="font-bold text-[#111111]">{idx + 1}. {q.question}</p>
                      <p className="text-[11px] text-[#555555] mt-1">
                        Correct: {q.options.find(o => o.is_correct)?.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
                >
                  Publish Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
