import React, { useState } from 'react'
import { Database, CheckCircle, Copy, ExternalLink, X, Shield, ArrowRight, Terminal, Globe } from 'lucide-react'
import { isSupabaseConfigured } from '../services/supabase'

export default function SupabaseConnectModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopySchemaPath = () => {
    navigator.clipboard.writeText('supabase/schema.sql')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/30 bg-[#0e101b] p-6 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-black font-extrabold text-xl shadow-lg shadow-amber-500/20">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#111111]">Link Supabase & Publish Guide</h2>
              <p className="text-xs text-[#555555]">Step-by-step instructions for production deployment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#555555] hover:bg-white/10 hover:text-[#111111] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Connection Status */}
        <div className="my-5 rounded-xl border border-white/10 bg-[#141624] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`h-3 w-3 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></div>
            <div>
              <p className="text-xs font-bold text-[#111111]">
                {isSupabaseConfigured ? 'Connected to Live Supabase' : 'Running in Offline / Demo Mode'}
              </p>
              <p className="text-[11px] text-[#555555]">
                {isSupabaseConfigured
                  ? 'All database queries, authentications, and storage sync directly to your Supabase PostgreSQL.'
                  : 'Currently storing data locally. Follow steps below to link your live Supabase project.'}
              </p>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4 text-xs">
          {/* Step 1 */}
          <div className="rounded-xl border border-white/5 bg-[#121422] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 uppercase text-[11px]">Step 1: Create Supabase Project</span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-amber-400 hover:underline font-semibold"
              >
                <span>Open Dashboard</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-[#444444]">
              Go to <span className="font-mono text-[#111111]">supabase.com</span>, sign in, and click <strong>"New Project"</strong>. Choose a name (e.g. <em>WExSEE-Eschool</em>) and your preferred region.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-white/5 bg-[#121422] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 uppercase text-[11px]">Step 2: Run Database Schema SQL</span>
              <button
                onClick={handleCopySchemaPath}
                className="flex items-center space-x-1 text-[#444444] hover:text-[#111111] font-medium cursor-pointer"
              >
                <Copy className="h-3 w-3 text-amber-400" />
                <span>{copied ? 'Path Copied!' : 'File: supabase/schema.sql'}</span>
              </button>
            </div>
            <p className="text-[#444444]">
              Open the <strong>SQL Editor</strong> tab in your Supabase Dashboard, copy the contents of <span className="font-mono text-amber-300">supabase/schema.sql</span> (and optionally <span className="font-mono text-amber-300">supabase/seed.sql</span>), and click <strong>Run</strong>. This creates all 18 tables, RLS policies, and storage buckets!
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-white/5 bg-[#121422] p-4 space-y-2">
            <span className="font-bold text-amber-400 uppercase text-[11px]">Step 3: Add Keys to .env</span>
            <p className="text-[#444444]">
              In your Supabase project, go to <strong>Project Settings → API</strong>. Copy your <strong>Project URL</strong> and <strong>anon (public) key</strong> into your project's <span className="font-mono text-[#111111]">.env</span> file:
            </p>
            <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-[#444444] border border-white/10 space-y-1">
              <div>VITE_SUPABASE_URL=https://your-project-id.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY=eyJh...your-anon-key...</div>
            </div>
          </div>

          {/* Step 4: Google sign-in */}
          <div className="rounded-xl border border-white/5 bg-[#121422] p-4 space-y-2">
            <span className="font-bold text-amber-400 uppercase text-[11px]">Step 4: Enable Google Sign-In</span>
            <p className="text-[#444444]">
              In Supabase, open <strong>Authentication → Sign In / Providers → Google</strong> and enable Google. Create a Google OAuth Web Client in Google Cloud Console, then paste its client ID and client secret into the Supabase Google provider settings.
            </p>
            <p className="text-[#444444]">
              In Google Cloud, set the authorized redirect URI to your Supabase project's callback URL:
            </p>
            <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-amber-300 border border-white/10">
              https://&lt;project-ref&gt;.supabase.co/auth/v1/callback
            </div>
            <p className="text-[#444444]">
              Add the callback URL for the port shown by Vite (for example, <span className="font-mono text-[#111111]">http://localhost:5173/auth/callback</span> or <span className="font-mono text-[#111111]">http://localhost:5174/auth/callback</span>) under Supabase Authentication → URL Configuration → Redirect URLs. Use your deployed site callback URL there as well when publishing.
            </p>
            <p className="text-[#555555] text-[11px]">
              Keep the Google client secret in Supabase only; never put it in the frontend .env file.
            </p>
          </div>

          {/* Step 5: Publish */}
          <div className="rounded-xl border border-white/5 bg-[#121422] p-4 space-y-2">
            <span className="font-bold text-amber-400 uppercase text-[11px]">Step 5: Publish to Vercel or Netlify</span>
            <p className="text-[#444444]">
              To publish your website live to the internet:
            </p>
            <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-emerald-400 border border-white/10 space-y-1">
              <div># Deploy with Vercel (easiest)</div>
              <div className="text-[#333333]">npx vercel</div>
              <div className="text-[#555555] mt-1"># Or push to GitHub and import repository on vercel.com</div>
            </div>
            <p className="text-[#555555] text-[11px]">
              Remember to add <span className="text-[#111111] font-mono">VITE_SUPABASE_URL</span> and <span className="text-[#111111] font-mono">VITE_SUPABASE_ANON_KEY</span> in your Vercel Project Settings → Environment Variables, and allow your production callback URL in Supabase.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-yellow-400 transition cursor-pointer"
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  )
}
