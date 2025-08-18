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
    }
  );

  if (!upstream.ok || !upstream.body)
    return res
      .status(upstream.status)
      .send(await upstream.text().catch(() => "stream failed"));

  res.setHeader("Content-Type", accept);
  res.setHeader("Transfer-Encoding", "chunked");

  const reader = (upstream.body as any).getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) res.write(Buffer.from(value));
    }
  } catch {}
  res.end();
}
