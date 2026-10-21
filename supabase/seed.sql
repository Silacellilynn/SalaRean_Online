-- ==============================================================================
-- WExSEE E-School — Database Seed Data Script
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, icon) VALUES
    ('11111111-1111-1111-1111-111111111101', 'Web & Mobile Development', 'web-development', 'Modern full-stack web and cross-platform mobile app development with React, Node, and Flutter.', 'Code'),
    ('11111111-1111-1111-1111-111111111102', 'Artificial Intelligence & Data', 'ai-data', 'Machine learning, generative AI integrations, Python data science, and neural networks.', 'Cpu'),
    ('11111111-1111-1111-1111-111111111103', 'Esports & Gaming Management', 'esports-management', 'Strategic coaching, tournament organization, brand partnerships, and competitive gaming management.', 'Gamepad2'),
    ('11111111-1111-1111-1111-111111111104', 'Cloud & Database Systems', 'cloud-database', 'PostgreSQL, Supabase, Cloud architecture, serverless APIs, and DevOps practices.', 'Database'),
    ('11111111-1111-1111-1111-111111111105', 'Leadership & Community', 'leadership', 'Team communication, agile project management, and WExSEE leadership excellence.', 'Users')
ON CONFLICT (id) DO NOTHING;

-- 2. Note on Demo Profiles:
-- In Supabase, profiles link to auth.users. For demo/preview or local dev seed, insert placeholder IDs:
-- Demo Teacher: 22222222-2222-2222-2222-222222222201
-- Demo Student: 33333333-3333-3333-3333-333333333301
-- Demo Admin:   44444444-4444-4444-4444-444444444401

-- 3. Insert Demo Courses
INSERT INTO public.courses (
    id, title, course_code, description, thumbnail_url, category_id,
    difficulty, duration_weeks, language, status, is_free, price, max_students
) VALUES
(
    'c0000001-0000-0000-0000-000000000001',
    'Full-Stack Web Development with React & Supabase',
    'WEX-WEB-101',
    'Master modern web development from fundamentals to production. Build high-performance scalable web applications using React, Tailwind CSS, Supabase backend, PostgreSQL, and secure authentication.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    '11111111-1111-1111-1111-111111111101',
    'beginner',
    10,
    'English',
    'published',
    true,
    0.00,
    1000
),
(
    'c0000001-0000-0000-0000-000000000002',
    'Competitive Esports Strategy & Team Management',
    'WEX-ESP-201',
    'Discover professional esports operational strategy, roster management, performance analytics, scrimmage analysis, and tournament operations.',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    '11111111-1111-1111-1111-111111111103',
    'intermediate',
    8,
    'English',
    'published',
    true,
    0.00,
    500
),
(
    'c0000001-0000-0000-0000-000000000003',
    'Applied Artificial Intelligence & Prompt Engineering',
    'WEX-AI-301',
    'Learn to integrate Large Language Models, build autonomous agent workflows, utilize embeddings, and design intelligent assistant solutions.',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    '11111111-1111-1111-1111-111111111102',
    'advanced',
    12,
    'English',
    'published',
    true,
    0.00,
    800
)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Modules for Course 1
INSERT INTO public.course_modules (id, course_id, title, description, module_order) VALUES
(
    'm0000001-0000-0000-0000-000000000001',
    'c0000001-0000-0000-0000-000000000001',
    'Module 1: Foundations of Modern Web & React',
    'Understand component architecture, JSX, hooks, and responsive design systems with Tailwind CSS.',
    1
),
(
    'm0000001-0000-0000-0000-000000000002',
    'Module 2: Supabase Architecture & Database Mastery',
    'Designing relational PostgreSQL tables, triggers, Row Level Security policies, and Realtime subscriptions.',
    2
),
(
    'm0000001-0000-0000-0000-000000000003',
    'Module 3: Full-Stack Integration & Production Deployment',
    'Building interactive dashboards, file upload storage buckets, and deploying to Vercel/Cloudflare.',
    3
)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Lessons
INSERT INTO public.lessons (id, module_id, title, description, lesson_type, video_url, content, lesson_order, duration_minutes) VALUES
(
    'l0000001-0000-0000-0000-000000000001',
    'm0000001-0000-0000-0000-000000000001',
    'Lesson 1: Introduction to React & Component Thinking',
    'Explore virtual DOM, declarative UI paradigms, and component modularity.',
    'video',
    'https://www.youtube.com/embed/SqcY0GlETPk',
    '# Welcome to React Fundamentals\n\nIn this lesson, we explore how React breaks down complex web interfaces into manageable, reusable lego blocks called components.\n\n### Key Takeaways:\n- Components are reusable UI functions\n- JSX provides expressive markup within JavaScript\n- Props allow unilateral data flow down the component hierarchy.',
    1,
    20
),
(
    'l0000001-0000-0000-0000-000000000002',
    'm0000001-0000-0000-0000-000000000001',
    'Lesson 2: State Management with React Hooks',
    'Deep dive into useState, useEffect, and custom hooks.',
    'video',
    'https://www.youtube.com/embed/O6P86uwfdR0',
    '# Understanding React State\n\nState is the heart of interactive client-side web apps. When state changes, React efficiently re-renders only the necessary parts of the DOM.',
    2,
    25
),
(
    'l0000001-0000-0000-0000-000000000003',
    'm0000001-0000-0000-0000-000000000002',
    'Lesson 3: Supabase PostgreSQL & Row Level Security',
    'Learn how Supabase wraps PostgreSQL with real-time capabilities and impenetrable RLS security.',
    'video',
    'https://www.youtube.com/embed/rP1Zq1x4j5c',
    '# Supabase Architecture Overview\n\nSupabase gives you a dedicated Postgres database, instant REST and Realtime APIs, Auth, and Storage with enterprise-grade row level security policies.',
    1,
    30
)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Sample Assignment
INSERT INTO public.assignments (id, course_id, module_id, title, description, deadline, max_score, submission_type) VALUES
(
    'a0000001-0000-0000-0000-000000000001',
    'c0000001-0000-0000-0000-000000000001',
    'm0000001-0000-0000-0000-000000000001',
    'Assignment 1: Build a Responsive Component Library',
    'Implement a set of 3 reusable UI components (Button, Modal, StatCard) using React and Tailwind CSS matching the WExSEE dark & gold luxury design language. Submit your GitHub repository URL and live demo link.',
    NOW() + INTERVAL '7 days',
    100,
    'file_or_text'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Sample Quiz
INSERT INTO public.quizzes (id, course_id, module_id, title, description, time_limit_minutes, passing_score, max_attempts) VALUES
(
    'q0000001-0000-0000-0000-000000000001',
    'c0000001-0000-0000-0000-000000000001',
    'm0000001-0000-0000-0000-000000000001',
    'React & Architecture Mastery Quiz',
    'Test your knowledge on React hooks, component lifecycle, and Supabase integration basics.',
    15,
    70,
    3
)
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Quiz Questions
INSERT INTO public.quiz_questions (id, quiz_id, question, question_type, points, question_order) VALUES
(
    'qq000001-0000-0000-0000-000000000001',
    'q0000001-0000-0000-0000-000000000001',
    'What is React?',
    'multiple_choice',
    25,
    1
),
(
    'qq000001-0000-0000-0000-000000000002',
    'q0000001-0000-0000-0000-000000000002',
    'Which technology powers the Supabase database backend?',
    'multiple_choice',
    25,
    2
),
(
    'qq000001-0000-0000-0000-000000000003',
    'q0000001-0000-0000-0000-000000000003',
    'What does RLS stand for in database security?',
    'multiple_choice',
    25,
    3
),
(
    'qq000001-0000-0000-0000-000000000004',
    'q0000001-0000-0000-0000-000000000004',
    'Which React hook is primarily used to manage internal state within a functional component?',
    'multiple_choice',
    25,
    4
)
ON CONFLICT (id) DO NOTHING;

-- 9. Insert Quiz Answers
INSERT INTO public.quiz_answers (question_id, answer_text, is_correct) VALUES
-- Q1
('qq000001-0000-0000-0000-000000000001', 'Database Engine', false),
('qq000001-0000-0000-0000-000000000001', 'JavaScript Library for building User Interfaces', true),
('qq000001-0000-0000-0000-000000000001', 'Desktop Operating System', false),
('qq000001-0000-0000-0000-000000000001', 'Low-level Compiler', false),
-- Q2
('qq000001-0000-0000-0000-000000000002', 'MongoDB', false),
('qq000001-0000-0000-0000-000000000002', 'PostgreSQL', true),
('qq000001-0000-0000-0000-000000000002', 'Redis', false),
('qq000001-0000-0000-0000-000000000002', 'Apache Cassandra', false),
-- Q3
('qq000001-0000-0000-0000-000000000003', 'Row Level Security', true),
('qq000001-0000-0000-0000-000000000003', 'Real-time Linked Synchronization', false),
('qq000001-0000-0000-0000-000000000003', 'Remote Linux Server', false),
('qq000001-0000-0000-0000-000000000003', 'Recursive Loop Syntax', false),
-- Q4
('qq000001-0000-0000-0000-000000000004', 'useEffect', false),
('qq000001-0000-0000-0000-000000000004', 'useState', true),
('qq000001-0000-0000-0000-000000000004', 'useContext', false),
('qq000001-0000-0000-0000-000000000004', 'useReducer', false);

-- 10. Insert Announcements
INSERT INTO public.announcements (id, title, content, is_global) VALUES
(
    'an000001-0000-0000-0000-000000000001',
    'Welcome to WExSEE E-School 2026 Academic Term!',
    'We are excited to welcome all students, teachers, and community members to the new semester! Check your dashboard for new course enrollments and live session schedules.',
    true
),
(
    'an000001-0000-0000-0000-000000000002',
    'Web Development Midterm Exam Announcement',
    'The Web Programming Midterm Examination will open next week. Please complete all lessons in Module 1 and Module 2 prior to starting.',
    false
)
ON CONFLICT (id) DO NOTHING;
