import { Page } from "../components/Page";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Page>
      <div className="h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-8 grid gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-neutral-500 text-sm mb-2">
              你叫什么名字 你吃了吗 你好
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold">
              Ever wondered how you sound speaking{" "}
              <span className="underline decoration-pink-400 decoration-4 underline-offset-4">
                Chinese
              </span>
              ?
            </h1>
            <p className="mt-6 opacity-80 text-lg max-w-prose">
              At the library, we make languages playful. Try a 15‑second voice
              capture and hear yourself speak in another language—instantly.
            </p>
            <div className="mt-8">
              <Link to="/start" className="btn btn-primary">
                Start Speaking
              </Link>
            </div>
            <p className="mt-6 text-xs opacity-60">
              The experience uses a secure, temporary voice sample only and
              never stores your raw audio. Learn more in Settings.
            </p>
            <p className="mt-6 text-xs opacity-60">main 1.0.0</p>
          </div>
        </div>
      </div>
    </Page>
  );
}
