-- ==============================================================================
-- WExSEE E-School — Supabase PostgreSQL Database Schema
-- Version: 1.0.0
-- Platform: Online Learning Management System (LMS)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. ENUMS & DOMAINS
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin', 'management');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE course_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE lesson_type AS ENUM ('video', 'pdf', 'text', 'quiz', 'assignment');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. CORE TABLES
-- ==============================================================================

-- 3.1 Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20),
    country VARCHAR(100),
    avatar_url TEXT,
    member_id VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'management')),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.2 Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.3 Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    course_code VARCHAR(50) UNIQUE NOT NULL,
    primary_subject VARCHAR(150),
    subject_label VARCHAR(150),
    grade_level INTEGER CHECK (grade_level IS NULL OR grade_level BETWEEN 1 AND 12),
    description TEXT,
    thumbnail_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    difficulty VARCHAR(30) DEFAULT 'beginner',
    duration_weeks INTEGER DEFAULT 8,
    language VARCHAR(50) DEFAULT 'English',
    status VARCHAR(30) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_free BOOLEAN DEFAULT true,
    price NUMERIC(10, 2) DEFAULT 0.00,
    max_students INTEGER DEFAULT 500,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.courses
    ADD COLUMN IF NOT EXISTS primary_subject VARCHAR(150),
    ADD COLUMN IF NOT EXISTS subject_label VARCHAR(150),
    ADD COLUMN IF NOT EXISTS grade_level INTEGER CHECK (grade_level IS NULL OR grade_level BETWEEN 1 AND 12);

-- 3.4 Course Modules Table
CREATE TABLE IF NOT EXISTS public.course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    module_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.5 Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    lesson_type VARCHAR(50) DEFAULT 'video' CHECK (lesson_type IN ('video', 'pdf', 'text', 'quiz', 'assignment')),
    video_url TEXT,
    content TEXT,
    file_url TEXT,
    lesson_order INTEGER NOT NULL DEFAULT 1,
    duration_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.6 Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    CONSTRAINT unique_student_course_enrollment UNIQUE (student_id, course_id)
);

-- 3.7 Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    video_position_seconds INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    CONSTRAINT unique_student_lesson_progress UNIQUE (student_id, lesson_id)
);

-- 3.8 Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.course_modules(id) ON DELETE SET NULL,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    max_score INTEGER NOT NULL DEFAULT 100,
    attachment_url TEXT,
    submission_type VARCHAR(50) DEFAULT 'file_or_text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.9 Assignment Submissions Table
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_url TEXT,
    content TEXT,
    score INTEGER CHECK (score >= 0),
    feedback TEXT,
    status VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'resubmit')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    graded_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_student_assignment_submission UNIQUE (assignment_id, student_id)
);

-- 3.10 Quizzes Table
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.course_modules(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit_minutes INTEGER DEFAULT 30,
    passing_score INTEGER DEFAULT 70,
    max_attempts INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.11 Quiz Questions Table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')),
    points INTEGER DEFAULT 10,
    question_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.12 Quiz Answers Table
CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false
);

-- 3.13 Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    total_points INTEGER DEFAULT 100,
    is_passed BOOLEAN DEFAULT false,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 3.14 Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    certificate_url TEXT,
    CONSTRAINT unique_student_course_certificate UNIQUE (student_id, course_id)
);

-- 3.15 Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE, -- NULL if global school announcement
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_global BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.16 Messaging: Conversations & Messages
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.conversation_members (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3.17 Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(30) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    CONSTRAINT unique_attendance_record UNIQUE (course_id, student_id, session_date)
);

-- ==============================================================================
-- 4. DATABASE INDEXES FOR OPTIMAL PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_teacher ON public.courses(teacher_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_student ON public.lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_course ON public.assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON public.assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON public.assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_course ON public.quizzes(course_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);

-- ==============================================================================
-- 5. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        username,
        email,
        role,
        avatar_url,
        member_id,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/bottts/svg?seed=' || NEW.id),
        COALESCE(NEW.raw_user_meta_data->>'member_id', 'WEX-' || SUBSTRING(NEW.id::text, 1, 6)),
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for auto updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_courses_updated_at ON public.courses;
CREATE TRIGGER set_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS VARCHAR AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 6.1 Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins have full profile access"
    ON public.profiles FOR ALL USING (public.current_user_role() = 'admin');

-- 6.2 Categories Policies
CREATE POLICY "Categories viewable by all"
    ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL USING (public.current_user_role() = 'admin');

-- 6.3 Courses Policies
CREATE POLICY "Published courses viewable by all"
    ON public.courses FOR SELECT
    USING (status = 'published' OR teacher_id = auth.uid() OR public.current_user_role() IN ('admin', 'management'));

CREATE POLICY "Teachers can insert and manage their courses"
    ON public.courses FOR ALL
    USING (teacher_id = auth.uid() OR public.current_user_role() = 'admin');

-- 6.4 Modules & Lessons Policies
CREATE POLICY "Modules viewable if course is accessible"
    ON public.course_modules FOR SELECT USING (true);

CREATE POLICY "Teachers can manage their course modules"
    ON public.course_modules FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.courses
            WHERE courses.id = course_modules.course_id
            AND (courses.teacher_id = auth.uid() OR public.current_user_role() = 'admin')
        )
    );

CREATE POLICY "Lessons viewable by enrolled students, teachers, and admins"
    ON public.lessons FOR SELECT USING (true);

CREATE POLICY "Teachers can manage lessons for their courses"
    ON public.lessons FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.course_modules
            JOIN public.courses ON courses.id = course_modules.course_id
            WHERE course_modules.id = lessons.module_id
            AND (courses.teacher_id = auth.uid() OR public.current_user_role() = 'admin')
        )
    );

-- 6.5 Enrollments Policies
CREATE POLICY "Students can see their enrollments"
    ON public.enrollments FOR SELECT
    USING (
        student_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM public.courses 
            WHERE courses.id = enrollments.course_id 
            AND courses.teacher_id = auth.uid()
        )
        OR public.current_user_role() IN ('admin', 'management')
    );

CREATE POLICY "Students can enroll themselves"
    ON public.enrollments FOR INSERT
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students or teachers can update progress"
    ON public.enrollments FOR UPDATE
    USING (
        student_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM public.courses 
            WHERE courses.id = enrollments.course_id 
            AND courses.teacher_id = auth.uid()
        )
        OR public.current_user_role() = 'admin'
    );

-- 6.6 Lesson Progress Policies
CREATE POLICY "Students manage their own lesson progress"
    ON public.lesson_progress FOR ALL
    USING (student_id = auth.uid() OR public.current_user_role() = 'admin');

-- 6.7 Assignments Policies
CREATE POLICY "Assignments viewable by enrolled or teachers"
    ON public.assignments FOR SELECT USING (true);

CREATE POLICY "Teachers can manage course assignments"
    ON public.assignments FOR ALL
    USING (teacher_id = auth.uid() OR public.current_user_role() = 'admin');

-- 6.8 Assignment Submissions Policies
CREATE POLICY "Students see own submissions, teachers see course submissions"
    ON public.assignment_submissions FOR SELECT
    USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.assignments
            WHERE assignments.id = assignment_submissions.assignment_id
            AND (assignments.teacher_id = auth.uid() OR public.current_user_role() = 'admin')
        )
    );

CREATE POLICY "Students can submit assignments"
    ON public.assignment_submissions FOR INSERT
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers can grade assignments"
    ON public.assignment_submissions FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.assignments
            WHERE assignments.id = assignment_submissions.assignment_id
            AND (assignments.teacher_id = auth.uid() OR public.current_user_role() = 'admin')
        )
    );

-- 6.9 Quizzes & Quiz Questions Policies
CREATE POLICY "Quizzes viewable by all"
    ON public.quizzes FOR SELECT USING (true);

CREATE POLICY "Teachers manage quizzes"
    ON public.quizzes FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.courses
            WHERE courses.id = quizzes.course_id
            AND (courses.teacher_id = auth.uid() OR public.current_user_role() = 'admin')
        )
    );

CREATE POLICY "Quiz questions viewable by authenticated users"
    ON public.quiz_questions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Quiz answers checkable by system"
    ON public.quiz_answers FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Students manage own quiz attempts"
    ON public.quiz_attempts FOR ALL
    USING (student_id = auth.uid() OR public.current_user_role() IN ('admin', 'teacher'));

-- 6.10 Certificates Policies
CREATE POLICY "Certificates viewable by recipient, teacher, and public verification"
    ON public.certificates FOR SELECT USING (true);

CREATE POLICY "System/Admin issues certificates"
    ON public.certificates FOR INSERT
    WITH CHECK (public.current_user_role() IN ('admin', 'teacher') OR student_id = auth.uid());

-- 6.11 Announcements Policies
CREATE POLICY "Announcements viewable by everyone"
    ON public.announcements FOR SELECT USING (true);

CREATE POLICY "Teachers and admins can post announcements"
    ON public.announcements FOR INSERT
    WITH CHECK (public.current_user_role() IN ('admin', 'teacher'));

-- ==============================================================================
-- 7. SUPABASE STORAGE BUCKETS SETUP
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('avatars', 'avatars', true, NULL, NULL),
    ('course-thumbnails', 'course-thumbnails', true, NULL, NULL),
    ('course-materials', 'course-materials', false, NULL, NULL),
    ('lesson-videos', 'lesson-videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
    ('assignment-submissions', 'assignment-submissions', false, NULL, NULL),
    ('certificates', 'certificates', true, NULL, NULL),
    ('message-attachments', 'message-attachments', false, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

UPDATE storage.buckets
SET public = true,
    file_size_limit = 104857600,
    allowed_mime_types = ARRAY['video/mp4', 'video/webm', 'video/quicktime']
WHERE id = 'lesson-videos';

-- Public read for avatars, course-thumbnails, certificates
CREATE POLICY "Public read for thumbnails" ON storage.objects
    FOR SELECT USING (bucket_id IN ('avatars', 'course-thumbnails', 'certificates', 'lesson-videos'));

CREATE POLICY "Teachers upload lesson videos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'lesson-videos'
        AND auth.role() = 'authenticated'
        AND public.current_user_role() IN ('teacher', 'admin')
    );

-- Authenticated upload for avatars and submissions
CREATE POLICY "User upload avatars" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Student upload submissions" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'assignment-submissions' AND auth.role() = 'authenticated');

CREATE POLICY "Student and Teacher view submissions" ON storage.objects
    FOR SELECT USING (bucket_id = 'assignment-submissions' AND auth.role() = 'authenticated');
