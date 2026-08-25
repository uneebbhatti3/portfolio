export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  coverImage: string | null;
  author: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogListItem = Pick<
  Blog,
  "id" | "slug" | "title" | "excerpt" | "coverImage" | "author" | "publishedAt" | "createdAt"
>;

export type BlogListResponse = {
  blogs: BlogListItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type BlogFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>;
  coverImage: string;
  published: boolean;
};
