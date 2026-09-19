# Telegram Chatbot

A general-purpose, always-on Telegram chatbot built with [grammY](https://grammy.dev) and Google's Gemini API (free tier). Supports:

- `/start` - greeting message
- `/help` - list of commands
- `/reset` - clear conversation history for the current chat
- Any other text message is sent to Gemini for a reply, with short per-chat conversation memory
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

The bot uses this to message you whenever a new person starts using it (username + user ID only, once per unique user — it won't notify again for their later messages, though it will re-notify after a redeploy/restart since that list isn't persisted).

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

That's it — the bot process runs continuously on Railway, so it stays responsive even when your computer or this session is off.

## Notes

- Never commit your real `BOT_TOKEN` or `GEMINI_API_KEY` — both are excluded via `.gitignore` (`.env`) and should be set as Railway environment variables instead.
- Conversation history is kept in memory per chat (last 10 turns) and is lost on restart/redeploy — fine for a personal bot, but not persistent storage.
- To extend the bot, add more `bot.command(...)` or `bot.on(...)` handlers in `src/index.ts`.
