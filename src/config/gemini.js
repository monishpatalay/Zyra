// config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Keep API key in environment, not code
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in environment.");
}

const genAI = new GoogleGenerativeAI({ apiKey });

export async function generateText(prompt) {
  const key = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  if (!key) throw new Error("Missing VITE_GEMINI_API_KEY");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${res.status}] ${text}`);
  }

  const data = await res.json();
  const answer =
    data?.candidates?.[0]?.content?.parts
      ?.filter(p => typeof p.text === "string")
      ?.map(p => p.text)
      ?.join("") ?? "";
  return answer;
}

