const ELEVEN = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY!;
if (!KEY) throw new Error("Missing ELEVENLABS_API_KEY");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const {
    voiceId,
    text,
    modelId = "eleven_multilingual_v2",
    outputFormat = "mp3_44100_128",
    voiceSettings,
  } = req.body ?? {};
  if (!voiceId || !text)
    return res.status(400).json({ error: "voiceId and text required" });

  const accept = outputFormat.startsWith("mp3")
    ? "audio/mpeg"
    : outputFormat.startsWith("wav")
    ? "audio/wav"
    : "audio/pcm";

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
    }
  );

  if (!up.ok) return res.status(up.status).send(await up.text());
  const buf = Buffer.from(await up.arrayBuffer());
  res.setHeader("Content-Type", accept);
  res.setHeader("Content-Length", String(buf.length));
  res.status(200).send(buf);
}
