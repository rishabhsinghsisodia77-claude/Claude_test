# Telegram Chatbot

A general-purpose, always-on Telegram chatbot built with [grammY](https://grammy.dev) and Google's Gemini API (free tier). Supports:

- `/start` - greeting message with buttons
- `/help` - list of commands
- `/reset` - clear conversation history for the current chat
- Formatted replies (bold, code, lists), a live "thinking" indicator, and a Telegram command menu
- **Tool use** - the bot can check real weather (Open-Meteo, no key needed), do math, and get the current date/time instead of guessing
- **Long-term memory** - it can remember facts you tell it about yourself (`remember_fact`) and recall them in future conversations, even after a redeploy (if a persistent volume is set up - see step 5)
- **Photos and voice notes** - send an image or a voice message and the bot will understand and respond to it
- Notifies the admin (you) on Telegram the first time a new user starts using the bot

## 1. Create the bot on Telegram

1. Open Telegram and message [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts (choose a name and a unique username ending in `bot`).
3. BotFather gives you a token. Copy it — you'll set it as `BOT_TOKEN`.

Bot for this project: [t.me/AskRishabh_bot](https://t.me/AskRishabh_bot)

## 2. Get a free Gemini API key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and sign in with a Google account.
2. Click **Create API key** — no credit card required for the free tier.
3. Copy the key — you'll set it as `GEMINI_API_KEY`.

The free tier has rate limits (requests per minute/day). If you hit them, the bot replies with a fallback error message rather than crashing.

## 3. Get your Telegram user ID (for admin notifications)

1. Message [@userinfobot](https://t.me/userinfobot) on Telegram.
2. It replies instantly with your numeric user ID. Copy it — you'll set it as `ADMIN_CHAT_ID`.

The bot uses this to message you whenever a new person starts using it (username + user ID only, once per unique user).

## 4. Run it locally (optional, for testing)

```bash
npm install
cp .env.example .env
# paste your values into .env: BOT_TOKEN=..., GEMINI_API_KEY=..., and ADMIN_CHAT_ID=...
npm run dev
```

Message your bot on Telegram — it should reply using Gemini.

## 5. Deploy on Railway so it stays live 24/7

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [railway.app](https://railway.app) and sign in with GitHub.
3. Click **New Project → Deploy from GitHub repo**, select this repository.
4. In the Railway project settings, go to **Variables** and add:
   - `BOT_TOKEN` = the token from BotFather
   - `GEMINI_API_KEY` = the key from Google AI Studio
   - `ADMIN_CHAT_ID` = your numeric user ID from @userinfobot
5. Railway detects the Node app, runs `npm run build` then `npm start` (see `railway.json`), and keeps the process running continuously. No inbound HTTP port is needed since the bot uses long polling.
6. Every time you push to this branch, Railway redeploys automatically.

### Making memory survive redeploys (recommended)

By default the bot's memory (conversation history + remembered facts) is stored in a JSON file on the container's local disk. Railway gives each deploy a **fresh** filesystem, so without a persistent volume, memory resets every time you push a change - the same limitation the bot had before, just now easy to fix:

1. In your Railway service, go to **Settings → Volumes** and add a new volume (e.g. mounted at `/data`).
2. Add an environment variable: `DB_PATH` = `/data/store.json`.
3. Redeploy. From then on, memory persists across deploys and restarts.

If you skip this, the bot still works fine - it just forgets everything on the next redeploy, same as before.

That's it — the bot process runs continuously on Railway, so it stays responsive even when your computer or this session is off.

## Notes

- Never commit your real `BOT_TOKEN` or `GEMINI_API_KEY` — both are excluded via `.gitignore` (`.env`) and should be set as Railway environment variables instead.
- Without `DB_PATH` set to a volume path, storage still lives in `./data/store.json` locally/in-container - fine for local testing, but ephemeral on Railway without a volume (see above).
- Weather lookups use Open-Meteo (free, no API key). Web search isn't wired in - it would need a separate API key if you want that later.
- To extend the bot, edit `src/tools.ts` to add new tools, or `src/index.ts` for new commands/handlers.
