import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import StartWithVoice from "./pages/StartWithVoice";
import ReadScript from "./pages/ReadScript";
import Record from "./pages/Record";
import Ready from "./pages/Ready";
import LanguagePick from "./pages/LanguagePick";
import Scenarios from "./pages/Scenarios";
import ScenarioDetail from "./pages/ScenarioDetail";
import Working from "./pages/Working";
import PlaybackRich from "./pages/PlaybackRich";
import Share from "./pages/Share";
import { AnimatePresence } from "framer-motion";
import { useKioskIdle } from "./hooks/useKioskIdle";

function AnimatedRoutes() {
  const location = useLocation();
  useKioskIdle(120);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartWithVoice />} />
        <Route path="/script" element={<ReadScript />} />
        <Route path="/record" element={<Record />} />
        <Route path="/ready" element={<Ready />} />
        <Route path="/languages" element={<LanguagePick />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/scenario" element={<ScenarioDetail />} />
        <Route path="/working" element={<Working />} />
        <Route path="/playback" element={<PlaybackRich />} />
        <Route path="/share" element={<Share />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
