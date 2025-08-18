// src/pages/StartWithVoice.tsx
import { Page } from "../components/Page";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../store/app";

export default function StartWithVoice() {
  const nav = useNavigate();
  const { setVoiceId } = useApp();

  function useDefaultVoice() {
    setVoiceId("D2nPIIVVfOgcG7nmHQom");
    nav("/languages");
  }

  return (
    <Page>
      <div className="h-screen grid place-items-center px-8">
        <div className="max-w-3xl w-full space-y-8">
          <h2 className="text-4xl font-bold">Let’s Start with Your Voice</h2>
          <p className="text-neutral-400">
            Speak for 15 seconds to create a personalized voice model. It’s
            quick, safe, and just for fun.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <button onClick={() => nav("/record")} className="card text-left">
              <div className="text-xl font-semibold">
                Speak freely in any language
              </div>
              <div className="opacity-70 mt-2 text-sm">
                Ad-lib a short introduction. We’ll guide you.
              </div>
              <div className="mt-4">
                <span className="btn btn-ghost">Start now →</span>
              </div>
            </button>

            <Link to="/script" className="card text-left">
              <div className="text-xl font-semibold">
                Read a prepared script in English
              </div>
              <div className="opacity-70 mt-2 text-sm">
                Simple, clear, and quick to read aloud.
              </div>
              <div className="mt-4">
                <span className="btn btn-ghost">See the script →</span>
              </div>
            </Link>

            {/* ✅ New option for default voice */}
            <button onClick={useDefaultVoice} className="card text-left">
              <div className="text-xl font-semibold">
                Skip and use default voice
              </div>
              <div className="opacity-70 mt-2 text-sm">
                Jump right in with a ready-made voice model.
              </div>
              <div className="mt-4">
                <span className="btn btn-ghost">Continue →</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
