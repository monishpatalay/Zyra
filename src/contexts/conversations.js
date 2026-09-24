const CONVERSATIONS_KEY = "zyra-conversations";
const ACTIVE_ID_KEY = "zyra-active-conversation";
const TITLE_MAX_LENGTH = 48;

export function loadConversations() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CONVERSATIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadActiveConversationId() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACTIVE_ID_KEY) || null;
}

export function saveConversations(conversations) {
  window.localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
}

export function saveActiveConversationId(id) {
  if (id) {
    window.localStorage.setItem(ACTIVE_ID_KEY, id);
  } else {
    window.localStorage.removeItem(ACTIVE_ID_KEY);
  }
}

export function deriveTitle(prompt) {
  const trimmed = prompt.trim().replace(/\s+/g, " ");
  if (trimmed.length <= TITLE_MAX_LENGTH) return trimmed;
  return `${trimmed.slice(0, TITLE_MAX_LENGTH - 1).trimEnd()}…`;
}

export function createConversation(firstPrompt) {
  return {
    id: crypto.randomUUID(),
    title: deriveTitle(firstPrompt),
    createdAt: Date.now(),
    messages: [],
  };
}

export function createMessage(role, text, extra = {}) {
  return { id: crypto.randomUUID(), role, text, ...extra };
}

/**
 * Tokenizes assistant answer text into renderable pieces, preserving the
 * existing "**bold**" / "*line break*" convention without ever building an
 * HTML string (so callers can render real React nodes instead of relying on
 * dangerouslySetInnerHTML).
 * @param {string} text
 * @returns {Array<{ type: "word", text: string, bold: boolean } | { type: "break" }>}
 */
export function parseAnswerTokens(text) {
  const tokens = [];
  text.split("**").forEach((chunk, chunkIndex) => {
    const bold = chunkIndex % 2 === 1;
    chunk.split("*").forEach((line, lineIndex) => {
      if (lineIndex > 0) tokens.push({ type: "break" });
      line
        .split(" ")
        .filter(Boolean)
        .forEach((word) => tokens.push({ type: "word", text: word, bold }));
    });
  });
  return tokens;
}
