import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import StudentLayout from './layouts/StudentLayout'
import TeacherLayout from './layouts/TeacherLayout'
import AdminLayout from './layouts/AdminLayout'
import ManagementLayout from './layouts/ManagementLayout'

// Public Pages
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import AuthCallbackPage from './pages/Auth/AuthCallbackPage'
import CourseCatalogPage from './pages/Courses/CourseCatalogPage'
import CourseDetailPage from './pages/Courses/CourseDetailPage'
import CoursePlayerPage from './pages/Courses/CoursePlayerPage'

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard'
import StudentAssignments from './pages/Student/StudentAssignments'
import StudentQuizzes from './pages/Student/StudentQuizzes'
import StudentGrades from './pages/Student/StudentGrades'
import StudentCertificates from './pages/Student/StudentCertificates'

// Teacher Pages
import TeacherDashboard from './pages/Teacher/TeacherDashboard'
import TeacherCourseManager from './pages/Teacher/TeacherCourseManager'
import TeacherAssignments from './pages/Teacher/TeacherAssignments'
import TeacherQuizzes from './pages/Teacher/TeacherQuizzes'

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminAnnouncements from './pages/Admin/AdminAnnouncements'

// Management Pages
import ManagementDashboard from './pages/Management/ManagementDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/courses/:courseId/learn" element={<CoursePlayerPage />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentDashboard />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="quizzes" element={<StudentQuizzes />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="certificates" element={<StudentCertificates />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourseManager />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="quizzes" element={<TeacherQuizzes />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<TeacherCourseManager />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>

          {/* Management Routes */}
          <Route path="/management" element={<ManagementLayout />}>
            <Route index element={<ManagementDashboard />} />
            <Route path="analytics" element={<ManagementDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
