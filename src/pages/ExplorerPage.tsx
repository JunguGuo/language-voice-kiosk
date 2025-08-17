import { useEffect, useRef, useState } from "react";
import { getLanguages, synthesize, type Language } from "../lib/api";
import { useApp } from "../store/app";
import AudioPlayer from "../components/AudioPlayer";
import { useNavigate } from "react-router-dom";

export default function ExplorerPage() {
  const { voiceId, setLastAudioUrl } = useApp();
  const [langs, setLangs] = useState<Language[]>([]);
  const [lang, setLang] = useState<string | undefined>(undefined);
  const [text, setText] = useState("你好，欢迎来到克利夫兰公共图书馆！");
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const prevUrlRef = useRef<string | undefined>(undefined);

  const nav = useNavigate();

  useEffect(() => {
    getLanguages()
      .then((ls) => {
        setLangs(ls);
        if (ls[0]) setLang(ls[0].code);
      })
      .catch(() => setLangs([]));
  }, []);

  // Ensure we have a voice profile
  if (!voiceId)
    return (
      <div className="p-8">
        No voice profile yet.{" "}
        <button className="underline" onClick={() => nav("/capture")}>
          Record now
        </button>
      </div>
    );

  async function go() {
    const code = lang ?? langs[0]?.code ?? "zh"; // safe fallback
    const blob = await synthesize({ text, languageCode: code, voiceId });
    // Clean up any previous ObjectURL to prevent leaks
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    const url = URL.createObjectURL(blob);
    prevUrlRef.current = url;
    setAudioUrl(url);
    setLastAudioUrl(url);
  }

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Language Explorer</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          className="border rounded p-2"
          value={lang ?? ""} // avoid uncontrolled/undefined
          onChange={(e) => setLang(e.target.value || undefined)}
          disabled={!langs.length}
        >
          {langs.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>

        <input
          className="flex-1 border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something to say…"
        />

        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          onClick={go}
          disabled={!langs.length}
        >
          Speak it
        </button>
      </div>

      <AudioPlayer src={audioUrl} autoPlay />
    </div>
  );
}
