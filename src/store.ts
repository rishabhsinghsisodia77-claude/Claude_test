import fs from "fs";
import path from "path";
import type { Content } from "@google/genai";

interface StoreData {
  conversations: Record<string, Content[]>;
  notifiedUserIds: number[];
  userFacts: Record<string, string[]>;
}

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), "data", "store.json");

function loadData(): StoreData {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { conversations: {}, notifiedUserIds: [], userFacts: {} };
  }
}

const data = loadData();

function save(): void {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getConversation(chatId: number): Content[] {
  return data.conversations[String(chatId)] ?? [];
}

export function setConversation(chatId: number, history: Content[]): void {
  data.conversations[String(chatId)] = history;
  save();
}

export function clearConversation(chatId: number): void {
  delete data.conversations[String(chatId)];
  save();
}

export function hasBeenNotified(userId: number): boolean {
  return data.notifiedUserIds.includes(userId);
}

export function markNotified(userId: number): void {
  data.notifiedUserIds.push(userId);
  save();
}

export function getFacts(userId: number): string[] {
  return data.userFacts[String(userId)] ?? [];
}

export function addFact(userId: number, fact: string): void {
  const facts = getFacts(userId);
  facts.push(fact);
  data.userFacts[String(userId)] = facts;
  save();
}
