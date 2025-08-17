import { useEffect, useRef } from "react";

export function useAudioAnalyser(stream?: MediaStream) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array>(new Uint8Array(0));

  useEffect(() => {
    if (!stream) return;
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);
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
      if (!analyser || dataRef.current.length === 0) return undefined;
      analyser.getByteTimeDomainData(dataRef.current); // expects Uint8Array
      return dataRef.current;
    },
  };
}
