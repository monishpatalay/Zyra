import { GoogleGenAI } from "@google/genai";

// Tried in order; the next one is used when a model is overloaded or rate-limited.
const MODELS = ["gemini-flash-latest", "gemini-flash-lite-latest"];
const RETRYABLE_STATUS = new Set([429, 503]);

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

  let lastError;
  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({ model, contents: prompt });
      return response.text;
    } catch (error) {
      if (!RETRYABLE_STATUS.has(error?.status)) throw error;
      lastError = error;
    }
  }
  throw lastError;
}
