import CreateBlogForm from "@/features/blog/components/create-blog-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog Post",
};

export default function CreateBlogPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">
        Create Blog Post
      </h1>
      <CreateBlogForm />
    </main>
  );
}
