export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  year: string;
  href: string;
  desc: string;
  tags: string[];
  image?: string;
  /** Transparent cut-out image: shown whole instead of cropped to the frame. */
  cutout?: boolean;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  when: string;
  logo?: string;
}

export interface Skill {
  label: string;
  icon: string;
  mono?: boolean;
}

export interface SkillGroup {
  name: string;
  items: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  logo?: string;
}

export interface Talk {
  title: string;
  /** Format of the session, e.g. "Live online workshop". */
  format: string;
  when: string;
  duration?: string;
  audience?: string;
  desc: string;
  tags: string[];
  /** Recording, slides or repository, once you are ready to make it public. */
  href?: string;
}

// Trailing slashes are stripped so paths can be appended without producing "//".
// A custom domain only needs NEXT_PUBLIC_SITE_URL set in Vercel.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://uneebbhatti.vercel.app'
).replace(/\/+$/, '');

/** ISO date of the last meaningful content update; used by JSON-LD and the sitemap. */
export const lastUpdated = '2026-11-10';

export const siteDescription =
  'Uneeb Bhatti is a full-stack developer in Lahore, Pakistan, building web products and AI agents with Next.js, TypeScript, Node.js and PostgreSQL.';

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Talks', href: '#talks' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/uneebbhatti3' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/uneeb-bhatti/' },
  // { label: "Blog", href: "https://uneebbhatti.vercel.app/blog" },
];

export const contact = {
  email: 'uneebbhatti3@gmail.com',
  whatsapp: 'https://wa.me/923364769000',
};

export const projects: Project[] = [
  {
    title: 'The Buff',
    year: '2026 - Present',
    href: 'https://thebuffdetailing.vercel.app/',
    image: '/work/the-buff.webp',
    desc: 'Booking and operations system for a detailing studio in Lahore, with duration-based scheduling, owner-managed services, live slot availability and a Google ADK assistant backed by application data.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'shadcn/ui', 'Google ADK'],
  },
  {
    title: 'AlmTraders',
    year: '2024',
    href: 'https://www.almtraders.org/',
    image: '/work/almtraders.webp',
    desc: 'B2B website for an IT hardware wholesaler, focused on clear product positioning, international customers and search-friendly implementation.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Sysvelop',
    year: '2024',
    href: 'https://www.sysvelop.com/',
    image: '/work/sysvelop.webp',
    desc: 'Website for a software house company, designed and built with a lead-capture flow and excellent Lighthouse performance.',
    tags: ['Next.js', 'shadcn/ui', 'HubSpot'],
  },
  {
    title: 'Token Talent HR',
    year: '2024',
    href: 'https://tokentalent.co/',
    image: '/work/token-talent.webp',
    cutout: true,
    desc: 'Worked on the backend of a mobile-first HR platform during my internship, building REST APIs and JWT authentication around attendance and leave workflows.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
];

export const talks: Talk[] = [
  {
    title: 'Building AI Agents with Google ADK for TypeScript',
    format: 'Live online workshop',
    when: '24 Oct 2026',
    duration: '1 hour',
    audience: 'Open to everyone, technical and non-technical',
    desc: 'A live, hands-on session on building AI agents, pitched at a mixed technical and non-technical audience. We live-coded a customer support agent in TypeScript with Google ADK on Node.js, backed by a PostgreSQL database through Prisma. It was a single agent with several tools, including a write tool, so it could take real actions instead of only answering questions. The repository was shared so attendees could code along.',
    tags: ['Google ADK', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL'],
  },
];

export const experience: ExperienceEntry[] = [
  // { role: "Founder", org: "Codemaven Solutions", when: "Jul 2024 – May 2026" },
  {
    role: 'Backend Developer Intern',
    org: 'Token Talent HR',
    when: 'Aug - Sep 2024',
    logo: '/token.png',
  },
  {
    role: 'Front-end Developer & QA Intern',
    org: 'Concypt',
    when: 'Jul - Oct 2023',
    logo: '/concypt.jpg',
  },
];

export const education: Education[] = [
  {
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    institution: 'University of Management and Technology (UMT)',
    year: '2023 - Present',
    logo: '/umt.png',
  },
  {
    degree: 'Intermediate',
    institution: 'Punjab Group of Colleges',
    year: '2020 - 2023',
    logo: '/pgc.png',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    items: [
      { label: 'React', icon: 'react' },
      { label: 'Next.js', icon: 'nextjs', mono: true },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'HTML', icon: 'html' },
      { label: 'CSS', icon: 'css' },
      { label: 'Tailwind CSS', icon: 'tailwindcss' },
      { label: 'shadcn/ui', icon: 'shadcn', mono: true },
    ],
  },
  {
    name: 'Backend & Data',
    items: [
      { label: 'Node.js', icon: 'nodejs' },
      { label: 'Express', icon: 'expressjs', mono: true },
      { label: 'PostgreSQL', icon: 'postgresql' },
      { label: 'MongoDB', icon: 'mongodb' },
      { label: 'NestJS', icon: 'nestjs' },
    ],
  },
  {
    name: 'AI',
    items: [
      { label: 'Vercel AI SDK', icon: 'vercel', mono: true },
      { label: 'Google ADK', icon: 'google' },
      { label: 'Generative AI', icon: 'sparkle' },
    ],
  },
  {
    name: 'Tools & Design',
    items: [
      { label: 'Git', icon: 'git' },
      { label: 'Docker', icon: 'docker' },
      { label: 'GitHub', icon: 'github', mono: true },
      { label: 'Postman', icon: 'postman' },
      { label: 'Figma', icon: 'figma' },
      { label: 'Illustrator', icon: 'ai' },
      { label: 'Photoshop', icon: 'ps' },
    ],
  },
];
