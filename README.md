# Uneeb Bhatti — Portfolio

Personal portfolio for **Uneeb Bhatti**, a full-stack developer based in Lahore, Pakistan.

The site is intentionally minimal and editorial: strong typography, concise project writing, subtle GSAP motion and a fixed three.js wireframe scene that responds to scrolling. The goal is to present selected work clearly without turning the portfolio into a résumé page or a marketing site.

## Live site

Current Vercel deployment: [uneebbhatti.vercel.app](https://uneebbhatti.vercel.app)

> A custom domain can be connected to the same Vercel project without changing the application architecture.

## Stack

- **Next.js 15** — App Router
- **React 19**
- **TypeScript** — strict mode
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — intro and scroll motion
- **three.js** — fixed interactive wireframe scene
- **Inter + JetBrains Mono** via `next/font`

There is currently no backend, database, authentication layer or required environment variable.

## Local development

Requirements:

- Node.js compatible with the installed Next.js version
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npx tsc --noEmit
npm run build
npm run start
```

Run `npm run lint` only if ESLint is configured in the repository.

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Motion.tsx
│   ├── Scene3D.tsx
│   └── ui/
└── lib/
    ├── cn.ts
    └── data.ts
public/
└── icons/
```

### Where content lives

- `src/lib/data.ts` — projects, experience entries, skills, navigation, social links and contact details. If education is split into its own data set, it belongs here as well.
- `src/app/page.tsx` — hero copy, About copy and the single-page section composition

### Motion and 3D

- `src/components/Motion.tsx` handles GSAP intro, reveal and interaction behavior.
- `src/components/Scene3D.tsx` renders the fixed three.js scene.
- The canvas is decorative and must remain behind the content and non-interactive.
- Reduced-motion preferences are respected.

## Content principles

The writing is intentionally **professional, friendly and direct**.

Project descriptions should explain what was built and the technically meaningful parts of the work without exaggeration. The portfolio avoids generic phrases such as "passionate developer", "innovative solutions" and similar résumé/agency language.

Content rules:

- no invented metrics, clients, outcomes, dates or technologies;
- concrete engineering details are preferred over adjectives;
- personal contribution should not be overstated;
- ongoing project dates use `YYYY — Present` when timeline context is shown;
- the first formal degree reference should be `Bachelor of Science in Information Technology (BSIT)`; compact UI labels may use `BSIT · UMT`;
- education and work experience should remain conceptually distinct;
- skills should represent technologies that can be defended in a real technical conversation.

The goal is for the site to sound like a developer talking about his work, not someone reading a LinkedIn profile aloud.

## Design principles

- Minimal, editorial and technical rather than decorative.
- Strong hierarchy and generous whitespace.
- One restrained accent color.
- Motion supports continuity and feedback; it should not compete with the content.
- The wireframe object is a signature visual, but text legibility and performance take priority.
- Responsive down to small mobile screens with no horizontal page scrolling.
- Light and dark modes follow the system preference.

## Deployment

The project is Vercel-ready.

Typical deployment flow:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Build with the default Next.js settings.
4. Connect a custom domain in Vercel when available.

No environment variables are currently required.

## Repository guidance for coding agents

AI coding agents should read [`AGENTS.md`](./AGENTS.md) before making changes. Claude Code also reads [`CLAUDE.md`](./CLAUDE.md).

Those files contain the current architecture rules, animation constraints, content-writing standards and verification checklist for this project.
