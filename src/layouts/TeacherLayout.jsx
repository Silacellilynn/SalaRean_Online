import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default function TeacherLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f7f3] text-[#111111]">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="teacher" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
