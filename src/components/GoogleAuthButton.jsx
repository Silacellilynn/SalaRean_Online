import React from 'react'

export default function GoogleAuthButton({ loading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center space-x-3 rounded-xl border border-[#d8d2c8] bg-[#f9f7f3] py-3 text-xs font-semibold text-[#111111] transition hover:bg-[#e9e9e9] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span aria-hidden="true" className="text-base font-black text-[#4285F4]">G</span>
      <span>{loading ? 'Connecting to Google...' : 'Continue with Google'}</span>
    </button>
  )
}
