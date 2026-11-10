"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { ArrowUp, X } from "lucide-react";
import Bloop from "@/components/Bloop";
import { deriveMood, useHeldMood, type ChatStatus } from "@/components/bloop-mood";
import { cn } from "@/lib/cn";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Contract: POST { messages } and receive a plain-text, streamed reply.
const CHAT_ENDPOINT = "/api/chat";

const ERROR_MESSAGES: Record<string, string> = {
  "429": "Bloop is getting a lot of questions right now. Please try again in a moment.",
  "503": "Bloop is getting a lot of questions right now. Please try again in a moment.",
  default:
    "Something went wrong. Please try again, or reach Uneeb through the contact section.",
};

const createId = () => Math.random().toString(36).slice(2);

// The agent replies in light Markdown. Only links and bold are rendered, and only
// http(s)/mailto links are allowed so a reply can never inject a javascript: URL.
const INLINE_PATTERN =
  /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|\*\*([^*]+)\*\*|((?:https?:\/\/)[^\s)]+)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(INLINE_PATTERN)) {
    const [whole, label, href, bold, bareUrl] = match;
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const key = `${match.index}-${whole.length}`;
    if (bold) {
      nodes.push(<strong key={key}>{bold}</strong>);
    } else {
      const url = href ?? bareUrl;
      const external = !url.startsWith("mailto:");
      nodes.push(
        <Link
          key={key}
          href={url}
          className="font-medium text-acc underline underline-offset-2"
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {label ?? url}
        </Link>,
      );
    }
    lastIndex = match.index + whole.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [error, setError] = useState<string | null>(null);
  const [inputActive, setInputActive] = useState(false);

  const bloopRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const mood = useHeldMood(deriveMood(status, open && inputActive));
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, error]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const close = () => {
    setOpen(false);
    bloopRef.current?.querySelector<HTMLElement>('[role="button"]')?.focus();
  };

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;

    const userMessage: ChatMessage = { id: createId(), role: "user", content };
    const replyId = createId();
    const history = [...messages, userMessage];

    setMessages(history);
    setInput("");
    setError(null);
    setStatus("submitted");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) throw new Error(String(response.status));

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      setMessages((current) => [...current, { id: replyId, role: "assistant", content: "" }]);
      setStatus("streaming");

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) => (message.id === replyId ? { ...message, content: reply } : message)),
        );
      }
      setStatus("ready");
    } catch (caught) {
      if (controller.signal.aborted) return;
      setMessages((current) => current.filter((message) => message.id !== replyId || message.content));
      const code = caught instanceof Error ? caught.message : "";
      setError(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.default);
      setStatus("error");
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const onInputKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  return (
    <div
      className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] z-40 flex pointer-events-none flex-col items-end gap-2"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) close();
      }}
    >
      <section
        id="assistant-panel"
        aria-label="Chat with Bloop"
        inert={!open}
        className={cn(
          "flex h-[min(28rem,calc(100svh-12rem))] w-[min(22rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[0_12px_40px_rgba(0,0,0,.14)] backdrop-blur-xl",
          "transition-[opacity,transform] duration-200 ease-emil",
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-[.97] opacity-0",
        )}
      >
        <header className="flex items-center justify-between border-b border-line py-3 pr-2 pl-5">
          <div>
            <p className="text-sm font-semibold">Bloop</p>
            <p className="font-mono text-[11px] text-mut">portfolio assistant</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close chat"
            className="grid size-9 cursor-pointer place-items-center rounded-full text-mut transition-[background-color,color,transform] duration-200 ease-emil hover:bg-chip hover:text-fg active:scale-[.95]"
          >
            <X className="size-4" aria-hidden />
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.length === 0 && (
            <p className="text-sm text-mut">
              Hi, I&apos;m Bloop. Ask me about Uneeb&apos;s projects, stack or experience.
            </p>
          )}
          {messages.map((message) => (
            <p
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                message.role === "user" ? "ml-auto bg-fg text-bg" : "bg-chip text-fg",
              )}
            >
              {!message.content
                ? "…"
                : message.role === "assistant"
                  ? renderInline(message.content)
                  : message.content}
            </p>
          ))}
          {status === "submitted" && (
            <p className="w-fit rounded-2xl bg-chip px-3.5 py-2 text-sm text-mut">Thinking…</p>
          )}
          {error && (
            <p role="alert" className="text-xs text-mut">
              {error}
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-line p-2">
          <label htmlFor="assistant-input" className="sr-only">
            Message
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKey}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            placeholder="Ask something…"
            className="max-h-28 min-h-10 flex-1 resize-none rounded-2xl bg-transparent px-3 py-2.5 text-base text-fg outline-none placeholder:text-mut sm:text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || busy}
            aria-label="Send message"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-fg text-bg transition-[opacity,transform] duration-200 ease-emil active:scale-[.95] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="size-4" aria-hidden />
          </button>
        </form>
      </section>

      <div ref={bloopRef} className="pointer-events-auto size-20 sm:size-28">
        <Bloop
          mood={mood}
          color="#7597eb"
          label={open ? "Bloop. Press Enter to close the chat." : "Bloop, the portfolio assistant. Press Enter to open the chat."}
          onPoke={() => (open ? close() : setOpen(true))}
        />
      </div>
    </div>
  );
}
