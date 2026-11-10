"use client";

import { useEffect, useRef, useState } from "react";

export type Mood = "idle" | "listening" | "thinking" | "speaking";

export type ChatStatus = "ready" | "submitted" | "streaming" | "error";

/**
 * Turns your chat state into one of Bloop's four moods.
 * Agent states win over input states, so clicking back into the input
 * while a reply is streaming does not pull Bloop out of "speaking".
 */
export function deriveMood(status: ChatStatus, inputActive: boolean): Mood {
  if (status === "streaming") return "speaking";
  if (status === "submitted") return "thinking";
  if (inputActive) return "listening";
  return "idle";
}

/**
 * Holds each mood for at least `holdMs` so fast replies do not make Bloop
 * flick from thinking to speaking in a couple of frames.
 */
export function useHeldMood(target: Mood, holdMs = 400): Mood {
  const [mood, setMood] = useState<Mood>(target);
  const changedAt = useRef(0);

  useEffect(() => {
    if (target === mood) return;
    const wait = Math.max(0, changedAt.current + holdMs - Date.now());
    const id = window.setTimeout(() => {
      changedAt.current = Date.now();
      setMood(target);
    }, wait);
    return () => window.clearTimeout(id);
  }, [target, mood, holdMs]);

  return mood;
}