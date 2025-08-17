import { useEffect, useRef } from "react";
import { useAudioAnalyser } from "../hooks/useAudioAnalyser";

export default function VUMeter({ stream }: { stream?: MediaStream }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { getByteTimeDomainData } = useAudioAnalyser(stream);

  useEffect(() => {
    let raf: number;
    const ctx = canvasRef.current?.getContext("2d");
    const draw = () => {
      const w = canvasRef.current?.width || 300;
      const h = canvasRef.current?.height || 40;
      if (!ctx || !canvasRef.current) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);

      const data = getByteTimeDomainData?.();
      let rms = 0.0;
      if (data) {
        for (let i = 0; i < data.length; i++) {
          const v = data[i] / 128 - 1;
          rms += v * v;
        }
        rms = Math.sqrt(rms / data.length);
      }
      const bars = 48;
      const gap = 4;
      const bw = (w - (bars + 1) * gap) / bars;
      for (let i = 0; i < bars; i++) {
        const level = Math.max(0, Math.min(1, rms * 3 - i * 0.04));
        const barH = level * h;
        ctx.fillStyle = i > bars * 0.7 ? "#ef4444" : "#a3a3a3";
        ctx.fillRect(gap + i * (bw + gap), h - barH, bw, barH);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [getByteTimeDomainData]);

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={36}
      className="w-full h-9 rounded-lg border border-neutral-800 bg-neutral-900"
    />
  );
}
