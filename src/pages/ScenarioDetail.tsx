import { useMemo } from "react";
import { getScenarioText } from "../lib/data";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../store/app";

export default function ScenarioDetail() {
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const key = sp.get("key") ?? "travel";
  const langCode = sp.get("lang") ?? "zh";
  const txt = useMemo(() => getScenarioText(key, langCode), [key, langCode]);
  const { setSelectedText } = useApp();

  function proceed() {
    setSelectedText(txt);
    nav("/working");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-sm text-neutral-400">
          Here’s the scene for your AI voice:
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card text-base leading-relaxed">{txt.en}</div>
          <div className="card text-base leading-relaxed">{txt.content}</div>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost" onClick={() => nav("/scenarios")}>
            Pick again
          </button>
          <button className="btn btn-primary" onClick={proceed}>
            Looks good! →
          </button>
        </div>
      </div>
    </div>
  );
}
