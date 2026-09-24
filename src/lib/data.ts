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
}

export interface ExperienceEntry {
  role: string;
  org: string;
  when: string;
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
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: NavLink[] = [
  { label: "GitHub", href: "https://github.com/uneebbhatti3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/uneeb-bhatti/" },
  // { label: "Blog", href: "https://uneebbhatti.vercel.app/blog" },
];

export const contact = {
  email: "uneebbhatti3@gmail.com",
  whatsapp: "https://wa.me/923364769000",
};

export const projects: Project[] = [
  {
    title: "CodDock",
    year: "2026 - Present",
    href: "https://coddock.vercel.app/",
    desc: "Developer growth platform for aspiring engineers in Pakistan, combining learning roadmaps, project challenges, interview preparation and AI-assisted career tools.",
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Vercel AI SDKs",
      "Google ADK",
      "Docker",
      "CI/CD",
      "Shadcn UI",
    ],
  },
  {
    title: "The Buff",
    year: "2026 - Present",
    href: "https://thebuffdetailing.vercel.app/",
    desc: "Booking and operations system for a detailing studio in Lahore, with duration-based scheduling, owner-managed services, live slot availability and a Google ADK assistant backed by application data.",
    tags: ["Next.js", "TypeScript", "Prisma", "shadcn/ui", "Google ADK"],
  },
  {
    title: "AlmTraders",
    year: "2024",
    href: "https://www.almtraders.org/",
    desc: "B2B website for an IT hardware wholesaler, focused on clear product positioning, international customers and search-friendly implementation.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Sysvelop",
    year: "2024",
    href: "https://www.sysvelop.com/",
    desc: "Website for a software house company, designed and built with a lead-capture flow and excellent Lighthouse performance.",
    tags: ["Next.js", "shadcn/ui", "HubSpot"],
  },
  {
    title: "Token Talent HR",
    year: "2024",
    href: "https://tokentalent.co/",
    desc: "Worked on the backend of a mobile-first HR platform during my internship, building REST APIs and JWT authentication around attendance and leave workflows.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
  },
];

export const experience: ExperienceEntry[] = [
  // { role: "Founder", org: "Codemaven Solutions", when: "Jul 2024 – May 2026" },
  {
    role: "Backend Developer Intern",
    org: "Token Talent HR",
    when: "Aug - Sep 2024",
  },
  {
    role: "Front-end Developer & QA Intern",
    org: "Concypt",
    when: "Jul - Oct 2023",
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    institution: "University of Management and Technology (UMT)",
    year: "2023 - Present",
  },
  {
    degree: "Intermediate",
    institution: "Punjab Group of Colleges",
    year: "2020 - 2023",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    items: [
      { label: "React", icon: "react" },
      { label: "Next.js", icon: "nextjs", mono: true },
      { label: "TypeScript", icon: "typescript" },
      { label: "JavaScript", icon: "javascript" },
      { label: "HTML", icon: "html" },
      { label: "CSS", icon: "css" },
      { label: "Tailwind CSS", icon: "tailwindcss" },
      { label: "shadcn/ui", icon: "shadcn", mono: true },
    ],
  },
  {
    name: "Backend & Data",
    items: [
      { label: "Node.js", icon: "nodejs" },
      { label: "Express", icon: "expressjs", mono: true },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "MongoDB", icon: "mongodb" },
      { label: "Docker", icon: "docker" },
      { label: "NestJS (learning)", icon: "nestjs" },
    ],
  },
  {
    name: "AI",
    items: [
      { label: "Vercel AI SDK", icon: "vercel", mono: true },
      { label: "Google ADK", icon: "google" },
      { label: "Generative AI", icon: "sparkle" },
    ],
  },
  {
    name: "Tools & Design",
    items: [
      { label: "Git", icon: "git" },
      { label: "GitHub", icon: "github", mono: true },
      { label: "Postman", icon: "postman" },
      { label: "Figma", icon: "figma" },
      { label: "Illustrator", icon: "ai" },
      { label: "Photoshop", icon: "ps" },
    ],
  },
];
