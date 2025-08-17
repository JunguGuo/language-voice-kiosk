import { useEffect, useRef } from "react";

export default function AudioPlayer({ src, autoPlay=false }: { src?: string, autoPlay?: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (autoPlay && ref.current && src) {
      ref.current.play().catch(() => {});
    }
  }, [src, autoPlay]);
  if (!src) return null;
  return <audio ref={ref} controls src={src} className="w-full" />;
}