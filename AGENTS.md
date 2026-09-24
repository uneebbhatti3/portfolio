<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Instructions for AI coding agents (Claude Code, Cursor, Codex, Copilot, etc.) working in this repository.
Read this file fully before making changes. When a rule here conflicts with an agent's defaults, this file wins.

## 1. Project overview

Personal portfolio website for **Uneeb Bhatti**, a full-stack developer based in Lahore, Pakistan.
The site is a single-page, minimal, professional and interactive portfolio with a GSAP-driven intro, scroll animations and a fixed three.js background scene.

- **Primary goal:** help clients, recruiters and collaborators quickly understand what Uneeb builds, how he works and how to contact him.
- **Current deployment:** Vercel (`https://uneebbhatti.vercel.app`). A custom domain may be connected separately; do not assume one unless it is already configured in the repository or explicitly provided by the owner.
- **Audience:** technical recruiters, startups, freelance clients and other developers.
- **Product principle:** clarity, speed and credibility matter more than visual novelty or marketing language.

## 2. Tech stack

| Area            | Choice                                                                          |
| --------------- | ------------------------------------------------------------------------------- |
| Framework       | Next.js 15, App Router, React 19                                                |
| Language        | TypeScript, `strict` mode                                                       |
| Styling         | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)                     |
| Animation       | GSAP 3.12 + `ScrollTrigger`                                                     |
| 3D              | three.js (`three` + `@types/three`)                                             |
| Fonts           | `next/font/google`: Inter (`--font-inter`), JetBrains Mono (`--font-jetbrains`) |
| Package manager | npm                                                                             |

There is no backend, database, auth or environment variable in this project. Do not add any without being asked.

## 3. Commands

```bash
npm install          # install dependencies
npm run dev          # dev server on http://localhost:3000
npm run build        # production build (must pass before finishing a task)
npm run start        # serve the production build
npx tsc --noEmit     # type-check only (run after every code change)
npm run lint         # only if ESLint is configured in this repo
```

## 4. Project structure

```text
src/
├── app/
│   ├── globals.css        # Tailwind import, theme tokens, @theme mapping. Nothing else.
│   ├── layout.tsx         # fonts, metadata, viewport, <html>/<body> classes
│   └── page.tsx           # ONLY the Home function (all page content lives here)
├── components/
│   ├── Scene3D.tsx        # "use client": fixed three.js canvas
│   ├── Motion.tsx         # "use client": GSAP intro, scroll reveals, magnetic buttons
│   └── ui/                # reusable primitives only (see section 6)
│       ├── Badge.tsx  Button.tsx  Chip.tsx  Container.tsx
│       ├── Section.tsx  SectionHeading.tsx  Tag.tsx  TwoColumn.tsx
└── lib/
    ├── cn.ts              # class-name joiner
    └── data.ts            # projects, experience, skills, links, contact
public/
└── icons/                 # skill SVGs
```

The `@/*` path alias maps to `./src/*`.

## 5. Hard rules

### 5.1 Links and images

- **Never use a raw `<a>` tag.** Use `next/link` (`<Link>`) for internal anchors, external URLs and `mailto:` links.
- External links need `target="_blank"` and `rel="noopener noreferrer"` where appropriate.
- **Never use a raw `<img>` tag.** Use `next/image` (`<Image>`) with explicit dimensions or `fill` inside a sized parent.
- Decorative images use `alt=""`; meaningful images need concise, useful alt text.
- Follow the installed Next.js documentation for framework APIs. Do not guess based on older Next.js versions.

### 5.2 Page and component structure

- **`src/app/page.tsx` contains only the `Home` function**, with nav, hero, work, about, experience/education, skills, contact and footer written inline.
- **Do not turn every section into a component.** Do not create `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `ProjectCard.tsx` and similar files unless the owner explicitly asks for a structural refactor.
- Extract only genuinely reusable UI primitives into `src/components/ui/`.
- A primitive should be reused in 2+ places or clearly represent a reusable styled element.
- Structured content data belongs in `src/lib/data.ts` with exported TypeScript interfaces.
- Long-form copy such as the hero and About paragraphs stays inline in `page.tsx` unless the owner asks to centralize it.

### 5.3 Server vs client components

- Everything is a **Server Component by default**.
- Add `"use client"` only when browser APIs, state or effects are required.
- Currently only `Scene3D.tsx` and `Motion.tsx` should be client components. Do not add `"use client"` to `page.tsx` or UI primitives without a real need.
- Client components must clean up after themselves: cancel `requestAnimationFrame`, remove listeners, kill GSAP tweens/ScrollTriggers and dispose of three.js geometries, materials and renderer resources.

### 5.4 Styling

- **Tailwind utility classes only.** Do not add CSS modules, component stylesheets or inline style objects for values Tailwind can express.
- `globals.css` should remain focused on imports, design tokens, `@theme inline` mapping and global accessibility/reduced-motion rules.
- Use semantic color utilities backed by CSS variables: `bg-bg`, `text-fg`, `text-mut`, `border-line`, `bg-chip`, `text-acc`.
- Do not hardcode component colors unless the existing design intentionally requires a documented exception.
- Compose classes with `cn()` from `@/lib/cn`.
- Avoid `!important`; add or extend a component variant instead.
- Dark mode follows `prefers-color-scheme` through design tokens.
- Mobile-first, responsive down to 375px, and never introduce page-level horizontal scrolling.
- Respect safe-area insets on notched devices.

### 5.5 GSAP hooks (critical)

`Motion.tsx` selects elements by class name and id. These hooks have no CSS meaning on their own but must not be removed or renamed accidentally:

| Hook                                                 | Purpose                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| `#h1` and `.w` (word wrappers, with an inner `span`) | masked word reveal on the hero title                                 |
| `.hero`                                              | marks the hero section (excluded from scroll-reveal batch)           |
| `.rv`                                                | element fades/slides in (intro for hero, scroll-triggered elsewhere) |
| `.mag`                                               | magnetic hover effect (used by `Button`)                             |

If a hook changes, update `Motion.tsx` in the same change.

### 5.6 The 3D scene

- `Scene3D` renders a fixed full-screen canvas. Keep `pointer-events-none fixed inset-0 z-0 size-full` (or the exact equivalent already in the file).
- The scene reads the accent color from `--acc` and reacts to scroll and pointer movement.
- The wireframe object is a signature visual, but it remains secondary to portfolio content.
- Preserve the object's aspect ratio. Do not create distortion by independently stretching X/Y scale unless explicitly requested.
- The scene may move and rotate with scroll, but it should not reduce text legibility or cover important content aggressively.
- Keep particle density and opacity restrained, especially on narrow screens.
- Stacking order remains: canvas behind content, navbar above content.
- Reduced-motion users must receive a usable static page.

## 6. Reusable UI primitives (`src/components/ui/`)

| Component        | Purpose                                                                       |
| ---------------- | ----------------------------------------------------------------------------- |
| `Container`      | centered page wrapper                                                         |
| `Section`        | vertical spacing presets                                                      |
| `TwoColumn`      | title column + content column, stacks on mobile                               |
| `SectionHeading` | section heading, including reveal hook where appropriate                      |
| `Button`         | pill link built on `<Link>`, primary/secondary variants, magnetic hook        |
| `Tag`            | compact mono project technology tag                                           |
| `Chip`           | larger skill pill with optional icon                                          |
| `Badge`          | bordered status pill, optionally with a status dot                            |

When creating or changing a primitive:

- type props;
- spread remaining props onto the root where appropriate;
- merge `className` with `cn()`;
- keep business/domain content out of the primitive.

## 7. Design and motion principles

Aesthetic: **minimal, professional, editorial and technical**. One accent color, generous whitespace, strong typography, mono metadata and restrained interaction.

Motion rules:

- Use the shared easing `ease-emil` (`cubic-bezier(.23,1,.32,1)`) for UI transitions. GSAP uses `expo.out` / `power3.out` unless the current implementation establishes a better local choice.
- UI transitions stay under 300ms; entrance animations may be longer.
- Never use `transition: all`; name the animated properties.
- Prefer transform and opacity for animation.
- Pressable elements should provide subtle active feedback.
- Hover must never be required to access information or functionality.
- Respect `prefers-reduced-motion` in CSS, GSAP and three.js behavior.
- Never start an element from `scale(0)`; use subtle scale offsets if scale is needed.
- Do not add motion simply because the site is interactive. Every effect should reinforce hierarchy, continuity or feedback.

## 8. UI design skill guidance

For UI, interaction and animation work, follow the design-engineering skills from **Emil Kowalski's `emilkowalski/skills` repository**: https://github.com/emilkowalski/skills. These skills are a project-level design reference, not optional inspiration. Use them when proposing, implementing or reviewing UI changes.

Install them in an agent environment when available:

```bash
npx skills@latest add emilkowalski/skills
```

Apply the relevant skill rather than relying on generic AI design instincts:

- **`emil-design-eng`** — default reference for UI polish, interaction design and animation decisions.
- **`animate`** — use when creating an animation from scratch; choose intentional easing, duration and animated properties.
- **`review-animations`** — use when reviewing an existing interaction or animation for quality issues.
- **`improve-animations`** — use for a broader animation audit and prioritized improvements.
- **`find-animation-opportunities`** — use to identify motion that genuinely improves hierarchy, continuity or feedback; do not animate elements just because they can be animated.
- **`animation-vocabulary`** — use precise animation terminology when specifying or discussing motion.
- **`apple-design`** — use as an additional reference for fluid, high-quality interface behavior where relevant.
- **`prototype`** — use when the task benefits from comparing materially different UI approaches before committing to one.
- **`mobile-native`** — use for mobile interaction details such as hover/tap behavior, viewport sizing, safe areas and perceived responsiveness.
- **`pick-ui-library`** — consult before introducing a UI dependency; repository rules still require owner approval before adding dependencies.

Project-specific rules in this file still take precedence. In particular:

- preserve the existing minimal, editorial visual language rather than redesigning the site into a generic SaaS interface;
- preserve the three.js wireframe object as a signature interaction unless the owner explicitly asks to replace it;
- keep motion restrained, performant and compatible with `prefers-reduced-motion`;
- do not copy a visual treatment merely because it appears in a skill example; apply the underlying interaction/design principle to this portfolio;
- if a skill recommendation conflicts with accessibility, performance, the existing architecture or an explicit owner request, follow the project constraint and explain the trade-off.

## 9. Content and copywriting rules

Content is part of the product. Treat wording changes with the same care as code changes.

### 8.1 Voice

The portfolio should sound like a capable developer explaining his work to another person, **not like a LinkedIn profile, agency landing page or AI-generated résumé**.

Use a tone that is:

- professional but friendly;
- concise but not cold;
- confident without self-promotion;
- technically specific where useful;
- natural enough to sound spoken by the owner.

Avoid:

- corporate filler such as "passionate developer", "innovative solutions", "cutting-edge", "world-class", "results-driven", "dynamic professional" or similar clichés;
- startup/marketing hype when a plain description is more accurate;
- exaggerated leadership, ownership or impact claims;
- inflated adjectives where a concrete fact would be stronger;
- wording that reads like a résumé bullet unless the section is explicitly résumé-like.

### 8.2 Accuracy and evidence

- **Never invent facts.** No fake metrics, clients, testimonials, dates, technologies, user counts, revenue, performance numbers or project outcomes.
- Do not imply causation that is not supported. Example: "built to improve credibility" is acceptable as intent; "increased buyer trust" requires evidence.
- Metrics need context. If a Lighthouse score was observed in testing, phrase it as such rather than as a permanent guarantee.
- Distinguish personal contribution from team/project scope. Do not imply the owner architected or built an entire system if he contributed to only part of it.
- If a factual claim is not already supported by the repository or the owner's prompt, ask before adding it.

### 8.3 Project descriptions

Project copy should answer as many of these as possible in one concise sentence:

1. What is the product/site?
2. Who or what is it for?
3. What technically meaningful thing did Uneeb build or contribute?
4. Is there a concrete integration, constraint or measurable result worth mentioning?

Prefer concrete engineering language such as:

- duration-based scheduling;
- live slot availability;
- REST APIs;
- JWT authentication;
- HubSpot lead capture;
- PostgreSQL / Prisma;
- AI assistant backed by application data.

Avoid vague labels such as "AI-powered", "SEO-friendly" or "scalable" unless the sentence explains what that means or the claim is supported.

Keep project descriptions to **one compact sentence or at most two short sentences**. Do not turn cards/rows into case studies.

### 8.4 Personal/About copy

- Preserve first-person voice and small amounts of personality.
- The About section may be conversational, but it should still communicate how the owner thinks and works.
- Prefer specific phrasing like "I enjoy the whole loop: shaping the idea, designing the experience, building the backend and shipping" over generic self-descriptions.
- Do not remove distinctive lines merely to make the copy more corporate.
- Keep the distinction between current ability and current learning. Phrases such as "going deeper into backend engineering and system design" are preferred over pretending mastery.

### 8.5 Education, dates and titles

- On first formal mention, use **Bachelor of Science in Information Technology (BSIT)**. Compact UI labels may use **BSIT · UMT** afterwards.
- Education should not be presented as employment. Keep `experience` and `education` separate in data or label the combined section explicitly.
- For actively developed projects, use `YYYY — Present` when showing a timeline. Do not use `Present` alone because it removes the starting context.
- For completed or point-in-time projects, a single year is enough.
- Job/founder titles must reflect actual work. Prefer a more descriptive title only when it is factually accurate.

### 8.6 Skills

- Skills should represent technologies the owner can reasonably be asked to work with.
- Do not pad skill groups to look larger.
- Prefer specific technologies (`Vercel AI SDK`, `Google ADK`) over broad labels (`Generative AI`) unless the broad label communicates a real, defensible capability.
- Technologies still being explored should not be presented as established expertise. Either label them clearly or omit them from the main skills list until used meaningfully.

### 8.7 Contact copy

- Be open and approachable without sounding desperate or overly sales-oriented.
- It is fine to discourage unsolicited sales, but phrase it professionally (for example, "No sales pitches, please") rather than aggressively.
- Do not promise response times unless the owner has explicitly provided one.

### 8.8 Personal details

- Email, WhatsApp, GitHub, LinkedIn and similar links live in `src/lib/data.ts` under `contact` / `socialLinks`.
- Do not duplicate personal details in multiple files unless required by metadata or a specific feature.

## 10. Common tasks

**Add a project:** append an object to `projects` in `src/lib/data.ts` (`title`, `year`, `href`, `desc`, `tags`). The list in `page.tsx` renders it automatically. Follow section 9 for wording and date format.

**Add a skill:** add `{ label, icon, mono? }` to the correct group in `skillGroups`. Put the SVG at `public/icons/<icon>.svg`. If the icon is black, set `mono: true` so it remains visible in dark mode.

**Add education / refactor education:** keep education separate from work experience unless the UI section is intentionally named "Experience & Education". If the current data still stores education inside `experience`, split it only when the requested change includes that content/structure update.

**Add a section:** add a `<Section id="...">` block inline in `page.tsx`, use existing layout primitives and add the navigation link only if it helps users reach important content.

**Change the accent color or theme:** edit the design tokens in `globals.css`. `Scene3D` should continue reading `--acc`.

**Change the 3D scene:** edit `components/Scene3D.tsx` only unless the request explicitly involves motion coordination. Preserve cleanup, accessibility and canvas positioning.

**Change copy:** read both `src/lib/data.ts` and the relevant `page.tsx` section first. Preserve verified facts and the owner's voice. Do not introduce stronger claims simply to make the writing sound more impressive.

## 11. Definition of done

Before saying a code task is finished, verify all applicable items:

1. `npx tsc --noEmit` passes with no errors.
2. `npm run build` passes with no warnings introduced by the change.
3. No raw `<a>` or `<img>` tags were introduced.
4. The page works in both light and dark mode.
5. Layout holds at 375px, 768px and 1280px with no horizontal scroll.
6. Hero reveal, scroll reveals and the 3D scene still behave correctly.
7. No console errors or hydration warnings were introduced.
8. `prefers-reduced-motion: reduce` still produces a usable static page.
9. Keyboard focus is visible and interactive elements are reachable with Tab.
10. New or edited content contains no unsupported claims.

For copy-only changes, TypeScript/build checks are required only when source files were changed; markdown-only documentation edits do not require an application build.

## 12. Boundaries

### Always

- Read a file before editing it.
- Keep diffs small and focused on the request.
- Match the existing TypeScript/code style: named interfaces, double quotes, semicolons and `cn()` for class composition.
- Keep components accessible: semantic elements, one `h1`, ordered headings, meaningful labels and appropriate alt text.
- Preserve the owner's established voice when editing copy.

### Ask first

- Adding or upgrading dependencies.
- Restructuring folders, renaming animation hooks or changing design tokens.
- Adding routes, a blog, CMS, analytics, contact form or backend.
- Adding metrics, client claims, results or technologies that are not already verified.
- Making major visual changes to the 3D scene or removing the signature scroll interaction.

### Never

- Commit secrets, tokens or `.env` files.
- Use `localStorage` for critical data.
- Fetch third-party scripts at runtime without approval.
- Delete GSAP hook classes or the canvas positioning classes accidentally.
- Add heavy images, videos or 3D models without approval.
- Rewrite authentic copy into generic corporate language.
- Claim something works unless it was actually verified.

## 13. Git conventions

- Small, focused commits using Conventional Commits: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`.
- One concern per commit. Do not mix unrelated content edits and refactors.
- Branch names: `feat/<topic>`, `fix/<topic>`.
