import { useEffect, useRef } from "react";
import { useAudioAnalyser } from "../hooks/useAudioAnalyser";

export default function Waveform({ seconds=0, stream }: { seconds?: number, stream?: MediaStream }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { getByteTimeDomainData } = useAudioAnalyser(stream);

  useEffect(() => {
    let raf: number;
    const ctx = canvasRef.current?.getContext("2d");
    const draw = () => {
      if (!ctx || !canvasRef.current) { raf = requestAnimationFrame(draw); return; }
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0,0,w,h);

      const data = getByteTimeDomainData?.();
      if (data) {
        ctx.strokeStyle = "#8b8b8b";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const slice = w / data.length;
        for (let i=0; i<data.length; i++){
          const v = (data[i] / 128.0) - 1.0;
          const y = h/2 + v * (h*0.4);
          const x = i * slice;
          i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      } else {
        // idle placeholder bars
        ctx.fillStyle = "#2a2a2a";
        for (let i=0;i<60;i++){
          const barH = Math.sin((Date.now()/300 + i)/3)*10 + 24 + (i%7)*1.2;
          ctx.fillRect(8+i*8, h - barH, 4, barH);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [getByteTimeDomainData]);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="w-full h-24 rounded-xl border border-neutral-800 bg-neutral-900" width={800} height={96} />
      <div className="mt-3 text-center text-sm opacity-70">00:{String(seconds).padStart(2,'0')}</div>
    </div>
  )
}