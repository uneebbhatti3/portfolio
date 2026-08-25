"use client";

import { cn } from "@/lib/utils";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Pilcrow,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo,
  Unlink,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
  placeholder?: string;
  disabled?: boolean;
}

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-40",
        active && "bg-accent text-accent-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-0.5 h-5 w-px shrink-0 bg-border" />;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  disabled = false,
}: RichTextEditorProps) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "underline text-primary cursor-pointer" },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder }),
      CharacterCount,
    ],
    content: Object.keys(value).length > 0 ? value : "",
    editable: !disabled,
    onUpdate({ editor }) {
      onChangeRef.current(editor.getJSON() as Record<string, unknown>);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] px-4 py-3 text-sm text-foreground focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && disabled !== !editor.isEditable) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  if (!editor) return null;

  const btn = (
    title: string,
    onClick: () => void,
    active: boolean,
    icon: React.ReactNode,
  ) => (
    <ToolbarButton
      key={title}
      title={title}
      onClick={onClick}
      active={active}
      disabled={disabled}
    >
      {icon}
    </ToolbarButton>
  );

  return (
    <div
      className={cn(
        "rounded-md border border-input bg-background",
        "focus-within:ring-1 focus-within:ring-ring",
        disabled && "opacity-50",
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input px-2 py-1.5">
        {/* History */}
        {btn("Undo", () => editor.chain().focus().undo().run(), false, <Undo className="h-3.5 w-3.5" />)}
        {btn("Redo", () => editor.chain().focus().redo().run(), false, <Redo className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Headings */}
        {btn("Heading 1", () => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive("heading", { level: 1 }), <Heading1 className="h-3.5 w-3.5" />)}
        {btn("Heading 2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }), <Heading2 className="h-3.5 w-3.5" />)}
        {btn("Heading 3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }), <Heading3 className="h-3.5 w-3.5" />)}
        {btn("Paragraph", () => editor.chain().focus().setParagraph().run(), editor.isActive("paragraph"), <Pilcrow className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Inline marks */}
        {btn("Bold", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"), <Bold className="h-3.5 w-3.5" />)}
        {btn("Italic", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"), <Italic className="h-3.5 w-3.5" />)}
        {btn("Underline", () => editor.chain().focus().toggleUnderline().run(), editor.isActive("underline"), <UnderlineIcon className="h-3.5 w-3.5" />)}
        {btn("Strikethrough", () => editor.chain().focus().toggleStrike().run(), editor.isActive("strike"), <Strikethrough className="h-3.5 w-3.5" />)}
        {btn("Subscript", () => editor.chain().focus().toggleSubscript().run(), editor.isActive("subscript"), <SubscriptIcon className="h-3.5 w-3.5" />)}
        {btn("Superscript", () => editor.chain().focus().toggleSuperscript().run(), editor.isActive("superscript"), <SuperscriptIcon className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Highlight & Color */}
        {btn("Highlight", () => editor.chain().focus().toggleHighlight().run(), editor.isActive("highlight"), <Highlighter className="h-3.5 w-3.5" />)}

        <ToolbarButton title="Text color" onClick={() => {}} disabled={disabled}>
          <label className="flex cursor-pointer items-center" title="Text color">
            <span className="text-xs font-semibold" style={{ color: editor.getAttributes("textStyle").color ?? "currentColor" }}>A</span>
            <input
              type="color"
              className="sr-only"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            />
          </label>
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        {btn("Align left", () => editor.chain().focus().setTextAlign("left").run(), editor.isActive({ textAlign: "left" }), <AlignLeft className="h-3.5 w-3.5" />)}
        {btn("Align center", () => editor.chain().focus().setTextAlign("center").run(), editor.isActive({ textAlign: "center" }), <AlignCenter className="h-3.5 w-3.5" />)}
        {btn("Align right", () => editor.chain().focus().setTextAlign("right").run(), editor.isActive({ textAlign: "right" }), <AlignRight className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Lists */}
        {btn("Bullet list", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"), <List className="h-3.5 w-3.5" />)}
        {btn("Ordered list", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"), <ListOrdered className="h-3.5 w-3.5" />)}
        {btn("Task list", () => editor.chain().focus().toggleTaskList().run(), editor.isActive("taskList"), <ListTodo className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Blocks */}
        {btn("Blockquote", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"), <Quote className="h-3.5 w-3.5" />)}
        {btn("Inline code", () => editor.chain().focus().toggleCode().run(), editor.isActive("code"), <Code className="h-3.5 w-3.5" />)}
        {btn("Code block", () => editor.chain().focus().toggleCodeBlock().run(), editor.isActive("codeBlock"), <Code2 className="h-3.5 w-3.5" />)}
        {btn("Horizontal rule", () => editor.chain().focus().setHorizontalRule().run(), false, <Minus className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Link */}
        {btn("Set link", setLink, editor.isActive("link"), <LinkIcon className="h-3.5 w-3.5" />)}
        {btn("Remove link", () => editor.chain().focus().unsetLink().run(), false, <Unlink className="h-3.5 w-3.5" />)}

        {/* Image */}
        {btn("Insert image", addImage, false, <ImageIcon className="h-3.5 w-3.5" />)}

        {/* Table */}
        {btn("Insert table", insertTable, editor.isActive("table"), <TableIcon className="h-3.5 w-3.5" />)}

        <Divider />

        {/* Clear formatting */}
        {btn("Clear formatting", () => editor.chain().focus().clearNodes().unsetAllMarks().run(), false, <RemoveFormatting className="h-3.5 w-3.5" />)}
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      {/* Word / char count */}
      <div className="flex justify-end border-t border-input px-3 py-1">
        <span className="text-xs text-muted-foreground">
          {editor.storage.characterCount?.characters?.() ?? 0} chars ·{" "}
          {editor.storage.characterCount?.words?.() ?? 0} words
        </span>
      </div>
    </div>
  );
}
