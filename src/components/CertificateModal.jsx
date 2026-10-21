import React, { useRef } from 'react'
import { Award, Download, Printer, X, ShieldCheck, Sparkles } from 'lucide-react'
import { DEFAULT_TEACHER_NAME, normalizeTeacherName } from '../services/teacherIdentity'

export default function CertificateModal({ certificate, onClose }) {
  const certRef = useRef(null)

  if (!certificate) return null

  const handlePrint = () => {
    window.print()
  }

  const formattedDate = new Date(certificate.issued_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl border border-amber-500/30 bg-[#0e1017] p-6 shadow-2xl">
        {/* Top Control Bar */}
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center space-x-2 text-amber-400">
            <Award className="h-6 w-6" />
            <h2 className="text-lg font-bold">Official Certificate of Completion</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-black cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#555555] transition hover:bg-white/10 hover:text-[#111111] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div
          ref={certRef}
          className="relative overflow-hidden rounded-xl border-4 border-double border-amber-500/50 bg-gradient-to-br from-[#f5f3ee] via-[#f1f1f1] to-[#ece7df] p-8 text-center text-[#111111] shadow-2xl sm:p-12"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 h-8 w-8 border-t-2 border-l-2 border-amber-400/70"></div>
          <div className="absolute top-2 right-2 h-8 w-8 border-t-2 border-r-2 border-amber-400/70"></div>
          <div className="absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-amber-400/70"></div>
          <div className="absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 border-amber-400/70"></div>

          {/* Header */}
          <div className="mb-4 flex items-center justify-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#111111] via-[#2d2d2d] to-[#d4af37] text-[#f9f7f3] shadow-lg shadow-amber-500/20 font-extrabold text-2xl">
              S
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black tracking-widest text-[#111111] uppercase">SalaRean Online</h1>
              <p className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold">Excellence in Digital Education & Esports Leadership</p>
            </div>
          </div>

          <div className="my-6">
            <p className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
              CERTIFICATE OF COMPLETION
            </p>
            <div className="mx-auto mt-2 h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>

          <p className="text-xs text-[#444444] italic">This certificate is proudly presented to</p>

          <h2 className="my-4 text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 uppercase sm:text-4xl">
            {certificate.student_name || 'STUDENT NAME'}
          </h2>

          <p className="mx-auto max-w-xl text-xs text-[#444444]">
            for successfully completing all curriculum requirements, practical assignments, and assessments for
          </p>

          <h3 className="my-4 text-xl font-bold text-[#111111] sm:text-2xl">
            {certificate.course_title || 'Introduction to Web Development'}
          </h3>

          <div className="my-8 flex items-center justify-center gap-2 text-xs text-amber-400/80">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>Verified Credential ID:</span>
            <span className="font-mono font-bold text-[#111111] tracking-wider">{certificate.certificate_number}</span>
          </div>

          {/* Signatures */}
          <div className="mt-8 grid grid-cols-2 gap-8 border-t border-white/10 pt-6">
            <div className="text-center">
              <div className="font-serif italic text-amber-200 text-lg">{normalizeTeacherName(certificate.teacher_name || DEFAULT_TEACHER_NAME)}</div>
              <div className="mx-auto mt-1 h-px w-36 bg-amber-400/40"></div>
              <p className="mt-1 text-[11px] font-semibold text-[#555555] uppercase">Lead Instructor</p>
            </div>
            <div className="text-center">
              <div className="font-serif italic text-amber-200 text-lg">Dr. Elena Rostova</div>
              <div className="mx-auto mt-1 h-px w-36 bg-amber-400/40"></div>
              <p className="mt-1 text-[11px] font-semibold text-[#555555] uppercase">SalaRean Academic Board</p>
              <p className="text-[10px] text-[#555555]">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
