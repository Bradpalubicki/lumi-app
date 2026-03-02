import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import { contentFilter, postFilter } from "@/lib/contentFilter";
import type { Interest } from "@/lib/childStore";

const RequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().max(2000),
    })
  ).min(1).max(50),
  age: z.enum(["4-5", "6-8", "9-12"]),
  mode: z.enum(["chat", "games", "songs", "learn"]),
  childName: z.string().max(50).optional().default(""),
  blockedTopics: z.array(z.string()).optional().default([]),
  interests: z.array(z.string()).optional().default([]),
  sessionId: z.string().max(100).optional().default(""),
});

// In-memory rate limiter: sessionId → { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(sessionId);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(sessionId, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 100) return false;
  entry.count++;
  return true;
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "AI service not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  const { messages, age, mode, childName, blockedTopics, interests, sessionId } = parsed.data;

  if (!checkRateLimit(sessionId || "anonymous")) {
    return Response.json(
      { response: "Whoa, we've been chatting a LOT! Let's take a short break and come back fresh! 🌟", rateLimited: true },
      { status: 429 }
    );
  }

  const lastMessage = messages[messages.length - 1];
  const filterResult = contentFilter(lastMessage.content, blockedTopics as string[]);
  if (filterResult.blocked) {
    return Response.json({ response: filterResult.redirectMessage, filtered: true });
  }

  const systemPrompt = buildSystemPrompt({
    age,
    mode,
    childName: childName as string,
    blockedTopics: blockedTopics as string[],
    interests: interests as Interest[],
  });

  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 300,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const rawText = response.content[0].type === "text" ? response.content[0].text : "";
  const safeText = postFilter(rawText, blockedTopics as string[]);

  return Response.json({ response: safeText });
}
