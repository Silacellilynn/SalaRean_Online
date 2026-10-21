import React, { useState, useEffect } from 'react'
import { getAnnouncements, createAnnouncement } from '../../services/lmsService'
import { Bell, Send, CheckCircle } from 'lucide-react'

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isGlobal, setIsGlobal] = useState(true)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const list = await getAnnouncements()
    setAnnouncements(list)
  }

  const handlePost = async (e) => {
    e.preventDefault()
    await createAnnouncement({
      title,
      content,
      is_global: isGlobal,
      author_name: 'WExSEE Administration'
    })

    setTitle('')
    setContent('')
    setSuccess('Announcement broadcasted successfully!')
    await load()
    setTimeout(() => setSuccess(''), 4000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">School Announcements Broadcast</h1>
        <p className="mt-1 text-xs text-[#555555]">
          Issue notices, schedule exam reminders, and notify the student community.
        </p>
      </div>

      {success && (
        <div className="flex items-center space-x-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Broadcast Form */}
      <div className="rounded-2xl border border-white/10 bg-[#121422] p-6 space-y-4">
        <h3 className="text-base font-bold text-[#111111] flex items-center space-x-2">
          <Bell className="h-4 w-4 text-amber-400" />
          <span>Publish New Announcement</span>
        </h3>

        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-1">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule for Final Exam Cohort A"
              className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444444] mb-1">Notice Body / Message</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detailed notification announcement..."
              className="w-full rounded-xl border border-white/10 bg-[#0c0e18] p-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 text-xs text-[#444444] cursor-pointer">
              <input
                type="checkbox"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
                className="rounded text-amber-500"
              />
              <span>Broadcast globally across whole school portal</span>
            </label>

            <button
              type="submit"
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Broadcast Notice</span>
            </button>
          </div>
        </form>
      </div>

      {/* Previous Broadcasts */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#555555] uppercase tracking-wider">Active Broadcasts</h3>
        {announcements.map((ann) => (
          <div key={ann.id} className="rounded-xl border border-white/5 bg-[#121422] p-4 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#111111] text-sm">{ann.title}</h4>
              <span className="text-[10px] text-[#555555]">{new Date(ann.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-[#444444] pt-1 leading-relaxed">{ann.content}</p>
            <span className="block pt-2 text-[10px] text-amber-400 uppercase font-semibold">
              Published by {ann.author_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

