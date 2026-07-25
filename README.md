# Zyra

An AI chat assistant powered by Google's Gemini API — multi-turn conversations, a sidebar with real chat history, and light/dark themes, all in a single-page React app.

**Live app:** https://zyra.monishpatalay.dev

## Features

- Multi-turn conversation threads (not a single-shot Q&A) — send follow-ups and scroll back through the whole conversation
- Sidebar lists your actual conversations; switching between them is instant (loaded from storage, no API re-call)
- Conversation history persists across page reloads via the browser's `localStorage` — there's no backend, so history stays on the device/browser it was created in and won't sync elsewhere
- Light/dark theme toggle (persisted, respects system preference by default)
- Calls the Gemini API (`gemini-flash-latest`) through the official `@google/generative-ai` SDK
- Hand-built inline SVG icon set and a token-based design system (`src/styles/tokens.css`) — no raster icon assets

## Tech Stack

React 19 + Vite, `@google/generative-ai`.

## Project Structure

```
src/
├── App.jsx                                Root component — renders Sidebar + Main
├── main.jsx                               Entry point — mounts ContextProvider + App
├── index.css                              Global styles, imports styles/tokens.css
├── styles/tokens.css                      Design tokens: color, spacing, radius, type, motion (light + dark)
├── config/gemini.js                       Gemini SDK client — generateText(prompt)
├── contexts/
│   ├── context.js                         The React Context object
│   ├── Contexts.jsx                       ContextProvider — conversations state, sendMessage(), theme
│   └── conversations.js                   Conversation/message helpers + localStorage persistence
└── components/
    ├── icons/Icons.jsx                    All icons as inline SVG components (currentColor)
    ├── Sidebar/                           Collapsible sidebar — new chat, conversation history, theme toggle
    └── Main/
        ├── Main.jsx                       Layout — nav, greeting/cards or thread, prompt bar
        ├── Greeting.jsx                   Empty-state heading
        ├── PromptCards.jsx                Empty-state suggestion cards
        ├── ConversationThread.jsx         Scrollable multi-turn message thread
        └── PromptBar.jsx                  Message input + send
```

---

## Setup

### 1. Get a Gemini API key

Create one at [Google AI Studio](https://aistudio.google.com/apikey).

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

### Deploying (Vercel)

This repo auto-deploys to Vercel on push. `VITE_GEMINI_API_KEY` must be set as an **environment variable in the Vercel project settings** — it is not read from `.env` at build time on Vercel, and updating it there requires a redeploy to take effect (Vite inlines `VITE_*` vars into the bundle at build time, not at runtime).

---

## ⚠️ Security Note

`VITE_GEMINI_API_KEY` is a client-side environment variable — Vite inlines it directly into the production JavaScript bundle, so it's visible to anyone who views the deployed site's source, not just to people with repo access. This is fine for local experimentation, but for a public deployment (like the live link above), the safer pattern is to add a small backend endpoint that holds the Gemini key server-side and proxies requests from the frontend, so the key is never shipped to the browser.

If you've deployed this with a real API key, rotate it periodically in Google AI Studio and consider adding usage quotas/restrictions to limit blast radius. **Never commit `.env`** — it's gitignored for exactly this reason.
