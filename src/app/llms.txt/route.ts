import {
  contact,
  education,
  experience,
  projects,
  siteDescription,
  siteUrl,
  skillGroups,
  socialLinks,
  talks,
} from '@/lib/data';

// Built from data.ts at build time so the file never drifts from the site.
export const dynamic = 'force-static';

function section(heading: string, items: string[]): string[] {
  return items.length > 0 ? [`## ${heading}`, '', ...items, ''] : [];
}

function buildLlmsTxt(): string {
  const lines = [
    '# Uneeb Bhatti',
    '',
    `> ${siteDescription}`,
    '',
    ...section(
      'Projects',
      projects.map(
        (project) =>
          `- [${project.title}](${project.href}) (${project.year}): ${project.desc} Stack: ${project.tags.join(', ')}.`,
      ),
    ),
    ...section(
      'Talks',
      talks.map((talk) => {
        const title = talk.href ? `[${talk.title}](${talk.href})` : talk.title;
        const details = [talk.format, talk.when, talk.duration]
          .filter(Boolean)
          .join(', ');
        const audience = talk.audience ? ` Audience: ${talk.audience}.` : '';
        return `- ${title} (${details}): ${talk.desc}${audience} Topics: ${talk.tags.join(', ')}.`;
      }),
    ),
    ...section(
      'Experience',
      experience.map((entry) => `- ${entry.role}, ${entry.org} (${entry.when})`),
    ),
    ...section(
      'Education',
      education.map(
        (entry) => `- ${entry.degree}, ${entry.institution} (${entry.year})`,
      ),
    ),
    ...section(
      'Skills',
      skillGroups.map(
        (group) =>
          `- ${group.name}: ${group.items.map((item) => item.label).join(', ')}`,
      ),
    ),
    ...section('Links and contact', [
      `- [Portfolio](${siteUrl}/)`,
      `- [Email](mailto:${contact.email})`,
      `- [WhatsApp](${contact.whatsapp})`,
      ...socialLinks.map((link) => `- [${link.label}](${link.href})`),
    ]),
  ];

  return lines.join('\n');
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
