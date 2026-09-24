import Link from "next/link";
import Motion from "@/components/Motion";
import Scene3D from "@/components/Scene3D";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";
import TwoColumn from "@/components/ui/two-column";
import { cn } from "@/lib/cn";
import {
  contact,
  education,
  experience,
  navLinks,
  projects,
  skillGroups,
  socialLinks,
} from "@/lib/data";
import Separator from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Scene3D />
      <Motion />

      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-5 border-b border-line bg-bg/70 pt-[calc(env(safe-area-inset-top,0px)+14px)] pb-3.5 backdrop-blur-[14px]">
        <Container className="flex items-center justify-between">
          <Link
            href="#top"
            className="font-mono text-sm font-medium tracking-[.02em]"
          >
            uneeb.bhatti
          </Link>
          <div className="flex gap-5.5 text-sm text-mut">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors duration-150 hover:text-fg",
                  i < navLinks.length - 1 && "max-sm:hidden",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      <main id="top" className="relative z-1">
        {/* Hero */}
        <Section
          spacing="none"
          className="hero flex min-h-svh items-center pt-25 pb-15"
        >
          <Container>
            <p className="rv mb-4.5 font-mono text-xs uppercase tracking-[.12em] text-mut">
              Full-stack developer · Lahore, PK
            </p>

            <h1
              id="h1"
              className="mb-6.5 text-[clamp(44px,9vw,112px)] leading-[.98] font-semibold tracking-[-.045em]"
            >
              <span className="w inline-block overflow-hidden pb-[.08em] align-top">
                <span className="inline-block">Uneeb</span>
              </span>{" "}
              <span className="w inline-block overflow-hidden pb-[.08em] align-top">
                <span className="inline-block">Bhatti</span>
              </span>
            </h1>

            <p className="rv mb-8.5 max-w-130 text-[clamp(16px,2vw,19px)] text-mut [&_b]:font-medium [&_b]:text-fg">
              I turn ideas into products with <b>Next.js, TypeScript and AI</b>.
              Currently building CodDock and going deeper into backend
              engineering and system design.
            </p>

            <div className="rv flex flex-wrap gap-3">
              <Button variant="primary" href="#work">
                View selected work →
              </Button>
              <Button href="#contact">Get in touch</Button>
            </div>

            <div className="rv mt-11 flex flex-wrap gap-2.5">
              <Badge dot>Building CodDock</Badge>
              <Badge>BSIT @ UMT</Badge>
              <Badge>Web Development Lead, UMT ACM</Badge>
            </div>
          </Container>
        </Section>

        {/* Selected work */}
        <Section id="work">
          <Container>
            <SectionHeading>Selected work</SectionHeading>
            {projects.map((project, i) => (
              <Link
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rv group grid grid-cols-[48px_1fr_auto] items-start gap-4 border-t border-line py-6.5 last:border-b max-[560px]:grid-cols-[1fr_auto]"
              >
                <span className="pt-1.5 font-mono text-xs text-mut max-[560px]:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="mb-1 text-[clamp(20px,3vw,28px)] font-semibold tracking-tight transition-transform duration-220 ease-emil group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="mb-3 max-w-140 text-[15px] text-mut">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <div className="pt-2 font-mono text-xs text-mut text-right">
                    {project.year}
                  </div>
                  <span className="mt-2 text-xl text-mut transition-[transform,color] duration-220 ease-emil group-hover:-translate-y-0.75 group-hover:translate-x-0.75 group-hover:text-acc">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </Container>
        </Section>

        {/* About + Experience */}
        <Section id="about">
          <TwoColumn>
            <SectionHeading flush>About</SectionHeading>
            <div className="rv text-mut [&>p]:mb-4 [&_b]:font-medium [&_b]:text-fg">
              <p>
                Once an idea gets stuck in my head, I usually end up building
                it. Some stay weekend experiments; a few turn into real
                products.
              </p>
              <p>
                I&apos;m a <b>BSIT student at UMT</b> who enjoys the whole loop:
                shaping the idea, designing the experience, building the backend
                and shipping. Lately that means{" "}
                <b>Next.js, Node.js, TypeScript and AI integrations</b>, plus
                how production apps behave beyond the happy path.
              </p>
              <p>
                As <b>Web Development Lead at UMT ACM</b>, I run workshops for
                students who want to move past tutorials. I also helped organize{" "}
                <b>TechVerse</b>, a 12-hour hackathon, and competed at{" "}
                <b>Softcom &apos;25</b>.
              </p>
            </div>
          </TwoColumn>

          <Separator />

          <TwoColumn className="mt-17.5">
            <SectionHeading flush>Experience</SectionHeading>
            <div className="rv grid">
              {experience.map((entry) => (
                <div
                  key={entry.role + entry.org}
                  className="grid grid-cols-[1fr_auto] gap-3 border-t border-line py-4.5 last:border-b"
                >
                  <p>
                    <b className="font-medium">{entry.role}</b>
                    <br />
                    <span className="text-sm text-mut">{entry.org}</span>
                  </p>
                  <span className="whitespace-nowrap font-mono text-xs text-mut">
                    {entry.when}
                  </span>
                </div>
              ))}
            </div>
          </TwoColumn>

          <Separator />

          <TwoColumn className="mt-17.5">
            <SectionHeading flush>Education</SectionHeading>
            <div className="rv grid">
              {education.map((edu) => (
                <div
                  key={edu.degree + edu.institution}
                  className="grid grid-cols-[1fr_auto] gap-3 border-t border-line py-4.5 last:border-b"
                >
                  <p>
                    <b className="font-medium">{edu.degree}</b>
                    <br />
                    <span className="text-sm text-mut">{edu.institution}</span>
                  </p>
                  <span className="whitespace-nowrap font-mono text-xs text-mut">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </TwoColumn>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <TwoColumn>
            <SectionHeading flush>Skills</SectionHeading>
            <div className="rv grid gap-5.5">
              {skillGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="mb-2.5 font-mono text-xs font-normal uppercase tracking-widesttext-mut">
                    {group.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
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
                </div>
              ))}
            </div>
          </TwoColumn>
        </Section>

        {/* Contact */}
        <Section id="contact" spacing="cta">
          <Container>
            <SectionHeading size="xl">
              Let&apos;s build
              <br />
              something.
            </SectionHeading>
            <p className="rv mb-7.5 max-w-110 text-mut">
              Email or WhatsApp works best. I&apos;m happy to talk about
              projects, engineering work or collaborations. No sales pitches,
              please.
            </p>
            <div className="rv flex flex-wrap gap-3">
              <Button variant="primary" href={`mailto:${contact.email}`}>
                {contact.email}
              </Button>
              <Button
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp ↗
              </Button>
            </div>
          </Container>
        </Section>
      </main>

      {/* Footer */}
      <footer className="relative z-1 border-t border-line pt-6.5 pb-10 text-[13px] text-mut">
        <Container className="flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Uneeb Bhatti</span>
          <div className="flex gap-4.5">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </footer>
    </>
  );
}
