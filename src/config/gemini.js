import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-flash-latest";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateText(prompt) {
  if (!genAI) {
    throw new Error("Missing VITE_GEMINI_API_KEY in environment.");
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
