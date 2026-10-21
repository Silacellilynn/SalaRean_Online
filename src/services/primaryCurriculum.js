export const PRIMARY_SUBJECTS = [
  'Khmer Language',
  'Mathematics',
  'Physics',
  'Chemistry',
  'History',
  'Geometry',
  'Science',
  'Social Communication',
  'English',
  'Chinese',
  'STEM',
  'Computer Class',
  'Others'
]

const subjectLessons = {
  'Khmer Language': {
    lessons: [
      ['Khmer letters and sounds', 'Learn to recognize Khmer consonants such as ក (k), ខ (kh), and គ (k), and the vowel អា (aa). Combine a consonant and vowel to read a simple syllable such as កា (kaa).'],
      ['Everyday Khmer words', 'Read and say familiar Khmer words such as សួស្តី (hello) and សាលា (school). Build a short sentence by putting a person, an action, and an object together.']
    ],
    questions: [
      ['What do we combine to read a simple Khmer syllable?', 'A consonant and a vowel', 'Two numbers', 'A picture and a color'],
      ['Which is a good way to practice a new Khmer word?', 'Say it, read it, and use it in a short sentence', 'Skip the sound and guess', 'Write unrelated letters'],
      ['What can a simple sentence tell us?', 'A complete idea', 'Only a color', 'Only a number']
    ]
  },
  Mathematics: {
    lessons: [
      ['Counting and number bonds', 'Count objects one by one. Make numbers in different ways: for example, 5 is 2 and 3. Grade 1 practices numbers to 20; Grade 2 extends counting and number bonds to 100.'],
      ['Add and subtract', 'Join groups to add and take away objects to subtract. Draw dots or use counters to show how you found the answer.']
    ],
    questions: [
      ['There are 4 birds and 3 more arrive. How many birds are there?', '7', '1', '12'],
      ['What does subtraction help us find?', 'How many are left after taking some away', 'The color of an object', 'The name of a shape'],
      ['Which number sentence makes 8?', '5 + 3 = 8', '5 + 3 = 6', '5 - 3 = 8']
    ]
  },
  Physics: {
    lessons: [
      ['Pushes, pulls, and movement', 'A push or a pull is a force. A gentle push can move a toy car; a stronger push can make it travel farther. Observe what changes when you use a different force.'],
      ['Light, sound, and heat around us', 'Light helps us see, sound travels to our ears, and heat can make things warmer. Notice safe examples at home or school and describe what you observe.']
    ],
    questions: [
      ['What can make a toy car start moving?', 'A push or a pull', 'A quiet color', 'A written word'],
      ['Which sense helps us notice a sound?', 'Hearing', 'Taste', 'Smell'],
      ['What may a stronger push do to a toy car?', 'Help it travel farther', 'Turn it into water', 'Make it disappear']
    ]
  },
  Chemistry: {
    lessons: [
      ['Materials around us', 'Objects are made from materials such as wood, metal, plastic, and paper. Describe each material by how it looks and feels, and choose a material for a simple object.'],
      ['Solids and liquids', 'A solid keeps its own shape. A liquid flows and takes the shape of its container. Compare safe examples such as a block and water with an adult.']
    ],
    questions: [
      ['Which is a liquid?', 'Water', 'A wooden block', 'A book'],
      ['What does a liquid do in a cup?', 'Takes the shape of the cup', 'Keeps a fixed block shape', 'Turns into paper'],
      ['Which material is often used to make a window?', 'Glass', 'Cotton candy', 'Sandwich']
    ]
  },
  History: {
    lessons: [
      ['Then and now', 'History helps us learn about the past. Put events in order using yesterday, today, and tomorrow, and ask a family member about a memory from long ago.'],
      ['People and places in our past', 'Stories, photographs, objects, and old buildings can teach us about people who lived before us. Treat family and community stories with care and respect.']
    ],
    questions: [
      ['Which word tells us about time before today?', 'Yesterday', 'Tomorrow', 'Next year'],
      ['What can a photograph from long ago help us learn about?', 'The past', 'A future dream only', 'A math answer'],
      ['How should we listen to a family history story?', 'With care and respect', 'By interrupting', 'Without paying attention']
    ]
  },
  Geometry: {
    lessons: [
      ['Recognizing flat shapes', 'Find circles, triangles, squares, and rectangles around you. Count their sides and corners; a circle has no straight sides or corners.'],
      ['Shapes, position, and patterns', 'Describe where objects are using words such as above, below, beside, and between. Make a repeating pattern with shapes and explain what comes next.']
    ],
    questions: [
      ['How many corners does a triangle have?', '3', '4', '0'],
      ['Which shape has no corners?', 'Circle', 'Square', 'Triangle'],
      ['If a red-blue pattern repeats, what follows blue?', 'Red', 'Green every time', 'Nothing can follow']
    ]
  },
  Science: {
    lessons: [
      ['Living and non-living things', 'Living things need resources such as water and air and can grow. Compare a plant, an animal, and a toy, and describe how they are alike or different.'],
      ['Plants and their needs', 'Plants need water, light, air, and room to grow. Observe a plant over time and draw what changes; never taste an unknown plant.']
    ],
    questions: [
      ['Which one is a living thing?', 'A growing plant', 'A plastic cup', 'A stone'],
      ['What helps a plant grow?', 'Water and light', 'A plastic toy', 'No air at all'],
      ['What is a safe way to study a plant?', 'Observe and draw it', 'Taste an unknown leaf', 'Pull it apart']
    ]
  },
  'Social Communication': {
    lessons: [
      ['Listening and taking turns', 'Good conversations include listening, waiting for a turn, and looking toward the speaker when comfortable. Practice asking a kind question about what someone said.'],
      ['Kind words and clear messages', 'Use a calm voice and respectful words to share an idea or ask for help. If a message is unclear, ask the person to explain it again.']
    ],
    questions: [
      ['What should you do while a classmate is speaking?', 'Listen and wait for your turn', 'Shout over them', 'Walk away every time'],
      ['What can you say when you need help?', 'Could you please help me?', 'Go away now!', 'Nothing, even when it is unsafe'],
      ['What can you do if you do not understand?', 'Ask politely for an explanation', 'Guess and blame someone', 'Stop listening forever']
    ]
  },
  English: {
    lessons: [
      ['Letters, sounds, and simple words', 'Practice the sounds of English letters and blend them to read short words. Grade 1 starts with familiar three-letter words; Grade 2 reads longer words and simple sentences.'],
      ['Read a sentence for meaning', 'Read a short sentence, find who or what it is about, and tell what happened. Use a picture or context clue when a word is new.']
    ],
    questions: [
      ['Which word names an animal?', 'cat', 'blue', 'run'],
      ['In "The dog runs", who runs?', 'The dog', 'The book', 'The color'],
      ['What can a picture help a reader do?', 'Understand a new word or idea', 'Change every letter', 'Count without looking']
    ]
  },
  Chinese: {
    lessons: [
      ['Chinese greetings and tones', 'Practice a friendly greeting such as 你好 (nǐ hǎo, hello). Listen carefully to tones and repeat slowly with a teacher or audio model.'],
      ['Numbers and classroom words', 'Learn simple number words and familiar classroom vocabulary. Match each spoken word to a number or object and practice saying it clearly.']
    ],
    questions: [
      ['What does 你好 (nǐ hǎo) mean?', 'Hello', 'Good night', 'Thank you'],
      ['What should you listen for when practicing spoken Chinese?', 'The tones', 'The paper color', 'The page number only'],
      ['What is a helpful way to learn a new classroom word?', 'Match the spoken word to an object', 'Ignore how it sounds', 'Mix it with an unrelated number']
    ]
  },
  STEM: {
    lessons: [
      ['Plan and build a paper bridge', 'Ask how a bridge can hold small objects. Sketch an idea, fold paper to make a beam, test it with safe light objects, and improve the design.'],
      ['Explore patterns with simple technology', 'Notice how a device follows instructions. Make a step-by-step plan for sorting classroom objects, test the steps, and change one step if the result is not right.']
    ],
    questions: [
      ['What should you do after testing a bridge design?', 'Notice what happened and improve it', 'Hide the result', 'Stop thinking about the design'],
      ['What is an algorithm?', 'A set of steps to do a task', 'A kind of paper', 'A bridge material'],
      ['Why do we test a design?', 'To learn what works and what to improve', 'To avoid observing', 'To make the task confusing']
    ]
  },
  'Computer Class': {
    lessons: [
      ['Computer parts and safe care', 'Identify a screen, keyboard, mouse, and speakers. Use clean, dry hands, carry devices carefully, and ask an adult before opening or changing settings.'],
      ['Input, output, and simple instructions', 'A keyboard and mouse send input; a screen and speakers provide output. Practice giving a computer a clear, simple instruction with a teacher.']
    ],
    questions: [
      ['Which part is commonly used to type letters?', 'Keyboard', 'Speaker', 'Screen'],
      ['Which is an output from a computer?', 'A picture shown on the screen', 'A key press going in', 'A mouse click going in'],
      ['What should you do before changing a device setting?', 'Ask a teacher or trusted adult', 'Pour water on it', 'Open the device']
    ]
  },
  Others: {
    lessons: [
      ['Explore a topic together', 'Choose a classroom or community topic with your teacher. Say what you already know, look at a safe learning resource, and share one new fact.'],
      ['Show what you learned', 'Draw, explain, or demonstrate one idea from your chosen topic. Practice giving your work a title and describing it in a clear sentence.']
    ],
    questions: [
      ['Who can help you choose a safe class topic?', 'Your teacher', 'A stranger asking for private details', 'No one'],
      ['What is a good way to share a new idea?', 'Explain it clearly or draw it', 'Hide it from everyone', 'Use only unrelated words'],
      ['What should you do if a learning resource seems unsafe?', 'Stop and tell a trusted adult', 'Share private information', 'Ignore all safety rules']
    ]
  }
}

function classSlug(subject) {
  return subject.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const GRADE_BANDS = [
  { first: 1, last: 3, name: 'early foundations', activity: 'Use pictures, objects, or a worked example. Explain your idea aloud and try one similar practice question.' },
  { first: 4, last: 6, name: 'upper primary', activity: 'Show your steps, use subject vocabulary, and compare two examples to explain a pattern.' },
  { first: 7, last: 9, name: 'lower secondary', activity: 'Apply the idea to a new example, record your reasoning, and check whether the evidence supports your answer.' },
  { first: 10, last: 12, name: 'upper secondary', activity: 'Analyze a more complex example, justify your method with evidence, and note one limitation or alternative explanation.' }
]

const SUBJECT_GRADE_FOCUS = {
  'Khmer Language': [
    'Read familiar words and write short phrases using letter-sound patterns.',
    'Read paragraphs, build vocabulary, and write organized descriptions.',
    'Interpret different texts and write clear summaries using evidence.',
    'Analyze literary and informational texts and develop structured, supported writing.'
  ],
  Mathematics: [
    'Build number sense and solve addition, subtraction, and simple measurement problems.',
    'Use multiplication, division, fractions, decimals, and measurement in multi-step problems.',
    'Explore ratios, integers, algebraic expressions, statistics, and proportional reasoning.',
    'Apply algebra, functions, geometry, probability, and quantitative reasoning to complex problems.'
  ],
  Physics: [
    'Observe pushes, pulls, light, sound, and everyday motion.',
    'Measure motion and compare simple forces, energy, and circuits.',
    'Use models and measurements to investigate motion, forces, waves, and energy transfer.',
    'Analyze mechanics, electricity, waves, and energy with equations, data, and scientific models.'
  ],
  Chemistry: [
    'Sort everyday materials and observe solids, liquids, and changes.',
    'Compare material properties and describe simple reversible changes.',
    'Model particles, mixtures, reactions, and conservation of matter.',
    'Use atomic structure, bonding, reaction equations, and quantitative evidence to explain chemical change.'
  ],
  History: [
    'Sequence events and learn about family, community, and the past.',
    'Compare sources and describe how people and places changed over time.',
    'Examine historical sources, causes, consequences, and different perspectives.',
    'Evaluate primary and secondary evidence and build an argument about historical change and continuity.'
  ],
  Geometry: [
    'Recognize shapes, count sides and corners, and describe positions.',
    'Classify polygons and measure angles, lengths, and area.',
    'Explore transformations, congruence, similarity, and coordinate geometry.',
    'Construct geometric proofs and apply trigonometry, vectors, and spatial reasoning.'
  ],
  Science: [
    'Observe living things, materials, weather, and the environment.',
    'Investigate ecosystems, life cycles, matter, and simple experiments.',
    'Plan investigations and explain patterns in biology, earth, and physical science.',
    'Evaluate scientific data and models in biology, ecology, earth, and environmental science.'
  ],
  'Social Communication': [
    'Practice listening, taking turns, and sharing ideas respectfully.',
    'Summarize a speaker’s message and communicate clearly in a group.',
    'Adapt communication to audience and purpose and resolve disagreement respectfully.',
    'Evaluate communication choices, collaborate across viewpoints, and present evidence-based ideas.'
  ],
  English: [
    'Practice letter sounds, familiar words, and short sentences.',
    'Read short passages, grow vocabulary, and write organized paragraphs.',
    'Interpret fiction and nonfiction and develop paragraphs with evidence.',
    'Analyze complex texts and produce clear, well-supported academic writing.'
  ],
  Chinese: [
    'Practice greetings, tones, numbers, and familiar classroom words.',
    'Build vocabulary and read and write simple characters and sentences.',
    'Use vocabulary and sentence patterns to understand short conversations and passages.',
    'Interpret longer texts and communicate ideas using appropriate vocabulary and sentence structures.'
  ],
  STEM: [
    'Ask a question, plan a simple build, test it, and improve the design.',
    'Use measurements, simple data, and a repeatable process to solve a design problem.',
    'Design and test a prototype, interpret results, and improve it using evidence.',
    'Define constraints, compare design trade-offs, analyze data, and justify an engineered solution.'
  ],
  'Computer Class': [
    'Identify computer parts and practice safe, simple instructions.',
    'Organize files, use basic applications, and understand input and output.',
    'Use digital tools, computational thinking, and online safety practices.',
    'Evaluate digital systems, data, privacy, and computational solutions responsibly.'
  ],
  Others: [
    'Explore a teacher-approved topic and share one new fact.',
    'Gather information from trusted sources and explain key ideas.',
    'Compare sources and present a reasoned explanation of the topic.',
    'Synthesize credible sources and present a supported analysis of the topic.'
  ]
}

export function createPrimaryClasses() {
  return PRIMARY_SUBJECTS.flatMap((subject) => Array.from({ length: 12 }, (_, index) => index + 1).map((grade) => {
    const slug = classSlug(subject)
    const syllabus = subjectLessons[subject]
    const gradeBand = GRADE_BANDS.find(band => grade >= band.first && grade <= band.last)
    const courseId = `primary-${slug}-grade-${grade}`

    return {
      id: courseId,
      title: `${subject} - Grade ${grade}`,
      primary_subject: subject,
      grade_level: grade,
      course_code: `G${grade}-${slug.toUpperCase().replace(/-/g, '').slice(0, 8)}`,
      description: subject === 'STEM'
        ? `A Grade ${grade} STEM (Science, Technology, Engineering, and Mathematics) class with lessons, activities, and a practice quiz.`
        : `A Grade ${grade} ${subject} class with lessons, activities, and a practice quiz.`,
      thumbnail_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
      category_name: 'School Classes',
      teacher_id: 'user-teacher-01',
      teacher_name: 'Silacellilynn (Ung Peng Seng)',
      difficulty: grade <= 3 ? 'Beginner' : grade <= 8 ? 'Intermediate' : 'Advanced',
      duration_weeks: 8,
      language: subject === 'Khmer Language' ? 'Khmer' : subject === 'Chinese' ? 'Chinese' : 'English',
      status: 'published',
      is_free: true,
      price: 0,
      enrolled_count: 0,
      rating: 5,
      reviews_count: 0,
      modules: [{
        id: `${courseId}-module-1`,
        title: `Grade ${grade}: ${subject} ${gradeBand.name}`,
        description: `Grade ${grade} focus: ${SUBJECT_GRADE_FOCUS[subject][GRADE_BANDS.indexOf(gradeBand)]}`,
        order: 1,
        lessons: syllabus.lessons.map(([title, content], index) => ({
          id: `${courseId}-lesson-${index + 1}`,
          title: `Lesson ${index + 1}: ${title}`,
          lesson_type: 'text',
          duration_minutes: 15,
          content: `${content}\n\nGrade ${grade} learning focus: ${SUBJECT_GRADE_FOCUS[subject][GRADE_BANDS.indexOf(gradeBand)]}\n\nGrade ${grade} activity: ${gradeBand.activity}`
        }))
      }]
    }
  }))
}

export const INITIAL_PRIMARY_CLASSES = createPrimaryClasses()

export const INITIAL_PRIMARY_QUIZZES = PRIMARY_SUBJECTS.flatMap((subject) => Array.from({ length: 12 }, (_, index) => index + 1).map((grade) => {
  const courseId = `primary-${classSlug(subject)}-grade-${grade}`
  const sourceQuestions = subject === 'Mathematics' && grade === 2
    ? [
        ['There are 14 birds and 13 more arrive. How many birds are there?', '27', '17', '31'],
        ...subjectLessons[subject].questions.slice(1, 2),
        ['Which number sentence makes 38?', '25 + 13 = 38', '25 + 13 = 36', '25 - 13 = 38']
      ]
    : subjectLessons[subject].questions
  const questions = sourceQuestions.map(([question, answer, distractorA, distractorB], index) => ({
    id: `${courseId}-q-${index + 1}`,
    question: grade > 2 && index === 0
      ? `Grade ${grade} application: ${question}`
      : question,
    points: 1,
    options: [
      { text: answer, is_correct: true },
      { text: distractorA, is_correct: false },
      { text: distractorB, is_correct: false }
    ]
  }))

  return {
    id: `${courseId}-quiz`,
    course_id: courseId,
    course_title: `${subject} - Grade ${grade}`,
    title: `${subject} - Grade ${grade} Practice Quiz`,
    description: `A Grade ${grade} knowledge check based on the ${subject} learning focus.`,
    time_limit_minutes: 10,
    passing_score: 60,
    max_attempts: 3,
    questions
  }
}))
