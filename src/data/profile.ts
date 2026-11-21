// Profile data shared by the About and Resume pages, so each fact is written once.
// Keep this in step with the PDF CV and resume.

export interface Entry {
  title: string;
  org?: string;
  when: string;
  points?: string[];
  upcoming?: boolean;
}

export const headline = 'Software Engineer | Full-Stack Development, UX & Business Foundations';

export const summary =
  'Software Engineering student at the College of Arts, Media and Technology (CAMT), Chiang Mai University. ' +
  'Builds full-stack web applications end to end (Vue, TypeScript, Firebase), with a track record of debugging ' +
  'production issues, designing data models and iterating on user feedback. Has taught programming online to ' +
  'high school students as a teaching assistant. Active outside the classroom as a musician and student leader.';

export const experience: Entry[] = [
  {
    title: 'Co-op Intern, Computer Scientist',
    org: 'NBT Chiang Mai',
    when: 'Nov 2026 - Mar 2027',
    upcoming: true,
    points: ['General IT and technology work for the regional TV station, from computer systems to broadcast equipment.'],
  },
  {
    title: 'Teaching Assistant',
    org: 'CAMT online courses for high school students',
    when: 'Oct 2024 - Feb 2025, May - Jun 2025',
    points: [
      'Ran weekly online classes for Advanced Programming (Python) and Digital Business, and later Rapid Application Development.',
      'Graded assignments in the course system and followed up with students on missing and late work.',
      'Built a shared Google Sheets tracker for submissions and scores, used with the course coordinator.',
      'Kept classes running when the platform had gaps, for example collecting work through Google Drive when a submission slot was missing.',
    ],
  },
  {
    title: 'Sales Staff, 2-week internship',
    org: 'N.C.C. Management & Development Co., Ltd.',
    when: '2024',
    points: ['Sales staff at the Bangkok International Book Fair 2024.'],
  },
  {
    title: 'Inventory survey tool',
    org: 'TCP Group - Durbell Co., Ltd.',
    when: '2022',
    points: ['Designed and built an inventory survey tool and guide used by field staff.'],
  },
];

export const projects: Entry[] = [
  {
    title: 'TamBaan',
    org: 'Senior project, home renovation marketplace | Vue 3, TypeScript, Firebase, Tailwind CSS',
    when: '2025 - Present',
    points: [
      'Designed and built a two-sided marketplace connecting Thai homeowners with renovation professionals, including role-based onboarding, public professional storefronts and private homeowner profiles.',
      'Implemented a project lifecycle system covering task tracking, progress updates and a horizontal/vertical timeline view with photo documentation.',
      'Built a 3-category star review system with weighted-average rating updates via Firestore transactions, and auto-published verified project photos to professional portfolios, with Firestore/Storage rules enforcing privacy.',
      'Diagnosed and fixed production issues independently: missing Firestore composite indexes causing silent query failures, a Vue Router component-reuse bug causing stale data, and dependency conflicts blocking Vercel builds.',
      'Iterated the UI on faculty review feedback across multiple rounds, including mockup-first design reviews before implementation.',
      'Used Claude Code as an AI pair-programmer for architecture decisions, debugging and code review.',
    ],
  },
  {
    title: 'Japan Capstone 2026',
    org: 'Osaka, Kobe and Tokyo',
    when: 'Nov 2026',
    upcoming: true,
    points: [
      'Designing and teaching a pla tapian (woven ribbon fish) workshop at Kobe Women\'s University, with bilingual slides, step diagrams and worksheets.',
      'Presenting gifts on behalf of CAMT to host organizations, with a bilingual gift page and QR-coded tags.',
    ],
  },
];

export const education: Entry[] = [
  { title: 'B.Eng. Software Engineering (International Program)', org: 'CAMT, Chiang Mai University', when: '2022 - Present' },
  { title: 'Gifted Program (Science)', org: 'Varee Chiangmai International School', when: '2019 - 2021' },
];

export const recognition: Entry[] = [
  {
    title: 'AIDI Workshop',
    when: '2025',
    points: [
      'Recommended by my cybersecurity course professor to represent Chiang Mai University at the Indo-Thailand Workshop on AI-Driven Innovations (AIDI), hosted by IIT Gandhinagar, India, 24-28 March 2025.',
    ],
  },
  {
    title: 'Agoda Tech Camp Day',
    when: '2024',
    points: ['Selected for Agoda\'s nationwide Tech Camp: hands-on workshops in LINE chatbot programming and web development with Agoda engineers.'],
  },
  {
    title: 'JALESEA Japanese Course',
    when: '2023 - 2024',
    points: ['400 hours of Japanese across two program levels at the CMU Language Institute.'],
  },
  { title: 'IELTS Academic', when: '2021', points: ['Band 7.0 (CEFR C1).'] },
  { title: 'UNICEF Kindness Leaders Conference', when: '2021', points: ['Nominated delegate from Southeast Asia.'] },
];

export const activities: Entry[] = [
  {
    title: 'Staff & Backstage Crew, CAMT and CMU events',
    when: '2022 - 2025',
    points: [
      'Crewed several Open House rounds a year and university concerts: livestream setup, wiring and soldering, and sponsor logistics, at times leading the crew. Moved events online during COVID and worked large combined onsite events.',
    ],
  },
  {
    title: 'Vice President, SE graduating class and CMU Music Club',
    when: '2023 - 2024',
    points: ['Coordinated paperwork and served as a cross-team liaison, mainly around events.'],
  },
  { title: 'Bassist, CMU Chamber Orchestra', when: '2022 - 2026', points: ['Performed with the university ensemble at academic-year showcases.'] },
  {
    title: 'Hotwave Music Awards, national level',
    when: '2018',
    points: ['Bassist for Frontline, a Chiang Mai band selected from 600+ bands nationwide for the Top 39 round in Bangkok, performing a Klear cover in the band\'s own style.'],
  },
];

// High school years, shown on the About page only.
export const earlier: Entry[] = [
  {
    title: 'Head of IT, Academic Ambassador Club',
    org: 'Varee Chiangmai School',
    when: 'High school',
    points: ['Ran the club\'s IT work and led its Knowledge Sharing activity and photography team at Banpong School (Dec 2020), teaching and running activities for younger students.'],
  },
  {
    title: 'Music',
    when: '2019 and earlier',
    points: [
      '1st place, Yupparaj Wittayalai School music competition at the Thailand STEM Festival 2019.',
      '3rd place, Lanna Polytechnic music competition for the International Day Against Drug Abuse.',
      'Day of Pride 2019: achievement in an arts competition at regional level.',
      'School bassist for six years and sports-day drummer for five.',
    ],
  },
  {
    title: 'English and camps',
    when: 'High school',
    points: [
      'Sermpanya English test: 5th in the region and 31st in the country.',
      'NARIT Youth Camp (astronomy) and CAMT Pre-College training.',
    ],
  },
];

export const skills: { label: string; items: string }[] = [
  { label: 'Programming', items: 'HTML, CSS, JavaScript, TypeScript, Java, Python, PHP, SQL' },
  { label: 'Frameworks', items: 'Vue 3, Flutter' },
  { label: 'Tools / Infra', items: 'Firebase (Auth, Firestore, Storage), Docker, Git, Vercel, Cloudflare' },
  { label: 'Security', items: 'Cybersecurity fundamentals (minor coursework, 2024)' },
  { label: 'AI tools', items: 'Claude Code, ChatGPT for prototyping, debugging and code review' },
  { label: 'Soft skills', items: 'Teaching, teamwork, leadership, cross-team communication, problem-solving' },
];

export const languages = [
  { name: 'Thai', level: 'Native' },
  { name: 'English', level: 'Fluent, primary day-to-day language' },
  { name: '日本語 Japanese', level: 'Beginner, 400 hours of coursework' },
];

export const interests = [
  'Bass in a couple of bands',
  'City pop and fusion jazz',
  'Film and digital photography',
  'Video editing, since high school',
  'Tennis, swimming, golf',
  'Taekwondo and Muay Thai',
];

// PDFs for the Resume page. Put the files in public/files/ and list them here;
// an empty list hides the download buttons.
export const downloads: { label: string; href: string }[] = [];
