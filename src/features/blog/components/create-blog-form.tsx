"use client";

import RichTextEditor from "@/components/editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateBlog } from "../hooks/useCreateBlog";

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

export default function CreateBlogForm() {
  const {
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
  } = useCreateBlog();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-destructive">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="My awesome blog post"
          value={formData.title}
          onChange={handleTitleChange}
          className={inputClass}
          disabled={isLoading}
          autoComplete="off"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug <span className="text-destructive">*</span>
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          placeholder="my-awesome-blog-post"
          value={formData.slug}
          onChange={handleOnChange}
          className={inputClass}
          disabled={isLoading}
          autoComplete="off"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Auto-generated from title. You can edit it manually.
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          placeholder="A short summary of the post..."
          value={formData.excerpt}
          onChange={handleOnChange}
          rows={2}
          className={cn(inputClass, "resize-none")}
          disabled={isLoading}
        />
      </div>

      {/* Rich Text Content */}
      <div>
        <label className={labelClass}>
          Content <span className="text-destructive">*</span>
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Write your blog content here..."
          disabled={isLoading}
        />
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="coverImage" className={labelClass}>
          Cover Image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.coverImage}
          onChange={handleOnChange}
          className={inputClass}
          disabled={isLoading}
        />
      </div>

      {/* Published Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={formData.published}
          aria-label="Publish immediately"
          onClick={handlePublishedToggle}
          disabled={isLoading}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
            formData.published ? "bg-primary" : "bg-input",
          )}
        >
          <span
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg transition-transform",
              formData.published ? "translate-x-4" : "translate-x-0",
            )}
          />
        </button>
        <span className="text-sm text-foreground select-none">
          {formData.published ? "Publish immediately" : "Save as draft"}
        </span>
      </div>

      {/* Feedback */}
      {(validationError ?? error) && (
        <p role="alert" className="text-sm text-destructive">
          {validationError ?? error}
        </p>
      )}
      {successMessage && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          {successMessage}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : formData.published
              ? "Publish"
              : "Save Draft"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={resetForm}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
