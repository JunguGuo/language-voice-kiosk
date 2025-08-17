import { useState, useMemo } from "react";
import { useRecorder } from "../hooks/useRecorder";
import { uploadVoiceProfile } from "../lib/api";
import { useApp } from "../store/app";
import { useNavigate } from "react-router-dom";

export default function CapturePage() {
  const { status, blob, start, stop, permission, requestPermission } = useRecorder();
  const setVoiceId = useApp(s => s.setVoiceId);
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);

  const previewUrl = useMemo(() => blob ? URL.createObjectURL(blob) : undefined, [blob]);

  async function handleFinish() {
    if (!blob) return;
    setBusy(true);
    try {
      const { voiceId } = await uploadVoiceProfile(blob);
      setVoiceId(voiceId);
      nav("/explore");
    } catch (e) {
      alert("Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold">Record a short sample</h2>
      {permission === "unknown" && (
        <button className="px-4 py-2 rounded bg-gray-900 text-white" onClick={requestPermission}>
          Allow Microphone
        </button>
      )}

      <div className="flex items-center gap-4">
        {status !== "recording" ? (
          <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={async () => { await start(); }}>
            ● Record
          </button>
        ) : (
          <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={() => { stop(); }}>
            ■ Stop
          </button>
        )}
        {blob && (
          <button className="px-4 py-2 rounded bg-blue-600 text-white" disabled={busy} onClick={handleFinish}>
            {busy ? "Uploading..." : "Use this sample"}
          </button>
        )}
      </div>

      {blob && (
        <div className="space-y-2">
          <p className="text-sm opacity-70">Preview</p>
          <audio controls src={previewUrl} />
        </div>
      )}
    </div>
  );
}