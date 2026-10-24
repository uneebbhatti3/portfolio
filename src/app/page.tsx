import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import Motion from '@/components/Motion';
import Scene3D from '@/components/Scene3D';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Chip from '@/components/ui/chip';
import Container from '@/components/ui/container';
import SectionHeading from '@/components/ui/section-heading';
import Tag from '@/components/ui/tag';
import { cn } from '@/lib/cn';
import {
  contact,
  education,
  experience,
  navLinks,
  projects,
  skillGroups,
  socialLinks,
} from '@/lib/data';

// Motion.tsx depends on .hero, #h1, .w, .rv and .mag.
export default function Home() {
  const marqueeSkills = skillGroups.flatMap((group) => group.items);

  return (
    <div className="relative min-h-screen overflow-x-clip selection:bg-acc selection:text-bg">
      <Scene3D />
      <Motion />

      <header className="fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+12px)] z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border border-line bg-card py-2 pr-2 pl-5 shadow-[0_8px_30px_rgba(0,0,0,.08)] backdrop-blur-xl">
          <Link
            href="#top"
            className="font-mono text-sm font-semibold tracking-[-.04em]"
            aria-label="Uneeb Bhatti, back to top"
          >
            uneeb<span className="text-acc">.</span>bhatti
          </Link>
          <div className="flex items-center gap-1">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hidden rounded-full px-3.5 py-2 text-sm text-mut transition-colors duration-200 hover:bg-chip hover:text-fg sm:inline"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="#contact"
              variant="primary"
              className="ml-1 px-4 py-2"
            >
              Let&apos;s talk
            </Button>
          </div>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section
          className="hero flex min-h-svh flex-col justify-center pt-32 pb-16 sm:pt-40"
          aria-labelledby="h1"
        >
          <Container className="flex flex-col items-center text-center">
            <div className="rv mb-8 flex items-center gap-3">
              <Image
                src="/me.jpeg"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full border border-line object-cover"
              />
              <Badge>Based in Lahore, Pakistan</Badge>
            </div>
            <p className="rv mb-3 text-lg text-mut sm:text-xl">Hey, I&apos;m</p>
            <h1
              id="h1"
              className="text-[clamp(3.5rem,13vw,9.5rem)] leading-[.9] font-semibold tracking-[-.065em]"
            >
              <span className="w inline-block overflow-hidden pb-[.08em]">
                <span className="inline-block">Uneeb</span>
              </span>{' '}
              <span className="w inline-block overflow-hidden pb-[.08em]">
                <span className="inline-block">
                  Bhatti<span className="text-acc">.</span>
                </span>
              </span>
            </h1>
            <p className="rv mt-6 text-[clamp(1.35rem,3vw,2rem)] leading-tight font-medium tracking-[-.035em]">
              Interfaces you can use.{' '}
              <span className="text-mut">Systems you can rely on.</span>
            </p>
            <p className="rv mt-5 max-w-xl text-[15px] leading-7 text-mut sm:text-base">
              I build web products end to end with Next.js, TypeScript and
              Node.js. Currently learning more about backend engineering and AI
              integrations.
            </p>
            <div className="rv mt-9 flex flex-wrap justify-center gap-3">
              <Button href="#work" variant="primary">
                See my work{' '}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Button>
              <Button href={`mailto:${contact.email}`}>
                <Mail aria-hidden="true" className="size-4" /> Email me
              </Button>
            </div>
            <div className="rv mt-10 flex flex-wrap justify-center gap-2 font-mono text-[11px] tracking-widest text-mut uppercase">
              <span>Full-stack developer</span>
              <span aria-hidden="true">·</span>
              <span>Product-minded</span>
              <span aria-hidden="true">·</span>
              <span>Backend curious</span>
            </div>
          </Container>
        </section>

        <section
          className="relative overflow-hidden border-y border-line bg-card py-5 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          aria-label="Technologies I work with"
        >
          <div
            className="portfolio-marquee-track flex w-max"
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                {marqueeSkills.map((skill) => (
                  <span
                    key={skill.label}
                    className="flex shrink-0 items-center gap-2.5 text-sm text-mut"
                  >
                    <Image
                      src={`/icons/${skill.icon}.svg`}
                      alt=""
                      width={20}
                      height={20}
                      className={cn('size-5', skill.mono && 'dark:invert')}
                    />
                    {skill.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-24 py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="Selected work"
              aside="A mix of independent products, client work and engineering contributions. Every project came with a different problem to solve."
            >
              Not just
              <br />
              <span className="text-mut">a concept.</span>
            </SectionHeading>

            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv group flex flex-col overflow-hidden rounded-3xl border border-line bg-card p-3 transition-[border-color] duration-200 hover:border-mut"
                >
                  {project.image && (
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-chip">
                      <Image
                        src={project.image}
                        alt={`Preview of ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 560px"
                        className={cn(
                          'transition-transform duration-300 ease-emil group-hover:scale-[1.03]',
                          project.cutout
                            ? 'object-contain p-6'
                            : 'object-cover object-left-top',
                        )}
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-5 p-4 sm:p-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-semibold tracking-[-.04em]">
                          {project.title}
                        </h3>
                        <span className="flex items-center gap-2 font-mono text-xs text-mut">
                          {project.year}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 transition-[transform,color] duration-200 ease-emil group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                          />
                        </span>
                      </div>
                      <p className="text-[15px] leading-7 text-mut">
                        {project.desc}
                      </p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="about"
          className="scroll-mt-24 py-24 sm:py-32"
          aria-labelledby="about-title"
        >
          <Container>
            <SectionHeading eyebrow="A little about me" id="about-title">
              Curiosity
              <br />
              meets <span className="text-mut">code.</span>
            </SectionHeading>

            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="group min-h-105 p-0 sm:p-0 lg:row-span-2">
                <Image
                  src="/me.jpeg"
                  alt="Portrait of Uneeb Bhatti"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-6 text-[15px] leading-6 text-white sm:p-8">
                  I like understanding the whole problem, not just the part
                  visible on screen.
                </p>
              </Card>

              <Card className="lg:col-span-2">
                <div className="max-w-2xl space-y-5 text-[15px] leading-7 text-mut sm:text-base sm:leading-8">
                  <p className="text-fg">
                    Once an idea gets stuck in my head, I usually end up
                    building it. Some stay weekend experiments; a few turn into
                    real products.
                  </p>
                  <p>
                    I&apos;m studying for a Bachelor of Science in Information
                    Technology at UMT. I enjoy the entire process: shaping the
                    experience, building the backend, and learning what it takes
                    to make software work beyond the happy path.
                  </p>
                </div>
              </Card>

              <Card className="flex flex-col justify-between gap-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/acm.jpg"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full border border-line object-cover"
                  />
                  <Image
                    src="/techverse.jpg"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full border border-line object-cover"
                  />
                </div>
                <p className="text-[15px] leading-7 text-mut">
                  As{' '}
                  <span className="text-fg">
                    Web Development Lead at UMT ACM
                  </span>
                  , I run workshops for students who want to move beyond
                  tutorials. I&apos;ve also helped organize TechVerse, a 12-hour
                  hackathon, and competed at Softcom &apos;25.
                </p>
              </Card>

              <Card className="flex flex-col justify-between gap-8">
                <MapPin aria-hidden="true" className="size-6 text-acc" />
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-mut uppercase">
                    Based in
                  </p>
                  <p className="mt-1 text-xl font-medium tracking-[-.03em]">
                    Lahore, Pakistan
                  </p>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <section className="py-24 sm:py-32" aria-labelledby="journey-title">
          <Container>
            <SectionHeading eyebrow="The journey" id="journey-title">
              Work, learn, <span className="text-mut">repeat.</span>
            </SectionHeading>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <h3 className="mb-6 font-mono text-xs tracking-[.14em] text-mut uppercase">
                  Experience
                </h3>
                <ul className="grid gap-3">
                  {experience.map((entry) => (
                    <li
                      key={`${entry.role}-${entry.org}`}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-chip p-4"
                    >
                      {entry.logo && (
                        <Image
                          src={entry.logo}
                          alt=""
                          width={44}
                          height={44}
                          className="size-11 shrink-0 rounded-xl border border-line bg-white object-contain p-1"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{entry.role}</p>
                        <p className="text-sm text-mut">{entry.org}</p>
                        <p className="mt-1 font-mono text-[11px] text-mut sm:hidden">
                          {entry.when}
                        </p>
                      </div>
                      <span className="hidden shrink-0 font-mono text-[11px] text-mut sm:block">
                        {entry.when}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="mb-6 font-mono text-xs tracking-[.14em] text-mut uppercase">
                  Education
                </h3>
                <ul className="grid gap-3">
                  {education.map((entry) => (
                    <li
                      key={entry.degree}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-chip p-4"
                    >
                      {entry.logo && (
                        <Image
                          src={entry.logo}
                          alt=""
                          width={44}
                          height={44}
                          className="size-11 shrink-0 rounded-xl border border-line bg-white object-contain p-1"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{entry.degree}</p>
                        <p className="text-sm text-mut">{entry.institution}</p>
                        <p className="mt-1 font-mono text-[11px] text-mut sm:hidden">
                          {entry.year}
                        </p>
                      </div>
                      <span className="hidden shrink-0 font-mono text-[11px] text-mut sm:block">
                        {entry.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </section>

        <section
          id="skills"
          className="scroll-mt-24 py-24 sm:py-32"
          aria-labelledby="skills-title"
        >
          <Container>
            <SectionHeading
              eyebrow="The toolkit"
              id="skills-title"
              aside="From interface details to data models and AI integrations. These are tools I use or am actively learning, not a list of everything I've heard of."
            >
              The right
              <br />
              <span className="text-mut">tool matters.</span>
            </SectionHeading>

            <div className="grid gap-4 md:grid-cols-2">
              {skillGroups.map((group, index) => (
                <Card key={group.name}>
                  <div className="mb-6 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-[-.04em]">
                      {group.name}
                    </h3>
                    <span className="font-mono text-xs text-mut">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <Chip
                        key={skill.label}
                        icon={skill.icon}
                        mono={skill.mono}
                      >
                        {skill.label}
                      </Chip>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 pt-12 pb-24 sm:pb-32"
          aria-labelledby="contact-title"
        >
          <Container>
            <Card className="px-6 py-16 text-center sm:px-12 sm:py-24">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,color-mix(in_oklab,var(--acc)_25%,transparent),transparent)]"
              />
              <div className="relative flex flex-col items-center">
                <p className="mb-4 font-mono text-xs tracking-[.14em] text-acc uppercase">
                  Have a project in mind?
                </p>
                <h2
                  id="contact-title"
                  className="text-[clamp(2.75rem,8vw,6rem)] leading-[.95] font-semibold tracking-[-.06em]"
                >
                  Let&apos;s make it <span className="text-mut">real.</span>
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-7 text-mut sm:text-base">
                  Want to talk about a project, a developer role, or engineering
                  work? Email or WhatsApp works best.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Button href={`mailto:${contact.email}`} variant="primary">
                    <Mail aria-hidden="true" className="size-4" />
                    {contact.email}
                  </Button>
                  <Button
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden="true" className="size-4" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line py-8">
        <Container className="flex flex-wrap items-center justify-between gap-5 font-mono text-[11px] tracking-[.12em] text-mut uppercase">
          <span>© {new Date().getFullYear()} Uneeb Bhatti</span>
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-fg"
              >
                {social.label} ↗
              </Link>
            ))}
          </div>
          <Link
            href="#top"
            className="transition-colors duration-200 hover:text-fg"
          >
            Back to top ↑
          </Link>
        </Container>
      </footer>
    </div>
  );
}
