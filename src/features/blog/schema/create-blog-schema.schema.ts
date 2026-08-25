import { z } from "zod";

export const CreateBlogSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.record(z.string(), z.unknown()),
  coverImage: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
});

export const UpdateBlogSchema = CreateBlogSchema.partial();
