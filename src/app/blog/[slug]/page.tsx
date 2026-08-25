import TipTapRenderer from "@/components/editor/tiptap-renderer";
import { DATA } from "@/data/resume";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Prisma } from "../../../../generated/prisma/client";

// ─── Helpers ────────────────────────────────────────────────────────────────

const BLOG_SELECT = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  content: true,
  coverImage: true,
  author: true,
  published: true,
  publishedAt: true,
  createdAt: true,
} satisfies Prisma.BlogSelect;

async function getBlogBySlug(slug: string) {
  return prisma.blog.findFirst({
    where: { slug, published: true },
    select: BLOG_SELECT,
  });
}

async function getAdjacentBlogs(currentPublishedAt: Date | null, currentId: string) {
  const dateFilter = currentPublishedAt ?? new Date(0);

  const [previous, next] = await Promise.all([
    prisma.blog.findFirst({
      where: {
        published: true,
        id: { not: currentId },
        publishedAt: { gt: dateFilter },
      },
      orderBy: { publishedAt: "asc" },
      select: { slug: true, title: true },
    }),
    prisma.blog.findFirst({
      where: {
        published: true,
        id: { not: currentId },
        publishedAt: { lt: dateFilter },
      },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true },
    }),
  ]);

  return { previous, next };
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return undefined;

  const publishedTime = blog.publishedAt?.toISOString();

  return {
    title: blog.title,
    description: blog.excerpt ?? undefined,
    openGraph: {
      title: blog.title,
      description: blog.excerpt ?? undefined,
      type: "article",
      publishedTime,
      url: `${DATA.url}blog/${slug}`,
      ...(blog.coverImage && {
        images: [{ url: blog.coverImage }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt ?? undefined,
      ...(blog.coverImage && {
        images: [blog.coverImage],
      }),
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const { previous, next } = await getAdjacentBlogs(blog.publishedAt, blog.id);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    datePublished: blog.publishedAt?.toISOString(),
    dateModified: blog.publishedAt?.toISOString(),
    description: blog.excerpt,
    ...(blog.coverImage && { image: blog.coverImage }),
    url: `${DATA.url}blog/${slug}`,
    author: {
      "@type": "Person",
      name: blog.author,
    },
  }).replace(/</g, "\\u003c");

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <NextLink
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
        aria-label="Back to Blog"
      >
        <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
        Back to Blog
      </NextLink>

      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{blog.author}</span>
          <span>·</span>
          <time dateTime={blog.publishedAt?.toISOString()}>
            {blog.publishedAt
              ? formatDate(blog.publishedAt)
              : formatDate(blog.createdAt)}
          </time>
        </div>
      </div>

      {blog.coverImage && (
        <div className="my-6 overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>

      <TipTapRenderer content={blog.content as Record<string, unknown>} />

      <nav aria-label="Post navigation" className="mt-12 pt-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previous ? (
            <NextLink
              href={`/blog/${previous.slug}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                {previous.title}
              </span>
            </NextLink>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {next ? (
            <NextLink
              href={`/blog/${next.slug}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                {next.title}
              </span>
            </NextLink>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
