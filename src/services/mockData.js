// ==============================================================================
// WExSEE E-School — Initial Demo & Mock State
// ==============================================================================

export const INITIAL_USERS = [
  {
    id: 'user-student-01',
    full_name: 'Ung Pengseng',
    username: 'pengseng',
    email: 'student@wexsee.edu',
    phone: '+62 812 3456 7890',
    date_of_birth: '2004-05-14',
    gender: 'Male',
    country: 'Indonesia',
    member_id: 'WEX-2026-0089',
    role: 'student',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Computer Science student passionate about competitive gaming and full-stack cloud engineering.',
  },
  {
    id: 'user-teacher-01',
    full_name: 'Silacellilynn (Ung Peng Seng)',
    username: 'silacellilynn',
    email: 'teacher@wexsee.edu',
    phone: '+62 811 9876 5432',
    date_of_birth: '1992-08-20',
    gender: 'Male',
    country: 'Indonesia',
    member_id: 'WEX-TCH-0012',
    role: 'teacher',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Lead Full-Stack Instructor and Esports Technology Strategist at WExSEE.',
  },
  {
    id: 'user-admin-01',
    full_name: 'WExSEE Headmaster',
    username: 'admin_wexsee',
    email: 'admin@wexsee.edu',
    phone: '+62 813 1122 3344',
    date_of_birth: '1988-03-12',
    gender: 'Female',
    country: 'Singapore',
    member_id: 'WEX-ADM-0001',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    bio: 'System Administrator with overall platform governance.',
  },
  {
    id: 'user-mgmt-01',
    full_name: 'Elena Rostova',
    username: 'management_elena',
    email: 'management@wexsee.edu',
    phone: '+62 819 5566 7788',
    date_of_birth: '1990-11-05',
    gender: 'Female',
    country: 'Indonesia',
    member_id: 'WEX-MGT-0004',
    role: 'management',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    bio: 'WExSEE Organization Executive Director and Academic Oversight.',
  }
]

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Web & Mobile Development', slug: 'web-development', icon: 'Code', description: 'Full-stack web, React, APIs, and modern app architecture' },
  { id: 'cat-2', name: 'AI & Data Engineering', slug: 'ai-data', icon: 'Cpu', description: 'Machine learning, generative AI, and intelligent systems' },
  { id: 'cat-3', name: 'Esports & Gaming Operations', slug: 'esports', icon: 'Gamepad2', description: 'Competitive coaching, event ops, and team leadership' },
  { id: 'cat-4', name: 'Cloud & Database Systems', slug: 'cloud-db', icon: 'Database', description: 'PostgreSQL, Supabase architecture, and DevOps' },
  { id: 'cat-5', name: 'Leadership & Community', slug: 'leadership', icon: 'Users', description: 'Professional collaboration and community growth' },
]

export const INITIAL_COURSES = [
  {
    id: 'course-1',
    title: 'Full-Stack Web Development with React & Supabase',
    course_code: 'WEX-WEB-101',
    description: 'Master modern web applications from scratch. Build robust, production-ready full-stack applications with React, Tailwind CSS, Supabase PostgreSQL, Authentication, and Cloud Storage.',
    thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category_id: 'cat-1',
    category_name: 'Web & Mobile Development',
    teacher_id: 'user-teacher-01',
    teacher_name: 'Silacellilynn (Ung Peng Seng)',
    difficulty: 'Beginner',
    duration_weeks: 10,
    language: 'English',
    status: 'published',
    is_free: true,
    price: 0,
    rating: 4.9,
    reviews_count: 128,
    enrolled_count: 342,
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Modern React & Component Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-1',
            title: 'Lesson 1: Introduction to React & Component Thinking',
            lesson_type: 'video',
            duration_minutes: 18,
            video_url: 'https://www.youtube.com/embed/SqcY0GlETPk',
            content: `### Welcome to Modern React Architecture
In this foundational lesson, we explore how React breaks down complex web interfaces into modular, state-driven components.

#### Key Principles:
- **Declarative Programming:** Tell React what the UI should look like for a given state.
- **Virtual DOM:** Efficient diffing algorithm that optimizes real DOM tree updates.
- **Composition over Inheritance:** Compose reusable buttons, cards, and navigation bars seamlessly.`,
          },
          {
            id: 'les-2',
            title: 'Lesson 2: State Management & React Hooks',
            lesson_type: 'video',
            duration_minutes: 24,
            video_url: 'https://www.youtube.com/embed/O6P86uwfdR0',
            content: `### Deep Dive into React Hooks
Hooks allow you to use state and other React features without writing class components.

#### Essential Hooks:
- \`useState\`: Local component state
- \`useEffect\`: Side effects, lifecycle triggers, API synchronization
- \`useMemo\` and \`useCallback\`: Computational memoization and reference stability`,
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Supabase Backend & Database Mastery',
        order: 2,
        lessons: [
          {
            id: 'les-3',
            title: 'Lesson 3: Supabase Architecture & PostgreSQL Tables',
            lesson_type: 'video',
            duration_minutes: 28,
            video_url: 'https://www.youtube.com/embed/rP1Zq1x4j5c',
            content: `### Relational Database Engineering with Supabase
Supabase provides the power of PostgreSQL combined with instant REST & Realtime APIs.

#### In this module:
- Setting up PostgreSQL tables and foreign keys
- Enforcing Row Level Security (RLS)
- Realtime WebSocket updates for live messaging`,
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Competitive Esports Strategy & Team Management',
    course_code: 'WEX-ESP-201',
    description: 'Learn the tactical frameworks, mental performance coaching, team communication drills, and tournament analytics used by world-class esports organizations.',
    thumbnail_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    category_id: 'cat-3',
    category_name: 'Esports & Gaming Operations',
    teacher_id: 'user-teacher-01',
    teacher_name: 'Silacellilynn (Ung Peng Seng)',
    difficulty: 'Intermediate',
    duration_weeks: 8,
    language: 'English',
    status: 'published',
    is_free: true,
    price: 0,
    rating: 4.8,
    reviews_count: 94,
    enrolled_count: 215,
    modules: [
      {
        id: 'mod-21',
        title: 'Module 1: Competitive Fundamentals & Team Synergy',
        order: 1,
        lessons: [
          {
            id: 'les-21',
            title: 'Lesson 1: In-Game Leader (IGL) Tactics & Playbooks',
            lesson_type: 'video',
            duration_minutes: 22,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Strategic decision making under pressure and shot-calling communication hierarchy.',
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Applied AI & Autonomous Agent Engineering',
    course_code: 'WEX-AI-301',
    description: 'Build real-world generative AI workflows, vector search embeddings, semantic retrieval systems, and prompt engineering protocols.',
    thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    category_id: 'cat-2',
    category_name: 'AI & Data Engineering',
    teacher_id: 'user-teacher-01',
    teacher_name: 'Silacellilynn (Ung Peng Seng)',
    difficulty: 'Advanced',
    duration_weeks: 12,
    language: 'English',
    status: 'published',
    is_free: true,
    price: 0,
    rating: 4.95,
    reviews_count: 88,
    enrolled_count: 180,
    modules: []
  }
]

export const INITIAL_ENROLLMENTS = [
  {
    id: 'enr-1',
    student_id: 'user-student-01',
    course_id: 'course-1',
    progress: 67,
    status: 'active',
    enrolled_at: '2026-09-15T08:00:00Z',
    completed_lessons: ['les-1', 'les-2'],
  },
  {
    id: 'enr-2',
    student_id: 'user-student-01',
    course_id: 'course-2',
    progress: 100,
    status: 'completed',
    enrolled_at: '2026-08-01T08:00:00Z',
    completed_lessons: ['les-21'],
  }
]

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-1',
    course_id: 'course-1',
    course_title: 'Full-Stack Web Development with React & Supabase',
    title: 'Assignment 1: Build a Responsive Component Library',
    description: 'Develop a set of reusable UI components (Button, Modal, StatCard) using React and Tailwind CSS matching the WExSEE dark & gold luxury design system. Include GitHub repo URL and live preview.',
    deadline: '2026-10-25T23:59:00Z',
    max_score: 100,
    submission_type: 'file_or_text',
    submissions: [
      {
        id: 'sub-1',
        student_id: 'user-student-01',
        student_name: 'Ung Pengseng',
        student_email: 'student@wexsee.edu',
        content: 'Completed the component library with React 19 and Tailwind CSS v4! GitHub Repo: https://github.com/wexsee/ui-components Live Demo: https://wexsee-ui.vercel.app',
        file_url: 'https://wexsee-eschool.storage/assignments/ung-pengseng-hw1.pdf',
        submitted_at: '2026-10-08T14:30:00Z',
        score: 95,
        feedback: 'Outstanding work Pengseng! Clean component isolation, excellent color contrast, and proper accessibility semantics.',
        status: 'graded'
      }
    ]
  },
  {
    id: 'asg-2',
    course_id: 'course-1',
    course_title: 'Full-Stack Web Development with React & Supabase',
    title: 'Assignment 2: PostgreSQL Schema & Supabase RLS Policies',
    description: 'Design a normalized database schema with at least 5 tables, foreign key constraints, and 3 custom Row Level Security policies. Submit your SQL migration script.',
    deadline: '2026-11-05T23:59:00Z',
    max_score: 100,
    submission_type: 'file_or_text',
    submissions: []
  }
]

export const INITIAL_QUIZZES = [
  {
    id: 'quiz-1',
    course_id: 'course-1',
    course_title: 'Full-Stack Web Development with React & Supabase',
    title: 'React & Supabase Architecture Knowledge Check',
    description: 'Assess your foundational understanding of component lifecycles, hooks, and Supabase RLS policies.',
    time_limit_minutes: 15,
    passing_score: 70,
    max_attempts: 3,
    questions: [
      {
        id: 'q-1',
        question: 'What is React?',
        type: 'multiple_choice',
        points: 25,
        options: [
          { text: 'A relational database engine', is_correct: false },
          { text: 'A declarative JavaScript library for building user interfaces', is_correct: true },
          { text: 'A server operating system distribution', is_correct: false },
          { text: 'A CSS preprocessor compiler', is_correct: false }
        ]
      },
      {
        id: 'q-2',
        question: 'Which technology directly powers the Supabase database backend?',
        type: 'multiple_choice',
        points: 25,
        options: [
          { text: 'MongoDB', is_correct: false },
          { text: 'PostgreSQL', is_correct: true },
          { text: 'Redis Key-Value Cache', is_correct: false },
          { text: 'Apache Cassandra', is_correct: false }
        ]
      },
      {
        id: 'q-3',
        question: 'What does RLS stand for in Supabase PostgreSQL security?',
        type: 'multiple_choice',
        points: 25,
        options: [
          { text: 'Row Level Security', is_correct: true },
          { text: 'Remote Linux Service', is_correct: false },
          { text: 'Realtime Loop Synchronization', is_correct: false },
          { text: 'Recursive Layout Schema', is_correct: false }
        ]
      },
      {
        id: 'q-4',
        question: 'Which React hook is primarily utilized for local state management within a functional component?',
        type: 'multiple_choice',
        points: 25,
        options: [
          { text: 'useEffect', is_correct: false },
          { text: 'useState', is_correct: true },
          { text: 'useContext', is_correct: false },
          { text: 'useCallback', is_correct: false }
        ]
      }
    ],
    attempts: [
      {
        id: 'att-1',
        student_id: 'user-student-01',
        score: 100,
        is_passed: true,
        completed_at: '2026-10-07T10:15:00Z'
      }
    ]
  }
]

export const INITIAL_CERTIFICATES = [
  {
    id: 'cert-1',
    student_id: 'user-student-01',
    student_name: 'UNG PENGSENG',
    course_id: 'course-2',
    course_title: 'Competitive Esports Strategy & Team Management',
    certificate_number: 'WEX-2026-000001',
    issued_at: '2026-10-05T09:00:00Z',
    teacher_name: 'Silacellilynn (Ung Peng Seng)',
    authorized_by: 'WExSEE Academic Board'
  }
]

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: '🏆 Welcome to WExSEE E-School 2026 Term!',
    content: 'Welcome students, coaches, and instructors to our upgraded digital learning management system! Explore new courses in Web Development, Esports Operations, and Artificial Intelligence.',
    author_name: 'Super Admin',
    created_at: '2026-10-01T08:00:00Z',
    is_global: true
  },
  {
    id: 'ann-2',
    title: 'Web Programming Midterm Schedule Notice',
    content: 'The Web Programming Midterm Examination will commence on 20 October 2026 at 7:00 PM WIB. Make sure to complete all Module 1 & 2 lessons before taking the exam.',
    author_name: 'Silacellilynn (Ung Peng Seng)',
    created_at: '2026-10-06T11:30:00Z',
    is_global: false
  }
]
