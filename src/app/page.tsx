import Image from 'next/image';
import Link from 'next/link';
import Motion from '@/components/Motion';
import Scene3D from '@/components/Scene3D';
import {
  contact,
  experience,
  projects,
  skillGroups,
  socialLinks,
} from '@/lib/data';

// The existing Motion component depends on .hero, #h1, .w, .rv, and .mag.
// All visual project previews below are editorial illustrations, not product screenshots.
export default function Home() {
  const featured = projects[0];
  const others = projects.slice(1);
  const workExperience = experience.filter((entry) => entry.role !== 'BSIT');
  const education = experience.find((entry) => entry.role === 'BSIT');

  return (
    <div className="min-h-screen overflow-x-clip bg-[#090909] text-[#efefed] selection:bg-white selection:text-black">
      <Scene3D />
      <Motion />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090909]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-375 items-center justify-between gap-5 px-5 py-4 sm:px-9 lg:px-14">
          <Link
            href="#top"
            className="font-mono text-sm font-semibold tracking-[-.04em]"
            aria-label="Uneeb Bhatti, back to top"
          >
            uneeb<span className="text-neutral-500">.</span>bhatti
          </Link>
          <div className="flex items-center gap-5 text-xs font-medium text-neutral-400 sm:gap-9">
            <Link
              href="#work"
              className="hidden sm:inline transition-colors hover:text-white"
            >
              Work
            </Link>
            <Link
              href="#about"
              className="hidden sm:inline transition-colors hover:text-white"
            >
              About
            </Link>
            <Link
              href="#skills"
              className="hidden sm:inline transition-colors hover:text-white"
            >
              Toolkit
            </Link>
            <Link
              href="#contact"
              className="mag border border-white/30 px-4 py-2.5 text-white transition-colors hover:bg-white hover:text-black"
            >
              Let&apos;s talk ↗
            </Link>
          </div>
        </div>
      </nav>

      <main id="top" className="relative z-10">
        {/* HERO: large typography + offset editorial information panel + existing canvas */}
        <section
          className="hero relative flex min-h-svh flex-col justify-between overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-11"
          aria-labelledby="h1"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#090909_0%,rgba(9,9,9,.82)_43%,rgba(9,9,9,.24)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[.13] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[96px_96px] mask-[linear-gradient(to_bottom,black,transparent_92%)]"
          />
          <div className="mx-auto w-full max-w-375 px-5 sm:px-9 lg:px-14">
            <div className="rv mb-12 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.19em] text-neutral-400 sm:mb-16">
              <span className="inline-flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-white shadow-[0_0_12px_white]" />{' '}
                Independent developer / Lahore, PK
              </span>
              <span className="hidden sm:inline">Portfolio — 2026</span>
            </div>
            <div className="relative">
              <p className="rv mb-4 max-w-md text-lg leading-snug text-neutral-300 sm:mb-6 sm:text-2xl">
                Hey, I&apos;m
              </p>
              <h1
                id="h1"
                className="relative max-w-300 text-[clamp(5.5rem,16vw,15rem)] leading-[.76] font-semibold tracking-[-.105em] text-white"
              >
                <span className="w block overflow-hidden pb-[.15em]">
                  <span className="block">Uneeb</span>
                </span>
                <span className="w block overflow-hidden pb-[.15em]">
                  <span className="block">
                    Bhatti<span className="text-neutral-600">.</span>
                  </span>
                </span>
              </h1>
              <div className="rv mt-3 flex max-w-220 flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em] text-neutral-400 sm:mt-7">
                <span className="border border-white/25 px-3 py-2">
                  Full-stack developer
                </span>
                <span className="border border-white/25 px-3 py-2">
                  Product-minded
                </span>
                <span className="border border-white/25 px-3 py-2">
                  Backend curious
                </span>
              </div>
            </div>
            <div className="rv mt-14 grid gap-8 border-t border-white/20 pt-7 sm:mt-20 md:grid-cols-[1fr_1fr] md:gap-20">
              <p className="max-w-150 text-[clamp(1.55rem,3.5vw,3rem)] leading-[1.12] font-medium tracking-[-.055em]">
                Interfaces you can use.
                <br />
                <span className="text-neutral-500">
                  Systems you can rely on.
                </span>
              </p>
              <div className="max-w-md md:justify-self-end">
                <p className="mb-6 text-[15px] leading-7 text-neutral-400">
                  I build web products end to end with Next.js, TypeScript and
                  Node.js. Currently building CodDock and learning more about
                  backend engineering and AI integrations.
                </p>
                <Link
                  href="#work"
                  className="mag inline-flex items-center gap-5 border-b border-white/60 pb-2.5 text-sm font-semibold transition-[gap] hover:gap-8"
                >
                  Explore my work <span aria-hidden="true">↘</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="rv mx-auto mt-20 flex w-full max-w-375 justify-between gap-6 px-5 font-mono text-[10px] uppercase tracking-[.16em] text-neutral-500 sm:px-9 lg:px-14">
            <span>001 / About what I build</span>
            <Link href="#work" className="transition-colors hover:text-white">
              Scroll down ↓
            </Link>
          </div>
        </section>

        {/* INFINITE MARQUEE: uses the existing marquee.css */}
        <section
          className="relative overflow-hidden border-y border-white/15 bg-[#deded9] py-4 text-[#0d0d0d] sm:py-6"
          aria-label="Design, develop and deploy"
        >
          <div
            className="portfolio-marquee-track flex w-max items-center"
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-7 pr-7 sm:gap-12 sm:pr-12"
              >
                {(['DESIGN', 'DEVELOP', 'DEPLOY'] as const).map((word) => (
                  <div
                    key={word}
                    className="flex shrink-0 items-center gap-7 sm:gap-12"
                  >
                    <span className="whitespace-nowrap text-[clamp(2.2rem,5.4vw,5.5rem)] leading-none font-semibold tracking-[-.085em]">
                      {word}
                    </span>
                    <span
                      className="font-mono text-3xl font-normal sm:text-5xl"
                      aria-hidden="true"
                    >
                      ✳
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECT: visually distinctive product concept, not a screenshot */}
        <section
          id="work"
          className="scroll-mt-24 border-b border-white/15 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-375 px-5 sm:px-9 lg:px-14">
            <div className="rv mb-11 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[.16em] text-neutral-500">
              <span>01 / Selected work</span>
              <span>Selected builds &amp; contributions</span>
            </div>
            <div className="rv mb-12 grid items-end gap-8 lg:grid-cols-[1fr_.55fr] lg:gap-20">
              <h2 className="text-[clamp(3.8rem,10vw,10rem)] leading-[.86] font-semibold tracking-[-.09em]">
                Not just
                <br />
                <span className="text-neutral-500">a concept.</span>
              </h2>
              <p className="max-w-md pb-1 text-base leading-7 text-neutral-400">
                A mix of independent products, client work and engineering
                contributions. Every project came with a different problem to
                solve.
              </p>
            </div>
            {featured && (
              <Link
                href={featured.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rv group block overflow-hidden border border-white/20 bg-[#141414] transition-colors hover:border-white/50"
              >
                <div className="grid lg:grid-cols-[.78fr_1.22fr]">
                  <div className="flex flex-col justify-between border-b border-white/15 p-7 sm:p-11 lg:border-r lg:border-b-0 lg:p-14">
                    <div>
                      <div className="mb-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.17em] text-neutral-500">
                        <span>Featured / 001</span>
                        <span>{featured.year}</span>
                      </div>
                      <div className="mb-6 font-mono text-[11px] uppercase tracking-[.13em] text-neutral-400">
                        Developer platform · Independent project
                      </div>
                      <h3 className="mb-7 text-[clamp(3.7rem,7.5vw,8rem)] leading-[.83] font-semibold tracking-[-.095em]">
                        Cod<span className="text-neutral-500">Dock</span>
                        <span className="text-white">.</span>
                      </h3>
                      <p className="max-w-md text-[15px] leading-7 text-neutral-400">
                        {featured.desc}
                      </p>
                    </div>
                    <div className="mt-16">
                      <div className="mb-8 flex flex-wrap gap-2">
                        {featured.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/15 px-3 py-2 font-mono text-[10px] text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-6 border-b border-white/60 pb-2.5 text-sm font-medium transition-[gap] group-hover:gap-10">
                        Explore CodDock <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </div>
                  <div className="relative flex min-h-117.5 items-center justify-center overflow-hidden bg-[#d5d5d0] p-5 text-black sm:min-h-145 sm:p-10">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[.23] bg-[linear-gradient(to_right,#777_1px,transparent_1px),linear-gradient(to_bottom,#777_1px,transparent_1px)] bg-size-[40px_40px]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute top-6 left-7 font-mono text-[10px] tracking-widest text-neutral-600"
                    >
                      FIG 01 — PRODUCT CONCEPT
                    </div>
                    <div className="relative w-full max-w-165 -rotate-3 border border-[#444] bg-[#0c0c0c] text-white shadow-[18px_28px_0_rgba(0,0,0,.12),0_30px_90px_rgba(0,0,0,.3)] transition-transform duration-500 group-hover:rotate-0">
                      <div className="flex items-center justify-between border-b border-white/20 px-5 py-4 font-mono text-[10px] text-neutral-400 sm:px-7">
                        <span className="font-semibold text-white">
                          coddock<span className="text-neutral-500">/</span>
                        </span>
                        <span>LEARN · BUILD · PREPARE</span>
                      </div>
                      <div className="grid gap-6 px-5 py-10 sm:grid-cols-[1.15fr_.85fr] sm:px-8 sm:py-16">
                        <div>
                          <div className="mb-5 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                            Your next step starts here
                          </div>
                          <div className="text-[clamp(2.1rem,4vw,4.3rem)] leading-[.95] font-semibold tracking-[-.075em]">
                            A place to
                            <br />
                            keep{' '}
                            <span className="text-neutral-500">building.</span>
                          </div>
                          <div className="mt-7 inline-block border border-white/50 px-4 py-2 font-mono text-[10px]">
                            EXPLORE ROADMAPS ↗
                          </div>
                        </div>
                        <div className="grid gap-2 self-end">
                          {['01 / LEARN', '02 / BUILD', '03 / PREPARE'].map(
                            (step) => (
                              <div
                                key={step}
                                className="flex items-center justify-between border border-white/20 bg-white/6 p-4 text-[11px]"
                              >
                                <span>{step}</span>
                                <span className="text-neutral-500">↗</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between border-t border-white/20 px-5 py-3 font-mono text-[9px] text-neutral-500 sm:px-7">
                        <span>DEVELOPER GROWTH</span>
                        <span>CONCEPTUAL PREVIEW</span>
                      </div>
                    </div>
                    <div className="absolute right-7 bottom-6 font-mono text-[10px] tracking-widest text-neutral-600">
                      NOT AN APP SCREENSHOT
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {others.map((project, index) => (
                <Link
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv group flex min-h-106.25 flex-col overflow-hidden border border-white/15 bg-[#131313] transition-colors hover:border-white/50"
                >
                  <div
                    className={`relative flex min-h-46.25 items-center justify-center overflow-hidden border-b border-white/15 px-7 py-10 ${index % 2 === 0 ? 'bg-[#222]' : 'bg-[#c9c9c4] text-[#151515]'}`}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[.11] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[38px_38px]"
                    />
                    <div className="relative flex w-full max-w-122.5 items-center justify-between gap-4 border border-current/30 bg-black/10 p-5 sm:p-7">
                      <div>
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest opacity-55">
                          PROJECT / {String(index + 2).padStart(3, '0')}
                        </p>
                        <div className="text-[clamp(2rem,5vw,4rem)] leading-none font-semibold tracking-[-.075em]">
                          {project.title}
                        </div>
                      </div>
                      <span className="text-4xl font-light opacity-60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                        ↗
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute right-4 bottom-3 font-mono text-[9px] uppercase tracking-wider opacity-50"
                    >
                      Project title study
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-7 sm:p-9">
                    <div>
                      <div className="mb-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                        <span>0{index + 2} / Project</span>
                        <span>{project.year}</span>
                      </div>
                      <p className="max-w-xl text-[15px] leading-7 text-neutral-300">
                        {project.desc}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/15 px-2.5 py-1.5 font-mono text-[10px] text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT: striking pale strip + dark editorial content */}
        <section
          id="about"
          className="scroll-mt-24 border-b border-white/15"
          aria-labelledby="about-title"
        >
          <div className="grid lg:grid-cols-[.62fr_1fr]">
            <div className="group relative flex min-h-85 flex-col justify-between overflow-hidden bg-[#171717] p-7 text-white sm:p-12 lg:min-h-165 lg:p-16">
              {/* Background image */}
              <Image
                src="/me.jpeg"
                alt="Portrait of Uneeb Bhatti"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 hover:transition-all"
              />

              {/* Dark gradient for text readability */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/75"
              />

              {/* Section label */}
              <span className="rv relative z-10 font-mono text-[11px] uppercase tracking-[.2em]">
                02 / A little about me
              </span>

              {/* Description */}
              <p className="rv relative z-10 max-w-xs text-sm leading-6 text-white/90">
                I like understanding the whole problem, not just the part
                visible on screen.
              </p>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-12 lg:p-16 xl:p-24">
              <div className="rv">
                <h2
                  id="about-title"
                  className="mb-10 text-[clamp(3.2rem,7vw,7.5rem)] leading-[.9] font-semibold tracking-[-.08em]"
                >
                  Curiosity
                  <br />
                  meets <span className="text-neutral-500">code.</span>
                </h2>
                <div className="max-w-2xl space-y-6 text-[15px] leading-8 text-neutral-400">
                  <p>
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
                  <p>
                    As Web Development Lead at UMT ACM, I run workshops for
                    students who want to move beyond tutorials. I&apos;ve also
                    helped organize TechVerse, a 12-hour hackathon, and competed
                    at Softcom &apos;25.
                  </p>
                </div>
              </div>
              <div className="rv mt-14 grid grid-cols-2 gap-4 border-t border-white/20 pt-7 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                <span>
                  Based in
                  <br />
                  <strong className="mt-2 block font-normal text-sm normal-case tracking-normal text-white">
                    Lahore, Pakistan
                  </strong>
                </span>
                <span>
                  Currently
                  <br />
                  <strong className="mt-2 block font-normal text-sm normal-case tracking-normal text-white">
                    Building CodDock
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY: keep employment separate from education */}
        <section
          className="border-b border-white/15 py-24 sm:py-32"
          aria-labelledby="journey-title"
        >
          <div className="mx-auto max-w-375 px-5 sm:px-9 lg:px-14">
            <div className="rv mb-11 font-mono text-[11px] uppercase tracking-[.17em] text-neutral-500">
              03 / The journey
            </div>
            <div className="grid gap-14 lg:grid-cols-[.9fr_1fr] lg:gap-24">
              <h2
                id="journey-title"
                className="rv text-[clamp(3.7rem,8vw,8.5rem)] leading-[.88] font-semibold tracking-[-.085em]"
              >
                Work,
                <br />
                learn,
                <br />
                <span className="text-neutral-500">repeat.</span>
              </h2>
              <div className="rv">
                <div className="border-t border-white/25">
                  {workExperience.map((entry, index) => (
                    <div
                      key={`${entry.role}-${entry.org}`}
                      className="grid grid-cols-[34px_1fr] gap-4 border-b border-white/15 py-6 sm:grid-cols-[40px_1fr_auto] sm:gap-7"
                    >
                      <span className="pt-1 font-mono text-[11px] text-neutral-500">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="mb-1 text-lg font-medium">
                          {entry.role}
                        </h3>
                        <p className="text-sm text-neutral-500">{entry.org}</p>
                        <span className="mt-2 block font-mono text-[10px] text-neutral-500 sm:hidden">
                          {entry.when}
                        </span>
                      </div>
                      <span className="hidden pt-1 font-mono text-[11px] text-neutral-500 sm:block">
                        {entry.when}
                      </span>
                    </div>
                  ))}
                </div>
                {education && (
                  <div className="mt-12 border-t border-white/25 pt-5">
                    <div className="mb-5 font-mono text-[10px] uppercase tracking-[.19em] text-neutral-500">
                      Education
                    </div>
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-medium">
                          Bachelor of Science in Information Technology
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          {education.org}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-500">
                        {education.when}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* TOOLKIT: all current icon assets and labels, no invented technologies */}
        <section
          id="skills"
          className="scroll-mt-24 border-b border-white/15 bg-[#111] py-24 sm:py-32"
          aria-labelledby="skills-title"
        >
          <div className="mx-auto max-w-375 px-5 sm:px-9 lg:px-14">
            <div className="rv mb-11 flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[.18em] text-neutral-500">
              <span>04 / The toolkit</span>
              <span>Things I work with</span>
            </div>
            <div className="rv mb-14 grid gap-8 lg:grid-cols-[1fr_.6fr] lg:items-end">
              <h2
                id="skills-title"
                className="text-[clamp(3.8rem,9vw,9rem)] leading-[.89] font-semibold tracking-[-.085em]"
              >
                The right
                <br />
                <span className="text-neutral-500">tool matters.</span>
              </h2>
              <p className="max-w-md pb-1 text-[15px] leading-7 text-neutral-400 lg:justify-self-end">
                From interface details to data models and AI integrations. These
                are tools I use or am actively learning, not a list of
                everything I&apos;ve heard of.
              </p>
            </div>
            <div className="grid gap-px border border-white/15 bg-white/15 md:grid-cols-2">
              {skillGroups.map((group, index) => (
                <div
                  key={group.name}
                  className="rv group min-h-75 bg-[#141414] p-7 transition-colors hover:bg-[#1d1d1d] sm:p-10"
                >
                  <div className="mb-12 flex justify-between font-mono text-[10px] uppercase tracking-[.16em] text-neutral-500">
                    <span>
                      0{index + 1} / {group.name}
                    </span>
                    <span>↗</span>
                  </div>
                  <h3 className="mb-8 text-[clamp(2rem,3vw,3.6rem)] leading-none font-medium tracking-[-.065em]">
                    {group.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill.label}
                        className="inline-flex items-center gap-2.5 border border-white/15 bg-white/2.5 px-3 py-2.5 text-xs text-neutral-300 transition-colors hover:border-white/45 hover:text-white"
                      >
                        <Image
                          src={`/icons/${skill.icon}.svg`}
                          alt=""
                          aria-hidden="true"
                          width={20}
                          height={20}
                          className={`size-5 shrink-0 object-contain ${skill.mono ? 'brightness-0 invert' : ''}`}
                        />
                        <span>{skill.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT: monumental light surface as a distinct final act */}
        <section
          id="contact"
          className="scroll-mt-24 bg-[#d5d5cf] text-[#101010]"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-375 px-5 py-20 sm:px-9 sm:py-28 lg:px-14">
            <div className="rv mb-16 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[.17em] text-neutral-600">
              <span>05 / Next conversation</span>
              <span>Have a project in mind?</span>
            </div>
            <h2
              id="contact-title"
              className="rv max-w-300 text-[clamp(4.4rem,13vw,13.2rem)] leading-[.77] font-semibold tracking-[-.105em]"
            >
              Let&apos;s make
              <br />
              it <span className="text-[#858580]">real.</span>
              <span className="inline-block text-[.4em] align-top">↗</span>
            </h2>
            <div className="rv mt-20 grid gap-10 border-t border-black/25 pt-8 md:grid-cols-2 md:items-end">
              <p className="max-w-md text-base leading-7 text-neutral-700">
                Want to talk about a project, a developer role, or engineering
                work? Email or WhatsApp works best.
              </p>
              <div className="flex flex-col items-start gap-5 md:items-end">
                <Link
                  href={`mailto:${contact.email}`}
                  className="mag border-b border-black pb-2 text-[clamp(1.15rem,2.8vw,2.5rem)] font-medium tracking-[-.055em] transition-[gap] hover:text-neutral-600"
                >
                  {contact.email} ↗
                </Link>
                <Link
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  Or say hello on WhatsApp ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/15 bg-[#090909] px-5 py-8 text-neutral-500 sm:px-9 lg:px-14">
        <div className="mx-auto flex max-w-347.5 flex-wrap items-center justify-between gap-5 font-mono text-[10px] uppercase tracking-[.13em]">
          <span>© {new Date().getFullYear()} Uneeb Bhatti</span>
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {social.label} ↗
              </Link>
            ))}
          </div>
          <Link href="#top" className="transition-colors hover:text-white">
            Back to top ↑
          </Link>
        </div>
      </footer>
    </div>
  );
}
