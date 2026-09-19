# Telegram Echo Bot

A simple always-on Telegram bot built with [grammY](https://grammy.dev). Supports:

- `/start` - greeting message
- `/help` - list of commands
- Any other text message is echoed back

## 1. Create the bot on Telegram

1. Open Telegram and message [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts (choose a name and a unique username ending in `bot`).
3. BotFather gives you a token like `123456789:ABCдефGhIJKlmNoPQRsTUVwxyZ`. Copy it.

## 2. Run it locally (optional, for testing)

```bash
npm install
cp .env.example .env
# paste your token into .env as BOT_TOKEN=...
npm run dev
```

Message your bot on Telegram — it should reply.

## 3. Deploy on Railway so it stays live 24/7

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [railway.app](https://railway.app) and sign in with GitHub.
3. Click **New Project → Deploy from GitHub repo**, select this repository.
4. In the Railway project settings, go to **Variables** and add:
   - `BOT_TOKEN` = the token from BotFather
5. Railway will detect the Node app, run `npm run build` then `npm start` (see `railway.json`), and keep the process running continuously. No inbound HTTP port is needed since the bot uses long polling.
6. Every time you push to this branch, Railway redeploys automatically.

That's it — the bot process runs continuously on Railway, so it stays responsive even when your computer or this session is off.

## Notes

- Never commit your real `BOT_TOKEN` — it's excluded via `.gitignore` (`.env`) and set as a Railway environment variable instead.
- To extend the bot, add more `bot.command(...)` or `bot.on(...)` handlers in `src/index.ts`.
