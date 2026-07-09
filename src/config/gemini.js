import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-flash-latest";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

let ai = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

/**
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateText(prompt) {
  if (!ai) {
    throw new Error("Missing VITE_GEMINI_API_KEY in environment.");
  }

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });
  return response.text;
}
