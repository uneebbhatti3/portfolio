"use client";

import useFormHandler from "@/hooks/useFormhandler";
import { useState } from "react";
import { createBlog } from "../service/blog.service";
import { BlogFormData } from "../types/blog.types";

const INITIAL_FORM_STATE: BlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: {},
  coverImage: "",
  published: false,
};

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function useCreateBlog() {
  const { formData, setFormData, handleOnChange } =
    useFormHandler<BlogFormData>(INITIAL_FORM_STATE);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setFormData((prev) => ({ ...prev, title, slug: toSlug(title) }));
  }

  function handleContentChange(value: Record<string, unknown>) {
    setFormData((prev) => ({ ...prev, content: value }));
  }

  function handlePublishedToggle() {
    setFormData((prev) => ({ ...prev, published: !prev.published }));
  }

  function resetForm() {
    setFormData(INITIAL_FORM_STATE);
    setError(null);
    setSuccessMessage(null);
    setValidationError(null);
  }

  function validate(): string | null {
    if (!formData.title.trim()) return "Title is required.";
    if (!formData.slug.trim()) return "Slug is required.";
    if (Object.keys(formData.content).length === 0) return "Content is required.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const fieldError = validate();
    if (fieldError) {
      setValidationError(fieldError);
      return;
    }
    setValidationError(null);

    setIsLoading(true);

    const response = await createBlog({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || undefined,
      content: formData.content,
      coverImage: formData.coverImage || undefined,
      published: formData.published,
    });

    setIsLoading(false);

    if (!response.success) {
      setError(response.error ?? "Something went wrong.");
    } else {
      setSuccessMessage(response.message ?? "Blog post created successfully.");
      resetForm();
    }
  }

  return {
    formData,
    handleOnChange,
    handleTitleChange,
    handleContentChange,
    handlePublishedToggle,
    handleSubmit,
    resetForm,
    isLoading,
    error,
    successMessage,
    validationError,
  };
}
