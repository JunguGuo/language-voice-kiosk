import { useEffect, useRef, useState } from "react";

// Normalize ArrayBuffer | SharedArrayBuffer → ArrayBuffer
function toArrayBuffer(data: ArrayBuffer | ArrayBufferLike): ArrayBuffer {
  if (data instanceof ArrayBuffer) return data.slice(0); // detach copy
  const src = new Uint8Array(data as ArrayBufferLike);
  const buf = new ArrayBuffer(src.byteLength);
  new Uint8Array(buf).set(src); // copy
  return buf;
}

async function decodeChunk(
  ctx: AudioContext,
  chunk: ArrayBuffer | ArrayBufferLike
): Promise<AudioBuffer> {
  const ab = toArrayBuffer(chunk);
  return await ctx.decodeAudioData(ab);
}

export default function StreamingPlayer({
  source,
}: {
  source: AsyncIterable<ArrayBuffer | ArrayBufferLike>;
}) {
  const [started, setStarted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    async function run() {
      let t = ctx.currentTime + 0.1;
      for await (const chunk of source) {
        if (cancelled) break;
        try {
          const buf = await decodeChunk(ctx, chunk);
          const node = ctx.createBufferSource();
          node.buffer = buf;
          node.connect(ctx.destination);
          node.start(t);
          t += buf.duration;
          if (!started) setStarted(true);
        } catch {
          // ignore decode hiccups in mock stream
        }
      }
    }
    run();

    return () => {
      cancelled = true;
      ctx.close().catch(() => {});
    };
  }, [source, started]);

  return (
    <div className="w-full">
      <div className="text-sm opacity-80 mb-2">
        {started ? "Streaming…" : "Preparing stream…"}
      </div>
      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-pulse" />
      </div>
    </div>
  );
}
