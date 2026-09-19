import { Type, type FunctionDeclaration } from "@google/genai";
import { evaluate } from "mathjs";
import { addFact } from "./store";

export const toolDeclarations: FunctionDeclaration[] = [
  {
    name: "get_current_weather",
    description: "Get the current weather for a city or location.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        location: { type: Type.STRING, description: "City name, e.g. 'Mumbai' or 'London'" },
      },
      required: ["location"],
    },
  },
  {
    name: "calculate",
    description: "Evaluate a mathematical expression and return the numeric result.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        expression: { type: Type.STRING, description: "A math expression, e.g. '12 * (3 + 4) / 2'" },
      },
      required: ["expression"],
    },
  },
  {
    name: "get_current_datetime",
    description: "Get the current date and time.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "remember_fact",
    description:
      "Save an important fact about the user for future conversations - e.g. preferences, ongoing projects, or personal details they share. Only call this for facts worth remembering long-term.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        fact: { type: Type.STRING, description: "A concise fact, written in third person." },
      },
      required: ["fact"],
    },
  },
];

async function geocodeLocation(location: string): Promise<{ lat: number; lon: number; name: string } | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
  const res = await fetch(url);
  const geo = (await res.json()) as { results?: { latitude: number; longitude: number; name: string }[] };
  const result = geo.results?.[0];
  if (!result) return null;
  return { lat: result.latitude, lon: result.longitude, name: result.name };
}

async function getCurrentWeather(location: string): Promise<Record<string, unknown>> {
  const geo = await geocodeLocation(location);
  if (!geo) return { error: `Could not find location: ${location}` };
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;
  const res = await fetch(url);
  const forecast = (await res.json()) as { current: Record<string, number> };
  return { location: geo.name, ...forecast.current };
}

function calculate(expression: string): Record<string, unknown> {
  try {
    return { result: evaluate(expression) };
  } catch {
    return { error: `Could not evaluate expression: ${expression}` };
  }
}

function getCurrentDatetime(): Record<string, unknown> {
  return { iso: new Date().toISOString() };
}

export async function executeTool(userId: number, name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> {
  switch (name) {
    case "get_current_weather":
      return getCurrentWeather(String(args.location));
    case "calculate":
      return calculate(String(args.expression));
    case "get_current_datetime":
      return getCurrentDatetime();
    case "remember_fact":
      addFact(userId, String(args.fact));
      return { status: "saved" };
    default:
      return { error: `Unknown tool: ${name}` };
  }
}
