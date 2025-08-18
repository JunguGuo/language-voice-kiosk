// src/lib/api.ts
import { label } from "framer-motion/client";
import { API_BASE } from "./env";
const USE_MOCKS =
  import.meta.env.VITE_USE_MOCKS === "1" ||
  String(import.meta.env.VITE_USE_MOCKS).toLowerCase() === "true";

export type Language = { code: string; name: string; samplePhrases?: string[] };

// Create a voice clone by proxying to /api/ivc-create (which talks to ElevenLabs)
async function realUploadVoiceProfile(
  blob: Blob
): Promise<{ voiceId: string }> {
  console.log("API_BASE is", API_BASE);

  const form = new FormData();
  form.append("name", "Kiosk Voice");
  form.append(
    "files",
    new File([blob], "sample.webm", { type: blob.type || "audio/webm" })
  );
  // form.append("labels", "Language Kiosk");
  // form.append("removeBackgroundNoise", "true");

  const res = await fetch(`${API_BASE}/api/ivc-create`, {
    method: "POST",
    credentials: "include",
    body: form, // <- no JSON, just FormData; send as multipart
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to create voice clone: ${res.status} ${msg}`);
  }
  const data = await res.json(); // { voice_id, ... }
  console.log("ivc-create response:", data);
  return { voiceId: data.voice_id };
}

// (Optional) If you want a real list, you can still hardcode or fetch from your backend.
// Keeping a tiny static real list here (frontends usually don’t need a backend for this).
async function realGetLanguages(): Promise<Language[]> {
  return [
    { code: "zh", name: "Chinese (Mandarin)" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
  ];
}

// Generate speech (non-streaming) via /api/tts (which calls ElevenLabs convert)
async function realSynthesize(opts: {
  text: string;
  languageCode: string;
  voiceId: string;
}): Promise<Blob> {
  const res = await fetch(`${API_BASE}/api/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      voiceId: opts.voiceId,
      text: opts.text,
      modelId: "eleven_multilingual_v2", // optional, but good default
      outputFormat: "mp3_44100_128", // optional, backend already defaults
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Synthesis failed: ${res.status} ${errText}`);
  }
  console.log("Synthesis done!");
  return await res.blob(); // 🔊 audio blob
}
// Streaming synth helper (if you want sub-second start; feed res.body to your player)
export async function synthesizeStream(opts: {
  text: string;
  languageCode: string;
  voiceId: string;
}) {
  const res = await fetch(`${API_BASE}/api/tts-stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      voiceId: opts.voiceId,
      text: opts.text,
      // optional: modelId, outputFormat, voiceSettings
    }),
  });
  if (!res.ok || !res.body) throw new Error("Stream failed");
  return res.body as ReadableStream<Uint8Array>;
}

// ---------- Mock implementations (no backend needed) ----------
async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function mockUploadVoiceProfile(_: Blob): Promise<{ voiceId: string }> {
  await delay(400);
  return { voiceId: "dev-voice-123" };
}

async function mockGetLanguages(): Promise<Language[]> {
  await delay(200);
  return [
    {
      code: "zh",
      name: "Chinese (Mandarin)",
      samplePhrases: ["你好，欢迎来到克利夫兰公共图书馆！", "今天天气真好。"],
    },
    {
      code: "es",
      name: "Spanish",
      samplePhrases: ["¡Bienvenido a la biblioteca!", "¿Cómo estás?"],
    },
    {
      code: "fr",
      name: "French",
      samplePhrases: ["Bonjour et bienvenue à la bibliothèque.", "Ça va ?"],
    },
    {
      code: "ar",
      name: "Arabic",
      samplePhrases: ["مرحبًا بكم في المكتبة.", "كيف حالك؟"],
    },
  ];
}

import { beepBlob } from "./mocks";
async function mockSynthesize(_: {
  text: string;
  languageCode: string;
  voiceId: string;
}): Promise<Blob> {
  await delay(500);
  return beepBlob();
}

// ---------- Exports ----------
export const uploadVoiceProfile = USE_MOCKS
  ? mockUploadVoiceProfile
  : realUploadVoiceProfile;
export const getLanguages = mockGetLanguages;
//export const getLanguages = USE_MOCKS ? mockGetLanguages : realGetLanguages;
export const synthesize = USE_MOCKS ? mockSynthesize : realSynthesize;
