import "dotenv/config";
import { Bot } from "grammy";
import { GoogleGenerativeAI } from "@google/generative-ai";

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN environment variable is not set");
}

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const adminChatId = process.env.ADMIN_CHAT_ID;
if (!adminChatId) {
  throw new Error("ADMIN_CHAT_ID environment variable is not set");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

const MAX_HISTORY_TURNS = 10;
type Turn = { role: "user" | "model"; parts: { text: string }[] };
const conversations = new Map<number, Turn[]>();

// Reset on every deploy/restart - fine for a personal-use notification, not persisted storage.
const notifiedUserIds = new Set<number>();

const bot = new Bot(token);

bot.use(async (ctx, next) => {
  const from = ctx.from;
  if (from && String(from.id) !== adminChatId && !notifiedUserIds.has(from.id)) {
    notifiedUserIds.add(from.id);
    const username = from.username ? `@${from.username}` : "(no username)";
    bot.api
      .sendMessage(adminChatId, `New user using your bot:\nUsername: ${username}\nUser ID: ${from.id}`)
      .catch((err) => console.error("Failed to notify admin:", err));
  }
  await next();
});

bot.command("start", (ctx) =>
  ctx.reply(
    "Hi! I'm a general-purpose chatbot. Ask me anything. Use /reset to clear our conversation history, or /help for commands."
  )
);

bot.command("help", (ctx) =>
  ctx.reply(
    [
      "Available commands:",
      "/start - greet the bot",
      "/reset - clear conversation history for this chat",
      "/help - show this message",
      "",
      "Any other message is sent to the chatbot for a reply.",
    ].join("\n")
  )
);

bot.command("reset", (ctx) => {
  conversations.delete(ctx.chat.id);
  return ctx.reply("Conversation history cleared.");
});

bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;
  const history = conversations.get(chatId) ?? [];

  await ctx.replyWithChatAction("typing");

  try {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(ctx.message.text);
    const reply = result.response.text();

    history.push({ role: "user", parts: [{ text: ctx.message.text }] });
    history.push({ role: "model", parts: [{ text: reply }] });
    conversations.set(chatId, history.slice(-MAX_HISTORY_TURNS * 2));

    await ctx.reply(reply);
  } catch (err) {
    console.error("Gemini error:", err);
    await ctx.reply("Sorry, I couldn't generate a reply just now. Please try again.");
  }
});

bot.catch((err) => {
  console.error("Bot error:", err.error);
});

bot.start();
console.log("Bot started with long polling.");
