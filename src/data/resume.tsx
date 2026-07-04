import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

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

Sometimes it becomes a weekend experiment. Sometimes I keep building it for months and start thinking, “okay, this one might actually become a real product.” So far, no luck — but the 2 AM bug discoveries have been very consistent.

I'm a full-stack developer and BSIT student at UMT who enjoys building software from the ground up—figuring out how an idea should work, designing the experience, building the backend, connecting everything together, and eventually shipping it.

These days, I mostly work with **Next.js, Node.js, TypeScript, and AI**, while going deeper into backend engineering, system design, and how production applications actually work beyond the happy path.

I'm also the **Web Development Lead at UMT ACM**, where I'll be helping organize technical workshops and developer-focused sessions for students who want to move beyond tutorials, experiment with real tools, and build things that actually work outside the classroom.

Right now, I'm working on **CodDock**, a platform focused on helping aspiring Pakistani developers learn practical skills, build projects, prepare for interviews, and move closer to freelance opportunities or software engineering jobs.

A few things I genuinely enjoy:

• Building full-stack products  
• Designing backend APIs  
• Experimenting with AI  
• Turning ideas into MVPs  
• Creating clean, responsive interfaces  
• Learning how good software behaves once real users get involved  

When I'm away from my laptop, I'm usually thinking about the next product I want to build... or convincing myself this deployment definitely won't fail this time.`,
  avatarUrl: "/uneeb.png",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Git",
    "GitHub",
    "MongoDB",
    "Express.js",
    "HTML",
    "CSS",
    "Postman",
    "TailwindCSS",
    "Figma",
    "Shadcn UI",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Generative AI",
    "Vercel AI SDK",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
      UpWork: {
        name: "UpWork",
        url: "https://www.upwork.com/freelancers/~013bf01b3e28523db1?mp_source=share",
        icon: "/upwork.png",

        navbar: true,
      },
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
      title: "Capto AI",
      href: "",
      dates: "August 2025 - Present",
      active: true,
      description: `
**Overview**  
Capto AI is a content creation assistant for creators, marketers, and entrepreneurs who need faster ways to generate captions and AI prompts.

It includes two main tools: a **Captions Generator** for short-form social content and a **Prompt Generator** for creating clearer prompts for AI tools.

**Problem**  
Creators often lose time writing captions or trying to get useful output from AI tools. A weak prompt usually leads to generic results, repeated attempts, and inconsistent content quality.

**Solution**  
Capto AI keeps the workflow simple: users enter an idea or topic, choose the tool they need, and get usable output without dealing with complex settings.

**Key Features**  
• AI caption generation for social media posts  
• Prompt generator for AI tools  
• Simple, distraction-free interface  
• Free and paid usage limits  
• Web-based access with no installation required  

**My Role**  
Founder and solo full-stack engineer. I handled the product concept, UI planning, system architecture, frontend, backend, AI integration, and deployment.

**Tech Stack**  
Next.js 15, React, TypeScript, Express.js, MongoDB Atlas, Zustand, TailwindCSS, shadcn/ui, Vercel AI SDK, and Vercel.
`,

      technologies: [
        "Next.js",
        "React",
        "Typescript",
        "MongoDB",
        "Express.js",
        "Node.js",
        "TailwindCSS",
        "Shadcn UI",
        "Web Development",
        "Full-stack Development",
        "AI",
        "Vercel AI SDK",
      ],
      links: [
        {
          type: "Website",
          href: "https://capto-ai.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/capto-ai.png",
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
      technologies: ["Next.js", "Typescript", "Tailwind CSS", "React"],
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
        "Typescript",
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
    {
      title: "Agencio",
      href: "",
      dates: "Mar 2025 – Present",
      active: true,
      description: `
**Overview**  
Agencio is a multi-tenant agency management SaaS for digital agencies, freelancers, and internal teams. It brings client management, project workflows, file organization, and AI-assisted knowledge access into one workspace.

**Problem**  
Small agencies often manage work across too many disconnected tools: task boards, chat apps, cloud storage, documents, and spreadsheets. This creates context switching, scattered information, and operational friction.

**Solution**  
Agencio centralizes core agency workflows behind a role-based system. Teams can manage projects, clients, files, and internal knowledge from one application while keeping access controlled across different user roles.

**Key Features**  
• Kanban and Gantt-style project workflows  
• Client and team collaboration features  
• Role-based access control  
• File organization by workspace and permission level  
• AI assistant powered by Gemini  
• Stripe-based subscription and billing flows  
• Invite-based onboarding for Owners, Admins, Members, and Clients  

**My Role**  
Founder and solo full-stack engineer. I worked on product strategy, UX planning, system architecture, frontend, backend, billing integration, and deployment.

**Tech Stack**  
Next.js 15, React, TypeScript, Express.js, MongoDB Atlas, Stripe, Zustand, TailwindCSS, shadcn/ui, and Vercel.
`,

      technologies: [
        "Next.js",
        "React",
        "Typescript",
        "MongoDB",
        "Express.js",
        "Node.js",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Web Development",
        "Full‑stack Development",
      ],
      links: [
        {
          type: "Website",
          href: "https://agencioo.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/agencio.jpg",
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
      links: [],
    },
    {
      title: "Management Team - TechVerse",
      dates: "June 2025",
      location: "Lahore, PK",
      description:
        "Served on the management team for TechVerse, a 12-hour hackathon hosted by UMT. I helped with event coordination, supported participants and organizers, and took part in the project evaluation process. The experience strengthened my coordination, communication, and teamwork skills in a fast-paced technical environment.",
      image: "/techverse.jpg",
      mlh: "",
      links: [],
    },
    {
      title: "Participant - Softcom '25 Hackathon (UMT & GIKI Collaboration)",
      dates: "Feb 2025",
      location: "Topi, KPK",
      description:
        "Participated in the Softcom '25 Hackathon, organized through a UMT and GIKI collaboration. I worked in a three-member team to solve a technical problem under time constraints. Although we did not win, the event gave me stronger exposure to teamwork, rapid problem-solving, and building under pressure.",
      image: "/acm.jpg",
      mlh: "",
      links: [],
    },
  ],
  // upworkCatalog: [
  //   {
  //     title:
  //       "You will get a custom web application with React, Node.js, and MongoDB (MERN stack)",
  //     description: `Get a Custom Web Application Built with React, Node.js & MongoDB

  //       Looking for a modern, scalable web app that drives business growth? I develop end-to-end MERN stack solutions (React, Next.js, Node.js, Express, MongoDB, TypeScript) tailored to your needs.
  //       `,
  //     image: "/upwork-1.png",
  //     price: "$200",
  //     links: [
  //       {
  //         type: "View on UpWork",
  //         href: "https://www.upwork.com/services/product/development-it-a-full-stack-web-application-react-express-node-mongodb-next-js-1937020686195953071?ref=project_share",
  //         icon: <Icons.globe className="size-3" />,
  //       },
  //     ],
  //   },
  //   {
  //     title:
  //       "You will get Fully Functional MERN Stack Web App Tailored to Your Need",
  //     description: `Get a custom, high-performance full-stack web application tailored to your needs. I deliver scalable, user-friendly solutions with modern features, fast turnaround, and seamless management of both front-end and back-end development.`,
  //     image: "/upwork-2.jpg",
  //     price: "$149",
  //     links: [
  //       {
  //         type: "View on UpWork",
  //         href: "https://www.upwork.com/services/product/development-it-custom-full-stack-project-with-mern-stack-for-efficient-management-1840848611497964885?ref=project_share",
  //         icon: <Icons.globe className="size-3" />,
  //       },
  //     ],
  //   },
  // ],
  // fiverrCatalog: [
  //   {
  //     title: "I will be your Node.js backend developer",
  //     description:
  //       "Looking for a reliable Node.js backend developer? You're in the right place. I specialize in building clean, scalable, and secure backend systems using modern technologies such as Node.js, Express, MongoDB, TypeScript, and REST APIs. Whether you're launching a startup, scaling your product, or integrating third-party services like Stripe, I deliver backend solutions that are tailored to your business goals.",
  //     image: "/fiverr-1.png",
  //     price: "$80",
  //     links: [
  //       {
  //         type: "View on Fiverr",
  //         href: "https://www.fiverr.com/s/P2DbomP",
  //         icon: <Icons.globe className="size-3" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: "I will build a full stackwebsite with the MERN stack",
  //     description:
  //       "Looking to build a scalable, secure, and high-performing web application from scratch? I specialize in developing end-to-end solutions using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with TypeScript. From modern frontend interfaces to robust backend APIs, I deliver tailored solutions that align with your business goals.\n\nKey Deliverables:\n- Fully functional frontend and backend\n- Scalable and maintainable architecture\n- Custom APIs and database integration\n- JWT/OAuth-based authentication and RBAC\n- TailwindCSS-powered responsive UI\n- Admin dashboards and client panels\n- Third-party API integrations\n- Performance optimization and security best practices\n\nEvery project is built with precision, ensuring a seamless user experience and reliable backend operations. Let’s bring your vision to life—place your order or contact me to discuss your project.",
  //     image: "/fiverr-2.jpg",
  //     price: "$80",
  //     links: [
  //       {
  //         type: "View on Fiverr",
  //         href: "https://www.fiverr.com/s/EgNKQd9",
  //         icon: <Icons.globe className="size-3" />,
  //       },
  //     ],
  //   },
  // ],
} as const;
