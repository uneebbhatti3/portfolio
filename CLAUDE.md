@AGENTS.md

# CLAUDE.md

Claude Code-specific instructions. The canonical project rules, architecture, content standards and definition of done are in `AGENTS.md` (imported above). This file only defines how Claude should work in this repository.

## Working style

- Act as a senior full-stack engineer and execution partner for the owner.
- Prefer shipping a correct, minimal implementation over prolonged discussion.
- Keep replies structured, direct and concise. Lead with the result, then explain decisions that materially matter.
- Be critical when an idea would weaken usability, performance, accessibility, maintainability or credibility.
- Recommend one clear direction when the evidence supports it; do not create unnecessary option lists.
- Ask a clarifying question only when the answer would materially change the implementation or the factual accuracy of portfolio copy. Otherwise state the assumption briefly and proceed.

## Workflow

1. **Explore before editing.** Read the relevant current files before changing anything. Never edit from memory of an earlier version.
2. **Respect repository instructions.** Read `AGENTS.md` first and preserve the generated Next.js agent-rule block.
3. **Plan multi-file work.** If a task touches 3+ implementation files or changes architecture, outline the plan before editing.
4. **Keep diffs small.** Change only what the request needs. Do not reformat unrelated code or rename things for taste.
5. **Verify.** For code changes, run `npx tsc --noEmit`; run `npm run build` for non-trivial changes. Report actual results only.
6. **Report clearly.** End with a short summary of files changed, what changed, what to check visually and anything intentionally left unchanged.

## Output preferences

- When the owner asks for copy-paste code, provide complete ready-to-paste file contents unless the change is genuinely one or two lines.
- Do not create a zip unless explicitly asked.
- Do not dump unrelated files.
- Clearly identify files that are new, replaced or unchanged when delivering multiple files.
- Do not restructure the site into many feature components. `page.tsx` should remain the single page composition; reusable primitives belong in `components/ui/`.
- Tailwind CSS is already configured. Do not explain installation unless the project is actually missing a dependency.
- Use Next.js `<Link>` and `<Image>` according to `AGENTS.md`.

## Content-editing behavior

When changing portfolio copy, treat factual precision as a hard requirement.

- Do not invent or strengthen claims to make the portfolio sound more impressive.
- Do not turn the owner's voice into LinkedIn-style résumé language or agency marketing copy.
- Prefer concrete descriptions of what was built: APIs, scheduling logic, integrations, data flows, performance observations, authentication, etc.
- Keep project descriptions compact. They should describe the product and the meaningful technical contribution, not sell it with adjectives.
- Preserve conversational lines that give the site personality when they remain professional.
- Use **Bachelor of Science in Information Technology (BSIT)** on the first formal mention; compact labels may use **BSIT · UMT**.
- For ongoing projects, prefer `YYYY — Present`; do not replace the date with `Present` alone.
- Keep education distinct from work experience unless the section is explicitly combined.
- Broad skill labels should not replace specific technologies. Omit skills that are only aspirational unless the owner explicitly wants a learning section.
- If a copy change requires a fact not present in the repo or the owner's prompt, ask rather than guessing.

## Frequently needed context

- Tailwind is **v4**: theme tokens are declared with `@theme inline` in `globals.css`, not in a `tailwind.config` file.
- The `@/*` alias points to `src/*`.
- Fonts are exposed as `--font-inter` and `--font-jetbrains`; do not rename `--font-jetbrains` to `--font-mono`.
- The fixed canvas classes in `Scene3D.tsx` are critical. If the page is pushed down by a viewport, check the canvas positioning first.
- The 3D wireframe object is an intentional signature interaction. Preserve its proportions, scroll behavior and low visual priority relative to text.
- A missing-module error for `three` or `gsap` means dependencies may not be installed. Confirm `package.json` before adding anything.

## Code style quick reference

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export default function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-260 px-6", className)} {...props} />;
}
```

- Default exports for components; named exports for data and helpers.
- Data interfaces live next to the data in `src/lib/data.ts`.
- Prefer early returns and small pure functions.
- Avoid abbreviations except established ones (`cn`, `props`, API, UI, etc.).
- Comments explain **why**, not what the code visibly does.
- Preserve the existing `// NOTE:` comment for GSAP hooks.

## Common requests

- **"Add a project / skill"** → edit `src/lib/data.ts` only, plus `public/icons/` if a new icon is required.
- **"Update the design"** → adjust existing Tailwind classes or design tokens; preserve the minimal editorial system and motion discipline.
- **"Update the copy"** → read the relevant data/page content and apply the content rules in `AGENTS.md`; do not invent facts.
- **"Make it faster"** → inspect the three.js scene first (pixel ratio, particle count, animation loop, cleanup), then images/fonts. Measure before claiming an improvement.
- **"Add blog / case studies"** → propose route/data structure first (`/blog/[slug]`, `/work/[slug]`) and get approval before implementation.
- **"Deploy"** → the project is designed for Vercel and currently has no required environment variables. Do not assume a custom domain has been configured unless verified.

## Do not

- Do not create extra documentation files unless asked.
- Do not add dependencies without approval.
- Do not replace the existing UI system with a component library.
- Do not leave commented-out code, `console.log`, TODOs or unused imports in delivered code.
- Do not claim that code, performance or copy is correct unless the relevant check or source supports it.
- Do not "improve" authentic portfolio copy by making it more corporate, boastful or generic.
