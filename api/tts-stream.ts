// api/tts-stream.ts
import { Buffer } from "node:buffer";

const ELEVEN = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY!;
if (!KEY) throw new Error("Missing ELEVENLABS_API_KEY");

export default async function handler(req: any, res: any) {
  // Basic CORS / preflight (safe defaults)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end("1Method Not Allowed");

  // Body might be a parsed object or a JSON string depending on the runtime
  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  const {
    voiceId,
    text,
    modelId = "eleven_multilingual_v2",
    outputFormat = "mp3_44100_128",
    voiceSettings,
  } = body;

  if (!voiceId || !text) {
    return res.status(400).json({ error: "voiceId and text required" });
  }

  const accept = outputFormat.startsWith("mp3")
    ? "audio/mpeg"
    : outputFormat.startsWith("wav")
    ? "audio/wav"
    : "audio/pcm";

  // Abort upstream fetch if client disconnects
  const controller = new AbortController();
  req.on?.("close", () => controller.abort());

  const upstream = await fetch(
    `${ELEVEN}/text-to-speech/${encodeURIComponent(voiceId)}/stream`,
    {
      method: "POST",
      headers: {
        "xi-api-key": KEY,
        "Content-Type": "application/json",
        Accept: accept,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        output_format: outputFormat,
        voice_settings: voiceSettings,
      }),
      signal: controller.signal,
    }
  );

  if (!upstream.ok || !upstream.body) {
    const msg = await upstream.text().catch(() => "stream failed");
    return res.status(upstream.status).send(msg);
  }

  res.setHeader("Content-Type", accept);
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-store");

  const reader = (upstream.body as any).getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) res.write(Buffer.from(value));
    }
  } catch {
    // ignore errors caused by client aborts
  } finally {
    res.end();
    controller.abort();
  }
}
