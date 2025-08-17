import { useEffect, useRef, useState } from "react";

async function decodeChunk(ctx: AudioContext, chunk: ArrayBuffer): Promise<AudioBuffer> {
  return await ctx.decodeAudioData(chunk.slice(0)); // slice to detach
}

export default function StreamingPlayer({ source }: { source: AsyncIterable<ArrayBuffer> }){
  const [started, setStarted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const queueRef = useRef<number>(0);

  useEffect(()=>{
    let cancelled = false;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    async function run(){
      let t = ctx.currentTime + 0.1;
      for await (const chunk of source){
        if (cancelled) break;
        try {
          const buf = await decodeChunk(ctx, chunk);
          const node = ctx.createBufferSource();
          node.buffer = buf;
          node.connect(ctx.destination);
          const dur = buf.duration;
          node.start(t);
          t += dur; // chain
          queueRef.current++;
          if (!started) setStarted(true);
        } catch {}
      }
    }
    run();
    return () => { cancelled = true; ctx.close(); };
  }, [source]);

  return (
    <div className="w-full">
      <div className="text-sm opacity-80 mb-2">{started ? "Streaming…" : "Preparing stream…"}</div>
      {/* Visual placeholder; playback is via AudioContext */}
      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-pulse"></div>
      </div>
    </div>
  );
}