import { Page } from "../components/Page";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/app";
import { synthesize } from "../lib/api";

export default function Working(){
  const nav = useNavigate();
  const { voiceId, languageCode, setLastAudioUrl, selectedText } = useApp();

  useEffect(()=>{
    async function go(){
      if (!voiceId || !languageCode) { nav('/'); return; }
      const blob = await synthesize({ text: (languageCode === 'zh' ? (selectedText?.zh ?? '你好') : (selectedText?.en ?? 'Hello')), languageCode, voiceId });
      const url = URL.createObjectURL(blob);
      setLastAudioUrl(url);
      setTimeout(()=> nav('/playback'), 300);
    }
    go();
  },[]);

  return (
    <Page>
    <div className="h-screen grid place-items-center">
      <div className="w-full max-w-2xl px-8">
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-white animate-pulse"></div>
        </div>
        <p className="mt-4 text-center opacity-80">Your AI voice is working on it…</p>
      </div>
    </div>
    </Page>
  )
}