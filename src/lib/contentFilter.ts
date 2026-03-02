const BLOCK_KEYWORDS = [
  "sex",
  "porn",
  "nude",
  "naked",
  "kill",
  "murder",
  "suicide",
  "drug",
  "alcohol",
  "beer",
  "wine",
  "whiskey",
  "cocaine",
  "meth",
  "heroin",
  "weed",
  "marijuana",
  "vape",
  "cigarette",
  "bomb",
  "gun",
  "weapon",
  "terrorist",
  "rape",
  "molest",
  "abuse",
  "hate",
  "racist",
];

const DISTRESS_KEYWORDS = [
  "help me",
  "i'm scared",
  "im scared",
  "i'm hurt",
  "im hurt",
  "someone hurt me",
  "i want to die",
  "kill myself",
  "run away",
  "i'm in danger",
  "im in danger",
  "emergency",
];

const DISTRESS_RESPONSE =
  "I hear you, and your feelings matter so much. 💙 Can you find a grown-up you trust to talk to right now? I'll be right here when you're back.";

const BLOCKED_RESPONSE =
  "Hmm, that's something for grown-ups! Let's talk about something super fun instead — want to play a game or learn something amazing? 🌟";

export interface FilterResult {
  blocked: boolean;
  distress: boolean;
  redirectMessage: string;
}

export function contentFilter(text: string, blockedTopics: string[] = []): FilterResult {
  const lower = text.toLowerCase();

  const isDistress = DISTRESS_KEYWORDS.some((kw) => lower.includes(kw));
  if (isDistress) {
    return { blocked: true, distress: true, redirectMessage: DISTRESS_RESPONSE };
  }

  const allBlocked = [...BLOCK_KEYWORDS, ...blockedTopics.map((t) => t.toLowerCase())];
  const isBlocked = allBlocked.some((kw) => lower.includes(kw));
  if (isBlocked) {
    return { blocked: true, distress: false, redirectMessage: BLOCKED_RESPONSE };
  }

  return { blocked: false, distress: false, redirectMessage: "" };
}

export function postFilter(text: string, blockedTopics: string[] = []): string {
  const lower = text.toLowerCase();
  const allBlocked = [...BLOCK_KEYWORDS, ...blockedTopics.map((t) => t.toLowerCase())];
  const hasBlocked = allBlocked.some((kw) => lower.includes(kw));
  return hasBlocked ? BLOCKED_RESPONSE : text;
}
