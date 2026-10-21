import React, { useState, useEffect } from 'react'
import { getCertificates } from '../../services/lmsService'
import { useAuth } from '../../context/AuthContext'
import CertificateModal from '../../components/CertificateModal'
import { Award, ShieldCheck, Printer, Calendar, ArrowRight } from 'lucide-react'

export default function StudentCertificates() {
  const { user } = useAuth()
  const [certificates, setCertificates] = useState([])
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    getCertificates().then(data => {
      setCertificates(data)
    })
  }, [user])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">My Certificates</h1>
        <p className="mt-1 text-xs text-[#555555]">
          Official, verifiable credentials awarded for 100% course completion and assessment mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#f5f3ee] to-[#eeeeee] p-6 shadow-xl transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/15 p-3 text-amber-400">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Official Credential
                  </span>
                  <h3 className="text-base font-bold text-[#111111] group-hover:text-amber-300 transition">
                    {cert.course_title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t border-white/5 pt-4 text-xs">
              <div className="flex justify-between text-[#555555]">
                <span>Awarded to:</span>
                <span className="font-bold text-[#111111] uppercase">{cert.student_name}</span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Certificate Number:</span>
                <span className="font-mono font-bold text-amber-400">{cert.certificate_number}</span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Issue Date:</span>
                <span className="text-[#444444]">{new Date(cert.issued_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Digitally Verified</span>
              </div>

              <button
                onClick={() => setSelectedCert(cert)}
                className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>View & Print</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  )
}
