import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f7f3] text-[#111111]">
      <Navbar />
      <main className="flex-1 bg-[#f9f7f3]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
