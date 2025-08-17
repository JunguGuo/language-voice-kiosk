import { useEffect, useState } from "react";

export default function CountIn({ seconds=3, onDone }: { seconds?: number, onDone: () => void }){
  const [n, setN] = useState(seconds);
  useEffect(()=>{
    const id = setInterval(()=>{
      setN(v => {
        if (v <= 1) { clearInterval(id); onDone(); return 0; }
        return v-1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fixed inset-0 bg-black/80 grid place-items-center z-50">
      <div className="text-7xl font-extrabold">{n}</div>
    </div>
  );
}