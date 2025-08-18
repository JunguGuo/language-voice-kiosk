export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end("5Method Not Allowed");
}
