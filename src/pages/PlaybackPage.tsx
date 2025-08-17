import { useApp } from "../store/app";
import AudioPlayer from "../components/AudioPlayer";

export default function PlaybackPage() {
  const { lastAudioUrl } = useApp();
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Playback</h2>
      <AudioPlayer src={lastAudioUrl} />
    </div>
  );
}