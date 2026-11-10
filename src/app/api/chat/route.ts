import {
  createEvent,
  InMemoryRunner,
  StreamingMode,
  type Event,
} from '@google/adk';
import rootAgent from '@/app/agents/agent';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const USER_ID = 'portfolio-visitor';
const APP_NAME = 'bloop_portfolio';

// Under heavy load Gemini can sit for ~20s before returning 503, so each attempt
// gets a deadline for its first chunk. Two attempts stay inside maxDuration.
const FIRST_CHUNK_TIMEOUT_MS = 15_000;

// The lighter model is the fallback when the main model is overloaded or slow.
const FALLBACK_MODEL = 'gemini-flash-lite-latest';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Runners are reused across requests; each request gets its own throwaway
// session, because serverless instances do not keep memory between requests.
const runners = [
  new InMemoryRunner({ agent: rootAgent, appName: APP_NAME }),
  new InMemoryRunner({
    agent: rootAgent.clone({ model: FALLBACK_MODEL }),
    appName: APP_NAME,
  }),
];

class FirstChunkTimeoutError extends Error {}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object') return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const parsed = messages.slice(-MAX_MESSAGES).filter(
    (message): message is ChatMessage =>
      !!message &&
      typeof message === 'object' &&
      (message.role === 'user' || message.role === 'assistant') &&
      typeof message.content === 'string' &&
      message.content.trim().length > 0,
  );

  const last = parsed.at(-1);
  if (!last || last.role !== 'user') return null;
  if (parsed.some((message) => message.content.length > MAX_MESSAGE_LENGTH)) {
    return null;
  }
  return parsed;
}

// Thought parts are the model's internal reasoning and must never reach visitors.
function textOf(event: Event): string {
  return (event.content?.parts ?? [])
    .filter((part) => !part.thought && typeof part.text === 'string')
    .map((part) => part.text)
    .join('');
}

function isOverloaded(error: unknown): boolean {
  if (error instanceof FirstChunkTimeoutError) return true;
  const message = error instanceof Error ? error.message : String(error);
  return /"code":\s*(429|503)|UNAVAILABLE|RESOURCE_EXHAUSTED/.test(message);
}

/** Runs the agent in a fresh session seeded with the earlier turns and yields reply text. */
async function* runAgent(
  runner: InMemoryRunner,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string> {
  const session = await runner.sessionService.createSession({
    appName: runner.appName,
    userId: USER_ID,
  });

  try {
    for (const message of messages.slice(0, -1)) {
      const fromUser = message.role === 'user';
      await runner.sessionService.appendEvent({
        session,
        event: createEvent({
          author: fromUser ? 'user' : rootAgent.name,
          content: {
            role: fromUser ? 'user' : 'model',
            parts: [{ text: message.content }],
          },
        }),
      });
    }

    const latest = messages[messages.length - 1];
    let streamedPartial = false;

    for await (const event of runner.runAsync({
      userId: USER_ID,
      sessionId: session.id,
      newMessage: { role: 'user', parts: [{ text: latest.content }] },
      runConfig: { streamingMode: StreamingMode.SSE },
      abortSignal: signal,
    })) {
      if (event.errorMessage) throw new Error(event.errorMessage);
      const text = textOf(event);
      if (!text) continue;

      // In SSE mode ADK yields partial chunks, then one aggregated final event
      // with the same text; only fall back to it if nothing was streamed.
      if (event.partial) {
        streamedPartial = true;
        yield text;
      } else if (!streamedPartial) {
        yield text;
      }
    }
  } finally {
    await runner.sessionService
      .deleteSession({
        appName: runner.appName,
        userId: USER_ID,
        sessionId: session.id,
      })
      .catch(() => undefined);
  }
}

/**
 * Waits for the first chunk before responding, so model errors become a proper
 * HTTP status instead of a stream that breaks mid-way. If the main model is
 * overloaded or slow, the fallback model gets one attempt in a fresh session.
 */
async function startReply(messages: ChatMessage[], requestSignal: AbortSignal) {
  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();
    const forwardAbort = () => controller.abort();
    requestSignal.addEventListener('abort', forwardAbort, { once: true });

    const chunks = runAgent(runners[attempt], messages, controller.signal);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new FirstChunkTimeoutError('No reply before the deadline.')),
        FIRST_CHUNK_TIMEOUT_MS,
      );
    });

    try {
      const first = await Promise.race([chunks.next(), deadline]);
      return { chunks, first: first.done ? '' : first.value };
    } catch (error) {
      controller.abort();
      requestSignal.removeEventListener('abort', forwardAbort);
      // Do not await: an attempt that timed out may still be stuck upstream.
      void chunks.return(undefined).catch(() => undefined);
      const canRetry = attempt + 1 < runners.length;
      if (!canRetry || !isOverloaded(error) || requestSignal.aborted) throw error;
    } finally {
      clearTimeout(timer);
    }
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON.', { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return new Response('Invalid messages.', { status: 400 });
  }

  let reply: Awaited<ReturnType<typeof startReply>>;
  try {
    reply = await startReply(messages, request.signal);
  } catch (error) {
    console.error('Chat agent failed to start:', error);
    return new Response('The assistant is unavailable right now.', {
      status: isOverloaded(error) ? 503 : 502,
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (reply.first) controller.enqueue(encoder.encode(reply.first));
        for await (const text of reply.chunks) {
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (error) {
        if (request.signal.aborted) {
          controller.close();
          return;
        }
        console.error('Chat agent failed mid-reply:', error);
        controller.error(error);
      }
    },
    async cancel() {
      await reply.chunks.return(undefined);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
