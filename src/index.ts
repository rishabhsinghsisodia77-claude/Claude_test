import "dotenv/config";
import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN environment variable is not set");
}

const bot = new Bot(token);

bot.command("start", (ctx) =>
  ctx.reply(
    "Hi! I'm alive. Send me anything and I'll echo it back. Try /help for commands."
  )
);

bot.command("help", (ctx) =>
  ctx.reply(["Available commands:", "/start - greet the bot", "/help - show this message", "", "Any other message is echoed back."].join("\n"))
);

bot.on("message:text", (ctx) => ctx.reply(ctx.message.text));

bot.catch((err) => {
  console.error("Bot error:", err.error);
});

bot.start();
console.log("Bot started with long polling.");
