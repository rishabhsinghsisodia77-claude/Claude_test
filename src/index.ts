import "dotenv/config";
import { Bot, InlineKeyboard } from "grammy";
import { GoogleGenerativeAI } from "@google/generative-ai";
import telegramifyMarkdown from "telegramify-markdown";

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
const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
  systemInstruction:
    "Format replies using Markdown where it helps readability: **bold** for emphasis, `code` for technical terms, and bullet lists for multiple items. Keep formatting light and only use it when it genuinely improves clarity.",
});

const MAX_HISTORY_TURNS = 10;
type Turn = { role: "user" | "model"; parts: { text: string }[] };
const conversations = new Map<number, Turn[]>();

// Reset on every deploy/restart - fine for a personal-use notification, not persisted storage.
const notifiedUserIds = new Set<number>();

const THINKING_FRAMES = ["🤔 Thinking.", "🤔 Thinking..", "🤔 Thinking..."];

function toTelegramMarkdown(text: string): string {
  return telegramifyMarkdown(text, "escape");
}

const mainMenu = new InlineKeyboard()
  .text("🔄 Reset chat", "reset")
  .text("❓ Help", "help");

const bot = new Bot(token);

bot.api.setMyCommands([
  { command: "start", description: "Show the welcome screen" },
  { command: "help", description: "List what I can do" },
  { command: "reset", description: "Clear our conversation history" },
]);

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

const WELCOME_TEXT = [
  "✨ **Welcome!**",
  "",
  "I'm your personal AI chatbot, powered by Gemini.",
  "",
  "Just send me a message and I'll reply. I remember our conversation until you reset it.",
].join("\n");

const HELP_TEXT = [
  "🛠 **What I can do**",
  "",
  "- Send any message — I'll reply using Gemini",
  "- `/reset` — clear our conversation history",
  "- `/help` — show this message",
  "",
  "_Tip: I keep the last 10 exchanges in memory per chat._",
].join("\n");

const RESET_CONFIRMATION = "✅ Conversation history cleared.";

bot.command("start", (ctx) =>
  ctx.reply(toTelegramMarkdown(WELCOME_TEXT), { parse_mode: "MarkdownV2", reply_markup: mainMenu })
);

bot.command("help", (ctx) =>
  ctx.reply(toTelegramMarkdown(HELP_TEXT), { parse_mode: "MarkdownV2", reply_markup: mainMenu })
);

bot.command("reset", (ctx) => {
  conversations.delete(ctx.chat.id);
  return ctx.reply(RESET_CONFIRMATION);
});

bot.callbackQuery("reset", async (ctx) => {
  conversations.delete(ctx.chat!.id);
  await ctx.answerCallbackQuery({ text: "Conversation history cleared" });
  await ctx.editMessageText(RESET_CONFIRMATION);
});

bot.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(toTelegramMarkdown(HELP_TEXT), { parse_mode: "MarkdownV2", reply_markup: mainMenu });
});

bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;
  const history = conversations.get(chatId) ?? [];

  await ctx.replyWithChatAction("typing");
  const thinkingMsg = await ctx.reply(THINKING_FRAMES[0]);

  let frameIndex = 0;
  const animation = setInterval(() => {
    frameIndex = (frameIndex + 1) % THINKING_FRAMES.length;
    bot.api.editMessageText(chatId, thinkingMsg.message_id, THINKING_FRAMES[frameIndex]).catch(() => {});
  }, 1500);

  try {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(ctx.message.text);
    const reply = result.response.text();

    history.push({ role: "user", parts: [{ text: ctx.message.text }] });
    history.push({ role: "model", parts: [{ text: reply }] });
    conversations.set(chatId, history.slice(-MAX_HISTORY_TURNS * 2));

    clearInterval(animation);
    await bot.api.editMessageText(chatId, thinkingMsg.message_id, toTelegramMarkdown(reply), {
      parse_mode: "MarkdownV2",
    });
  } catch (err) {
    clearInterval(animation);
    console.error("Gemini error:", err);
    await bot.api
      .editMessageText(chatId, thinkingMsg.message_id, "⚠️ Sorry, I couldn't generate a reply just now. Please try again.")
      .catch(() => {});
  }
});

bot.catch((err) => {
  console.error("Bot error:", err.error);
});

bot.start();
console.log("Bot started with long polling.");
