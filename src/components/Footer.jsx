import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Shield, Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#d9c98f]/60 bg-[#fffdf9] text-[#444444]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#111111] via-[#2d2d2d] to-[#d4af37] text-[#f9f7f3] font-extrabold text-lg shadow-lg shadow-[#d4af37]/20">
                S
              </div>
              <span className="text-xl font-bold tracking-wider text-[#111111]">SalaRean Online</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-[#555555] leading-relaxed">
              SalaRean Online is an elite digital education platform designed to empower students, esports professionals, and developers with world-class curriculum, hands-on assignments, and certified achievements.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-[#8b6c1a] font-semibold tracking-wide">
              <span>"Learn. Improve. Achieve. — One Team, One Dream."</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#111111] uppercase">Platform Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/courses" className="hover:text-amber-400 transition">Courses Catalog</Link>
              </li>
              <li>
                <Link to="/student" className="hover:text-amber-400 transition">Student Learning Portal</Link>
              </li>
              <li>
                <Link to="/teacher" className="hover:text-amber-400 transition">Instructor Hub</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition">Super Admin Console</Link>
              </li>
              <li>
                <Link to="/management" className="hover:text-amber-400 transition">SalaRean Executive Analytics</Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Architecture */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#111111] uppercase">Architecture</h4>
            <ul className="mt-4 space-y-2 text-xs text-[#555555]">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                <span>React.js + Vite</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span>Supabase PostgreSQL DB</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>Row Level Security (RLS)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>Supabase Storage Buckets</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                <span>Tailwind CSS v4 Luxury Dark UI</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#d9c98f]/40 pt-8 text-xs text-[#555555] sm:flex-row">
          <p>© 2026 SalaRean Online. All rights reserved.</p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <span className="hover:text-[#444444]">Privacy Policy</span>
            <span className="hover:text-[#444444]">Terms of Service</span>
            <span className="hover:text-[#444444]">Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
