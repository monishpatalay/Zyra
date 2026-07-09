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

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function formatAnswerHtml(text) {
  return escapeHtml(text)
    .split("**")
    .map((chunk, i) => (i % 2 ? `<b>${chunk}</b>` : chunk))
    .join("")
    .split("*")
    .join("<br>");
}
