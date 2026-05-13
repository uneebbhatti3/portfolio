import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Uneeb Bhatti",
  initials: "UB",
  url: "https://uneebbhatti.vercel.app/",
  location: "Lahore, PK",
  locationLink: "https://www.google.com/maps/place/lahore",
  description:
    "Full-stack developer building modern web experiences, experimenting with AI, and currently working on startups that solve real-world problems. Probably fixing bugs as you read this.",

  summary: `I'm a **full-stack web developer** and a **BSIT student at the University of Management and Technology (UMT)** who enjoys building modern, scalable, and user-focused applications with the **MERN stack**, **Next.js**, and increasingly, backend-heavy architectures.

Most of my time goes into building products, experimenting with ideas, breaking things accidentally, and then spending hours figuring out why they broke in the first place.

Currently, I serve as the **Web Development Lead at UMT ACM**, where I help organize developer-focused workshops, technical sessions, and community events for students who want to grow beyond tutorials and build real things.

I’m currently working on **CodDock**, a platform focused on helping Pakistani developers grow from learning programming to building projects, improving their skills, and eventually landing freelance work or tech jobs. The idea combines structured learning roadmaps, developer tools, community features, interview preparation, and AI-powered assistance into one ecosystem designed for aspiring developers.

Over time, I’ve had the opportunity to work with both product-based and service-based teams, contribute to real-world applications, and collaborate with developers, designers, and founders on meaningful projects.

Things I genuinely enjoy:\n
• Building full-stack applications  
• Backend engineering & APIs  
• AI integrations & experimentation  
• Designing scalable systems  
• Clean UI/UX  
• Shipping products people actually use  

When I’m not coding, I’m usually exploring new tech, refining ideas for future products, or convincing myself that this deployment will finally work on the first try.`,
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
      title: "Founder & CEO",
      logoUrl: "/codemavensolutions.png",
      start: "July 2024",
      end: "May 2026",
      description:
        "Leading a remote team to deliver web, mobile, and AI-driven software solutions for global clients. Overseeing end-to-end project lifecycles — from UI/UX design and development to deployment. Built scalable web applications using MERN stack and Next.js, and contributed to mobile app development using React Native. Managing client communication, team operations, and technical architecture to ensure timely and high-quality delivery.",
    },
    {
      company: "Token Talent HR",
      badges: [],
      href: "https://tokentalent.co/",
      location: "Lahore, PK",
      title: "Backend Developer",
      logoUrl: "/token.png",
      start: "August 2024",
      end: "September 2024",
      description:
        "Worked on backend development for internal HR tooling and talent-matching systems. Built and optimized REST APIs using Express.js and MongoDB, integrated third-party services, and contributed to database schema design. Collaborated with the frontend and product teams to ensure smooth data flow and consistent application logic across platforms.",
    },
    {
      company: "Concypt",
      href: "https://concypt.co.uk/",
      badges: [],
      location: "Lahore, PK",
      title: "Front-end Developer & QA Engineer",
      logoUrl: "/concypt.jpg",
      start: "July 2023",
      end: "October 2023",
      description:
        "Developed and maintained frontend features for client projects using HTML, CSS, and JavaScript. Worked closely with the design and backend teams to ensure seamless UI integration. Also contributed to QA processes by writing test cases, performing cross-browser testing, and identifying performance bottlenecks in staging environments.",
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
Capto AI is a **content creation assistant** built for creators, marketers, and entrepreneurs who want to produce engaging content faster.  
It provides two powerful AI-driven tools — a **Captions Generator** for short, engaging social media captions, and a **Prompt Generator** for crafting high-quality prompts for any AI model, especially for those who struggle to write effective prompts.

**Problem**  
Content creators often spend too much time brainstorming captions or struggle to get the right output from AI tools because of poorly written prompts.  
This leads to wasted time, inconsistent quality, and missed posting opportunities.

**Solution**  
Capto AI offers a streamlined interface with no overcomplicated settings — just input your topic or idea, and instantly get either ready-to-use captions or professionally structured prompts.  
It’s designed to help users create better content, faster, without the learning curve of prompt engineering.

**Key Features**  
• Captions Generator for quick, attention-grabbing social posts  
• Prompt Generator to get high-quality results from any AI tool  
• Simple, distraction-free UI for fast results  
• Usage limits with Free & Paid plans  
• Instant web access — no downloads required

**My Role**  
Founder & solo full-stack engineer — led product concept, UX/UI design, system architecture, backend + frontend development, and deployment.

**Tech Stack**  
Next.js 15, React, TypeScript, Express.js, MongoDB Atlas, Zustand, TailwindCSS, shadcn/ui, and Vercel.
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
Token Talent HR is a **mobile-first HR tech platform** designed to help companies manage employee attendance, leave requests, and payroll workflows.

**Context**
I worked on this product during my **internship** with a development team, contributing to back-end development and API integration.

**My Contributions**  
• Assisted in developing RESTful APIs using Express.js and MongoDB  
• Built secure authentication flows using JWT  
• Helped implement attendance and leave endpoints for mobile consumption  
• Collaborated with front-end and mobile developers to test and debug API responses

**Learning Outcome**
This internship provided hands-on experience in building production-ready back-end systems, improved my API design skills, and strengthened my collaboration within a multi-disciplinary engineering team.

**Tech Stack**
Node.js, Express.js, MongoDB, JWT, REST APIs, Git.

**Status**
The app is live and being used by HR departments to streamline operations across a growing user base.`,
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
AlmTraders is a leading wholesale distributor with over 30 years of experience in global IT hardware trading and exports. Their digital presence was outdated and lacked modern UX standards, making it difficult for international clients to access product information.

**Problem**
Before this project, AlmTraders had no online presence, which significantly limited their ability to attract and engage international buyers. As a global wholesale IT trading business, the absence of a professional website was causing them to lose potential clients, weaken brand credibility, and miss out on organic search opportunities in competitive export markets.

**Solution**
I redesigned and developed their website using **Next.js, TypeScript, and TailwindCSS**, creating a performance-optimized, mobile-responsive, and SEO-friendly web presence. I structured the content using reusable components, integrated dynamic product listings, and set up meta tags for better indexing.

**My Role**
Full-stack developer – I led the front-end implementation, optimized performance, implemented design responsiveness, and collaborated with stakeholders to revise site architecture.

**Key Improvements**  
• Modern UI aligned with B2B branding  
• Optimized Lighthouse performance (95+)  
• Improved Google search ranking with semantic tags and SSR  
• Reduced page load time to under 1.2s on average

**Tech Stack**
Next.js, TypeScript, React, TailwindCSS, Vercel.

**Status**
The live website is now accessible at almtraders.org, delivering a professional first impression to partners worldwide.`,
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
Sysvelop is a full-service software company offering custom web, mobile, and digital product development solutions to global clients. The website serves as the company's digital identity, portfolio showcase, and lead-generation hub.

**Problem**  
Prior to this redesign, Sysvelop's online presence lacked modern UI/UX design, responsive behavior, and conversion-focused content structure. This limited its ability to build trust with international clients and convert website visitors into leads.

**Solution**  
I designed and developed a modern, high-performance marketing website using a component-based architecture with Next.js and TypeScript. The site is fully responsive, optimized for SEO and speed, and integrates seamlessly with lead capture workflows.

**My Role**  
As the lead front-end engineer, I handled:  
• UI/UX implementation using shadcn/ui and TailwindCSS  
• SEO optimization with metadata and structured schema

**Key Results**  
• 60% increase in average session duration  
• 2x increase in qualified lead submissions within 3 months  
• Lighthouse scores above 95 across performance, accessibility, and SEO

**Tech Stack**  
Next.js, React, TypeScript, TailwindCSS, shadcn/ui, Vercel, HubSpot.
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
Agencio is an **all-in-one, multi-tenant agency-management SaaS** built for digital agencies, freelancers, and in-house teams.  
It unifies client CRM, project & task pipelines, secure file storage, and an AI-assisted knowledge base into a single, searchable workspace—eliminating the need to juggle six or more disconnected tools.

**Problem**  
Most agencies rely on a fragmented tool stack—Trello/Jira, Slack, Google Drive, Notion, spreadsheets—leading to constant context-switching, data silos, and lost billable hours.  
Internal research showed that a mid-sized agency lost **~6 hours per employee per week** due to these inefficiencies.

**Solution**  
Agencio consolidates workflows behind a unified UI and role-based permission model.  
Its modular architecture allows teams to activate only the features they need, while co-locating data to support contextual AI insights.

**Key Features**  
• Kanban & Gantt project pipelines  
• Client & team chat (post-MVP)  
• Granular file buckets with RBAC access controls  
• AI assistant (powered by Gemini) for answering project queries  
• Stripe-powered subscription & usage-based billing  
• Invite-based onboarding with role segmentation (Owner, Admin, Member, Client)

**My Role**  
Founder & solo full-stack engineer — led product strategy, UX design, system architecture, backend + frontend implementation, and early customer success.

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
        "Appointed as the Web Development Lead at UMT ACM, where I am responsible for planning, managing, and executing technical workshops and web-focused events. This role allows me to engage with the developer community, coordinate cross-functional activities, and ensure high-quality learning experiences for students. Through this position, I continue to refine my leadership, communication, and technical facilitation capabilities.",
      image: "/acm.jpg",
      mlh: "",
      links: [],
    },
    {
      title: "Management Team - TechVerse",
      dates: "June 2025",
      location: "Lahore, PK",
      description:
        "I had the opportunity to be part of the management team for TechVerse, a 12-hour hackathon hosted by UMT. It was an incredible experience that allowed me to contribute to event coordination, collaborate with participants and organizers, and gain firsthand exposure to managing a fast-paced tech event. On the third day, I also took part in the project evaluation process, reviewing innovative solutions built under pressure. It was a rewarding and insightful experience that strengthened both my organizational and teamwork skills.",
      image: "/techverse.jpg",
      mlh: "",
      links: [],
    },
    {
      title: "Participant - Softcom '25 Hackathon (UMT & GIKI Collaboration)",
      dates: "Feb 2025",
      location: "Topi, KPK",
      description:
        "I participated in the Softcom '25 Hackathon, a collaboration between UMT and GIKI, as part of a team of three members, alongside two friends. This experience allowed me to dive into a competitive tech environment, where we worked together to solve complex problems and develop innovative solutions. Although we didn't win, the event was an excellent learning opportunity, helping me refine my skills in teamwork, problem-solving, and creative thinking. It was a great chance to network with other tech enthusiasts and gain insights that will guide my future projects.",
      image: "/acm.jpg",
      mlh: "",
      links: [],
    },
  ],
  upworkCatalog: [
    {
      title:
        "You will get a custom web application with React, Node.js, and MongoDB (MERN stack)",
      description: `Get a Custom Web Application Built with React, Node.js & MongoDB
        
        Looking for a modern, scalable web app that drives business growth? I develop end-to-end MERN stack solutions (React, Next.js, Node.js, Express, MongoDB, TypeScript) tailored to your needs.
        `,
      image: "/upwork-1.png",
      price: "$200",
      links: [
        {
          type: "View on UpWork",
          href: "https://www.upwork.com/services/product/development-it-a-full-stack-web-application-react-express-node-mongodb-next-js-1937020686195953071?ref=project_share",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
    {
      title:
        "You will get Fully Functional MERN Stack Web App Tailored to Your Need",
      description: `Get a custom, high-performance full-stack web application tailored to your needs. I deliver scalable, user-friendly solutions with modern features, fast turnaround, and seamless management of both front-end and back-end development.`,
      image: "/upwork-2.jpg",
      price: "$149",
      links: [
        {
          type: "View on UpWork",
          href: "https://www.upwork.com/services/product/development-it-custom-full-stack-project-with-mern-stack-for-efficient-management-1840848611497964885?ref=project_share",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
  ],
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
