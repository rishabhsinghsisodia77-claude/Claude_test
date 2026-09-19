import "dotenv/config";
import { Bot, InlineKeyboard, type Context } from "grammy";
import { GoogleGenAI, type Content, type Part } from "@google/genai";
import telegramifyMarkdown from "telegramify-markdown";
import { toolDeclarations, executeTool } from "./tools";
import * as store from "./store";

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

const genAI = new GoogleGenAI({ apiKey: geminiApiKey });
const GEMINI_MODEL = "gemini-3.6-flash";

const BASE_INSTRUCTION = [
  "You are a helpful, general-purpose assistant chatting on Telegram.",
  "Format replies using Markdown where it helps readability: **bold** for emphasis, `code` for technical terms, and bullet lists for multiple items. Keep formatting light.",
  "You have tools available: use get_current_weather, calculate, and get_current_datetime when relevant instead of guessing.",
  "Use remember_fact to save durable facts the user shares about themselves (preferences, ongoing projects, personal details) so you can recall them in future conversations.",
].join(" ");

function createChatForUser(userId: number, history: Content[]) {
  const facts = store.getFacts(userId);
  const factsBlock = facts.length
    ? `\n\nKnown facts about this user, from earlier conversations:\n${facts.map((f) => `- ${f}`).join("\n")}`
    : "";
  return genAI.chats.create({
    model: GEMINI_MODEL,
    history,
    config: {
      systemInstruction: BASE_INSTRUCTION + factsBlock,
      tools: [{ functionDeclarations: toolDeclarations }],
    },
  });
}

const MAX_HISTORY_ENTRIES = 40;
const MAX_TOOL_ITERATIONS = 5;

function toTelegramMarkdown(text: string): string {
  return telegramifyMarkdown(text, "escape");
}

function sanitizeForStorage(history: Content[]): Content[] {
  return history.map((entry) => ({
    role: entry.role,
    parts: (entry.parts ?? []).map((part) =>
      "inlineData" in part && part.inlineData
        ? { text: `[attachment: ${part.inlineData.mimeType}]` }
        : part
    ),
  }));
}

const THINKING_FRAMES = ["🤔 Thinking.", "🤔 Thinking..", "🤔 Thinking..."];

const mainMenu = new InlineKeyboard().text("🔄 Reset chat", "reset").text("❓ Help", "help");

const bot = new Bot(token);

bot.api.setMyCommands([
  { command: "start", description: "Show the welcome screen" },
  { command: "help", description: "List what I can do" },
  { command: "reset", description: "Clear our conversation history" },
]);

bot.use(async (ctx, next) => {
  const from = ctx.from;
  if (from && String(from.id) !== adminChatId && !store.hasBeenNotified(from.id)) {
    store.markNotified(from.id);
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
  "I'm your personal AI assistant, powered by Gemini.",
  "",
  "I can chat, check the weather, do math, remember things about you, and understand photos and voice notes. Just send me anything.",
].join("\n");

const HELP_TEXT = [
  "🛠 **What I can do**",
  "",
  "- Send text, a photo, or a voice note — I'll respond",
  "- Ask about the weather, or give me a math expression to calculate",
  "- Tell me things about yourself and I'll remember them",
  "- `/reset` — clear our conversation history",
  "- `/help` — show this message",
  "",
  "_Tip: I keep the last several exchanges in memory per chat, saved persistently._",
].join("\n");

const RESET_CONFIRMATION = "✅ Conversation history cleared.";

bot.command("start", (ctx) =>
  ctx.reply(toTelegramMarkdown(WELCOME_TEXT), { parse_mode: "MarkdownV2", reply_markup: mainMenu })
);

bot.command("help", (ctx) =>
  ctx.reply(toTelegramMarkdown(HELP_TEXT), { parse_mode: "MarkdownV2", reply_markup: mainMenu })
);

bot.command("reset", (ctx) => {
  store.clearConversation(ctx.chat.id);
  return ctx.reply(RESET_CONFIRMATION);
});

bot.callbackQuery("reset", async (ctx) => {
  store.clearConversation(ctx.chat!.id);
  await ctx.answerCallbackQuery({ text: "Conversation history cleared" });
  await ctx.editMessageText(RESET_CONFIRMATION);
});

bot.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(toTelegramMarkdown(HELP_TEXT), { parse_mode: "MarkdownV2", reply_markup: mainMenu });
});

async function handleUserContent(ctx: Context, parts: Array<string | Part>): Promise<void> {
  const chatId = ctx.chat!.id;
  const userId = ctx.from!.id;
  const history = store.getConversation(chatId);

  await ctx.replyWithChatAction("typing");
  const thinkingMsg = await ctx.reply(THINKING_FRAMES[0]);

  let frameIndex = 0;
  const animation = setInterval(() => {
    frameIndex = (frameIndex + 1) % THINKING_FRAMES.length;
    bot.api.editMessageText(chatId, thinkingMsg.message_id, THINKING_FRAMES[frameIndex]).catch(() => {});
  }, 1500);

  try {
    const chat = createChatForUser(userId, history);
    let response = await chat.sendMessage({ message: parts });
    let calls = response.functionCalls;
    let iterations = 0;

    while (calls && calls.length > 0 && iterations < MAX_TOOL_ITERATIONS) {
      const responseParts: Part[] = [];
      for (const call of calls) {
        const output = await executeTool(userId, call.name ?? "", (call.args ?? {}) as Record<string, unknown>);
        responseParts.push({ functionResponse: { name: call.name, response: output } });
      }
      response = await chat.sendMessage({ message: responseParts });
      calls = response.functionCalls;
      iterations++;
    }

    const reply = response.text ?? "";
    const newHistory = chat.getHistory(true);
    store.setConversation(chatId, sanitizeForStorage(newHistory).slice(-MAX_HISTORY_ENTRIES));

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
}

async function fetchTelegramFileAsBase64(fileId: string): Promise<{ data: string; mimeType: string }> {
  const file = await bot.api.getFile(fileId);
  const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = file.file_path?.split(".").pop() ?? "";
  const extToMime: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    oga: "audio/ogg",
    ogg: "audio/ogg",
    mp3: "audio/mpeg",
  };
  const mimeType = res.headers.get("content-type") || extToMime[ext] || "application/octet-stream";
  return { data: buffer.toString("base64"), mimeType };
}

bot.on("message:text", (ctx) => handleUserContent(ctx, [ctx.message.text]));

bot.on("message:photo", async (ctx) => {
  const photos = ctx.message.photo;
  const largest = photos[photos.length - 1];
  const { data, mimeType } = await fetchTelegramFileAsBase64(largest.file_id);
  const caption = ctx.message.caption ?? "Describe this image.";
  await handleUserContent(ctx, [caption, { inlineData: { data, mimeType } }]);
});

bot.on("message:voice", async (ctx) => {
  const { data, mimeType } = await fetchTelegramFileAsBase64(ctx.message.voice.file_id);
  await handleUserContent(ctx, [
    { inlineData: { data, mimeType } },
    "Transcribe this voice message and respond to it.",
  ]);
});

bot.catch((err) => {
  console.error("Bot error:", err.error);
});

bot.start();
console.log("Bot started with long polling.");
