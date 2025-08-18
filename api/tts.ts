// api/tts.ts
import { Buffer } from "node:buffer";

const ELEVEN = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY!;
if (!KEY) throw new Error("Missing ELEVENLABS_API_KEY");

export default async function handler(req: any, res: any) {
  // Basic CORS / preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end("2Method Not Allowed");

  // Body may arrive as string or object depending on the runtime
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

  // Abort upstream if client disconnects
  const controller = new AbortController();
  req.on?.("close", () => controller.abort());

  const up = await fetch(
    `${ELEVEN}/text-to-speech/${encodeURIComponent(voiceId)}`,
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

  if (!up.ok) {
    const msg = await up.text().catch(() => "tts failed");
    return res.status(up.status).send(msg);
  }

  const buf = Buffer.from(await up.arrayBuffer());
  res.setHeader("Content-Type", accept);
  res.setHeader("Content-Length", String(buf.length));
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(buf);
}
