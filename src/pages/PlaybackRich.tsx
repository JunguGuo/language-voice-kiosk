import { useApp } from "../store/app";
import AudioPlayer from "../components/AudioPlayer";
import { Link, useNavigate } from "react-router-dom";
import { getScenarioText } from "../lib/data";
import { Page } from "../components/Page";

export default function PlaybackRich(){
  const { lastAudioUrl, selectedText } = useApp();
  const nav = useNavigate();
  const fallback = getScenarioText("order");

  return (
    <Page>
      <div className="min-h-screen p-8 grid place-items-center">
        <div className="max-w-5xl w-full space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-sm text-neutral-400 mb-2">Here’s your AI voice speaking:</div>
              <AudioPlayer src={lastAudioUrl} />
            </div>
            <div className="card text-sm leading-relaxed">
              <div className="opacity-70 mb-2">Transcript (EN / 中文)</div>
              <p className="mb-3">{(selectedText?.en ?? fallback.en)}</p>
              <p className="opacity-80">{(selectedText?.zh ?? fallback.zh)}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button onClick={()=>nav('/scenario')} className="btn btn-ghost">Try Another Scene</button>
            <button onClick={()=>nav('/languages')} className="btn btn-ghost">Try Another Language</button>
            <button onClick={()=>nav('/share')} className="btn btn-ghost">Share my Clip</button>
            <Link to="/" className="btn btn-primary">Exit</Link>
          </div>
        </div>
      </div>
    </Page>
  )
}