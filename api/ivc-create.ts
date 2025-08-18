import type { VercelRequest, VercelResponse } from "@vercel/node";

const ELEVEN = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY!;
if (!KEY) throw new Error("Missing ELEVENLABS_API_KEY");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { name, description, labels, removeBackgroundNoise, files } =
    req.body ?? {};
  if (!name || !Array.isArray(files) || files.length === 0) {
    return res
      .status(400)
      .json({ error: "name and files[] (base64) required" });
  }

  // Node-compatible FormData (global in Node 18+ on Vercel)
  const form = new FormData();
  form.append("name", name);
  if (description) form.append("description", description);
  if (labels) form.append("labels", JSON.stringify(labels));
  if (typeof removeBackgroundNoise === "boolean") {
    form.append("remove_background_noise", String(removeBackgroundNoise));
  }

  for (const f of files) {
    const buffer = Buffer.from(f.base64, "base64");
    form.append("files", new Blob([buffer]), f.filename || "sample.mp3");
  }

  const up = await fetch(`${ELEVEN}/voices/ivc/create`, {
    method: "POST",
    headers: { "xi-api-key": KEY },
    body: form,
  });

  if (!up.ok) {
    return res.status(up.status).send(await up.text());
  }

  res.status(200).json(await up.json());
}
