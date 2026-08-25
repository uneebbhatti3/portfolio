import { CreateBlogSchema } from "@/features/blog/schema/create-blog-schema.schema";
import { BlogListResponse } from "@/features/blog/types/blog.types";
import prisma from "@/lib/prisma";
import { APIResponse } from "@/types/response-types";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../../../generated/prisma/client";

const BLOG_LIST_SELECT = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  author: true,
  publishedAt: true,
  createdAt: true,
} satisfies Prisma.BlogSelect;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("pageSize") ?? "10", 10)),
    );
    const publishedOnly = searchParams.get("published") !== "false";

    const where: Prisma.BlogWhereInput = publishedOnly
      ? { published: true }
      : {};

    const [blogs, totalItems] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: BLOG_LIST_SELECT,
      }),
      prisma.blog.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json<APIResponse<BlogListResponse>>(
      {
        success: true,
        status: 200,
        data: {
          blogs,
          pagination: {
            page,
            pageSize,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get blogs error:", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        status: 500,
        error: "An unexpected error occurred while fetching blog posts.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = CreateBlogSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 400,
          error: validation.error.issues[0]?.message ?? "Invalid request body",
        },
        { status: 400 },
      );
    }

    const { slug, title, content, excerpt, coverImage, published } =
      validation.data;

    const newBlog = await prisma.blog.create({
      data: {
        slug,
        title,
        content: content as Prisma.InputJsonValue,
        excerpt,
        coverImage,
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json<APIResponse>(
      {
        success: true,
        status: 201,
        message: published
          ? "Blog post created and published successfully."
          : "Blog post saved as a draft.",
        data: newBlog,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create blog error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 409,
          error: "A blog post with this slug already exists.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json<APIResponse>(
      {
        success: false,
        status: 500,
        error: "An unexpected error occurred while creating the blog post.",
      },
      { status: 500 },
    );
  }
}
