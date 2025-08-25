import { Page } from "../components/Page";
import { useEffect, useMemo, useState } from "react";
import { useRecorder } from "../hooks/useRecorder";
import Waveform from "../components/Waveform";
import VUMeter from "../components/VUMeter";
import CountIn from "../components/CountIn";
import { uploadVoiceProfile } from "../lib/api";
import { useApp } from "../store/app";
import { useNavigate } from "react-router-dom";
import { RecLight } from "../components/RecLight";
import { PREPARED_SCRIPT } from "../lib/data";

export default function Record() {
  const { status, blob, start, stop, requestPermission, permission, stream } =
    useRecorder();
  const { setVoiceId } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [counting, setCounting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const nav = useNavigate();

  // Ask for mic permission on mount
  useEffect(() => {
    if (permission === "unknown") requestPermission();
  }, [permission, requestPermission]);

  // Timer during recording
  useEffect(() => {
    let t: number | undefined;
    if (status === "recording") {
      t = window.setInterval(
        () => setSeconds((s) => Math.min(59, s + 1)),
        1000
      );
      // Clear any old preview once we start a new take
      setPreviewUrl(undefined);
    } else {
      if (t) window.clearInterval(t);
    }
    return () => {
      if (t) window.clearInterval(t);
    };
  }, [status]);

  // Build preview URL when we have a blob
  useEffect(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [blob]);

  async function finish() {
    if (!blob) return;
    const { voiceId } = await uploadVoiceProfile(blob);
    console.log("Setting voice id: " + voiceId);
    setVoiceId(voiceId);
    nav("/ready");
  }

  function handleRecordClick() {
    // 3-2-1 overlay then start()
    setCounting(true);
  }

  function handleCountInDone() {
    setCounting(false);
    setSeconds(0);
    start();
  }

  function recordAgain() {
    setSeconds(0);
    setPreviewUrl(undefined);
    setCounting(true);
  }

  return (
    <Page>
      <div className="min-h-screen grid place-items-center p-8">
        <div className="max-w-3xl w-full space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              When you’re ready, hit the record button to start recording your
              voice.
            </h2>

            <RecLight recording={status === "recording"} />
          </div>

          <div className="card whitespace-pre-wrap text-lg leading-relaxed">
            <p className="text-sm text-neutral-400 mb-2">
              Here’s a script you can read along
            </p>
            {PREPARED_SCRIPT}
          </div>

          <div className="card">
            <Waveform seconds={seconds} stream={stream} />
            <div className="mt-3">
              <VUMeter stream={stream} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {status !== "recording" ? (
                <button className="btn btn-primary" onClick={handleRecordClick}>
                  ● Record
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => stop()}>
                  ■ Stop
                </button>
              )}

              {blob && (
                <>
                  <button className="btn btn-ghost" onClick={finish}>
                    Use this sample →
                  </button>
                  <button className="btn btn-ghost" onClick={recordAgain}>
                    Record again
                  </button>
                </>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4 space-y-2">
                <div className="text-sm opacity-70">Your sample preview</div>
                <audio controls src={previewUrl} />
              </div>
            )}
          </div>
        </div>
      </div>

      {counting && <CountIn seconds={3} onDone={handleCountInDone} />}
    </Page>
  );
}
