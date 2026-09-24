import { useCallback, useEffect, useMemo, useState } from "react";
import { generateText } from "../config/gemini";
import { Context } from "./context";
import {
  createConversation,
  createMessage,
  loadActiveConversationId,
  loadConversations,
  saveActiveConversationId,
  saveConversations,
} from "./conversations";

const THEME_STORAGE_KEY = "zyra-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ContextProvider({ children }) {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState(loadConversations);
  const [activeConversationId, setActiveConversationId] = useState(loadActiveConversationId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [justCompletedId, setJustCompletedId] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    saveActiveConversationId(activeConversationId);
  }, [activeConversationId]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) ?? null,
    [conversations, activeConversationId],
  );

  const newChat = useCallback(() => {
    setActiveConversationId(null);
    setJustCompletedId(null);
    setError(null);
    setInput("");
  }, []);

  const selectConversation = useCallback((id) => {
    setActiveConversationId(id);
    setJustCompletedId(null);
    setError(null);
    setInput("");
  }, []);

  const deleteConversation = useCallback((id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveConversationId((current) => (current === id ? null : current));
  }, []);

  const appendMessage = useCallback((conversationId, message) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c,
      ),
    );
  }, []);

  const sendMessage = useCallback(
    async (prompt) => {
      const q = (prompt ?? input ?? "").trim();
      if (!q || loading) return;

      let conversationId = activeConversationId;
      if (!conversationId) {
        const conversation = createConversation(q);
        conversationId = conversation.id;
        setConversations((prev) => [conversation, ...prev]);
        setActiveConversationId(conversationId);
      }

      appendMessage(conversationId, createMessage("user", q));
      setInput("");
      setLoading(true);
      setError(null);
      setJustCompletedId(null);

      try {
        const text = await generateText(q);
        const message = createMessage("assistant", text);
        appendMessage(conversationId, message);
        setJustCompletedId(message.id);
      } catch (err) {
        const detail = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(detail);
        appendMessage(conversationId, createMessage("assistant", detail, { isError: true }));
      } finally {
        setLoading(false);
      }
    },
    [input, loading, activeConversationId, appendMessage],
  );

  const contextValue = {
    conversations,
    activeConversation,
    sendMessage,
    selectConversation,
    deleteConversation,
    loading,
    error,
    justCompletedId,
    input,
    setInput,
    newChat,
    theme,
    toggleTheme,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
