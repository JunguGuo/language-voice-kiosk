import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../store/app";

export function useKioskIdle(seconds: number = 90){
  const nav = useNavigate();
  const loc = useLocation();
  const { reset } = useApp();
  const timerRef = useRef<number | null>(null);

  useEffect(()=>{
    const resetTimer = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(()=>{
        // Don't interrupt active working state, but reset everywhere else
        if (loc.pathname !== "/working") {
          reset();
          nav("/", { replace: true });
        }
      }, seconds * 1000);
    };
    const events = ["mousemove","keydown","touchstart","click"];
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer as any));
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [seconds, nav, loc.pathname]);
}