import { Page } from "../components/Page";
import { useEffect, useState } from "react";
import { getLanguages, type Language } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { LangItem } from "../components/LangItem";
import { useApp } from "../store/app";

export default function LanguagePick() {
  const [langs, setLangs] = useState<Language[]>([]);
  const [idx, setIdx] = useState(0);
  const nav = useNavigate();
  const { setLanguage } = useApp();

  useEffect(() => {
    getLanguages().then(setLangs);
  }, []);

  function proceed() {
    const code = langs[idx]?.code;
    if (code) {
      setLanguage(code);
      nav("/scenarios");
    }
  }

  return (
    <Page>
      <div className="h-screen grid place-items-center px-8">
        <div className="w-full max-w-3xl grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="card p-0">
            {langs.map((l, i) => (
              <button
                key={l.code}
                onClick={() => setIdx(i)}
                className="w-full text-left"
              >
                <LangItem active={i === idx} label={l.name} />
              </button>
            ))}
          </div>
          <div className="space-y-6">
            <div className="opacity-60">Pick a Language—Any Language!</div>
            <button onClick={proceed} className="btn btn-primary">
              I’m ready →
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
