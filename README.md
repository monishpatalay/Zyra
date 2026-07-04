# Zyra

A minimal Gemini-powered chat UI — a ChatGPT-style single-page app that sends prompts straight to Google's Gemini API and streams the reply back with a word-by-word reveal animation.

**Live app:** https://zyra-sigma.vercel.app

## Features

- Single-page chat interface (prompt box + animated response reveal)
- Calls the Gemini API (`gemini-1.5-flash`) directly from the browser
- Bold-text and line-break formatting applied to Gemini's Markdown-ish output

## Tech Stack

React 19 + Vite, `@google/generative-ai`.

## Project Structure

```
src/
├── App.jsx                       Root component — renders Main
├── components/Main/Main.jsx      Chat UI (prompt input + result display)
├── components/Sidebar/           Sidebar component (currently unmounted in App.jsx)
├── contexts/Contexts.jsx         Chat state + sendMessage() — calls generateText()
├── config/gemini.js              Gemini API client (fetch-based)
└── Chat.jsx                      Older standalone chat prototype (imported but unused;
                                   expects a local backend at localhost:5000/api/chat)
```

---

## Setup

### 1. Get a Gemini API key

Create one at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install dependencies

```bash
npm install
```

## Running the App

```bash
npm run dev
```

Open the printed local URL (typically [http://localhost:5173](http://localhost:5173)).

### Build for production

```bash
npm run build
npm run preview
```

---

## ⚠️ Security Note

`VITE_GEMINI_API_KEY` is a client-side environment variable — Vite inlines it directly into the production JavaScript bundle, so it's visible to anyone who views the deployed site's source, not just to people with repo access. This is fine for local experimentation, but for a public deployment (like the live link above), the safer pattern is to add a small backend endpoint that holds the Gemini key server-side and proxies requests from the frontend, so the key is never shipped to the browser.

If you've deployed this with a real API key, rotate it periodically in Google AI Studio and consider adding usage quotas/restrictions to limit blast radius.
