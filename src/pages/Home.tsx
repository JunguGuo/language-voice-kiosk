import { Page } from "../components/Page";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
function RotatingWords({
  words,
  durationWord = 2500, // ms between changes
  transitionMs = 500, // slide duration
}: {
  words: string[];
  durationWord?: number;
  transitionMs?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Set an interval to change the word every 2 seconds
    const interval = setInterval(() => {
      // Start the transition out
      setIsTransitioning(true);
      // After a short delay to allow the "out" transition to run,
      // update the word index and start the "in" transition
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsTransitioning(false);
      }, transitionMs); // This should match the CSS transition duration
    }, durationWord); // 2.5 seconds total per word (2s visible + 0.5s transition)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [words]);

  return (
    <span
      className={`
        inline-block
        underline decoration-pink-400 decoration-4 underline-offset-4
        transition-transform duration-500 ease-in-out transform-gpu
        ${
          isTransitioning
            ? "translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      {words[wordIndex]}
    </span>
  );
}

export default function Home() {
  const words = [
    "Chinese",
    "French",
    "Spanish",
    "German",
    "Japanese",
    "Arabic",
    "Korean",
    "Russian",
    "Italian",
  ];

  return (
    <Page>
      <div className="h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-8 grid gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-neutral-500 text-sm mb-2">
              {/* "你叫什么名字 你吃了吗 你好" */}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold">
              Ever wondered how you sound speaking{" "}
              <RotatingWords words={words} />?
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
