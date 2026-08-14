import React from "react";
import { Icons } from "@/components/icons";
import { BotIcon, HomeIcon } from "lucide-react";
import ReactIcon from "@/components/svgs/react-icon";
import NextJSIcon from "@/components/svgs/nextjs-icon";
import JavaScriptIcon from "@/components/svgs/javascript-icon";
import TypeScriptIcon from "@/components/svgs/typescript-icon";
import NodeJSIcon from "@/components/svgs/nodejs-icon";
import GitIcon from "@/components/svgs/git-icon";
import GitHubIcon from "@/components/svgs/github-icon";
import MongoDBIcon from "@/components/svgs/mongodb-icon";
import ExpressJSIcon from "@/components/svgs/expressjs-icon";
import HTMLIcon from "@/components/svgs/html-icon";
import CSSIcon from "@/components/svgs/css-icon";
import PostmanIcon from "@/components/svgs/postman-icon";
import TailwindCSSIcon from "@/components/svgs/tailwindcss-icon";
import FigmaIcon from "@/components/svgs/figma-icon";
import AdobeIllustratorIcon from "@/components/svgs/illustrator-icon";
import AdobePhotoshopIcon from "@/components/svgs/photoshop-icon";
import VercelIcon from "@/components/svgs/vercel-icon";
import DockerIcon from "@/components/svgs/docker-icon";
import PostgreSQLIcon from "@/components/svgs/postgresql-icon";
import GoogleIcon from "@/components/svgs/goole-icon";
import ShadcnUIIcon from "@/components/svgs/shadcn-icon";
import GenerativeAIIcon from "@/components/svgs/generative-ai-icon";

export const DATA = {
  name: "Uneeb Bhatti",
  initials: "UB",
  url: "https://uneebbhatti.vercel.app/",
  location: "Lahore, PK",
  locationLink: "https://www.google.com/maps/place/lahore",
  description:
    "Full-stack developer who enjoys turning ideas into products with Next.js, TypeScript, and AI. Most days I'm building something, breaking something, and eventually figuring out why.",

  summary: `
I have a small problem: once an idea gets stuck in my head, I usually end up trying to build it.

Sometimes it becomes a weekend experiment. Sometimes I keep building it for months and start thinking, “okay, this one might actually become a real product.” The 2 AM bug discoveries, at least, have been very consistent.

I'm a full-stack developer and BSIT student at UMT who enjoys building software from the ground up—figuring out how an idea should work, designing the experience, building the backend, connecting everything together, and eventually shipping it.

These days, I mostly work with **Next.js, Node.js, TypeScript, and AI**, while going deeper into backend engineering, system design, and how production applications actually work beyond the happy path.

I'm also the **Web Development Lead at UMT ACM**, where I organize technical workshops and developer-focused sessions for students who want to move beyond tutorials, experiment with real tools, and build things that actually work outside the classroom.

Right now, I'm working on **CodDock**, a platform focused on helping aspiring Pakistani developers learn practical skills, build projects, prepare for interviews, and move closer to freelance opportunities or software engineering jobs.

A few things I genuinely enjoy:

- Building full-stack products  
- Designing backend APIs  
- Experimenting with AI  
- Turning ideas into MVPs  
- Creating clean, responsive interfaces  
- Learning how good software behaves once real users get involved  

When I'm away from my laptop, I'm usually already thinking about the next product I want to build, or still poking at the last one to see what else breaks.`,
  avatarUrl: "/uneeb.png",
  skills: [
    { name: "React", icon: ReactIcon },
    { name: "Next.js", icon: NextJSIcon },
    { name: "JavaScript", icon: JavaScriptIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "Node.js", icon: NodeJSIcon },
    { name: "Git", icon: GitIcon },
    { name: "GitHub", icon: GitHubIcon },
    { name: "MongoDB", icon: MongoDBIcon },
    { name: "Express.js", icon: ExpressJSIcon },
    { name: "HTML", icon: HTMLIcon },
    { name: "CSS", icon: CSSIcon },
    { name: "Postman", icon: PostmanIcon },
    { name: "Tailwind CSS", icon: TailwindCSSIcon },
    { name: "Figma", icon: FigmaIcon },
    { name: "Shadcn UI", icon: ShadcnUIIcon },
    { name: "Adobe Illustrator", icon: AdobeIllustratorIcon },
    { name: "Adobe Photoshop", icon: AdobePhotoshopIcon },
    { name: "Generative AI", icon: GenerativeAIIcon },
    { name: "Vercel AI SDK", icon: VercelIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "PostgreSQL", icon: PostgreSQLIcon },
    { name: "Google ADK", icon: GoogleIcon },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "uneebbhatti3@gmail.com",
    tel: "+923364769000",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/uneebbhatti3",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/uneeb-bhatti/",
        icon: Icons.linkedin,

        navbar: true,
      },
      // UpWork: {
      //   name: "UpWork",
      //   url: "https://www.upwork.com/freelancers/~013bf01b3e28523db1?mp_source=share",
      //   icon: "/upwork.png",

      //   navbar: true,
      // },
      // Fiverr: {
      //   name: "Fiverr",
      //   url: "https://www.fiverr.com/users/uneeb_bhatti3/manage_gigs",
      //   icon: "/fiverr.png",

      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "mailto:uneebbhatti3@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Codemaven Solutions",
      href: "https://www.codemavensolutions.com/",
      badges: [],
      location: "Remote",
      title: "Founder",
      logoUrl: "/codemavensolutions.png",
      start: "July 2024",
      end: "May 2026",
      description:
        "Started Codemaven Solutions with the goal of building a remote software company around web, mobile, and AI development. I spent time working on the company setup, service positioning, branding, technical direction, and figuring out how to turn development skills into an actual business. It never reached the client traction I hoped for, so I eventually closed it — but the experience taught me a lot about sales, positioning, execution, and how different building a business is from simply building software.",
    },
    {
      company: "Token Talent HR",
      badges: [],
      href: "https://tokentalent.co/",
      location: "Lahore, PK",
      title: "Backend Developer Intern",
      logoUrl: "/token.png",
      start: "August 2024",
      end: "September 2024",
      description:
        "Worked on backend development for HR tooling and talent-matching workflows. Built and improved REST APIs with Express.js and MongoDB, contributed to database schema design, integrated third-party services, and collaborated with frontend and product teams to keep application logic consistent across the platform.",
    },
    {
      company: "Concypt",
      href: "https://concypt.co.uk/",
      badges: [],
      location: "Lahore, PK",
      title: "Front-end Developer & QA Engineer Intern",
      logoUrl: "/concypt.jpg",
      start: "July 2023",
      end: "October 2023",
      description:
        "Built and maintained frontend features for client projects using HTML, CSS, and JavaScript. Worked with design and backend teams to implement UI requirements, fix integration issues, and support QA through test case writing, cross-browser checks, staging reviews, and performance issue reporting.",
    },
  ],
  education: [
    {
      school: "University of Management and Technology (UMT)",
      href: "https://www.umt.edu.pk/",
      degree: "Bachelor of Information Technology (BSIT)",
      logoUrl: "/umt.png",
      start: "2023",
      end: "Present",
    },
    {
      school: "Punjab Group of Colleges (PGC)",
      href: "https://pgc.edu/",
      degree: "Intermediate in Computer Science",
      logoUrl: "/pgc.png",
      start: "2020",
      end: "2023",
    },
    {
      school: "Yousaf School System (YSS)",
      href: "https://web.facebook.com/yousafschool/?_rdc=1&_rdr",
      degree: "Primary School",
      logoUrl: "/yss.png",
      start: "2007",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "CodDock",
      href: "https://coddock.vercel.app/",
      dates: "August 2026 - Present",
      active: true,
      description: `
**Overview**  
CodDock is a developer growth platform designed for aspiring software engineers in Pakistan. It brings structured learning roadmaps, practical project building, coding practice, interview preparation, and career resources into a single ecosystem — helping developers move from learning concepts to building proof of skill and becoming job-ready.

**Problem**  
Aspiring developers often have access to more tutorials than they can realistically follow, but lack a clear path from learning to employment. Resources are fragmented across courses, YouTube, coding platforms, communities, and freelancing websites, making it difficult to know what to learn, what to build, how to prepare for interviews, and what employers actually expect. CodDock addresses this gap by turning an otherwise fragmented developer journey into a structured progression from learning to building, preparing, and eventually earning.

**Solution**  
CodDock is built around a simple progression: **Learn → Build → Prepare → Earn**. Developers can follow structured technology roadmaps, strengthen their skills through practical challenges, build portfolio-worthy projects, prepare for technical interviews, and access career-focused resources. The platform is designed to provide context around what to learn next and why, rather than simply presenting another collection of tutorials.

**Key Features**  
- Structured learning roadmaps covering frontend, backend, AI, and other software engineering paths  
- Practical coding challenges and project-based learning focused on building real-world skills  
- Interview preparation resources for technical concepts, DSA, and software engineering roles  
- Developer community designed around learning, collaboration, mentorship, and career growth  
- AI-powered career tools for resume feedback, portfolio improvement, and personalized learning guidance  
- Company and career insights to help developers better understand hiring expectations and opportunities  
- Learn → Build → Prepare → Earn progression that connects technical learning with real career outcomes  

**My Role**  
Founder and full-stack developer. I defined the product vision, researched the problems faced by early-career developers, designed the product architecture and user experience, and handled the full-stack implementation. I am responsible for turning the platform from an initial concept into a scalable developer ecosystem.

**Tech Stack**  
Next.js, TypeScript, React, TailwindCSS, PostgreSQL, Prisma, AI SDKs, and Vercel.

**Status**  
In active development — the product is being built incrementally around the core developer learning and career journey, with the initial platform and foundation currently being developed.
`,
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
        "AI Applications",
        "AI SDKs",
        "Full-stack Development",
        "EdTech",
      ],
      links: [
        {
          type: "Website",
          href: "https://coddock.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/coddock.jpg",
    },
    {
      title: "The Buff",
      href: "https://thebuffdetailing.vercel.app/",
      dates: "July 2026 - Present",
      active: true,
      description: `
**Overview**  
The Buff is a booking platform and AI-assisted website built for a real, currently operating car and motorcycle detailing studio in Lahore. The project covers the full customer journey — browsing services, requesting an appointment, and getting questions answered — plus an admin-controlled backend and an AI assistant that can hold a real conversation about the business.

**Problem**  
The studio had no website and no structured booking process — appointments were coordinated manually, with no way to account for the fact that different services (a wash vs. a full paint correction) require very different amounts of time, or to prevent two customers from being scheduled into overlapping slots.

**Solution**  
I designed a duration-aware booking system: every service has its own price, duration, and active/inactive status stored in the database rather than hardcoded, so the owner can update the catalog himself at any time. When a customer selects multiple services, total appointment time is calculated automatically, and only time slots that fit within business hours and don't conflict with existing bookings are shown. On top of that, I built an AI assistant using Google's Agent Development Kit (ADK) that answers customer questions about services, pricing, and hours by querying the same live database — never hardcoded facts — and can walk a customer through submitting a booking request directly in the chat.

**Key Features**  
- Duration-aware, multi-service booking flow with real-time slot availability  
- Admin-managed service catalog — prices, durations, and availability editable without a code deploy  
- Configurable weekly business hours and booking rules (buffer time, minimum notice, slot intervals)  
- Booking-request model — the owner reviews and confirms each request rather than instant auto-booking  
- AI assistant (Google ADK) that answers business questions from live data and can initiate a booking  
- Custom editorial UI direction, built to avoid the generic car-wash-template look  

**My Role**  
Full-stack developer, solo. I handled the product design, database schema, booking and availability logic, admin data model, frontend implementation, and the AI agent's tools and instructions.

**Tech Stack**  
Next.js, TypeScript, Prisma, PostgreSQL, TailwindCSS, shadcn/ui, Google ADK, and Vercel.

**Status**  
Live and in active development — the booking engine and AI assistant are functional; business data is being finalized with the client ahead of full public launch.
`,
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
        "Shadcn UI",
        "AI Agents",
        "Google ADK",
        "Full-stack Development",
      ],
      links: [
        {
          type: "Website",
          href: "https://thebuffdetailing.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/the-buff.jpg",
    },
    {
      title: "Token Talent HR",
      href: "https://tokentalent.co/",
      dates: "Aug 2024 - Sep 2024",
      active: true,
      description: `
**Overview**  
Token Talent HR is a mobile-first HR platform for attendance, leave management, and payroll-related workflows.

**Context**  
I contributed to this product during my internship as part of a development team, mainly on backend development and API integration.

**My Contributions**  
• Assisted in building REST APIs with Express.js and MongoDB  
• Implemented JWT-based authentication flows  
• Helped develop attendance and leave-related API endpoints  
• Worked with frontend and mobile developers to test, debug, and refine API responses  

**Learning Outcome**  
This internship gave me practical experience with backend systems, API design, authentication, and collaboration inside a multi-disciplinary development team.

**Tech Stack**  
Node.js, Express.js, MongoDB, JWT, REST APIs, and Git.

**Status**  
The platform is live and supports HR operations for its users.
`,
      technologies: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mobile App",
        "Backend",
        "API Development",
      ],
      links: [
        {
          type: "Website",
          href: "https://tokentalent.co/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/token-talent.gif",
    },
    {
      title: "AlmTraders",
      href: "https://www.almtraders.org/",
      dates: "Dec 2024 - Feb 2025",
      active: true,
      description: `
**Overview**  
AlmTraders is a wholesale distributor in the global IT hardware trading and export market. The company needed a professional web presence to present its business, products, and credibility to international buyers.

**Problem**  
The business had limited online presence, which made it harder for potential buyers to understand its services, product categories, and market positioning.

**Solution**  
I designed and developed a responsive website using Next.js, TypeScript, and TailwindCSS. The site uses reusable components, structured content, product-focused sections, and SEO-friendly implementation.

**My Role**  
Full-stack developer. I handled the frontend implementation, responsive layout, performance optimization, and stakeholder revisions.

**Key Improvements**  
• Modern B2B website structure  
• Responsive layout for desktop and mobile  
• SEO-friendly metadata and semantic structure  
• Improved performance through Next.js and optimized frontend implementation  

**Tech Stack**  
Next.js, TypeScript, React, TailwindCSS, and Vercel.

**Status**  
The website is live and gives AlmTraders a more credible digital presence for partners and buyers.
`,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      links: [
        {
          type: "Website",
          href: "https://www.almtraders.org/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/alm-traders.png",
    },
    {
      title: "Sysvelop",
      href: "https://www.sysvelop.com/",
      dates: "March 2024 - April 2024",
      active: true,
      description: `
**Overview**  
Sysvelop is a software company offering web, mobile, and digital product development services. The website acts as its company profile, service showcase, and lead-generation channel.

**Problem**  
The previous website needed a stronger structure, improved responsiveness, and clearer service presentation to build trust with potential clients.

**Solution**  
I developed a modern marketing website using Next.js, TypeScript, TailwindCSS, and shadcn/ui. The site is responsive, performance-focused, and structured around service clarity and lead generation.

**My Role**  
Lead front-end engineer. I implemented the UI, built reusable components, handled responsive behavior, and worked on SEO-related metadata and structure.

**Key Results**  
• Improved service presentation and website structure  
• Responsive implementation across screen sizes  
• Lighthouse scores above 95 across key categories  
• Lead capture flow integrated into the site  

**Tech Stack**  
Next.js, React, TypeScript, TailwindCSS, shadcn/ui, Vercel, and HubSpot.
`,

      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.sysvelop.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/sysvelop.png",
    },
  ],
  hackathons: [
    {
      title: "Web Development Lead - ACM",
      dates: "December 2025",
      location: "Lahore, PK",
      description:
        "Appointed as Web Development Lead at UMT ACM. I help plan and execute web-focused workshops, technical sessions, and student developer events. The role involves coordinating event ideas, supporting community learning, and helping students gain practical exposure to modern web development.",
      image: "/acm.jpg",
      mlh: "",
      links: [] as { href: string; icon: React.ReactNode; title: string }[],
    },
    {
      title: "Management Team - TechVerse",
      dates: "June 2025",
      location: "Lahore, PK",
      description:
        "Served on the management team for TechVerse, a 12-hour hackathon hosted by UMT. I helped with event coordination, supported participants and organizers, and took part in the project evaluation process. The experience strengthened my coordination, communication, and teamwork skills in a fast-paced technical environment.",
      image: "/techverse.jpg",
      mlh: "",
      links: [] as { href: string; icon: React.ReactNode; title: string }[],
    },
    {
      title: "Participant - Softcom '25 Hackathon (UMT & GIKI Collaboration)",
      dates: "Feb 2025",
      location: "Topi, KPK",
      description:
        "Participated in the Softcom '25 Hackathon, organized through a UMT and GIKI collaboration. I worked in a three-member team to solve a technical problem under time constraints. Although we did not win, the event gave me stronger exposure to teamwork, rapid problem-solving, and building under pressure.",
      image: "/acm.jpg",
      mlh: "",
      links: [] as { href: string; icon: React.ReactNode; title: string }[],
    },
  ],
} as const;
