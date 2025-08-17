import { API_BASE } from "./env";
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS === "1" || String(import.meta.env.VITE_USE_MOCKS).toLowerCase() === "true");
export type Language = { code: string; name: string; samplePhrases?: string[] };

// ---- Real implementations ----
async function realUploadVoiceProfile(blob: Blob): Promise<{ voiceId: string }> {
  const fd = new FormData();
  fd.append("audio", blob, "capture.webm");
  const res = await fetch(`${API_BASE}/api/voice-profile`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Failed to create voice profile");
  return res.json();
}

async function realGetLanguages(): Promise<Language[]> {
  const res = await fetch(`${API_BASE}/api/languages`);
  if (!res.ok) throw new Error("Failed to load languages");
  return res.json();
}

async function realSynthesize(opts: { text: string; languageCode: string; voiceId: string }): Promise<Blob> {
  const res = await fetch(`${API_BASE}/api/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  });
  if (!res.ok) throw new Error("Synthesis failed");
  return await res.blob();
}

// ---- Mock implementations (no backend needed) ----
async function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function mockUploadVoiceProfile(blob: Blob): Promise<{ voiceId: string }> {
  await delay(400);
  return { voiceId: "dev-voice-123" };
}

async function mockGetLanguages(): Promise<Language[]> {
  await delay(200);
  return [
    { code: "zh", name: "Chinese (Mandarin)", samplePhrases: ["你好，欢迎来到克利夫兰公共图书馆！", "今天天气真好。"] },
    { code: "es", name: "Spanish", samplePhrases: ["¡Bienvenido a la biblioteca!", "¿Cómo estás?"] },
    { code: "fr", name: "French", samplePhrases: ["Bonjour et bienvenue à la bibliothèque.", "Ça va ?"] },
    { code: "ar", name: "Arabic", samplePhrases: ["مرحبًا بكم في المكتبة.", "كيف حالك؟"] },
  ];
}

import { beepBlob } from "./mocks";
async function mockSynthesize(_: { text: string; languageCode: string; voiceId: string }): Promise<Blob> {
  await delay(500);
  // Return a tiny WAV "beep" so the audio player actually has something to play
  return beepBlob();
}

export const uploadVoiceProfile = USE_MOCKS ? mockUploadVoiceProfile : realUploadVoiceProfile;
export const getLanguages = USE_MOCKS ? mockGetLanguages : realGetLanguages;
export const synthesize = USE_MOCKS ? mockSynthesize : realSynthesize;