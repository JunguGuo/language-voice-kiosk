// src/hooks/useAudioAnalyser.ts
import { useEffect, useRef } from "react";

export function useAudioAnalyser(stream?: MediaStream) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  // Assert the backing buffer to ArrayBuffer so TS is happy across DOM lib versions
  const dataRef = useRef<Uint8Array & { buffer: ArrayBuffer }>(
    new Uint8Array(0) as any
  );

  useEffect(() => {
    if (!stream) return;

    const Ctx = (window.AudioContext ||
      (window as any).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctx();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    // Create a fresh Uint8Array and assert its buffer type to ArrayBuffer
    const arr = new Uint8Array(analyser.frequencyBinCount) as any;
    dataRef.current = arr;

    source.connect(analyser);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;

    return () => {
      try {
        source.disconnect();
      } catch {}
      try {
        analyser.disconnect();
      } catch {}
      ctx.close().catch(() => {});
      audioCtxRef.current = null;
      analyserRef.current = null;
    };
  }, [stream]);

  return {
    getByteTimeDomainData: () => {
      const analyser = analyserRef.current;
      const arr = dataRef.current;
      if (!analyser || !arr || arr.length === 0) return undefined;
      // TS now sees Uint8Array with ArrayBuffer backing → OK
      analyser.getByteTimeDomainData(arr);
      return arr as Uint8Array;
    },
  };
}
