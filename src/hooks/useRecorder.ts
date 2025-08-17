import { useEffect, useRef, useState } from "react";

type Status = "idle" | "recording" | "paused";

export function useRecorder(opts: { mimeType?: string } = {}) {
  const { mimeType = "audio/webm" } = opts;
  const [status, setStatus] = useState<Status>("idle");
  const [permission, setPermission] = useState<"unknown"|"granted"|"denied">("unknown");
  const [blob, setBlob] = useState<Blob | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  async function requestPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermission("granted");
      return true;
    } catch {
      setPermission("denied");
      return false;
    }
  }

  async function start() {
    if (permission === "unknown") {
      const ok = await requestPermission();
      if (!ok) return;
    }
    if (!streamRef.current) {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    const mr = new MediaRecorder(streamRef.current!, { mimeType });
    chunksRef.current = [];
    mr.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
    mr.onstop = () => setBlob(new Blob(chunksRef.current, { type: mimeType }));
    mr.start();
    mediaRecorderRef.current = mr;
    setStatus("recording");
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    setStatus("idle");
  }

  function pause() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setStatus("paused");
    }
  }

  function resume() {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setStatus("recording");
    }
  }

  return { status, permission, blob, start, stop, pause, resume, requestPermission, stream: streamRef.current ?? undefined };
}