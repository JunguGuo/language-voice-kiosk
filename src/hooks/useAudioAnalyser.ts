// src/hooks/useAudioAnalyser.ts
import { useEffect, useRef } from "react";

export function useAudioAnalyser(stream?: MediaStream) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array>(new Uint8Array(0));

  useEffect(() => {
    if (!stream) return;

    const Ctx = (window.AudioContext ||
      (window as any).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctx();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    // Allocate a fresh buffer (backed by a plain ArrayBuffer at runtime)
    const arr = new Uint8Array(analyser.frequencyBinCount);
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
      if (!analyser || arr.length === 0) return undefined;

      // TS compat: cast to the signature the current DOM lib expects.
      (analyser.getByteTimeDomainData as unknown as (a: Uint8Array) => void)(
        arr as unknown as Uint8Array
      );

      return arr;
    },
  };
}
