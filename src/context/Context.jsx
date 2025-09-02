// Context.jsx
import { createContext, useEffect, useState } from "react";
import { generateText } from "../config/gemini";

export const Context = createContext(null);

export default function ContextProvider({ children }) {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); // [{ prompt, answer }]
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
  };

  const sendMessage = async (prompt) => {
    const q = (prompt ?? input ?? "").trim();
    if (!q) return "";

    setLoading(true);
    setShowResult(true);
    setRecentPrompts(q);
    setResultData("");

    try {
      // SINGLE model call — no duplicates
      const text = await generateText(q);

      // format: **bold** and * -> <br>
      const html = text
        .split("**")
        .map((chunk, i) => (i % 2 ? `<b>${chunk}</b>` : chunk))
        .join("")
        .split("*")
        .join("<br>");

      // animated reveal
      html.split(" ").forEach((word, i) => delayPara(i, word + " "));

      setInput("");
      // history: consistent shape
      setPrevPrompts(p => [{ prompt: q, answer: text }, ...p]);

      return text;
    } catch (err) {
      console.error("[sendMessage] ERROR:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // If you must ping, do it once. Expect double-run in StrictMode during dev.
  useEffect(() => {
    // comment this out in prod
    (async () => {
      try {
        const key = import.meta.env.VITE_GEMINI_API_KEY?.trim();
        if (!key) return;
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
        );
        console.log("[pingKey] status:", r.status);
      } catch {}
    })();
  }, []);

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    sendMessage,
    setRecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setShowResult,
    setResultData,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
