export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ ok: true }));
}
