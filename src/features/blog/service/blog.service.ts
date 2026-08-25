import { APIResponse } from "@/types/response-types";
import { z } from "zod";
import { CreateBlogSchema } from "../schema/create-blog-schema.schema";
import { BlogListResponse } from "../types/blog.types";

type CreateBlogBody = z.infer<typeof CreateBlogSchema>;

export type GetBlogsParams = {
  page?: number;
  pageSize?: number;
  publishedOnly?: boolean;
};

export async function createBlog(body: CreateBlogBody): Promise<APIResponse> {
  const res = await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}

export async function getBlogs(
  params: GetBlogsParams = {},
): Promise<APIResponse<BlogListResponse>> {
  const { page = 1, pageSize = 10, publishedOnly = true } = params;

  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    published: String(publishedOnly),
  });

  const res = await fetch(`/api/blog?${query}`, { cache: "no-store" });

  return res.json();
}
