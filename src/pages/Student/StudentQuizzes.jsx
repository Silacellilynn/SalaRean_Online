import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getQuizzes, submitQuizAttempt } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import confetti from 'canvas-confetti'
import { HelpCircle, Clock, Award, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react'

export default function StudentQuizzes() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [quizzes, setQuizzes] = useState([])
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const selectedCourseId = searchParams.get('course')
  const visibleQuizzes = selectedCourseId
    ? quizzes.filter(quiz => quiz.course_id === selectedCourseId)
    : quizzes

  useEffect(() => {
    loadQuizzes()
  }, [])

  const loadQuizzes = async () => {
    const data = await getQuizzes()
    setQuizzes(data)
  }

  // Timer effect when taking a quiz
  useEffect(() => {
    if (!activeQuiz || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [activeQuiz, timeLeft])

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz)
    setSelectedAnswers({})
    setQuizResult(null)
    setTimeLeft((quiz.time_limit_minutes || 15) * 60)
  }

  const handleSelectOption = (questionId, optionText) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionText
    }))
  }

  const handleFinishQuiz = async () => {
    if (!activeQuiz || !user) return

    const attempt = await submitQuizAttempt(activeQuiz.id, user.id, selectedAnswers)
    setQuizResult(attempt)

    if (attempt.is_passed) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    }

    await loadQuizzes()
  }

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">Quizzes & Assessments</h1>
        <p className="mt-1 text-xs text-[#555555]">
          Timed knowledge checks, midterm examinations, and instant grading.
        </p>
      </div>

      {/* If taking a quiz right now */}
      {activeQuiz ? (
        <div className="rounded-2xl border border-amber-500/30 bg-[#121422] p-6 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Examination in Progress
              </span>
              <h2 className="text-xl font-bold text-[#111111]">{activeQuiz.title}</h2>
            </div>
            <div className="flex items-center space-x-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-amber-300 font-mono font-bold text-sm">
              <Clock className="h-4 w-4 animate-pulse" />
              <span>Time Left: {formatTimer(timeLeft)}</span>
            </div>
          </div>

          {/* Quiz Result View */}
          {quizResult ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30">
                {quizResult.is_passed ? (
                  <CheckCircle className="h-10 w-10 text-emerald-400" />
                ) : (
                  <XCircle className="h-10 w-10 text-red-400" />
                )}
              </div>
              <h3 className="text-2xl font-black text-[#111111]">
                {quizResult.is_passed ? 'Congratulations! Passed' : 'Assessment Incomplete'}
              </h3>
              <p className="text-sm text-[#444444]">
                Your Score: <span className="text-amber-400 font-bold text-lg">{quizResult.score}%</span> (Passing score: {activeQuiz.passing_score}%)
              </p>

              <div className="pt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleStartQuiz(activeQuiz)}
                  className="flex items-center space-x-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-[#111111] hover:bg-white/20 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuiz(null)
                    setQuizResult(null)
                  }}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs font-bold text-black hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
                >
                  Back to Quizzes
                </button>
              </div>
            </div>
          ) : (
            /* Questions List */
            <div className="space-y-8">
              {activeQuiz.questions?.map((q, idx) => (
                <div key={q.id} className="rounded-xl border border-white/5 bg-[#0c0e18] p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-bold text-[#111111]">
                      {idx + 1}. {q.question}
                    </h3>
                    <span className="text-[10px] font-bold text-amber-400 shrink-0">
                      {q.points} Points
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {q.options?.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center space-x-3 rounded-lg border p-3 text-xs transition cursor-pointer ${
                          selectedAnswers[q.id] === opt.text
                            ? 'border-amber-400 bg-amber-500/10 text-[#111111] font-medium'
                            : 'border-white/5 bg-white/5 text-[#444444] hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={selectedAnswers[q.id] === opt.text}
                          onChange={() => handleSelectOption(q.id, opt.text)}
                          className="text-amber-500 focus:ring-amber-400"
                        />
                        <span>{opt.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="text-xs text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel & Exit
                </button>
                <button
                  onClick={handleFinishQuiz}
                  className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
                >
                  <span>Submit Exam for Grading</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quizzes Directory */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleQuizzes.map((quiz) => {
            const userAttempts = quiz.attempts?.filter(a => a.student_id === user?.id) || []
            const bestAttempt = userAttempts.sort((a, b) => b.score - a.score)[0]

            return (
              <div
                key={quiz.id}
                className="rounded-2xl border border-white/10 bg-[#121422] p-6 flex flex-col justify-between hover:border-amber-500/30 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {quiz.course_title}
                    </span>
                    <span className="text-[11px] text-[#555555] font-medium">
                      {quiz.time_limit_minutes} Mins
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#111111] mb-2">{quiz.title}</h3>
                  <p className="text-xs text-[#444444] leading-relaxed mb-4">{quiz.description}</p>

                  <div className="flex items-center space-x-4 text-xs text-[#555555]">
                    <span>{quiz.questions?.length || 0} Questions</span>
                    <span>•</span>
                    <span>Passing Score: {quiz.passing_score}%</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  {bestAttempt ? (
                    <div className="text-xs">
                      <span className="text-[#555555]">Best Score: </span>
                      <span className={`font-bold ${bestAttempt.is_passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {bestAttempt.score}% {bestAttempt.is_passed ? '(Passed)' : ''}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#666666]">Not attempted yet</span>
                  )}

                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
                  >
                    {bestAttempt ? 'Retake Quiz' : 'Start Exam'}
                  </button>
                </div>
              </div>
            )
          })}
          {visibleQuizzes.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#121422] p-8 text-center text-sm text-[#555555] md:col-span-2">
              No quizzes are available for this class yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
