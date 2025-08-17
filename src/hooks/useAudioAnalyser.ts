import { useEffect, useMemo, useRef } from "react";

export function useAudioAnalyser(stream?: MediaStream) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!stream) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

    return () => {
      try { source.disconnect(); } catch {}
      try { analyser.disconnect(); } catch {}
      try { ctx.close(); } catch {}
      audioCtxRef.current = null;
      analyserRef.current = null;
    };
  }, [stream]);

  return {
    getByteTimeDomainData: () => {
      const analyser = analyserRef.current;
      const arr = dataArrayRef.current;
      if (!analyser || !arr) return undefined;
      analyser.getByteTimeDomainData(arr);
      return arr;
    }
  };
}