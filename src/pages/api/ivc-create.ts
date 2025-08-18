// api/ivc-create.ts
import { Buffer } from "node:buffer";

const ELEVEN = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY!;
if (!KEY) throw new Error("Missing ELEVENLABS_API_KEY");

export default async function handler(req: any, res: any) {
  // CORS / preflight support (same headers on all responses)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  // Body may arrive as string or object depending on runtime
  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  const { name, description, labels, removeBackgroundNoise, files } = body;

  if (!name || !Array.isArray(files) || files.length === 0) {
    return res
      .status(400)
      .json({ error: "name and files[] (base64) required" });
  }

  const form = new FormData();
  form.append("name", name);
  if (description) form.append("description", description);
  if (labels) form.append("labels", JSON.stringify(labels));
  if (typeof removeBackgroundNoise === "boolean") {
    form.append("remove_background_noise", String(removeBackgroundNoise));
  }

  // Node 18 has Blob; pass filename via 3rd arg
  for (const f of files) {
    const bytes = Buffer.from(f.base64, "base64");
    const blob = new Blob([bytes], { type: f.contentType || "audio/mpeg" });
    form.append("files", blob, f.filename || "sample.mp3");
  }

  const up = await fetch(`${ELEVEN}/voices/ivc/create`, {
    method: "POST",
    headers: { "xi-api-key": KEY },
    body: form,
  });

  if (!up.ok) {
    const msg = await up.text().catch(() => "ivc create failed");
    return res.status(up.status).send(msg);
  }

  res.status(200).json(await up.json());
}
